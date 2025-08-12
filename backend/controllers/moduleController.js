/**
 * Module Controller
 * Handles ESG module-specific operations
 */

const Report = require('../models/Report');
const { NotFoundError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// B0: General Information Module
const getModuleB0 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b0_generalInformation
    }
  });
});

const updateModuleB0 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b0_generalInformation': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b0_generalInformation
    }
  });
});

// B1: Basis for Preparation Module
const getModuleB1 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b1_basisForPreparation
    }
  });
});

const updateModuleB1 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b1_basisForPreparation': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b1_basisForPreparation
    }
  });
});

// B2: Sustainability Practices Module
const getModuleB2 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b2_sustainabilityPractices
    }
  });
});

const updateModuleB2 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b2_sustainabilityPractices': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b2_sustainabilityPractices
    }
  });
});

// B3: Energy and GHG Emissions Module
const getModuleB3 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b3_energyGHGEmissions
    }
  });
});

const updateModuleB3 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b3_energyGHGEmissions': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b3_energyGHGEmissions
    }
  });
});

// B8: Workforce General Module
const getModuleB8 = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b8_workforceGeneral
    }
  });
});

const updateModuleB8 = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(
    req.params.reportId,
    { 'basicModules.b8_workforceGeneral': req.body },
    { new: true, runValidators: true }
  );
  
  if (!report) return next(new NotFoundError('Report'));
  
  res.status(200).json({
    status: 'success',
    data: {
      module: report.basicModules.b8_workforceGeneral
    }
  });
});

// Calculation functions
const calculateEmissions = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Emissions calculation functionality to be implemented'
  });
});

const validateEmissions = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Emissions validation functionality to be implemented'
  });
});

const calculateWorkforceMetrics = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Workforce metrics calculation functionality to be implemented'
  });
});

module.exports = {
  getModuleB0,
  updateModuleB0,
  getModuleB1,
  updateModuleB1,
  getModuleB2,
  updateModuleB2,
  getModuleB3,
  updateModuleB3,
  getModuleB8,
  updateModuleB8,
  calculateEmissions,
  validateEmissions,
  calculateWorkforceMetrics
};