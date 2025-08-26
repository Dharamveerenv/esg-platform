/**
 * B3 Enhanced Energy & GHG Emissions Module Schema
 * Comprehensive integration with activity data and emission factors
 */

const mongoose = require('mongoose');
const {
  stationaryCombustionActivitySchema,
  mobileCombustionActivitySchema,
  fugitiveEmissionsActivitySchema,
  scope2ActivityDataSchema
} = require('./B3ComprehensiveEmissions');

// Enhanced Scope 1 Emissions Schema
const enhancedScope1EmissionsSchema = new mongoose.Schema({
  stationaryCombustion: {
    activities: [stationaryCombustionActivitySchema],
    totalCo2Emissions: {
      type: Number,
      min: [0, 'Total CO2 emissions cannot be negative'],
      default: 0
    },
    totalCh4Emissions: {
      type: Number,
      min: [0, 'Total CH4 emissions cannot be negative'],
      default: 0
    },
    totalN2oEmissions: {
      type: Number,
      min: [0, 'Total N2O emissions cannot be negative'],
      default: 0
    },
    totalCo2eEmissions: {
      type: Number,
      min: [0, 'Total CO2e emissions cannot be negative'],
      default: 0
    },
    dataCompleteness: {
      type: Number,
      min: [0, 'Data completeness cannot be negative'],
      max: [100, 'Data completeness cannot exceed 100%'],
      default: 0
    },
    uncertaintyAssessment: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    }
  },
  mobileCombustion: {
    activities: [mobileCombustionActivitySchema],
    totalCo2Emissions: {
      type: Number,
      min: [0, 'Total CO2 emissions cannot be negative'],
      default: 0
    },
    totalCh4Emissions: {
      type: Number,
      min: [0, 'Total CH4 emissions cannot be negative'],
      default: 0
    },
    totalN2oEmissions: {
      type: Number,
      min: [0, 'Total N2O emissions cannot be negative'],
      default: 0
    },
    totalCo2eEmissions: {
      type: Number,
      min: [0, 'Total CO2e emissions cannot be negative'],
      default: 0
    },
    dataCompleteness: {
      type: Number,
      min: [0, 'Data completeness cannot be negative'],
      max: [100, 'Data completeness cannot exceed 100%'],
      default: 0
    }
  },
  fugitiveEmissions: {
    activities: [fugitiveEmissionsActivitySchema],
    totalRefrigerantEmissions: {
      type: Number,
      min: [0, 'Total refrigerant emissions cannot be negative'],
      default: 0
    },
    totalCo2eEmissions: {
      type: Number,
      min: [0, 'Total CO2e emissions cannot be negative'],
      default: 0
    },
    dataCompleteness: {
      type: Number,
      min: [0, 'Data completeness cannot be negative'],
      max: [100, 'Data completeness cannot exceed 100%'],
      default: 0
    }
  },
  processEmissions: {
    activities: [{
      processType: {
        type: String,
        required: true,
        enum: [
          'Cement Production',
          'Iron and Steel Production',
          'Aluminum Production',
          'Chemical Processes',
          'Pulp and Paper',
          'Glass Production',
          'Lime Production',
          'Ammonia Production',
          'Other Industrial Processes'
        ]
      },
      processDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
      },
      activityData: {
        quantity: {
          type: Number,
          required: true,
          min: [0, 'Activity quantity cannot be negative']
        },
        unit: {
          type: String,
          required: true,
          enum: ['tonnes product', 'tonnes raw material', 'MWh', 'GJ', 'units', 'other']
        },
        customUnit: String,
        dataSource: String
      },
      emissionFactor: {
        value: {
          type: Number,
          required: true,
          min: [0, 'Emission factor cannot be negative']
        },
        unit: String,
        source: String,
        sourceYear: Number
      },
      calculatedEmissions: {
        type: Number,
        required: true,
        min: [0, 'Calculated emissions cannot be negative']
      },
      calculationDate: {
        type: Date,
        default: Date.now
      }
    }],
    totalCo2eEmissions: {
      type: Number,
      min: [0, 'Total CO2e emissions cannot be negative'],
      default: 0
    }
  },
  // Scope 1 Summary
  totalScope1Emissions: {
    stationaryTotal: {
      type: Number,
      default: 0
    },
    mobileTotal: {
      type: Number,
      default: 0
    },
    fugitiveTotal: {
      type: Number,
      default: 0
    },
    processTotal: {
      type: Number,
      default: 0
    },
    grandTotal: {
      type: Number,
      default: 0,
      required: true
    },
    unit: {
      type: String,
      default: 'tCO2e'
    },
    uncertaintyRange: {
      lower: Number,
      upper: Number,
      confidenceLevel: {
        type: Number,
        default: 95
      }
    }
  }
}, { _id: false, timestamps: false });

// Enhanced Scope 2 Emissions Schema
const enhancedScope2EmissionsSchema = new mongoose.Schema({
  electricityConsumption: {
    activities: [scope2ActivityDataSchema],
    totalConsumption: {
      type: Number,
      min: [0, 'Total consumption cannot be negative'],
      default: 0
    },
    totalConsumptionUnit: {
      type: String,
      default: 'kWh'
    },
    renewableEnergyConsumption: {
      type: Number,
      min: [0, 'Renewable energy consumption cannot be negative'],
      default: 0
    },
    renewablePercentage: {
      type: Number,
      min: [0, 'Renewable percentage cannot be negative'],
      max: [100, 'Renewable percentage cannot exceed 100%'],
      default: 0
    }
  },
  steam: {
    activities: [{
      facilityName: {
        type: String,
        required: true
      },
      provider: String,
      consumptionQuantity: {
        type: Number,
        required: true,
        min: [0, 'Steam consumption cannot be negative']
      },
      consumptionUnit: {
        type: String,
        required: true,
        enum: ['kg', 'tonnes', 'lbs', 'MMBtu', 'GJ']
      },
      emissionFactor: {
        value: Number,
        unit: String,
        source: String
      },
      calculatedEmissions: {
        type: Number,
        min: [0, 'Calculated emissions cannot be negative']
      }
    }],
    totalEmissions: {
      type: Number,
      default: 0
    }
  },
  heatingCooling: {
    activities: [{
      energyType: {
        type: String,
        required: true,
        enum: ['District Heating', 'District Cooling', 'Purchased Heat', 'Purchased Cooling']
      },
      facilityName: String,
      provider: String,
      consumptionQuantity: {
        type: Number,
        required: true,
        min: [0, 'Consumption cannot be negative']
      },
      consumptionUnit: String,
      emissionFactor: {
        value: Number,
        unit: String,
        source: String
      },
      calculatedEmissions: Number
    }],
    totalEmissions: {
      type: Number,
      default: 0
    }
  },
  // Scope 2 Calculations
  locationBasedEmissions: {
    electricity: {
      type: Number,
      default: 0
    },
    steam: {
      type: Number,
      default: 0
    },
    heatingCooling: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0,
      required: true
    }
  },
  marketBasedEmissions: {
    electricity: {
      type: Number,
      default: 0
    },
    steam: {
      type: Number,
      default: 0
    },
    heatingCooling: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0,
      required: true
    }
  },
  // Quality Assessment
  dataQuality: {
    electricityDataQuality: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    },
    emissionFactorQuality: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    },
    overallUncertainty: {
      type: Number,
      min: [0, 'Uncertainty cannot be negative'],
      max: [100, 'Uncertainty cannot exceed 100%']
    }
  }
}, { _id: false, timestamps: false });

// Enhanced Energy Consumption Schema
const enhancedEnergyConsumptionSchema = new mongoose.Schema({
  totalEnergyConsumption: {
    value: {
      type: Number,
      min: [0, 'Total energy consumption cannot be negative'],
      default: 0
    },
    unit: {
      type: String,
      default: 'GJ'
    },
    breakdown: {
      electricity: {
        type: Number,
        default: 0
      },
      naturalGas: {
        type: Number,
        default: 0
      },
      fuelOil: {
        type: Number,
        default: 0
      },
      coal: {
        type: Number,
        default: 0
      },
      renewableFuels: {
        type: Number,
        default: 0
      },
      steam: {
        type: Number,
        default: 0
      },
      other: {
        type: Number,
        default: 0
      }
    }
  },
  renewableEnergyConsumption: {
    value: {
      type: Number,
      min: [0, 'Renewable energy consumption cannot be negative'],
      default: 0
    },
    percentage: {
      type: Number,
      min: [0, 'Renewable percentage cannot be negative'],
      max: [100, 'Renewable percentage cannot exceed 100%'],
      default: 0
    },
    breakdown: {
      solar: {
        type: Number,
        default: 0
      },
      wind: {
        type: Number,
        default: 0
      },
      hydroelectric: {
        type: Number,
        default: 0
      },
      biomass: {
        type: Number,
        default: 0
      },
      geothermal: {
        type: Number,
        default: 0
      },
      other: {
        type: Number,
        default: 0
      }
    }
  },
  energyIntensityMetrics: {
    revenueIntensity: {
      value: {
        type: Number,
        min: [0, 'Revenue intensity cannot be negative']
      },
      unit: {
        type: String,
        default: 'GJ/EUR'
      }
    },
    employeeIntensity: {
      value: {
        type: Number,
        min: [0, 'Employee intensity cannot be negative']
      },
      unit: {
        type: String,
        default: 'GJ/FTE'
      }
    },
    floorAreaIntensity: {
      value: {
        type: Number,
        min: [0, 'Floor area intensity cannot be negative']
      },
      unit: {
        type: String,
        default: 'GJ/m²'
      }
    },
    productionIntensity: {
      value: {
        type: Number,
        min: [0, 'Production intensity cannot be negative']
      },
      unit: String,
      productionMetric: String
    }
  },
  targets: {
    energyReductionTarget: {
      targetYear: Number,
      baselineYear: Number,
      reductionPercentage: {
        type: Number,
        min: [0, 'Reduction percentage cannot be negative'],
        max: [100, 'Reduction percentage cannot exceed 100%']
      },
      currentProgress: {
        type: Number,
        min: [0, 'Current progress cannot be negative'],
        max: [100, 'Current progress cannot exceed 100%']
      }
    },
    renewableEnergyTarget: {
      targetYear: Number,
      targetPercentage: {
        type: Number,
        min: [0, 'Target percentage cannot be negative'],
        max: [100, 'Target percentage cannot exceed 100%']
      },
      currentProgress: {
        type: Number,
        min: [0, 'Current progress cannot be negative'],
        max: [100, 'Current progress cannot exceed 100%']
      }
    }
  }
}, { _id: false, timestamps: false });

// Complete B3 Enhanced Module Schema
const b3EnhancedEnergyGHGEmissionsSchema = new mongoose.Schema({
  scope1Emissions: enhancedScope1EmissionsSchema,
  scope2Emissions: enhancedScope2EmissionsSchema,
  energyConsumption: enhancedEnergyConsumptionSchema,
  
  // Overall Module Metadata
  reportingPeriod: {
    startDate: Date,
    endDate: Date,
    dataCollectionCutoff: Date
  },
  
  // Data Management
  dataManagement: {
    dataCollectionResponsible: String,
    dataReviewedBy: String,
    dataApprovedBy: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    dataRetentionPolicy: String,
    backupProcedures: String
  },
  
  // Verification and Assurance
  verification: {
    internalReview: {
      completed: {
        type: Boolean,
        default: false
      },
      reviewedBy: String,
      reviewDate: Date,
      reviewComments: String
    },
    externalVerification: {
      required: {
        type: Boolean,
        default: false
      },
      verificationBody: String,
      verificationStandard: {
        type: String,
        enum: ['ISO 14064-3', 'ISO 14065', 'ISAE 3410', 'Other']
      },
      verificationLevel: {
        type: String,
        enum: ['Limited', 'Reasonable', 'Not Applicable']
      },
      verificationDate: Date,
      verificationOpinion: {
        type: String,
        enum: ['Clean', 'Qualified', 'Adverse', 'Disclaimer']
      },
      materialityThreshold: Number
    }
  },
  
  // Calculation Summary
  calculationSummary: {
    totalScope1: {
      type: Number,
      default: 0,
      min: [0, 'Total Scope 1 cannot be negative']
    },
    totalScope2LocationBased: {
      type: Number,
      default: 0,
      min: [0, 'Total Scope 2 location-based cannot be negative']
    },
    totalScope2MarketBased: {
      type: Number,
      default: 0,
      min: [0, 'Total Scope 2 market-based cannot be negative']
    },
    combinedScope1And2: {
      type: Number,
      default: 0,
      min: [0, 'Combined Scope 1&2 cannot be negative']
    },
    totalEnergyConsumption: {
      type: Number,
      default: 0,
      min: [0, 'Total energy consumption cannot be negative']
    },
    renewableEnergyPercentage: {
      type: Number,
      default: 0,
      min: [0, 'Renewable energy percentage cannot be negative'],
      max: [100, 'Renewable energy percentage cannot exceed 100%']
    },
    carbonIntensity: {
      value: {
        type: Number,
        min: [0, 'Carbon intensity cannot be negative']
      },
      unit: {
        type: String,
        default: 'tCO2e/EUR million'
      }
    },
    lastCalculated: {
      type: Date,
      default: Date.now
    }
  },
  
  // Completion Status
  completionStatus: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Complete', 'Under Review'],
    default: 'Not Started'
  },
  
  // Progress Tracking
  progressTracking: {
    dataEntryProgress: {
      type: Number,
      min: [0, 'Progress cannot be negative'],
      max: [100, 'Progress cannot exceed 100%'],
      default: 0
    },
    calculationProgress: {
      type: Number,
      min: [0, 'Progress cannot be negative'],
      max: [100, 'Progress cannot exceed 100%'],
      default: 0
    },
    reviewProgress: {
      type: Number,
      min: [0, 'Progress cannot be negative'],
      max: [100, 'Progress cannot exceed 100%'],
      default: 0
    }
  },
  
  // Notes and Comments
  notes: {
    type: String,
    maxlength: 2000
  },
  
  // Methodology References
  methodologyReferences: [{
    standard: {
      type: String,
      enum: ['GHG Protocol', 'ISO 14064-1', 'PAS 2050', 'IPCC Guidelines', 'Other']
    },
    version: String,
    section: String,
    notes: String
  }]
}, { _id: false, timestamps: true });

module.exports = {
  b3EnhancedEnergyGHGEmissionsSchema,
  enhancedScope1EmissionsSchema,
  enhancedScope2EmissionsSchema,
  enhancedEnergyConsumptionSchema
};