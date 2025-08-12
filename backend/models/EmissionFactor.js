/**
 * VSME ESG Platform - Emission Factor Model
 * MongoDB Schema for comprehensive multi-source emission factor database
 */

const mongoose = require('mongoose');

const emissionFactorSchema = new mongoose.Schema({
  factorMetadata: {
    category: {
      type: String,
      enum: {
        values: ['Scope1', 'Scope2', 'Scope3'],
        message: 'Category must be Scope1, Scope2, or Scope3'
      },
      required: [true, 'Emission factor category is required']
    },
    subCategory: {
      type: String,
      enum: {
        values: ['Mobile', 'Stationary', 'Fugitive', 'Grid', 'Upstream', 'Downstream', 'Other'],
        message: 'Invalid sub-category'
      },
      required: [true, 'Sub-category is required']
    },
    source: {
      type: String,
      enum: {
        values: ['SEAI', 'UKGov', 'EPA', 'EEA', 'IPCC', 'IEA', 'DEFRA', 'Other'],
        message: 'Invalid emission factor source'
      },
      required: [true, 'Source is required']
    },
    version: {
      type: String,
      required: [true, 'Version is required'],
      trim: true,
      maxlength: 20
    },
    publishedDate: {
      type: Date,
      required: [true, 'Published date is required'],
      validate: {
        validator: function(date) {
          return date <= new Date();
        },
        message: 'Published date cannot be in the future'
      }
    },
    validFrom: {
      type: Date,
      required: [true, 'Valid from date is required']
    },
    validTo: {
      type: Date,
      required: [true, 'Valid to date is required'],
      validate: {
        validator: function(date) {
          return date > this.factorMetadata.validFrom;
        },
        message: 'Valid to date must be after valid from date'
      }
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  
  geographicScope: {
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      maxlength: 100
    },
    region: {
      type: String,
      trim: true,
      maxlength: 100
    },
    applicableRegions: [{
      type: String,
      trim: true,
      maxlength: 100
    }]
  },
  
  fuelSpecifications: {
    fuelType: {
      type: String,
      required: [true, 'Fuel type is required'],
      enum: {
        values: [
          // Liquid fuels
          'Diesel', 'Petrol', 'Fuel Oil', 'LPG', 'Aviation Gasoline', 'Jet Fuel', 'Marine Diesel',
          // Gaseous fuels
          'Natural Gas', 'Propane', 'Butane', 'Biogas', 'Hydrogen',
          // Solid fuels
          'Coal', 'Anthracite', 'Coke', 'Biomass', 'Wood', 'Peat',
          // Electricity
          'Electricity', 'Grid Electricity',
          // Refrigerants (for fugitive emissions)
          'R-404A', 'R-134a', 'R-407C', 'R-410A', 'R-22', 'R-32', 'CO2', 'Ammonia',
          // Other
          'Other'
        ],
        message: 'Invalid fuel type'
      }
    },
    fuelGrade: {
      type: String,
      trim: true,
      maxlength: 50
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    alternativeNames: [{
      type: String,
      trim: true,
      maxlength: 100
    }]
  },
  
  emissionFactorData: {
    co2Factor: {
      type: Number,
      required: [true, 'CO2 factor is required'],
      min: [0, 'CO2 factor cannot be negative'],
      validate: {
        validator: function(value) {
          return !isNaN(value) && isFinite(value);
        },
        message: 'CO2 factor must be a valid number'
      }
    },
    ch4Factor: {
      type: Number,
      min: [0, 'CH4 factor cannot be negative'],
      default: 0,
      validate: {
        validator: function(value) {
          return !isNaN(value) && isFinite(value);
        },
        message: 'CH4 factor must be a valid number'
      }
    },
    n2oFactor: {
      type: Number,
      min: [0, 'N2O factor cannot be negative'],
      default: 0,
      validate: {
        validator: function(value) {
          return !isNaN(value) && isFinite(value);
        },
        message: 'N2O factor must be a valid number'
      }
    },
    totalCo2eFactor: {
      type: Number,
      required: [true, 'Total CO2e factor is required'],
      min: [0, 'Total CO2e factor cannot be negative'],
      validate: {
        validator: function(value) {
          return !isNaN(value) && isFinite(value);
        },
        message: 'Total CO2e factor must be a valid number'
      }
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      enum: {
        values: ['litre', 'kg', 'kWh', 'm3', 'tonne', 'km', 'tkm', 'pkm', 'unit'],
        message: 'Invalid unit'
      }
    },
    uncertainty: {
      type: Number,
      min: [0, 'Uncertainty cannot be negative'],
      max: [100, 'Uncertainty cannot exceed 100%'],
      validate: {
        validator: function(value) {
          return value === undefined || (!isNaN(value) && isFinite(value));
        },
        message: 'Uncertainty must be a valid percentage'
      }
    },
    confidenceLevel: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Confidence level must be High, Medium, or Low'
      },
      default: 'Medium'
    }
  },
  
  calculationParameters: {
    netCalorificValue: {
      type: Number,
      min: [0, 'Net calorific value cannot be negative'],
      validate: {
        validator: function(value) {
          return value === undefined || (!isNaN(value) && isFinite(value));
        },
        message: 'Net calorific value must be a valid number'
      }
    },
    density: {
      type: Number,
      min: [0, 'Density cannot be negative'],
      validate: {
        validator: function(value) {
          return value === undefined || (!isNaN(value) && isFinite(value));
        },
        message: 'Density must be a valid number'
      }
    },
    carbonContent: {
      type: Number,
      min: [0, 'Carbon content cannot be negative'],
      max: [1, 'Carbon content cannot exceed 1 (100%)'],
      validate: {
        validator: function(value) {
          return value === undefined || (!isNaN(value) && isFinite(value));
        },
        message: 'Carbon content must be a valid decimal between 0 and 1'
      }
    },
    oxidationFactor: {
      type: Number,
      min: [0, 'Oxidation factor cannot be negative'],
      max: [1, 'Oxidation factor cannot exceed 1 (100%)'],
      validate: {
        validator: function(value) {
          return value === undefined || (!isNaN(value) && isFinite(value));
        },
        message: 'Oxidation factor must be a valid decimal between 0 and 1'
      }
    }
  },
  
  qualityIndicators: {
    dataQuality: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Data quality must be High, Medium, or Low'
      },
      default: 'Medium'
    },
    geographicRepresentativeness: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Geographic representativeness must be High, Medium, or Low'
      },
      default: 'Medium'
    },
    temporalRepresentativeness: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Temporal representativeness must be High, Medium, or Low'
      },
      default: 'Medium'
    },
    technologyRepresentativeness: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Technology representativeness must be High, Medium, or Low'
      },
      default: 'Medium'
    }
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes for optimal query performance
emissionFactorSchema.index({
  'factorMetadata.category': 1,
  'fuelSpecifications.fuelType': 1,
  'geographicScope.country': 1,
  'factorMetadata.validFrom': -1
});

emissionFactorSchema.index({
  'factorMetadata.source': 1,
  'factorMetadata.publishedDate': -1
});

emissionFactorSchema.index({
  isActive: 1,
  'factorMetadata.validTo': 1
});

emissionFactorSchema.index({
  'factorMetadata.category': 1,
  'factorMetadata.subCategory': 1
});

// Text index for search functionality
emissionFactorSchema.index({
  'fuelSpecifications.fuelType': 'text',
  'fuelSpecifications.description': 'text',
  'fuelSpecifications.alternativeNames': 'text'
});

// Pre-save middleware to update timestamps
emissionFactorSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  this.factorMetadata.lastUpdated = new Date();
  next();
});

// Virtual for factor age in days
emissionFactorSchema.virtual('ageInDays').get(function() {
  return Math.floor((new Date() - this.factorMetadata.publishedDate) / (1000 * 60 * 60 * 24));
});

// Virtual for validity status
emissionFactorSchema.virtual('isValid').get(function() {
  const now = new Date();
  return this.factorMetadata.validFrom <= now && now <= this.factorMetadata.validTo && this.isActive;
});

// Instance method to check if factor is valid for date
emissionFactorSchema.methods.isValidForDate = function(date) {
  return this.factorMetadata.validFrom <= date && 
         date <= this.factorMetadata.validTo && 
         this.isActive;
};

// Instance method to calculate emissions
emissionFactorSchema.methods.calculateEmissions = function(activityData, activityUnit = null) {
  // Validate activity data
  if (!activityData || activityData < 0) {
    throw new Error('Activity data must be a positive number');
  }
  
  // Check if unit conversion is needed
  if (activityUnit && activityUnit !== this.emissionFactorData.unit) {
    // Unit conversion logic would be implemented here
    // For now, throw error if units don't match
    throw new Error(`Unit mismatch: expected ${this.emissionFactorData.unit}, got ${activityUnit}`);
  }
  
  return {
    co2Emissions: activityData * this.emissionFactorData.co2Factor,
    ch4Emissions: activityData * this.emissionFactorData.ch4Factor,
    n2oEmissions: activityData * this.emissionFactorData.n2oFactor,
    totalCo2eEmissions: activityData * this.emissionFactorData.totalCo2eFactor,
    activityData: activityData,
    unit: this.emissionFactorData.unit,
    emissionFactor: this.emissionFactorData.totalCo2eFactor,
    source: this.factorMetadata.source,
    uncertainty: this.emissionFactorData.uncertainty
  };
};

// Static method to find current factors
emissionFactorSchema.statics.findCurrent = function(category, fuelType, country) {
  const now = new Date();
  return this.findOne({
    'factorMetadata.category': category,
    'fuelSpecifications.fuelType': fuelType,
    'geographicScope.country': country,
    'factorMetadata.validFrom': { $lte: now },
    'factorMetadata.validTo': { $gte: now },
    isActive: true
  }).sort({ 'factorMetadata.validFrom': -1 });
};

// Static method to find factors by source
emissionFactorSchema.statics.findBySource = function(source, isActive = true) {
  return this.find({
    'factorMetadata.source': source,
    isActive: isActive
  }).sort({ 'factorMetadata.publishedDate': -1 });
};

// Static method to get available fuel types
emissionFactorSchema.statics.getAvailableFuelTypes = function(category = null) {
  const matchStage = { isActive: true };
  if (category) {
    matchStage['factorMetadata.category'] = category;
  }
  
  return this.aggregate([
    { $match: matchStage },
    { $group: { _id: '$fuelSpecifications.fuelType' } },
    { $sort: { _id: 1 } }
  ]);
};

// Static method to seed default emission factors
emissionFactorSchema.statics.seedDefaultFactors = async function() {
  const defaultFactors = [
    // SEAI Ireland factors
    {
      factorMetadata: {
        category: 'Scope1',
        subCategory: 'Stationary',
        source: 'SEAI',
        version: '2024',
        publishedDate: new Date('2024-01-01'),
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2024-12-31')
      },
      geographicScope: { country: 'Ireland' },
      fuelSpecifications: { fuelType: 'Natural Gas' },
      emissionFactorData: {
        co2Factor: 2.02,
        totalCo2eFactor: 2.02,
        unit: 'm3',
        confidenceLevel: 'High'
      }
    },
    {
      factorMetadata: {
        category: 'Scope1',
        subCategory: 'Mobile',
        source: 'SEAI',
        version: '2024',
        publishedDate: new Date('2024-01-01'),
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2024-12-31')
      },
      geographicScope: { country: 'Ireland' },
      fuelSpecifications: { fuelType: 'Diesel' },
      emissionFactorData: {
        co2Factor: 2.67,
        totalCo2eFactor: 2.67,
        unit: 'litre',
        confidenceLevel: 'High'
      }
    },
    // Scope 2 factors
    {
      factorMetadata: {
        category: 'Scope2',
        subCategory: 'Grid',
        source: 'SEAI',
        version: '2024',
        publishedDate: new Date('2024-01-01'),
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2024-12-31')
      },
      geographicScope: { country: 'Ireland' },
      fuelSpecifications: { fuelType: 'Electricity' },
      emissionFactorData: {
        co2Factor: 0.2263,
        totalCo2eFactor: 0.2263,
        unit: 'kWh',
        confidenceLevel: 'High'
      }
    }
  ];
  
  for (const factor of defaultFactors) {
    await this.findOneAndUpdate(
      {
        'factorMetadata.category': factor.factorMetadata.category,
        'fuelSpecifications.fuelType': factor.fuelSpecifications.fuelType,
        'geographicScope.country': factor.geographicScope.country,
        'factorMetadata.source': factor.factorMetadata.source
      },
      factor,
      { upsert: true, new: true }
    );
  }
  
  console.log('Default emission factors seeded successfully');
};

module.exports = mongoose.model('EmissionFactor', emissionFactorSchema);