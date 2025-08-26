/**
 * Module Controller
 * Handles ESG module-specific operations
 */

const Report = require('../models/Report');
const { NotFoundError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// B0: General Information Module
const getModuleB0 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b0_generalInformation
    }
  });
});

const updateModuleB0 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b0_generalInformation': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b0_generalInformation
    }
  });
});

// B1: Basis for Preparation Module
const getModuleB1 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId)
    .populate('companyId', 'companyProfile.legalName companyProfile.tradingName');
    
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b1_basisForPreparation,
      reportMetadata: {
        companyName: report.companyId.companyProfile.legalName,
        reportingPeriod: report.reportMetadata.reportingPeriod
      }
    }
  });
});

const updateModuleB1 = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const updateData = req.body;
  
  // Validate reporting framework
  const validFrameworks = ['GRI', 'SASB', 'TCFD', 'ISSB', 'EU-Taxonomy'];
  const validConsolidationMethods = ['Financial Control', 'Operational Control', 'Equity Share'];
  
  if (updateData.reportingFramework?.primaryStandard && 
      !validFrameworks.includes(updateData.reportingFramework.primaryStandard)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid reporting framework. Must be one of: ' + validFrameworks.join(', ')
    });
  }
  
  if (updateData.consolidationApproach?.method && 
      !validConsolidationMethods.includes(updateData.consolidationApproach.method)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid consolidation method. Must be one of: ' + validConsolidationMethods.join(', ')
    });
  }
  
  // Structure the data according to schema
  const b1Data = {
    reportingFramework: updateData.reportingFramework || {},
    consolidationApproach: updateData.consolidationApproach || {},
    reportingBoundary: updateData.reportingBoundary || {},
    completionStatus: updateData.completionStatus || 'Incomplete',
    lastUpdated: new Date()
  };
  
  const report = await Report.findByIdAndUpdate(
    reportId,
    { 'basicModules.b1_basisForPreparation': b1Data },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  // Add audit trail entry
  report.addAuditEntry(
    req.user.id,
    'UPDATE',
    'B1_BASIS_FOR_PREPARATION',
    { updatedFields: Object.keys(updateData) },
    { 
      ipAddress: req.ip, 
      userAgent: req.get('User-Agent'),
      sessionId: req.sessionID 
    }
  );
  
  await report.save();
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b1_basisForPreparation,
      completionPercentage: report.reportStatus.completionPercentage
    }
  });
});

// B2: Sustainability Practices Module
const getModuleB2 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId)
    .populate('companyId', 'companyProfile.legalName companyProfile.industry');
    
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b2_sustainabilityPractices,
      reportMetadata: {
        companyName: report.companyId.companyProfile.legalName,
        industry: report.companyId.companyProfile.industry,
        reportingPeriod: report.reportMetadata.reportingPeriod
      }
    }
  });
});

const updateModuleB2 = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const updateData = req.body;
  
  // Validate effectiveness ratings
  const validEffectiveness = ['High', 'Medium', 'Low'];
  
  // Structure the data according to schema
  const b2Data = {
    environmentalPractices: updateData.environmentalPractices || {},
    socialPractices: updateData.socialPractices || {},
    governancePractices: updateData.governancePractices || {},
    completionStatus: updateData.completionStatus || 'Incomplete',
    lastUpdated: new Date()
  };
  
  // Calculate overall effectiveness score
  let totalPractices = 0;
  let effectivenessTotalScore = 0;
  
  ['environmentalPractices', 'socialPractices', 'governancePractices'].forEach(category => {
    if (b2Data[category]) {
      Object.values(b2Data[category]).forEach(practice => {
        if (practice.hasPolicy) {
          totalPractices++;
          const effectivenessScore = practice.effectiveness === 'High' ? 100 : 
                                   practice.effectiveness === 'Medium' ? 70 : 
                                   practice.effectiveness === 'Low' ? 40 : 0;
          effectivenessTotalScore += effectivenessScore;
        }
      });
    }
  });
  
  b2Data.overallEffectivenessScore = totalPractices > 0 ? 
    Math.round(effectivenessTotalScore / totalPractices) : 0;
  
  const report = await Report.findByIdAndUpdate(
    reportId,
    { 'basicModules.b2_sustainabilityPractices': b2Data },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  // Add audit trail entry
  report.addAuditEntry(
    req.user.id,
    'UPDATE',
    'B2_SUSTAINABILITY_PRACTICES',
    { 
      updatedFields: Object.keys(updateData),
      effectivenessScore: b2Data.overallEffectivenessScore
    },
    { 
      ipAddress: req.ip, 
      userAgent: req.get('User-Agent'),
      sessionId: req.sessionID 
    }
  );
  
  await report.save();
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b2_sustainabilityPractices,
      completionPercentage: report.reportStatus.completionPercentage,
      effectivenessScore: b2Data.overallEffectivenessScore
    }
  });
});

// B3: Energy and GHG Emissions Module
const getModuleB3 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b3_energyGHGEmissions
    }
  });
});

const updateModuleB3 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b3_energyGHGEmissions': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b3_energyGHGEmissions
    }
  });
});

// B8: Workforce General Module
const getModuleB8 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b8_workforceGeneral
    }
  });
});

const updateModuleB8 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b8_workforceGeneral': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b8_workforceGeneral
    }
  });
});

// Calculation functions
const calculateEmissions = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Emissions calculation functionality to be implemented'
  });
});

const validateEmissions = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Emissions validation functionality to be implemented'
  });
});

const calculateWorkforceMetrics = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Workforce metrics calculation functionality to be implemented'
  });
});

// Generic module endpoints for auto-save functionality
const getModuleData = catchAsync(async (req, res, next) => {
  const { reportId, moduleId } = req.params;
  const report = await Report.findById(reportId);
  
  if (!report) return next(new NotFoundError('Report'));
  
  // Map moduleId to the correct field in the report
  const moduleFieldMap = {
    'b0': 'basicModules.b0_generalInformation',
    'b1': 'basicModules.b1_basisForPreparation',
    'b2': 'basicModules.b2_sustainabilityPractices',
    'b3': 'basicModules.b3_energyGHGEmissions',
    'b4': 'basicModules.b4_pollution',
    'b5': 'basicModules.b5_biodiversity',
    'b6': 'basicModules.b6_waterConsumption',
    'b7': 'basicModules.b7_wasteManagement',
    'b8': 'basicModules.b8_workforceGeneral',
    'b9': 'basicModules.b9_healthSafety',
    'b10': 'basicModules.b10_remuneration',
    'b11': 'basicModules.b11_corruptionBribery'
  };
  
  const fieldPath = moduleFieldMap[moduleId];
  if (!fieldPath) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid module ID: ${moduleId}`
    });
  }
  
  const moduleData = fieldPath.split('.').reduce((obj, key) => obj?.[key], report);
  
  res.status(200).json({
    status: 'success',
    data: moduleData || {}
  });
});

const updateModuleData = catchAsync(async (req, res, next) => {
  const { reportId, moduleId } = req.params;
  const updateData = req.body;
  
  const moduleFieldMap = {
    'b0': 'basicModules.b0_generalInformation',
    'b1': 'basicModules.b1_basisForPreparation',
    'b2': 'basicModules.b2_sustainabilityPractices',
    'b3': 'basicModules.b3_energyGHGEmissions',
    'b4': 'basicModules.b4_pollution',
    'b5': 'basicModules.b5_biodiversity',
    'b6': 'basicModules.b6_waterConsumption',
    'b7': 'basicModules.b7_wasteManagement',
    'b8': 'basicModules.b8_workforceGeneral',
    'b9': 'basicModules.b9_healthSafety',
    'b10': 'basicModules.b10_remuneration',
    'b11': 'basicModules.b11_corruptionBribery'
  };
  
  const fieldPath = moduleFieldMap[moduleId];
  if (!fieldPath) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid module ID: ${moduleId}`
    });
  }
  
  const updateObject = {};
  updateObject[fieldPath] = {
    ...updateData,
    lastUpdated: new Date(),
    completionStatus: updateData.completionStatus || 'Incomplete'
  };
  
  const report = await Report.findByIdAndUpdate(
    reportId,
    updateObject,
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  // Add audit trail entry if user is available
  if (req.user) {
    report.addAuditEntry(
      req.user.id,
      'UPDATE',
      moduleId.toUpperCase(),
      { updatedFields: Object.keys(updateData) },
      { 
        ipAddress: req.ip, 
        userAgent: req.get('User-Agent'),
        sessionId: req.sessionID 
      }
    );
    await report.save();
  }
  
  const moduleData = fieldPath.split('.').reduce((obj, key) => obj?.[key], report);
  
  res.status(200).json({
    status: 'success',
    data: moduleData,
    auditId: report.auditTrail[report.auditTrail.length - 1]?._id
  });
});

const getModuleStatus = catchAsync(async (req, res, next) => {
  const { reportId, moduleId } = req.params;
  const report = await Report.findById(reportId);
  
  if (!report) return next(new NotFoundError('Report'));
  
  // Calculate completion status based on module data
  const moduleFieldMap = {
    'b0': 'basicModules.b0_generalInformation',
    'b1': 'basicModules.b1_basisForPreparation',
    'b2': 'basicModules.b2_sustainabilityPractices',
    'b3': 'basicModules.b3_energyGHGEmissions',
    'b8': 'basicModules.b8_workforceGeneral'
  };
  
  const fieldPath = moduleFieldMap[moduleId];
  if (!fieldPath) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid module ID: ${moduleId}`
    });
  }
  
  const moduleData = fieldPath.split('.').reduce((obj, key) => obj?.[key], report);
  
  // Calculate completion percentage based on required fields
  const requiredFieldsMap = {
    'b0': ['companyInformation.companyName', 'companyInformation.registrationNumber', 'companyInformation.naceCode'],
    'b1': ['reportingFramework.primaryStandard', 'consolidationApproach.method'],
    'b3': ['scope1Emissions', 'scope2Emissions'],
    'b8': ['totalEmployees']
  };
  
  const requiredFields = requiredFieldsMap[moduleId] || [];
  const completedFields = requiredFields.filter(field => {
    const value = field.split('.').reduce((obj, key) => obj?.[key], moduleData);
    return value !== null && value !== undefined && value !== '';
  });
  
  const completionPercentage = requiredFields.length > 0 
    ? Math.round((completedFields.length / requiredFields.length) * 100)
    : 0;
  
  res.status(200).json({
    status: 'success',
    data: {
      moduleId,
      completionPercentage,
      requiredFields,
      completedFields,
      lastUpdated: moduleData?.lastUpdated || new Date(),
      validationStatus: 'not_validated'
    }
  });
});

const validateModuleData = catchAsync(async (req, res, next) => {
  const { reportId, moduleId } = req.params;
  const report = await Report.findById(reportId);
  
  if (!report) return next(new NotFoundError('Report'));
  
  // Basic validation - can be expanded per module
  res.status(200).json({
    status: 'success',
    data: {
      isValid: true,
      errors: [],
      warnings: [],
      score: 100
    }
  });
});

// B1 Validation endpoint
const validateModuleB1 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  const b1Module = report.basicModules.b1_basisForPreparation;
  const validationResults = {
    isComplete: false,
    missingFields: [],
    warnings: [],
    score: 0
  };
  
  // Check required fields
  const requiredFields = [
    'reportingFramework.primaryStandard',
    'consolidationApproach.method',
    'reportingBoundary.organizationalBoundary'
  ];
  
  let completedFields = 0;
  requiredFields.forEach(fieldPath => {
    const value = fieldPath.split('.').reduce((obj, key) => obj?.[key], b1Module);
    if (!value) {
      validationResults.missingFields.push(fieldPath);
    } else {
      completedFields++;
    }
  });
  
  // Calculate completion score
  validationResults.score = Math.round((completedFields / requiredFields.length) * 100);
  validationResults.isComplete = validationResults.score === 100;
  
  // Add warnings for best practices
  if (b1Module?.reportingFramework?.additionalStandards?.length > 3) {
    validationResults.warnings.push('Using more than 3 additional standards may complicate reporting');
  }
  
  if (!b1Module?.consolidationApproach?.description) {
    validationResults.warnings.push('Consider adding a description for consolidation approach');
  }
  
  // Update completion status if fully complete
  if (validationResults.isComplete && b1Module.completionStatus !== 'Complete') {
    await Report.findByIdAndUpdate(
      req.params.reportId,
      { 'basicModules.b1_basisForPreparation.completionStatus': 'Complete' }
    );
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      validation: validationResults,
      moduleData: b1Module
    }
  });
});

// B2 Validation and effectiveness calculation endpoint
const validateModuleB2 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  const b2Module = report.basicModules.b2_sustainabilityPractices;
  const validationResults = {
    isComplete: false,
    practicesSummary: {
      environmental: { total: 0, implemented: 0, effective: 0 },
      social: { total: 0, implemented: 0, effective: 0 },
      governance: { total: 0, implemented: 0, effective: 0 }
    },
    recommendations: [],
    effectivenessScore: 0
  };
  
  // Analyze each practice category
  const categories = {
    environmental: ['climateChange', 'wasteManagement', 'waterManagement', 'biodiversityProtection'],
    social: ['employeeWellbeing', 'diversityInclusion', 'communityEngagement', 'humanRights'],
    governance: ['boardDiversity', 'ethicsCompliance', 'riskManagement', 'stakeholderEngagement']
  };
  
  let totalImplemented = 0;
  let totalPractices = 0;
  let effectivenessTotal = 0;
  
  Object.entries(categories).forEach(([categoryKey, practices]) => {
    const categoryData = b2Module?.[categoryKey + 'Practices'] || {};
    const summary = validationResults.practicesSummary[categoryKey];
    
    practices.forEach(practice => {
      totalPractices++;
      summary.total++;
      
      const practiceData = categoryData[practice];
      if (practiceData?.hasPolicy) {
        summary.implemented++;
        totalImplemented++;
        
        if (practiceData.effectiveness === 'High') {
          summary.effective++;
          effectivenessTotal += 100;
        } else if (practiceData.effectiveness === 'Medium') {
          effectivenessTotal += 70;
        } else if (practiceData.effectiveness === 'Low') {
          effectivenessTotal += 40;
        }
        
        // Add recommendations
        if (!practiceData.policyDetails) {
          validationResults.recommendations.push(`Add policy details for ${practice} in ${categoryKey}`);
        }
        
        if (!practiceData.implementationDate) {
          validationResults.recommendations.push(`Set implementation date for ${practice} policy`);
        }
      } else {
        validationResults.recommendations.push(`Implement ${practice} policy in ${categoryKey} practices`);
      }
    });
  });
  
  // Calculate overall metrics
  const implementationRate = totalPractices > 0 ? (totalImplemented / totalPractices) * 100 : 0;
  validationResults.effectivenessScore = totalImplemented > 0 ? effectivenessTotal / totalImplemented : 0;
  validationResults.isComplete = implementationRate >= 80; // 80% implementation threshold
  
  // Update completion status and effectiveness score
  const updateData = {
    'basicModules.b2_sustainabilityPractices.overallEffectivenessScore': Math.round(validationResults.effectivenessScore)
  };
  
  if (validationResults.isComplete && b2Module.completionStatus !== 'Complete') {
    updateData['basicModules.b2_sustainabilityPractices.completionStatus'] = 'Complete';
  }
  
  await Report.findByIdAndUpdate(req.params.reportId, updateData);
  
  res.status(200).json({
    status: 'success',
    data: {
      validation: validationResults,
      implementationRate: Math.round(implementationRate),
      moduleData: b2Module
    }
  });
});

module.exports = {
  getModuleB0,
  updateModuleB0,
  getModuleB1,
  updateModuleB1,
  validateModuleB1,
  getModuleB2,
  updateModuleB2,
  validateModuleB2,
  getModuleB3,
  updateModuleB3,
  getModuleB8,
  updateModuleB8,
  calculateEmissions,
  validateEmissions,
  calculateWorkforceMetrics,
  // Generic module endpoints for auto-save
  getModuleData,
  updateModuleData,
  getModuleStatus,
  validateModuleData
};