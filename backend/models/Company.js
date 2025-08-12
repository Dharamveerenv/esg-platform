/**
 * VSME ESG Platform - Company Model
 * MongoDB Schema for organization data with premises and compliance
 */

const mongoose = require('mongoose');

// Address schema for reuse
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true,
    maxlength: 200
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: 100
  },
  county: {
    type: String,
    required: [true, 'County is required'],
    trim: true,
    maxlength: 100
  },
  eircode: {
    type: String,
    validate: {
      validator: function(eircode) {
        // Irish Eircode format validation
        return /^[AC-FHKNPRTV-Y][0-9]{2}[AC-FHKNPRTV-Y0-9]{4}$/.test(eircode);
      },
      message: 'Please enter a valid Irish Eircode'
    },
    uppercase: true,
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    default: 'Ireland',
    maxlength: 100
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      validate: {
        validator: function(coords) {
          return coords.length === 2 && 
                 coords[0] >= -180 && coords[0] <= 180 && // longitude
                 coords[1] >= -90 && coords[1] <= 90; // latitude
        },
        message: 'Invalid coordinates format'
      }
    }
  }
}, { _id: false });

const companySchema = new mongoose.Schema({
  companyProfile: {
    legalName: {
      type: String,
      required: [true, 'Legal company name is required'],
      trim: true,
      maxlength: 200,
      unique: true
    },
    tradingName: {
      type: String,
      trim: true,
      maxlength: 200
    },
    companyRegistrationNumber: {
      type: String,
      required: [true, 'Company registration number is required'],
      trim: true,
      unique: true,
      validate: {
        validator: function(crn) {
          // Irish CRO number format validation
          return /^\d{6,8}$/.test(crn);
        },
        message: 'Please enter a valid company registration number'
      }
    },
    taxIdentificationNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function(tin) {
          // Irish VAT number format validation
          return /^IE\d{7}[A-W]{1,2}$/.test(tin);
        },
        message: 'Please enter a valid Irish VAT number'
      }
    },
    website: {
      type: String,
      validate: {
        validator: function(url) {
          return /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/.test(url);
        },
        message: 'Please enter a valid website URL'
      }
    },
    primaryEmail: {
      type: String,
      required: [true, 'Primary email is required'],
      lowercase: true,
      validate: {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email address'
      }
    },
    primaryPhone: {
      type: String,
      required: [true, 'Primary phone is required'],
      validate: {
        validator: function(phone) {
          return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
        },
        message: 'Please enter a valid phone number'
      }
    },
    establishedDate: {
      type: Date,
      validate: {
        validator: function(date) {
          return date <= new Date();
        },
        message: 'Established date cannot be in the future'
      }
    },
    logo: {
      type: String, // URL to logo file
      validate: {
        validator: function(url) {
          return !url || /^https?:\/\/.*\.(jpg|jpeg|png|gif|svg)$/i.test(url);
        },
        message: 'Logo must be a valid image URL'
      }
    }
  },
  
  headquarters: {
    type: addressSchema,
    required: [true, 'Headquarters address is required']
  },
  
  industryClassification: {
    primaryNACECode: {
      type: String,
      required: [true, 'Primary NACE code is required'],
      validate: {
        validator: function(code) {
          // NACE Rev. 2 code format validation (e.g., 01.11)
          return /^\d{2}\.\d{2}$/.test(code);
        },
        message: 'Please enter a valid NACE code (e.g., 01.11)'
      }
    },
    secondaryNACECodes: [{
      type: String,
      validate: {
        validator: function(code) {
          return /^\d{2}\.\d{2}$/.test(code);
        },
        message: 'Please enter valid NACE codes'
      }
    }],
    industryDescription: {
      type: String,
      required: [true, 'Industry description is required'],
      maxlength: 500
    },
    sectorType: {
      type: String,
      enum: {
        values: ['Agriculture', 'Manufacturing', 'Services', 'Energy', 'Construction', 'Technology', 'Finance', 'Healthcare', 'Education', 'Other'],
        message: 'Invalid sector type'
      },
      required: [true, 'Sector type is required']
    },
    subSectorDetails: {
      type: String,
      maxlength: 300
    }
  },
  
  operationalPremises: [{
    premiseId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    name: {
      type: String,
      required: [true, 'Premise name is required'],
      trim: true,
      maxlength: 200
    },
    type: {
      type: String,
      enum: {
        values: ['Headquarters', 'Production', 'Warehouse', 'Office', 'Retail', 'Laboratory', 'Distribution', 'Other'],
        message: 'Invalid premise type'
      },
      required: [true, 'Premise type is required']
    },
    address: {
      type: addressSchema,
      required: [true, 'Premise address is required']
    },
    operationalDetails: {
      floorArea: {
        type: Number,
        min: [1, 'Floor area must be at least 1 square meter'],
        max: [1000000, 'Floor area seems unreasonably large'],
        validate: {
          validator: Number.isInteger,
          message: 'Floor area must be a whole number'
        }
      },
      employeeCount: {
        type: Number,
        min: [0, 'Employee count cannot be negative'],
        max: [10000, 'Employee count seems unreasonably high'],
        validate: {
          validator: Number.isInteger,
          message: 'Employee count must be a whole number'
        }
      },
      operatingHours: {
        type: String,
        maxlength: 100
      },
      operationalSince: {
        type: Date,
        validate: {
          validator: function(date) {
            return date <= new Date();
          },
          message: 'Operational date cannot be in the future'
        }
      },
      certifications: [{
        type: String,
        enum: ['ISO14001', 'ISO45001', 'ISO50001', 'EMAS', 'FSC', 'PEFC', 'BRC', 'IFS', 'Other'],
        message: 'Invalid certification type'
      }]
    },
    utilities: {
      electricitySupplier: {
        type: String,
        trim: true,
        maxlength: 100
      },
      gasSupplier: {
        type: String,
        trim: true,
        maxlength: 100
      },
      waterSupplier: {
        type: String,
        trim: true,
        maxlength: 100
      },
      wasteManagementProvider: {
        type: String,
        trim: true,
        maxlength: 100
      }
    }
  }],
  
  corporateStructure: {
    ownershipType: {
      type: String,
      enum: {
        values: ['Private', 'Public', 'Partnership', 'Cooperative', 'Sole Proprietorship', 'Other'],
        message: 'Invalid ownership type'
      },
      required: [true, 'Ownership type is required']
    },
    parentCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    subsidiaries: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    }],
    stakeholders: [{
      name: {
        type: String,
        required: [true, 'Stakeholder name is required'],
        trim: true,
        maxlength: 200
      },
      type: {
        type: String,
        enum: {
          values: ['Investor', 'Partner', 'Government', 'NGO', 'Supplier', 'Customer', 'Community', 'Other'],
          message: 'Invalid stakeholder type'
        },
        required: [true, 'Stakeholder type is required']
      },
      ownershipPercentage: {
        type: Number,
        min: [0, 'Ownership percentage cannot be negative'],
        max: [100, 'Ownership percentage cannot exceed 100%']
      }
    }]
  },
  
  contactPersons: [{
    role: {
      type: String,
      enum: {
        values: ['CEO', 'CFO', 'ESG Manager', 'Sustainability Officer', 'Environmental Manager', 'Operations Manager', 'Other'],
        message: 'Invalid contact person role'
      },
      required: [true, 'Contact person role is required']
    },
    name: {
      type: String,
      required: [true, 'Contact person name is required'],
      trim: true,
      maxlength: 200
    },
    email: {
      type: String,
      required: [true, 'Contact person email is required'],
      lowercase: true,
      validate: {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email address'
      }
    },
    phone: {
      type: String,
      validate: {
        validator: function(phone) {
          return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
        },
        message: 'Please enter a valid phone number'
      }
    },
    department: {
      type: String,
      trim: true,
      maxlength: 100
    }
  }],
  
  complianceStatus: {
    vsmeReportingRequired: {
      type: Boolean,
      default: true
    },
    euTaxonomyApplicable: {
      type: Boolean,
      default: false
    },
    csrdApplicable: {
      type: Boolean,
      default: false
    },
    otherRegulations: [{
      type: String,
      enum: ['TCFD', 'GRI', 'SASB', 'CDP', 'SBTi', 'RE100', 'Other']
    }]
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance optimization
companySchema.index({ 'companyProfile.legalName': 'text', 'companyProfile.tradingName': 'text' });
companySchema.index({ 'companyProfile.companyRegistrationNumber': 1 }, { unique: true });
companySchema.index({ 'industryClassification.primaryNACECode': 1 });
companySchema.index({ 'headquarters.country': 1, 'headquarters.county': 1 });
companySchema.index({ 'operationalPremises.address.coordinates': '2dsphere' });
companySchema.index({ isActive: 1, createdAt: -1 });

// Pre-save middleware to update timestamps
companySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for total employees across all premises
companySchema.virtual('totalEmployees').get(function() {
  return this.operationalPremises.reduce((total, premise) => {
    return total + (premise.operationalDetails.employeeCount || 0);
  }, 0);
});

// Virtual for total floor area
companySchema.virtual('totalFloorArea').get(function() {
  return this.operationalPremises.reduce((total, premise) => {
    return total + (premise.operationalDetails.floorArea || 0);
  }, 0);
});

// Instance method to add premise
companySchema.methods.addPremise = function(premiseData) {
  this.operationalPremises.push(premiseData);
  return this.save();
};

// Instance method to remove premise
companySchema.methods.removePremise = function(premiseId) {
  this.operationalPremises.id(premiseId).remove();
  return this.save();
};

// Instance method to get premise by ID
companySchema.methods.getPremise = function(premiseId) {
  return this.operationalPremises.id(premiseId);
};

// Static method to find companies by NACE code
companySchema.statics.findByNACE = function(naceCode) {
  return this.find({
    $or: [
      { 'industryClassification.primaryNACECode': naceCode },
      { 'industryClassification.secondaryNACECodes': naceCode }
    ]
  });
};

// Static method to find companies by location
companySchema.statics.findByLocation = function(country, county = null) {
  const query = { 'headquarters.country': country };
  if (county) {
    query['headquarters.county'] = county;
  }
  return this.find(query);
};

module.exports = mongoose.model('Company', companySchema);