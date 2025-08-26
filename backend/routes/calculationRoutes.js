/**
 * VSME ESG Platform - Calculation Routes
 * Enhanced calculation endpoints for demo-ready functionality
 */

const express = require('express');
const calculationService = require('../services/calculationService');
const { getDemoCalculationData } = require('../seeds/emissionFactorSeeds');
const catchAsync = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const router = express.Router();

// Middleware for request logging
router.use((req, res, next) => {
  console.log(`📊 Calculation API: ${req.method} ${req.originalUrl}`);
  next();
});

/**
 * @route   POST /api/calculations/scope1/stationary
 * @desc    Calculate Scope 1 stationary combustion emissions
 * @access  Public (for demo)
 */
router.post('/scope1/stationary', catchAsync(async (req, res) => {
  const { fuelData, country = 'Ireland' } = req.body;

  if (!fuelData || !Array.isArray(fuelData) || fuelData.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid fuel data. Expected array of fuel consumption data.'
    });
  }

  const results = await calculationService.calculateStationaryCombustion(fuelData, country);

  res.json({
    success: true,
    data: {
      scope: 'Scope 1',
      category: 'Stationary Combustion',
      country: country,
      ...results
    }
  });
}));

/**
 * @route   POST /api/calculations/scope1/mobile
 * @desc    Calculate Scope 1 mobile combustion emissions
 * @access  Public (for demo)
 */
router.post('/scope1/mobile', catchAsync(async (req, res) => {
  const { vehicleData, country = 'Ireland' } = req.body;

  if (!vehicleData || !Array.isArray(vehicleData) || vehicleData.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid vehicle data. Expected array of vehicle consumption data.'
    });
  }

  const results = await calculationService.calculateMobileCombustion(vehicleData, country);

  res.json({
    success: true,
    data: {
      scope: 'Scope 1',
      category: 'Mobile Combustion',
      country: country,
      ...results
    }
  });
}));

/**
 * @route   POST /api/calculations/scope1/fugitive
 * @desc    Calculate Scope 1 fugitive emissions (refrigerants)
 * @access  Public (for demo)
 */
router.post('/scope1/fugitive', catchAsync(async (req, res) => {
  const { refrigerantData } = req.body;

  if (!refrigerantData || !Array.isArray(refrigerantData) || refrigerantData.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid refrigerant data. Expected array of refrigerant leakage data.'
    });
  }

  const results = await calculationService.calculateFugitiveEmissions(refrigerantData);

  res.json({
    success: true,
    data: {
      scope: 'Scope 1',
      category: 'Fugitive Emissions',
      ...results
    }
  });
}));

/**
 * @route   POST /api/calculations/scope2/electricity
 * @desc    Calculate Scope 2 electricity emissions
 * @access  Public (for demo)
 */
router.post('/scope2/electricity', catchAsync(async (req, res) => {
  const { electricityData, method = 'location' } = req.body;

  if (!electricityData || !Array.isArray(electricityData) || electricityData.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid electricity data. Expected array of electricity consumption data.'
    });
  }

  const results = await calculationService.calculateScope2Emissions(electricityData, method);

  res.json({
    success: true,
    data: {
      scope: 'Scope 2',
      category: 'Electricity',
      method: method,
      ...results
    }
  });
}));

/**
 * @route   POST /api/calculations/comprehensive
 * @desc    Calculate comprehensive emissions (all scopes)
 * @access  Public (for demo)
 */
router.post('/comprehensive', catchAsync(async (req, res) => {
  const emissionsData = req.body;

  if (!emissionsData || typeof emissionsData !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Invalid emissions data. Expected complete emissions data object.'
    });
  }

  const results = await calculationService.calculateComprehensiveEmissions(emissionsData);

  res.json({
    success: true,
    data: {
      comprehensive: true,
      ...results
    }
  });
}));

/**
 * @route   GET /api/calculations/demo/scenarios
 * @desc    Get available demo scenarios
 * @access  Public (for demo)
 */
router.get('/demo/scenarios', catchAsync(async (req, res) => {
  const demoData = getDemoCalculationData();

  res.json({
    success: true,
    data: {
      company: demoData.company,
      scenarios: demoData.scenarios.map(scenario => ({
        name: scenario.name,
        description: getScenarioDescription(scenario.name)
      }))
    }
  });
}));

/**
 * @route   GET /api/calculations/demo/calculate/:scenario
 * @desc    Calculate specific demo scenario
 * @access  Public (for demo)
 */
router.get('/demo/calculate/:scenario', catchAsync(async (req, res) => {
  const scenarioName = req.params.scenario;
  const demoData = getDemoCalculationData();
  
  const scenario = demoData.scenarios.find(s => 
    s.name.toLowerCase().replace(/\s+/g, '-') === scenarioName.toLowerCase()
  );

  if (!scenario) {
    return res.status(404).json({
      success: false,
      error: `Demo scenario '${scenarioName}' not found`
    });
  }

  const results = await calculationService.calculateComprehensiveEmissions(scenario.data);

  res.json({
    success: true,
    data: {
      scenario: scenario.name,
      company: demoData.company,
      description: getScenarioDescription(scenario.name),
      calculations: results
    }
  });
}));

// Helper function to get scenario descriptions
function getScenarioDescription(scenarioName) {
  const descriptions = {
    'Current Operations': 'Baseline operations with current energy mix and fleet',
    'Renewable Energy Upgrade': 'Upgraded to 70% renewable electricity consumption',
    'Fleet Electrification': '50% fleet electrification with additional charging infrastructure'
  };
  
  return descriptions[scenarioName] || 'Demo scenario for ESG calculations';
}

module.exports = router;