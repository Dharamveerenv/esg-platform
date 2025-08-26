/**
 * VSME ESG Platform - Calculation Service
 * Advanced calculation engine for GHG emissions and workforce metrics
 */

const EmissionFactor = require('../models/EmissionFactor');
const { AppError } = require('../utils/appError');

class CalculationService {
  
  /**
   * Calculate Scope 1 emissions (Stationary Combustion)
   * Enhanced with Excel-based formulas from "Full Scope 1_2 Activity Data_Emission Factors V.0.xlsx"
   * @param {Array} fuelData - Array of fuel consumption data
   * @param {String} country - Country for emission factors (default: Ireland)
   * @returns {Object} Calculation results
   */
  async calculateStationaryCombustion(fuelData, country = 'Ireland') {
    const results = [];
    let totalCo2e = 0;
    
    for (const fuel of fuelData) {
      // Validate input data
      if (!fuel.fuelType || !fuel.quantity || fuel.quantity <= 0) {
        throw new AppError('Invalid fuel data: fuelType and positive quantity required', 400);
      }
      
      // Get emission factor from database with fallback
      let emissionFactor = await EmissionFactor.findOne({
        'factorMetadata.category': 'Scope1',
        'factorMetadata.subCategory': 'Stationary',
        'fuelSpecifications.fuelType': fuel.fuelType,
        'geographicScope.country': country,
        isActive: true
      }).sort({ 'factorMetadata.validFrom': -1 });
      
      // Fallback: try to find any factor for this fuel type if country-specific not found
      if (!emissionFactor) {
        emissionFactor = await EmissionFactor.findOne({
          'factorMetadata.category': 'Scope1',
          'factorMetadata.subCategory': 'Stationary',
          'fuelSpecifications.fuelType': fuel.fuelType,
          isActive: true
        }).sort({ 'factorMetadata.validFrom': -1 });
      }
      
      if (!emissionFactor) {
        throw new AppError(`Emission factor not found for ${fuel.fuelType} in ${country}`, 404);
      }
      
      // Excel-based calculations following spreadsheet formulas
      // Formula: Activity Data × CO2 Factor = CO2 Emissions
      const co2Emissions = fuel.quantity * emissionFactor.emissionFactorData.co2Factor;
      
      // Formula: Activity Data × CH4 Factor × GWP(CH4) = CH4 CO2e Emissions
      const ch4Emissions = fuel.quantity * emissionFactor.emissionFactorData.ch4Factor * 25;
      
      // Formula: Activity Data × N2O Factor × GWP(N2O) = N2O CO2e Emissions  
      const n2oEmissions = fuel.quantity * emissionFactor.emissionFactorData.n2oFactor * 298;
      
      // Formula: CO2 + CH4(CO2e) + N2O(CO2e) = Total CO2e Emissions
      const totalCo2eEmissions = co2Emissions + ch4Emissions + n2oEmissions;
      
      const calculation = {
        // Activity Data (Excel columns A-F)
        fuelType: fuel.fuelType,
        consumption: fuel.quantity,
        unit: fuel.unit || emissionFactor.emissionFactorData.unit,
        sourceCategory: fuel.sourceCategory || 'Stationary Combustion',
        facilityName: fuel.facilityName || 'Facility',
        
        // Emission Factors (Excel columns G-L)
        emissionFactors: {
          co2Factor: emissionFactor.emissionFactorData.co2Factor,
          ch4Factor: emissionFactor.emissionFactorData.ch4Factor,
          n2oFactor: emissionFactor.emissionFactorData.n2oFactor,
          totalCo2eFactor: emissionFactor.emissionFactorData.totalCo2eFactor
        },
        
        // Calculation Results (Excel columns M-R)
        co2Emissions: Math.round(co2Emissions * 100) / 100,
        ch4Emissions: Math.round(ch4Emissions * 100000) / 100000, // Higher precision for small values
        n2oEmissions: Math.round(n2oEmissions * 100000) / 100000, // Higher precision for small values
        totalCo2eEmissions: Math.round(totalCo2eEmissions * 100) / 100,
        
        // Metadata
        calculationDate: new Date(),
        factorSource: emissionFactor.factorMetadata.source,
        factorVersion: emissionFactor.factorMetadata.version,
        uncertainty: emissionFactor.emissionFactorData.uncertainty,
        methodology: 'Excel-based IPCC Tier 1 with AR5 GWP values'
      };
      
      results.push(calculation);
      totalCo2e += totalCo2eEmissions;
    }
    
    return {
      calculations: results,
      totalCo2e: Math.round(totalCo2e * 100) / 100,
      methodology: 'Excel-based IPCC Tier 1 with AR5 GWP values',
      calculatedAt: new Date()
    };
  }
  
  /**
   * Calculate Scope 1 emissions (Mobile Combustion) 
   * Enhanced with Excel-based formulas from spreadsheet
   * @param {Array} vehicleData - Array of vehicle fuel consumption data
   * @param {String} country - Country for emission factors
   * @returns {Object} Calculation results
   */
  async calculateMobileCombustion(vehicleData, country = 'Ireland') {
    const results = [];
    let totalCo2e = 0;
    
    for (const vehicle of vehicleData) {
      let calculation;
      
      if (vehicle.calculationMethod === 'fuel-based') {
        // Fuel-based calculation with fallback
        let emissionFactor = await EmissionFactor.findOne({
          'factorMetadata.category': 'Scope1',
          'factorMetadata.subCategory': 'Mobile',
          'fuelSpecifications.fuelType': vehicle.fuelType,
          'geographicScope.country': country,
          isActive: true
        }).sort({ 'factorMetadata.validFrom': -1 });
        
        if (!emissionFactor) {
          emissionFactor = await EmissionFactor.findOne({
            'factorMetadata.category': 'Scope1',
            'fuelSpecifications.fuelType': vehicle.fuelType,
            isActive: true
          }).sort({ 'factorMetadata.validFrom': -1 });
        }
        
        if (!emissionFactor) {
          throw new AppError(`Emission factor not found for ${vehicle.fuelType} in ${country}`, 404);
        }
        
        const emissions = emissionFactor.calculateEmissions(vehicle.fuelConsumption);
        
        calculation = {
          vehicleType: vehicle.type || 'Unknown',
          method: 'Fuel-based',
          fuelConsumption: vehicle.fuelConsumption,
          fuelType: vehicle.fuelType,
          emissionFactor: emissionFactor.emissionFactorData.totalCo2eFactor,
          emissions: emissions.totalCo2eEmissions,
          unit: 'kg CO2e',
          factorSource: emissionFactor.factorMetadata.source
        };
        
        totalCo2e += emissions.totalCo2eEmissions;
        
      } else if (vehicle.calculationMethod === 'distance-based') {
        // Distance-based calculation using vehicle-specific factors
        const vehicleFactors = this.getVehicleEmissionFactors();
        const factorKey = vehicle.weightClass || vehicle.type;
        
        if (!vehicleFactors[factorKey]) {
          throw new AppError(`Vehicle emission factor not found for ${factorKey}`, 404);
        }
        
        const emissionFactor = vehicleFactors[factorKey].factor;
        const emissions = vehicle.distanceTraveled * emissionFactor;
        
        calculation = {
          vehicleType: vehicle.type,
          method: 'Distance-based',
          distance: vehicle.distanceTraveled,
          distanceUnit: vehicle.distanceUnit || 'km',
          emissionFactor: emissionFactor,
          emissions: emissions,
          unit: 'kg CO2e',
          factorSource: 'UK DEFRA 2024'
        };
        
        totalCo2e += emissions;
      } else {
        throw new AppError('Invalid calculation method. Use "fuel-based" or "distance-based"', 400);
      }
      
      results.push(calculation);
    }
    
    return {
      vehicleCalculations: results,
      totalMobileEmissions: Math.round(totalCo2e * 100) / 100,
      calculatedAt: new Date()
    };
  }
  
  /**
   * Calculate Scope 1 fugitive emissions (Refrigerants)
   * @param {Array} refrigerantData - Array of refrigerant leakage data
   * @returns {Object} Calculation results
   */
  async calculateFugitiveEmissions(refrigerantData) {
    const results = [];
    let totalCo2e = 0;
    
    // Standard refrigerant GWP values (IPCC AR5)
    const refrigerantGWP = {
      'R-404A': 3943,
      'R-134a': 1300,
      'R-407C': 1624,
      'R-410A': 1924,
      'R-22': 1760,
      'R-32': 677,
      'CO2': 1,
      'Ammonia': 0
    };
    
    for (const refrigerant of refrigerantData) {
      if (!refrigerant.type || !refrigerant.quantityLeaked || refrigerant.quantityLeaked <= 0) {
        throw new AppError('Invalid refrigerant data: type and positive quantityLeaked required', 400);
      }
      
      const gwpValue = refrigerantGWP[refrigerant.type];
      if (gwpValue === undefined) {
        throw new AppError(`GWP value not found for refrigerant type: ${refrigerant.type}`, 404);
      }
      
      const emissions = refrigerant.quantityLeaked * gwpValue;
      
      const calculation = {
        refrigerantType: refrigerant.type,
        quantityLeaked: refrigerant.quantityLeaked,
        unit: 'kg',
        gwpValue: gwpValue,
        co2eEmissions: emissions,
        equipmentType: refrigerant.equipmentType || 'Unknown',
        leakageRate: refrigerant.leakageRate,
        calculationDate: new Date(),
        methodology: 'IPCC AR5 GWP values'
      };
      
      results.push(calculation);
      totalCo2e += emissions;
    }
    
    return {
      refrigerantCalculations: results,
      totalFugitiveEmissions: Math.round(totalCo2e * 100) / 100,
      calculatedAt: new Date()
    };
  }
  
  /**
   * Calculate Scope 2 emissions (Electricity)
   * @param {Array} electricityData - Array of electricity consumption data
   * @param {String} method - 'location' or 'market' based method
   * @returns {Object} Calculation results
   */
  async calculateScope2Emissions(electricityData, method = 'location') {
    const results = [];
    let totalCo2e = 0;
    
    for (const consumption of electricityData) {
      if (!consumption.country || !consumption.quantity || consumption.quantity <= 0) {
        throw new AppError('Invalid electricity data: country and positive quantity required', 400);
      }
      
      // Get grid emission factor with fallback
      let gridFactor = await EmissionFactor.findOne({
        'factorMetadata.category': 'Scope2',
        'fuelSpecifications.fuelType': 'Electricity',
        'geographicScope.country': consumption.country,
        isActive: true
      }).sort({ 'factorMetadata.validFrom': -1 });
      
      if (!gridFactor) {
        gridFactor = await EmissionFactor.findOne({
          'factorMetadata.category': 'Scope2',
          'fuelSpecifications.fuelType': 'Electricity',
          isActive: true
        }).sort({ 'factorMetadata.validFrom': -1 });
      }
      
      if (!gridFactor) {
        throw new AppError(`Grid emission factor not found for ${consumption.country}`, 404);
      }
      
      let emissions;
      let calculation;
      
      if (method === 'location') {
        // Location-based method
        emissions = consumption.quantity * gridFactor.emissionFactorData.totalCo2eFactor;
        
        calculation = {
          method: 'Location-based',
          country: consumption.country,
          consumption: consumption.quantity,
          unit: consumption.unit || 'kWh',
          gridFactor: gridFactor.emissionFactorData.totalCo2eFactor,
          emissions: emissions,
          factorSource: gridFactor.factorMetadata.source,
          factorVersion: gridFactor.factorMetadata.version
        };
        
      } else if (method === 'market') {
        // Market-based method
        const renewableConsumption = consumption.renewableEnergyConsumption || 0;
        const conventionalConsumption = consumption.quantity - renewableConsumption;
        
        // Use residual grid factor for market-based (simplified approach)
        const residualFactor = gridFactor.emissionFactorData.totalCo2eFactor * 1.1; // Approximate residual factor
        emissions = conventionalConsumption * residualFactor;
        
        calculation = {
          method: 'Market-based',
          country: consumption.country,
          totalConsumption: consumption.quantity,
          renewableConsumption: renewableConsumption,
          conventionalConsumption: conventionalConsumption,
          unit: consumption.unit || 'kWh',
          residualGridFactor: residualFactor,
          emissions: emissions,
          factorSource: gridFactor.factorMetadata.source
        };
      } else {
        throw new AppError('Invalid method. Use "location" or "market"', 400);
      }
      
      results.push(calculation);
      totalCo2e += emissions;
    }
    
    return {
      method: method,
      calculations: results,
      totalScope2Emissions: Math.round(totalCo2e * 100) / 100,
      calculatedAt: new Date()
    };
  }
  
  /**
   * Calculate workforce metrics
   * @param {Object} workforceData - Workforce data for calculations
   * @returns {Object} Workforce metrics
   */
  calculateWorkforceMetrics(workforceData) {
    const metrics = {};
    
    // Employee turnover rate
    if (workforceData.employeesAtStart && workforceData.employeesAtEnd && workforceData.departures) {
      const averageEmployees = (workforceData.employeesAtStart + workforceData.employeesAtEnd) / 2;
      const turnoverRate = (workforceData.departures / averageEmployees) * 100;
      
      metrics.turnoverRate = {
        rate: Math.round(turnoverRate * 100) / 100,
        averageEmployees: averageEmployees,
        departures: workforceData.departures,
        calculationMethod: 'Annual turnover rate = (Departures / Average employees) × 100',
        benchmark: this.getTurnoverBenchmark(workforceData.industry)
      };
    }
    
    // Accident rate (per 200,000 hours)
    if (workforceData.totalAccidents !== undefined && workforceData.totalHoursWorked) {
      const accidentRate = (workforceData.totalAccidents / workforceData.totalHoursWorked) * 200000;
      
      metrics.accidentRate = {
        rate: Math.round(accidentRate * 100) / 100,
        totalAccidents: workforceData.totalAccidents,
        totalHoursWorked: workforceData.totalHoursWorked,
        calculationMethod: 'Accident rate = (Total accidents / Total hours worked) × 200,000',
        benchmark: this.getAccidentRateBenchmark(workforceData.industry)
      };
    }
    
    // Gender pay gap
    if (workforceData.compensationData && workforceData.compensationData.length > 0) {
      const maleCompensation = workforceData.compensationData
        .filter(emp => emp.gender === 'Male')
        .map(emp => emp.annualSalary);
      
      const femaleCompensation = workforceData.compensationData
        .filter(emp => emp.gender === 'Female')
        .map(emp => emp.annualSalary);
      
      if (maleCompensation.length > 0 && femaleCompensation.length > 0) {
        const maleMedian = this.calculateMedian(maleCompensation);
        const femaleMedian = this.calculateMedian(femaleCompensation);
        const payGap = ((maleMedian - femaleMedian) / maleMedian) * 100;
        
        metrics.genderPayGap = {
          payGap: Math.round(payGap * 100) / 100,
          maleMedianPay: maleMedian,
          femaleMedianPay: femaleMedian,
          sampleSize: workforceData.compensationData.length,
          calculationMethod: 'Pay gap = ((Male median - Female median) / Male median) × 100'
        };
      }
    }
    
    return {
      metrics: metrics,
      calculatedAt: new Date()
    };
  }
  
  /**
   * Comprehensive emissions calculation orchestrator
   * @param {Object} emissionsData - Complete emissions data
   * @returns {Object} All emissions calculations
   */
  async calculateComprehensiveEmissions(emissionsData) {
    const results = {
      scope1: {},
      scope2: {},
      scope3: {},
      total: 0,
      calculatedAt: new Date()
    };
    
    // Scope 1 calculations
    if (emissionsData.scope1) {
      let scope1Total = 0;
      
      if (emissionsData.scope1.stationaryCombustion) {
        const stationary = await this.calculateStationaryCombustion(
          emissionsData.scope1.stationaryCombustion,
          emissionsData.country
        );
        results.scope1.stationary = stationary;
        scope1Total += stationary.totalCo2e;
      }
      
      if (emissionsData.scope1.mobileCombustion) {
        const mobile = await this.calculateMobileCombustion(
          emissionsData.scope1.mobileCombustion,
          emissionsData.country
        );
        results.scope1.mobile = mobile;
        scope1Total += mobile.totalMobileEmissions;
      }
      
      if (emissionsData.scope1.fugitiveEmissions) {
        const fugitive = await this.calculateFugitiveEmissions(
          emissionsData.scope1.fugitiveEmissions
        );
        results.scope1.fugitive = fugitive;
        scope1Total += fugitive.totalFugitiveEmissions;
      }
      
      results.scope1.total = Math.round(scope1Total * 100) / 100;
      results.total += scope1Total;
    }
    
    // Scope 2 calculations
    if (emissionsData.scope2) {
      const scope2Location = await this.calculateScope2Emissions(
        emissionsData.scope2.electricityData,
        'location'
      );
      results.scope2.locationBased = scope2Location;
      
      const scope2Market = await this.calculateScope2Emissions(
        emissionsData.scope2.electricityData,
        'market'
      );
      results.scope2.marketBased = scope2Market;
      
      // Use location-based for total (can be switched based on reporting preference)
      results.scope2.total = scope2Location.totalScope2Emissions;
      results.total += scope2Location.totalScope2Emissions;
    }
    
    // TODO: Scope 3 calculations would be implemented here
    // This is a simplified version focusing on Scope 1 and 2
    
    results.total = Math.round(results.total * 100) / 100;
    
    // Calculate emission intensity if revenue data is provided
    if (emissionsData.revenueData) {
      results.emissionIntensity = {
        value: Math.round((results.total / emissionsData.revenueData.revenue) * 1000) / 1000,
        unit: `kg CO2e per ${emissionsData.revenueData.currency}`,
        revenue: emissionsData.revenueData.revenue
      };
    }
    
    return results;
  }
  
  // Helper methods
  getVehicleEmissionFactors() {
    return {
      'Light Commercial Vehicle': { factor: 0.253, unit: 'kg CO2e/km' },
      'HGV (3.5-7.5t)': { factor: 0.451, unit: 'kg CO2e/km' },
      'HGV (7.5-17t)': { factor: 0.736, unit: 'kg CO2e/km' },
      'HGV (17-32t)': { factor: 1.015, unit: 'kg CO2e/km' },
      'HGV (>32t)': { factor: 1.194, unit: 'kg CO2e/km' },
      'Refrigerated HGV': { factor: 1.344, unit: 'kg CO2e/km' },
      'Car': { factor: 0.171, unit: 'kg CO2e/km' },
      'Motorcycle': { factor: 0.113, unit: 'kg CO2e/km' }
    };
  }
  
  calculateMedian(numbers) {
    const sorted = numbers.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      return sorted[middle];
    }
  }
  
  getTurnoverBenchmark(industry) {
    const benchmarks = {
      'Agriculture': 15.2,
      'Manufacturing': 12.8,
      'Services': 18.5,
      'Technology': 22.1,
      'Healthcare': 14.9,
      'Finance': 11.3
    };
    
    return benchmarks[industry] || 16.0; // Overall average
  }
  
  getAccidentRateBenchmark(industry) {
    const benchmarks = {
      'Agriculture': 4.2,
      'Manufacturing': 3.1,
      'Construction': 5.8,
      'Services': 1.4,
      'Technology': 0.8,
      'Healthcare': 2.3
    };
    
    return benchmarks[industry] || 2.5; // Overall average
  }
}

module.exports = new CalculationService();