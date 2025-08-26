/**
 * Company Management Routes
 * Handles company CRUD operations and premises management
 */

const express = require('express');
const {
  getAllCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  addPremise,
  updatePremise,
  deletePremise,
  getCompanyUsers,
  updateUserRole
} = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/auth');
const { validateCompany, validatePremise } = require('../middleware/validation');

const router = express.Router();

// Protect all routes after this middleware (DISABLED for development)
// router.use(protect);

// Company CRUD routes
router
  .route('/')
  .get(getAllCompanies)
  .post(authorize('Admin', 'Manager'), validateCompany, createCompany);

router
  .route('/:id')
  .get(getCompany)
  .put(authorize('Admin', 'Manager'), validateCompany, updateCompany)
  .delete(authorize('Admin'), deleteCompany);

// Company user management
router
  .route('/:id/users')
  .get(authorize('Admin', 'Manager'), getCompanyUsers);

router
  .route('/:id/users/:userId/role')
  .put(authorize('Admin'), updateUserRole);

// Premises management
router
  .route('/:id/premises')
  .post(authorize('Admin', 'Manager'), validatePremise, addPremise);

router
  .route('/:id/premises/:premiseId')
  .put(authorize('Admin', 'Manager'), validatePremise, updatePremise)
  .delete(authorize('Admin', 'Manager'), deletePremise);

module.exports = router;