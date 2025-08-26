# ESG Platform - API Specification

## Overview
Comprehensive REST API documentation for the ESG Platform backend services. All endpoints support JSON request/response format with JWT authentication.

## Base Configuration
- **Base URL**: `http://localhost:3001/api` (Development)
- **Authentication**: Bearer JWT tokens
- **Content-Type**: `application/json`
- **Rate Limiting**: 1000 requests/hour per IP
- **API Version**: v1 (implicit in all endpoints)

## Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "user_id",
  "email": "user@company.com",
  "companyId": "current_company_id",
  "role": "Admin|Manager|Editor|Viewer",
  "permissions": ["module:action"],
  "iat": 1640995200,
  "exp": 1640998800
}
```

### Response Format Standards
```json
{
  "status": "success|error",
  "data": {},
  "message": "Optional message",
  "token": "JWT token (auth endpoints only)",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

## Authentication Endpoints

### POST /api/auth/login
**Description**: Authenticate user and return JWT token

**Request Body**:
```json
{
  "email": "user@company.com",
  "password": "securePassword123",
  "mfaToken": "123456" // Optional 2FA token
}
```

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@company.com",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "position": "ESG Manager"
      },
      "companyAssociations": [
        {
          "companyId": "company_id",
          "role": "Admin",
          "permissions": ["b0:read", "b0:write", "b3:read", "b3:write"]
        }
      ]
    }
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

**Error Responses**:
- `401`: Invalid credentials
- `423`: Account locked due to too many failed attempts
- `428`: Two-factor authentication required

---

### POST /api/auth/register
**Description**: Register new user account

**Request Body**:
```json
{
  "email": "newuser@company.com",
  "password": "securePassword123",
  "firstName": "Jane",
  "lastName": "Smith",
  "position": "Sustainability Officer",
  "companyId": "existing_company_id" // Optional
}
```

**Response** (201):
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "new_user_id",
      "email": "newuser@company.com",
      "profile": {
        "firstName": "Jane",
        "lastName": "Smith",
        "position": "Sustainability Officer"
      }
    }
  },
  "token": "jwt_token_here"
}
```

---

### GET /api/auth/profile
**Description**: Get current user profile
**Authentication**: Required

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@company.com",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "position": "ESG Manager",
        "department": "Sustainability",
        "phoneNumber": "+353-1-234-5678",
        "avatar": "https://example.com/avatar.jpg"
      },
      "preferences": {
        "language": "en",
        "timezone": "Europe/Dublin",
        "currency": "EUR"
      }
    }
  }
}
```

---

## Company Management

### GET /api/companies
**Description**: Get all companies accessible to current user
**Authentication**: Required

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term for company name
- `sector`: Filter by sector type
- `country`: Filter by country

**Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "_id": "company_id",
      "companyProfile": {
        "legalName": "Green Tech Solutions Ltd",
        "tradingName": "GreenTech",
        "companyRegistrationNumber": "12345678",
        "primaryEmail": "info@greentech.com",
        "primaryPhone": "+353-1-234-5678",
        "website": "https://greentech.com"
      },
      "headquarters": {
        "street": "123 Innovation Drive",
        "city": "Dublin",
        "county": "Dublin",
        "country": "Ireland",
        "eircode": "D02X285"
      },
      "industryClassification": {
        "primaryNACECode": "62.01",
        "sectorType": "Technology",
        "industryDescription": "Computer programming activities"
      },
      "totalEmployees": 45,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 3,
    "pages": 1
  }
}
```

---

### POST /api/companies
**Description**: Create new company
**Authentication**: Required (Admin role)

**Request Body**:
```json
{
  "companyProfile": {
    "legalName": "New Company Ltd",
    "tradingName": "NewCo",
    "companyRegistrationNumber": "87654321",
    "primaryEmail": "info@newco.com",
    "primaryPhone": "+353-1-987-6543",
    "website": "https://newco.com"
  },
  "headquarters": {
    "street": "456 Business Park",
    "city": "Cork",
    "county": "Cork",
    "country": "Ireland",
    "eircode": "T12AB34"
  },
  "industryClassification": {
    "primaryNACECode": "01.11",
    "sectorType": "Agriculture",
    "industryDescription": "Growing of cereals"
  }
}
```

**Response** (201):
```json
{
  "status": "success",
  "data": {
    "_id": "new_company_id",
    "companyProfile": {
      "legalName": "New Company Ltd",
      // ... full company object
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### GET /api/companies/:id
**Description**: Get specific company details
**Authentication**: Required

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "_id": "company_id",
    "companyProfile": { /* complete company profile */ },
    "headquarters": { /* headquarters details */ },
    "operationalPremises": [
      {
        "premiseId": "premise_id",
        "name": "Main Production Facility",
        "type": "Production",
        "address": { /* premise address */ },
        "operationalDetails": {
          "floorArea": 5000,
          "employeeCount": 25,
          "operatingHours": "24/7",
          "certifications": ["ISO14001", "ISO45001"]
        }
      }
    ],
    "corporateStructure": {
      "ownershipType": "Private",
      "stakeholders": [
        {
          "name": "Main Investor Group",
          "type": "Investor",
          "ownershipPercentage": 75
        }
      ]
    }
  }
}
```

---

## Report Management

### GET /api/reports
**Description**: Get ESG reports for current company or all accessible companies
**Authentication**: Required

**Query Parameters**:
- `companyId`: Filter by specific company
- `fiscalYear`: Filter by reporting year
- `status`: Filter by report status
- `reportType`: Filter by report type (VSME, Full ESG)

**Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "_id": "report_id",
      "companyId": "company_id",
      "reportMetadata": {
        "reportingPeriod": {
          "startDate": "2024-01-01",
          "endDate": "2024-12-31",
          "fiscalYear": 2024,
          "reportingFrequency": "Annual"
        },
        "reportType": "VSME",
        "reportingStandards": ["GRI", "SASB"]
      },
      "reportStatus": {
        "currentStatus": "InProgress",
        "completionPercentage": 65,
        "lastModified": "2024-01-15T14:30:00Z"
      },
      "moduleConfiguration": {
        "selectedBasicModules": ["B0", "B1", "B3", "B8"],
        "selectedComprehensiveModules": ["C1", "C2"]
      }
    }
  ]
}
```

---

### POST /api/reports
**Description**: Create new ESG report
**Authentication**: Required (Editor role or above)

**Request Body**:
```json
{
  "companyId": "company_id",
  "reportingPeriod": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "fiscalYear": 2024
  },
  "reportType": "VSME",
  "selectedModules": {
    "basic": ["B0", "B1", "B2", "B3", "B8"],
    "comprehensive": []
  }
}
```

**Response** (201):
```json
{
  "status": "success",
  "data": {
    "_id": "new_report_id",
    "companyId": "company_id",
    "reportMetadata": { /* complete metadata */ },
    "reportStatus": {
      "currentStatus": "Draft",
      "completionPercentage": 0,
      "lastModified": "2024-01-15T15:00:00Z"
    },
    "basicModules": {
      "b0_generalInformation": {},
      "b1_basisForPreparation": {},
      // ... other selected modules initialized
    }
  }
}
```

---

## ESG Module Data Management

### GET /api/reports/:id/b0
**Description**: Get B0 (General Information) module data
**Authentication**: Required

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "companyOverview": {
      "businessDescription": "Leading provider of sustainable technology solutions",
      "principalActivities": ["Software Development", "Consulting", "Training"],
      "geographicPresence": ["Ireland", "United Kingdom"],
      "keyProducts": ["ESG Software", "Sustainability Consulting"]
    },
    "reportingScope": {
      "consolidationMethod": "Financial Control",
      "subsidiariesIncluded": ["GreenTech UK Ltd"],
      "jointVentures": [],
      "reportingBoundary": "All controlled entities"
    },
    "completionStatus": "Complete",
    "lastUpdated": "2024-01-10T12:00:00Z"
  }
}
```

---

### PUT /api/reports/:id/b0
**Description**: Update B0 module data
**Authentication**: Required (Editor role or above)

**Request Body**:
```json
{
  "companyOverview": {
    "businessDescription": "Updated business description",
    "principalActivities": ["Software Development", "Consulting", "Training", "Research"],
    "geographicPresence": ["Ireland", "United Kingdom", "Germany"],
    "keyProducts": ["ESG Software", "Sustainability Consulting", "Carbon Tracking"]
  },
  "reportingScope": {
    "consolidationMethod": "Financial Control",
    "subsidiariesIncluded": ["GreenTech UK Ltd", "GreenTech DE GmbH"],
    "reportingBoundary": "All controlled entities and 50%+ owned joint ventures"
  }
}
```

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "companyOverview": { /* updated data */ },
    "reportingScope": { /* updated data */ },
    "completionStatus": "Complete",
    "lastUpdated": "2024-01-15T16:30:00Z"
  }
}
```

---

### GET /api/reports/:id/b3
**Description**: Get B3 (Energy & GHG Emissions) module data
**Authentication**: Required

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "scope1Emissions": {
      "stationaryCombustion": [
        {
          "fuelType": "Natural Gas",
          "consumption": 50000,
          "unit": "m3",
          "emissionFactor": 2.02,
          "calculatedEmissions": 101000,
          "calculationDate": "2024-01-15T10:00:00Z"
        }
      ],
      "mobileCombustion": [
        {
          "vehicleType": "Car",
          "fuelType": "Diesel",
          "consumption": 2500,
          "unit": "litre",
          "calculatedEmissions": 6675
        }
      ],
      "totalScope1": 107675
    },
    "scope2Emissions": {
      "locationBased": {
        "electricityConsumption": 150000,
        "unit": "kWh",
        "gridEmissionFactor": 0.2263,
        "calculatedEmissions": 33945
      },
      "marketBased": {
        "electricityConsumption": 150000,
        "renewableEnergyConsumption": 105000,
        "calculatedEmissions": 11193
      },
      "totalScope2": 33945
    },
    "energyConsumption": {
      "totalEnergyConsumption": 540000,
      "renewableEnergyPercentage": 70,
      "energyIntensity": 12.5
    },
    "completionStatus": "Complete",
    "lastUpdated": "2024-01-15T14:15:00Z"
  }
}
```

---

### PUT /api/reports/:id/b3/scope1
**Description**: Update Scope 1 emissions data
**Authentication**: Required (Editor role or above)

**Request Body**:
```json
{
  "stationaryCombustion": [
    {
      "fuelType": "Natural Gas",
      "consumption": 52000,
      "unit": "m3",
      "facilityLocation": "Main Office"
    },
    {
      "fuelType": "Diesel",
      "consumption": 1500,
      "unit": "litre",
      "facilityLocation": "Backup Generator"
    }
  ],
  "mobileCombustion": [
    {
      "vehicleType": "Car",
      "fuelType": "Diesel",
      "consumption": 2800,
      "unit": "litre",
      "calculationMethod": "fuel-based"
    }
  ],
  "fugitiveEmissions": [
    {
      "type": "R-404A",
      "quantityLeaked": 5.2,
      "equipmentType": "Commercial Refrigeration"
    }
  ]
}
```

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "scope1Emissions": {
      "stationaryCombustion": [ /* calculated results */ ],
      "mobileCombustion": [ /* calculated results */ ],
      "fugitiveEmissions": [ /* calculated results */ ],
      "totalScope1": 115432
    },
    "lastUpdated": "2024-01-15T17:00:00Z"
  }
}
```

---

## Calculation Services

### POST /api/calculations/scope1/stationary
**Description**: Calculate Scope 1 stationary combustion emissions
**Authentication**: Required

**Request Body**:
```json
{
  "fuelData": [
    {
      "fuelType": "Natural Gas",
      "quantity": 50000,
      "unit": "m3"
    },
    {
      "fuelType": "Diesel",
      "quantity": 2000,
      "unit": "litre"
    }
  ],
  "country": "Ireland"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "scope": "Scope 1",
    "category": "Stationary Combustion",
    "country": "Ireland",
    "calculations": [
      {
        "fuelType": "Natural Gas",
        "consumption": 50000,
        "unit": "m3",
        "emissionFactor": 2.02,
        "co2Emissions": 101000,
        "totalCo2eEmissions": 101000,
        "factorSource": "SEAI",
        "methodology": "IPCC Tier 1 approach with country-specific factors"
      },
      {
        "fuelType": "Diesel",
        "consumption": 2000,
        "unit": "litre",
        "emissionFactor": 2.67,
        "co2Emissions": 5340,
        "totalCo2eEmissions": 5340,
        "factorSource": "SEAI"
      }
    ],
    "totalCo2e": 106340,
    "calculatedAt": "2024-01-15T18:00:00Z"
  }
}
```

---

### POST /api/calculations/scope2/electricity
**Description**: Calculate Scope 2 electricity emissions
**Authentication**: Required

**Request Body**:
```json
{
  "electricityData": [
    {
      "country": "Ireland",
      "quantity": 150000,
      "unit": "kWh",
      "renewableEnergyConsumption": 105000
    }
  ],
  "method": "location"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "scope": "Scope 2",
    "category": "Electricity",
    "method": "location",
    "calculations": [
      {
        "method": "Location-based",
        "country": "Ireland",
        "consumption": 150000,
        "unit": "kWh",
        "gridFactor": 0.2263,
        "emissions": 33945,
        "factorSource": "SEAI"
      }
    ],
    "totalScope2Emissions": 33945,
    "calculatedAt": "2024-01-15T18:15:00Z"
  }
}
```

---

### POST /api/calculations/comprehensive
**Description**: Calculate comprehensive emissions (all scopes)
**Authentication**: Required

**Request Body**:
```json
{
  "scope1": {
    "stationaryCombustion": [
      { "fuelType": "Natural Gas", "quantity": 50000, "unit": "m3" }
    ],
    "mobileCombustion": [
      { "fuelType": "Diesel", "quantity": 2500, "unit": "litre", "calculationMethod": "fuel-based" }
    ]
  },
  "scope2": {
    "electricityData": [
      { "country": "Ireland", "quantity": 150000, "unit": "kWh" }
    ]
  },
  "country": "Ireland",
  "revenueData": {
    "revenue": 2500000,
    "currency": "EUR"
  }
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "comprehensive": true,
    "scope1": {
      "stationary": { "totalCo2e": 101000, "calculations": [...] },
      "mobile": { "totalMobileEmissions": 6675, "vehicleCalculations": [...] },
      "total": 107675
    },
    "scope2": {
      "locationBased": { "totalScope2Emissions": 33945, "calculations": [...] },
      "total": 33945
    },
    "total": 141620,
    "emissionIntensity": {
      "value": 0.057,
      "unit": "kg CO2e per EUR",
      "revenue": 2500000
    },
    "calculatedAt": "2024-01-15T18:30:00Z"
  }
}
```

---

## Demo & Testing Endpoints

### GET /api/demo/scenarios
**Description**: Get available demo calculation scenarios
**Authentication**: Optional

**Response** (200):
```json
{
  "success": true,
  "data": {
    "company": {
      "name": "Green Manufacturing Co.",
      "sector": "Manufacturing",
      "employees": 125,
      "locations": ["Dublin, Ireland"]
    },
    "scenarios": [
      {
        "name": "Current Operations",
        "id": "current-operations",
        "description": "Baseline operations with current energy mix and fleet"
      },
      {
        "name": "Renewable Energy Upgrade",
        "id": "renewable-energy-upgrade", 
        "description": "Upgraded to 70% renewable electricity consumption"
      },
      {
        "name": "Fleet Electrification",
        "id": "fleet-electrification",
        "description": "50% fleet electrification with additional charging infrastructure"
      }
    ]
  }
}
```

---

### GET /api/demo/baseline
**Description**: Get baseline demo company with live calculations
**Authentication**: Optional

**Response** (200):
```json
{
  "success": true,
  "data": {
    "company": {
      "name": "Green Manufacturing Co.",
      "sector": "Manufacturing",
      "employees": 125,
      "revenue": 12500000
    },
    "scenario": "Current Operations (Baseline)",
    "calculations": {
      "scope1": { "total": 145280 },
      "scope2": { "total": 67320 },
      "total": 212600,
      "emissionIntensity": { "value": 0.017, "unit": "kg CO2e per EUR" }
    },
    "emissionsBreakdown": {
      "scope1": {
        "stationary": 89450,
        "mobile": 45830,
        "fugitive": 10000,
        "total": 145280
      },
      "scope2": {
        "electricity": 67320,
        "total": 67320
      },
      "total": 212600
    }
  }
}
```

---

## Reference Data Endpoints

### GET /api/reference/nace-codes
**Description**: Get NACE classification codes
**Authentication**: Optional

**Query Parameters**:
- `level`: Filter by NACE level (1-4)
- `search`: Search in code or description
- `parentCode`: Get children of specific code

**Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "code": "01.11",
      "level": 4,
      "parentCode": "01.1",
      "title": "Growing of cereals (except rice), leguminous crops and oil seeds",
      "description": "This class includes: growing of maize, wheat, barley, oats, rye, rice, etc.",
      "includes": ["wheat", "barley", "oats", "maize", "rice"],
      "excludes": ["growing of rice"]
    }
  ]
}
```

---

### GET /api/reference/countries
**Description**: Get supported countries with emission factors
**Authentication**: Optional

**Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "code": "IE",
      "name": "Ireland",
      "region": "Western Europe",
      "currency": "EUR",
      "gridEmissionFactor": 0.2263,
      "regulatoryFrameworks": ["VSME", "EU-Taxonomy", "CSRD"],
      "languages": ["en", "ga"]
    },
    {
      "code": "GB",
      "name": "United Kingdom", 
      "region": "Western Europe",
      "currency": "GBP",
      "gridEmissionFactor": 0.2080,
      "regulatoryFrameworks": ["UK-TCFD"],
      "languages": ["en"]
    }
  ]
}
```

---

### GET /api/emission-factors
**Description**: Get emission factors database
**Authentication**: Optional

**Query Parameters**:
- `category`: Scope1, Scope2, Scope3
- `fuelType`: Specific fuel type
- `country`: Country filter
- `source`: Factor source (SEAI, DEFRA, etc.)

**Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "_id": "factor_id",
      "factorMetadata": {
        "category": "Scope1",
        "subCategory": "Stationary",
        "source": "SEAI",
        "version": "2024",
        "validFrom": "2024-01-01",
        "validTo": "2024-12-31"
      },
      "geographicScope": {
        "country": "Ireland"
      },
      "fuelSpecifications": {
        "fuelType": "Natural Gas",
        "description": "Natural gas used for heating and process applications"
      },
      "emissionFactorData": {
        "co2Factor": 2.02,
        "totalCo2eFactor": 2.02,
        "unit": "m3",
        "uncertainty": 5,
        "confidenceLevel": "High"
      }
    }
  ]
}
```

---

## Export & Analytics

### GET /api/reports/:id/export?format=pdf
**Description**: Export report in specified format
**Authentication**: Required

**Query Parameters**:
- `format`: pdf, excel, json, xml
- `template`: standard, detailed, summary
- `sections`: Comma-separated list of sections to include

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "downloadUrl": "https://api.example.com/downloads/report_123.pdf",
    "fileSize": 2048576,
    "expiresAt": "2024-01-16T18:00:00Z",
    "format": "pdf",
    "sections": ["summary", "emissions", "calculations"]
  }
}
```

---

### GET /api/reports/:id/analytics
**Description**: Get analytics for specific report
**Authentication**: Required

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "emissionsTrend": [
      { "year": 2022, "total": 195000, "scope1": 120000, "scope2": 75000 },
      { "year": 2023, "total": 180000, "scope1": 115000, "scope2": 65000 },
      { "year": 2024, "total": 165000, "scope1": 110000, "scope2": 55000 }
    ],
    "industryBenchmark": {
      "sectorAverage": 185000,
      "performanceRanking": "Top 25%",
      "improvementOpportunities": [
        "Energy efficiency improvements",
        "Renewable energy adoption"
      ]
    },
    "keyMetrics": {
      "emissionIntensity": 0.017,
      "renewableEnergyPercentage": 45,
      "emissionReductionRate": 8.1
    }
  }
}
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for required fields",
    "details": [
      {
        "field": "companyProfile.legalName",
        "message": "Legal name is required"
      }
    ]
  },
  "requestId": "req_123456789"
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Request validation failed
- `UNAUTHORIZED` (401): Authentication required or invalid
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource conflict (e.g., duplicate email)
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error
- `SERVICE_UNAVAILABLE` (503): Service temporarily unavailable

### Field Validation Rules
- **Email**: Valid email format, unique across users
- **Company Registration Number**: 6-8 digits, unique
- **NACE Code**: Valid format XX.XX, exists in reference database
- **Eircode**: Valid Irish postal code format
- **Emission Values**: Positive numbers, reasonable ranges
- **Dates**: Valid ISO 8601 format, logical date ranges
- **Percentages**: 0-100 range for percentage fields

---

## Rate Limiting & Performance

### Rate Limits
- **Authentication**: 10 requests/minute per IP
- **General API**: 1000 requests/hour per authenticated user
- **Calculation APIs**: 100 requests/hour per user
- **Export APIs**: 20 requests/hour per user

### Response Time Targets
- **Authentication**: <200ms
- **CRUD Operations**: <100ms
- **Simple Calculations**: <500ms
- **Complex Calculations**: <2000ms
- **Report Export**: <30 seconds

### Pagination Standards
- Default page size: 20 items
- Maximum page size: 100 items
- Consistent pagination format across all list endpoints
- Total count provided for UI pagination controls

---

## Security Headers & Compliance

### Required Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
Accept: application/json
X-Requested-With: XMLHttpRequest
```

### Security Measures
- CORS configuration for frontend domains
- XSS protection with helmet middleware
- SQL injection prevention with parameterized queries
- Rate limiting per IP and user
- Request size limits (10MB max)
- File upload validation and virus scanning

### GDPR Compliance
- Data export endpoints for user data
- Data deletion capabilities with audit trails
- Consent management for data processing
- Data retention policy enforcement
- Privacy-by-design in all endpoints

---

*This API specification provides comprehensive documentation for all current and planned endpoints, enabling frontend developers and integration partners to build robust ESG platform interactions.*