/**
 * Emission Factor Routes
 * Handles emission factor database queries and management
 */

const express = require('express');
const {
  getEmissionFactors,
  getEmissionFactor,
  createEmissionFactor,
  updateEmissionFactor,
  deleteEmissionFactor,
  getFactorsByFuelType,
  getFactorsByCountry,
  getRefrigerantGWP,
  updateFactorsFromSource,
  seedDefaultFactors
} = require('../controllers/emissionFactorController');
const { protect, authorize } = require('../middleware/auth');
const { validateEmissionFactor } = require('../middleware/validation');

const router = express.Router();

// Public routes for emission factor lookups
router
  .route('/fuel/:fuelType')
  .get(getFactorsByFuelType);

router
  .route('/country/:country')
  .get(getFactorsByCountry);

router
  .route('/refrigerant/:refrigerantType')
  .get(getRefrigerantGWP);

// Protected routes
// router.use(protect); // DISABLED for development

router
  .route('/')
  .get(getEmissionFactors)
  .post(authorize('Admin'), validateEmissionFactor, createEmissionFactor);

router
  .route('/:id')
  .get(getEmissionFactor)
  .put(authorize('Admin'), validateEmissionFactor, updateEmissionFactor)
  .delete(authorize('Admin'), deleteEmissionFactor);

// Administrative routes
router
  .route('/admin/update-from-source')
  .post(authorize('Admin'), updateFactorsFromSource);

router
  .route('/admin/seed-defaults')
  .post(authorize('Admin'), seedDefaultFactors);

module.exports = router;