/**
 * B4 Pollution Routes
 * ESG reporting routes for pollution management
 */

const express = require('express');
const b4Controller = require('../controllers/b4Controller');
const authController = require('../controllers/authController');
const validation = require('../middleware/validation');

const router = express.Router();

// Apply authentication to all routes
router.use(authController.protect);

// B4 Pollution Module Routes
router.route('/reports/:reportId/b4')
  .get(b4Controller.getB4Data)
  .put(
    validation.validateB4Data,
    b4Controller.updateB4Data
  );

// Air Pollution Routes
router.route('/reports/:reportId/b4/air-pollution/emissions')
  .post(
    validation.validateAirEmissionData,
    b4Controller.addAirPollutionEmission
  );

// Water Pollution Routes
router.route('/reports/:reportId/b4/water-pollution/discharge-points')
  .post(
    validation.validateWaterDischargeData,
    b4Controller.addWaterDischargePoint
  );

// Soil Contamination Routes
router.route('/reports/:reportId/b4/soil-contamination/sites')
  .post(
    validation.validateContaminatedSiteData,
    b4Controller.addContaminatedSite
  );

// Hazardous Substances Routes
router.route('/reports/:reportId/b4/hazardous-substances/inventory')
  .post(
    validation.validateHazardousSubstanceData,
    b4Controller.addHazardousSubstance
  );

// Calculation and Validation Routes
router.route('/reports/:reportId/b4/summary')
  .get(b4Controller.calculateB4Summary);

router.route('/reports/:reportId/b4/validate')
  .post(b4Controller.validateB4Module);

module.exports = router;