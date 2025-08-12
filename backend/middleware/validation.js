/**
 * Validation Middleware
 * Handles request data validation
 */

const { ValidationError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Basic validation rules
const validateCompany = catchAsync(async (req, res, next) => {
  const { companyProfile, headquarters } = req.body;
  
  if (!companyProfile || !companyProfile.legalName) {
    return next(new ValidationError('Legal name is required'));
  }
  
  if (!headquarters || !headquarters.country) {
    return next(new ValidationError('Headquarters country is required'));
  }
  
  next();
});

const validatePremise = catchAsync(async (req, res, next) => {
  const { name, type, address } = req.body;
  
  if (!name) {
    return next(new ValidationError('Premise name is required'));
  }
  
  if (!type) {
    return next(new ValidationError('Premise type is required'));
  }
  
  if (!address || !address.country) {
    return next(new ValidationError('Premise address and country are required'));
  }
  
  next();
});

const validateReport = catchAsync(async (req, res, next) => {
  const { companyId, reportMetadata } = req.body;
  
  if (!companyId) {
    return next(new ValidationError('Company ID is required'));
  }
  
  if (!reportMetadata || !reportMetadata.reportingPeriod) {
    return next(new ValidationError('Reporting period is required'));
  }
  
  next();
});

const validateModule = (moduleType) => {
  return catchAsync(async (req, res, next) => {
    // Module-specific validation can be added here
    // For now, just pass through
    next();
  });
};

const validateEmissionFactor = catchAsync(async (req, res, next) => {
  const { factorMetadata, fuelSpecifications, emissionFactorData } = req.body;
  
  if (!factorMetadata || !factorMetadata.category) {
    return next(new ValidationError('Factor category is required'));
  }
  
  if (!fuelSpecifications || !fuelSpecifications.fuelType) {
    return next(new ValidationError('Fuel type is required'));
  }
  
  if (!emissionFactorData || !emissionFactorData.totalCo2eFactor) {
    return next(new ValidationError('Emission factor value is required'));
  }
  
  next();
});

module.exports = {
  validateCompany,
  validatePremise,
  validateReport,
  validateModule,
  validateEmissionFactor
};