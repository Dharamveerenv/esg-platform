/**
 * Excel-Based Calculation Service
 * Implements calculations based on "Full Scope 1_2 Activity Data_Emission Factors V.0.xlsx"
 * Provides comprehensive emission calculations with Excel formula precision
 */

const EmissionFactor = require('../models/EmissionFactor');
const { AppError } = require('../utils/appError');

class ExcelBasedCalculationService {
  
  /**
   * Calculate Scope 1 Stationary Combustion Emissions
   * Based on Excel formulas: Activity Data × Emission Factor = CO2e Emissions
   * @param {Object} activityData - Stationary combustion activity data
   * @param {String} country - Country for emission factors
   * @returns {Object} Detailed calculation results
   */
  async calculateStationaryCombustionEmissions(activityData, country = 'Ireland') {
    const {
      sourceCategory,
      facilityName,
      fuelType,
      consumptionQuantity,
      consumptionUnit,
      reportingPeriod
    } = activityData;

    // Validate required inputs
    if (!fuelType || !consumptionQuantity || consumptionQuantity <= 0) {
      throw new AppError('Invalid input: fuelType and positive consumptionQuantity required', 400);
    }

    // Get emission factor from database
    const emissionFactor = await this.getEmissionFactor('Scope1', 'Stationary', fuelType, country);
    
    // Excel calculation formula: Activity Data × CO2 Factor
    const co2Emissions = consumptionQuantity * emissionFactor.emissionFactorData.co2Factor;
    
    // Excel calculation formula: Activity Data × CH4 Factor × GWP(CH4)
    const ch4Emissions = consumptionQuantity * emissionFactor.emissionFactorData.ch4Factor * 25;
    
    // Excel calculation formula: Activity Data × N2O Factor × GWP(N2O) 
    const n2oEmissions = consumptionQuantity * emissionFactor.emissionFactorData.n2oFactor * 298;
    
    // Excel calculation formula: CO2 + CH4(CO2e) + N2O(CO2e)
    const totalCo2eEmissions = co2Emissions + ch4Emissions + n2oEmissions;
    
    // Prepare comprehensive result following Excel structure
    const result = {
      // Activity Data Section (from Excel columns A-F)
      activityData: {
        sourceCategory,
        facilityName,
        fuelType,
        consumptionQuantity,
        consumptionUnit: consumptionUnit || emissionFactor.emissionFactorData.unit,
        reportingPeriod: reportingPeriod || { startDate: new Date(), endDate: new Date() }
      },
      
      // Emission Factors Section (from Excel columns G-L)
      emissionFactors: {
        co2Factor: {
          value: emissionFactor.emissionFactorData.co2Factor,
          unit: `kg CO2/${emissionFactor.emissionFactorData.unit}`,
          source: emissionFactor.factorMetadata.source,
          sourceYear: new Date().getFullYear()
        },
        ch4Factor: {
          value: emissionFactor.emissionFactorData.ch4Factor,
          unit: `kg CH4/${emissionFactor.emissionFactorData.unit}`,
          gwpValue: 25,
          source: emissionFactor.factorMetadata.source,
          sourceYear: new Date().getFullYear()
        },
        n2oFactor: {
          value: emissionFactor.emissionFactorData.n2oFactor,
          unit: `kg N2O/${emissionFactor.emissionFactorData.unit}`,
          gwpValue: 298,
          source: emissionFactor.factorMetadata.source,
          sourceYear: new Date().getFullYear()
        },
        totalCo2eFactor: {
          value: emissionFactor.emissionFactorData.totalCo2eFactor,
          unit: `kg CO2e/${emissionFactor.emissionFactorData.unit}`,
          methodology: 'IPCC AR5 GWP (100-year)'
        }
      },
      
      // Calculation Results Section (from Excel columns M-R)
      calculationResults: {
        co2Emissions: Math.round(co2Emissions * 100) / 100,
        ch4Emissions: Math.round(ch4Emissions * 100000) / 100000, // More precision for small values
        n2oEmissions: Math.round(n2oEmissions * 100000) / 100000, // More precision for small values
        totalCo2eEmissions: Math.round(totalCo2eEmissions * 100) / 100,
        calculationDate: new Date(),
        calculationMethod: 'Direct',
        uncertaintyPercentage: emissionFactor.emissionFactorData.uncertainty
      },
      
      // Quality Information
      qualityMetrics: {
        dataQuality: 'High',
        temporalRepresentativeness: 'High',
        geographicRepresentativeness: country === emissionFactor.geographicScope.country ? 'High' : 'Medium',
        technologyRepresentativeness: 'High',
        completeness: 100
      }
    };

    return result;
  }

  /**
   * Calculate Scope 1 Mobile Combustion Emissions
   * Enhanced with vehicle-specific factors and multiple calculation methods
   */
  async calculateMobileCombustionEmissions(activityData, country = 'Ireland') {
    const {
      vehicleCategory,
      vehicleType,
      fuelType,
      calculationMethod,
      fuelConsumption,
      distanceTraveled,
      reportingPeriod,
      vehicleDetails
    } = activityData;

    // Enhanced emission factor lookup with vehicle category
    const emissionFactor = await this.getEmissionFactor(
      'Scope1', 
      'Mobile Combustion', 
      fuelType, 
      country, 
      vehicleCategory
    );
    
    let consumptionQuantity;
    let calculationNote;
    let calculationDetails = {};
    
    if (calculationMethod === 'fuel-based' && fuelConsumption) {
      consumptionQuantity = fuelConsumption.quantity;
      calculationNote = 'Fuel-based calculation using actual fuel consumption records';
      calculationDetails = {
        method: 'Direct fuel consumption',
        dataSource: fuelConsumption.dataSource || 'Fuel receipts',
        quantity: consumptionQuantity,
        unit: fuelConsumption.unit || 'litre'
      };
      
    } else if (calculationMethod === 'distance-based' && distanceTraveled) {
      // Enhanced distance-based calculation with vehicle-specific efficiency
      const fuelEfficiency = this.getVehicleFuelEfficiency(vehicleCategory, vehicleType, fuelType);
      consumptionQuantity = (distanceTraveled.distance / 100) * fuelEfficiency;
      calculationNote = `Distance-based calculation using ${fuelEfficiency}L/100km efficiency`;
      calculationDetails = {
        method: 'Distance × Fuel Efficiency',
        distance: distanceTraveled.distance,
        distanceUnit: distanceTraveled.unit || 'km',
        fuelEfficiency: fuelEfficiency,
        efficiencyUnit: 'L/100km',
        calculatedConsumption: consumptionQuantity
      };
      
    } else if (calculationMethod === 'spend-based' && activityData.spendData) {
      // Spend-based calculation using fuel costs
      const fuelPrice = activityData.spendData.averageFuelPrice || this.getDefaultFuelPrice(fuelType, country);
      consumptionQuantity = activityData.spendData.totalSpend / fuelPrice;
      calculationNote = `Spend-based calculation using ${fuelPrice} EUR/litre`;
      calculationDetails = {
        method: 'Total Spend ÷ Fuel Price',
        totalSpend: activityData.spendData.totalSpend,
        currency: activityData.spendData.currency || 'EUR',
        fuelPrice: fuelPrice,
        calculatedConsumption: consumptionQuantity
      };
      
    } else {
      throw new AppError('Invalid calculation method or missing required data', 400);
    }

    // Enhanced Excel calculations with all gas components
    const co2Emissions = consumptionQuantity * emissionFactor.emissionFactorData.co2Factor;
    const ch4Emissions = consumptionQuantity * emissionFactor.emissionFactorData.ch4Factor * 25; // GWP CH4
    const n2oEmissions = consumptionQuantity * emissionFactor.emissionFactorData.n2oFactor * 298; // GWP N2O
    const totalCo2eEmissions = co2Emissions + ch4Emissions + n2oEmissions;
    
    // Calculate additional metrics
    const emissionIntensity = distanceTraveled?.distance ? 
      (totalCo2eEmissions / distanceTraveled.distance) : null;
    
    return {
      activityData: {
        vehicleCategory,
        vehicleType,
        fuelType,
        calculationMethod,
        consumptionQuantity: Math.round(consumptionQuantity * 100) / 100,
        consumptionUnit: 'litre',
        reportingPeriod,
        calculationDetails
      },
      emissionFactors: {
        co2Factor: {
          value: emissionFactor.emissionFactorData.co2Factor,
          unit: `kg CO2/${emissionFactor.emissionFactorData.unit}`,
          source: emissionFactor.factorMetadata.source,
          sourceYear: new Date().getFullYear()
        },
        ch4Factor: {
          value: emissionFactor.emissionFactorData.ch4Factor,
          unit: `kg CH4/${emissionFactor.emissionFactorData.unit}`,
          gwpValue: 25
        },
        n2oFactor: {
          value: emissionFactor.emissionFactorData.n2oFactor,
          unit: `kg N2O/${emissionFactor.emissionFactorData.unit}`,
          gwpValue: 298
        },
        totalCo2eFactor: {
          value: emissionFactor.emissionFactorData.totalCo2eFactor,
          unit: `kg CO2e/${emissionFactor.emissionFactorData.unit}`,
          methodology: 'IPCC AR5 GWP (100-year)'
        }
      },
      calculationResults: {
        co2Emissions: Math.round(co2Emissions * 100) / 100,
        ch4Emissions: Math.round(ch4Emissions * 100000) / 100000,
        n2oEmissions: Math.round(n2oEmissions * 100000) / 100000,
        totalCo2eEmissions: Math.round(totalCo2eEmissions * 100) / 100,
        emissionIntensity: emissionIntensity ? Math.round(emissionIntensity * 10000) / 10000 : null,
        emissionIntensityUnit: 'kg CO2e/km',
        calculationDate: new Date(),
        calculationMethod: calculationMethod,
        calculationNote,
        uncertaintyPercentage: emissionFactor.factorMetadata.uncertainty
      },
      qualityMetrics: {
        dataQuality: calculationMethod === 'fuel-based' ? 'High' : 
                    calculationMethod === 'distance-based' ? 'Medium' : 'Low',
        calculationAccuracy: calculationMethod === 'fuel-based' ? 'High' : 'Medium',
        emissionFactorQuality: emissionFactor.factorMetadata.dataQuality || 'High'
      }
    };
  }

  /**
   * Calculate Scope 1 Fugitive Emissions  
   * Based on Excel formulas for refrigerant leakage
   */
  async calculateFugitiveEmissions(activityData) {
    const {
      emissionSource,
      refrigerantDetails,
      calculationMethod,
      massBalance
    } = activityData;

    const gwpFactor = await this.getEmissionFactor('Scope1', 'Fugitive', refrigerantDetails.refrigerantType, 'Global');
    
    let refrigerantEmissions;
    
    if (calculationMethod === 'Mass Balance') {
      // Excel formula: Beginning Inventory + Purchases - Sales - Ending Inventory
      refrigerantEmissions = massBalance.beginningInventory + 
                           massBalance.purchases - 
                           massBalance.salesTransfers - 
                           massBalance.endingInventory;
    } else if (calculationMethod === 'Asset Tracking') {
      // Excel formula: Equipment Capacity × Annual Leakage Rate
      refrigerantEmissions = refrigerantDetails.totalCapacity * 
                           (massBalance.leakageRate / 100);
    } else {
      throw new AppError('Invalid calculation method for fugitive emissions', 400);
    }

    // Excel formula: Refrigerant Emissions × GWP Factor
    const co2eEmissions = refrigerantEmissions * gwpFactor.emissionFactorData.totalCo2eFactor;
    
    return {
      activityData: {
        emissionSource,
        refrigerantDetails,
        calculationMethod
      },
      emissionFactors: {
        gwpFactor: {
          value: gwpFactor.emissionFactorData.totalCo2eFactor,
          unit: 'kg CO2e/kg',
          methodology: 'IPCC AR5 GWP (100-year)'
        }
      },
      calculationResults: {
        refrigerantEmissions: Math.round(refrigerantEmissions * 100) / 100,
        co2eEmissions: Math.round(co2eEmissions * 100) / 100,
        calculationDate: new Date(),
        calculationNotes: `GWP value: ${gwpFactor.emissionFactorData.totalCo2eFactor}`
      }
    };
  }

  /**
   * Calculate Scope 2 Electricity Emissions
   * Based on Excel formulas for location-based and market-based methods
   */
  async calculateElectricityEmissions(activityData, country = 'Ireland') {
    const {
      facilityDetails,
      consumptionQuantity,
      consumptionUnit,
      renewableEnergyPortion
    } = activityData;

    const locationFactor = await this.getEmissionFactor('Scope2', 'Grid', 'Electricity', country);
    
    // Excel Location-Based Calculation: Consumption × Grid Factor
    const locationBasedEmissions = consumptionQuantity * locationFactor.emissionFactorData.totalCo2eFactor;
    
    // Excel Market-Based Calculation: (Total - Renewable) × Grid Factor  
    const renewableQuantity = renewableEnergyPortion ? renewableEnergyPortion.quantity : 0;
    const nonRenewableConsumption = Math.max(0, consumptionQuantity - renewableQuantity);
    const marketBasedEmissions = nonRenewableConsumption * locationFactor.emissionFactorData.totalCo2eFactor;
    
    return {
      activityData: {
        facilityDetails,
        consumptionQuantity,
        consumptionUnit: consumptionUnit || 'kWh',
        renewableEnergyPortion
      },
      emissionFactors: {
        locationBased: {
          gridFactor: locationFactor.emissionFactorData.totalCo2eFactor,
          unit: `kg CO2e/${locationFactor.emissionFactorData.unit}`,
          country: locationFactor.geographicScope.country,
          source: locationFactor.factorMetadata.source,
          sourceYear: new Date().getFullYear()
        }
      },
      calculationResults: {
        locationBasedEmissions: Math.round(locationBasedEmissions * 100) / 100,
        marketBasedEmissions: Math.round(marketBasedEmissions * 100) / 100,
        renewablePercentage: Math.round((renewableQuantity / consumptionQuantity) * 10000) / 100,
        calculationDate: new Date(),
        calculationMethod: 'Standard'
      }
    };
  }

  /**
   * Enhanced emission factor lookup with intelligent matching
   * Supports multiple fallback strategies and country-specific factors
   */
  async getEmissionFactor(category, subCategory, fuelType, country = 'Ireland', vehicleCategory = null) {
    console.log(`🔍 Looking up emission factor: ${category}/${subCategory}/${fuelType}/${country}`);
    
    // Country mapping for fallback logic
    const countryFallbacks = {
      'Ireland': ['United Kingdom', 'Global'],
      'United Kingdom': ['Ireland', 'Global'],
      'Germany': ['Global'],
      'France': ['Germany', 'Global'],
      'Netherlands': ['Germany', 'Global'],
      'Belgium': ['Netherlands', 'Germany', 'Global']
    };
    
    // Fuel type aliases for better matching
    const fuelAliases = {
      'Natural Gas': ['Natural Gas', 'Pipeline Gas', 'Methane'],
      'Diesel Oil': ['Diesel', 'Automotive Diesel', 'AGO'],
      'Diesel': ['Diesel Oil', 'Automotive Diesel', 'AGO'],
      'Petrol': ['Gasoline', 'Motor Gasoline', 'Automotive Gasoline'],
      'Gasoline': ['Petrol', 'Motor Gasoline', 'Automotive Gasoline'],
      'Grid Electricity': ['Electricity', 'Grid Electricity', 'National Grid']
    };
    
    const searchFuels = fuelAliases[fuelType] || [fuelType];
    const searchCountries = [country, ...(countryFallbacks[country] || ['Global'])];
    
    let emissionFactor = null;
    
    // Strategy 1: Exact match with vehicle category (for mobile combustion)
    if (category === 'Scope1' && subCategory === 'Mobile Combustion' && vehicleCategory) {
      for (const searchCountry of searchCountries) {
        for (const searchFuel of searchFuels) {
          emissionFactor = await EmissionFactor.findOne({
            'factorMetadata.category': category,
            'factorMetadata.subCategory': subCategory,
            'fuelSpecifications.fuelType': searchFuel,
            'fuelSpecifications.vehicleCategory': vehicleCategory,
            'geographicScope.country': searchCountry,
            isActive: true
          }).sort({ 'factorMetadata.validFrom': -1 });
          
          if (emissionFactor) {
            console.log(`✅ Found factor: ${searchFuel} for ${vehicleCategory} in ${searchCountry}`);
            return emissionFactor;
          }
        }
      }
    }
    
    // Strategy 2: Standard lookup with geographic fallback
    for (const searchCountry of searchCountries) {
      for (const searchFuel of searchFuels) {
        emissionFactor = await EmissionFactor.findOne({
          'factorMetadata.category': category,
          'factorMetadata.subCategory': subCategory,
          'fuelSpecifications.fuelType': searchFuel,
          'geographicScope.country': searchCountry,
          isActive: true
        }).sort({ 'factorMetadata.validFrom': -1 });
        
        if (emissionFactor) {
          console.log(`✅ Found factor: ${searchFuel} in ${searchCountry}`);
          return emissionFactor;
        }
      }
    }
    
    // Strategy 3: Broader category search (remove sub-category)
    for (const searchFuel of searchFuels) {
      emissionFactor = await EmissionFactor.findOne({
        'factorMetadata.category': category,
        'fuelSpecifications.fuelType': searchFuel,
        isActive: true
      }).sort({ 'factorMetadata.validFrom': -1 });
      
      if (emissionFactor) {
        console.log(`✅ Found factor (broad): ${searchFuel}`);
        return emissionFactor;
      }
    }
    
    // Strategy 4: Partial string matching for complex fuel names
    const fuelRegex = new RegExp(fuelType.split(' ')[0], 'i'); // Match first word
    emissionFactor = await EmissionFactor.findOne({
      'factorMetadata.category': category,
      'fuelSpecifications.fuelType': fuelRegex,
      isActive: true
    }).sort({ 'factorMetadata.validFrom': -1 });
    
    if (emissionFactor) {
      console.log(`✅ Found factor (partial): ${emissionFactor.fuelSpecifications.fuelType}`);
      return emissionFactor;
    }
    
    console.error(`❌ No emission factor found for: ${category}/${subCategory}/${fuelType}/${country}`);
    throw new AppError(
      `Emission factor not found for ${fuelType} in ${category}/${subCategory} for ${country}. ` +
      `Available factors may use different naming conventions.`, 
      404
    );
  }

  /**
   * Comprehensive Emission Calculation
   * Combines all scopes following Excel summary structure
   */
  async calculateComprehensiveEmissions(activityDataCollection, country = 'Ireland') {
    const results = {
      scope1: {
        stationaryCombustion: [],
        mobileCombustion: [],
        fugitiveEmissions: [],
        totals: { co2: 0, ch4: 0, n2o: 0, total: 0 }
      },
      scope2: {
        electricityConsumption: [],
        totals: { locationBased: 0, marketBased: 0 }
      },
      grandTotals: {
        scope1Total: 0,
        scope2LocationBased: 0, 
        scope2MarketBased: 0,
        combinedScope1And2: 0
      }
    };

    // Process Scope 1 Stationary
    if (activityDataCollection.scope1?.stationaryCombustion) {
      for (const activity of activityDataCollection.scope1.stationaryCombustion) {
        const result = await this.calculateStationaryCombustionEmissions(activity, country);
        results.scope1.stationaryCombustion.push(result);
        results.scope1.totals.total += result.calculationResults.totalCo2eEmissions;
      }
    }

    // Process Scope 1 Mobile
    if (activityDataCollection.scope1?.mobileCombustion) {
      for (const activity of activityDataCollection.scope1.mobileCombustion) {
        const result = await this.calculateMobileCombustionEmissions(activity, country);
        results.scope1.mobileCombustion.push(result);
        results.scope1.totals.total += result.calculationResults.totalCo2eEmissions;
      }
    }

    // Process Scope 1 Fugitive
    if (activityDataCollection.scope1?.fugitiveEmissions) {
      for (const activity of activityDataCollection.scope1.fugitiveEmissions) {
        const result = await this.calculateFugitiveEmissions(activity);
        results.scope1.fugitiveEmissions.push(result);
        results.scope1.totals.total += result.calculationResults.co2eEmissions;
      }
    }

    // Process Scope 2 Electricity
    if (activityDataCollection.scope2?.electricityConsumption) {
      for (const activity of activityDataCollection.scope2.electricityConsumption) {
        const result = await this.calculateElectricityEmissions(activity, country);
        results.scope2.electricityConsumption.push(result);
        results.scope2.totals.locationBased += result.calculationResults.locationBasedEmissions;
        results.scope2.totals.marketBased += result.calculationResults.marketBasedEmissions;
      }
    }

    // Calculate grand totals (Excel summary formulas)
    results.grandTotals.scope1Total = Math.round(results.scope1.totals.total * 100) / 100;
    results.grandTotals.scope2LocationBased = Math.round(results.scope2.totals.locationBased * 100) / 100;
    results.grandTotals.scope2MarketBased = Math.round(results.scope2.totals.marketBased * 100) / 100;
    results.grandTotals.combinedScope1And2 = Math.round((results.grandTotals.scope1Total + results.grandTotals.scope2MarketBased) * 100) / 100;

    // Add calculation metadata
    results.calculationMetadata = {
      calculatedAt: new Date(),
      methodology: 'IPCC 2006 Guidelines with country-specific factors',
      country: country,
      totalActivities: {
        scope1: (activityDataCollection.scope1?.stationaryCombustion?.length || 0) +
               (activityDataCollection.scope1?.mobileCombustion?.length || 0) +
               (activityDataCollection.scope1?.fugitiveEmissions?.length || 0),
        scope2: (activityDataCollection.scope2?.electricityConsumption?.length || 0)
      }
    };

    return results;
  }

  /**
   * Get vehicle-specific fuel efficiency based on category and type
   * Uses SEAI and DEFRA standard efficiency values
   */
  getVehicleFuelEfficiency(vehicleCategory, vehicleType, fuelType) {
    const efficiencyTable = {
      'Passenger Cars': {
        'Petrol': { small: 6.5, medium: 7.8, large: 9.2 },
        'Diesel': { small: 5.2, medium: 6.1, large: 7.3 }
      },
      'Light Commercial Vehicles': {
        'Petrol': { small: 8.5, medium: 10.2, large: 12.1 },
        'Diesel': { small: 7.1, medium: 8.4, large: 9.8 }
      },
      'Heavy Duty Vehicles': {
        'Diesel': { rigid: 25.0, articulated: 32.0, bus: 28.0 }
      },
      'Motorcycles': {
        'Petrol': { small: 3.5, medium: 4.2, large: 5.1 }
      }
    };

    const categoryData = efficiencyTable[vehicleCategory];
    if (!categoryData) return 8.0; // Default 8L/100km

    const fuelData = categoryData[fuelType];
    if (!fuelData) return 8.0;

    // Return medium efficiency if specific type not found
    return fuelData.medium || fuelData.rigid || Object.values(fuelData)[0] || 8.0;
  }

  /**
   * Get default fuel prices by country for spend-based calculations
   */
  getDefaultFuelPrice(fuelType, country) {
    const fuelPrices = {
      'Ireland': {
        'Petrol': 1.65,
        'Diesel': 1.52,
        'Natural Gas': 0.85
      },
      'United Kingdom': {
        'Petrol': 1.51,
        'Diesel': 1.58,
        'Natural Gas': 0.78
      },
      'Germany': {
        'Petrol': 1.71,
        'Diesel': 1.54,
        'Natural Gas': 0.92
      }
    };

    return fuelPrices[country]?.[fuelType] || fuelPrices['Ireland'][fuelType] || 1.50;
  }

  /**
   * Enhanced Scope 2 Electricity Calculation with Market-Based Method
   */
  async calculateScope2ElectricityEmissions(activityData, country = 'Ireland') {
    const {
      facilityDetails,
      consumptionQuantity,
      consumptionUnit,
      renewableEnergyPortion,
      contractualInstruments,
      reportingPeriod
    } = activityData;

    // Get location-based emission factor
    const locationFactor = await this.getEmissionFactor('Scope2', 'Grid Electricity', 'Grid Electricity', country);
    
    // Calculate location-based emissions (mandatory)
    const locationBasedEmissions = consumptionQuantity * locationFactor.emissionFactorData.totalCo2eFactor;
    
    // Calculate market-based emissions (mandatory for VSME)
    let marketBasedEmissions = locationBasedEmissions; // Start with location-based
    let marketBasedFactors = [];
    
    // Apply contractual instruments (RECs, PPAs, etc.)
    if (contractualInstruments && contractualInstruments.length > 0) {
      let instrumentalConsumption = 0;
      let instrumentalEmissions = 0;
      
      for (const instrument of contractualInstruments) {
        if (instrument.quantity && instrument.emissionFactor !== undefined) {
          instrumentalConsumption += instrument.quantity;
          instrumentalEmissions += instrument.quantity * instrument.emissionFactor;
          
          marketBasedFactors.push({
            type: instrument.type,
            quantity: instrument.quantity,
            unit: instrument.unit || 'kWh',
            emissionFactor: instrument.emissionFactor,
            emissions: instrument.quantity * instrument.emissionFactor
          });
        }
      }
      
      // Apply residual mix factor for remaining consumption
      const remainingConsumption = Math.max(0, consumptionQuantity - instrumentalConsumption);
      const residualMixFactor = await this.getResidualMixFactor(country);
      const residualEmissions = remainingConsumption * residualMixFactor;
      
      marketBasedEmissions = instrumentalEmissions + residualEmissions;
    }
    
    // Calculate renewable energy impact
    const renewableQuantity = renewableEnergyPortion?.quantity || 0;
    const renewablePercentage = consumptionQuantity > 0 ? 
      Math.round((renewableQuantity / consumptionQuantity) * 10000) / 100 : 0;
    
    return {
      activityData: {
        facilityDetails,
        consumptionQuantity,
        consumptionUnit: consumptionUnit || 'kWh',
        renewableEnergyPortion,
        contractualInstruments: marketBasedFactors,
        reportingPeriod
      },
      emissionFactors: {
        locationBased: {
          gridFactor: locationFactor.emissionFactorData.totalCo2eFactor,
          unit: `kg CO2e/${locationFactor.emissionFactorData.unit}`,
          country: locationFactor.geographicScope.country,
          source: locationFactor.factorMetadata.source,
          sourceYear: new Date().getFullYear(),
          gridMix: locationFactor.fuelSpecifications.energyMix
        },
        marketBased: {
          averageFactor: marketBasedEmissions / consumptionQuantity,
          unit: 'kg CO2e/kWh',
          methodology: 'GHG Protocol Scope 2 Guidance',
          contractualInstruments: marketBasedFactors
        }
      },
      calculationResults: {
        locationBasedEmissions: Math.round(locationBasedEmissions * 100) / 100,
        marketBasedEmissions: Math.round(marketBasedEmissions * 100) / 100,
        emissionReduction: Math.round((locationBasedEmissions - marketBasedEmissions) * 100) / 100,
        renewablePercentage: renewablePercentage,
        calculationDate: new Date(),
        calculationMethod: 'GHG Protocol Scope 2 Dual Reporting'
      },
      qualityMetrics: {
        dataQuality: renewableQuantity > 0 || marketBasedFactors.length > 0 ? 'High' : 'Medium',
        locationBasedQuality: locationFactor.factorMetadata.dataQuality || 'High',
        marketBasedEvidence: contractualInstruments?.length > 0 ? 'Documented' : 'Default'
      }
    };
  }

  /**
   * Get residual mix emission factor for market-based calculations
   */
  async getResidualMixFactor(country) {
    // Residual mix factors account for contractual instruments already claimed
    const residualMixFactors = {
      'Ireland': 0.3850, // Higher than average grid due to claimed renewables
      'United Kingdom': 0.2450,
      'Germany': 0.4680,
      'Netherlands': 0.3920,
      'France': 0.0680,
      'Global': 0.4000
    };
    
    return residualMixFactors[country] || residualMixFactors['Global'];
  }

  /**
   * Calculate Scope 3 Business Travel Emissions
   */
  async calculateScope3BusinessTravel(activityData) {
    const { travelData, country = 'Ireland' } = activityData;
    const results = {
      airTravel: [],
      groundTravel: [],
      accommodation: [],
      totalEmissions: 0
    };

    // Process air travel
    if (travelData.flights) {
      for (const flight of travelData.flights) {
        const flightType = this.classifyFlightDistance(flight.distance);
        const emissionFactor = await this.getEmissionFactor(
          'Scope3', 
          'Business Travel', 
          'Aviation Fuel', 
          'Global'
        );
        
        const flightEmissions = flight.distance * flight.passengers * 
          emissionFactor.emissionFactorData.totalCo2eFactor;
        
        results.airTravel.push({
          ...flight,
          flightType,
          emissionFactor: emissionFactor.emissionFactorData.totalCo2eFactor,
          emissions: Math.round(flightEmissions * 100) / 100
        });
        
        results.totalEmissions += flightEmissions;
      }
    }

    // Process ground travel
    if (travelData.groundTransport) {
      for (const trip of travelData.groundTransport) {
        const emissionFactor = await this.getEmissionFactor(
          'Scope3', 
          'Business Travel', 
          trip.transportMode, 
          country
        );
        
        const tripEmissions = trip.distance * trip.passengers * 
          emissionFactor.emissionFactorData.totalCo2eFactor;
        
        results.groundTravel.push({
          ...trip,
          emissionFactor: emissionFactor.emissionFactorData.totalCo2eFactor,
          emissions: Math.round(tripEmissions * 100) / 100
        });
        
        results.totalEmissions += tripEmissions;
      }
    }

    return {
      activityData: travelData,
      calculationResults: {
        ...results,
        totalEmissions: Math.round(results.totalEmissions * 100) / 100,
        calculationDate: new Date(),
        calculationMethod: 'DEFRA Business Travel Factors'
      }
    };
  }

  /**
   * Classify flight distance for appropriate emission factors
   */
  classifyFlightDistance(distance) {
    if (distance < 500) return 'Short-haul';
    if (distance < 3700) return 'Medium-haul';
    return 'Long-haul';
  }

  /**
   * Validate calculation inputs and provide quality scoring
   */
  validateCalculationInputs(activityData, calculationType) {
    const validation = {
      isValid: true,
      errors: [],
      warnings: [],
      dataQuality: 'High',
      completeness: 100
    };

    // Common validations
    if (!activityData || typeof activityData !== 'object') {
      validation.errors.push('Activity data is required and must be an object');
      validation.isValid = false;
      return validation;
    }

    // Type-specific validations
    switch (calculationType) {
      case 'stationaryCombustion':
        if (!activityData.fuelType) {
          validation.errors.push('Fuel type is required for stationary combustion');
        }
        if (!activityData.consumptionQuantity || activityData.consumptionQuantity <= 0) {
          validation.errors.push('Valid consumption quantity is required');
        }
        if (!activityData.sourceCategory) {
          validation.warnings.push('Source category not specified - using default');
          validation.dataQuality = 'Medium';
        }
        break;
        
      case 'mobileCombustion':
        if (!activityData.fuelType) {
          validation.errors.push('Fuel type is required for mobile combustion');
        }
        if (!activityData.calculationMethod) {
          validation.errors.push('Calculation method is required');
        }
        if (activityData.calculationMethod === 'spend-based') {
          validation.warnings.push('Spend-based calculations have higher uncertainty');
          validation.dataQuality = 'Low';
        }
        break;
    }

    // Calculate completeness
    const requiredFields = this.getRequiredFields(calculationType);
    const providedFields = Object.keys(activityData).filter(key => 
      activityData[key] !== null && activityData[key] !== undefined
    );
    
    validation.completeness = Math.round((providedFields.length / requiredFields.length) * 100);
    
    if (validation.completeness < 80) {
      validation.dataQuality = validation.completeness < 50 ? 'Low' : 'Medium';
    }

    validation.isValid = validation.errors.length === 0;
    return validation;
  }

  /**
   * Get required fields for each calculation type
   */
  getRequiredFields(calculationType) {
    const fieldMap = {
      'stationaryCombustion': ['fuelType', 'consumptionQuantity', 'consumptionUnit', 'sourceCategory'],
      'mobileCombustion': ['fuelType', 'calculationMethod', 'vehicleCategory'],
      'fugitiveEmissions': ['refrigerantType', 'calculationMethod'],
      'electricityConsumption': ['consumptionQuantity', 'consumptionUnit']
    };
    
    return fieldMap[calculationType] || [];
  }
}

module.exports = new ExcelBasedCalculationService();