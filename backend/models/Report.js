/**
 * Report Model - Comprehensive ESG Reports
 * Based on VSME ESG Backend Implementation Plan schema design
 */

const mongoose = require('mongoose');

// Sub-schemas for complex nested data
const reportMetadataSchema = new mongoose.Schema({
  reportingPeriod: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    fiscalYear: { type: Number, required: true },
    reportingFrequency: {
      type: String,
      enum: ['Annual', 'Biannual', 'Quarterly'],
      default: 'Annual'
    }
  },
  reportType: {
    type: String,
    enum: ['VSME', 'Full ESG', 'Sector-Specific'],
    default: 'VSME'
  },
  reportingStandards: [String],
  preparationBasis: String,
  consolidationMethod: String
}, { _id: false });

const reportStatusSchema = new mongoose.Schema({
  currentStatus: {
    type: String,
    enum: ['Draft', 'InProgress', 'Review', 'Complete', 'Published'],
    default: 'Draft'
  },
  completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  lastModified: { type: Date, default: Date.now },
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvals: [{
    approverRole: String,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedDate: Date,
    comments: String
  }]
}, { _id: false });

// Import enhanced B3 schemas
const { b3EnhancedEnergyGHGEmissionsSchema } = require('./schemas/B3EnhancedModule');

// Basic modules schemas
const basicModulesSchema = new mongoose.Schema({
  b0_generalInformation: {
    companyOverview: mongoose.Schema.Types.Mixed,
    reportingScope: mongoose.Schema.Types.Mixed,
    materiality: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b1_basisForPreparation: {
    reportingFramework: {
      primaryStandard: {
        type: String,
        enum: {
          values: ['GRI', 'SASB', 'TCFD', 'ISSB', 'EU-Taxonomy', 'VSME'],
          message: 'Primary standard must be one of: GRI, SASB, TCFD, ISSB, EU-Taxonomy, VSME'
        },
        required: [true, 'Primary reporting standard is required']
      },
      additionalStandards: [{
        standard: {
          type: String,
          enum: ['GRI', 'SASB', 'TCFD', 'ISSB', 'EU-Taxonomy', 'CDP', 'UN Global Compact', 'Other']
        },
        version: {
          type: String,
          trim: true,
          maxlength: 20
        },
        applicableModules: [{
          type: String,
          enum: ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 
                 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9']
        }]
      }],
      frameworkVersion: {
        type: String,
        required: [true, 'Framework version is required'],
        trim: true,
        maxlength: 20
      },
      deviations: {
        hasDeviations: {
          type: Boolean,
          default: false
        },
        deviationDetails: {
          type: String,
          trim: true,
          maxlength: 2000,
          validate: {
            validator: function(v) {
              return !this.reportingFramework.deviations.hasDeviations || (v && v.length > 0);
            },
            message: 'Deviation details are required when deviations exist'
          }
        },
        justification: {
          type: String,
          trim: true,
          maxlength: 1000,
          validate: {
            validator: function(v) {
              return !this.reportingFramework.deviations.hasDeviations || (v && v.length > 0);
            },
            message: 'Justification is required when deviations exist'
          }
        }
      }
    },
    consolidationApproach: {
      method: {
        type: String,
        enum: {
          values: ['Financial Control', 'Operational Control', 'Equity Share'],
          message: 'Consolidation method must be Financial Control, Operational Control, or Equity Share'
        },
        required: [true, 'Consolidation method is required']
      },
      description: {
        type: String,
        trim: true,
        maxlength: 1000,
        validate: {
          validator: function(v) {
            return !v || v.length >= 10;
          },
          message: 'Description must be at least 10 characters if provided'
        }
      },
      subsidiariesIncluded: [{
        name: {
          type: String,
          required: true,
          trim: true,
          maxlength: 200
        },
        ownershipPercentage: {
          type: Number,
          required: true,
          min: [0, 'Ownership percentage cannot be negative'],
          max: [100, 'Ownership percentage cannot exceed 100%']
        },
        consolidationMethod: {
          type: String,
          enum: ['Full Consolidation', 'Proportional Consolidation', 'Equity Method', 'Excluded'],
          required: true
        },
        exclusionReason: {
          type: String,
          trim: true,
          maxlength: 500,
          validate: {
            validator: function(v) {
              return this.consolidationMethod !== 'Excluded' || (v && v.length > 0);
            },
            message: 'Exclusion reason is required when subsidiary is excluded'
          }
        }
      }],
      jointVentures: [{
        name: {
          type: String,
          required: true,
          trim: true,
          maxlength: 200
        },
        ownershipPercentage: {
          type: Number,
          required: true,
          min: [0, 'Ownership percentage cannot be negative'],
          max: [100, 'Ownership percentage cannot exceed 100%']
        },
        consolidationTreatment: {
          type: String,
          enum: ['Equity Method', 'Proportional Consolidation', 'Full Consolidation', 'Excluded'],
          required: true
        }
      }]
    },
    reportingBoundary: {
      organizationalBoundary: {
        description: {
          type: String,
          required: [true, 'Organizational boundary description is required'],
          trim: true,
          maxlength: 2000,
          minlength: [20, 'Description must be at least 20 characters']
        },
        legalEntitiesIncluded: [{
          type: String,
          trim: true,
          maxlength: 200
        }],
        geographicCoverage: [{
          type: String,
          trim: true,
          maxlength: 100
        }]
      },
      operationalBoundary: {
        scope1Included: {
          type: Boolean,
          required: [true, 'Scope 1 inclusion status is required'],
          default: true
        },
        scope2Included: {
          type: Boolean,
          required: [true, 'Scope 2 inclusion status is required'],
          default: true
        },
        scope3Categories: [{
          categoryNumber: {
            type: Number,
            required: true,
            min: 1,
            max: 15
          },
          categoryName: {
            type: String,
            required: true,
            enum: [
              'Purchased goods and services',
              'Capital goods',
              'Fuel- and energy-related activities',
              'Upstream transportation and distribution',
              'Waste generated in operations',
              'Business travel',
              'Employee commuting',
              'Upstream leased assets',
              'Downstream transportation and distribution',
              'Processing of sold products',
              'Use of sold products',
              'End-of-life treatment of sold products',
              'Downstream leased assets',
              'Franchises',
              'Investments'
            ]
          },
          included: {
            type: Boolean,
            required: true,
            default: false
          },
          exclusionReason: {
            type: String,
            trim: true,
            maxlength: 500,
            validate: {
              validator: function(v) {
                return this.included || (v && v.length > 0);
              },
              message: 'Exclusion reason is required when category is not included'
            }
          }
        }]
      },
      temporalBoundary: {
        reportingPeriodStart: {
          type: Date,
          required: [true, 'Reporting period start date is required'],
          validate: {
            validator: function(v) {
              return v <= new Date();
            },
            message: 'Reporting period start cannot be in the future'
          }
        },
        reportingPeriodEnd: {
          type: Date,
          required: [true, 'Reporting period end date is required'],
          validate: {
            validator: function(v) {
              return v > this.reportingBoundary.temporalBoundary.reportingPeriodStart;
            },
            message: 'Reporting period end must be after start date'
          }
        },
        dataCollectionCutoff: {
          type: Date,
          required: [true, 'Data collection cutoff date is required'],
          validate: {
            validator: function(v) {
              return v >= this.reportingBoundary.temporalBoundary.reportingPeriodEnd;
            },
            message: 'Data collection cutoff must be on or after reporting period end'
          }
        },
        priorPeriodAdjustments: {
          type: String,
          trim: true,
          maxlength: 1000
        }
      }
    },
    completionStatus: { 
      type: String, 
      enum: ['Incomplete', 'Complete'], 
      default: 'Incomplete' 
    },
    lastUpdated: { type: Date, default: Date.now },
    validation: {
      completenessCheck: {
        type: Boolean,
        default: false
      },
      qualityScore: {
        type: Number,
        min: 0,
        max: 100,
        validate: {
          validator: function(v) {
            return v === undefined || (!isNaN(v) && isFinite(v));
          },
          message: 'Quality score must be a valid number between 0 and 100'
        }
      },
      validationNotes: {
        type: String,
        trim: true,
        maxlength: 2000
      }
    }
  },
  b2_sustainabilityPractices: {
    environmentalPractices: {
      climateChange: {
        hasPolicy: { type: Boolean, default: false },
        policyDocument: {
          filename: String,
          url: String,
          uploadDate: { type: Date, default: Date.now }
        },
        implementationDate: {
          type: Date,
          validate: {
            validator: function(v) {
              return !v || v <= new Date();
            },
            message: 'Implementation date cannot be in the future'
          }
        },
        lastReviewDate: {
          type: Date,
          validate: {
            validator: function(v) {
              return !v || v <= new Date();
            },
            message: 'Last review date cannot be in the future'
          }
        },
        effectiveness: {
          type: String,
          enum: {
            values: ['High', 'Medium', 'Low', 'Not Assessed'],
            message: 'Effectiveness must be High, Medium, Low, or Not Assessed'
          },
          default: 'Not Assessed'
        },
        kpis: [{
          metric: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
          },
          targetValue: {
            type: Number,
            required: true,
            validate: {
              validator: function(v) {
                return !isNaN(v) && isFinite(v);
              },
              message: 'Target value must be a valid number'
            }
          },
          currentValue: {
            type: Number,
            validate: {
              validator: function(v) {
                return v === undefined || (!isNaN(v) && isFinite(v));
              },
              message: 'Current value must be a valid number'
            }
          },
          unit: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20
          }
        }],
        initiatives: [{
          type: String,
          trim: true,
          maxlength: 500
        }]
      },
      energyManagement: {
        hasPolicy: { type: Boolean, default: false },
        energyManagementSystem: {
          type: String,
          enum: ['ISO 50001', 'ISO 14001', 'Internal System', 'Other', 'None'],
          default: 'None'
        },
        renewableEnergyTargets: {
          targetPercentage: {
            type: Number,
            min: [0, 'Target percentage cannot be negative'],
            max: [100, 'Target percentage cannot exceed 100%'],
            validate: {
              validator: function(v) {
                return v === undefined || (!isNaN(v) && isFinite(v));
              },
              message: 'Target percentage must be a valid number'
            }
          },
          targetDate: {
            type: Date,
            validate: {
              validator: function(v) {
                return !v || v >= new Date();
              },
              message: 'Target date must be in the future'
            }
          },
          currentPercentage: {
            type: Number,
            min: [0, 'Current percentage cannot be negative'],
            max: [100, 'Current percentage cannot exceed 100%'],
            validate: {
              validator: function(v) {
                return v === undefined || (!isNaN(v) && isFinite(v));
              },
              message: 'Current percentage must be a valid number'
            }
          }
        },
        efficiencyMeasures: [{
          type: String,
          trim: true,
          maxlength: 300
        }]
      },
      wasteManagement: {
        hasPolicy: { type: Boolean, default: false },
        wasteReductionTargets: {
          reductionPercentage: {
            type: Number,
            min: [0, 'Reduction percentage cannot be negative'],
            max: [100, 'Reduction percentage cannot exceed 100%']
          },
          baselineYear: {
            type: Number,
            min: [2000, 'Baseline year must be 2000 or later'],
            max: [new Date().getFullYear(), 'Baseline year cannot be in the future']
          },
          targetYear: {
            type: Number,
            min: [2024, 'Target year must be 2024 or later'],
            validate: {
              validator: function(v) {
                return !v || !this.environmentalPractices.wasteManagement.wasteReductionTargets.baselineYear || 
                       v > this.environmentalPractices.wasteManagement.wasteReductionTargets.baselineYear;
              },
              message: 'Target year must be after baseline year'
            }
          }
        },
        recyclingPrograms: [{
          type: String,
          trim: true,
          maxlength: 300
        }],
        circularEconomyInitiatives: [{
          type: String,
          trim: true,
          maxlength: 300
        }]
      },
      waterManagement: {
        hasPolicy: { type: Boolean, default: false },
        waterEfficiencyTargets: {
          reductionPercentage: {
            type: Number,
            min: [0, 'Reduction percentage cannot be negative'],
            max: [100, 'Reduction percentage cannot exceed 100%']
          },
          baselineYear: {
            type: Number,
            min: [2000, 'Baseline year must be 2000 or later'],
            max: [new Date().getFullYear(), 'Baseline year cannot be in the future']
          },
          targetYear: {
            type: Number,
            min: [2024, 'Target year must be 2024 or later']
          }
        },
        waterConservationMeasures: [{
          type: String,
          trim: true,
          maxlength: 300
        }]
      },
      biodiversityProtection: {
        hasPolicy: { type: Boolean, default: false },
        biodiversityImpactAssessment: { type: Boolean, default: false },
        conservationInitiatives: [{
          type: String,
          trim: true,
          maxlength: 300
        }],
        habitatRestoration: [{
          type: String,
          trim: true,
          maxlength: 300
        }]
      }
    },
    socialPractices: {
      employeeWellbeing: {
        wellnessPrograms: [{
          type: String,
          trim: true,
          maxlength: 200
        }],
        workLifeBalanceInitiatives: [{
          type: String,
          trim: true,
          maxlength: 200
        }],
        mentalHealthSupport: { type: Boolean, default: false },
        safetyTraining: [{
          type: String,
          trim: true,
          maxlength: 200
        }]
      },
      diversityInclusion: {
        diversityPolicy: { type: Boolean, default: false },
        inclusionPrograms: [{
          type: String,
          trim: true,
          maxlength: 200
        }],
        diversityTargets: [{
          metric: {
            type: String,
            required: true,
            enum: ['Gender Diversity', 'Ethnic Diversity', 'Age Diversity', 'Leadership Diversity', 'Other']
          },
          targetValue: {
            type: Number,
            required: true,
            min: [0, 'Target value cannot be negative'],
            max: [100, 'Target value cannot exceed 100%']
          },
          currentValue: {
            type: Number,
            min: [0, 'Current value cannot be negative'],
            max: [100, 'Current value cannot exceed 100%']
          }
        }],
        payEquityAnalysis: { type: Boolean, default: false }
      },
      communityEngagement: {
        communityPrograms: [{
          type: String,
          trim: true,
          maxlength: 300
        }],
        localProcurementPolicy: { type: Boolean, default: false },
        communityInvestment: {
          annualBudget: {
            type: Number,
            min: [0, 'Annual budget cannot be negative'],
            validate: {
              validator: function(v) {
                return v === undefined || (!isNaN(v) && isFinite(v));
              },
              message: 'Annual budget must be a valid number'
            }
          },
          focusAreas: [{
            type: String,
            enum: ['Education', 'Healthcare', 'Environment', 'Economic Development', 'Arts & Culture', 'Other']
          }]
        },
        stakeholderEngagement: [{
          type: String,
          trim: true,
          maxlength: 200
        }]
      },
      humanRights: {
        humanRightsPolicy: { type: Boolean, default: false },
        dueDiligenceProcess: { type: Boolean, default: false },
        supplierCodeOfConduct: { type: Boolean, default: false },
        grievanceMechanism: { type: Boolean, default: false },
        humanRightsTraining: { type: Boolean, default: false }
      }
    },
    governancePractices: {
      boardDiversity: {
        diversityPolicy: { type: Boolean, default: false },
        currentComposition: {
          totalMembers: {
            type: Number,
            min: [1, 'Total members must be at least 1'],
            validate: {
              validator: function(v) {
                return v === undefined || (!isNaN(v) && isFinite(v) && Number.isInteger(v));
              },
              message: 'Total members must be a valid integer'
            }
          },
          femaleMembers: {
            type: Number,
            min: [0, 'Female members cannot be negative'],
            validate: {
              validator: function(v) {
                const total = this.governancePractices.boardDiversity.currentComposition.totalMembers;
                return v === undefined || !total || v <= total;
              },
              message: 'Female members cannot exceed total members'
            }
          },
          minorityMembers: {
            type: Number,
            min: [0, 'Minority members cannot be negative'],
            validate: {
              validator: function(v) {
                const total = this.governancePractices.boardDiversity.currentComposition.totalMembers;
                return v === undefined || !total || v <= total;
              },
              message: 'Minority members cannot exceed total members'
            }
          },
          independentMembers: {
            type: Number,
            min: [0, 'Independent members cannot be negative'],
            validate: {
              validator: function(v) {
                const total = this.governancePractices.boardDiversity.currentComposition.totalMembers;
                return v === undefined || !total || v <= total;
              },
              message: 'Independent members cannot exceed total members'
            }
          }
        },
        diversityTargets: {
          femaleRepresentation: {
            type: Number,
            min: [0, 'Female representation target cannot be negative'],
            max: [100, 'Female representation target cannot exceed 100%']
          },
          minorityRepresentation: {
            type: Number,
            min: [0, 'Minority representation target cannot be negative'],
            max: [100, 'Minority representation target cannot exceed 100%']
          }
        }
      },
      ethicsCompliance: {
        codeOfEthics: { type: Boolean, default: false },
        ethicsTraining: { type: Boolean, default: false },
        whistleblowerPolicy: { type: Boolean, default: false },
        complianceMonitoring: { type: Boolean, default: false },
        ethicsIncidents: {
          type: Number,
          min: [0, 'Ethics incidents cannot be negative'],
          validate: {
            validator: function(v) {
              return v === undefined || (!isNaN(v) && isFinite(v) && Number.isInteger(v));
            },
            message: 'Ethics incidents must be a valid integer'
          }
        }
      },
      riskManagement: {
        riskManagementFramework: { type: Boolean, default: false },
        climateRiskAssessment: { type: Boolean, default: false },
        cybersecurityPolicy: { type: Boolean, default: false },
        businessContinuityPlan: { type: Boolean, default: false },
        riskCommittee: { type: Boolean, default: false }
      },
      stakeholderEngagement: {
        engagementStrategy: { type: Boolean, default: false },
        regularConsultations: { type: Boolean, default: false },
        feedbackMechanisms: [{
          type: String,
          enum: ['Surveys', 'Focus Groups', 'Public Meetings', 'Online Platform', 'Social Media', 'Other']
        }],
        stakeholderMapping: { type: Boolean, default: false }
      }
    },
    completionStatus: { 
      type: String, 
      enum: ['Incomplete', 'Complete'], 
      default: 'Incomplete' 
    },
    lastUpdated: { type: Date, default: Date.now }
  },
  b3_energyGHGEmissions: b3EnhancedEnergyGHGEmissionsSchema,
  b4_pollution: {
    airPollution: {
      emissions: [{
        pollutantType: {
          type: String,
          required: true,
          enum: {
            values: ['NOx', 'SOx', 'PM2.5', 'PM10', 'VOCs', 'CO', 'NH3', 'NMVOC', 'Heavy Metals', 'Other'],
            message: 'Invalid pollutant type'
          }
        },
        quantity: {
          type: Number,
          required: true,
          min: [0, 'Pollutant quantity cannot be negative'],
          validate: {
            validator: function(v) {
              return !isNaN(v) && isFinite(v);
            },
            message: 'Pollutant quantity must be a valid number'
          }
        },
        unit: {
          type: String,
          required: true,
          enum: ['kg', 'tonnes', 'mg/m³', 'μg/m³', 'ppm', 'ppb']
        },
        source: {
          type: String,
          required: true,
          trim: true,
          maxlength: 200,
          enum: ['Manufacturing Process', 'Combustion', 'Fugitive Emissions', 'Storage', 'Transportation', 'Other']
        },
        facilityLocation: {
          type: String,
          trim: true,
          maxlength: 100
        },
        measurementMethod: {
          type: String,
          required: true,
          enum: ['Direct Measurement', 'Calculation', 'Estimation', 'Default Factor']
        },
        reportingPeriod: {
          startDate: Date,
          endDate: Date
        },
        regulatoryLimit: {
          value: Number,
          unit: String,
          regulation: String
        },
        exceedsLimit: {
          type: Boolean,
          default: false
        },
        mitigationMeasures: [{
          measure: {
            type: String,
            trim: true,
            maxlength: 300
          },
          effectiveness: {
            type: String,
            enum: ['High', 'Medium', 'Low', 'Unknown']
          },
          implementationDate: Date
        }]
      }],
      complianceStatus: {
        type: String,
        enum: ['Compliant', 'Non-Compliant', 'Under Review', 'Not Assessed'],
        default: 'Not Assessed'
      },
      totalExceedances: {
        type: Number,
        min: [0, 'Total exceedances cannot be negative'],
        default: 0
      },
      monitoringFrequency: {
        type: String,
        enum: ['Continuous', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually', 'As Required']
      }
    },
    waterPollution: {
      dischargePoints: [{
        pointId: {
          type: String,
          required: true,
          trim: true,
          maxlength: 50
        },
        location: {
          type: String,
          required: true,
          trim: true,
          maxlength: 200
        },
        receivingWaterBody: {
          name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
          },
          type: {
            type: String,
            enum: ['River', 'Lake', 'Sea', 'Groundwater', 'Municipal Sewer', 'Other']
          },
          sensitivity: {
            type: String,
            enum: ['High', 'Medium', 'Low', 'Unknown']
          }
        },
        pollutants: [{
          pollutantType: {
            type: String,
            required: true,
            enum: ['BOD', 'COD', 'TSS', 'Nitrogen', 'Phosphorus', 'Heavy Metals', 'pH', 'Temperature', 'Oil & Grease', 'Other']
          },
          concentration: {
            type: Number,
            required: true,
            min: [0, 'Concentration cannot be negative']
          },
          concentrationUnit: {
            type: String,
            required: true,
            enum: ['mg/L', 'μg/L', 'ppm', 'ppb', 'pH units', '°C']
          },
          dischargeVolume: {
            type: Number,
            min: [0, 'Discharge volume cannot be negative']
          },
          volumeUnit: {
            type: String,
            enum: ['L/day', 'm³/day', 'L/hour', 'm³/hour']
          },
          permitLimit: {
            value: Number,
            unit: String,
            permitNumber: String
          },
          exceedsLimit: {
            type: Boolean,
            default: false
          }
        }],
        treatmentMethod: {
          type: String,
          enum: ['Primary Treatment', 'Secondary Treatment', 'Tertiary Treatment', 'Advanced Treatment', 'No Treatment']
        },
        treatmentEfficiency: {
          type: Number,
          min: [0, 'Treatment efficiency cannot be negative'],
          max: [100, 'Treatment efficiency cannot exceed 100%']
        },
        monitoringFrequency: {
          type: String,
          enum: ['Continuous', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually']
        }
      }],
      totalDischargeVolume: {
        type: Number,
        min: [0, 'Total discharge volume cannot be negative']
      },
      dischargeVolumeUnit: {
        type: String,
        enum: ['m³/year', 'L/year', 'm³/day', 'L/day']
      },
      wasteWaterTreatmentCapacity: {
        type: Number,
        min: [0, 'Treatment capacity cannot be negative']
      },
      complianceStatus: {
        type: String,
        enum: ['Compliant', 'Non-Compliant', 'Under Review', 'Not Assessed'],
        default: 'Not Assessed'
      }
    },
    soilContamination: {
      contaminatedSites: [{
        siteId: {
          type: String,
          required: true,
          trim: true,
          maxlength: 50
        },
        location: {
          address: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300
          },
          coordinates: {
            latitude: Number,
            longitude: Number
          }
        },
        contaminants: [{
          contaminantType: {
            type: String,
            required: true,
            enum: ['Heavy Metals', 'Hydrocarbons', 'Pesticides', 'Solvents', 'PCBs', 'Asbestos', 'Radioactive Materials', 'Other']
          },
          concentration: {
            type: Number,
            required: true,
            min: [0, 'Concentration cannot be negative']
          },
          unit: {
            type: String,
            required: true,
            enum: ['mg/kg', 'μg/kg', 'ppm', 'ppb', 'Bq/kg']
          },
          regualtoryLimit: {
            value: Number,
            unit: String,
            standard: String
          },
          exceedsLimit: {
            type: Boolean,
            default: false
          },
          depthRange: {
            from: Number,
            to: Number,
            unit: { type: String, default: 'meters' }
          }
        }],
        contaminationSource: {
          type: String,
          required: true,
          enum: ['Historical Operations', 'Spills', 'Underground Storage Tanks', 'Landfill', 'Industrial Processes', 'Unknown', 'Other']
        },
        discoveryDate: {
          type: Date,
          validate: {
            validator: function(v) {
              return !v || v <= new Date();
            },
            message: 'Discovery date cannot be in the future'
          }
        },
        remediationStatus: {
          type: String,
          required: true,
          enum: ['Not Required', 'Planning', 'In Progress', 'Completed', 'Monitoring', 'Unknown']
        },
        remediationMethod: {
          type: String,
          enum: ['Excavation', 'Soil Washing', 'Bioremediation', 'Chemical Treatment', 'Containment', 'Natural Attenuation', 'Other']
        },
        remediationCost: {
          estimated: Number,
          actual: Number,
          currency: { type: String, default: 'EUR' }
        },
        riskAssessment: {
          humanHealthRisk: {
            type: String,
            enum: ['High', 'Medium', 'Low', 'Negligible', 'Not Assessed']
          },
          ecologicalRisk: {
            type: String,
            enum: ['High', 'Medium', 'Low', 'Negligible', 'Not Assessed']
          },
          groundwaterRisk: {
            type: String,
            enum: ['High', 'Medium', 'Low', 'Negligible', 'Not Assessed']
          }
        }
      }],
      totalContaminatedArea: {
        type: Number,
        min: [0, 'Total contaminated area cannot be negative']
      },
      areaUnit: {
        type: String,
        enum: ['m²', 'hectares', 'acres'],
        default: 'm²'
      },
      remediationBudget: {
        annual: Number,
        total: Number,
        currency: { type: String, default: 'EUR' }
      }
    },
    hazardousSubstances: {
      inventory: [{
        substanceName: {
          type: String,
          required: true,
          trim: true,
          maxlength: 200
        },
        casNumber: {
          type: String,
          trim: true,
          maxlength: 20
        },
        classification: {
          type: String,
          required: true,
          enum: ['Carcinogenic', 'Mutagenic', 'Toxic to Reproduction', 'Persistent Organic Pollutant', 'Other']
        },
        quantity: {
          type: Number,
          required: true,
          min: [0, 'Quantity cannot be negative']
        },
        unit: {
          type: String,
          required: true,
          enum: ['kg', 'tonnes', 'litres', 'm³']
        },
        storageLocation: {
          type: String,
          required: true,
          trim: true,
          maxlength: 200
        },
        usageCategory: {
          type: String,
          required: true,
          enum: ['Raw Material', 'Intermediate', 'Final Product', 'Byproduct', 'Waste']
        },
        safetyMeasures: [{
          type: String,
          trim: true,
          maxlength: 300
        }],
        disposalMethod: {
          type: String,
          enum: ['Recycling', 'Treatment', 'Disposal', 'Recovery', 'Other']
        },
        reportingThreshold: {
          value: Number,
          regulation: String
        },
        exceedsThreshold: {
          type: Boolean,
          default: false
        }
      }]
    },
    pollutionPrevention: {
      measures: [{
        measureType: {
          type: String,
          required: true,
          enum: ['Source Reduction', 'Process Modification', 'Equipment Upgrade', 'Best Practice', 'Technology Change', 'Other']
        },
        description: {
          type: String,
          required: true,
          trim: true,
          maxlength: 500
        },
        targetPollutants: [{
          type: String,
          enum: ['NOx', 'SOx', 'PM', 'VOCs', 'Water Pollutants', 'Soil Contaminants', 'Hazardous Substances']
        }],
        implementationDate: {
          type: Date,
          validate: {
            validator: function(v) {
              return !v || v <= new Date();
            },
            message: 'Implementation date cannot be in the future'
          }
        },
        investmentCost: {
          type: Number,
          min: [0, 'Investment cost cannot be negative']
        },
        expectedReduction: {
          percentage: {
            type: Number,
            min: [0, 'Expected reduction cannot be negative'],
            max: [100, 'Expected reduction cannot exceed 100%']
          },
          quantitative: {
            value: Number,
            unit: String
          }
        },
        actualReduction: {
          percentage: {
            type: Number,
            min: [0, 'Actual reduction cannot be negative'],
            max: [100, 'Actual reduction cannot exceed 100%']
          },
          quantitative: {
            value: Number,
            unit: String
          }
        },
        effectiveness: {
          type: String,
          enum: ['Highly Effective', 'Moderately Effective', 'Minimally Effective', 'Not Effective', 'Under Evaluation']
        }
      }]
    },
    completionStatus: { 
      type: String, 
      enum: ['Incomplete', 'Complete'], 
      default: 'Incomplete' 
    },
    lastUpdated: { 
      type: Date, 
      default: Date.now 
    },
    dataQuality: {
      overallScore: {
        type: Number,
        min: [0, 'Data quality score cannot be negative'],
        max: [100, 'Data quality score cannot exceed 100%']
      },
      completenessScore: {
        type: Number,
        min: [0, 'Completeness score cannot be negative'],
        max: [100, 'Completeness score cannot exceed 100%']
      },
      accuracyScore: {
        type: Number,
        min: [0, 'Accuracy score cannot be negative'],
        max: [100, 'Accuracy score cannot exceed 100%']
      },
      validationNotes: {
        type: String,
        trim: true,
        maxlength: 1000
      }
    }
  },
  b5_biodiversity: {
    habitatImpact: mongoose.Schema.Types.Mixed,
    speciesImpact: mongoose.Schema.Types.Mixed,
    conservationInitiatives: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b6_waterConsumption: {
    waterIntake: mongoose.Schema.Types.Mixed,
    waterDischarge: mongoose.Schema.Types.Mixed,
    efficiencyMeasures: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b7_wasteManagement: {
    wasteGeneration: mongoose.Schema.Types.Mixed,
    treatmentMethods: mongoose.Schema.Types.Mixed,
    reductionInitiatives: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b8_workforceGeneral: {
    demographics: mongoose.Schema.Types.Mixed,
    turnoverData: mongoose.Schema.Types.Mixed,
    totalEmployees: Number,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b9_healthSafety: {
    accidents: mongoose.Schema.Types.Mixed,
    incidents: mongoose.Schema.Types.Mixed,
    trainingRecords: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b10_remuneration: {
    payGapData: mongoose.Schema.Types.Mixed,
    benefits: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b11_corruptionBribery: {
    policies: mongoose.Schema.Types.Mixed,
    training: mongoose.Schema.Types.Mixed,
    incidents: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  }
}, { _id: false });

// Comprehensive modules schema
const comprehensiveModulesSchema = new mongoose.Schema({
  c1_businessModelStrategy: {
    businessModel: mongoose.Schema.Types.Mixed,
    strategy: mongoose.Schema.Types.Mixed,
    objectives: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  c2_governanceRisk: {
    boardComposition: mongoose.Schema.Types.Mixed,
    riskManagement: mongoose.Schema.Types.Mixed,
    committees: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  c3_environmentalManagement: mongoose.Schema.Types.Mixed,
  c4_climateAction: mongoose.Schema.Types.Mixed,
  c5_resourceManagement: mongoose.Schema.Types.Mixed,
  c6_workforceDevelopment: mongoose.Schema.Types.Mixed,
  c7_communityRelations: mongoose.Schema.Types.Mixed,
  c8_businessEthics: mongoose.Schema.Types.Mixed,
  c9_performanceMetrics: mongoose.Schema.Types.Mixed
}, { _id: false });

// Calculation results schema
const calculationResultsSchema = new mongoose.Schema({
  ghgEmissionsSummary: {
    totalScope1: Number,
    totalScope2: Number,
    totalScope3: Number,
    totalGHGEmissions: Number,
    emissionIntensity: Number,
    calculationTimestamp: Date
  },
  energyMetrics: {
    totalEnergyConsumption: Number,
    renewableEnergyPercentage: Number,
    energyEfficiencyRating: String
  },
  workforceMetrics: {
    employeeTurnoverRate: Number,
    genderPayGap: Number,
    accidentRate: Number,
    trainingHoursPerEmployee: Number
  },
  environmentalMetrics: {
    wasteRecyclingRate: Number,
    waterIntensity: Number,
    biodiversityScore: Number
  }
}, { _id: false });

// Audit trail schema
const auditTrailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'CALCULATE', 'SUBMIT', 'APPROVE', 'PUBLISH'],
    required: true
  },
  moduleAffected: String,
  timestamp: { type: Date, default: Date.now },
  changes: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  sessionId: String
}, { _id: false });

// Main Report Schema
const reportSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  reportMetadata: {
    type: reportMetadataSchema,
    required: true
  },
  moduleConfiguration: {
    selectedBasicModules: [String],
    selectedComprehensiveModules: [String],
    mandatoryModules: [String],
    optionalModules: [String]
  },
  reportStatus: reportStatusSchema,
  basicModules: basicModulesSchema,
  comprehensiveModules: comprehensiveModulesSchema,
  calculationResults: calculationResultsSchema,
  auditTrail: [auditTrailSchema],
  version: { type: Number, default: 1 },
  previousVersions: [{
    versionNumber: Number,
    archivedData: mongoose.Schema.Types.Mixed,
    archivedDate: Date,
    reason: String
  }]
}, {
  timestamps: true,
  collection: 'reports'
});

// Advanced compound indexes for optimal query performance
// Primary compound index for company reports with status filtering
reportSchema.index({
  companyId: 1,
  'reportMetadata.reportingPeriod.fiscalYear': -1,
  'reportStatus.currentStatus': 1
}, { 
  name: 'company_year_status_idx',
  background: true 
});

// Status and modification tracking for dashboard queries
reportSchema.index({
  'reportStatus.currentStatus': 1,
  'reportStatus.lastModified': -1,
  'reportStatus.completionPercentage': -1
}, { 
  name: 'status_tracking_idx',
  background: true 
});

// Emissions performance queries with industry benchmarking support
reportSchema.index({
  'calculationResults.ghgEmissionsSummary.totalGHGEmissions': -1,
  'calculationResults.ghgEmissionsSummary.totalScope1': -1,
  'calculationResults.ghgEmissionsSummary.totalScope2': -1
}, { 
  name: 'emissions_performance_idx',
  background: true 
});

// Module-specific access patterns
reportSchema.index({
  'moduleConfiguration.selectedBasicModules': 1,
  'moduleConfiguration.selectedComprehensiveModules': 1,
  companyId: 1
}, { 
  name: 'module_access_idx',
  background: true 
});

// Audit trail for compliance and tracking
reportSchema.index({
  'auditTrail.timestamp': -1,
  'auditTrail.userId': 1,
  'auditTrail.action': 1
}, { 
  name: 'audit_trail_idx',
  background: true 
});

// Company and time-based reporting queries
reportSchema.index({
  companyId: 1,
  'reportMetadata.reportType': 1,
  'reportMetadata.reportingPeriod.startDate': -1,
  'reportMetadata.reportingPeriod.endDate': -1
}, { 
  name: 'company_type_period_idx',
  background: true 
});

// Module completion tracking for progress analytics
reportSchema.index({
  'basicModules.b0_generalInformation.completionStatus': 1,
  'basicModules.b1_basisForPreparation.completionStatus': 1,
  'basicModules.b2_sustainabilityPractices.completionStatus': 1,
  'basicModules.b3_energyGHGEmissions.completionStatus': 1
}, { 
  name: 'module_completion_idx',
  background: true,
  sparse: true
});

// Energy and emissions data queries
reportSchema.index({
  'basicModules.b3_energyGHGEmissions.scope1Emissions.totalScope1': -1,
  'basicModules.b3_energyGHGEmissions.scope2Emissions.totalScope2': -1,
  'basicModules.b3_energyGHGEmissions.energyConsumption.totalEnergyConsumption': -1
}, { 
  name: 'energy_emissions_data_idx',
  background: true,
  sparse: true
});

// Workforce and social metrics indexing
reportSchema.index({
  'basicModules.b8_workforceGeneral.totalEmployees': -1,
  'calculationResults.workforceMetrics.employeeTurnoverRate': -1,
  'calculationResults.workforceMetrics.genderPayGap': -1
}, { 
  name: 'workforce_metrics_idx',
  background: true,
  sparse: true
});

// Comprehensive text search across report content
reportSchema.index({
  'basicModules.b0_generalInformation.companyOverview': 'text',
  'basicModules.b2_sustainabilityPractices': 'text',
  'basicModules.b1_basisForPreparation.reportingFramework': 'text'
}, { 
  name: 'report_content_text_idx',
  background: true,
  weights: {
    'basicModules.b0_generalInformation.companyOverview': 3,
    'basicModules.b2_sustainabilityPractices': 2,
    'basicModules.b1_basisForPreparation.reportingFramework': 1
  }
});

// Version and history tracking
reportSchema.index({
  companyId: 1,
  version: -1,
  'previousVersions.versionNumber': -1
}, { 
  name: 'version_history_idx',
  background: true
});

// Calculation results for analytics queries
reportSchema.index({
  'calculationResults.ghgEmissionsSummary.calculationTimestamp': -1,
  'calculationResults.ghgEmissionsSummary.totalGHGEmissions': -1,
  'calculationResults.energyMetrics.totalEnergyConsumption': -1
}, { 
  name: 'calculation_analytics_idx',
  background: true,
  sparse: true
});

// Methods
reportSchema.methods.calculateCompletionPercentage = function() {
  const totalModules = this.moduleConfiguration.selectedBasicModules.length + 
                      this.moduleConfiguration.selectedComprehensiveModules.length;
  
  let completedModules = 0;
  
  // Check basic modules
  this.moduleConfiguration.selectedBasicModules.forEach(moduleId => {
    const module = this.basicModules[moduleId];
    if (module && module.completionStatus === 'Complete') {
      completedModules++;
    }
  });
  
  // Check comprehensive modules
  this.moduleConfiguration.selectedComprehensiveModules.forEach(moduleId => {
    const module = this.comprehensiveModules[moduleId];
    if (module && module.completionStatus === 'Complete') {
      completedModules++;
    }
  });
  
  return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
};

reportSchema.methods.addAuditEntry = function(userId, action, moduleAffected, changes, context) {
  this.auditTrail.push({
    userId,
    action,
    moduleAffected,
    changes,
    ipAddress: context?.ipAddress,
    userAgent: context?.userAgent,
    sessionId: context?.sessionId
  });
};

// Static methods
reportSchema.statics.getCompanyReports = function(companyId, filters = {}) {
  const query = { companyId };
  
  if (filters.fiscalYear) {
    query['reportMetadata.reportingPeriod.fiscalYear'] = filters.fiscalYear;
  }
  
  if (filters.status) {
    query['reportStatus.currentStatus'] = filters.status;
  }
  
  return this.find(query)
    .populate('companyId', 'companyProfile.legalName')
    .sort({ 'reportMetadata.reportingPeriod.fiscalYear': -1 });
};

reportSchema.statics.getReportSummary = function(reportId) {
  return this.findById(reportId)
    .select('reportMetadata reportStatus calculationResults')
    .populate('companyId', 'companyProfile.legalName companyProfile.tradingName');
};

// Pre-save middleware
reportSchema.pre('save', function(next) {
  // Update completion percentage
  this.reportStatus.completionPercentage = this.calculateCompletionPercentage();
  
  // Update last modified timestamp
  this.reportStatus.lastModified = new Date();
  
  next();
});

// Export model
const Report = mongoose.model('Report', reportSchema);
module.exports = Report;