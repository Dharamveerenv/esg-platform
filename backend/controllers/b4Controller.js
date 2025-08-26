/**
 * B4 Pollution Module Controller
 * Handles air pollution, water discharge, soil contamination, and hazardous substances
 */

const Report = require('../models/Report');
const { AppError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseFormatter = require('../utils/responseFormatter');

// Get B4 Pollution module data
const getB4Data = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  
  const report = await Report.findById(reportId)
    .select('basicModules.b4_pollution companyId')
    .populate('companyId', 'companyProfile.legalName');
  
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  return ResponseFormatter.success(
    res,
    {
      reportId: report._id,
      companyName: report.companyId?.companyProfile?.legalName,
      b4Data: report.basicModules?.b4_pollution || initializeB4Structure()
    },
    'B4 Pollution data retrieved successfully'
  );
});

// Update B4 Pollution module data
const updateB4Data = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const updateData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize B4 structure if not exists
  if (!report.basicModules.b4_pollution) {
    report.basicModules.b4_pollution = initializeB4Structure();
  }
  
  // Update the B4 module data with validation
  report.basicModules.b4_pollution = {
    ...report.basicModules.b4_pollution,
    ...updateData,
    lastUpdated: new Date()
  };
  
  // Calculate pollution metrics and compliance status
  await calculateB4Metrics(report.basicModules.b4_pollution);
  
  await report.save();
  
  return ResponseFormatter.success(
    res,
    { 
      b4Data: report.basicModules.b4_pollution,
      completionPercentage: calculateB4Completion(report.basicModules.b4_pollution)
    },
    'B4 Pollution data updated successfully'
  );
});

// Add Air Pollution Emission Entry
const addAirPollutionEmission = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const emissionData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize B4 structure if needed
  if (!report.basicModules.b4_pollution?.airPollution?.emissions) {
    if (!report.basicModules.b4_pollution) {
      report.basicModules.b4_pollution = initializeB4Structure();
    }
    if (!report.basicModules.b4_pollution.airPollution) {
      report.basicModules.b4_pollution.airPollution = { emissions: [] };
    }
  }
  
  // Validate emission data
  const validatedEmission = await validateAirEmissionData(emissionData);
  
  // Add to emissions array
  report.basicModules.b4_pollution.airPollution.emissions.push(validatedEmission);
  
  // Update compliance status based on regulatory limits
  updateAirPollutionCompliance(report.basicModules.b4_pollution.airPollution);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { emission: validatedEmission },
    'Air pollution emission added successfully'
  );
});

// Add Water Discharge Point
const addWaterDischargePoint = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const dischargeData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize structure if needed
  if (!report.basicModules.b4_pollution?.waterPollution?.dischargePoints) {
    if (!report.basicModules.b4_pollution) {
      report.basicModules.b4_pollution = initializeB4Structure();
    }
    if (!report.basicModules.b4_pollution.waterPollution) {
      report.basicModules.b4_pollution.waterPollution = { dischargePoints: [] };
    }
  }
  
  // Validate discharge data
  const validatedDischarge = await validateWaterDischargeData(dischargeData);
  
  // Add to discharge points array
  report.basicModules.b4_pollution.waterPollution.dischargePoints.push(validatedDischarge);
  
  // Update total discharge volume and compliance
  updateWaterPollutionMetrics(report.basicModules.b4_pollution.waterPollution);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { dischargePoint: validatedDischarge },
    'Water discharge point added successfully'
  );
});

// Add Contaminated Site
const addContaminatedSite = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const siteData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize structure if needed
  if (!report.basicModules.b4_pollution?.soilContamination?.contaminatedSites) {
    if (!report.basicModules.b4_pollution) {
      report.basicModules.b4_pollution = initializeB4Structure();
    }
    if (!report.basicModules.b4_pollution.soilContamination) {
      report.basicModules.b4_pollution.soilContamination = { contaminatedSites: [] };
    }
  }
  
  // Validate site data
  const validatedSite = await validateContaminatedSiteData(siteData);
  
  // Add to contaminated sites array
  report.basicModules.b4_pollution.soilContamination.contaminatedSites.push(validatedSite);
  
  // Update total contaminated area
  updateSoilContaminationMetrics(report.basicModules.b4_pollution.soilContamination);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { site: validatedSite },
    'Contaminated site added successfully'
  );
});

// Add Hazardous Substance to Inventory
const addHazardousSubstance = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const substanceData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize structure if needed
  if (!report.basicModules.b4_pollution?.hazardousSubstances?.inventory) {
    if (!report.basicModules.b4_pollution) {
      report.basicModules.b4_pollution = initializeB4Structure();
    }
    if (!report.basicModules.b4_pollution.hazardousSubstances) {
      report.basicModules.b4_pollution.hazardousSubstances = { inventory: [] };
    }
  }
  
  // Validate substance data
  const validatedSubstance = await validateHazardousSubstanceData(substanceData);
  
  // Add to hazardous substances inventory
  report.basicModules.b4_pollution.hazardousSubstances.inventory.push(validatedSubstance);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { substance: validatedSubstance },
    'Hazardous substance added to inventory successfully'
  );
});

// Calculate B4 Pollution Summary and Compliance Status
const calculateB4Summary = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  const b4Data = report.basicModules.b4_pollution;
  if (!b4Data) {
    return next(new AppError('B4 Pollution module data not found', 404));
  }
  
  // Calculate comprehensive pollution summary
  const summary = await calculatePollutionSummary(b4Data);
  
  // Update the report with calculated summary
  report.basicModules.b4_pollution.dataQuality = summary.dataQuality;
  
  await report.save();
  
  return ResponseFormatter.success(
    res,
    { summary },
    'B4 Pollution summary calculated successfully'
  );
});

// Validate B4 Module Completeness
const validateB4Module = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  const b4Data = report.basicModules.b4_pollution;
  const validationResults = await validateB4Completeness(b4Data);
  
  // Update completion status if validation passes
  if (validationResults.isComplete && b4Data.completionStatus !== 'Complete') {
    report.basicModules.b4_pollution.completionStatus = 'Complete';
    await report.save();
  }
  
  return ResponseFormatter.success(
    res,
    { validation: validationResults },
    'B4 Module validation completed'
  );
});

// Helper Functions

function initializeB4Structure() {
  return {
    airPollution: {
      emissions: [],
      complianceStatus: 'Not Assessed',
      totalExceedances: 0
    },
    waterPollution: {
      dischargePoints: [],
      totalDischargeVolume: 0,
      dischargeVolumeUnit: 'm³/year',
      complianceStatus: 'Not Assessed'
    },
    soilContamination: {
      contaminatedSites: [],
      totalContaminatedArea: 0,
      areaUnit: 'm²'
    },
    hazardousSubstances: {
      inventory: []
    },
    pollutionPrevention: {
      measures: []
    },
    completionStatus: 'Incomplete',
    lastUpdated: new Date(),
    dataQuality: {
      overallScore: 0,
      completenessScore: 0,
      accuracyScore: 0
    }
  };
}

async function validateAirEmissionData(emissionData) {
  // Validate required fields
  const requiredFields = ['pollutantType', 'quantity', 'unit', 'source', 'measurementMethod'];
  for (const field of requiredFields) {
    if (!emissionData[field]) {
      throw new AppError(`${field} is required for air emission data`, 400);
    }
  }
  
  // Check regulatory limits
  if (emissionData.regulatoryLimit && emissionData.quantity > emissionData.regulatoryLimit.value) {
    emissionData.exceedsLimit = true;
  }
  
  return {
    ...emissionData,
    reportingPeriod: emissionData.reportingPeriod || {
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date(new Date().getFullYear(), 11, 31)
    }
  };
}

async function validateWaterDischargeData(dischargeData) {
  // Validate required fields
  const requiredFields = ['pointId', 'location', 'receivingWaterBody'];
  for (const field of requiredFields) {
    if (!dischargeData[field]) {
      throw new AppError(`${field} is required for water discharge data`, 400);
    }
  }
  
  // Check permit limits for each pollutant
  if (dischargeData.pollutants) {
    dischargeData.pollutants.forEach(pollutant => {
      if (pollutant.permitLimit && pollutant.concentration > pollutant.permitLimit.value) {
        pollutant.exceedsLimit = true;
      }
    });
  }
  
  return dischargeData;
}

async function validateContaminatedSiteData(siteData) {
  // Validate required fields
  const requiredFields = ['siteId', 'location', 'contaminationSource', 'remediationStatus'];
  for (const field of requiredFields) {
    if (!siteData[field]) {
      throw new AppError(`${field} is required for contaminated site data`, 400);
    }
  }
  
  // Check regulatory limits for contaminants
  if (siteData.contaminants) {
    siteData.contaminants.forEach(contaminant => {
      if (contaminant.regualtoryLimit && contaminant.concentration > contaminant.regualtoryLimit.value) {
        contaminant.exceedsLimit = true;
      }
    });
  }
  
  return siteData;
}

async function validateHazardousSubstanceData(substanceData) {
  // Validate required fields
  const requiredFields = ['substanceName', 'classification', 'quantity', 'unit', 'storageLocation', 'usageCategory'];
  for (const field of requiredFields) {
    if (!substanceData[field]) {
      throw new AppError(`${field} is required for hazardous substance data`, 400);
    }
  }
  
  // Check reporting thresholds
  if (substanceData.reportingThreshold && substanceData.quantity > substanceData.reportingThreshold.value) {
    substanceData.exceedsThreshold = true;
  }
  
  return substanceData;
}

function updateAirPollutionCompliance(airPollution) {
  const exceedances = airPollution.emissions.filter(emission => emission.exceedsLimit).length;
  airPollution.totalExceedances = exceedances;
  airPollution.complianceStatus = exceedances > 0 ? 'Non-Compliant' : 'Compliant';
}

function updateWaterPollutionMetrics(waterPollution) {
  // Calculate total discharge volume
  const totalVolume = waterPollution.dischargePoints.reduce((sum, point) => {
    const pointVolume = point.pollutants.reduce((pointSum, pollutant) => {
      return pointSum + (pollutant.dischargeVolume || 0);
    }, 0);
    return sum + pointVolume;
  }, 0);
  
  waterPollution.totalDischargeVolume = totalVolume;
  
  // Check compliance
  const hasExceedances = waterPollution.dischargePoints.some(point => 
    point.pollutants.some(pollutant => pollutant.exceedsLimit)
  );
  
  waterPollution.complianceStatus = hasExceedances ? 'Non-Compliant' : 'Compliant';
}

function updateSoilContaminationMetrics(soilContamination) {
  // Calculate total contaminated area
  const totalArea = soilContamination.contaminatedSites.reduce((sum, site) => {
    // This would need to be calculated based on site area data
    return sum + (site.areaAffected || 0);
  }, 0);
  
  soilContamination.totalContaminatedArea = totalArea;
}

async function calculateB4Metrics(b4Data) {
  // Update air pollution metrics
  if (b4Data.airPollution) {
    updateAirPollutionCompliance(b4Data.airPollution);
  }
  
  // Update water pollution metrics
  if (b4Data.waterPollution) {
    updateWaterPollutionMetrics(b4Data.waterPollution);
  }
  
  // Update soil contamination metrics
  if (b4Data.soilContamination) {
    updateSoilContaminationMetrics(b4Data.soilContamination);
  }
  
  // Calculate overall data quality scores
  const dataQuality = calculateB4DataQuality(b4Data);
  b4Data.dataQuality = dataQuality;
}

function calculateB4DataQuality(b4Data) {
  let completenessScore = 0;
  let totalSections = 4; // air, water, soil, hazardous substances
  
  // Check air pollution completeness
  if (b4Data.airPollution?.emissions?.length > 0) {
    completenessScore += 25;
  }
  
  // Check water pollution completeness
  if (b4Data.waterPollution?.dischargePoints?.length > 0) {
    completenessScore += 25;
  }
  
  // Check soil contamination completeness
  if (b4Data.soilContamination?.contaminatedSites?.length > 0) {
    completenessScore += 25;
  }
  
  // Check hazardous substances completeness
  if (b4Data.hazardousSubstances?.inventory?.length > 0) {
    completenessScore += 25;
  }
  
  // Accuracy score based on measurement methods and compliance
  let accuracyScore = 100;
  if (b4Data.airPollution?.complianceStatus === 'Non-Compliant') accuracyScore -= 20;
  if (b4Data.waterPollution?.complianceStatus === 'Non-Compliant') accuracyScore -= 20;
  
  return {
    completenessScore,
    accuracyScore: Math.max(0, accuracyScore),
    overallScore: Math.round((completenessScore + accuracyScore) / 2)
  };
}

function calculateB4Completion(b4Data) {
  if (!b4Data) return 0;
  
  let completedSections = 0;
  const totalSections = 4;
  
  if (b4Data.airPollution?.emissions?.length > 0) completedSections++;
  if (b4Data.waterPollution?.dischargePoints?.length > 0) completedSections++;
  if (b4Data.soilContamination?.contaminatedSites?.length > 0) completedSections++;
  if (b4Data.hazardousSubstances?.inventory?.length > 0) completedSections++;
  
  return Math.round((completedSections / totalSections) * 100);
}

async function calculatePollutionSummary(b4Data) {
  const summary = {
    airPollution: {
      totalEmissions: b4Data.airPollution?.emissions?.length || 0,
      exceedances: b4Data.airPollution?.totalExceedances || 0,
      complianceStatus: b4Data.airPollution?.complianceStatus || 'Not Assessed'
    },
    waterPollution: {
      dischargePoints: b4Data.waterPollution?.dischargePoints?.length || 0,
      totalVolume: b4Data.waterPollution?.totalDischargeVolume || 0,
      volumeUnit: b4Data.waterPollution?.dischargeVolumeUnit || 'm³/year',
      complianceStatus: b4Data.waterPollution?.complianceStatus || 'Not Assessed'
    },
    soilContamination: {
      contaminatedSites: b4Data.soilContamination?.contaminatedSites?.length || 0,
      totalArea: b4Data.soilContamination?.totalContaminatedArea || 0,
      areaUnit: b4Data.soilContamination?.areaUnit || 'm²'
    },
    hazardousSubstances: {
      totalSubstances: b4Data.hazardousSubstances?.inventory?.length || 0,
      exceedsThreshold: b4Data.hazardousSubstances?.inventory?.filter(s => s.exceedsThreshold).length || 0
    },
    pollutionPrevention: {
      measures: b4Data.pollutionPrevention?.measures?.length || 0
    },
    dataQuality: b4Data.dataQuality || { overallScore: 0, completenessScore: 0, accuracyScore: 0 }
  };
  
  return summary;
}

async function validateB4Completeness(b4Data) {
  if (!b4Data) {
    return {
      isComplete: false,
      completionPercentage: 0,
      missingFields: ['airPollution', 'waterPollution', 'soilContamination', 'hazardousSubstances'],
      warnings: ['B4 module not initialized']
    };
  }
  
  const validationResults = {
    isComplete: false,
    completionPercentage: 0,
    missingFields: [],
    warnings: [],
    recommendations: []
  };
  
  // Check each section
  let completedSections = 0;
  const totalSections = 4;
  
  if (!b4Data.airPollution?.emissions?.length) {
    validationResults.missingFields.push('airPollution.emissions');
    validationResults.recommendations.push('Add air pollution emission data');
  } else {
    completedSections++;
  }
  
  if (!b4Data.waterPollution?.dischargePoints?.length) {
    validationResults.missingFields.push('waterPollution.dischargePoints');
    validationResults.recommendations.push('Add water discharge point data');
  } else {
    completedSections++;
  }
  
  if (!b4Data.soilContamination?.contaminatedSites?.length) {
    validationResults.missingFields.push('soilContamination.contaminatedSites');
    validationResults.recommendations.push('Add soil contamination site data if applicable');
  } else {
    completedSections++;
  }
  
  if (!b4Data.hazardousSubstances?.inventory?.length) {
    validationResults.missingFields.push('hazardousSubstances.inventory');
    validationResults.recommendations.push('Add hazardous substances inventory');
  } else {
    completedSections++;
  }
  
  validationResults.completionPercentage = Math.round((completedSections / totalSections) * 100);
  validationResults.isComplete = validationResults.completionPercentage >= 75; // 75% threshold
  
  // Add compliance warnings
  if (b4Data.airPollution?.complianceStatus === 'Non-Compliant') {
    validationResults.warnings.push('Air pollution emissions exceed regulatory limits');
  }
  
  if (b4Data.waterPollution?.complianceStatus === 'Non-Compliant') {
    validationResults.warnings.push('Water discharge exceeds permit limits');
  }
  
  return validationResults;
}

module.exports = {
  getB4Data,
  updateB4Data,
  addAirPollutionEmission,
  addWaterDischargePoint,
  addContaminatedSite,
  addHazardousSubstance,
  calculateB4Summary,
  validateB4Module
};