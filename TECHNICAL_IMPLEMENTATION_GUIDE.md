# Technical Implementation Guide
## Detailed Development Instructions

## 🚀 **Phase 1: Critical Backend Completion**

### **Step 1: Complete Missing Route Files**

#### 1.1 Company Routes (`backend/routes/companyRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const {
  getAllCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  addPremise,
  updatePremise,
  deletePremise
} = require('../controllers/companyController');
const { protect, checkCompanyAccess, checkPermission } = require('../controllers/authController');

// Company CRUD operations
router.use(protect); // All routes require authentication

router
  .route('/')
  .get(getAllCompanies)
  .post(createCompany);

router
  .route('/:id')
  .get(checkCompanyAccess, getCompany)
  .put(checkCompanyAccess, checkPermission('COMPANY_MANAGE'), updateCompany)
  .delete(checkCompanyAccess, checkPermission('COMPANY_MANAGE'), deleteCompany);

// Premise management
router
  .route('/:id/premises')
  .post(checkCompanyAccess, checkPermission('COMPANY_MANAGE'), addPremise);

router
  .route('/:id/premises/:premiseId')
  .put(checkCompanyAccess, checkPermission('COMPANY_MANAGE'), updatePremise)
  .delete(checkCompanyAccess, checkPermission('COMPANY_MANAGE'), deletePremise);

module.exports = router;
```

#### 1.2 Report Routes (`backend/routes/reportRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const {
  getAllReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  updateReportStatus,
  getModuleData,
  updateModuleData,
  calculateEmissions,
  exportReport
} = require('../controllers/reportController');
const { protect, checkCompanyAccess, checkPermission } = require('../controllers/authController');

router.use(protect);

// Report CRUD
router
  .route('/')
  .get(getAllReports)
  .post(createReport);

router
  .route('/:id')
  .get(getReport)
  .put(checkPermission('REPORT_EDIT'), updateReport)
  .delete(checkPermission('REPORT_MANAGE'), deleteReport);

// Report status management
router
  .route('/:id/status')
  .put(checkPermission('REPORT_EDIT'), updateReportStatus);

// ESG Module data
router
  .route('/:id/:moduleId')
  .get(getModuleData)
  .put(checkPermission('B3_EMISSIONS_WRITE'), updateModuleData);

// Calculations
router
  .route('/:id/calculate')
  .post(checkPermission('B3_EMISSIONS_CALCULATE'), calculateEmissions);

// Export
router
  .route('/:id/export')
  .get(exportReport);

module.exports = router;
```

### **Step 2: Implement Missing Controllers**

#### 2.1 Company Controller (`backend/controllers/companyController.js`)
```javascript
const Company = require('../models/Company');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  // Get companies user has access to
  const companyIds = req.user.companyAssociations.map(assoc => assoc.companyId);
  
  const companies = await Company.find({
    _id: { $in: companyIds },
    isActive: true
  }).select('companyProfile headquarters industryClassification totalEmployees');

  res.status(200).json({
    status: 'success',
    results: companies.length,
    data: {
      companies
    }
  });
});

exports.getCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(new AppError('No company found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});

exports.createCompany = catchAsync(async (req, res, next) => {
  const newCompany = await Company.create(req.body);

  // Add user as admin of the new company
  req.user.companyAssociations.push({
    companyId: newCompany._id,
    role: 'Admin',
    permissions: ['ALL_PERMISSIONS'],
    assignedBy: req.user._id
  });
  await req.user.save();

  res.status(201).json({
    status: 'success',
    data: {
      company: newCompany
    }
  });
});

exports.updateCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!company) {
    return next(new AppError('No company found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!company) {
    return next(new AppError('No company found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.addPremise = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return next(new AppError('No company found with that ID', 404));
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
```

#### 2.2 Report Controller (`backend/controllers/reportController.js`)
```javascript
const Report = require('../models/Report');
const calculationService = require('../services/calculationService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReports = catchAsync(async (req, res, next) => {
  const { companyId } = req.query;
  const companyIds = req.user.companyAssociations.map(assoc => assoc.companyId);
  
  let filter = { companyId: { $in: companyIds } };
  if (companyId) {
    filter.companyId = companyId;
  }

  const reports = await Report.find(filter)
    .populate('companyId', 'companyProfile.legalName')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: reports.length,
    data: {
      reports
    }
  });
});

exports.getReport = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.id)
    .populate('companyId', 'companyProfile.legalName');

  if (!report) {
    return next(new AppError('No report found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      report
    }
  });
});

exports.createReport = catchAsync(async (req, res, next) => {
  const newReport = await Report.create({
    ...req.body,
    createdBy: req.user._id
  });

  res.status(201).json({
    status: 'success',
    data: {
      report: newReport
    }
  });
});

exports.updateModuleData = catchAsync(async (req, res, next) => {
  const { id, moduleId } = req.params;
  
  const updatePath = `basicModules.${moduleId}`;
  const report = await Report.findByIdAndUpdate(
    id,
    { 
      [updatePath]: req.body,
      updatedAt: new Date()
    },
    { new: true, runValidators: true }
  );

  if (!report) {
    return next(new AppError('No report found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      report
    }
  });
});

exports.calculateEmissions = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.id);
  
  if (!report) {
    return next(new AppError('No report found with that ID', 404));
  }

  // Extract emissions data from report
  const emissionsData = {
    scope1: report.basicModules.b3?.scope1,
    scope2: report.basicModules.b3?.scope2,
    country: 'Ireland' // Default or from company data
  };

  const calculationResults = await calculationService.calculateComprehensiveEmissions(emissionsData);

  // Update report with calculation results
  report.calculationResults.ghgEmissionsSummary = {
    totalGHGEmissions: calculationResults.total,
    totalScope1: calculationResults.scope1?.total || 0,
    totalScope2: calculationResults.scope2?.total || 0,
    totalScope3: 0, // TODO: Implement Scope 3
    lastCalculated: new Date()
  };

  await report.save();

  res.status(200).json({
    status: 'success',
    data: {
      calculationResults,
      report
    }
  });
});
```

### **Step 3: Implement Missing Models**

#### 3.1 Report Model (`backend/models/Report.js`)
```javascript
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Report must belong to a company']
  },
  
  reportMetadata: {
    reportingPeriod: {
      startDate: {
        type: Date,
        required: [true, 'Start date is required']
      },
      endDate: {
        type: Date,
        required: [true, 'End date is required']
      },
      fiscalYear: {
        type: Number,
        required: [true, 'Fiscal year is required']
      }
    },
    reportType: {
      type: String,
      enum: ['VSME', 'CSRD', 'GRI', 'SASB', 'TCFD'],
      required: [true, 'Report type is required'],
      default: 'VSME'
    },
    version: {
      type: String,
      default: '1.0'
    },
    language: {
      type: String,
      enum: ['en', 'es', 'fr', 'de', 'it'],
      default: 'en'
    }
  },

  reportStatus: {
    currentStatus: {
      type: String,
      enum: ['Draft', 'InProgress', 'Review', 'Complete', 'Published'],
      default: 'Draft'
    },
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    statusHistory: [{
      status: String,
      changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      changedAt: {
        type: Date,
        default: Date.now
      },
      comment: String
    }],
    nextReviewDate: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date
  },

  // ESG Module Data
  basicModules: {
    b0: { // General Information
      companyOverview: String,
      reportingBoundary: String,
      stakeholderEngagement: String
    },
    b1: { // Basis for Preparation
      reportingStandards: [String],
      dataCollectionMethods: String,
      assumptions: String
    },
    b2: { // Sustainability Practices
      sustainabilityStrategy: String,
      policies: [String],
      initiatives: [String]
    },
    b3: { // Energy and GHG Emissions
      scope1: {
        stationaryCombustion: [{
          fuelType: String,
          quantity: Number,
          unit: String,
          location: String
        }],
        mobileCombustion: [{
          vehicleType: String,
          fuelType: String,
          quantity: Number,
          unit: String,
          calculationMethod: String
        }],
        fugitiveEmissions: [{
          refrigerantType: String,
          quantityLeaked: Number,
          equipmentType: String
        }]
      },
      scope2: {
        electricityConsumption: [{
          location: String,
          quantity: Number,
          unit: String,
          supplier: String,
          renewablePercentage: Number
        }]
      },
      scope3: {
        // TODO: Implement Scope 3 categories
      }
    },
    b4: { // Water Resources
      waterConsumption: Number,
      waterSources: [String],
      waterRecycling: Number
    },
    b5: { // Waste Management
      wasteGenerated: Number,
      wasteRecycled: Number,
      wasteDisposal: [String]
    },
    b6: { // Biodiversity
      biodiversityImpacts: String,
      conservationEfforts: String
    },
    b7: { // Supply Chain
      supplierAssessments: Number,
      sustainableSuppliers: Number
    },
    b8: { // Workforce
      demographics: {
        totalEmployees: Number,
        genderBreakdown: {
          male: Number,
          female: Number,
          other: Number
        },
        ageGroups: {
          under30: Number,
          between30and50: Number,
          over50: Number
        }
      },
      turnover: {
        newHires: Number,
        departures: Number,
        turnoverRate: Number
      },
      safety: {
        accidents: Number,
        accidentRate: Number,
        trainingHours: Number
      },
      compensation: {
        averageSalary: Number,
        genderPayGap: Number,
        benefits: [String]
      }
    },
    b9: { // Community Impact
      communityInvestment: Number,
      localEmployment: Number,
      communityPrograms: [String]
    },
    b10: { // Governance
      boardComposition: String,
      ethicsTraining: Number,
      complianceIncidents: Number
    },
    b11: { // Risk Management
      climateRisks: [String],
      riskMitigation: [String],
      riskAssessmentFrequency: String
    }
  },

  calculationResults: {
    ghgEmissionsSummary: {
      totalGHGEmissions: {
        type: Number,
        default: 0
      },
      totalScope1: {
        type: Number,
        default: 0
      },
      totalScope2: {
        type: Number,
        default: 0
      },
      totalScope3: {
        type: Number,
        default: 0
      },
      emissionIntensity: {
        value: Number,
        unit: String
      },
      lastCalculated: Date
    },
    workforceMetrics: {
      employeeTurnoverRate: Number,
      accidentRate: Number,
      genderPayGap: Number,
      trainingHoursPerEmployee: Number,
      lastCalculated: Date
    },
    environmentalMetrics: {
      waterIntensity: Number,
      wasteIntensity: Number,
      energyIntensity: Number,
      lastCalculated: Date
    }
  },

  attachments: [{
    fileName: String,
    fileType: String,
    fileSize: Number,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    fileUrl: String
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
reportSchema.index({ companyId: 1, 'reportMetadata.reportingPeriod.fiscalYear': -1 });
reportSchema.index({ 'reportStatus.currentStatus': 1, updatedAt: -1 });
reportSchema.index({ createdBy: 1, createdAt: -1 });

// Virtual for completion percentage calculation
reportSchema.virtual('calculatedCompletionPercentage').get(function() {
  const modules = Object.keys(this.basicModules);
  let completedModules = 0;
  
  modules.forEach(moduleKey => {
    const module = this.basicModules[moduleKey];
    if (module && Object.keys(module).length > 0) {
      completedModules++;
    }
  });
  
  return Math.round((completedModules / modules.length) * 100);
});

// Pre-save middleware to update completion percentage
reportSchema.pre('save', function(next) {
  this.reportStatus.completionPercentage = this.calculatedCompletionPercentage;
  this.updatedAt = new Date();
  next();
});

// Instance method to update module data
reportSchema.methods.updateModule = function(moduleId, data) {
  this.basicModules[moduleId] = { ...this.basicModules[moduleId], ...data };
  this.lastModifiedBy = this.modifiedBy; // Set in controller
  return this.save();
};

// Instance method to add status change
reportSchema.methods.changeStatus = function(newStatus, userId, comment) {
  this.reportStatus.statusHistory.push({
    status: this.reportStatus.currentStatus,
    changedBy: userId,
    changedAt: new Date(),
    comment: comment
  });
  this.reportStatus.currentStatus = newStatus;
  return this.save();
};

// Static method to get reports by company
reportSchema.statics.findByCompany = function(companyId, status = null) {
  const query = { companyId };
  if (status) {
    query['reportStatus.currentStatus'] = status;
  }
  return this.find(query).sort('-createdAt');
};

module.exports = mongoose.model('Report', reportSchema);
```

### **Step 4: Implement Utility Files**

#### 4.1 AppError Utility (`backend/utils/appError.js`)
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
```

#### 4.2 CatchAsync Utility (`backend/utils/catchAsync.js`)
```javascript
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
```

#### 4.3 Error Handler Middleware (`backend/middleware/errorHandler.js`)
```javascript
const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
```

## 🎯 **Phase 2: Frontend Integration**

### **Step 5: Enhanced Authentication Components**

#### 5.1 Enhanced Login Form (`src/components/auth/enhanced-login-form.tsx`)
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient } from '@/lib/api-client';
import { Loader2, Eye, EyeOff } from 'lucide-react';

export function EnhancedLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mfaToken: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.login({
        email: formData.email,
        password: formData.password,
        mfaToken: formData.mfaToken || undefined
      });

      if (response.status === 'mfa_required') {
        setShowMFA(true);
        setIsLoading(false);
        return;
      }

      if (response.status === 'success') {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access the ESG platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {showMFA && (
            <div className="space-y-2">
              <Label htmlFor="mfaToken">MFA Code</Label>
              <Input
                id="mfaToken"
                type="text"
                placeholder="Enter 6-digit code"
                value={formData.mfaToken}
                onChange={(e) => setFormData(prev => ({ ...prev, mfaToken: e.target.value }))}
                maxLength={6}
                disabled={isLoading}
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {showMFA ? 'Verify & Sign In' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### **Step 6: Report Management Dashboard**

#### 6.1 Report Dashboard (`src/components/reports/report-dashboard.tsx`)
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { apiClient, type Report } from '@/lib/api-client';
import { Plus, FileText, Calendar, Building } from 'lucide-react';

export function ReportDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await apiClient.getReports();
      if (response.status === 'success') {
        setReports(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'secondary';
      case 'InProgress': return 'default';
      case 'Review': return 'outline';
      case 'Complete': return 'success';
      case 'Published': return 'success';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return <div>Loading reports...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ESG Reports</h1>
          <p className="text-muted-foreground">
            Manage your sustainability reporting
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report._id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {report.reportMetadata.reportType} {report.reportMetadata.reportingPeriod.fiscalYear}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="mr-1 h-3 w-3" />
                    {report.companyId}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(report.reportStatus.currentStatus)}>
                  {report.reportStatus.currentStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion</span>
                    <span>{report.reportStatus.completionPercentage}%</span>
                  </div>
                  <Progress value={report.reportStatus.completionPercentage} className="h-2" />
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(report.reportMetadata.reportingPeriod.startDate).toLocaleDateString()} - 
                  {new Date(report.reportMetadata.reportingPeriod.endDate).toLocaleDateString()}
                </div>

                {report.calculationResults?.ghgEmissionsSummary?.totalGHGEmissions && (
                  <div className="text-sm">
                    <span className="font-medium">Total Emissions: </span>
                    {report.calculationResults.ghgEmissionsSummary.totalGHGEmissions.toLocaleString()} kg CO2e
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first ESG report to get started with sustainability tracking
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create First Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

This technical implementation guide provides the foundation for building your end-to-end ESG dashboard. The next steps would be to:

1. **Implement these backend components** first
2. **Test the API endpoints** with Postman or similar tools
3. **Build the frontend components** progressively
4. **Integrate the calculation engine** with real data
5. **Add comprehensive testing** throughout

Would you like me to continue with more specific implementation details for any particular component?