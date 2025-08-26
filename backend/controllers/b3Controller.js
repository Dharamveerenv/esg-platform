/**
 * B3 Energy & GHG Emissions Controller
 * Handles comprehensive emission data management
 */

const Report = require('../models/Report');
const EmissionFactor = require('../models/EmissionFactor');
const { AppError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseFormatter = require('../utils/responseFormatter');
const excelCalculationService = require('../services/excelBasedCalculationService');

// Get B3 module data
const getB3Data = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  
  const report = await Report.findById(reportId)
    .select('basicModules.b3_energyGHGEmissions companyId')
    .populate('companyId', 'companyProfile.legalName');
  
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  return ResponseFormatter.success(
    res,
    {
      reportId: report._id,
      companyName: report.companyId?.companyProfile?.legalName,
      b3Data: report.basicModules?.b3_energyGHGEmissions || {}
    },
    'B3 Energy & GHG Emissions data retrieved successfully'
  );
});

// Update B3 module data
const updateB3Data = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const updateData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Update the B3 module data
  report.basicModules.b3_energyGHGEmissions = {
    ...report.basicModules.b3_energyGHGEmissions,
    ...updateData,
    lastUpdated: new Date()
  };
  
  // Recalculate totals if activity data changed
  if (updateData.scope1Emissions || updateData.scope2Emissions || updateData.energyConsumption) {
    calculateB3Totals(report.basicModules.b3_energyGHGEmissions);
  }
  
  await report.save();
  
  return ResponseFormatter.success(
    res,
    { b3Data: report.basicModules.b3_energyGHGEmissions },
    'B3 data updated successfully'
  );
});

// Add Scope 1 Stationary Combustion activity
const addStationaryCombustion = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize B3 structure if not exists
  if (!report.basicModules.b3_energyGHGEmissions) {
    report.basicModules.b3_energyGHGEmissions = {
      scope1Emissions: {
        stationaryCombustion: { activities: [] }
      }
    };
  }
  
  // Fetch appropriate emission factor
  const emissionFactor = await getEmissionFactor('Scope1', 'Stationary Combustion', activityData.fuelType);
  
  // Calculate emissions using Excel-based service
  const calculatedActivity = await excelCalculationService.calculateStationaryCombustionEmissions(activityData);
  
  // Add to activities array
  if (!report.basicModules.b3_energyGHGEmissions.scope1Emissions.stationaryCombustion.activities) {
    report.basicModules.b3_energyGHGEmissions.scope1Emissions.stationaryCombustion.activities = [];
  }
  
  report.basicModules.b3_energyGHGEmissions.scope1Emissions.stationaryCombustion.activities.push(calculatedActivity);
  
  // Recalculate totals
  calculateB3Totals(report.basicModules.b3_energyGHGEmissions);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { activity: calculatedActivity },
    'Stationary combustion activity added successfully'
  );
});

// Add Scope 1 Mobile Combustion activity
const addMobileCombustion = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize structure if needed
  if (!report.basicModules.b3_energyGHGEmissions?.scope1Emissions?.mobileCombustion) {
    report.basicModules.b3_energyGHGEmissions = {
      ...report.basicModules.b3_energyGHGEmissions,
      scope1Emissions: {
        ...report.basicModules.b3_energyGHGEmissions?.scope1Emissions,
        mobileCombustion: { activities: [] }
      }
    };
  }
  
  // Calculate emissions using Excel-based service
  const calculatedActivity = await excelCalculationService.calculateMobileCombustionEmissions(activityData);
  
  report.basicModules.b3_energyGHGEmissions.scope1Emissions.mobileCombustion.activities.push(calculatedActivity);
  
  // Recalculate totals
  calculateB3Totals(report.basicModules.b3_energyGHGEmissions);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { activity: calculatedActivity },
    'Mobile combustion activity added successfully'
  );
});

// Add Scope 1 Fugitive Emissions activity
const addFugitiveEmissions = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize structure if needed
  if (!report.basicModules.b3_energyGHGEmissions?.scope1Emissions?.fugitiveEmissions) {
    report.basicModules.b3_energyGHGEmissions = {
      ...report.basicModules.b3_energyGHGEmissions,
      scope1Emissions: {
        ...report.basicModules.b3_energyGHGEmissions?.scope1Emissions,
        fugitiveEmissions: { activities: [] }
      }
    };
  }
  
  // Calculate emissions using Excel-based service
  const calculatedActivity = await excelCalculationService.calculateFugitiveEmissions(activityData);
  
  report.basicModules.b3_energyGHGEmissions.scope1Emissions.fugitiveEmissions.activities.push(calculatedActivity);
  
  // Recalculate totals
  calculateB3Totals(report.basicModules.b3_energyGHGEmissions);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { activity: calculatedActivity },
    'Fugitive emissions activity added successfully'
  );
});

// Add Scope 2 Electricity activity
const addElectricityConsumption = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  // Initialize structure if needed
  if (!report.basicModules.b3_energyGHGEmissions?.scope2Emissions?.electricityConsumption) {
    report.basicModules.b3_energyGHGEmissions = {
      ...report.basicModules.b3_energyGHGEmissions,
      scope2Emissions: {
        ...report.basicModules.b3_energyGHGEmissions?.scope2Emissions,
        electricityConsumption: { activities: [] }
      }
    };
  }
  
  // Get grid emission factors
  const locationFactor = await getEmissionFactor('Scope2', 'Electricity', 'Grid Electricity', activityData.facilityDetails.country || 'Ireland');
  const calculatedActivity = await calculateElectricityEmissions(activityData, locationFactor);
  
  report.basicModules.b3_energyGHGEmissions.scope2Emissions.electricityConsumption.activities.push(calculatedActivity);
  
  // Recalculate totals
  calculateB3Totals(report.basicModules.b3_energyGHGEmissions);
  
  await report.save();
  
  return ResponseFormatter.created(
    res,
    { activity: calculatedActivity },
    'Electricity consumption activity added successfully'
  );
});

// Get available emission factors
const getAvailableEmissionFactors = catchAsync(async (req, res, next) => {
  const { category, subCategory, country } = req.query;
  
  const query = {};
  if (category) query['factorMetadata.category'] = category;
  if (subCategory) query['factorMetadata.subCategory'] = subCategory;
  if (country) query['geographicScope.country'] = country;
  
  const factors = await EmissionFactor.find(query)
    .select('factorMetadata fuelSpecifications emissionFactorData geographicScope')
    .sort({ 'factorMetadata.category': 1, 'fuelSpecifications.fuelType': 1 });
  
  return ResponseFormatter.success(
    res,
    { emissionFactors: factors },
    'Available emission factors retrieved successfully'
  );
});

// Calculate B3 summary and totals
const calculateB3Summary = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  const b3Data = report.basicModules.b3_energyGHGEmissions;
  if (!b3Data) {
    return next(new AppError('B3 module data not found', 404));
  }
  
  // Recalculate all totals
  const summary = calculateB3Totals(b3Data);
  
  // Update the report
  report.basicModules.b3_energyGHGEmissions = b3Data;
  await report.save();
  
  return ResponseFormatter.success(
    res,
    { summary },
    'B3 summary calculated successfully'
  );
});

// Helper Functions

// Get emission factor from database
const getEmissionFactor = async (category, subCategory, fuelType, country = 'Ireland') => {
  const factor = await EmissionFactor.findOne({
    'factorMetadata.category': category,
    'factorMetadata.subCategory': subCategory,
    'fuelSpecifications.fuelType': fuelType,
    $or: [
      { 'geographicScope.country': country },
      { 'geographicScope.country': 'Global' }
    ]
  });
  
  if (!factor) {
    throw new AppError(`Emission factor not found for ${fuelType} in ${country}`, 404);
  }
  
  return factor;
};

// Calculate stationary combustion emissions
const calculateStationaryCombustionEmissions = async (activityData, emissionFactor) => {
  const consumptionQuantity = activityData.activityData.consumptionQuantity;
  const co2Factor = emissionFactor.emissionFactorData.co2Factor;
  const ch4Factor = emissionFactor.emissionFactorData.ch4Factor || 0;
  const n2oFactor = emissionFactor.emissionFactorData.n2oFactor || 0;
  const totalCo2eFactor = emissionFactor.emissionFactorData.totalCo2eFactor;
  
  // Calculate emissions
  const co2Emissions = consumptionQuantity * co2Factor;
  const ch4Emissions = consumptionQuantity * ch4Factor * 25; // CH4 GWP = 25
  const n2oEmissions = consumptionQuantity * n2oFactor * 298; // N2O GWP = 298
  const totalCo2eEmissions = consumptionQuantity * totalCo2eFactor;
  
  return {
    ...activityData,
    emissionFactors: {
      co2Factor: {
        value: co2Factor,
        unit: emissionFactor.emissionFactorData.unit,
        source: emissionFactor.factorMetadata.source,
        sourceYear: new Date().getFullYear()
      },
      ch4Factor: ch4Factor ? {
        value: ch4Factor,
        unit: emissionFactor.emissionFactorData.unit,
        source: emissionFactor.factorMetadata.source,
        sourceYear: new Date().getFullYear()
      } : undefined,
      n2oFactor: n2oFactor ? {
        value: n2oFactor,
        unit: emissionFactor.emissionFactorData.unit,
        source: emissionFactor.factorMetadata.source,
        sourceYear: new Date().getFullYear()
      } : undefined,
      totalCo2eFactor: {
        value: totalCo2eFactor,
        unit: emissionFactor.emissionFactorData.unit,
        methodology: emissionFactor.emissionFactorData.methodology
      }
    },
    calculationResults: {
      co2Emissions,
      ch4Emissions,
      n2oEmissions,
      totalCo2eEmissions,
      calculationDate: new Date(),
      calculationMethod: 'Direct',
      uncertaintyPercentage: emissionFactor.emissionFactorData.uncertainty
    }
  };
};

// Calculate mobile combustion emissions
const calculateMobileCombustionEmissions = async (activityData, emissionFactor) => {
  const consumptionQuantity = activityData.activityData.fuelConsumption?.quantity || 0;
  const totalCo2eFactor = emissionFactor.emissionFactorData.totalCo2eFactor;
  
  const totalCo2eEmissions = consumptionQuantity * totalCo2eFactor;
  
  return {
    ...activityData,
    emissionFactors: {
      totalCo2eFactor: {
        value: totalCo2eFactor,
        unit: emissionFactor.emissionFactorData.unit,
        methodology: emissionFactor.emissionFactorData.methodology
      }
    },
    calculationResults: {
      totalCo2eEmissions,
      calculationDate: new Date(),
      calculationMethod: activityData.activityData.calculationMethod
    }
  };
};

// Calculate fugitive emissions
const calculateFugitiveEmissions = async (activityData, gwpFactor) => {
  const refrigerantEmissions = calculateMassBalance(activityData.activityData);
  const co2eEmissions = refrigerantEmissions * gwpFactor.emissionFactorData.totalCo2eFactor;
  
  return {
    ...activityData,
    calculationResults: {
      refrigerantEmissions,
      co2eEmissions,
      calculationDate: new Date(),
      calculationNotes: `GWP value: ${gwpFactor.emissionFactorData.gwpValue}`
    }
  };
};

// Calculate mass balance for fugitive emissions
const calculateMassBalance = (activityData) => {
  if (activityData.calculationMethod === 'Mass Balance') {
    const beginning = activityData.beginningInventory || 0;
    const purchases = activityData.purchases || 0;
    const sales = activityData.salesTransfers || 0;
    const ending = activityData.endingInventory || 0;
    
    return beginning + purchases - sales - ending;
  }
  
  // For other methods, return a default or calculated value
  return activityData.emissionFactor * activityData.capacity || 0;
};

// Calculate electricity emissions (location-based and market-based)
const calculateElectricityEmissions = async (activityData, locationFactor) => {
  const consumption = activityData.activityData.consumptionQuantity;
  const renewablePortion = activityData.activityData.renewableEnergyPortion?.quantity || 0;
  
  // Location-based calculation
  const locationBasedEmissions = consumption * locationFactor.emissionFactorData.totalCo2eFactor;
  
  // Market-based calculation (simplified)
  const nonRenewableConsumption = consumption - renewablePortion;
  const marketBasedEmissions = nonRenewableConsumption * locationFactor.emissionFactorData.totalCo2eFactor;
  
  return {
    ...activityData,
    emissionFactors: {
      locationBased: {
        gridFactor: locationFactor.emissionFactorData.totalCo2eFactor,
        unit: locationFactor.emissionFactorData.unit,
        country: locationFactor.geographicScope.country,
        source: locationFactor.factorMetadata.source,
        sourceYear: new Date().getFullYear()
      }
    },
    calculationResults: {
      locationBasedEmissions,
      marketBasedEmissions,
      calculationDate: new Date(),
      calculationMethod: 'Standard'
    }
  };
};

// Calculate B3 totals and summary
const calculateB3Totals = (b3Data) => {
  const summary = {
    scope1: {
      stationary: 0,
      mobile: 0,
      fugitive: 0,
      process: 0,
      total: 0
    },
    scope2: {
      locationBased: 0,
      marketBased: 0
    },
    energy: {
      total: 0,
      renewablePercentage: 0
    }
  };
  
  // Calculate Scope 1 totals
  if (b3Data.scope1Emissions) {
    // Stationary combustion
    if (b3Data.scope1Emissions.stationaryCombustion?.activities) {
      summary.scope1.stationary = b3Data.scope1Emissions.stationaryCombustion.activities
        .reduce((sum, activity) => sum + (activity.calculationResults?.totalCo2eEmissions || 0), 0);
    }
    
    // Mobile combustion
    if (b3Data.scope1Emissions.mobileCombustion?.activities) {
      summary.scope1.mobile = b3Data.scope1Emissions.mobileCombustion.activities
        .reduce((sum, activity) => sum + (activity.calculationResults?.totalCo2eEmissions || 0), 0);
    }
    
    // Fugitive emissions
    if (b3Data.scope1Emissions.fugitiveEmissions?.activities) {
      summary.scope1.fugitive = b3Data.scope1Emissions.fugitiveEmissions.activities
        .reduce((sum, activity) => sum + (activity.calculationResults?.co2eEmissions || 0), 0);
    }
    
    // Process emissions
    if (b3Data.scope1Emissions.processEmissions?.activities) {
      summary.scope1.process = b3Data.scope1Emissions.processEmissions.activities
        .reduce((sum, activity) => sum + (activity.calculatedEmissions || 0), 0);
    }
    
    summary.scope1.total = summary.scope1.stationary + summary.scope1.mobile + 
                          summary.scope1.fugitive + summary.scope1.process;
  }
  
  // Calculate Scope 2 totals
  if (b3Data.scope2Emissions?.electricityConsumption?.activities) {
    const activities = b3Data.scope2Emissions.electricityConsumption.activities;
    summary.scope2.locationBased = activities
      .reduce((sum, activity) => sum + (activity.calculationResults?.locationBasedEmissions || 0), 0);
    summary.scope2.marketBased = activities
      .reduce((sum, activity) => sum + (activity.calculationResults?.marketBasedEmissions || 0), 0);
  }
  
  // Update the B3 data with calculated totals
  if (!b3Data.calculationSummary) {
    b3Data.calculationSummary = {};
  }
  
  b3Data.calculationSummary.totalScope1 = summary.scope1.total;
  b3Data.calculationSummary.totalScope2LocationBased = summary.scope2.locationBased;
  b3Data.calculationSummary.totalScope2MarketBased = summary.scope2.marketBased;
  b3Data.calculationSummary.combinedScope1And2 = summary.scope1.total + summary.scope2.marketBased;
  b3Data.calculationSummary.lastCalculated = new Date();
  
  return summary;
};

module.exports = {
  getB3Data,
  updateB3Data,
  addStationaryCombustion,
  addMobileCombustion,
  addFugitiveEmissions,
  addElectricityConsumption,
  getAvailableEmissionFactors,
  calculateB3Summary
};