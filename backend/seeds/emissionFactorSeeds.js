/**
 * VSME ESG Platform - Emission Factor Seeding
 * Comprehensive emission factors for demo and production use
 */

const EmissionFactor = require('../models/EmissionFactor');

const emissionFactorData = [
  // SCOPE 1 - STATIONARY COMBUSTION (Ireland SEAI 2024)
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Natural Gas',
      description: 'Natural gas for stationary combustion'
    },
    emissionFactorData: {
      co2Factor: 0.1836,
      ch4Factor: 0.0000037,
      n2oFactor: 0.0000037,
      totalCo2eFactor: 0.1844,
      unit: 'kWh',
      uncertainty: 5.2,
      confidenceLevel: 'High'
    },
    calculationParameters: {
      netCalorificValue: 10.38
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Diesel',
      description: 'Gas oil/Diesel for stationary combustion'
    },
    emissionFactorData: {
      co2Factor: 2.52,
      ch4Factor: 0.000074,
      n2oFactor: 0.000074,
      totalCo2eFactor: 2.541,
      unit: 'litre',
      uncertainty: 4.8,
      confidenceLevel: 'High'
    },
    calculationParameters: {
      netCalorificValue: 10.0
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Fuel Oil',
      description: 'Heavy fuel oil for stationary combustion'
    },
    emissionFactorData: {
      co2Factor: 2.96,
      ch4Factor: 0.0001,
      n2oFactor: 0.00006,
      totalCo2eFactor: 2.977,
      unit: 'litre',
      uncertainty: 6.1,
      confidenceLevel: 'High'
    },
    calculationParameters: {
      netCalorificValue: 11.2
    }
  },

  // SCOPE 1 - MOBILE COMBUSTION
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Mobile',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Petrol',
      description: 'Petrol for mobile combustion'
    },
    emissionFactorData: {
      co2Factor: 2.17,
      ch4Factor: 0.00033,
      n2oFactor: 0.00008,
      totalCo2eFactor: 2.192,
      unit: 'litre',
      uncertainty: 3.9,
      confidenceLevel: 'High'
    },
    calculationParameters: {
      netCalorificValue: 9.2
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Mobile',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Diesel',
      description: 'Diesel for mobile combustion'
    },
    emissionFactorData: {
      co2Factor: 2.52,
      ch4Factor: 0.000074,
      n2oFactor: 0.000074,
      totalCo2eFactor: 2.541,
      unit: 'litre',
      uncertainty: 4.2,
      confidenceLevel: 'High'
    },
    calculationParameters: {
      netCalorificValue: 10.0
    }
  },

  // SCOPE 2 - ELECTRICITY (Ireland Grid 2024)
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Electricity',
      description: 'Grid electricity for Ireland'
    },
    emissionFactorData: {
      co2Factor: 0.295,
      ch4Factor: 0.0000021,
      n2oFactor: 0.0000043,
      totalCo2eFactor: 0.296,
      unit: 'kWh',
      uncertainty: 12.3,
      confidenceLevel: 'High'
    }
  },

  // UK FACTORS FOR COMPARISON
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid',
      source: 'DEFRA',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'United Kingdom'
    },
    fuelSpecifications: {
      fuelType: 'Electricity',
      description: 'Grid electricity for United Kingdom'
    },
    emissionFactorData: {
      co2Factor: 0.193,
      ch4Factor: 0.0000014,
      n2oFactor: 0.0000029,
      totalCo2eFactor: 0.194,
      unit: 'kWh',
      uncertainty: 8.7,
      confidenceLevel: 'High'
    }
  },

  // EU AVERAGE
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid',
      source: 'EEA',
      version: '2024.1',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'European Union'
    },
    fuelSpecifications: {
      fuelType: 'Electricity',
      description: 'Average grid electricity for European Union'
    },
    emissionFactorData: {
      co2Factor: 0.275,
      ch4Factor: 0.0000019,
      n2oFactor: 0.0000038,
      totalCo2eFactor: 0.276,
      unit: 'kWh',
      uncertainty: 15.2,
      confidenceLevel: 'Medium'
    }
  }
];

// Demo company data for calculations
const demoCompanyData = {
  name: 'Demo Manufacturing Company',
  sector: 'Manufacturing',
  employees: 150,
  revenue: 12500000, // €12.5M
  facilities: [
    {
      name: 'Main Production Facility',
      location: 'Dublin, Ireland',
      area: 5000, // m²
      operatingHours: 2400 // hours/year
    }
  ]
};

// Demo emissions data for seeding calculations
const demoEmissionsData = {
  scope1: {
    stationaryCombustion: [
      { fuelType: 'Natural Gas', quantity: 125000, unit: 'kWh' },
      { fuelType: 'Diesel', quantity: 2500, unit: 'litre' }
    ],
    mobileCombustion: [
      { 
        calculationMethod: 'fuel-based',
        fuelType: 'Diesel',
        fuelConsumption: 8500,
        type: 'Light Commercial Vehicle'
      },
      {
        calculationMethod: 'distance-based',
        type: 'HGV (7.5-17t)',
        distanceTraveled: 25000,
        distanceUnit: 'km'
      }
    ],
    fugitiveEmissions: [
      { type: 'R-404A', quantityLeaked: 2.5, equipmentType: 'Refrigeration', leakageRate: 5 }
    ]
  },
  scope2: {
    electricityData: [
      { 
        country: 'Ireland', 
        quantity: 280000, 
        unit: 'kWh',
        renewableEnergyConsumption: 50000 // 50 MWh from renewable sources
      }
    ]
  },
  country: 'Ireland',
  revenueData: {
    revenue: 12500000,
    currency: 'EUR'
  }
};

/**
 * Seed emission factors into database
 */
async function seedEmissionFactors() {
  try {
    console.log('🌱 Starting emission factor seeding...');
    
    // Clear existing data
    await EmissionFactor.deleteMany({});
    console.log('🧹 Cleared existing emission factors');
    
    // Insert emission factors
    const insertedFactors = await EmissionFactor.insertMany(emissionFactorData);
    console.log(`✅ Inserted ${insertedFactors.length} emission factors`);
    
    // Create indexes for performance
    await EmissionFactor.createIndexes();
    console.log('📊 Created database indexes');
    
    return {
      success: true,
      factorsSeeded: insertedFactors.length,
      demoData: demoEmissionsData
    };
    
  } catch (error) {
    console.error('❌ Error seeding emission factors:', error);
    throw error;
  }
}

/**
 * Get demo calculation data
 */
function getDemoCalculationData() {
  return {
    company: demoCompanyData,
    emissions: demoEmissionsData,
    scenarios: [
      {
        name: 'Current Operations',
        data: demoEmissionsData
      },
      {
        name: 'Renewable Energy Upgrade',
        data: {
          ...demoEmissionsData,
          scope2: {
            electricityData: [{
              ...demoEmissionsData.scope2.electricityData[0],
              renewableEnergyConsumption: 200000 // 200 MWh renewable
            }]
          }
        }
      },
      {
        name: 'Fleet Electrification',
        data: {
          ...demoEmissionsData,
          scope1: {
            ...demoEmissionsData.scope1,
            mobileCombustion: [
              // Reduced fleet emissions (50% electric)
              { 
                calculationMethod: 'fuel-based',
                fuelType: 'Diesel',
                fuelConsumption: 4250, // 50% reduction
                type: 'Light Commercial Vehicle'
              }
            ]
          },
          scope2: {
            electricityData: [{
              ...demoEmissionsData.scope2.electricityData[0],
              quantity: 310000 // Additional 30 MWh for fleet charging
            }]
          }
        }
      }
    ]
  };
}

module.exports = {
  seedEmissionFactors,
  getDemoCalculationData,
  emissionFactorData,
  demoCompanyData,
  demoEmissionsData
};