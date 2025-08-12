/**
 * Emission Factor Controller
 * Handles emission factor database operations
 */

const EmissionFactor = require('../models/EmissionFactor');
const { NotFoundError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getEmissionFactors = catchAsync(async (req, res, next) => {
  const { category, country, fuelType } = req.query;
  const filter = { isActive: true };
  
  if (category) filter['factorMetadata.category'] = category;
  if (country) filter['geographicScope.country'] = country;
  if (fuelType) filter['fuelSpecifications.fuelType'] = fuelType;
  
  const factors = await EmissionFactor.find(filter);
  
  res.status(200).json({
    status: 'success',
    results: factors.length,
    data: { factors }
  });
});

const getEmissionFactor = catchAsync(async (req, res, next) => {
  const factor = await EmissionFactor.findById(req.params.id);
  
  if (!factor) {
    return next(new NotFoundError('Emission Factor'));
  }
  
  res.status(200).json({
    status: 'success',
    data: { factor }
  });
});

const createEmissionFactor = catchAsync(async (req, res, next) => {
  const factor = await EmissionFactor.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: { factor }
  });
});

const updateEmissionFactor = catchAsync(async (req, res, next) => {
  const factor = await EmissionFactor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!factor) {
    return next(new NotFoundError('Emission Factor'));
  }
  
  res.status(200).json({
    status: 'success',
    data: { factor }
  });
});

const deleteEmissionFactor = catchAsync(async (req, res, next) => {
  const factor = await EmissionFactor.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  
  if (!factor) {
    return next(new NotFoundError('Emission Factor'));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

const getFactorsByFuelType = catchAsync(async (req, res, next) => {
  const factors = await EmissionFactor.find({
    'fuelSpecifications.fuelType': req.params.fuelType,
    isActive: true
  });
  
  res.status(200).json({
    status: 'success',
    results: factors.length,
    data: { factors }
  });
});

const getFactorsByCountry = catchAsync(async (req, res, next) => {
  const factors = await EmissionFactor.find({
    'geographicScope.country': req.params.country,
    isActive: true
  });
  
  res.status(200).json({
    status: 'success',
    results: factors.length,
    data: { factors }
  });
});

const getRefrigerantGWP = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Refrigerant GWP functionality to be implemented'
  });
});

const updateFactorsFromSource = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Factor update from external sources to be implemented'
  });
});

const seedDefaultFactors = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Default factor seeding to be implemented'
  });
});

module.exports = {
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
};