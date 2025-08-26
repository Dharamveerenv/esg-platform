/**
 * B3 Development Routes (No Authentication)
 * Temporary routes for development without auth requirements
 */

const express = require('express');
const Report = require('../models/Report');
const { AppError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseFormatter = require('../utils/responseFormatter');
const excelCalculationService = require('../services/excelBasedCalculationService');

const router = express.Router();

// Create a simple demo report ID for testing (no auth required)
const createDemoReport = catchAsync(async (req, res, next) => {
  // Return a fixed demo report ID and endpoints for testing
  const demoReportId = '676e6b5a123456789abcdef0'; // Fixed ID for development
  
  return ResponseFormatter.success(
    res,
    { 
      reportId: demoReportId,
      message: 'Demo report ready for use (development mode)',
      endpoints: {
        getB3Data: `/api/dev/b3/${demoReportId}`,
        addStationaryCombustion: `/api/dev/b3/${demoReportId}/stationary`,
        addMobileCombustion: `/api/dev/b3/${demoReportId}/mobile`,
        addFugitiveEmissions: `/api/dev/b3/${demoReportId}/fugitive`,
        addElectricity: `/api/dev/b3/${demoReportId}/electricity`,
        addDistrictHeating: `/api/dev/b3/${demoReportId}/district-heating`,
        calculateSummary: `/api/dev/b3/${demoReportId}/summary`
      },
      note: 'This is a development endpoint that bypasses full report creation'
    },
    'Demo report initialized'
  );
});

// Get B3 module data (no auth required)
const getB3Data = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  
  // For development, always return empty structure if no data exists
  const report = await Report.findById(reportId)
    .select('basicModules.b3_energyGHGEmissions');
  
  let b3Data = {};
  
  if (report && report.basicModules?.b3_energyGHGEmissions) {
    b3Data = report.basicModules.b3_energyGHGEmissions;
  } else {
    // Return empty structure for development
    b3Data = {
      scope1Emissions: {
        stationaryCombustion: { activities: [] },
        mobileCombustion: { activities: [] },
        fugitiveEmissions: { activities: [] }
      },
      scope2Emissions: {
        electricityConsumption: { activities: [] }
      },
      completionStatus: 'In Progress',
      lastUpdated: new Date()
    };
  }
  
  return ResponseFormatter.success(
    res,
    {
      reportId: reportId,
      b3Data: b3Data,
      mode: 'development'
    },
    'B3 Energy & GHG Emissions data retrieved successfully'
  );
});

// Add stationary combustion activity (no auth required) - Development mode
const addStationaryCombustion = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  // For development, just calculate and return the emission data without storing
  console.log('🧪 Development Mode: Calculating stationary combustion emissions');
  console.log('📊 Input data:', activityData);
  
  try {
    // Calculate emissions using Excel-based service
    const calculatedActivity = await excelCalculationService.calculateStationaryCombustionEmissions(
      activityData,
      activityData.country || 'Ireland'
    );
    
    console.log('✅ Calculation successful:', {
      totalEmissions: calculatedActivity.calculationResults?.totalCo2eEmissions,
      fuelType: calculatedActivity.activityData?.fuelType
    });
    
    return ResponseFormatter.created(
      res,
      { 
        activity: calculatedActivity,
        reportId: reportId,
        mode: 'development',
        note: 'Calculation performed without database storage'
      },
      'Stationary combustion emissions calculated successfully'
    );
    
  } catch (error) {
    console.error('❌ Calculation failed:', error);
    return next(new AppError(`Calculation failed: ${error.message}`, 400));
  }
});

// Add electricity consumption activity (no auth required) - Development mode
const addElectricityConsumption = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  // For development, just calculate and return the emission data without storing
  console.log('🧪 Development Mode: Calculating electricity emissions');
  console.log('📊 Input data:', activityData);
  
  try {
    // Calculate electricity emissions
    const calculatedActivity = await excelCalculationService.calculateElectricityEmissions(
      activityData,
      activityData.country || 'Ireland'
    );
    
    console.log('✅ Calculation successful:', {
      locationBased: calculatedActivity.calculationResults?.locationBasedEmissions,
      marketBased: calculatedActivity.calculationResults?.marketBasedEmissions
    });
    
    return ResponseFormatter.created(
      res,
      { 
        activity: calculatedActivity,
        reportId: reportId,
        mode: 'development',
        note: 'Calculation performed without database storage'
      },
      'Electricity emissions calculated successfully'
    );
    
  } catch (error) {
    console.error('❌ Calculation failed:', error);
    return next(new AppError(`Calculation failed: ${error.message}`, 400));
  }
});

// Add mobile combustion activity (no auth required) - Development mode
const addMobileCombustion = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  console.log('🧪 Development Mode: Calculating mobile combustion emissions');
  console.log('📊 Input data:', activityData);
  
  try {
    // Calculate emissions using Excel-based service
    const calculatedActivity = await excelCalculationService.calculateMobileCombustionEmissions(
      activityData,
      activityData.country || 'Ireland'
    );
    
    console.log('✅ Calculation successful:', {
      totalEmissions: calculatedActivity.calculationResults?.totalCo2eEmissions,
      vehicleType: calculatedActivity.activityData?.vehicleType,
      fuelType: calculatedActivity.activityData?.fuelType
    });
    
    return ResponseFormatter.created(
      res,
      { 
        activity: calculatedActivity,
        reportId: reportId,
        mode: 'development',
        note: 'Mobile combustion calculation performed without database storage'
      },
      'Mobile combustion emissions calculated successfully'
    );
    
  } catch (error) {
    console.error('❌ Mobile combustion calculation failed:', error);
    return next(new AppError(`Mobile combustion calculation failed: ${error.message}`, 400));
  }
});

// Add fugitive emissions activity (no auth required) - Development mode
const addFugitiveEmissions = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  console.log('🧪 Development Mode: Calculating fugitive emissions');
  console.log('📊 Input data:', activityData);
  
  try {
    // Calculate fugitive emissions using Excel-based service
    const calculatedActivity = await excelCalculationService.calculateFugitiveEmissions(
      activityData
    );
    
    console.log('✅ Calculation successful:', {
      totalEmissions: calculatedActivity.calculationResults?.co2eEmissions,
      refrigerantType: calculatedActivity.activityData?.refrigerantType
    });
    
    return ResponseFormatter.created(
      res,
      { 
        activity: calculatedActivity,
        reportId: reportId,
        mode: 'development',
        note: 'Fugitive emissions calculation performed without database storage'
      },
      'Fugitive emissions calculated successfully'
    );
    
  } catch (error) {
    console.error('❌ Fugitive emissions calculation failed:', error);
    return next(new AppError(`Fugitive emissions calculation failed: ${error.message}`, 400));
  }
});

// Add district heating/cooling activity (no auth required) - Development mode
const addDistrictHeating = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const activityData = req.body;
  
  console.log('🧪 Development Mode: Calculating district heating/cooling emissions');
  console.log('📊 Input data:', activityData);
  
  try {
    // Use the electricity emissions method with district heating factors
    const calculatedActivity = await excelCalculationService.calculateElectricityEmissions(
      {
        ...activityData,
        energyType: 'District Heating'
      },
      activityData.country || 'Ireland'
    );
    
    console.log('✅ Calculation successful:', {
      totalEmissions: calculatedActivity.calculationResults?.locationBasedEmissions,
      energyType: 'District Heating'
    });
    
    return ResponseFormatter.created(
      res,
      { 
        activity: calculatedActivity,
        reportId: reportId,
        mode: 'development',
        note: 'District heating calculation performed without database storage'
      },
      'District heating emissions calculated successfully'
    );
    
  } catch (error) {
    console.error('❌ District heating calculation failed:', error);
    return next(new AppError(`District heating calculation failed: ${error.message}`, 400));
  }
});

// Calculate B3 summary (no auth required)
const calculateB3Summary = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  
  const report = await Report.findById(reportId);
  if (!report) {
    return next(new AppError('Report not found', 404));
  }
  
  const b3Data = report.basicModules.b3_energyGHGEmissions;
  if (!b3Data) {
    return ResponseFormatter.success(
      res,
      { 
        summary: {
          scope1: { total: 0, stationary: 0, mobile: 0, fugitive: 0 },
          scope2: { locationBased: 0, marketBased: 0 },
          total: 0
        }
      },
      'Empty B3 summary calculated'
    );
  }
  
  // Calculate totals
  const summary = {
    scope1: {
      stationary: 0,
      mobile: 0,
      fugitive: 0,
      total: 0
    },
    scope2: {
      locationBased: 0,
      marketBased: 0
    },
    total: 0,
    lastCalculated: new Date()
  };
  
  // Calculate Scope 1 totals
  if (b3Data.scope1Emissions?.stationaryCombustion?.activities) {
    summary.scope1.stationary = b3Data.scope1Emissions.stationaryCombustion.activities
      .reduce((sum, activity) => sum + (activity.calculationResults?.totalCo2eEmissions || 0), 0);
  }
  
  if (b3Data.scope1Emissions?.mobileCombustion?.activities) {
    summary.scope1.mobile = b3Data.scope1Emissions.mobileCombustion.activities
      .reduce((sum, activity) => sum + (activity.calculationResults?.totalCo2eEmissions || 0), 0);
  }
  
  if (b3Data.scope1Emissions?.fugitiveEmissions?.activities) {
    summary.scope1.fugitive = b3Data.scope1Emissions.fugitiveEmissions.activities
      .reduce((sum, activity) => sum + (activity.calculationResults?.co2eEmissions || 0), 0);
  }
  
  summary.scope1.total = summary.scope1.stationary + summary.scope1.mobile + summary.scope1.fugitive;
  
  // Calculate Scope 2 totals
  if (b3Data.scope2Emissions?.electricityConsumption?.activities) {
    const activities = b3Data.scope2Emissions.electricityConsumption.activities;
    summary.scope2.locationBased = activities
      .reduce((sum, activity) => sum + (activity.calculationResults?.locationBasedEmissions || 0), 0);
    summary.scope2.marketBased = activities
      .reduce((sum, activity) => sum + (activity.calculationResults?.marketBasedEmissions || 0), 0);
  }
  
  summary.total = summary.scope1.total + summary.scope2.locationBased;
  
  // Update the report with calculated totals
  if (!b3Data.calculationSummary) {
    b3Data.calculationSummary = {};
  }
  
  b3Data.calculationSummary = {
    ...b3Data.calculationSummary,
    totalScope1: summary.scope1.total,
    totalScope2LocationBased: summary.scope2.locationBased,
    totalScope2MarketBased: summary.scope2.marketBased,
    combinedScope1And2: summary.total,
    lastCalculated: new Date()
  };
  
  await report.save();
  
  return ResponseFormatter.success(
    res,
    { 
      summary,
      activities: {
        scope1: {
          stationary: b3Data.scope1Emissions?.stationaryCombustion?.activities?.length || 0,
          mobile: b3Data.scope1Emissions?.mobileCombustion?.activities?.length || 0,
          fugitive: b3Data.scope1Emissions?.fugitiveEmissions?.activities?.length || 0
        },
        scope2: {
          electricity: b3Data.scope2Emissions?.electricityConsumption?.activities?.length || 0
        }
      }
    },
    'B3 summary calculated successfully'
  );
});

// Routes
router.get('/init', createDemoReport);
router.get('/:reportId', getB3Data);
router.post('/:reportId/stationary', addStationaryCombustion);
router.post('/:reportId/mobile', addMobileCombustion);
router.post('/:reportId/fugitive', addFugitiveEmissions);
router.post('/:reportId/electricity', addElectricityConsumption);
router.post('/:reportId/district-heating', addDistrictHeating);
router.get('/:reportId/summary', calculateB3Summary);

module.exports = router;