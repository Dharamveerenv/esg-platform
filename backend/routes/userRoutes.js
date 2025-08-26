/**
 * User Routes - Enhanced User Management
 * Comprehensive user management routes with role-based access control
 */

const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserRole,
  deactivateUser,
  reactivateUser,
  deleteUser,
  getUserActivityLog,
  getCompanyUsers,
  resendInvitation
} = require('../controllers/userController');

const { protect, restrictTo, checkCompanyAccess } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');

const router = express.Router();

// Protect all routes
// router.use(protect); // DISABLED for development

// User management routes
router
  .route('/')
  .get(restrictTo('Admin', 'Manager'), getAllUsers)
  .post(restrictTo('Admin'), validateUserRegistration, createUser);

// Invite user (new endpoint)
router.post('/invite', restrictTo('Admin', 'Manager'), inviteUser);

router
  .route('/:id')
  .get(getUser) // Users can view their own profile, admins can view any
  .patch(updateUser) // Users can update their own profile
  .delete(restrictTo('Admin'), deleteUser);

// User role and permission management
router
  .route('/:id/role')
  .patch(restrictTo('Admin'), updateUserRole);

// User activation/deactivation
router
  .route('/:id/deactivate')
  .patch(restrictTo('Admin'), deactivateUser);

router
  .route('/:id/reactivate')
  .patch(restrictTo('Admin'), reactivateUser);

// User activity and audit trails
router
  .route('/:id/activity')
  .get(restrictTo('Admin', 'Manager'), getUserActivityLog);

// Company-specific user management
router
  .route('/company/:companyId')
  .get(restrictTo('Admin', 'Manager'), checkCompanyAccess, getCompanyUsers);

// Invitation management
router
  .route('/:userId/company/:companyId/resend-invitation')
  .post(restrictTo('Admin'), checkCompanyAccess, resendInvitation);

module.exports = router;