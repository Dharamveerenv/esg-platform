/**
 * User Controller - Enhanced User Management
 * Comprehensive user CRUD operations with role-based access control
 */

const User = require('../models/User');
const Company = require('../models/Company');
const { AppError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseFormatter = require('../utils/responseFormatter');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Get all users (with filtering and pagination)
const getAllUsers = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    company,
    role,
    isActive,
    search
  } = req.query;

  // Build query
  let query = {};
  
  if (company) {
    query['companyAssociations.companyId'] = company;
  }
  
  if (role) {
    query['companyAssociations.role'] = role;
  }
  
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }
  
  // Search functionality
  if (search) {
    query.$or = [
      { 'profile.firstName': { $regex: search, $options: 'i' } },
      { 'profile.lastName': { $regex: search, $options: 'i' } },
      { 'authentication.email': { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;
  
  const users = await User.find(query)
    .populate('companyAssociations.companyId', 'companyProfile.legalName companyProfile.tradingName')
    .populate('companyAssociations.assignedBy', 'profile.firstName profile.lastName')
    .select('-authentication.password -authentication.twoFactorSecret -authentication.backupCodes')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await User.countDocuments(query);
  
  return ResponseFormatter.paginated(
    res,
    users,
    page,
    limit,
    total,
    'Users retrieved successfully'
  );
});

// Get single user
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate('companyAssociations.companyId', 'companyProfile.legalName companyProfile.tradingName')
    .populate('companyAssociations.assignedBy', 'profile.firstName profile.lastName')
    .select('-passwordHash -security.passwordResetToken -security.mfaSecret -security.mfaBackupCodes');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  return ResponseFormatter.success(res, { user }, 'User retrieved successfully');
});

// Invite user (new endpoint)
const inviteUser = catchAsync(async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    position,
    department,
    companyId,
    role = 'Editor',
    permissions = []
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User with this email already exists', 400));
  }

  // Verify company exists
  const company = await Company.findById(companyId);
  if (!company) {
    return next(new AppError('Company not found', 404));
  }

  // Create invitation token
  const invitationToken = crypto.randomBytes(32).toString('hex');
  const invitationExpires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

  // Create user with invitation status
  const newUser = await User.create({
    email,
    profile: {
      firstName,
      lastName,
      position,
      department
    },
    companyAssociations: [{
      companyId,
      role,
      permissions,
      assignedBy: req.user.id,
      joinedAt: new Date()
    }],
    invitation: {
      token: crypto.createHash('sha256').update(invitationToken).digest('hex'),
      expires: new Date(invitationExpires),
      invitedBy: req.user.id,
      companyId
    },
    isActive: false, // User becomes active after accepting invitation
    status: 'invited'
  });

  // TODO: Send invitation email here
  // await sendInvitationEmail(email, invitationToken, company.companyProfile.legalName);

  return ResponseFormatter.created(res, {
    user: {
      id: newUser._id,
      email: newUser.email,
      profile: newUser.profile,
      companyAssociations: newUser.companyAssociations,
      status: newUser.status
    },
    invitationToken, // For development/testing purposes
    invitationUrl: `${req.protocol}://${req.get('host')}/api/auth/accept-invitation/${invitationToken}`
  }, 'User invited successfully');
});

// Create new user with invitation
const createUser = catchAsync(async (req, res, next) => {
  const {
    profile,
    companyId,
    role,
    permissions,
    sendInvitation = true
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ 'authentication.email': profile.email });
  if (existingUser) {
    return res.status(400).json({
      status: 'error',
      message: 'User with this email already exists'
    });
  }

  // Create user with temporary password
  const temporaryPassword = crypto.randomBytes(12).toString('hex');
  
  const newUser = new User({
    profile: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      position: profile.position,
      department: profile.department,
      phoneNumber: profile.phoneNumber,
      expertise: profile.expertise || []
    },
    authentication: {
      email: profile.email.toLowerCase(),
      password: temporaryPassword,
      emailVerified: false
    },
    companyAssociations: [{
      companyId,
      role,
      permissions: permissions || [],
      assignedBy: req.user.id,
      invitationStatus: sendInvitation ? 'pending' : 'accepted',
      joinedAt: new Date()
    }],
    isActive: true,
    onboardingCompleted: false
  });

  // Generate invitation token if sending invitation
  let invitationToken;
  if (sendInvitation) {
    invitationToken = newUser.createInvitationToken(companyId);
  }

  await newUser.save();

  // Log activity
  newUser.logActivity('USER_CREATE', {
    createdBy: req.user.id,
    companyId,
    role,
    invitationSent: sendInvitation
  }, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await newUser.save();

  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: newUser._id,
        profile: newUser.profile,
        companyAssociations: newUser.companyAssociations,
        invitationToken: sendInvitation ? invitationToken : undefined
      }
    },
    message: sendInvitation ? 'User created and invitation sent' : 'User created successfully'
  });
});

// Update user profile
const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  // Prevent updating sensitive fields
  delete updates.authentication;
  delete updates.activityLog;
  delete updates._id;
  delete updates.createdAt;

  const user = await User.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  ).select('-authentication.password -authentication.twoFactorSecret -authentication.backupCodes');

  if (!user) {
    return next(new NotFoundError('User'));
  }

  // Log activity
  user.logActivity('PROFILE_UPDATE', {
    updatedBy: req.user.id,
    updatedFields: Object.keys(updates)
  }, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await user.save();

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

// Update user role and permissions
const updateUserRole = catchAsync(async (req, res, next) => {
  const { userId, companyId } = req.params;
  const { role, permissions } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new NotFoundError('User'));
  }

  const association = user.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId
  );

  if (!association) {
    return res.status(404).json({
      status: 'error',
      message: 'User is not associated with this company'
    });
  }

  // Update role and permissions
  if (role) association.role = role;
  if (permissions) association.permissions = permissions;

  // Log activity
  user.logActivity('ROLE_UPDATE', {
    updatedBy: req.user.id,
    companyId,
    newRole: role,
    newPermissions: permissions
  }, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      userId: user._id,
      companyAssociation: association
    }
  });
});

// Deactivate user
const deactivateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  ).select('-authentication.password -authentication.twoFactorSecret');

  if (!user) {
    return next(new NotFoundError('User'));
  }

  // Log activity
  user.logActivity('USER_DEACTIVATE', {
    deactivatedBy: req.user.id,
    reason: reason || 'No reason provided'
  }, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await user.save();

  res.status(200).json({
    status: 'success',
    data: { user },
    message: 'User deactivated successfully'
  });
});

// Reactivate user
const reactivateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  ).select('-authentication.password -authentication.twoFactorSecret');

  if (!user) {
    return next(new NotFoundError('User'));
  }

  // Log activity
  user.logActivity('USER_REACTIVATE', {
    reactivatedBy: req.user.id
  }, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await user.save();

  res.status(200).json({
    status: 'success',
    data: { user },
    message: 'User reactivated successfully'
  });
});

// Delete user (soft delete - for GDPR compliance)
const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { hardDelete = false } = req.query;

  if (hardDelete === 'true') {
    // Hard delete - only for SuperAdmin and GDPR compliance
    await User.findByIdAndDelete(id);
    
    res.status(204).json({
      status: 'success',
      message: 'User permanently deleted'
    });
  } else {
    // Soft delete - anonymize data
    const user = await User.findById(id);
    if (!user) {
      return next(new NotFoundError('User'));
    }

    // Anonymize user data
    user.profile.firstName = 'Deleted';
    user.profile.lastName = 'User';
    user.authentication.email = `deleted_user_${Date.now()}@anonymized.local`;
    user.isActive = false;
    
    // Clear sensitive data
    user.authentication.password = undefined;
    user.authentication.twoFactorSecret = undefined;
    user.authentication.backupCodes = [];
    user.activityLog = [];

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User data anonymized successfully'
    });
  }
});

// Get user activity log
const getUserActivityLog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { limit = 20 } = req.query;

  const user = await User.findById(id)
    .select('activityLog profile.firstName profile.lastName')
    .populate('activityLog.companyId', 'companyProfile.legalName');

  if (!user) {
    return next(new NotFoundError('User'));
  }

  // Get recent activity
  const activities = user.activityLog
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, Number(limit));

  res.status(200).json({
    status: 'success',
    data: {
      userId: user._id,
      userName: user.fullName,
      activities
    }
  });
});

// Get company users with roles
const getCompanyUsers = catchAsync(async (req, res, next) => {
  const { companyId } = req.params;
  const { includeInactive = false } = req.query;

  const users = await User.findByCompany(companyId, null, !includeInactive);

  const formattedUsers = users.map(user => {
    const association = user.companyAssociations.find(
      assoc => assoc.companyId.toString() === companyId
    );
    
    return {
      id: user._id,
      profile: user.profile,
      email: user.authentication.email,
      role: association?.role,
      permissions: association?.permissions,
      joinedAt: association?.joinedAt,
      isActive: association?.isActive && user.isActive,
      lastActiveAt: user.lastActiveAt,
      invitationStatus: association?.invitationStatus
    };
  });

  res.status(200).json({
    status: 'success',
    results: formattedUsers.length,
    data: {
      companyId,
      users: formattedUsers
    }
  });
});

// Resend invitation
const resendInvitation = catchAsync(async (req, res, next) => {
  const { userId, companyId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return next(new NotFoundError('User'));
  }

  const association = user.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId
  );

  if (!association) {
    return res.status(404).json({
      status: 'error',
      message: 'User is not associated with this company'
    });
  }

  // Generate new invitation token
  const invitationToken = user.createInvitationToken(companyId);
  await user.save();

  res.status(200).json({
    status: 'success',
    data: { invitationToken },
    message: 'Invitation resent successfully'
  });
});

module.exports = {
  getAllUsers,
  getUser,
  inviteUser,
  createUser,
  updateUser,
  updateUserRole,
  deactivateUser,
  reactivateUser,
  deleteUser,
  getUserActivityLog,
  getCompanyUsers,
  resendInvitation
};