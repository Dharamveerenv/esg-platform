/**
 * Comprehensive Emission Factors Database Seed
 * Based on "Full Scope 1_2 Activity Data_Emission Factors V.0.xlsx"
 * Sources: SEAI (Ireland), DEFRA (UK), EPA (US), IPCC (Global)
 */

const EmissionFactor = require('../models/EmissionFactor');

const comprehensiveEmissionFactors = [
  
  // ============================================
  // SCOPE 1: STATIONARY COMBUSTION FACTORS
  // ============================================
  
  // NATURAL GAS
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 5.0,
      dataQuality: 'High'
    },
    fuelSpecifications: {
      fuelType: 'Natural Gas',
      description: 'Pipeline natural gas for industrial/commercial use',
      physicalState: 'Gas',
      density: null,
      calorificValue: 38.7, // MJ/m³
      carbonContent: 15.3 // kg C/GJ
    },
    emissionFactorData: {
      co2Factor: 1.8770, // kg CO2/m³
      ch4Factor: 0.000038, // kg CH4/m³ 
      n2oFactor: 0.0000036, // kg N2O/m³
      totalCo2eFactor: 1.8777, // kg CO2e/m³
      unit: 'm³',
      methodology: 'IPCC AR5 GWP (100-year)',
      oxidationFactor: 0.995,
      conversionFactor: 1.0
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },
  
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary Combustion',
      source: 'DEFRA',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 5.0
    },
    fuelSpecifications: {
      fuelType: 'Natural Gas',
      description: 'Pipeline natural gas for UK operations',
      physicalState: 'Gas',
      calorificValue: 38.7
    },
    emissionFactorData: {
      co2Factor: 1.8530,
      ch4Factor: 0.000037,
      n2oFactor: 0.0000037,
      totalCo2eFactor: 1.8537,
      unit: 'm³',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'United Kingdom',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // DIESEL OIL / GASOIL
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 3.0
    },
    fuelSpecifications: {
      fuelType: 'Diesel Oil',
      description: 'Automotive diesel oil (AGO) for stationary equipment',
      physicalState: 'Liquid',
      density: 0.845, // kg/litre
      calorificValue: 43.0, // MJ/kg
      carbonContent: 20.2 // kg C/GJ
    },
    emissionFactorData: {
      co2Factor: 2.6780, // kg CO2/litre
      ch4Factor: 0.0000338, // kg CH4/litre
      n2oFactor: 0.0000676, // kg N2O/litre
      totalCo2eFactor: 2.6801, // kg CO2e/litre
      unit: 'litre',
      methodology: 'IPCC AR5 GWP (100-year)',
      oxidationFactor: 0.99
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // HEAVY FUEL OIL
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 3.0
    },
    fuelSpecifications: {
      fuelType: 'Heavy Fuel Oil',
      description: 'Residual fuel oil for industrial heating',
      physicalState: 'Liquid',
      density: 0.952,
      calorificValue: 40.4,
      carbonContent: 21.1
    },
    emissionFactorData: {
      co2Factor: 3.1510,
      ch4Factor: 0.0000381,
      n2oFactor: 0.0000762,
      totalCo2eFactor: 3.1533,
      unit: 'litre',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // COAL - BITUMINOUS
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 10.0
    },
    fuelSpecifications: {
      fuelType: 'Bituminous Coal',
      description: 'Hard coal for industrial use',
      physicalState: 'Solid',
      density: null,
      calorificValue: 25.8,
      carbonContent: 25.8
    },
    emissionFactorData: {
      co2Factor: 2.0450, // kg CO2/kg
      ch4Factor: 0.000010, // kg CH4/kg
      n2oFactor: 0.000015, // kg N2O/kg
      totalCo2eFactor: 2.0455, // kg CO2e/kg
      unit: 'kg',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // LPG (LIQUEFIED PETROLEUM GAS)
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 5.0
    },
    fuelSpecifications: {
      fuelType: 'LPG',
      description: 'Liquefied Petroleum Gas (Propane/Butane mix)',
      physicalState: 'Gas',
      density: 0.52,
      calorificValue: 46.1,
      carbonContent: 17.2
    },
    emissionFactorData: {
      co2Factor: 1.5230, // kg CO2/litre
      ch4Factor: 0.0000152, // kg CH4/litre
      n2oFactor: 0.0000305, // kg N2O/litre
      totalCo2eFactor: 1.5240, // kg CO2e/litre
      unit: 'litre',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // ============================================
  // SCOPE 1: MOBILE COMBUSTION FACTORS
  // ============================================

  // PETROL/GASOLINE - CARS
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Mobile Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 3.0
    },
    fuelSpecifications: {
      fuelType: 'Petrol',
      description: 'Motor gasoline for passenger cars',
      physicalState: 'Liquid',
      density: 0.737,
      calorificValue: 44.3,
      carbonContent: 18.9,
      vehicleCategory: 'Passenger Cars'
    },
    emissionFactorData: {
      co2Factor: 2.3160, // kg CO2/litre
      ch4Factor: 0.0001737, // kg CH4/litre
      n2oFactor: 0.0000463, // kg N2O/litre
      totalCo2eFactor: 2.3208, // kg CO2e/litre
      unit: 'litre',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // DIESEL - CARS  
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Mobile Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 3.0
    },
    fuelSpecifications: {
      fuelType: 'Diesel',
      description: 'Automotive diesel for passenger cars',
      physicalState: 'Liquid',
      density: 0.845,
      calorificValue: 43.0,
      carbonContent: 20.2,
      vehicleCategory: 'Passenger Cars'
    },
    emissionFactorData: {
      co2Factor: 2.6780,
      ch4Factor: 0.0000338,
      n2oFactor: 0.0001352,
      totalCo2eFactor: 2.6823,
      unit: 'litre',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // DIESEL - HEAVY DUTY VEHICLES
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Mobile Combustion',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC 2006 Guidelines',
      uncertainty: 5.0
    },
    fuelSpecifications: {
      fuelType: 'Diesel',
      description: 'Automotive diesel for heavy duty vehicles',
      physicalState: 'Liquid',
      density: 0.845,
      calorificValue: 43.0,
      carbonContent: 20.2,
      vehicleCategory: 'Heavy Duty Vehicles'
    },
    emissionFactorData: {
      co2Factor: 2.6780,
      ch4Factor: 0.0000676,
      n2oFactor: 0.0000676,
      totalCo2eFactor: 2.6810,
      unit: 'litre',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // ============================================
  // SCOPE 1: FUGITIVE EMISSIONS - REFRIGERANTS
  // ============================================

  // HFC-134a
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Fugitive Emissions',
      source: 'IPCC',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC AR5',
      uncertainty: 20.0
    },
    fuelSpecifications: {
      fuelType: 'HFC-134a',
      description: '1,1,1,2-Tetrafluoroethane refrigerant',
      physicalState: 'Gas',
      chemicalFormula: 'CH2FCF3',
      ozoneDepletionPotential: 0,
      applications: ['Mobile Air Conditioning', 'Commercial Refrigeration']
    },
    emissionFactorData: {
      co2Factor: 0, // Direct emissions
      ch4Factor: 0,
      n2oFactor: 0,
      totalCo2eFactor: 1430, // kg CO2e/kg (GWP100)
      unit: 'kg',
      methodology: 'IPCC AR5 GWP (100-year)',
      gwpValue: 1430,
      atmosphericLifetime: 14 // years
    },
    geographicScope: {
      country: 'Global',
      region: 'Global',
      applicability: 'Global'
    },
    isActive: true
  },

  // HFC-404A
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Fugitive Emissions',
      source: 'IPCC',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC AR5',
      uncertainty: 20.0
    },
    fuelSpecifications: {
      fuelType: 'HFC-404A',
      description: 'Refrigerant blend (HFC-125/143a/134a)',
      physicalState: 'Gas',
      chemicalFormula: 'Blend',
      ozoneDepletionPotential: 0,
      applications: ['Commercial Refrigeration', 'Industrial Refrigeration']
    },
    emissionFactorData: {
      co2Factor: 0,
      ch4Factor: 0,
      n2oFactor: 0,
      totalCo2eFactor: 3920, // kg CO2e/kg
      unit: 'kg',
      methodology: 'IPCC AR5 GWP (100-year)',
      gwpValue: 3920
    },
    geographicScope: {
      country: 'Global',
      region: 'Global',
      applicability: 'Global'
    },
    isActive: true
  },

  // R-22 (HCFC-22)
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Fugitive Emissions',
      source: 'IPCC',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'IPCC AR5',
      uncertainty: 20.0
    },
    fuelSpecifications: {
      fuelType: 'HCFC-22',
      description: 'Chlorodifluoromethane (R-22)',
      physicalState: 'Gas',
      chemicalFormula: 'CHClF2',
      ozoneDepletionPotential: 0.055,
      applications: ['Air Conditioning', 'Refrigeration (Legacy)'],
      phaseOutStatus: 'Being phased out'
    },
    emissionFactorData: {
      co2Factor: 0,
      ch4Factor: 0,
      n2oFactor: 0,
      totalCo2eFactor: 1810, // kg CO2e/kg
      unit: 'kg',
      methodology: 'IPCC AR5 GWP (100-year)',
      gwpValue: 1810
    },
    geographicScope: {
      country: 'Global',
      region: 'Global',
      applicability: 'Global'
    },
    isActive: true
  },

  // ============================================
  // SCOPE 2: ELECTRICITY EMISSION FACTORS
  // ============================================

  // IRELAND GRID ELECTRICITY
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid Electricity',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'Location-based method',
      uncertainty: 8.0,
      dataQuality: 'High'
    },
    fuelSpecifications: {
      fuelType: 'Grid Electricity',
      description: 'National grid electricity (Ireland)',
      energyMix: {
        naturalGas: 45.2,
        renewable: 35.8,
        coal: 8.1,
        oil: 2.9,
        peat: 8.0
      },
      renewablePercentage: 35.8
    },
    emissionFactorData: {
      co2Factor: 0.3330, // kg CO2/kWh
      ch4Factor: 0.0000067, // kg CH4/kWh
      n2oFactor: 0.0000014, // kg N2O/kWh
      totalCo2eFactor: 0.3340, // kg CO2e/kWh
      unit: 'kWh',
      methodology: 'IPCC AR5 GWP (100-year)',
      transmissionLosses: 8.5 // %
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'National',
      gridOperator: 'EirGrid'
    },
    isActive: true
  },

  // UK GRID ELECTRICITY
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid Electricity',
      source: 'DEFRA',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'Location-based method',
      uncertainty: 5.0
    },
    fuelSpecifications: {
      fuelType: 'Grid Electricity',
      description: 'National grid electricity (United Kingdom)',
      energyMix: {
        naturalGas: 38.5,
        renewable: 42.3,
        nuclear: 15.5,
        coal: 1.7,
        oil: 2.0
      },
      renewablePercentage: 42.3
    },
    emissionFactorData: {
      co2Factor: 0.2130,
      ch4Factor: 0.0000043,
      n2oFactor: 0.0000009,
      totalCo2eFactor: 0.2140,
      unit: 'kWh',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'United Kingdom',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // GERMANY GRID ELECTRICITY
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid Electricity',
      source: 'UBA',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'Location-based method',
      uncertainty: 6.0
    },
    fuelSpecifications: {
      fuelType: 'Grid Electricity',
      description: 'National grid electricity (Germany)',
      energyMix: {
        renewable: 56.1,
        naturalGas: 10.9,
        coal: 26.1,
        nuclear: 6.9
      },
      renewablePercentage: 56.1
    },
    emissionFactorData: {
      co2Factor: 0.4200,
      ch4Factor: 0.0000084,
      n2oFactor: 0.0000017,
      totalCo2eFactor: 0.4220,
      unit: 'kWh',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Germany',
      region: 'EU',
      applicability: 'National'
    },
    isActive: true
  },

  // ============================================
  // SCOPE 2: DISTRICT HEATING
  // ============================================

  // DISTRICT HEATING - IRELAND
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'District Heating',
      source: 'SEAI',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'Location-based method',
      uncertainty: 10.0
    },
    fuelSpecifications: {
      fuelType: 'District Heating',
      description: 'Centralized heating system (Ireland)',
      heatSource: 'Mixed (Natural Gas, Biomass, Waste Heat)',
      efficiency: 85.0
    },
    emissionFactorData: {
      co2Factor: 0.1850, // kg CO2/kWh
      ch4Factor: 0.0000037,
      n2oFactor: 0.0000007,
      totalCo2eFactor: 0.1860,
      unit: 'kWh',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU',
      applicability: 'Regional'
    },
    isActive: true
  },

  // ============================================
  // SCOPE 3: BUSINESS TRAVEL FACTORS
  // ============================================

  // AIR TRAVEL - SHORT HAUL
  {
    factorMetadata: {
      category: 'Scope3',
      subCategory: 'Business Travel',
      source: 'DEFRA',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'Well-to-wheel emissions',
      uncertainty: 15.0
    },
    fuelSpecifications: {
      fuelType: 'Aviation Fuel',
      description: 'Jet A-1 kerosene for commercial aviation',
      flightType: 'Short-haul',
      distance: '< 500 km',
      aircraftType: 'Narrow-body'
    },
    emissionFactorData: {
      co2Factor: 0.1570, // kg CO2/passenger-km
      ch4Factor: 0.0000063, // kg CH4/passenger-km
      n2oFactor: 0.0000031, // kg N2O/passenger-km
      totalCo2eFactor: 0.1585, // kg CO2e/passenger-km
      unit: 'passenger-km',
      methodology: 'IPCC AR5 GWP (100-year)',
      radiativeForcing: 1.9 // Multiplier for high altitude effects
    },
    geographicScope: {
      country: 'Global',
      region: 'Global',
      applicability: 'Global'
    },
    isActive: true
  },

  // AIR TRAVEL - LONG HAUL
  {
    factorMetadata: {
      category: 'Scope3',
      subCategory: 'Business Travel',
      source: 'DEFRA',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'Well-to-wheel emissions',
      uncertainty: 15.0
    },
    fuelSpecifications: {
      fuelType: 'Aviation Fuel',
      description: 'Jet A-1 kerosene for international flights',
      flightType: 'Long-haul',
      distance: '> 3700 km',
      aircraftType: 'Wide-body'
    },
    emissionFactorData: {
      co2Factor: 0.0968,
      ch4Factor: 0.0000039,
      n2oFactor: 0.0000019,
      totalCo2eFactor: 0.0980,
      unit: 'passenger-km',
      methodology: 'IPCC AR5 GWP (100-year)',
      radiativeForcing: 1.9
    },
    geographicScope: {
      country: 'Global',
      region: 'Global',
      applicability: 'Global'
    },
    isActive: true
  },

  // RAIL TRAVEL
  {
    factorMetadata: {
      category: 'Scope3',
      subCategory: 'Business Travel',
      source: 'DEFRA',
      version: '2024',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      methodology: 'Well-to-wheel emissions',
      uncertainty: 10.0
    },
    fuelSpecifications: {
      fuelType: 'Rail Transport',
      description: 'National rail average (electric and diesel mix)',
      transportMode: 'Passenger Rail',
      energyMix: 'Electric/Diesel'
    },
    emissionFactorData: {
      co2Factor: 0.0357, // kg CO2/passenger-km
      ch4Factor: 0.0000014,
      n2oFactor: 0.0000007,
      totalCo2eFactor: 0.0360,
      unit: 'passenger-km',
      methodology: 'IPCC AR5 GWP (100-year)'
    },
    geographicScope: {
      country: 'United Kingdom',
      region: 'EU',
      applicability: 'Regional'
    },
    isActive: true
  }
];

/**
 * Seed the database with comprehensive emission factors
 */
async function seedEmissionFactors() {
  console.log('🌱 Starting comprehensive emission factors seeding...');
  
  try {
    // Clear existing emission factors
    console.log('🗑️  Clearing existing emission factors...');
    await EmissionFactor.deleteMany({});
    
    // Insert comprehensive emission factors
    console.log('📊 Inserting comprehensive emission factors...');
    const insertedFactors = await EmissionFactor.insertMany(comprehensiveEmissionFactors);
    
    console.log(`✅ Successfully inserted ${insertedFactors.length} emission factors`);
    
    // Create summary by category
    const summary = {
      Scope1: {
        'Stationary Combustion': insertedFactors.filter(f => 
          f.factorMetadata.category === 'Scope1' && 
          f.factorMetadata.subCategory === 'Stationary Combustion'
        ).length,
        'Mobile Combustion': insertedFactors.filter(f => 
          f.factorMetadata.category === 'Scope1' && 
          f.factorMetadata.subCategory === 'Mobile Combustion'
        ).length,
        'Fugitive Emissions': insertedFactors.filter(f => 
          f.factorMetadata.category === 'Scope1' && 
          f.factorMetadata.subCategory === 'Fugitive Emissions'
        ).length
      },
      Scope2: {
        'Grid Electricity': insertedFactors.filter(f => 
          f.factorMetadata.category === 'Scope2' && 
          f.factorMetadata.subCategory === 'Grid Electricity'
        ).length,
        'District Heating': insertedFactors.filter(f => 
          f.factorMetadata.category === 'Scope2' && 
          f.factorMetadata.subCategory === 'District Heating'
        ).length
      },
      Scope3: {
        'Business Travel': insertedFactors.filter(f => 
          f.factorMetadata.category === 'Scope3' && 
          f.factorMetadata.subCategory === 'Business Travel'
        ).length
      }
    };
    
    console.log('📈 Emission Factors Summary:');
    console.log(JSON.stringify(summary, null, 2));
    
    // Geographic coverage
    const countries = [...new Set(insertedFactors.map(f => f.geographicScope.country))];
    console.log(`🌍 Geographic coverage: ${countries.join(', ')}`);
    
    console.log('✅ Comprehensive emission factors seeding completed successfully!');
    
    return {
      success: true,
      totalFactors: insertedFactors.length,
      summary,
      countries
    };
    
  } catch (error) {
    console.error('❌ Error seeding emission factors:', error);
    throw error;
  }
}

module.exports = {
  comprehensiveEmissionFactors,
  seedEmissionFactors
};