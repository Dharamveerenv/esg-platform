# VSME ESG Reporting Platform - Backend Implementation Plan

**Lead Backend Architect Documentation**  
**Platform**: VSME (Very Small, Medium Enterprise) ESG Reporting System  
**Database**: MongoDB Free Tier (512MB) with comprehensive emission factor database  
**Technology Stack**: Node.js, Express.js, TypeScript, MongoDB Atlas, Redis  
**Compliance**: VSME Template, SEAI, UK Gov, EPA, EEA emission factor standards

---

## 1. Database Architecture & Schema Design
→ MongoDB Atlas Free Tier implementation with optimized collections for ESG data
→ Comprehensive emission factor database with multi-source integration

### Database Configuration & Infrastructure
→ **MongoDB Atlas Free Tier Setup**
--- Connection pooling configuration (min: 5, max: 15 connections)
--- Database indexing strategy for ESG queries and calculations
--- Environment-specific configurations (development, staging, production)
--- Automated backup scheduling with point-in-time recovery
--- Cross-region replication for data resilience

→ **Performance Optimization Within 512MB Limits**
--- Compound indexes for complex ESG module queries
--- TTL (Time-To-Live) indexes for session cleanup and temporary data
--- Aggregation pipeline optimization for emission calculations
--- Query performance monitoring with MongoDB Atlas tools
--- Memory-efficient data structures and compression

### Core Collections Structure

→ **Users Collection** - Authentication and role management
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  passwordHash: String,
  profile: {
    firstName: String,
    lastName: String,
    position: String,
    phone: String,
    department: String
  },
  companyAssociations: [{
    companyId: ObjectId,
    role: String, // Admin, Manager, Editor, Viewer
    permissions: [String], // Module-specific permissions
    assignedBy: ObjectId,
    assignedDate: Date
  }],
  preferences: {
    language: String,
    timezone: String,
    currency: String,
    notifications: {
      email: Boolean,
      dashboard: Boolean,
      reports: Boolean
    }
  },
  security: {
    mfaEnabled: Boolean,
    lastPasswordChange: Date,
    failedLoginAttempts: Number,
    accountLocked: Boolean
  },
  createdAt: Date,
  lastLogin: Date,
  isActive: Boolean
}
```

→ **Companies Collection** - Organization master data with premises
```javascript
{
  _id: ObjectId,
  companyProfile: {
    legalName: String,
    tradingName: String,
    companyRegistrationNumber: String,
    taxIdentificationNumber: String,
    website: String,
    primaryEmail: String,
    primaryPhone: String,
    establishedDate: Date
  },
  headquarters: {
    street: String,
    city: String,
    county: String,
    eircode: String,
    country: String,
    coordinates: {
      type: "Point",
      coordinates: [Number] // [longitude, latitude]
    }
  },
  industryClassification: {
    primaryNACECode: String,
    secondaryNACECodes: [String],
    industryDescription: String,
    sectorType: String, // Agriculture, Manufacturing, Services, Energy
    subSectorDetails: String
  },
  operationalPremises: [{
    premiseId: ObjectId,
    name: String,
    type: String, // Headquarters, Production, Warehouse, Office, Retail
    address: {
      street: String,
      city: String,
      county: String,
      eircode: String,
      country: String,
      coordinates: {
        type: "Point",
        coordinates: [Number]
      }
    },
    operationalDetails: {
      floorArea: Number, // Square meters
      employeeCount: Number,
      operatingHours: String,
      operationalSince: Date,
      certifications: [String]
    },
    utilities: {
      electricitySupplier: String,
      gasSupplier: String,
      waterSupplier: String,
      wasteManagementProvider: String
    }
  }],
  corporateStructure: {
    ownershipType: String, // Private, Public, Partnership, Cooperative
    parentCompany: ObjectId,
    subsidiaries: [ObjectId],
    stakeholders: [{
      name: String,
      type: String, // Investor, Partner, Government
      ownershipPercentage: Number
    }]
  },
  contactPersons: [{
    role: String, // ESG Manager, CEO, CFO, Sustainability Officer
    name: String,
    email: String,
    phone: String,
    department: String
  }],
  complianceStatus: {
    vsmeReportingRequired: Boolean,
    euTaxonomyApplicable: Boolean,
    csrdApplicable: Boolean,
    otherRegulations: [String]
  },
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean
}
```

→ **Reports Collection** - ESG reporting data with comprehensive module structure
```javascript
{
  _id: ObjectId,
  companyId: ObjectId (indexed),
  reportMetadata: {
    reportingPeriod: {
      startDate: Date,
      endDate: Date,
      fiscalYear: Number,
      reportingFrequency: String // Annual, Biannual, Quarterly
    },
    reportType: String, // VSME, Full ESG, Sector-Specific
    reportingStandards: [String], // VSME, GRI, SASB, TCFD
    preparationBasis: String,
    consolidationMethod: String
  },
  moduleConfiguration: {
    selectedBasicModules: [String], // B0, B1, B2, B3, etc.
    selectedComprehensiveModules: [String], // C1, C2, C3, etc.
    mandatoryModules: [String],
    optionalModules: [String]
  },
  reportStatus: {
    currentStatus: String, // Draft, InProgress, Review, Complete, Published
    completionPercentage: Number,
    lastModified: Date,
    lastModifiedBy: ObjectId,
    approvals: [{
      approverRole: String,
      approvedBy: ObjectId,
      approvedDate: Date,
      comments: String
    }]
  },
  
  // Basic Modules Data Structure
  basicModules: {
    b0_generalInformation: {
      companyOverview: Object,
      reportingScope: Object,
      materiality: Object,
      completionStatus: String
    },
    b1_basisForPreparation: {
      reportingFramework: Object,
      consolidationApproach: Object,
      reportingBoundary: Object,
      completionStatus: String
    },
    b2_sustainabilityPractices: {
      environmentalPractices: Object,
      socialPractices: Object,
      governancePractices: Object,
      completionStatus: String
    },
    b3_energyGHGEmissions: {
      scope1Emissions: {
        stationaryCombustion: [{
          fuelType: String,
          quantity: Number,
          unit: String,
          emissionFactor: Number,
          calculatedEmissions: Number,
          calculationDate: Date
        }],
        mobileCombustion: [{
          vehicleType: String,
          fuelType: String,
          quantity: Number,
          unit: String,
          emissionFactor: Number,
          calculatedEmissions: Number
        }],
        fugitiveEmissions: [{
          refrigerant: String,
          quantityLeaked: Number,
          gwpValue: Number,
          calculatedEmissions: Number
        }],
        totalScope1: Number
      },
      scope2Emissions: {
        locationBased: {
          electricityConsumption: Number,
          unit: String,
          gridEmissionFactor: Number,
          country: String,
          calculatedEmissions: Number
        },
        marketBased: {
          electricityConsumption: Number,
          renewableEnergyConsumption: Number,
          residualGridFactor: Number,
          calculatedEmissions: Number
        },
        totalScope2: Number
      },
      scope3Emissions: {
        categories: [{
          categoryNumber: Number,
          categoryName: String,
          applicability: Boolean,
          activityData: Object,
          emissionFactor: Number,
          calculatedEmissions: Number
        }],
        totalScope3: Number
      },
      energyConsumption: {
        totalEnergyConsumption: Number,
        renewableEnergyPercentage: Number,
        energyIntensity: Number
      },
      completionStatus: String
    },
    // Additional modules B4-B11 with similar structure
    b4_pollution: Object,
    b5_biodiversity: Object,
    b6_waterConsumption: Object,
    b7_wasteManagement: Object,
    b8_workforceGeneral: Object,
    b9_healthSafety: Object,
    b10_remuneration: Object,
    b11_corruptionBribery: Object
  },
  
  // Comprehensive Modules Data Structure
  comprehensiveModules: {
    c1_businessModelStrategy: Object,
    c2_governanceRisk: Object,
    c3_environmentalManagement: Object,
    c4_climateAction: Object,
    c5_resourceManagement: Object,
    c6_workforceDevelopment: Object,
    c7_communityRelations: Object,
    c8_businessEthics: Object,
    c9_performanceMetrics: Object
  },
  
  // Calculated Results and Analytics
  calculationResults: {
    ghgEmissionsSummary: {
      totalScope1: Number,
      totalScope2: Number,
      totalScope3: Number,
      totalGHGEmissions: Number,
      emissionIntensity: Number,
      calculationTimestamp: Date
    },
    energyMetrics: {
      totalEnergyConsumption: Number,
      renewableEnergyPercentage: Number,
      energyEfficiencyRating: String
    },
    workforceMetrics: {
      employeeTurnoverRate: Number,
      genderPayGap: Number,
      accidentRate: Number,
      trainingHoursPerEmployee: Number
    },
    environmentalMetrics: {
      wasteRecyclingRate: Number,
      waterIntensity: Number,
      biodiversityScore: Number
    }
  },
  
  // Audit Trail and Version Control
  auditTrail: [{
    userId: ObjectId,
    action: String, // CREATE, UPDATE, DELETE, CALCULATE, SUBMIT, APPROVE
    moduleAffected: String,
    timestamp: Date,
    changes: Object, // Before/after values
    ipAddress: String,
    userAgent: String
  }],
  
  version: Number,
  previousVersions: [{
    versionNumber: Number,
    archivedData: Object,
    archivedDate: Date,
    reason: String
  }],
  
  createdAt: Date,
  updatedAt: Date
}
```

### Reference Data Collections

→ **EmissionFactors Collection** - Comprehensive multi-source emission factor database
```javascript
{
  _id: ObjectId,
  factorMetadata: {
    category: String, // Scope1, Scope2, Scope3
    subCategory: String, // Mobile, Stationary, Fugitive, Grid
    source: String, // SEAI, UKGov, EPA, EEA, IPCC
    version: String,
    publishedDate: Date,
    validFrom: Date,
    validTo: Date,
    lastUpdated: Date
  },
  geographicScope: {
    country: String,
    region: String,
    applicableRegions: [String]
  },
  fuelSpecifications: {
    fuelType: String, // Natural Gas, Diesel, Petrol, Coal, etc.
    fuelGrade: String,
    description: String,
    alternativeNames: [String]
  },
  emissionFactorData: {
    co2Factor: Number, // kg CO2/unit
    ch4Factor: Number, // kg CH4/unit
    n2oPactor: Number, // kg N2O/unit
    totalCo2eFactor: Number, // kg CO2e/unit
    unit: String, // litre, kg, kWh, m3
    uncertainty: Number, // Percentage uncertainty
    confidenceLevel: String // High, Medium, Low
  },
  calculationParameters: {
    netCalorificValue: Number,
    density: Number,
    carbonContent: Number,
    oxidationFactor: Number
  },
  qualityIndicators: {
    dataQuality: String, // High, Medium, Low
    geographicRepresentativeness: String,
    temporalRepresentativeness: String,
    technologyRepresentativeness: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

→ **RefrigerantGWP Collection** - Global Warming Potential values for refrigerants
```javascript
{
  _id: ObjectId,
  refrigerantCode: String, // R-404A, R-134a, R-407C, etc.
  chemicalName: String,
  chemicalFormula: String,
  gwpValues: {
    ar4_100year: Number, // IPCC AR4 100-year GWP
    ar5_100year: Number, // IPCC AR5 100-year GWP
    ar6_100year: Number  // IPCC AR6 100-year GWP
  },
  regulatoryStatus: {
    euFGasRegulation: String,
    montrealProtocol: String,
    phaseoOutSchedule: Object
  },
  alternativeRefrigerants: [String],
  commonApplications: [String],
  isActive: Boolean,
  lastUpdated: Date
}
```

→ **NACECodes Collection** - Industry classification with ESG relevance
→ **Countries Collection** - Geographic reference with emission factors
→ **SustainabilityStandards Collection** - Reporting frameworks and certifications

---

## 2. API Architecture & Comprehensive Route Structure
→ RESTful API design with role-based access control
→ Comprehensive endpoint mapping for all ESG modules and calculations

### Authentication & Authorization Routes

→ **User Authentication Management**
--- `POST /api/auth/register` - User registration with company invitation
--- `POST /api/auth/login` - Multi-factor authentication with JWT tokens
--- `POST /api/auth/logout` - Session termination and token blacklisting
--- `POST /api/auth/refresh` - JWT token refresh mechanism
--- `GET /api/auth/profile` - Current user profile with company associations
--- `PUT /api/auth/profile` - Update user profile and preferences
--- `POST /api/auth/forgot-password` - Password reset with email verification
--- `POST /api/auth/reset-password` - Secure password reset with token validation
--- `POST /api/auth/change-password` - Authenticated password change
--- `GET /api/auth/sessions` - Active session management
--- `DELETE /api/auth/sessions/:sessionId` - Terminate specific session

→ **Role and Permission Management**
--- `GET /api/auth/roles/:companyId` - User roles for specific company
--- `PUT /api/auth/roles/:companyId/:userId` - Update user role assignments
--- `POST /api/auth/invite` - Invite new users with role specification
--- `GET /api/auth/invitations` - Manage pending invitations
--- `PUT /api/auth/invitations/:id/accept` - Accept company invitation
--- `DELETE /api/auth/invitations/:id` - Revoke or decline invitation

### Company Management Routes

→ **Company CRUD Operations**
--- `GET /api/companies` - List companies with role-based filtering
--- `POST /api/companies` - Create new company with validation
--- `GET /api/companies/:id` - Retrieve company details with premises
--- `PUT /api/companies/:id` - Update company information
--- `DELETE /api/companies/:id` - Archive company (soft delete)
--- `GET /api/companies/:id/users` - List company users and roles
--- `PUT /api/companies/:id/users/:userId/role` - Update user role

→ **Premises Management**
--- `GET /api/companies/:id/premises` - List all operational premises
--- `POST /api/companies/:id/premises` - Add new operational premises
--- `GET /api/companies/:id/premises/:premiseId` - Get premise details
--- `PUT /api/companies/:id/premises/:premiseId` - Update premise information
--- `DELETE /api/companies/:id/premises/:premiseId` - Remove premise
--- `GET /api/companies/:id/premises/:premiseId/emissions` - Premise-specific emissions data

### ESG Data Collection Routes - Basic Modules (B0-B11)

→ **B0: General Information Module**
--- `GET /api/reports/:reportId/b0` - Retrieve general company information
--- `PUT /api/reports/:reportId/b0/overview` - Update company overview
--- `PUT /api/reports/:reportId/b0/scope` - Update reporting scope
--- `PUT /api/reports/:reportId/b0/materiality` - Update materiality assessment
--- `POST /api/reports/:reportId/b0/stakeholders` - Add stakeholder information
--- `GET /api/reports/:reportId/b0/completion` - Check module completion status

→ **B1: Basis for Preparation Module**
--- `GET /api/reports/:reportId/b1` - Get preparation basis data
--- `PUT /api/reports/:reportId/b1/framework` - Update reporting framework
--- `PUT /api/reports/:reportId/b1/boundary` - Update reporting boundary
--- `POST /api/reports/:reportId/b1/subsidiaries` - Add subsidiary information
--- `PUT /api/reports/:reportId/b1/subsidiaries/:subId` - Update subsidiary data
--- `DELETE /api/reports/:reportId/b1/subsidiaries/:subId` - Remove subsidiary

→ **B2: Sustainability Practices Module**
--- `GET /api/reports/:reportId/b2` - Get sustainability practices matrix
--- `PUT /api/reports/:reportId/b2/environmental` - Update environmental practices
--- `PUT /api/reports/:reportId/b2/social` - Update social practices
--- `PUT /api/reports/:reportId/b2/governance` - Update governance practices
--- `POST /api/reports/:reportId/b2/policies` - Add sustainability policies
--- `GET /api/reports/:reportId/b2/assessment` - Get practice maturity assessment

→ **B3: Energy and GHG Emissions Module**
--- `GET /api/reports/:reportId/b3` - Get comprehensive emissions data
--- `GET /api/reports/:reportId/b3/scope1` - Get Scope 1 emissions breakdown
--- `PUT /api/reports/:reportId/b3/scope1/stationary` - Update stationary combustion
--- `PUT /api/reports/:reportId/b3/scope1/mobile` - Update mobile combustion
--- `PUT /api/reports/:reportId/b3/scope1/fugitive` - Update fugitive emissions
--- `GET /api/reports/:reportId/b3/scope2` - Get Scope 2 emissions data
--- `PUT /api/reports/:reportId/b3/scope2/location` - Update location-based emissions
--- `PUT /api/reports/:reportId/b3/scope2/market` - Update market-based emissions
--- `GET /api/reports/:reportId/b3/scope3` - Get Scope 3 emissions data
--- `PUT /api/reports/:reportId/b3/scope3/:category` - Update specific Scope 3 category
--- `POST /api/reports/:reportId/b3/calculate` - Trigger comprehensive emissions calculation
--- `GET /api/reports/:reportId/b3/factors` - Get applicable emission factors
--- `POST /api/reports/:reportId/b3/validate` - Validate emissions data completeness

→ **B4: Pollution Module**
--- `GET /api/reports/:reportId/b4` - Get pollution data
--- `PUT /api/reports/:reportId/b4/air` - Update air pollution data
--- `PUT /api/reports/:reportId/b4/water` - Update water pollution data
--- `PUT /api/reports/:reportId/b4/soil` - Update soil pollution data
--- `POST /api/reports/:reportId/b4/incidents` - Log pollution incidents

→ **B5: Biodiversity Module**
--- `GET /api/reports/:reportId/b5` - Get biodiversity impact data
--- `PUT /api/reports/:reportId/b5/habitats` - Update habitat impact assessment
--- `PUT /api/reports/:reportId/b5/species` - Update species impact data
--- `POST /api/reports/:reportId/b5/conservation` - Add conservation initiatives

→ **B6: Water Consumption Module**
--- `GET /api/reports/:reportId/b6` - Get water consumption data
--- `PUT /api/reports/:reportId/b6/intake` - Update water intake data
--- `PUT /api/reports/:reportId/b6/discharge` - Update water discharge data
--- `POST /api/reports/:reportId/b6/efficiency` - Add water efficiency measures

→ **B7: Waste Management Module**
--- `GET /api/reports/:reportId/b7` - Get waste management data
--- `PUT /api/reports/:reportId/b7/generation` - Update waste generation data
--- `PUT /api/reports/:reportId/b7/treatment` - Update waste treatment methods
--- `POST /api/reports/:reportId/b7/reduction` - Add waste reduction initiatives

→ **B8: Workforce General Module**
--- `GET /api/reports/:reportId/b8` - Get workforce demographics
--- `PUT /api/reports/:reportId/b8/demographics` - Update employee demographics
--- `PUT /api/reports/:reportId/b8/turnover` - Update turnover data
--- `POST /api/reports/:reportId/b8/calculate-metrics` - Calculate workforce KPIs

→ **B9: Health & Safety Module**
--- `GET /api/reports/:reportId/b9` - Get health and safety data
--- `PUT /api/reports/:reportId/b9/accidents` - Update accident records
--- `PUT /api/reports/:reportId/b9/incidents` - Update incident data
--- `POST /api/reports/:reportId/b9/training` - Add safety training records

→ **B10: Remuneration Module**
--- `GET /api/reports/:reportId/b10` - Get remuneration data
--- `PUT /api/reports/:reportId/b10/paygap` - Update gender pay gap data
--- `PUT /api/reports/:reportId/b10/benefits` - Update employee benefits
--- `POST /api/reports/:reportId/b10/calculate-paygap` - Calculate pay gap metrics

→ **B11: Corruption & Bribery Module**
--- `GET /api/reports/:reportId/b11` - Get anti-corruption data
--- `PUT /api/reports/:reportId/b11/policies` - Update anti-corruption policies
--- `PUT /api/reports/:reportId/b11/training` - Update compliance training data
--- `POST /api/reports/:reportId/b11/incidents` - Report compliance incidents

### ESG Data Collection Routes - Comprehensive Modules (C1-C9)

→ **C1: Business Model & Strategy Module**
--- `GET /api/reports/:reportId/c1` - Get business model data
--- `PUT /api/reports/:reportId/c1/model` - Update business model description
--- `PUT /api/reports/:reportId/c1/strategy` - Update sustainability strategy
--- `POST /api/reports/:reportId/c1/objectives` - Add strategic objectives

→ **C2: Governance & Risk Module**
--- `GET /api/reports/:reportId/c2` - Get governance structure
--- `PUT /api/reports/:reportId/c2/board` - Update board composition
--- `PUT /api/reports/:reportId/c2/risk` - Update risk management
--- `POST /api/reports/:reportId/c2/committees` - Add governance committees

→ **C3-C9: Additional Comprehensive Modules**
--- Similar pattern for modules C3 through C9
--- Each with GET, PUT, POST operations for different aspects
--- Comprehensive data management for advanced reporting

### Report Management Routes

→ **Report Lifecycle Management**
--- `GET /api/reports` - List reports with filtering and pagination
--- `POST /api/reports` - Create new ESG report with template
--- `GET /api/reports/:id` - Retrieve complete report with calculations
--- `PUT /api/reports/:id/metadata` - Update report metadata
--- `PUT /api/reports/:id/status` - Update report status
--- `POST /api/reports/:id/submit` - Submit report for review
--- `POST /api/reports/:id/approve` - Approve completed report
--- `POST /api/reports/:id/publish` - Publish finalized report
--- `POST /api/reports/:id/clone` - Clone report for new period
--- `DELETE /api/reports/:id` - Archive report (soft delete)

→ **Report Export and Analytics**
--- `GET /api/reports/:id/export` - Export report in multiple formats
--- `GET /api/reports/:id/summary` - Get executive summary
--- `GET /api/reports/:id/analytics` - Get performance analytics
--- `GET /api/reports/:id/comparison` - Compare with previous periods
--- `GET /api/reports/:id/benchmarks` - Get industry benchmarks

---

## 3. Advanced Calculation Engine Implementation
→ Comprehensive calculation system with multi-source emission factor integration
→ Real-time calculation capabilities with audit trails

### GHG Emissions Calculation Services

→ **Scope 1 Emissions Calculator**
```javascript
class Scope1Calculator {
  async calculateStationaryCombustion(fuelData, country = 'Ireland') {
    const results = [];
    
    for (const fuel of fuelData) {
      const emissionFactor = await this.getEmissionFactor(
        'Scope1', 
        fuel.fuelType, 
        country,
        'Stationary'
      );
      
      if (!emissionFactor) {
        throw new Error(`Emission factor not found for ${fuel.fuelType}`);
      }
      
      const calculation = {
        fuelType: fuel.fuelType,
        consumption: fuel.quantity,
        unit: fuel.unit,
        emissionFactor: emissionFactor.totalCo2eFactor,
        co2Emissions: fuel.quantity * emissionFactor.co2Factor,
        ch4Emissions: fuel.quantity * emissionFactor.ch4Factor,
        n2oEmissions: fuel.quantity * emissionFactor.n2oFactor,
        totalCo2eEmissions: fuel.quantity * emissionFactor.totalCo2eFactor,
        calculationDate: new Date(),
        factorSource: emissionFactor.source,
        uncertainty: emissionFactor.uncertainty
      };
      
      results.push(calculation);
    }
    
    return {
      calculations: results,
      totalCo2e: results.reduce((sum, calc) => sum + calc.totalCo2eEmissions, 0),
      methodology: 'IPCC Tier 1 approach with country-specific factors'
    };
  }

  // Specific emission factor examples from reference sources
  getStandardFactors() {
    return {
      // SEAI Ireland factors
      'Natural Gas': { factor: 2.02, unit: 'kg CO2e/m3', source: 'SEAI 2024' },
      'Diesel': { factor: 2.67, unit: 'kg CO2e/litre', source: 'SEAI 2024' },
      'Petrol': { factor: 2.31, unit: 'kg CO2e/litre', source: 'SEAI 2024' },
      'Fuel Oil': { factor: 2.67, unit: 'kg CO2e/litre', source: 'SEAI 2024' },
      'Coal': { factor: 2.63, unit: 'kg CO2e/kg', source: 'SEAI 2024' },
      
      // UK Gov factors for broader coverage
      'LPG': { factor: 1.55, unit: 'kg CO2e/litre', source: 'UK Gov 2024' },
      'Aviation Gasoline': { factor: 2.28, unit: 'kg CO2e/litre', source: 'UK Gov 2024' }
    };
  }
}
```

→ **Mobile Combustion Calculator with Vehicle Classes**
```javascript
class MobileCombustionCalculator {
  async calculateVehicleEmissions(vehicleData) {
    const results = [];
    
    for (const vehicle of vehicleData) {
      let emissionFactor;
      
      if (vehicle.calculationMethod === 'fuel-based') {
        emissionFactor = await this.getFuelEmissionFactor(vehicle.fuelType);
        const emissions = vehicle.fuelConsumption * emissionFactor.factor;
        
        results.push({
          vehicleType: vehicle.type,
          method: 'Fuel-based',
          fuelConsumption: vehicle.fuelConsumption,
          fuelType: vehicle.fuelType,
          emissions: emissions,
          unit: 'kg CO2e'
        });
        
      } else if (vehicle.calculationMethod === 'distance-based') {
        emissionFactor = await this.getVehicleEmissionFactor(
          vehicle.type, 
          vehicle.weightClass
        );
        const emissions = vehicle.distanceTraveled * emissionFactor.factor;
        
        results.push({
          vehicleType: vehicle.type,
          method: 'Distance-based',
          distance: vehicle.distanceTraveled,
          emissionFactor: emissionFactor.factor,
          emissions: emissions,
          unit: 'kg CO2e'
        });
      }
    }
    
    return {
      vehicleCalculations: results,
      totalMobileEmissions: results.reduce((sum, calc) => sum + calc.emissions, 0)
    };
  }
  
  // Vehicle-specific emission factors by class
  getVehicleFactors() {
    return {
      'Light Commercial Vehicle': { factor: 0.253, unit: 'kg CO2e/km' },
      'HGV (3.5-7.5t)': { factor: 0.451, unit: 'kg CO2e/km' },
      'HGV (7.5-17t)': { factor: 0.736, unit: 'kg CO2e/km' },
      'HGV (17-32t)': { factor: 1.015, unit: 'kg CO2e/km' },
      'HGV (>32t)': { factor: 1.194, unit: 'kg CO2e/km' },
      'Refrigerated HGV': { factor: 1.344, unit: 'kg CO2e/km' }
    };
  }
}
```

→ **Fugitive Emissions Calculator with Comprehensive Refrigerant Database**
```javascript
class FugitiveEmissionsCalculator {
  async calculateRefrigerantEmissions(refrigerantData) {
    const results = [];
    
    for (const refrigerant of refrigerantData) {
      const gwpValue = await this.getRefrigerantGWP(
        refrigerant.type,
        'AR5' // Use IPCC AR5 values by default
      );
      
      const emissions = refrigerant.quantityLeaked * gwpValue.ar5_100year;
      
      results.push({
        refrigerantType: refrigerant.type,
        quantityLeaked: refrigerant.quantityLeaked,
        unit: 'kg',
        gwpValue: gwpValue.ar5_100year,
        co2eEmissions: emissions,
        equipmentType: refrigerant.equipmentType,
        leakageRate: refrigerant.leakageRate
      });
    }
    
    return {
      refrigerantCalculations: results,
      totalFugitiveEmissions: results.reduce((sum, calc) => sum + calc.co2eEmissions, 0)
    };
  }
  
  // Standard refrigerant GWP values
  getRefrigerantGWP() {
    return {
      'R-404A': { ar5_100year: 3943, ar6_100year: 4009 },
      'R-134a': { ar5_100year: 1300, ar6_100year: 1360 },
      'R-407C': { ar5_100year: 1624, ar6_100year: 1690 },
      'R-410A': { ar5_100year: 1924, ar6_100year: 2017 },
      'R-22': { ar5_100year: 1760, ar6_100year: 1840 },
      'R-32': { ar5_100year: 677, ar6_100year: 704 },
      'CO2': { ar5_100year: 1, ar6_100year: 1 },
      'Ammonia': { ar5_100year: 0, ar6_100year: 0 }
    };
  }
}
```

→ **Scope 2 Emissions Calculator with Grid Factors**
```javascript
class Scope2Calculator {
  async calculateLocationBased(electricityData) {
    const results = [];
    
    for (const consumption of electricityData) {
      const gridFactor = await this.getGridEmissionFactor(
        consumption.country,
        consumption.year || new Date().getFullYear()
      );
      
      const emissions = consumption.quantity * gridFactor.factor;
      
      results.push({
        country: consumption.country,
        consumption: consumption.quantity,
        unit: consumption.unit,
        gridFactor: gridFactor.factor,
        emissions: emissions,
        factorSource: gridFactor.source
      });
    }
    
    return {
      locationBasedCalculations: results,
      totalScope2LocationBased: results.reduce((sum, calc) => sum + calc.emissions, 0)
    };
  }
  
  // Grid emission factors by country (kg CO2e/kWh)
  getGridFactors() {
    return {
      'Ireland': { factor: 0.2263, source: 'SEAI 2024', year: 2024 },
      'United Kingdom': { factor: 0.177, source: 'UK Gov 2024', year: 2024 },
      'Germany': { factor: 0.378, source: 'EEA 2024', year: 2024 },
      'France': { factor: 0.052, source: 'EEA 2024', year: 2024 },
      'Netherlands': { factor: 0.282, source: 'EEA 2024', year: 2024 },
      'EU Average': { factor: 0.207, source: 'EEA 2024', year: 2024 }
    };
  }
}
```

→ **Scope 3 Emissions Calculator for Agri-Food Sector**
```javascript
class Scope3Calculator {
  async calculateAgriFootprint(supplierData) {
    const results = [];
    
    // Category 1: Purchased goods and services (Milk procurement)
    if (supplierData.milkProcurement) {
      for (const supplier of supplierData.milkProcurement) {
        const emissionFactor = await this.getMilkEmissionFactor(
          supplier.origin,
          supplier.farmingSystem
        );
        
        const emissions = supplier.quantity * emissionFactor.factor;
        
        results.push({
          category: 'Category 1 - Milk Procurement',
          supplier: supplier.name,
          quantity: supplier.quantity,
          unit: 'litres',
          origin: supplier.origin,
          emissionFactor: emissionFactor.factor,
          emissions: emissions,
          dataQuality: supplier.sblasData ? 'High' : 'Medium'
        });
      }
    }
    
    // Category 4: Upstream transportation and distribution
    if (supplierData.transportation) {
      for (const transport of supplierData.transportation) {
        const emissionFactor = await this.getTransportEmissionFactor(
          transport.mode,
          transport.vehicleType
        );
        
        const emissions = transport.tonneKm * emissionFactor.factor;
        
        results.push({
          category: 'Category 4 - Transportation',
          mode: transport.mode,
          distance: transport.distance,
          weight: transport.weight,
          tonneKm: transport.tonneKm,
          emissionFactor: emissionFactor.factor,
          emissions: emissions
        });
      }
    }
    
    return {
      scope3Calculations: results,
      totalScope3: results.reduce((sum, calc) => sum + calc.emissions, 0),
      categoriesCalculated: [...new Set(results.map(r => r.category))]
    };
  }
  
  // Agri-food specific emission factors
  getMilkEmissionFactors() {
    return {
      'Ireland_Grass': { factor: 1.19, unit: 'kg CO2e/litre', source: 'Bord Bia SBLAS' },
      'Ireland_Mixed': { factor: 1.34, unit: 'kg CO2e/litre', source: 'Bord Bia SBLAS' },
      'EU_Average': { factor: 1.33, unit: 'kg CO2e/litre', source: 'FAO 2019' },
      'New_Zealand': { factor: 0.89, unit: 'kg CO2e/litre', source: 'AgResearch 2020' }
    };
  }
}
```

### Advanced Workforce Metrics Calculator

→ **Comprehensive Workforce Analytics**
```javascript
class WorkforceMetricsCalculator {
  calculateTurnoverRate(workforceData) {
    const {
      employeesAtStart,
      employeesAtEnd,
      newHires,
      departures,
      reportingPeriod
    } = workforceData;
    
    const averageEmployees = (employeesAtStart + employeesAtEnd) / 2;
    const turnoverRate = (departures / averageEmployees) * 100;
    
    return {
      averageEmployees,
      departures,
      turnoverRate: Math.round(turnoverRate * 100) / 100,
      benchmark: this.getTurnoverBenchmarks(workforceData.industry),
      calculationMethod: 'Annual turnover rate = (Departures / Average employees) × 100'
    };
  }
  
  calculateAccidentRate(safetyData) {
    const {
      totalAccidents,
      totalHoursWorked,
      fatalities,
      lostTimeInjuries
    } = safetyData;
    
    // Accident rate per 200,000 hours (100 full-time workers annually)
    const accidentRate = (totalAccidents / totalHoursWorked) * 200000;
    const fatalityRate = (fatalities / totalHoursWorked) * 200000;
    
    return {
      totalAccidents,
      totalHoursWorked,
      accidentRate: Math.round(accidentRate * 100) / 100,
      fatalityRate: Math.round(fatalityRate * 100) / 100,
      lostTimeInjuryRate: (lostTimeInjuries / totalHoursWorked) * 200000,
      calculationMethod: 'Accident rate = (Total accidents / Total hours worked) × 200,000'
    };
  }
  
  calculateGenderPayGap(compensationData) {
    const maleMedianPay = this.calculateMedian(
      compensationData.filter(emp => emp.gender === 'Male').map(emp => emp.annualSalary)
    );
    const femaleMedianPay = this.calculateMedian(
      compensationData.filter(emp => emp.gender === 'Female').map(emp => emp.annualSalary)
    );
    
    const payGap = ((maleMedianPay - femaleMedianPay) / maleMedianPay) * 100;
    
    return {
      maleMedianPay,
      femaleMedianPay,
      genderPayGap: Math.round(payGap * 100) / 100,
      sampleSize: compensationData.length,
      calculationMethod: 'Pay gap = ((Male median - Female median) / Male median) × 100'
    };
  }
}
```

### Real-Time Calculation Engine

→ **Calculation Orchestration Service**
```javascript
class CalculationOrchestrator {
  async performComprehensiveCalculation(reportId) {
    const report = await Report.findById(reportId);
    const calculationResults = {};
    
    // Execute calculations in parallel where possible
    const calculationPromises = [];
    
    // GHG Emissions calculations
    if (report.basicModules.b3_energyGHGEmissions) {
      calculationPromises.push(
        this.calculateAllGHGEmissions(report.basicModules.b3_energyGHGEmissions)
          .then(result => calculationResults.ghgEmissions = result)
      );
    }
    
    // Workforce metrics calculations
    if (report.basicModules.b8_workforceGeneral) {
      calculationPromises.push(
        this.calculateWorkforceMetrics(report.basicModules.b8_workforceGeneral)
          .then(result => calculationResults.workforceMetrics = result)
      );
    }
    
    // Wait for all calculations to complete
    await Promise.all(calculationPromises);
    
    // Update report with calculation results
    await Report.findByIdAndUpdate(reportId, {
      'calculationResults': calculationResults,
      'calculationResults.lastCalculated': new Date(),
      'calculationResults.calculationVersion': '2.1.0'
    });
    
    // Log calculation completion
    await this.auditLogger.logCalculation(reportId, calculationResults);
    
    return calculationResults;
  }
}
```

---

## 4. Advanced Data Validation & Processing Layer
→ Comprehensive validation framework with business rule enforcement
→ Multi-level validation including cross-module consistency

### Advanced Input Validation Services

→ **Schema-Based Validation with ESG-Specific Rules**
```javascript
const ESGValidationSchemas = {
  b3_scope1_stationary: {
    fuelType: {
      type: 'string',
      required: true,
      enum: ['Natural Gas', 'Diesel', 'Fuel Oil', 'Coal', 'LPG', 'Biomass'],
      errorMessage: 'Fuel type must be selected from approved list'
    },
    quantity: {
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      errorMessage: 'Quantity must be positive and reasonable'
    },
    unit: {
      type: 'string',
      required: true,
      enum: ['litres', 'kg', 'kWh', 'm3', 'tonnes'],
      dependsOn: 'fuelType',
      validCombinations: {
        'Natural Gas': ['m3', 'kWh'],
        'Diesel': ['litres'],
        'Fuel Oil': ['litres'],
        'Coal': ['kg', 'tonnes']
      }
    }
  },
  
  b8_workforce: {
    totalEmployees: {
      type: 'number',
      required: true,
      min: 1,
      max: 10000
    },
    employeeBreakdown: {
      type: 'object',
      required: true,
      properties: {
        permanent: { type: 'number', min: 0 },
        temporary: { type: 'number', min: 0 },
        contractors: { type: 'number', min: 0 }
      },
      customValidation: (data) => {
        const sum = data.permanent + data.temporary + data.contractors;
        return sum === data.totalEmployees || 
               `Breakdown sum (${sum}) must equal total employees (${data.totalEmployees})`;
      }
    }
  }
};
```

→ **Business Logic Validation Engine**
```javascript
class BusinessLogicValidator {
  validateModuleCompletion(reportId, moduleId) {
    const validationRules = {
      b0: ['companyOverview.required', 'reportingScope.required'],
      b1: ['reportingFramework.required', 'consolidationMethod.required'],
      b3: ['scope1.required', 'scope2.required'],
      b8: ['employeeCount.required', 'demographics.required']
    };
    
    return this.checkRequiredFields(reportId, moduleId, validationRules[moduleId]);
  }
  
  validateCrossModuleConsistency(reportData) {
    const inconsistencies = [];
    
    // Check employee count consistency between B8 and other modules
    const b8Employees = reportData.basicModules?.b8_workforceGeneral?.totalEmployees;
    const b9Employees = reportData.basicModules?.b9_healthSafety?.totalEmployees;
    
    if (b8Employees && b9Employees && b8Employees !== b9Employees) {
      inconsistencies.push({
        type: 'cross-module',
        modules: ['B8', 'B9'],
        field: 'totalEmployees',
        message: 'Employee counts must be consistent across modules'
      });
    }
    
    // Validate energy consumption consistency
    const b3Energy = reportData.basicModules?.b3_energyGHGEmissions?.totalEnergyConsumption;
    const calculatedEnergy = this.calculateTotalEnergyFromFuels(reportData.basicModules?.b3_energyGHGEmissions);
    
    if (b3Energy && Math.abs(b3Energy - calculatedEnergy) > (b3Energy * 0.05)) {
      inconsistencies.push({
        type: 'calculation',
        module: 'B3',
        message: 'Total energy consumption should match sum of individual fuel consumptions'
      });
    }
    
    return inconsistencies;
  }
}
```

### Advanced Data Transformation Services

→ **Unit Conversion Service with ESG-Specific Conversions**
```javascript
class ESGUnitConverter {
  energyConversions = {
    // Energy conversions to kWh
    'MWh': 1000,
    'GJ': 277.778,
    'MJ': 0.278,
    'kWh': 1,
    'Therms': 29.3071,
    'BTU': 0.000293
  };
  
  fuelConversions = {
    // Fuel density conversions (litres to kg)
    'Diesel': 0.832,
    'Petrol': 0.737,
    'Fuel Oil': 0.89,
    'LPG': 0.52
  };
  
  convertEnergy(value, fromUnit, toUnit = 'kWh') {
    if (!this.energyConversions[fromUnit] || !this.energyConversions[toUnit]) {
      throw new Error(`Unsupported energy unit conversion: ${fromUnit} to ${toUnit}`);
    }
    
    const kWhValue = value * this.energyConversions[fromUnit];
    return kWhValue / this.energyConversions[toUnit];
  }
  
  convertFuelUnits(value, fuelType, fromUnit, toUnit) {
    const conversions = {
      'litres_to_kg': this.fuelConversions[fuelType],
      'kg_to_litres': 1 / this.fuelConversions[fuelType]
    };
    
    const conversionKey = `${fromUnit}_to_${toUnit}`;
    if (!conversions[conversionKey]) {
      throw new Error(`Cannot convert ${fuelType} from ${fromUnit} to ${toUnit}`);
    }
    
    return value * conversions[conversionKey];
  }
}
```

---

## 5. Advanced Report Generation & Multi-Format Export
→ Comprehensive report compilation with VSME template compliance
→ Multiple export formats with professional presentation

### Enhanced Report Compilation Service

→ **VSME-Compliant Report Generator**
```javascript
class VSMEReportGenerator {
  async generateCompleteReport(reportId, options = {}) {
    const report = await Report.findById(reportId)
      .populate('companyId')
      .populate('auditTrail.userId');
    
    const reportStructure = {
      executiveSummary: await this.generateExecutiveSummary(report),
      companyProfile: this.compileCompanyProfile(report),
      sustainabilityGovernance: this.compileSustainabilityGovernance(report),
      basicModules: await this.compileBasicModules(report),
      comprehensiveModules: await this.compileComprehensiveModules(report),
      performanceMetrics: await this.compilePerformanceMetrics(report),
      compliance: this.generateComplianceSection(report),
      appendices: await this.generateAppendices(report)
    };
    
    return reportStructure;
  }
  
  async compileBasicModules(report) {
    const modules = {};
    
    // B0: General Information
    if (report.basicModules.b0_generalInformation) {
      modules.b0 = {
        title: 'General Information',
        content: {
          companyOverview: report.basicModules.b0_generalInformation.companyOverview,
          reportingScope: report.basicModules.b0_generalInformation.reportingScope,
          materiality: report.basicModules.b0_generalInformation.materiality
        },
        completionStatus: report.basicModules.b0_generalInformation.completionStatus,
        lastUpdated: report.basicModules.b0_generalInformation.lastUpdated
      };
    }
    
    // B3: Energy and GHG Emissions with detailed calculations
    if (report.basicModules.b3_energyGHGEmissions) {
      const ghgData = report.basicModules.b3_energyGHGEmissions;
      
      modules.b3 = {
        title: 'Energy and GHG Emissions',
        content: {
          scope1: {
            stationaryCombustion: ghgData.scope1Emissions.stationaryCombustion,
            mobileCombustion: ghgData.scope1Emissions.mobileCombustion,
            fugitiveEmissions: ghgData.scope1Emissions.fugitiveEmissions,
            total: ghgData.scope1Emissions.totalScope1
          },
          scope2: {
            locationBased: ghgData.scope2Emissions.locationBased,
            marketBased: ghgData.scope2Emissions.marketBased,
            total: ghgData.scope2Emissions.totalScope2
          },
          scope3: ghgData.scope3Emissions,
          energyConsumption: ghgData.energyConsumption,
          calculations: await this.getDetailedCalculations(reportId, 'b3')
        },
        charts: await this.generateEmissionCharts(ghgData),
        completionStatus: ghgData.completionStatus
      };
    }
    
    // Additional modules B4-B11 with similar detailed compilation
    // ...
    
    return modules;
  }
  
  async generateExecutiveSummary(report) {
    const calculations = report.calculationResults;
    
    return {
      reportingPeriod: report.reportMetadata.reportingPeriod,
      keyMetrics: {
        totalGHGEmissions: calculations.ghgEmissionsSummary?.totalGHGEmissions,
        emissionIntensity: calculations.ghgEmissionsSummary?.emissionIntensity,
        renewableEnergyPercentage: calculations.energyMetrics?.renewableEnergyPercentage,
        employeeTurnover: calculations.workforceMetrics?.employeeTurnoverRate,
        accidentRate: calculations.workforceMetrics?.accidentRate
      },
      performanceHighlights: this.identifyPerformanceHighlights(calculations),
      improvementAreas: this.identifyImprovementAreas(calculations),
      complianceStatus: this.assessComplianceStatus(report)
    };
  }
}
```

→ **Multi-Format Export Service**
```javascript
class MultiFormatExporter {
  async exportToPDF(reportData, options = {}) {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({
      margin: 50,
      font: 'Helvetica'
    });
    
    // Add company logo and branding
    if (options.includeLogo && reportData.companyProfile.logo) {
      doc.image(reportData.companyProfile.logo, 50, 50, { width: 100 });
    }
    
    // Title page
    doc.fontSize(24)
       .text('ESG Sustainability Report', 200, 100)
       .fontSize(18)
       .text(reportData.companyProfile.legalName, 200, 140)
       .fontSize(12)
       .text(`Reporting Period: ${reportData.executiveSummary.reportingPeriod.startDate} to ${reportData.executiveSummary.reportingPeriod.endDate}`, 200, 180);
    
    // Executive Summary
    doc.addPage()
       .fontSize(16)
       .text('Executive Summary', 50, 50)
       .fontSize(10)
       .text(JSON.stringify(reportData.executiveSummary.keyMetrics, null, 2), 50, 80);
    
    // Add charts and graphs
    if (reportData.basicModules.b3?.charts) {
      for (const chart of reportData.basicModules.b3.charts) {
        doc.addPage();
        // Add chart implementation
      }
    }
    
    return doc;
  }
  
  async exportToExcel(reportData) {
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    
    // Executive Summary sheet
    const summarySheet = workbook.addWorksheet('Executive Summary');
    summarySheet.addRow(['Metric', 'Value', 'Unit']);
    
    if (reportData.executiveSummary.keyMetrics) {
      Object.entries(reportData.executiveSummary.keyMetrics).forEach(([key, value]) => {
        summarySheet.addRow([key, value, this.getMetricUnit(key)]);
      });
    }
    
    // GHG Emissions detailed sheet
    if (reportData.basicModules.b3) {
      const emissionsSheet = workbook.addWorksheet('GHG Emissions');
      
      // Scope 1 data
      emissionsSheet.addRow(['Scope 1 Emissions']);
      emissionsSheet.addRow(['Fuel Type', 'Quantity', 'Unit', 'Emission Factor', 'CO2e Emissions']);
      
      if (reportData.basicModules.b3.content.scope1.stationaryCombustion) {
        reportData.basicModules.b3.content.scope1.stationaryCombustion.forEach(fuel => {
          emissionsSheet.addRow([
            fuel.fuelType,
            fuel.quantity,
            fuel.unit,
            fuel.emissionFactor,
            fuel.calculatedEmissions
          ]);
        });
      }
    }
    
    // Workforce data sheet
    if (reportData.basicModules.b8) {
      const workforceSheet = workbook.addWorksheet('Workforce Data');
      // Add workforce data tables
    }
    
    return workbook;
  }
  
  async exportToJSON(reportData, options = { pretty: true }) {
    const exportData = {
      metadata: {
        exportDate: new Date(),
        exportVersion: '2.1.0',
        reportId: reportData._id,
        format: 'JSON'
      },
      report: reportData
    };
    
    return options.pretty ? 
      JSON.stringify(exportData, null, 2) : 
      JSON.stringify(exportData);
  }
}
```

---

## 6. Enhanced Security & Compliance Framework
→ Enterprise-grade security with ESG-specific compliance requirements
→ Comprehensive audit trails and regulatory compliance

### Advanced Authentication & Authorization

→ **Multi-Factor Authentication Service**
```javascript
class MFAService {
  async setupMFA(userId, method = 'TOTP') {
    const user = await User.findById(userId);
    
    if (method === 'TOTP') {
      const secret = speakeasy.generateSecret({
        name: `VSME ESG Platform (${user.email})`,
        issuer: 'VSME ESG'
      });
      
      await User.findByIdAndUpdate(userId, {
        'security.mfa.enabled': false,
        'security.mfa.secret': secret.base32,
        'security.mfa.backupCodes': this.generateBackupCodes()
      });
      
      return {
        secret: secret.base32,
        qrCodeUrl: secret.otpauth_url,
        backupCodes: await this.getBackupCodes(userId)
      };
    }
  }
  
  async verifyMFA(userId, token) {
    const user = await User.findById(userId);
    
    if (!user.security.mfa.enabled) {
      throw new Error('MFA not enabled for user');
    }
    
    const verified = speakeasy.totp.verify({
      secret: user.security.mfa.secret,
      encoding: 'base32',
      token: token,
      window: 2
    });
    
    if (verified) {
      await this.logSecurityEvent(userId, 'MFA_SUCCESS');
      return true;
    } else {
      await this.logSecurityEvent(userId, 'MFA_FAILURE');
      await this.handleFailedMFA(userId);
      return false;
    }
  }
}
```

→ **Role-Based Access Control with ESG-Specific Permissions**
```javascript
const ESGPermissions = {
  // Module-specific permissions
  'B3_EMISSIONS_READ': 'Read GHG emissions data',
  'B3_EMISSIONS_WRITE': 'Modify GHG emissions data',
  'B3_EMISSIONS_CALCULATE': 'Trigger emissions calculations',
  'B8_WORKFORCE_READ': 'Read workforce data',
  'B8_WORKFORCE_WRITE': 'Modify workforce data',
  'REPORT_APPROVE': 'Approve completed reports',
  'REPORT_PUBLISH': 'Publish reports',
  'COMPANY_MANAGE': 'Manage company settings',
  'USER_MANAGE': 'Manage user roles and permissions',
  'AUDIT_VIEW': 'View audit trails'
};

const RoleDefinitions = {
  'Admin': [
    'B3_EMISSIONS_READ', 'B3_EMISSIONS_WRITE', 'B3_EMISSIONS_CALCULATE',
    'B8_WORKFORCE_READ', 'B8_WORKFORCE_WRITE',
    'REPORT_APPROVE', 'REPORT_PUBLISH',
    'COMPANY_MANAGE', 'USER_MANAGE', 'AUDIT_VIEW'
  ],
  'Manager': [
    'B3_EMISSIONS_READ', 'B3_EMISSIONS_WRITE',
    'B8_WORKFORCE_READ', 'B8_WORKFORCE_WRITE',
    'REPORT_APPROVE'
  ],
  'Editor': [
    'B3_EMISSIONS_READ', 'B3_EMISSIONS_WRITE',
    'B8_WORKFORCE_READ', 'B8_WORKFORCE_WRITE'
  ],
  'Viewer': [
    'B3_EMISSIONS_READ',
    'B8_WORKFORCE_READ'
  ]
};
```

### Data Protection & GDPR Compliance

→ **Personal Data Management Service**
```javascript
class PersonalDataManager {
  async identifyPersonalData(data, context = 'report') {
    const personalDataFields = [];
    
    // Identify PII in workforce data
    if (context === 'workforce' || context === 'report') {
      if (data.employees) {
        data.employees.forEach((employee, index) => {
          if (employee.name) personalDataFields.push(`employees[${index}].name`);
          if (employee.email) personalDataFields.push(`employees[${index}].email`);
          if (employee.personalId) personalDataFields.push(`employees[${index}].personalId`);
        });
      }
    }
    
    // Contact person data
    if (data.contactPersons) {
      data.contactPersons.forEach((contact, index) => {
        personalDataFields.push(`contactPersons[${index}].name`);
        personalDataFields.push(`contactPersons[${index}].email`);
        personalDataFields.push(`contactPersons[${index}].phone`);
      });
    }
    
    return personalDataFields;
  }
  
  async anonymizePersonalData(reportId, retentionPolicy = '7years') {
    const report = await Report.findById(reportId);
    const personalFields = await this.identifyPersonalData(report.toObject(), 'report');
    
    // Create anonymized version
    const anonymizedData = JSON.parse(JSON.stringify(report.toObject()));
    
    personalFields.forEach(fieldPath => {
      this.setNestedValue(anonymizedData, fieldPath, '[ANONYMIZED]');
    });
    
    // Store anonymized version
    await Report.findByIdAndUpdate(reportId, {
      originalData: report.toObject(),
      anonymizedData: anonymizedData,
      anonymizedAt: new Date(),
      retentionPolicy: retentionPolicy
    });
    
    return anonymizedData;
  }
  
  async handleDataSubjectRequest(requestType, userId, companyId) {
    switch (requestType) {
      case 'ACCESS':
        return await this.exportUserData(userId, companyId);
      case 'DELETE':
        return await this.deleteUserData(userId, companyId);
      case 'PORTABILITY':
        return await this.exportPortableData(userId, companyId);
      default:
        throw new Error(`Unknown data subject request type: ${requestType}`);
    }
  }
}
```

### Comprehensive Audit and Monitoring

→ **Advanced Audit Logging System**
```javascript
class EnhancedAuditLogger {
  async logESGDataChange(userId, reportId, moduleId, changes) {
    const auditEntry = {
      userId: ObjectId(userId),
      reportId: ObjectId(reportId),
      action: 'ESG_DATA_UPDATE',
      module: moduleId,
      timestamp: new Date(),
      changes: {
        before: changes.before,
        after: changes.after,
        fields: Object.keys(changes.after)
      },
      calculationImpact: await this.assessCalculationImpact(reportId, moduleId, changes),
      ipAddress: changes.context?.ipAddress,
      userAgent: changes.context?.userAgent,
      sessionId: changes.context?.sessionId
    };
    
    // Store in audit collection
    await AuditLog.create(auditEntry);
    
    // Add to report's audit trail
    await Report.findByIdAndUpdate(reportId, {
      $push: { auditTrail: auditEntry }
    });
    
    // Trigger compliance checks if significant changes
    if (this.isSignificantChange(changes)) {
      await this.triggerComplianceReview(reportId, moduleId);
    }
  }
  
  async assessCalculationImpact(reportId, moduleId, changes) {
    if (moduleId === 'b3' && changes.after.scope1Emissions) {
      const previousTotal = await this.getPreviousCalculatedTotal(reportId, 'ghg');
      const newTotal = await this.calculateNewTotal(reportId, changes.after);
      
      return {
        affectedCalculations: ['totalGHGEmissions', 'emissionIntensity'],
        percentageChange: ((newTotal - previousTotal) / previousTotal) * 100,
        requiresRecalculation: Math.abs(newTotal - previousTotal) > (previousTotal * 0.01)
      };
    }
    
    return null;
  }
}
```

---

## 7. Performance Optimization & Scalability Architecture
→ High-performance system design with MongoDB optimization
→ Caching strategies and background job processing

### Database Performance Optimization

→ **Advanced Indexing Strategy**
```javascript
// MongoDB index creation for optimal ESG queries
const ESGIndexes = {
  // User authentication and company access
  users: [
    { email: 1 }, // Unique index for login
    { 'companyAssociations.companyId': 1, 'companyAssociations.role': 1 },
    { 'security.failedLoginAttempts': 1, 'security.accountLocked': 1 },
    { lastLogin: -1 } // For session management
  ],
  
  // Company and premises queries
  companies: [
    { 'companyProfile.legalName': 'text', 'companyProfile.tradingName': 'text' },
    { 'industryClassification.primaryNACECode': 1 },
    { 'headquarters.country': 1, 'headquarters.county': 1 },
    { 'operationalPremises.address.coordinates': '2dsphere' } // Geospatial queries
  ],
  
  // ESG reports and calculations
  reports: [
    { companyId: 1, 'reportMetadata.reportingPeriod.fiscalYear': -1 },
    { 'reportStatus.currentStatus': 1, 'reportStatus.lastModified': -1 },
    { 'moduleConfiguration.selectedBasicModules': 1 },
    { 'calculationResults.ghgEmissionsSummary.totalGHGEmissions': -1 },
    { 'auditTrail.timestamp': -1, 'auditTrail.userId': 1 }
  ],
  
  // Emission factors lookup optimization
  emissionFactors: [
    { 
      'factorMetadata.category': 1, 
      'fuelSpecifications.fuelType': 1, 
      'geographicScope.country': 1,
      'factorMetadata.validFrom': -1
    },
    { 'factorMetadata.source': 1, 'factorMetadata.publishedDate': -1 },
    { isActive: 1, 'factorMetadata.validTo': 1 }
  ],
  
  // Audit and compliance queries
  auditLogs: [
    { reportId: 1, timestamp: -1 },
    { userId: 1, action: 1, timestamp: -1 },
    { 'changes.fields': 1, timestamp: -1 }
  ]
};

// TTL indexes for data cleanup
const TTLIndexes = {
  sessions: [
    { lastActivity: 1 }, // 24 hour expiry
    { expiresAt: 1 }
  ],
  temporaryCalculations: [
    { createdAt: 1 } // 1 hour expiry for temporary calculation results
  ],
  auditLogs: [
    { timestamp: 1 } // 7 year retention for audit data
  ]
};
```

→ **Query Optimization Service**
```javascript
class QueryOptimizer {
  async getOptimizedReportData(companyId, filters = {}) {
    const pipeline = [];
    
    // Match stage with compound index utilization
    pipeline.push({
      $match: {
        companyId: ObjectId(companyId),
        'reportStatus.currentStatus': { $in: filters.statuses || ['Complete', 'Published'] },
        'reportMetadata.reportingPeriod.fiscalYear': {
          $gte: filters.fromYear || new Date().getFullYear() - 5,
          $lte: filters.toYear || new Date().getFullYear()
        }
      }
    });
    
    // Project only required fields to reduce memory usage
    pipeline.push({
      $project: {
        'reportMetadata': 1,
        'reportStatus': 1,
        'calculationResults.ghgEmissionsSummary': 1,
        'calculationResults.energyMetrics': 1,
        'basicModules.b3_energyGHGEmissions.scope1Emissions.totalScope1': 1,
        'basicModules.b3_energyGHGEmissions.scope2Emissions.totalScope2': 1
      }
    });
    
    // Sort using index
    pipeline.push({
      $sort: { 'reportMetadata.reportingPeriod.fiscalYear': -1 }
    });
    
    return await Report.aggregate(pipeline);
  }
  
  async getEmissionFactorOptimized(fuelType, country, category) {
    return await EmissionFactor.findOne({
      'fuelSpecifications.fuelType': fuelType,
      'geographicScope.country': country,
      'factorMetadata.category': category,
      isActive: true,
      'factorMetadata.validTo': { $gte: new Date() }
    })
    .sort({ 'factorMetadata.validFrom': -1 })
    .lean(); // Return plain JS object for better performance
  }
}
```

### Advanced Caching Strategy

→ **Multi-Layer Caching System**
```javascript
class ESGCacheManager {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
    this.localCache = new NodeCache({ stdTTL: 300 }); // 5 minute local cache
  }
  
  async getEmissionFactor(fuelType, country, category) {
    const cacheKey = `emission_factor:${fuelType}:${country}:${category}`;
    
    // Level 1: Local memory cache
    let factor = this.localCache.get(cacheKey);
    if (factor) return factor;
    
    // Level 2: Redis cache
    factor = await this.redis.get(cacheKey);
    if (factor) {
      const parsed = JSON.parse(factor);
      this.localCache.set(cacheKey, parsed);
      return parsed;
    }
    
    // Level 3: Database query
    factor = await EmissionFactor.findOne({
      'fuelSpecifications.fuelType': fuelType,
      'geographicScope.country': country,
      'factorMetadata.category': category,
      isActive: true
    }).lean();
    
    if (factor) {
      // Cache in both levels
      await this.redis.setex(cacheKey, 3600, JSON.stringify(factor)); // 1 hour
      this.localCache.set(cacheKey, factor);
    }
    
    return factor;
  }
  
  async cacheCalculationResults(reportId, calculations) {
    const cacheKey = `calculations:${reportId}`;
    
    await this.redis.setex(
      cacheKey, 
      1800, // 30 minutes
      JSON.stringify({
        calculations,
        timestamp: new Date(),
        version: '2.1.0'
      })
    );
  }
  
  async invalidateReportCache(reportId) {
    const patterns = [
      `calculations:${reportId}`,
      `report_data:${reportId}:*`,
      `export:${reportId}:*`
    ];
    
    for (const pattern of patterns) {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    }
  }
}
```

### Background Job Processing System

→ **Queue-Based Calculation Processing**
```javascript
const Queue = require('bull');
const calculationQueue = new Queue('ESG calculations', process.env.REDIS_URL);

// Job processors
calculationQueue.process('ghg-calculation', async (job) => {
  const { reportId, moduleData, userId } = job.data;
  
  try {
    const calculator = new GHGCalculationService();
    const results = await calculator.calculateComprehensiveEmissions(moduleData);
    
    // Update report with calculation results
    await Report.findByIdAndUpdate(reportId, {
      'calculationResults.ghgEmissions': results,
      'calculationResults.lastCalculated': new Date()
    });
    
    // Log calculation completion
    await AuditLog.create({
      userId: ObjectId(userId),
      reportId: ObjectId(reportId),
      action: 'CALCULATION_COMPLETE',
      details: { calculationType: 'GHG_COMPREHENSIVE', totalEmissions: results.total }
    });
    
    // Invalidate related caches
    await cacheManager.invalidateReportCache(reportId);
    
    return { success: true, results };
  } catch (error) {
    // Log calculation error
    await AuditLog.create({
      userId: ObjectId(userId),
      reportId: ObjectId(reportId),
      action: 'CALCULATION_FAILED',
      details: { error: error.message }
    });
    
    throw error;
  }
});

// Report generation queue
const reportQueue = new Queue('Report generation', process.env.REDIS_URL);

reportQueue.process('generate-report', async (job) => {
  const { reportId, format, userId } = job.data;
  
  const generator = new ReportGenerator();
  const exportData = await generator.generateReport(reportId, format);
  
  // Store generated report
  const filename = `report_${reportId}_${Date.now()}.${format}`;
  await fileStorage.store(filename, exportData);
  
  // Notify user of completion
  await NotificationService.send(userId, {
    type: 'REPORT_READY',
    message: `Your ${format.toUpperCase()} report is ready for download`,
    downloadUrl: `/api/reports/${reportId}/download/${filename}`
  });
  
  return { filename, downloadUrl: `/api/reports/${reportId}/download/${filename}` };
});
```

---

## 8. Implementation Timeline & Deployment Strategy
→ Phased implementation approach with milestone-based delivery
→ Comprehensive testing and quality assurance

### Phase 1: Foundation & Core Infrastructure (Weeks 1-4)

→ **Week 1-2: Database Setup & Authentication**
--- MongoDB Atlas cluster setup with optimized schema
--- User authentication system with JWT and MFA
--- Role-based access control implementation
--- Basic API structure with authentication middleware

→ **Week 3-4: Company Management & Basic Data Models**
--- Company registration and management system
--- Premises management with geolocation
--- Basic ESG data models (B0-B2 modules)
--- Input validation framework implementation

### Phase 2: Calculation Engine & Core Modules (Weeks 5-8)

→ **Week 5-6: Emission Factor Database & Calculation Engine**
--- Comprehensive emission factor database population
--- Scope 1, 2, 3 calculation engines implementation
--- Real-time calculation triggers and validation
--- Workforce metrics calculation system

→ **Week 7-8: Basic Modules Implementation**
--- B3 (Energy & GHG Emissions) complete implementation
--- B8 (Workforce) and B9 (Health & Safety) modules
--- B10 (Remuneration) with pay gap calculations
--- Cross-module validation and consistency checks

### Phase 3: Advanced Features & Comprehensive Modules (Weeks 9-12)

→ **Week 9-10: Comprehensive Modules (C1-C9)**
--- Business model and strategy modules
--- Governance and risk management systems
--- Environmental management integration
--- Performance metrics and analytics

→ **Week 11-12: Report Generation & Export**
--- Multi-format report generation (PDF, Excel, JSON)
--- VSME template compliance implementation
--- Executive summary and analytics generation
--- Export scheduling and background processing

### Phase 4: Integration & Security (Weeks 13-14)

→ **Week 13: External Integrations**
--- Bord Bia SBLAS/SDAS integration
--- Emission factor database synchronization
--- Geographic services integration
--- Third-party compliance tools integration

→ **Week 14: Security & Compliance**
--- Advanced security framework implementation
--- GDPR compliance features
--- Comprehensive audit logging
--- Penetration testing and security assessment

### Phase 5: Testing & Deployment (Weeks 15-16)

→ **Week 15: Quality Assurance & Performance Testing**
--- Comprehensive test suite completion
--- Load testing and performance optimization
--- User acceptance testing coordination
--- Documentation completion

→ **Week 16: Production Deployment**
--- Production environment setup
--- Data migration and seeding
--- Go-live support and monitoring
--- User training and onboarding

---

## 9. Monitoring, Maintenance & Continuous Improvement
→ Comprehensive monitoring and alerting system
→ Automated maintenance and continuous deployment

### Application Performance Monitoring

→ **Real-Time Performance Monitoring**
```javascript
class PerformanceMonitor {
  async monitorCalculationPerformance(calculationType, executionTime, dataSize) {
    const performanceMetric = {
      calculationType,
      executionTime,
      dataSize,
      timestamp: new Date(),
      performanceRating: this.calculatePerformanceRating(executionTime, dataSize)
    };
    
    // Store metrics for analysis
    await PerformanceLog.create(performanceMetric);
    
    // Alert if performance degrades
    if (executionTime > this.getPerformanceThreshold(calculationType)) {
      await this.alertPerformanceIssue(calculationType, executionTime);
    }
    
    return performanceMetric;
  }
  
  async generatePerformanceDashboard() {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const metrics = await PerformanceLog.aggregate([
      { $match: { timestamp: { $gte: last24Hours } } },
      {
        $group: {
          _id: '$calculationType',
          avgExecutionTime: { $avg: '$executionTime' },
          maxExecutionTime: { $max: '$executionTime' },
          totalCalculations: { $sum: 1 },
          avgDataSize: { $avg: '$dataSize' }
        }
      }
    ]);
    
    return metrics;
  }
}
```

### Automated Maintenance System

→ **Database Maintenance & Optimization**
```javascript
class MaintenanceScheduler {
  async scheduleRegularMaintenance() {
    const cron = require('node-cron');
    
    // Daily maintenance tasks
    cron.schedule('0 2 * * *', async () => {
      await this.cleanupExpiredSessions();
      await this.optimizeIndexes();
      await this.generateDailyPerformanceReport();
    });
    
    // Weekly maintenance tasks
    cron.schedule('0 3 * * 0', async () => {
      await this.archiveOldAuditLogs();
      await this.updateEmissionFactors();
      await this.generateWeeklySecurityReport();
      await this.optimizeCalculationCache();
    });
    
    // Monthly maintenance tasks
    cron.schedule('0 4 1 * *', async () => {
      await this.performDatabaseMaintenance();
      await this.generateMonthlyAnalytics();
      await this.reviewPerformanceTrends();
    });
  }
  
  async updateEmissionFactors() {
    const factorUpdater = new EmissionFactorUpdater();
    
    try {
      // Check for SEAI updates
      const seaiUpdates = await factorUpdater.checkSEAIUpdates();
      if (seaiUpdates.length > 0) {
        await factorUpdater.updateFactors('SEAI', seaiUpdates);
        await this.notifyAdministrators('SEAI emission factors updated', seaiUpdates);
      }
      
      // Check for other source updates
      const ukGovUpdates = await factorUpdater.checkUKGovUpdates();
      if (ukGovUpdates.length > 0) {
        await factorUpdater.updateFactors('UK_GOV', ukGovUpdates);
      }
      
    } catch (error) {
      await this.logMaintenanceError('emission_factor_update', error);
    }
  }
}
```

---

**This comprehensive backend implementation plan provides a robust, scalable, and compliant foundation for the VSME ESG reporting platform. The architecture is designed to handle complex ESG calculations, ensure data integrity, maintain security compliance, and provide exceptional performance within the MongoDB Free Tier constraints.**

**Key deliverables include:**
- Complete MongoDB schema with optimized collections
- Comprehensive API architecture with 100+ endpoints
- Advanced calculation engine with multi-source emission factors
- Enterprise-grade security and compliance framework
- Multi-format report generation and export system
- Performance optimization and caching strategies
- Automated maintenance and monitoring systems

The implementation timeline ensures systematic development with clear milestones and quality gates throughout the process.