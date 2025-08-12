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

// B3 Energy and GHG Emissions detailed schema
const stationaryCombustionSchema = new mongoose.Schema({
  fuelType: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  emissionFactor: Number,
  calculatedEmissions: Number,
  calculationDate: Date,
  factorSource: String
}, { _id: false });

const mobileCombustionSchema = new mongoose.Schema({
  vehicleType: String,
  fuelType: String,
  quantity: Number,
  unit: String,
  emissionFactor: Number,
  calculatedEmissions: Number
}, { _id: false });

const fugitiveEmissionsSchema = new mongoose.Schema({
  refrigerant: String,
  quantityLeaked: Number,
  gwpValue: Number,
  calculatedEmissions: Number
}, { _id: false });

const scope1EmissionsSchema = new mongoose.Schema({
  stationaryCombustion: [stationaryCombustionSchema],
  mobileCombustion: [mobileCombustionSchema],
  fugitiveEmissions: [fugitiveEmissionsSchema],
  totalScope1: { type: Number, default: 0 }
}, { _id: false });

const scope2EmissionsSchema = new mongoose.Schema({
  locationBased: {
    electricityConsumption: Number,
    unit: String,
    gridEmissionFactor: Number,
    country: String,
    calculatedEmissions: Number
  },
  marketBased: {
    electricityConsumption: Number,
    renewableEnergyConsumption: Number,
    residualGridFactor: Number,
    calculatedEmissions: Number
  },
  totalScope2: { type: Number, default: 0 }
}, { _id: false });

const scope3CategorySchema = new mongoose.Schema({
  categoryNumber: Number,
  categoryName: String,
  applicability: Boolean,
  activityData: mongoose.Schema.Types.Mixed,
  emissionFactor: Number,
  calculatedEmissions: Number
}, { _id: false });

const scope3EmissionsSchema = new mongoose.Schema({
  categories: [scope3CategorySchema],
  totalScope3: { type: Number, default: 0 }
}, { _id: false });

const energyConsumptionSchema = new mongoose.Schema({
  totalEnergyConsumption: Number,
  renewableEnergyPercentage: Number,
  energyIntensity: Number
}, { _id: false });

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
    reportingFramework: mongoose.Schema.Types.Mixed,
    consolidationApproach: mongoose.Schema.Types.Mixed,
    reportingBoundary: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b2_sustainabilityPractices: {
    environmentalPractices: mongoose.Schema.Types.Mixed,
    socialPractices: mongoose.Schema.Types.Mixed,
    governancePractices: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b3_energyGHGEmissions: {
    scope1Emissions: scope1EmissionsSchema,
    scope2Emissions: scope2EmissionsSchema,
    scope3Emissions: scope3EmissionsSchema,
    energyConsumption: energyConsumptionSchema,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
  },
  b4_pollution: {
    airPollution: mongoose.Schema.Types.Mixed,
    waterPollution: mongoose.Schema.Types.Mixed,
    soilPollution: mongoose.Schema.Types.Mixed,
    completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    lastUpdated: { type: Date, default: Date.now }
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

// Indexes for performance
reportSchema.index({ companyId: 1, 'reportMetadata.reportingPeriod.fiscalYear': -1 });
reportSchema.index({ 'reportStatus.currentStatus': 1, 'reportStatus.lastModified': -1 });
reportSchema.index({ 'moduleConfiguration.selectedBasicModules': 1 });
reportSchema.index({ 'calculationResults.ghgEmissionsSummary.totalGHGEmissions': -1 });
reportSchema.index({ 'auditTrail.timestamp': -1, 'auditTrail.userId': 1 });

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