/**
 * Company Controller
 * Handles company management operations
 */

const Company = require('../models/Company');
const { NotFoundError, ValidationError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Get all companies accessible to the user
 */
const getAllCompanies = catchAsync(async (req, res, next) => {
  // Development mode: Return all companies (authentication disabled)
  const companies = await Company.find({})
    .select('companyProfile industryClassification headquarters');
  
  res.status(200).json({
    status: 'success',
    results: companies.length,
    data: {
      companies
    }
  });
});

/**
 * Get single company by ID
 */
const getCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return next(new NotFoundError('Company'));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});

/**
 * Create new company
 */
const createCompany = catchAsync(async (req, res, next) => {
  const company = await Company.create(req.body);
  
  // Development mode: Skip user association (authentication disabled)
  // await req.user.addCompanyAssociation(company._id, 'Admin', req.user._id);
  
  res.status(201).json({
    status: 'success',
    data: {
      company
    }
  });
});

/**
 * Update company
 */
const updateCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!company) {
    return next(new NotFoundError('Company'));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});

/**
 * Delete company (soft delete)
 */
const deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  
  if (!company) {
    return next(new NotFoundError('Company'));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

/**
 * Add operational premise to company
 */
const addPremise = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return next(new NotFoundError('Company'));
  }
  
  company.operationalPremises.push(req.body);
  await company.save();
  
  res.status(201).json({
    status: 'success',
    data: {
      company
    }
  });
});

/**
 * Update operational premise
 */
const updatePremise = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return next(new NotFoundError('Company'));
  }
  
  const premise = company.operationalPremises.id(req.params.premiseId);
  if (!premise) {
    return next(new NotFoundError('Premise'));
  }
  
  Object.assign(premise, req.body);
  await company.save();
  
  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});

/**
 * Delete operational premise
 */
const deletePremise = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return next(new NotFoundError('Company'));
  }
  
  company.operationalPremises.pull(req.params.premiseId);
  await company.save();
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

/**
 * Get company users and their roles
 */
const getCompanyUsers = catchAsync(async (req, res, next) => {
  // This would typically involve a more complex query
  // For now, return placeholder response
  
  res.status(200).json({
    status: 'success',
    data: {
      users: [],
      message: 'User management functionality to be implemented'
    }
  });
});

/**
 * Update user role for company
 */
const updateUserRole = catchAsync(async (req, res, next) => {
  // Placeholder for user role management
  
  res.status(200).json({
    status: 'success',
    data: {
      message: 'User role update functionality to be implemented'
    }
  });
});

module.exports = {
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
};