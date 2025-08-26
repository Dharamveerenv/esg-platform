/**
 * B3 Energy & GHG Emissions Routes
 * REST API endpoints for comprehensive emission tracking
 */

const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const validation = require('../middleware/validation');
const {
  getB3Data,
  updateB3Data,
  addStationaryCombustion,
  addMobileCombustion,
  addFugitiveEmissions,
  addElectricityConsumption,
  getAvailableEmissionFactors,
  calculateB3Summary
} = require('../controllers/b3Controller');

const router = express.Router();

// All routes require authentication
// router.use(protect); // DISABLED for development

// GET /api/reports/:reportId/b3 - Get B3 module data
router.get('/:reportId/b3', 
  authorize(['Admin', 'Manager', 'Editor', 'Viewer']), 
  getB3Data
);

// PUT /api/reports/:reportId/b3 - Update B3 module data
router.put('/:reportId/b3',
  authorize(['Admin', 'Manager', 'Editor']),
  updateB3Data
);

// POST /api/reports/:reportId/b3/stationary - Add stationary combustion activity
router.post('/:reportId/b3/stationary',
  authorize(['Admin', 'Manager', 'Editor']),
  validation.b3StationaryCombustion,
  addStationaryCombustion
);

// POST /api/reports/:reportId/b3/mobile - Add mobile combustion activity  
router.post('/:reportId/b3/mobile',
  authorize(['Admin', 'Manager', 'Editor']),
  validation.b3MobileCombustion,
  addMobileCombustion
);

// POST /api/reports/:reportId/b3/fugitive - Add fugitive emissions activity
router.post('/:reportId/b3/fugitive',
  authorize(['Admin', 'Manager', 'Editor']),
  validation.b3FugitiveEmissions,
  addFugitiveEmissions
);

// POST /api/reports/:reportId/b3/electricity - Add electricity consumption activity
router.post('/:reportId/b3/electricity',
  authorize(['Admin', 'Manager', 'Editor']),
  validation.b3ElectricityConsumption,
  addElectricityConsumption
);

// GET /api/reports/:reportId/b3/summary - Calculate B3 summary
router.get('/:reportId/b3/summary',
  authorize(['Admin', 'Manager', 'Editor', 'Viewer']),
  calculateB3Summary
);

// GET /api/emission-factors - Get available emission factors for calculations
router.get('/emission-factors',
  authorize(['Admin', 'Manager', 'Editor', 'Viewer']),
  getAvailableEmissionFactors
);

module.exports = router;