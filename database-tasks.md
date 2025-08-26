# Database Schema & Migration Tasks - ESG Platform

## Overview
Comprehensive database development tasks for MongoDB schema design, migrations, indexing, and data management. Tasks are organized for parallel execution with clear dependencies and acceptance criteria.

## Database Team Structure
- **DB Team Alpha**: Schema Design & Core Models
- **DB Team Beta**: Indexing, Performance & Migrations
- **DB Team Gamma**: Data Seeding & Reference Systems
- **DB Team Delta**: Analytics & Aggregation Pipelines

---

## DB Team Alpha: Schema Design & Core Models

### Task DB-A1: Enhanced Report Module Schemas
**Priority**: High | **Estimate**: 12 hours | **Dependencies**: None

#### Description
Extend the existing Report model with complete schema definitions for all ESG modules (B1-B11, C1-C9).

#### Current Schema Status
✅ **Implemented**: B0 (Company Info), B3 (Emissions), B8 (Workforce)
❌ **Missing**: B1, B2, B4-B7, B9-B11, C1-C9

#### Acceptance Criteria
- [ ] Complete B1 (Basis for Preparation) schema with validation
- [ ] Complete B2 (Sustainability Practices) schema
- [ ] Complete B4-B7 environmental modules schemas
- [ ] Complete B9-B11 governance modules schemas
- [ ] Add comprehensive validation rules for all fields
- [ ] Implement schema versioning for future updates

#### B1 Schema Implementation
```javascript
b1_basisForPreparation: {
  reportingFramework: {
    primaryStandard: {
      type: String,
      enum: ['GRI', 'SASB', 'TCFD', 'ISSB', 'EU-Taxonomy', 'VSME'],
      required: [true, 'Primary reporting standard is required']
    },
    additionalStandards: [{
      standard: String,
      version: String,
      applicableModules: [String]
    }],
    frameworkVersion: {
      type: String,
      required: [true, 'Framework version is required']
    },
    deviations: {
      hasDeviations: Boolean,
      deviationDetails: String,
      justification: String
    }
  },
  consolidationApproach: {
    method: {
      type: String,
      enum: ['Financial Control', 'Operational Control', 'Equity Share'],
      required: [true, 'Consolidation method is required']
    },
    description: {
      type: String,
      maxlength: 1000
    },
    subsidiariesIncluded: [{
      name: String,
      ownershipPercentage: {
        type: Number,
        min: 0,
        max: 100
      },
      consolidationMethod: String,
      exclusionReason: String
    }],
    jointVentures: [{
      name: String,
      ownershipPercentage: Number,
      consolidationTreatment: String
    }]
  },
  reportingBoundary: {
    organizationalBoundary: {
      description: String,
      legalEntitiesIncluded: [String],
      geographicCoverage: [String]
    },
    operationalBoundary: {
      scope1Included: Boolean,
      scope2Included: Boolean,
      scope3Categories: [{
        categoryNumber: Number,
        categoryName: String,
        included: Boolean,
        exclusionReason: String
      }]
    },
    temporalBoundary: {
      reportingPeriodStart: Date,
      reportingPeriodEnd: Date,
      dataCollectionCutoff: Date,
      priorPeriodAdjustments: String
    }
  },
  completionStatus: { 
    type: String, 
    enum: ['Incomplete', 'Complete'], 
    default: 'Incomplete' 
  },
  lastUpdated: { type: Date, default: Date.now },
  validation: {
    completenessCheck: Boolean,
    qualityScore: Number,
    validationNotes: String
  }
}
```

#### B2 Schema Implementation
```javascript
b2_sustainabilityPractices: {
  environmentalPractices: {
    climateChange: {
      hasPolicy: Boolean,
      policyDocument: String, // File reference
      implementationDate: Date,
      lastReviewDate: Date,
      effectiveness: { 
        type: String, 
        enum: ['High', 'Medium', 'Low', 'Not Assessed'] 
      },
      kpis: [{
        metric: String,
        targetValue: Number,
        currentValue: Number,
        unit: String
      }],
      initiatives: [String]
    },
    energyManagement: {
      hasPolicy: Boolean,
      energyManagementSystem: String, // ISO 50001, etc.
      renewableEnergyTargets: {
        targetPercentage: Number,
        targetDate: Date,
        currentPercentage: Number
      },
      efficiencyMeasures: [String]
    },
    wasteManagement: {
      hasPolicy: Boolean,
      wasteReductionTargets: {
        reductionPercentage: Number,
        baselineYear: Number,
        targetYear: Number
      },
      recyclingPrograms: [String],
      circularEconomyInitiatives: [String]
    },
    waterManagement: {
      hasPolicy: Boolean,
      waterEfficiencyTargets: {
        reductionPercentage: Number,
        baselineYear: Number,
        targetYear: Number
      },
      waterConservationMeasures: [String]
    },
    biodiversityProtection: {
      hasPolicy: Boolean,
      biodiversityImpactAssessment: Boolean,
      conservationInitiatives: [String],
      habitatRestoration: [String]
    }
  },
  socialPractices: {
    employeeWellbeing: {
      wellnessPrograms: [String],
      workLifeBalanceInitiatives: [String],
      mentalHealthSupport: Boolean,
      safetyTraining: [String]
    },
    diversityInclusion: {
      diversityPolicy: Boolean,
      inclusionPrograms: [String],
      diversityTargets: [{
        metric: String,
        targetValue: Number,
        currentValue: Number
      }],
      payEquityAnalysis: Boolean
    },
    communityEngagement: {
      communityPrograms: [String],
      localProcurementPolicy: Boolean,
      communityInvestment: {
        annualBudget: Number,
        focusAreas: [String]
      },
      stakeholderEngagement: [String]
    },
    humanRights: {
      humanRightsPolicy: Boolean,
      dueDiligenceProcess: Boolean,
      supplierCodeOfConduct: Boolean,
      grievanceMechanism: Boolean,
      humanRightsTraining: Boolean
    }
  },
  governancePractices: {
    boardDiversity: {
      diversityPolicy: Boolean,
      currentComposition: {
        totalMembers: Number,
        femaleMembers: Number,
        minorityMembers: Number,
        independentMembers: Number
      },
      diversityTargets: {
        femaleRepresentation: Number,
        minorityRepresentation: Number
      }
    },
    ethicsCompliance: {
      codeOfEthics: Boolean,
      ethicsTraining: Boolean,
      whistleblowerPolicy: Boolean,
      complianceMonitoring: Boolean,
      ethicsIncidents: Number
    },
    riskManagement: {
      riskManagementFramework: Boolean,
      climateRiskAssessment: Boolean,
      cybersecurityPolicy: Boolean,
      businessContinuityPlan: Boolean,
      riskCommittee: Boolean
    },
    stakeholderEngagement: {
      engagementStrategy: Boolean,
      regularConsultations: Boolean,
      feedbackMechanisms: [String],
      stakeholderMapping: Boolean
    }
  },
  completionStatus: { 
    type: String, 
    enum: ['Incomplete', 'Complete'], 
    default: 'Incomplete' 
  },
  lastUpdated: { type: Date, default: Date.now }
}
```

---

### Task DB-A2: Environmental Modules Schema (B4-B7)
**Priority**: Medium | **Estimate**: 14 hours | **Dependencies**: Report Schema Foundation

#### Description
Implement comprehensive schemas for environmental reporting modules with calculation-ready data structures.
#### Acceptance Criteria
- [ ] B4 (Pollution) schema with air/water/soil pollution tracking
- [ ] B5 (Biodiversity) schema with habitat and species impact
- [ ] B6 (Water) schema with consumption and efficiency metrics
- [ ] B7 (Waste) schema with generation, treatment, and circularity
- [ ] Integration with calculation services
- [ ] Validation rules for all environmental metrics

#### B4 Pollution Schema
```javascript
b4_pollution: {
  airPollution: {
    monitoring: {
      hasMonitoring: Boolean,
      monitoringFrequency: String,
      monitoringLocations: [String]
    },
    emissions: [{
      pollutant: {
        type: String,
        enum: ['NOx', 'SOx', 'PM2.5', 'PM10', 'VOCs', 'CO', 'Other']
      },
      quantity: Number,
      unit: String,
      measurementMethod: String,
      exceedsLimits: Boolean,
      regulatoryLimit: Number
    }],
    reductionMeasures: [String],
    complianceStatus: {
      type: String,
      enum: ['Compliant', 'Non-Compliant', 'Under Review']
    }
  },
  waterPollution: {
    discharges: [{
      dischargePoint: String,
      receivingWaterBody: String,
      pollutant: String,
      concentration: Number,
      unit: String,
      regulatoryLimit: Number,
      treatmentMethod: String
    }],
    wastewaterTreatment: {
      hasTreatment: Boolean,
      treatmentType: String,
      treatmentEfficiency: Number
    }
  },
  soilContamination: {
    assessment: {
      lastAssessment: Date,
      contaminants: [String],
      remediationRequired: Boolean,
      remediationPlan: String
    }
  }
}
```

---

### Task DB-A3: Social & Governance Modules Schema (B9-B11)
**Priority**: Medium | **Estimate**: 10 hours | **Dependencies**: User & Report Models

#### Description
Complete social and governance modules with comprehensive tracking for health & safety, remuneration, and anti-corruption measures.

#### Acceptance Criteria
- [ ] B9 (Health & Safety) schema with incident tracking
- [ ] B10 (Remuneration) schema with pay equity analysis
- [ ] B11 (Anti-Corruption) schema with policy and training tracking
- [ ] Integration with workforce calculations
- [ ] Compliance validation rules

---

### Task DB-A4: Comprehensive Modules Schema (C1-C9)
**Priority**: Low | **Estimate**: 16 hours | **Dependencies**: Basic Modules Complete

#### Description
Implement advanced comprehensive reporting modules for detailed ESG analysis.

#### Acceptance Criteria
- [ ] All C1-C9 module schemas designed and implemented
- [ ] Advanced analytics data structures
- [ ] Integration with benchmarking systems
- [ ] Flexible schema for future regulatory changes

---

## DB Team Beta: Indexing, Performance & Migrations

### Task DB-B1: Advanced Database Indexing Strategy
**Priority**: High | **Estimate**: 8 hours | **Dependencies**: Schema Completion

#### Description
Implement comprehensive indexing strategy for optimal query performance across all ESG data.

#### Acceptance Criteria
- [ ] Compound indexes for report queries
- [ ] Text indexes for search functionality
- [ ] Geospatial indexes for location-based queries
- [ ] Performance benchmarking with 10K+ records
- [ ] Index usage monitoring and optimization

#### Index Implementation
```javascript
// Report collection indexes
reportSchema.index({
  companyId: 1,
  'reportMetadata.reportingPeriod.fiscalYear': -1,
  'reportStatus.currentStatus': 1
});

reportSchema.index({
  'basicModules.b3_energyGHGEmissions.scope1Emissions.totalScope1': -1,
  'calculationResults.ghgEmissionsSummary.totalGHGEmissions': -1
});

reportSchema.index({
  'reportStatus.lastModified': -1,
  'reportStatus.lastModifiedBy': 1
});

// Text search across multiple fields
reportSchema.index({
  'basicModules.b0_generalInformation.companyOverview': 'text',
  'basicModules.b2_sustainabilityPractices': 'text'
});

// Company collection indexes
companySchema.index({
  'companyProfile.legalName': 'text',
  'companyProfile.tradingName': 'text'
});

companySchema.index({
  'industryClassification.primaryNACECode': 1,
  'headquarters.country': 1,
  'headquarters.county': 1
});

// Geospatial index for premises
companySchema.index({
  'operationalPremises.address.coordinates': '2dsphere'
});

// User access optimization
companySchema.index({
  'companyProfile.primaryEmail': 1,
  isActive: 1
});

// Emission factors optimization
emissionFactorSchema.index({
  'factorMetadata.category': 1,
  'fuelSpecifications.fuelType': 1,
  'geographicScope.country': 1,
  'factorMetadata.validFrom': -1,
  isActive: 1
});

// Time-series performance
emissionFactorSchema.index({
  'factorMetadata.publishedDate': -1,
  'factorMetadata.source': 1
});
```

---

### Task DB-B2: Database Migration Framework
**Priority**: High | **Estimate**: 10 hours | **Dependencies**: None

#### Description
Create comprehensive migration framework for schema updates, data transformations, and version control.

#### Acceptance Criteria
- [ ] Migration script framework with versioning
- [ ] Rollback capabilities for failed migrations
- [ ] Data validation during migrations
- [ ] Migration testing with production data copies
- [ ] Automated migration execution pipeline

#### Migration Framework
```javascript
// migrations/framework/migrationRunner.js
class MigrationRunner {
  constructor() {
    this.migrations = [];
    this.migrationCollection = 'migrations';
  }
  
  async runMigrations() {
    const appliedMigrations = await this.getAppliedMigrations();
    const pendingMigrations = this.migrations.filter(
      m => !appliedMigrations.includes(m.version)
    );
    
    for (const migration of pendingMigrations) {
      await this.runMigration(migration);
    }
  }
  
  async runMigration(migration) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await migration.up(session);
        await this.recordMigration(migration.version, session);
      });
      console.log(`Migration ${migration.version} completed`);
    } catch (error) {
      console.error(`Migration ${migration.version} failed:`, error);
      throw error;
    } finally {
      await session.endSession();
    }
  }
}

// Example migration: migrations/001_add_b1_schema.js
module.exports = {
  version: '001',
  description: 'Add B1 basis for preparation schema',
  async up(session) {
    await mongoose.connection.db.collection('reports')
      .updateMany(
        {},
        { $set: { 'basicModules.b1_basisForPreparation': {} } },
        { session }
      );
  },
  async down(session) {
    await mongoose.connection.db.collection('reports')
      .updateMany(
        {},
        { $unset: { 'basicModules.b1_basisForPreparation': 1 } },
        { session }
      );
  }
};
```

---

### Task DB-B3: Performance Optimization & Query Analysis
**Priority**: Medium | **Estimate**: 12 hours | **Dependencies**: Indexing Complete

#### Description
Comprehensive performance optimization with query analysis, caching strategies, and database tuning.

#### Acceptance Criteria
- [ ] Query performance analysis and optimization
- [ ] MongoDB aggregation pipeline optimization
- [ ] Connection pooling and session management
- [ ] Database performance monitoring
- [ ] Caching strategy implementation
- [ ] Load testing with realistic data volumes

#### Performance Monitoring
```javascript
// Performance monitoring middleware
class DatabasePerformanceMonitor {
  constructor() {
    this.slowQueryThreshold = 100; // ms
    this.queryMetrics = new Map();
  }
  
  async monitorQuery(operation, queryFn) {
    const startTime = Date.now();
    try {
      const result = await queryFn();
      const duration = Date.now() - startTime;
      
      this.recordMetric(operation, duration);
      
      if (duration > this.slowQueryThreshold) {
        console.warn(`Slow query detected: ${operation} took ${duration}ms`);
      }
      
      return result;
    } catch (error) {
      this.recordError(operation, error);
      throw error;
    }
  }
  
  recordMetric(operation, duration) {
    if (!this.queryMetrics.has(operation)) {
      this.queryMetrics.set(operation, {
        count: 0,
        totalTime: 0,
        maxTime: 0,
        minTime: Infinity
      });
    }
    
    const metrics = this.queryMetrics.get(operation);
    metrics.count++;
    metrics.totalTime += duration;
    metrics.maxTime = Math.max(metrics.maxTime, duration);
    metrics.minTime = Math.min(metrics.minTime, duration);
  }
}
```

---

### Task DB-B4: Data Archival & Retention Policies
**Priority**: Low | **Estimate**: 8 hours | **Dependencies**: Performance Optimization

#### Description
Implement data archival system and retention policies for compliance and storage optimization.

#### Acceptance Criteria
- [ ] Automated data archival for old reports
- [ ] Retention policy implementation by data type
- [ ] Archive retrieval mechanisms
- [ ] Storage optimization for archived data
- [ ] Compliance with data retention regulations

---

## DB Team Gamma: Data Seeding & Reference Systems

### Task DB-G1: Enhanced Emission Factors Database
**Priority**: High | **Estimate**: 16 hours | **Dependencies**: EmissionFactor Model

#### Description
Expand emission factors database with comprehensive international factors and regular update mechanisms.

#### Acceptance Criteria
- [ ] Complete SEAI Ireland emission factors (100+ factors)
- [ ] UK DEFRA emission factors integration
- [ ] EU ETS emission factors
- [ ] IPCC standard factors as fallbacks
- [ ] Automatic factor updates from official sources
- [ ] Factor validation and quality assurance

#### Emission Factor Seeding
```javascript
// seeds/comprehensiveEmissionFactors.js
const comprehensiveEmissionFactors = [
  // SEAI Ireland Factors - Scope 1
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: { country: 'Ireland', region: 'All Ireland' },
    fuelSpecifications: {
      fuelType: 'Natural Gas',
      description: 'Natural gas used for heating and process applications'
    },
    emissionFactorData: {
      co2Factor: 2.02,
      ch4Factor: 0.000037,
      n2oFactor: 0.000037,
      totalCo2eFactor: 2.02,
      unit: 'm3',
      uncertainty: 5,
      confidenceLevel: 'High'
    },
    calculationParameters: {
      netCalorificValue: 38.3, // MJ/m3
      density: 0.785 // kg/m3
    },
    qualityIndicators: {
      dataQuality: 'High',
      geographicRepresentativeness: 'High',
      temporalRepresentativeness: 'High',
      technologyRepresentativeness: 'High'
    }
  },
  
  // UK DEFRA Factors
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Mobile',
      source: 'DEFRA',
      version: '2024',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: { country: 'United Kingdom' },
    fuelSpecifications: {
      fuelType: 'Diesel',
      fuelGrade: 'Automotive Diesel',
      description: 'Diesel fuel for road transport vehicles'
    },
    emissionFactorData: {
      co2Factor: 2.51,
      ch4Factor: 0.000007,
      n2oFactor: 0.000029,
      totalCo2eFactor: 2.52,
      unit: 'litre',
      uncertainty: 3,
      confidenceLevel: 'High'
    }
  },
  
  // Electricity Grid Factors
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid',
      source: 'IEA',
      version: '2024',
      publishedDate: new Date('2024-01-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: { 
      country: 'Germany',
      region: 'National Grid'
    },
    fuelSpecifications: {
      fuelType: 'Electricity',
      description: 'Grid electricity - location-based method'
    },
    emissionFactorData: {
      co2Factor: 0.366,
      totalCo2eFactor: 0.366,
      unit: 'kWh',
      uncertainty: 8,
      confidenceLevel: 'Medium'
    }
  }
  // ... Additional factors for all countries and fuel types
];

class EmissionFactorSeeder {
  async seedAllFactors() {
    console.log('🌱 Seeding comprehensive emission factors...');
    
    for (const factor of comprehensiveEmissionFactors) {
      await EmissionFactor.findOneAndUpdate(
        {
          'factorMetadata.category': factor.factorMetadata.category,
          'fuelSpecifications.fuelType': factor.fuelSpecifications.fuelType,
          'geographicScope.country': factor.geographicScope.country,
          'factorMetadata.source': factor.factorMetadata.source
        },
        factor,
        { upsert: true, new: true }
      );
    }
    
    const count = await EmissionFactor.countDocuments();
    console.log(`✅ Seeded ${count} emission factors`);
  }
  
  async validateFactors() {
    const factors = await EmissionFactor.find();
    let validationErrors = [];
    
    factors.forEach(factor => {
      if (!factor.isValid) {
        validationErrors.push(`Invalid factor: ${factor._id}`);
      }
    });
    
    if (validationErrors.length > 0) {
      console.warn('⚠️ Validation errors found:', validationErrors);
    } else {
      console.log('✅ All emission factors validated successfully');
    }
  }
}
```

---

### Task DB-G2: Reference Data Management System
**Priority**: Medium | **Estimate**: 12 hours | **Dependencies**: None

#### Description
Create comprehensive reference data system for NACE codes, countries, currencies, and regulatory frameworks.

#### Acceptance Criteria
- [ ] Complete NACE Rev.2 code database
- [ ] Country and region reference data
- [ ] Currency and conversion rates
- [ ] Regulatory framework references
- [ ] Industry benchmarking data
- [ ] Regular reference data updates

#### Reference Data Schema
```javascript
// models/ReferenceData.js
const nacecodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // "01.11"
  level: { type: Number, required: true }, // 1-4 (section, division, group, class)
  parentCode: String,
  title: { type: String, required: true },
  description: String,
  includes: [String],
  excludes: [String],
  isActive: { type: Boolean, default: true }
});

const countrySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // "IE"
  name: { type: String, required: true },
  region: String,
  currency: String,
  timeZone: String,
  gridEmissionFactor: Number,
  regulatoryFrameworks: [String],
  languages: [String]
});

const regulatoryFrameworkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  abbreviation: String,
  type: { type: String, enum: ['National', 'Regional', 'International'] },
  applicableCountries: [String],
  requirements: {
    companySize: {
      employees: { min: Number, max: Number },
      revenue: { min: Number, max: Number },
      balanceSheet: { min: Number, max: Number }
    },
    reportingModules: [String],
    frequency: String,
    deadline: String
  },
  version: String,
  effectiveDate: Date
});
```

---

### Task DB-G3: Demo & Sample Data Generation
**Priority**: Medium | **Estimate**: 10 hours | **Dependencies**: Complete Schemas

#### Description
Create comprehensive demo data generation system for testing and user onboarding.

#### Acceptance Criteria
- [ ] Realistic company profiles across industries
- [ ] Complete ESG reports with calculations
- [ ] Sample emission factors and reference data
- [ ] User accounts with different roles
- [ ] Performance testing data sets
- [ ] Data anonymization for demos

---

### Task DB-G4: Data Import/Export Framework
**Priority**: Low | **Estimate**: 14 hours | **Dependencies**: Reference Data System

#### Description
Build framework for importing/exporting ESG data from external systems.

#### Acceptance Criteria
- [ ] Excel/CSV import with validation
- [ ] JSON/XML export capabilities
- [ ] Data mapping and transformation
- [ ] Import error handling and reporting
- [ ] Bulk data operations
- [ ] External system integration support

---

## DB Team Delta: Analytics & Aggregation Pipelines

### Task DB-D1: ESG Analytics Aggregation Pipelines
**Priority**: Medium | **Estimate**: 18 hours | **Dependencies**: Complete Report Schemas

#### Description
Create MongoDB aggregation pipelines for ESG analytics, benchmarking, and reporting.

#### Acceptance Criteria
- [ ] Emissions aggregation by scope, sector, time period
- [ ] Company performance benchmarking pipelines
- [ ] Industry average calculations
- [ ] Trend analysis aggregations
- [ ] Compliance status reporting
- [ ] Real-time dashboard data pipelines

#### Analytics Pipelines
```javascript
// aggregation/emissionsAnalytics.js
class EmissionsAnalyticsPipeline {
  
  // Aggregate emissions by industry sector
  static getEmissionsByIndustry() {
    return [
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company'
        }
      },
      {
        $unwind: '$company'
      },
      {
        $group: {
          _id: '$company.industryClassification.sectorType',
          totalEmissions: {
            $sum: '$calculationResults.ghgEmissionsSummary.totalGHGEmissions'
          },
          averageEmissions: {
            $avg: '$calculationResults.ghgEmissionsSummary.totalGHGEmissions'
          },
          companyCount: { $sum: 1 },
          scope1Total: {
            $sum: '$calculationResults.ghgEmissionsSummary.totalScope1'
          },
          scope2Total: {
            $sum: '$calculationResults.ghgEmissionsSummary.totalScope2'
          }
        }
      },
      {
        $sort: { totalEmissions: -1 }
      }
    ];
  }
  
  // Emissions trends over time
  static getEmissionsTrends(companyId, years = 5) {
    const cutoffYear = new Date().getFullYear() - years;
    
    return [
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId),
          'reportMetadata.reportingPeriod.fiscalYear': { $gte: cutoffYear }
        }
      },
      {
        $group: {
          _id: '$reportMetadata.reportingPeriod.fiscalYear',
          totalEmissions: {
            $first: '$calculationResults.ghgEmissionsSummary.totalGHGEmissions'
          },
          scope1: {
            $first: '$calculationResults.ghgEmissionsSummary.totalScope1'
          },
          scope2: {
            $first: '$calculationResults.ghgEmissionsSummary.totalScope2'
          },
          scope3: {
            $first: '$calculationResults.ghgEmissionsSummary.totalScope3'
          }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              year: '$_id',
              totalEmissions: '$totalEmissions',
              scope1: '$scope1',
              scope2: '$scope2',
              scope3: '$scope3'
            }
          }
        }
      }
    ];
  }
  
  // Benchmarking against industry peers
  static getIndustryBenchmark(sectorType, companySize = 'medium') {
    const sizeFilters = {
      small: { $lt: 50 },
      medium: { $and: [{ $gte: 50 }, { $lt: 250 }] },
      large: { $gte: 250 }
    };
    
    return [
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company'
        }
      },
      {
        $unwind: '$company'
      },
      {
        $match: {
          'company.industryClassification.sectorType': sectorType,
          'company.totalEmployees': sizeFilters[companySize]
        }
      },
      {
        $group: {
          _id: null,
          avgEmissions: {
            $avg: '$calculationResults.ghgEmissionsSummary.totalGHGEmissions'
          },
          medianEmissions: {
            $median: '$calculationResults.ghgEmissionsSummary.totalGHGEmissions'
          },
          percentiles: {
            $percentile: {
              input: '$calculationResults.ghgEmissionsSummary.totalGHGEmissions',
              p: [0.25, 0.5, 0.75, 0.9]
            }
          },
          sampleSize: { $sum: 1 }
        }
      }
    ];
  }
}
```

---

### Task DB-D2: Real-time Dashboard Data Pipeline
**Priority**: High | **Estimate**: 14 hours | **Dependencies**: Analytics Pipelines

#### Description
Create real-time data aggregation for dashboard KPIs and live monitoring.

#### Acceptance Criteria
- [ ] Real-time calculation updates
- [ ] Dashboard KPI aggregation
- [ ] Live status monitoring
- [ ] Automated refresh pipelines
- [ ] Performance optimization for real-time queries
- [ ] WebSocket integration for live updates

---

### Task DB-D3: Compliance & Audit Trail Analytics
**Priority**: Medium | **Estimate**: 12 hours | **Dependencies**: Audit Trail Schema

#### Description
Advanced analytics for compliance monitoring and audit trail analysis.

#### Acceptance Criteria
- [ ] Compliance status aggregations
- [ ] Audit trail analytics and reporting
- [ ] User activity analytics
- [ ] Data quality metrics
- [ ] Regulatory compliance scoring
- [ ] Automated compliance alerts

---

### Task DB-D4: Performance Metrics & Monitoring
**Priority**: Low | **Estimate**: 10 hours | **Dependencies**: All Analytics Complete

#### Description
Database performance monitoring and optimization metrics.

#### Acceptance Criteria
- [ ] Query performance monitoring
- [ ] Index effectiveness analysis
- [ ] Storage utilization tracking
- [ ] Connection pool monitoring
- [ ] Automated performance alerts
- [ ] Database health dashboards

---

## Database Migration & Deployment Plan

### Phase 1: Foundation Setup (Week 1)
- **DB Team Alpha**: Core schema extensions (Tasks DB-A1, DB-A2)
- **DB Team Beta**: Advanced indexing (Task DB-B1)
- **DB Team Gamma**: Emission factors database (Task DB-G1)
- **DB Team Delta**: Basic analytics pipelines (Task DB-D1)

### Phase 2: Advanced Features (Week 2)
- **DB Team Alpha**: Remaining schemas (Tasks DB-A3, DB-A4)
- **DB Team Beta**: Migration framework (Task DB-B2)
- **DB Team Gamma**: Reference data system (Task DB-G2)
- **DB Team Delta**: Real-time pipelines (Task DB-D2)

### Phase 3: Optimization & Analytics (Week 3)
- **DB Team Beta**: Performance optimization (Tasks DB-B3, DB-B4)
- **DB Team Gamma**: Data import/export (Tasks DB-G3, DB-G4)
- **DB Team Delta**: Compliance analytics (Tasks DB-D3, DB-D4)

## Quality Assurance & Testing

### Database Testing Strategy
- **Schema Validation**: All schemas tested with valid/invalid data
- **Performance Testing**: Load testing with 10K+ records per collection
- **Migration Testing**: All migrations tested on production-size datasets
- **Aggregation Testing**: Complex pipelines validated for accuracy
- **Index Optimization**: Query performance benchmarks established

### Data Quality Standards
- **Validation Rules**: Comprehensive validation for all fields
- **Reference Integrity**: Foreign key relationships maintained
- **Data Consistency**: Cross-collection consistency checks
- **Audit Compliance**: Complete audit trails for all changes
- **Backup Verification**: Regular backup integrity testing

### Monitoring & Alerting
- **Performance Monitoring**: Query response times <50ms average
- **Storage Monitoring**: Disk usage and growth rate tracking
- **Index Usage**: Monitor and optimize unused indexes
- **Error Tracking**: Database error logging and alerting
- **Capacity Planning**: Proactive scaling based on usage trends

---

*This comprehensive database task plan ensures robust, scalable, and performant data management for the ESG platform while enabling parallel development across specialized database teams.*