/**
 * B3 Comprehensive Energy & GHG Emissions Schema
 * Enhanced schema for detailed emission factors and activity data
 * Supports Full Scope 1_2 Activity Data & Emission Factors
 */

const mongoose = require('mongoose');

// Enhanced Stationary Combustion Schema
const stationaryCombustionActivitySchema = new mongoose.Schema({
  sourceCategory: {
    type: String,
    required: true,
    enum: [
      'Power Generation',
      'Process Heating',
      'Space Heating',
      'Water Heating',
      'Cooking',
      'Industrial Processes',
      'Other Stationary Combustion'
    ]
  },
  facilityName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  equipmentType: {
    type: String,
    required: true,
    enum: [
      'Boiler',
      'Furnace',
      'Kiln',
      'Oven',
      'Heater',
      'Generator',
      'Turbine',
      'Incinerator',
      'Flare',
      'Other'
    ]
  },
  fuelType: {
    type: String,
    required: true,
    enum: [
      // Natural Gas
      'Natural Gas',
      'Compressed Natural Gas (CNG)',
      'Liquefied Natural Gas (LNG)',
      'Biogas',
      'Landfill Gas',
      'Synthetic Gas',
      
      // Liquid Fuels
      'Diesel Oil',
      'Fuel Oil No. 1',
      'Fuel Oil No. 2',
      'Fuel Oil No. 4',
      'Fuel Oil No. 5',
      'Fuel Oil No. 6',
      'Kerosene',
      'Gasoline',
      'Jet Fuel',
      'Naphtha',
      'Propane',
      'Butane',
      'LPG',
      'Ethanol',
      'Biodiesel',
      'Waste Oil',
      
      // Solid Fuels
      'Anthracite Coal',
      'Bituminous Coal',
      'Sub-bituminous Coal',
      'Lignite Coal',
      'Coke',
      'Petroleum Coke',
      'Wood',
      'Wood Chips',
      'Wood Pellets',
      'Agricultural Residues',
      'Municipal Solid Waste',
      'Tire-derived Fuel',
      'Paper/Cardboard',
      'Plastics',
      
      // Other
      'Hydrogen',
      'Ammonia',
      'Other'
    ]
  },
  activityData: {
    consumptionQuantity: {
      type: Number,
      required: true,
      min: [0, 'Consumption quantity cannot be negative'],
      validate: {
        validator: function(v) {
          return !isNaN(v) && isFinite(v);
        },
        message: 'Consumption quantity must be a valid number'
      }
    },
    consumptionUnit: {
      type: String,
      required: true,
      enum: [
        // Volume
        'litre', 'gallon', 'm3', 'ft3', 'barrel',
        // Mass
        'kg', 'tonne', 'pound', 'ton',
        // Energy
        'MWh', 'kWh', 'GJ', 'TJ', 'MMBtu', 'therm', 'dekatherm'
      ]
    },
    reportingPeriod: {
      type: String,
      enum: ['Monthly', 'Quarterly', 'Annually'],
      default: 'Annually'
    },
    dataSource: {
      type: String,
      required: true,
      enum: ['Utility Bills', 'Meter Readings', 'Invoices', 'Estimates', 'Other']
    },
    dataQuality: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    }
  },
  emissionFactors: {
    co2Factor: {
      value: {
        type: Number,
        required: true,
        min: [0, 'CO2 factor cannot be negative']
      },
      unit: {
        type: String,
        required: true,
        enum: ['kg CO2/litre', 'kg CO2/gallon', 'kg CO2/m3', 'kg CO2/kg', 'kg CO2/tonne', 'kg CO2/MWh', 'kg CO2/GJ', 'kg CO2/MMBtu']
      },
      source: {
        type: String,
        required: true,
        enum: ['SEAI', 'DEFRA', 'EPA', 'IPCC', 'Custom', 'Supplier Specific']
      },
      sourceYear: {
        type: Number,
        required: true,
        min: [2000, 'Source year must be 2000 or later'],
        max: [new Date().getFullYear(), 'Source year cannot be in the future']
      }
    },
    ch4Factor: {
      value: Number,
      unit: String,
      source: String,
      sourceYear: Number
    },
    n2oFactor: {
      value: Number,
      unit: String,
      source: String,
      sourceYear: Number
    },
    totalCo2eFactor: {
      value: {
        type: Number,
        required: true,
        min: [0, 'Total CO2e factor cannot be negative']
      },
      unit: {
        type: String,
        required: true
      },
      methodology: {
        type: String,
        enum: ['IPCC AR4', 'IPCC AR5', 'IPCC AR6', 'Other'],
        default: 'IPCC AR5'
      }
    }
  },
  calculationResults: {
    co2Emissions: {
      type: Number,
      min: [0, 'CO2 emissions cannot be negative']
    },
    ch4Emissions: {
      type: Number,
      min: [0, 'CH4 emissions cannot be negative']
    },
    n2oEmissions: {
      type: Number,
      min: [0, 'N2O emissions cannot be negative']
    },
    totalCo2eEmissions: {
      type: Number,
      required: true,
      min: [0, 'Total CO2e emissions cannot be negative']
    },
    calculationDate: {
      type: Date,
      default: Date.now
    },
    calculationMethod: {
      type: String,
      enum: ['Direct', 'Estimation', 'Default Factor'],
      default: 'Direct'
    },
    uncertaintyPercentage: {
      type: Number,
      min: [0, 'Uncertainty cannot be negative'],
      max: [100, 'Uncertainty cannot exceed 100%']
    }
  },
  qualityAssurance: {
    verificationStatus: {
      type: String,
      enum: ['Unverified', 'Internal Review', 'External Verification'],
      default: 'Unverified'
    },
    verifiedBy: String,
    verificationDate: Date,
    notes: {
      type: String,
      maxlength: 1000
    }
  }
}, { _id: false, timestamps: false });

// Enhanced Mobile Combustion Schema
const mobileCombustionActivitySchema = new mongoose.Schema({
  sourceCategory: {
    type: String,
    required: true,
    enum: [
      'Company Vehicles',
      'Fleet Vehicles',
      'Construction Equipment',
      'Agricultural Equipment',
      'Marine Vessels',
      'Aircraft',
      'Rail Transport',
      'Other Mobile Sources'
    ]
  },
  vehicleDetails: {
    vehicleType: {
      type: String,
      required: true,
      enum: [
        'Cars', 'Light Commercial Vehicles', 'Heavy Duty Vehicles',
        'Buses', 'Motorcycles', 'Construction Equipment',
        'Agricultural Tractors', 'Forklifts', 'Ships', 'Aircraft',
        'Trains', 'Other'
      ]
    },
    vehicleClass: {
      type: String,
      enum: ['Light Duty', 'Medium Duty', 'Heavy Duty', 'Off-road']
    },
    engineSize: String,
    modelYear: {
      type: Number,
      min: [1900, 'Model year must be 1900 or later'],
      max: [new Date().getFullYear() + 1, 'Model year cannot be more than one year in the future']
    },
    fleetSize: {
      type: Number,
      min: [1, 'Fleet size must be at least 1']
    }
  },
  fuelType: {
    type: String,
    required: true,
    enum: [
      'Gasoline/Petrol',
      'Diesel',
      'Aviation Gasoline',
      'Jet Kerosene',
      'Marine Diesel',
      'Marine Fuel Oil',
      'LPG',
      'CNG',
      'Ethanol',
      'Biodiesel',
      'Electricity',
      'Hydrogen',
      'Other'
    ]
  },
  activityData: {
    calculationMethod: {
      type: String,
      required: true,
      enum: ['Fuel-based', 'Distance-based', 'Spend-based']
    },
    // Fuel-based method
    fuelConsumption: {
      quantity: {
        type: Number,
        min: [0, 'Fuel consumption cannot be negative']
      },
      unit: {
        type: String,
        enum: ['litre', 'gallon', 'kg', 'tonne', 'm3', 'kWh', 'MWh']
      }
    },
    // Distance-based method
    distanceTravelled: {
      distance: {
        type: Number,
        min: [0, 'Distance cannot be negative']
      },
      unit: {
        type: String,
        enum: ['km', 'miles', 'nautical miles']
      },
      fuelEfficiency: {
        value: Number,
        unit: String // e.g., 'km/litre', 'miles/gallon'
      }
    },
    // Data quality
    dataSource: {
      type: String,
      required: true,
      enum: ['Fuel Receipts', 'Fuel Cards', 'Odometer Readings', 'GPS Data', 'Fleet Management System', 'Estimates']
    },
    dataQuality: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    }
  },
  emissionFactors: {
    co2Factor: {
      value: {
        type: Number,
        required: true,
        min: [0, 'CO2 factor cannot be negative']
      },
      unit: String,
      source: String,
      sourceYear: Number
    },
    ch4Factor: {
      value: Number,
      unit: String,
      source: String,
      sourceYear: Number
    },
    n2oFactor: {
      value: Number,
      unit: String,
      source: String,
      sourceYear: Number
    },
    totalCo2eFactor: {
      value: {
        type: Number,
        required: true,
        min: [0, 'Total CO2e factor cannot be negative']
      },
      unit: String,
      methodology: String
    }
  },
  calculationResults: {
    co2Emissions: Number,
    ch4Emissions: Number,
    n2oEmissions: Number,
    totalCo2eEmissions: {
      type: Number,
      required: true,
      min: [0, 'Total CO2e emissions cannot be negative']
    },
    calculationDate: {
      type: Date,
      default: Date.now
    },
    calculationMethod: String,
    uncertaintyPercentage: Number
  }
}, { _id: false, timestamps: false });

// Enhanced Fugitive Emissions Schema
const fugitiveEmissionsActivitySchema = new mongoose.Schema({
  sourceCategory: {
    type: String,
    required: true,
    enum: [
      'Refrigeration Systems',
      'Air Conditioning Systems',
      'Fire Suppression Systems',
      'Industrial Processes',
      'Equipment Leaks',
      'Storage Tank Venting',
      'Other Fugitive Sources'
    ]
  },
  equipmentDetails: {
    equipmentType: {
      type: String,
      required: true,
      enum: [
        'Commercial Refrigeration',
        'Industrial Refrigeration',
        'Mobile Air Conditioning',
        'Stationary Air Conditioning',
        'Heat Pumps',
        'Fire Suppression',
        'Foam Blowing',
        'Solvents',
        'Other'
      ]
    },
    equipmentId: String,
    installationDate: Date,
    lastServiceDate: Date,
    capacity: {
      value: Number,
      unit: String
    }
  },
  refrigerantDetails: {
    refrigerantType: {
      type: String,
      required: true,
      enum: [
        // HFCs
        'HFC-134a', 'HFC-404A', 'HFC-407C', 'HFC-410A', 'HFC-507A', 'HFC-32',
        // HCFCs
        'HCFC-22', 'HCFC-141b', 'HCFC-142b',
        // CFCs
        'CFC-11', 'CFC-12', 'CFC-113', 'CFC-114', 'CFC-115',
        // PFCs
        'CF4', 'C2F6', 'C3F8', 'C4F10', 'C5F12', 'C6F14',
        // Other
        'SF6', 'NF3', 'NH3', 'CO2', 'Other'
      ]
    },
    gwpValue: {
      type: Number,
      required: true,
      min: [1, 'GWP value must be at least 1']
    },
    gwpSource: {
      type: String,
      enum: ['IPCC AR4', 'IPCC AR5', 'IPCC AR6'],
      default: 'IPCC AR5'
    }
  },
  activityData: {
    calculationMethod: {
      type: String,
      required: true,
      enum: ['Mass Balance', 'Screening', 'Direct Measurement']
    },
    // For Mass Balance method
    beginningInventory: {
      type: Number,
      min: [0, 'Beginning inventory cannot be negative']
    },
    purchases: {
      type: Number,
      min: [0, 'Purchases cannot be negative']
    },
    salesTransfers: {
      type: Number,
      min: [0, 'Sales/transfers cannot be negative']
    },
    endingInventory: {
      type: Number,
      min: [0, 'Ending inventory cannot be negative']
    },
    // For Screening method
    emissionFactor: {
      type: Number,
      min: [0, 'Emission factor cannot be negative']
    },
    capacity: {
      type: Number,
      min: [0, 'Capacity cannot be negative']
    },
    // Common
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'lbs', 'tonnes']
    },
    dataSource: {
      type: String,
      required: true,
      enum: ['Service Records', 'Purchase Records', 'Direct Measurement', 'Estimates']
    }
  },
  calculationResults: {
    refrigerantEmissions: {
      type: Number,
      required: true,
      min: [0, 'Refrigerant emissions cannot be negative']
    },
    co2eEmissions: {
      type: Number,
      required: true,
      min: [0, 'CO2e emissions cannot be negative']
    },
    calculationDate: {
      type: Date,
      default: Date.now
    },
    calculationNotes: {
      type: String,
      maxlength: 500
    }
  }
}, { _id: false, timestamps: false });

// Enhanced Scope 2 Emissions Schema
const scope2ActivityDataSchema = new mongoose.Schema({
  sourceCategory: {
    type: String,
    required: true,
    enum: [
      'Purchased Electricity',
      'Purchased Steam',
      'Purchased Heat',
      'Purchased Cooling'
    ]
  },
  facilityDetails: {
    facilityName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    meterNumber: String,
    utilityProvider: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    contractType: {
      type: String,
      enum: ['Standard Tariff', 'Green Tariff', 'PPA', 'Other']
    },
    gridConnection: {
      type: String,
      enum: ['National Grid', 'Regional Grid', 'Microgrid', 'Other']
    }
  },
  activityData: {
    consumptionQuantity: {
      type: Number,
      required: true,
      min: [0, 'Consumption cannot be negative']
    },
    consumptionUnit: {
      type: String,
      required: true,
      enum: ['kWh', 'MWh', 'GWh', 'kJ', 'MJ', 'GJ', 'TJ', 'MMBtu', 'therms']
    },
    monthlyConsumption: [{
      month: {
        type: String,
        enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      consumption: {
        type: Number,
        min: [0, 'Monthly consumption cannot be negative']
      },
      unit: String,
      peakDemand: Number,
      offPeakDemand: Number
    }],
    renewableEnergyPortion: {
      quantity: {
        type: Number,
        min: [0, 'Renewable energy portion cannot be negative']
      },
      percentage: {
        type: Number,
        min: [0, 'Renewable percentage cannot be negative'],
        max: [100, 'Renewable percentage cannot exceed 100%']
      },
      certificateType: {
        type: String,
        enum: ['RECs', 'GOs', 'I-RECs', 'Other']
      },
      certificateProvider: String,
      vintage: Number
    },
    dataSource: {
      type: String,
      required: true,
      enum: ['Utility Bills', 'Meter Readings', 'Sub-meter Data', 'Estimates']
    },
    dataQuality: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    }
  },
  emissionFactors: {
    locationBased: {
      gridFactor: {
        type: Number,
        required: true,
        min: [0, 'Grid factor cannot be negative']
      },
      unit: {
        type: String,
        required: true,
        default: 'kg CO2e/kWh'
      },
      country: {
        type: String,
        required: true
      },
      region: String,
      source: {
        type: String,
        required: true,
        enum: ['IEA', 'SEAI', 'DEFRA', 'EPA', 'National Grid', 'Other']
      },
      sourceYear: {
        type: Number,
        required: true,
        min: [2000, 'Source year must be 2000 or later']
      }
    },
    marketBased: {
      supplierSpecificFactor: {
        type: Number,
        min: [0, 'Supplier factor cannot be negative']
      },
      residualMixFactor: {
        type: Number,
        min: [0, 'Residual mix factor cannot be negative']
      },
      unit: String,
      source: String,
      sourceYear: Number,
      contractualInstruments: [{
        type: {
          type: String,
          enum: ['Green Tariff', 'Unbundled EACs', 'PPAs', 'Direct Line']
        },
        quantity: Number,
        unit: String,
        emissionFactor: Number
      }]
    }
  },
  calculationResults: {
    locationBasedEmissions: {
      type: Number,
      min: [0, 'Location-based emissions cannot be negative']
    },
    marketBasedEmissions: {
      type: Number,
      min: [0, 'Market-based emissions cannot be negative']
    },
    calculationDate: {
      type: Date,
      default: Date.now
    },
    calculationMethod: {
      type: String,
      enum: ['Standard', 'Hourly Matching', 'Monthly Matching']
    }
  }
}, { _id: false, timestamps: false });

// Comprehensive B3 Schema Export
module.exports = {
  stationaryCombustionActivitySchema,
  mobileCombustionActivitySchema,
  fugitiveEmissionsActivitySchema,
  scope2ActivityDataSchema
};