# ESG Dashboard Backend Implementation Plan

## Project Overview

This document outlines the complete implementation plan for the ESG Dashboard backend system, designed to support comprehensive ESG reporting workflows for Very Small and Medium-sized Enterprises (VSME).

## Current Status Summary

### ✅ Completed Components
- **Frontend Dashboard**: Complete with all B0-B11 module pages
- **B0 General Information**: Basic implementation with company profile data
- **B1 Basis for Preparation**: Schema and validation with reporting framework support
- **B2 Sustainability Practices**: Complete with effectiveness scoring
- **B3 Energy & GHG Emissions**: Advanced calculation engine with SEAI/IPCC factors
- **B4 Pollution Module**: ✅ **JUST COMPLETED** - Comprehensive air, water, soil, and hazardous substances tracking
- **B8 Workforce General**: Basic employee metrics and demographics
- **Authentication System**: JWT-based with role management
- **MongoDB Schemas**: Comprehensive data models for all entities
- **API Infrastructure**: Express.js with middleware and error handling

### 🔄 In Progress
- **B5-B7 Modules**: Pending implementation (next phase)
- **B9-B11 Modules**: Pending implementation (next phase)

### ❌ Missing Critical Components
- **Enhanced B3 Calculations**: Excel-based emission factor integration
- **User Management**: Complete RBAC system with company associations
- **Report Generation**: PDF/Excel export with calculation summaries
- **File Upload System**: Document management for evidence
- **Dashboard Analytics**: Real-time metrics and progress tracking

---

## Phase 1: B3 Enhanced Calculations (Priority: Immediate)

### Excel Emission Factors Integration
Using the provided "Full Scope 1_2 Activity Data_Emission Factors V.0.xlsx" file:

#### Implementation Tasks:
1. **Parse Excel Emission Factors**
   - Extract all emission factors by country, fuel type, and methodology
   - Create database seeding script for comprehensive factors
   - Support SEAI (Ireland), DEFRA (UK), EPA (US), and IPCC global factors

2. **Enhanced Calculation Engine**
   ```javascript
   // Enhanced calculation methods
   calculateStationaryCombustionEmissions(activityData, country)
   calculateMobileCombustionEmissions(activityData, country)  
   calculateFugitiveEmissions(activityData, refrigerantType)
   calculateElectricityEmissions(activityData, country, gridFactor)
   calculateScope3Emissions(activityData, category)
   ```

3. **Real-Time Calculation APIs**
   ```
   POST /api/calculations/b3/comprehensive
   POST /api/calculations/b3/stationary-combustion
   POST /api/calculations/b3/mobile-combustion
   POST /api/calculations/b3/fugitive-emissions
   POST /api/calculations/b3/electricity-consumption
   GET  /api/calculations/b3/summary/:reportId
   ```

4. **Form Integration Support**
   - Real-time calculation previews for dashboard forms
   - Step-by-step calculation validation
   - Automatic emission factor selection based on user inputs
   - Progressive calculation saves with intermediate results

---

## Phase 2: Complete ESG Module Backend (Weeks 2-3)

### B5 Biodiversity Impact Assessment
```javascript
b5_biodiversity: {
  impactAssessment: {
    habitatsAffected: [{
      habitatType: String,
      areaAffected: Number,
      impactLevel: ['High', 'Medium', 'Low'],
      mitigationMeasures: [String]
    }],
    speciesImpact: [{
      species: String,
      conservationStatus: String,
      impactType: String,
      protectionMeasures: [String]
    }]
  },
  conservationInitiatives: [{
    initiative: String,
    implementation: String,
    effectiveness: String,
    investmentAmount: Number
  }],
  biodiversityOffsets: [{
    offsetType: String,
    area: Number,
    location: String,
    provider: String
  }]
}
```

### B6 Water Consumption Management
```javascript
b6_waterConsumption: {
  waterIntake: {
    municipalWater: { quantity: Number, cost: Number },
    groundwater: { quantity: Number, wells: Number, permits: [String] },
    surfaceWater: { quantity: Number, sources: [String] },
    rainwaterHarvesting: { quantity: Number, systems: Number },
    recycledWater: { quantity: Number, treatmentLevel: String }
  },
  waterDischarge: {
    treated: Number,
    untreated: Number,
    recycled: Number,
    evaporation: Number
  },
  waterEfficiency: {
    intensityMetrics: { waterPerEmployee: Number, waterPerRevenue: Number },
    conservationMeasures: [{ measure: String, savings: Number }],
    recyclingRate: Number,
    targetReduction: { percentage: Number, baselineYear: Number }
  }
}
```

### B7 Waste Management & Circular Economy
```javascript
b7_wasteManagement: {
  wasteGeneration: {
    totalWaste: Number,
    wasteStreams: [{
      wasteType: String,
      quantity: Number,
      unit: String,
      source: String,
      hazardous: Boolean
    }]
  },
  wasteDisposal: {
    recycling: { quantity: Number, rate: Number },
    reuse: { quantity: Number, rate: Number },
    composting: { quantity: Number, rate: Number },
    energyRecovery: { quantity: Number, rate: Number },
    landfill: { quantity: Number, rate: Number },
    incineration: { quantity: Number, rate: Number }
  },
  circularEconomy: {
    initiatives: [{ 
      initiative: String, 
      impact: String, 
      investment: Number,
      materialsSaved: Number 
    }],
    sustainableDesign: Boolean,
    productLifeCycle: String
  }
}
```

---

## Phase 3: User Management & Access Control (Week 4)

### Enhanced User System
```javascript
// Complete user management with company associations
POST /api/users/invite              // Invite team members
PUT  /api/users/:id/permissions     // Manage role-based permissions
GET  /api/companies/:id/users       // List company team members
POST /api/users/:id/activate        // Activate invited users
DELETE /api/users/:id/deactivate    // Deactivate users

// Role-Based Access Control
roles: ['SuperAdmin', 'CompanyAdmin', 'Manager', 'Editor', 'Viewer']
permissions: {
  modules: ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'],
  actions: ['read', 'write', 'approve', 'calculate', 'export', 'manage']
}
```

### User Workflow Implementation
1. **Company Registration**: Multi-step company setup with validation
2. **Team Invitations**: Email-based invitation system with role assignment
3. **Permission Management**: Granular permissions per module and action
4. **User Onboarding**: Guided setup for new users with tutorial system

---

## Phase 4: Report Generation & Export (Week 5)

### PDF Report Generation
```javascript
// Advanced PDF reports with charts and calculations
const generateComplianceReport = async (reportId, template) => {
  // Comprehensive VSME compliance report
  // Executive summary with key metrics
  // Detailed calculation breakdowns
  // Charts and visualizations
  // Regulatory compliance verification
  return { downloadUrl, reportMetrics }
}
```

### Excel Export System
```javascript
// Multi-sheet Excel workbooks
const exportCalculationWorkbook = async (reportId) => {
  // Activity Data sheet with user inputs
  // Emission Factors sheet with references
  // Calculations sheet with step-by-step formulas
  // Summary Dashboard with charts
  // Compliance Checklist with status
  return { downloadUrl, sheets }
}
```

### Report Templates
- **VSME Standard Report**: EU taxonomy aligned
- **Executive Summary**: High-level metrics for leadership
- **Detailed Technical Report**: Full calculation methodology
- **Regulatory Compliance Report**: Specific to jurisdiction requirements
- **Custom Reports**: User-configurable templates

---

## Phase 5: File Upload & Document Management (Week 6)

### Secure File Management
```javascript
// Document upload and management
POST /api/files/upload              // Secure file upload with validation
GET  /api/files/:reportId          // List report documents
DELETE /api/files/:id              // Remove files with audit trail
PUT  /api/files/:id/metadata       // Update file metadata

// Supported file types
supportedTypes: ['PDF', 'Excel', 'Word', 'Images', 'CSV']
maxFileSize: '10MB'
virusScanning: true
encryption: 'AES-256'
```

### Document Categories
- **Evidence Documents**: Supporting evidence for data entries
- **Calculation Sheets**: Excel files with manual calculations
- **Policies & Procedures**: Company ESG policies
- **Certificates & Permits**: Regulatory compliance documents
- **Audit Reports**: External verification documents

---

## Phase 6: Dashboard Analytics & Insights (Week 7)

### Real-Time Analytics APIs
```javascript
// Dashboard metrics and analytics
GET /api/analytics/emissions-trends       // Historical emissions tracking
GET /api/analytics/module-completion      // Progress tracking by module
GET /api/analytics/compliance-status      // Regulatory compliance overview  
GET /api/analytics/benchmarking          // Industry comparisons
GET /api/analytics/data-quality          // Data quality scoring
GET /api/analytics/cost-analysis         // Financial impact analysis
```

### Key Performance Indicators
- **Completion Metrics**: Overall report progress and module status
- **Emissions Trends**: Year-over-year GHG emission changes
- **Compliance Status**: Regulatory requirement adherence
- **Data Quality Scores**: Accuracy and completeness metrics
- **Industry Benchmarking**: Performance vs. sector averages

---

## Database Schema Enhancements

### Additional Indexes for Performance
```javascript
// Enhanced indexing strategy for large datasets
reportSchema.index({ 
  'calculationResults.ghgEmissionsSummary.totalGHGEmissions': -1,
  'reportMetadata.reportingPeriod.fiscalYear': -1 
});

// User activity and audit trails
reportSchema.index({ 
  'auditTrail.timestamp': -1, 
  'auditTrail.userId': 1 
});

// Module completion tracking
reportSchema.index({ 
  'basicModules.b3_energyGHGEmissions.completionStatus': 1,
  'basicModules.b4_pollution.completionStatus': 1 
});
```

### Enhanced Calculation Results Storage
```javascript
calculationResults: {
  ghgEmissionsSummary: {
    totalScope1: Number,
    totalScope2LocationBased: Number,
    totalScope2MarketBased: Number,
    totalScope3: Number,
    combinedScope1And2: Number,
    emissionIntensity: {
      perEmployee: Number,
      perRevenue: Number,
      perUnit: Number
    },
    yearOverYearChange: {
      absolute: Number,
      percentage: Number,
      comparisonYear: Number
    }
  },
  dataQuality: {
    overallScore: Number,
    completenessScore: Number,
    accuracyScore: Number,
    uncertaintyPercentage: Number
  },
  complianceStatus: {
    vsmeCompliant: Boolean,
    euTaxonomyAligned: Boolean,
    missingRequirements: [String]
  }
}
```

---

## API Endpoint Summary

### Core ESG Module APIs
```
# Company & User Management
POST   /api/companies                    # Create company
GET    /api/companies/:id/users         # List company users  
POST   /api/users/invite                # Invite team members
PUT    /api/users/:id/permissions       # Update user permissions

# Report Management
POST   /api/reports                     # Create new ESG report
GET    /api/reports/:id                 # Get report data
PUT    /api/reports/:id/modules/:module # Update module data
POST   /api/reports/:id/submit          # Submit report for review
POST   /api/reports/:id/approve         # Approve report

# B3 Enhanced Calculations
POST   /api/calculations/b3/comprehensive          # Full B3 calculations
POST   /api/calculations/b3/stationary-combustion # Stationary combustion
POST   /api/calculations/b3/mobile-combustion     # Mobile combustion
POST   /api/calculations/b3/fugitive-emissions    # Fugitive emissions
POST   /api/calculations/b3/electricity           # Electricity consumption
GET    /api/calculations/b3/summary/:reportId     # Calculation summary

# B4 Pollution Management
GET    /api/b4/reports/:reportId/b4                              # Get pollution data
PUT    /api/b4/reports/:reportId/b4                              # Update pollution data
POST   /api/b4/reports/:reportId/b4/air-pollution/emissions      # Add air emission
POST   /api/b4/reports/:reportId/b4/water-pollution/discharge    # Add water discharge
POST   /api/b4/reports/:reportId/b4/soil-contamination/sites     # Add contaminated site
POST   /api/b4/reports/:reportId/b4/hazardous-substances         # Add hazardous substance

# File Management
POST   /api/files/upload                # Upload documents
GET    /api/files/:reportId            # List report files
DELETE /api/files/:id                  # Delete file

# Report Generation
POST   /api/reports/:id/generate-pdf   # Generate PDF report
POST   /api/reports/:id/export-excel   # Export Excel workbook
GET    /api/reports/:id/download/:type # Download generated reports

# Analytics & Insights  
GET    /api/analytics/emissions-trends    # Historical trends
GET    /api/analytics/compliance-status   # Compliance overview
GET    /api/analytics/benchmarking       # Industry comparisons
GET    /api/analytics/data-quality       # Data quality metrics
```

---

## Implementation Timeline

### Week 1: B3 Enhanced Calculations (CURRENT PRIORITY)
- ✅ **Day 1-2**: Parse Excel emission factors and create database seeds
- ✅ **Day 3-4**: Enhance B3 calculation engine with comprehensive formulas
- ✅ **Day 5-6**: Implement real-time calculation APIs
- ✅ **Day 7**: Testing and integration with frontend forms

### Week 2: Complete B5-B7 Modules
- **Day 1-2**: B5 Biodiversity implementation
- **Day 3-4**: B6 Water Consumption implementation  
- **Day 5-6**: B7 Waste Management implementation
- **Day 7**: Integration testing and validation

### Week 3: B9-B11 Modules & User Management
- **Day 1-2**: B9 Health & Safety, B10 Remuneration, B11 Corruption modules
- **Day 3-5**: Enhanced user management with RBAC
- **Day 6-7**: User onboarding workflows and permissions

### Week 4: Report Generation & Export
- **Day 1-3**: PDF report generation with charts
- **Day 4-5**: Excel export with multi-sheet workbooks
- **Day 6-7**: Report templates and customization

### Week 5: File Management & Analytics
- **Day 1-3**: Secure file upload and document management
- **Day 4-6**: Dashboard analytics and KPI tracking
- **Day 7**: Performance optimization and caching

### Week 6: Testing & Deployment
- **Day 1-3**: Comprehensive testing and bug fixes
- **Day 4-5**: Performance optimization and security audit
- **Day 6-7**: Production deployment preparation

---

## Testing Strategy

### Unit Testing
- **Coverage Target**: >85% for business logic, >70% for API endpoints
- **Framework**: Jest with Supertest for API testing
- **Database**: MongoDB Memory Server for isolated testing

### Integration Testing  
- **End-to-End**: Playwright for critical user journeys
- **API Testing**: Comprehensive endpoint testing with real data scenarios
- **Performance**: Artillery for load testing under realistic conditions

### Data Validation Testing
- **Emission Factors**: Verify calculations against known reference values
- **Compliance**: Test regulatory requirement validation
- **User Workflows**: Complete user journey testing from registration to report generation

---

## Security & Compliance

### Data Protection
- **Encryption**: AES-256 encryption for sensitive data at rest
- **Transport Security**: TLS 1.3 for all API communications
- **Access Control**: JWT-based authentication with role-based permissions
- **Audit Trails**: Comprehensive logging of all user actions

### GDPR Compliance
- **Data Export**: User data export in machine-readable format
- **Right to Deletion**: Complete data removal with audit trails
- **Consent Management**: Clear consent tracking for data processing
- **Privacy by Design**: Minimal data collection with purpose limitation

### Regulatory Compliance
- **VSME Standards**: Full compliance with EU VSME ESG reporting requirements
- **CSRD Readiness**: Corporate Sustainability Reporting Directive alignment
- **Industry Standards**: SEAI, DEFRA, EPA emission factor compliance
- **Data Retention**: Configurable retention policies with automated cleanup

---

## Performance Targets

### API Response Times
- **CRUD Operations**: <100ms average response time
- **Calculations**: <500ms for complex emission calculations
- **Report Generation**: <30 seconds for PDF, <60 seconds for Excel
- **File Uploads**: <5 seconds for 10MB files

### Database Performance
- **Query Time**: <50ms average for indexed queries
- **Concurrent Users**: Support 100+ simultaneous users
- **Data Volume**: Handle 10,000+ data points per company report
- **Backup & Recovery**: <4 hour RTO, <1 hour RPO

### Frontend Integration
- **Page Load**: <3 seconds for dashboard pages
- **Real-time Updates**: <1 second for calculation previews
- **File Operations**: <2 seconds for file list operations
- **Offline Support**: Basic form completion with sync capability

---

## Success Metrics

### Technical KPIs
- **API Reliability**: 99.9% uptime with <100ms average response
- **Data Accuracy**: 100% calculation accuracy vs. reference standards
- **User Adoption**: >80% user onboarding completion rate
- **Performance**: Zero timeout failures under normal load

### Business KPIs  
- **Report Completion**: Average <3 hours per complete ESG report
- **Data Quality**: <5% validation error rate across all modules
- **Compliance**: 100% VSME requirement coverage
- **User Satisfaction**: >4.5/5 average user experience rating

### Scalability KPIs
- **Multi-tenancy**: Support 1000+ companies with isolated data
- **Geographic**: Multi-country emission factor support (10+ countries)
- **Language**: Multi-language support (English, Irish, other EU languages)
- **Integration**: API-first architecture for third-party integrations

---

## Next Steps

1. **Immediate Priority**: Start with B3 enhanced calculations using Excel emission factors
2. **Week 2**: Continue with B5-B7 module implementations  
3. **Week 3**: Focus on user management and access control
4. **Week 4**: Implement report generation and export capabilities
5. **Week 5**: Add file management and analytics features
6. **Week 6**: Testing, optimization, and deployment preparation

This plan provides a comprehensive roadmap for completing the ESG Dashboard backend implementation, ensuring full compliance with VSME standards while providing an excellent user experience for ESG professionals.