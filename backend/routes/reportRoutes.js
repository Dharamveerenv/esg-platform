/**
 * ESG Report Routes
 * Comprehensive routes for ESG data collection and report management
 */

const express = require('express');
const {
  getAllReports,
  getReport,
  createReport,
  updateReportMetadata,
  updateReportStatus,
  deleteReport,
  cloneReport,
  submitReport,
  approveReport,
  publishReport,
  exportReport,
  getReportSummary,
  getReportAnalytics,
  compareReports,
  getBenchmarks
} = require('../controllers/reportController');

// Module-specific controllers
const {
  getModuleB0,
  updateModuleB0,
  getModuleB1,
  updateModuleB1,
  getModuleB2,
  updateModuleB2,
  getModuleB3,
  updateModuleB3,
  calculateEmissions,
  validateEmissions,
  getModuleB8,
  updateModuleB8,
  calculateWorkforceMetrics
} = require('../controllers/moduleController');

const { protect, authorize } = require('../middleware/auth');
const { validateReport, validateModule } = require('../middleware/validation');

const router = express.Router();

// Protect all routes
router.use(protect);

// Report lifecycle management
router
  .route('/')
  .get(getAllReports)
  .post(authorize('Admin', 'Manager', 'Editor'), validateReport, createReport);

router
  .route('/:id')
  .get(getReport)
  .delete(authorize('Admin'), deleteReport);

router
  .route('/:id/metadata')
  .put(authorize('Admin', 'Manager'), updateReportMetadata);

router
  .route('/:id/status')
  .put(authorize('Admin', 'Manager'), updateReportStatus);

router
  .route('/:id/clone')
  .post(authorize('Admin', 'Manager'), cloneReport);

router
  .route('/:id/submit')
  .post(authorize('Admin', 'Manager', 'Editor'), submitReport);

router
  .route('/:id/approve')
  .post(authorize('Admin', 'Manager'), approveReport);

router
  .route('/:id/publish')
  .post(authorize('Admin'), publishReport);

// Report export and analytics
router
  .route('/:id/export')
  .get(exportReport);

router
  .route('/:id/summary')
  .get(getReportSummary);

router
  .route('/:id/analytics')
  .get(getReportAnalytics);

router
  .route('/:id/comparison')
  .get(compareReports);

router
  .route('/:id/benchmarks')
  .get(getBenchmarks);

// Basic Modules Routes

// B0: General Information
router
  .route('/:reportId/b0')
  .get(getModuleB0)
  .put(authorize('Admin', 'Manager', 'Editor'), validateModule('b0'), updateModuleB0);

// B1: Basis for Preparation
router
  .route('/:reportId/b1')
  .get(getModuleB1)
  .put(authorize('Admin', 'Manager', 'Editor'), validateModule('b1'), updateModuleB1);

// B2: Sustainability Practices
router
  .route('/:reportId/b2')
  .get(getModuleB2)
  .put(authorize('Admin', 'Manager', 'Editor'), validateModule('b2'), updateModuleB2);

// B3: Energy and GHG Emissions
router
  .route('/:reportId/b3')
  .get(getModuleB3)
  .put(authorize('Admin', 'Manager', 'Editor'), validateModule('b3'), updateModuleB3);

router
  .route('/:reportId/b3/calculate')
  .post(authorize('Admin', 'Manager', 'Editor'), calculateEmissions);

router
  .route('/:reportId/b3/validate')
  .post(authorize('Admin', 'Manager', 'Editor'), validateEmissions);

// B8: Workforce General
router
  .route('/:reportId/b8')
  .get(getModuleB8)
  .put(authorize('Admin', 'Manager', 'Editor'), validateModule('b8'), updateModuleB8);

router
  .route('/:reportId/b8/calculate-metrics')
  .post(authorize('Admin', 'Manager', 'Editor'), calculateWorkforceMetrics);

module.exports = router;