# ESG Platform - Product Requirements Document (PRD)

## Executive Summary

### Current State Analysis
The ESG (Environmental, Social, Governance) platform is a Next.js 15 + Express.js application designed for Very Small and Medium-sized Enterprises (VSME) ESG reporting compliance. The platform currently implements:

- **Frontend**: React/Next.js dashboard with 20+ ESG module pages (B0-B11, C1-C9)
- **Backend**: Express.js API with MongoDB integration, comprehensive calculation engine
- **Core Features**: Company management, ESG report creation, emissions calculations (Scope 1, 2, 3), real-time data processing
- **Architecture**: Well-structured separation between frontend dashboard and backend API with robust data models

### Platform Vision
Enable VSME companies to efficiently collect, calculate, and report ESG data in compliance with Irish and EU regulations, particularly CSRD (Corporate Sustainability Reporting Directive) requirements.

## Platform Architecture Analysis

### Current Technical Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, MongoDB, Mongoose ODM
- **Authentication**: JWT-based with role-based access control
- **Calculations**: Advanced emissions calculation service with SEAI/IPCC factors
- **API**: RESTful architecture with comprehensive error handling

### Implemented Core Modules

#### Frontend Dashboard Structure
- **Main Dashboard**: Real-time overview with live backend integration
- **Basic Modules (B0-B11)**:
  - B0: General Company Information ✅ Implemented
  - B1: Basis for Preparation
  - B2: Sustainability Practices
  - B3: Energy and GHG Emissions ✅ Advanced implementation
  - B4: Pollution
  - B5: Biodiversity
  - B6: Water Consumption
  - B7: Waste Management
  - B8: Workforce General ✅ Implemented
  - B9: Health & Safety
  - B10: Remuneration
  - B11: Corruption & Bribery

#### Backend Core Services
- **Calculation Engine**: Advanced emissions calculations with 50+ emission factors
- **Company Management**: Comprehensive company profiles with multi-premise support
- **Report Generation**: Structured ESG report creation and management
- **Data Validation**: Robust input validation and error handling
- **Demo Integration**: Live calculation demonstrations for user onboarding

## Business Requirements

### Primary User Types
1. **Company Administrators**: Manage company profile and user access
2. **ESG Managers**: Complete ESG reports and data collection
3. **Data Entry Users**: Input operational data for calculations
4. **Auditors/Reviewers**: Review and validate ESG reports
5. **System Administrators**: Platform maintenance and configuration

### Core Business Processes

#### ESG Reporting Workflow
1. **Company Registration & Setup**
   - Legal entity information
   - Multi-premise operational details
   - Industry classification (NACE codes)
   - Stakeholder management

2. **Report Creation & Management**
   - Annual/periodic report generation
   - Module-based data collection (B0-B11, C1-C9)
   - Progress tracking and completion status
   - Version control and audit trails

3. **Data Collection & Calculations**
   - Real-time emissions calculations
   - Multi-scope GHG accounting (Scope 1, 2, 3)
   - Workforce metrics and social indicators
   - Environmental impact assessments

4. **Quality Assurance & Compliance**
   - Data validation and verification
   - Compliance checking against VSME standards
   - Report review and approval workflows
   - External audit preparation

### Key Performance Requirements
- **Calculation Accuracy**: IPCC-compliant emission factors with <2% margin of error
- **Data Processing**: Real-time calculations for up to 1000+ data points
- **User Experience**: <3 second page load times, intuitive form interfaces
- **Compliance**: Full VSME and CSRD regulation compliance
- **Scalability**: Support for 1000+ companies, 10,000+ reports annually

## Technical Requirements

### Frontend Requirements

#### Dashboard & Navigation
- ✅ Responsive sidebar navigation with all ESG modules
- ✅ Company switcher for multi-company access
- ✅ Real-time status indicators and progress tracking
- ✅ Breadcrumb navigation and deep linking

#### Data Input & Visualization
- ✅ Advanced form components with validation
- ✅ Real-time calculation previews
- ✅ Interactive charts for emissions visualization (Recharts)
- ✅ Data tables with sorting, filtering, and export capabilities

#### User Experience
- ✅ shadcn/ui component library for consistency
- ✅ Responsive design for desktop/tablet/mobile
- ✅ Loading states and error handling
- ✅ Keyboard navigation and accessibility support

### Backend Requirements

#### API Architecture
- ✅ RESTful API design with consistent endpoints
- ✅ JWT authentication with role-based permissions
- ✅ Request validation and sanitization
- ✅ Comprehensive error handling and logging
- ✅ Rate limiting and security middleware

#### Data Processing
- ✅ Advanced calculation engine for emissions
- ✅ Multi-source emission factor database
- ✅ Real-time calculation APIs
- ✅ Data aggregation and reporting services
- ✅ Audit trail and change tracking

#### Integration Capabilities
- ✅ Demo data generation for testing
- ✅ Health check and monitoring endpoints
- ✅ Database seeding and migration support
- File upload and processing (to be implemented)
- External data source integration (to be implemented)

### Database Requirements

#### Core Data Models
- ✅ **Company Model**: Comprehensive business entity with multi-premise support
- ✅ **Report Model**: ESG reports with modular structure (B0-B11, C1-C9)
- ✅ **User Model**: Authentication and role management
- ✅ **EmissionFactor Model**: Multi-source emission factors database

#### Data Integrity & Performance
- ✅ Mongoose schema validation and constraints
- ✅ Compound indexes for optimal query performance
- ✅ Data sanitization and injection prevention
- ✅ Audit trails and change tracking

## Feature Specifications

### ESG Module Implementation Status

#### Basic Modules (B0-B11)
| Module | Frontend | Backend | Calculations | Status |
|--------|----------|---------|--------------|---------|
| B0: Company Info | ✅ Complete | ✅ Complete | N/A | Ready |
| B1: Preparation Basis | 🔄 UI Only | ❌ Pending | N/A | 40% |
| B2: Practices & Policies | 🔄 UI Only | ❌ Pending | N/A | 30% |
| B3: Energy & Emissions | ✅ Complete | ✅ Complete | ✅ Advanced | Ready |
| B4: Pollution | 🔄 UI Only | ❌ Pending | ❌ Pending | 20% |
| B5: Biodiversity | 🔄 UI Only | ❌ Pending | ❌ Pending | 20% |
| B6: Water | 🔄 UI Only | ❌ Pending | ❌ Pending | 20% |
| B7: Waste | 🔄 UI Only | ❌ Pending | ❌ Pending | 20% |
| B8: Workforce | ✅ Complete | ✅ Complete | ✅ Basic | Ready |
| B9: Health & Safety | 🔄 UI Only | ❌ Pending | ❌ Pending | 20% |
| B10: Remuneration | 🔄 UI Only | ❌ Pending | ❌ Pending | 20% |
| B11: Corruption | 🔄 UI Only | ❌ Pending | ❌ Pending | 20% |

#### Comprehensive Modules (C1-C9)
All comprehensive modules are at 10-15% completion (navigation structure only)

### Advanced Features Implemented

#### Emissions Calculation Engine
- **Scope 1 Calculations**:
  - ✅ Stationary combustion (fuel-based)
  - ✅ Mobile combustion (fuel/distance-based)
  - ✅ Fugitive emissions (refrigerants)
- **Scope 2 Calculations**:
  - ✅ Location-based electricity emissions
  - ✅ Market-based electricity emissions
  - ✅ Steam and district heating
- **Emission Factors**:
  - ✅ SEAI Ireland factors
  - ✅ Multi-country support (UK, Germany, France, Netherlands)
  - ✅ Automatic factor selection with fallbacks

#### Real-Time Features
- ✅ Live calculation previews in forms
- ✅ Real-time dashboard updates
- ✅ Backend health monitoring
- ✅ Progressive calculation saves

## API Specification Overview

### Core API Structure
- **Authentication**: `/api/auth/*` - JWT-based authentication
- **Companies**: `/api/companies/*` - Company CRUD operations
- **Reports**: `/api/reports/*` - ESG report management
- **Calculations**: `/api/calculations/*` - Emissions calculations
- **Demo**: `/api/demo/*` - Demo data and scenarios
- **References**: `/api/reference/*` - NACE codes, countries, factors

### Key Endpoints Implementation Status
- ✅ Health checks and system status
- ✅ Company management (CRUD)
- ✅ Report creation and updates
- ✅ Advanced emissions calculations
- ✅ Demo scenario management
- ❌ File upload and processing
- ❌ Export and reporting
- ❌ Analytics and dashboards
- ❌ User management (partial)

## Data Model Specifications

### Company Data Structure
```typescript
{
  companyProfile: {
    legalName: string,
    tradingName?: string,
    registrationNumber: string,
    taxIdentificationNumber?: string,
    primaryEmail: string,
    primaryPhone: string
  },
  headquarters: Address,
  industryClassification: {
    primaryNACECode: string,
    sectorType: string,
    industryDescription: string
  },
  operationalPremises: Premise[],
  corporateStructure: {
    ownershipType: string,
    stakeholders: Stakeholder[]
  }
}
```

### Report Data Structure
```typescript
{
  companyId: ObjectId,
  reportMetadata: {
    reportingPeriod: {
      startDate: Date,
      endDate: Date,
      fiscalYear: number
    },
    reportType: 'VSME' | 'Full ESG' | 'Sector-Specific'
  },
  basicModules: {
    b0_generalInformation: ModuleData,
    b3_energyGHGEmissions: {
      scope1Emissions: Scope1Data,
      scope2Emissions: Scope2Data,
      scope3Emissions: Scope3Data
    }
    // ... other modules
  },
  calculationResults: CalculationResults,
  auditTrail: AuditEntry[]
}
```

## Compliance & Regulatory Requirements

### VSME Regulation Compliance
- ✅ Irish SEAI emission factors implementation
- ✅ NACE code classification system
- ✅ EU taxonomy readiness markers
- ❌ CSRD reporting format compliance (pending)
- ❌ Double materiality assessment (pending)

### Data Protection & Security
- ✅ Input sanitization and XSS protection
- ✅ MongoDB injection prevention
- ✅ Rate limiting and DDoS protection
- ✅ Secure password handling
- ❌ GDPR compliance features (pending)
- ❌ Data retention policies (pending)

## Development Priorities

### Phase 1: Core Module Completion (Weeks 1-4)
1. Complete B1-B2 backend implementation
2. Implement B4-B7 calculation services
3. Complete B9-B11 data collection workflows
4. User management and authentication enhancement

### Phase 2: Advanced Features (Weeks 5-8)
1. File upload and document management
2. Report export (PDF, Excel, JSON)
3. Analytics dashboard implementation
4. Scope 3 calculation methodologies

### Phase 3: Compliance & Polish (Weeks 9-12)
1. CSRD compliance validation
2. External audit preparation features
3. Performance optimization
4. Production deployment readiness

## Success Metrics

### Technical Metrics
- **API Response Times**: <200ms for calculations, <100ms for CRUD operations
- **Database Performance**: <50ms average query time
- **Frontend Performance**: Lighthouse scores >90 for all areas
- **Test Coverage**: >85% backend, >70% frontend

### Business Metrics
- **Calculation Accuracy**: 100% compliance with SEAI/IPCC standards
- **User Adoption**: Successful onboarding completion >80%
- **Data Quality**: <5% validation error rate
- **Report Completion**: Average completion time <3 hours per report

### Platform Scalability
- **Concurrent Users**: Support 100+ simultaneous users
- **Data Volume**: Handle 10,000+ emissions data points per company
- **Geographic Coverage**: Multi-country emission factor support
- **Compliance Coverage**: 100% VSME requirement coverage

## Risk Assessment & Mitigation

### Technical Risks
- **Calculation Complexity**: Mitigated by comprehensive test suites and validation
- **Data Volume Scaling**: MongoDB indexing and query optimization implemented
- **Security Vulnerabilities**: Comprehensive middleware and validation layers

### Business Risks
- **Regulatory Changes**: Modular architecture allows rapid compliance updates
- **User Adoption**: Intuitive UI design and comprehensive demo functionality
- **Data Accuracy**: Multi-source validation and audit trail implementation

### Operational Risks
- **Performance Degradation**: Real-time monitoring and alerting systems
- **Data Loss**: Automated backups and disaster recovery procedures
- **Integration Failures**: Robust error handling and fallback mechanisms

---

*This PRD serves as the foundational document for parallel development teams working on the ESG platform. It provides comprehensive understanding of current implementation status and clear direction for remaining development work.*