/**
 * Reference Data Routes
 * Handles reference data like NACE codes, countries, standards
 */

const express = require('express');
const {
  getNACECodes,
  getCountries,
  getSustainabilityStandards,
  getCurrencies,
  getTimeZones,
  getIndustryBenchmarks,
  getComplianceRequirements
} = require('../controllers/referenceController');

const router = express.Router();

// Public reference data routes
router.get('/nace-codes', getNACECodes);
router.get('/countries', getCountries);
router.get('/currencies', getCurrencies);
router.get('/timezones', getTimeZones);
router.get('/sustainability-standards', getSustainabilityStandards);
router.get('/industry-benchmarks/:industry', getIndustryBenchmarks);
router.get('/compliance-requirements/:country', getComplianceRequirements);

module.exports = router;