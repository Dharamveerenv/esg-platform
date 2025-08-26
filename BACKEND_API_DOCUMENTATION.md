# ESG Platform Backend API Documentation

## Overview
This document provides comprehensive documentation for the ESG Platform Backend API, including all implemented endpoints, request/response formats, and usage examples.

**Base URL**: `http://localhost:3001/api`
**Version**: 1.0.0

## Authentication
All API endpoints (except authentication endpoints) require JWT authentication.

**Authentication Header**:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow a consistent format:

```json
{
  "status": "success|error",
  "data": {},
  "message": "Human readable message",
  "pagination": {} // Only for paginated responses
}
```

## Error Handling
Error responses include:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE",
  "details": {}
}
```

---

## Authentication Endpoints

### POST /api/auth/login
User authentication

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "userId",
      "email": "user@example.com",
      "profile": {},
      "companyAssociations": []
    },
    "token": "jwt-token",
    "refreshToken": "refresh-token"
  },
  "message": "Login successful"
}
```

### POST /api/auth/logout
Logout user

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "status": "success",
  "message": "Logout successful"
}
```

---

## User Management Endpoints

### GET /api/users
Get all users with filtering and pagination

**Headers**: `Authorization: Bearer <token>`
**Permissions**: Admin, Manager

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `company`: Filter by company ID
- `role`: Filter by user role
- `isActive`: Filter by active status (true/false)
- `search`: Search by name or email

**Response**:
```json
{
  "status": "success",
  "results": 10,
  "data": {
    "users": [
      {
        "id": "userId",
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "position": "Sustainability Manager"
        },
        "email": "john@example.com",
        "companyAssociations": [],
        "isActive": true
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /api/users/:id
Get single user details

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "userId",
      "profile": {},
      "authentication": {},
      "companyAssociations": [],
      "preferences": {},
      "activityLog": []
    }
  }
}
```

### POST /api/users
Create new user

**Headers**: `Authorization: Bearer <token>`
**Permissions**: SuperAdmin, CompanyAdmin

**Request Body**:
```json
{
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "position": "Manager",
    "department": "Sustainability",
    "phoneNumber": "+1234567890",
    "expertise": ["ESG", "Carbon Accounting"]
  },
  "companyId": "companyId",
  "role": "Manager",
  "permissions": [
    {
      "module": "B3",
      "actions": ["read", "write", "calculate"]
    }
  ],
  "sendInvitation": true
}
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "userId",
      "profile": {},
      "companyAssociations": [],
      "invitationToken": "invitation-token"
    }
  },
  "message": "User created and invitation sent"
}
```

### PATCH /api/users/:id
Update user profile

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "profile": {
    "firstName": "John Updated",
    "position": "Senior Manager"
  },
  "preferences": {
    "language": "en",
    "timezone": "Europe/Dublin",
    "notifications": {
      "email": true,
      "inApp": true
    }
  }
}
```

### PATCH /api/users/:userId/company/:companyId/role
Update user role and permissions

**Headers**: `Authorization: Bearer <token>`
**Permissions**: SuperAdmin, CompanyAdmin

**Request Body**:
```json
{
  "role": "Manager",
  "permissions": [
    {
      "module": "B3",
      "actions": ["read", "write", "approve"]
    }
  ]
}
```

---

## Report Management Endpoints

### GET /api/reports
Get all reports

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `companyId`: Filter by company
- `fiscalYear`: Filter by fiscal year
- `status`: Filter by report status
- `page`: Page number
- `limit`: Items per page

**Response**:
```json
{
  "status": "success",
  "results": 10,
  "data": {
    "reports": [
      {
        "id": "reportId",
        "companyId": "companyId",
        "reportMetadata": {
          "reportingPeriod": {
            "fiscalYear": 2024,
            "startDate": "2024-01-01",
            "endDate": "2024-12-31"
          },
          "reportType": "VSME"
        },
        "reportStatus": {
          "currentStatus": "Draft",
          "completionPercentage": 45
        }
      }
    ]
  }
}
```

### GET /api/reports/:id
Get single report details

**Headers**: `Authorization: Bearer <token>`

### POST /api/reports
Create new report

**Headers**: `Authorization: Bearer <token>`
**Permissions**: Admin, Manager, Editor

**Request Body**:
```json
{
  "companyId": "companyId",
  "reportMetadata": {
    "reportingPeriod": {
      "fiscalYear": 2024,
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "reportingFrequency": "Annual"
    },
    "reportType": "VSME",
    "reportingStandards": ["GRI", "TCFD"]
  },
  "moduleConfiguration": {
    "selectedBasicModules": ["B0", "B1", "B2", "B3"],
    "selectedComprehensiveModules": ["C1", "C2"]
  }
}
```

---

## ESG Module Endpoints

### B0: General Information

#### GET /api/reports/:reportId/b0
Get B0 module data

#### PUT /api/reports/:reportId/b0
Update B0 module data

**Request Body**:
```json
{
  "companyOverview": {
    "businessDescription": "Text description",
    "primarySector": "Technology",
    "geographicPresence": ["Ireland", "UK"]
  },
  "reportingScope": {
    "organizationalBoundary": "Legal control",
    "operationalBoundary": "All operations"
  },
  "materiality": {
    "materialTopics": ["Climate Change", "Employee Welfare"],
    "stakeholderEngagement": "Conducted quarterly surveys"
  },
  "completionStatus": "Complete"
}
```

### B1: Basis for Preparation

#### GET /api/reports/:reportId/b1
Get B1 module data

#### PUT /api/reports/:reportId/b1
Update B1 module data

**Request Body**:
```json
{
  "reportingFramework": {
    "primaryStandard": "GRI",
    "additionalStandards": ["TCFD", "SASB"],
    "frameworkVersion": "GRI 2021",
    "deviations": "No deviations"
  },
  "consolidationApproach": {
    "method": "Financial Control",
    "description": "We consolidate all subsidiaries under financial control",
    "subsidiariesIncluded": ["Subsidiary A", "Subsidiary B"],
    "exclusions": "Joint ventures excluded"
  },
  "reportingBoundary": {
    "organizationalBoundary": "All subsidiaries under financial control",
    "operationalBoundary": "All owned and controlled operations",
    "geographicBoundary": ["Ireland", "United Kingdom"],
    "temporalBoundary": "January 1 to December 31, 2024"
  },
  "completionStatus": "Complete"
}
```

#### POST /api/reports/:reportId/b1/validate
Validate B1 module completeness

**Response**:
```json
{
  "status": "success",
  "data": {
    "validation": {
      "isComplete": true,
      "missingFields": [],
      "warnings": [],
      "score": 100
    },
    "moduleData": {}
  }
}
```

### B2: Sustainability Practices

#### GET /api/reports/:reportId/b2
Get B2 module data

#### PUT /api/reports/:reportId/b2
Update B2 module data

**Request Body**:
```json
{
  "environmentalPractices": {
    "climateChange": {
      "hasPolicy": true,
      "policyDetails": "Comprehensive climate action policy",
      "implementationDate": "2023-01-01",
      "effectiveness": "High",
      "policyDocuments": [
        {
          "filename": "climate_policy.pdf",
          "url": "/uploads/documents/climate_policy.pdf",
          "uploadDate": "2024-01-15"
        }
      ]
    },
    "wasteManagement": {
      "hasPolicy": true,
      "policyDetails": "Zero waste to landfill policy",
      "effectiveness": "Medium"
    }
  },
  "socialPractices": {
    "employeeWellbeing": {
      "hasPolicy": true,
      "policyDetails": "Employee wellness program",
      "effectiveness": "High"
    }
  },
  "governancePractices": {
    "boardDiversity": {
      "hasPolicy": true,
      "policyDetails": "Board diversity targets",
      "effectiveness": "Medium"
    }
  },
  "completionStatus": "Complete"
}
```

#### POST /api/reports/:reportId/b2/validate
Validate B2 module and calculate effectiveness score

**Response**:
```json
{
  "status": "success",
  "data": {
    "validation": {
      "isComplete": true,
      "practicesSummary": {
        "environmental": { "total": 4, "implemented": 4, "effective": 3 },
        "social": { "total": 4, "implemented": 3, "effective": 2 },
        "governance": { "total": 4, "implemented": 4, "effective": 4 }
      },
      "recommendations": [],
      "effectivenessScore": 85
    },
    "implementationRate": 92
  }
}
```

### B3: Energy and GHG Emissions

#### GET /api/reports/:reportId/b3
Get B3 module data

#### PUT /api/reports/:reportId/b3
Update B3 module data

#### POST /api/reports/:reportId/b3/calculate
Calculate emissions

#### POST /api/reports/:reportId/b3/validate
Validate emissions data

---

## File Management Endpoints

### POST /api/files/upload
Upload single file

**Headers**: 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Permissions**: SuperAdmin, CompanyAdmin, Manager, Editor

**Request Body** (multipart/form-data):
```
file: [File]
category: "policy" | "certificate" | "report" | "evidence" | "other"
description: "File description"
tags: "tag1,tag2,tag3"
reportId: "reportId" (optional)
moduleId: "B1" (optional)
visibility: "private" | "company" | "public"
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "document": {
      "id": "documentId",
      "originalName": "policy_document.pdf",
      "category": "policy",
      "fileType": "document",
      "size": "2.5 MB",
      "uploadDate": "2024-01-15T10:30:00Z",
      "description": "Climate policy document",
      "tags": ["policy", "climate", "environment"]
    }
  },
  "message": "File uploaded successfully"
}
```

### POST /api/files/upload/multiple
Upload multiple files

**Headers**: 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body** (multipart/form-data):
```
files: [File, File, ...]
category: "policy"
description: "Multiple files"
tags: "tag1,tag2"
```

### GET /api/files
Get all documents with filtering

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `category`: Filter by category
- `fileType`: Filter by file type
- `reportId`: Filter by report
- `moduleId`: Filter by module
- `search`: Search in filename, description, tags
- `sortBy`: Sort field (default: uploadDate)
- `sortOrder`: asc or desc (default: desc)

**Response**:
```json
{
  "status": "success",
  "results": 15,
  "data": {
    "documents": [
      {
        "id": "documentId",
        "originalName": "file.pdf",
        "category": "policy",
        "fileType": "document",
        "size": "2.5 MB",
        "uploadDate": "2024-01-15T10:30:00Z",
        "uploadedBy": {
          "profile": {
            "firstName": "John",
            "lastName": "Doe"
          }
        },
        "description": "Policy document",
        "tags": ["policy", "climate"],
        "downloadCount": 5,
        "viewCount": 25
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalDocuments": 45,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /api/files/:id
Get document details

**Headers**: `Authorization: Bearer <token>`

### GET /api/files/:id/download
Download document

**Headers**: `Authorization: Bearer <token>`

**Response**: File download with appropriate headers

### PATCH /api/files/:id
Update document metadata

**Headers**: `Authorization: Bearer <token>`
**Permissions**: SuperAdmin, CompanyAdmin, Manager, Editor (or document owner)

**Request Body**:
```json
{
  "description": "Updated description",
  "tags": ["new", "tags"],
  "category": "certificate",
  "visibility": "company"
}
```

### POST /api/files/:id/versions
Upload new version of document

**Headers**: 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body**:
```
file: [File]
changes: "Description of changes in this version"
```

### DELETE /api/files/:id
Delete document (soft delete)

**Headers**: `Authorization: Bearer <token>`
**Permissions**: SuperAdmin, CompanyAdmin, Manager (or document owner)

### GET /api/files/:id/versions
Get all versions of a document

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "status": "success",
  "data": {
    "documentId": "documentId",
    "versions": [
      {
        "versionNumber": 2,
        "size": 1024000,
        "uploadDate": "2024-01-20T10:30:00Z",
        "uploadedBy": {
          "profile": {
            "firstName": "John",
            "lastName": "Doe"
          }
        },
        "changes": "Updated with new regulations",
        "isActive": true
      },
      {
        "versionNumber": 1,
        "size": 987000,
        "uploadDate": "2024-01-15T10:30:00Z",
        "changes": "Initial version",
        "isActive": false
      }
    ]
  }
}
```

### GET /api/files/stats/overview
Get file statistics

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "status": "success",
  "data": {
    "totalDocuments": 156,
    "totalSize": "2.3 GB",
    "categoryBreakdown": {
      "policy": 45,
      "certificate": 23,
      "report": 67,
      "evidence": 21
    },
    "fileTypeBreakdown": {
      "document": 120,
      "spreadsheet": 25,
      "image": 11
    },
    "storageUsed": 2468741120
  }
}
```

### GET /api/files/search
Search documents

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `q`: Search term (required)
- `category`: Filter by category
- `fileType`: Filter by file type
- `limit`: Number of results (default: 20)

**Response**:
```json
{
  "status": "success",
  "results": 8,
  "data": {
    "documents": [
      {
        "id": "documentId",
        "originalName": "climate_policy.pdf",
        "category": "policy",
        "relevanceScore": 0.95
      }
    ]
  }
}
```

### POST /api/files/bulk/delete
Bulk delete documents

**Headers**: `Authorization: Bearer <token>`
**Permissions**: SuperAdmin, CompanyAdmin

**Request Body**:
```json
{
  "documentIds": ["docId1", "docId2", "docId3"]
}
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "deletedCount": 3
  },
  "message": "3 documents deleted successfully"
}
```

---

## Company Management Endpoints

### GET /api/companies
Get all companies

### GET /api/companies/:id
Get company details

### POST /api/companies
Create new company

### PATCH /api/companies/:id
Update company

---

## Calculation Endpoints

### POST /api/calculations/emissions
Calculate emissions

### POST /api/calculations/electricity
Calculate electricity emissions

### POST /api/calculations/mobile
Calculate mobile emissions

### POST /api/calculations/fuel
Calculate fuel emissions

---

## Health Check Endpoints

### GET /health
Basic health check

**Response**:
```json
{
  "status": "success",
  "data": {
    "service": "VSME ESG Platform API",
    "environment": "development",
    "uptime": 12345.67,
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0.0"
  },
  "message": "Service is healthy"
}
```

### GET /api/health
API health check

---

## Rate Limiting
- **Rate Limit**: 1000 requests per hour per IP
- **File Upload Limit**: 10MB per file, 10 files per request
- **Endpoints excluded from rate limiting**: `/health`, `/api/health`

## Security Headers
- **Helmet**: Security headers enabled
- **CORS**: Configured for allowed origins
- **XSS Protection**: Enabled
- **MongoDB Injection Protection**: Enabled
- **Parameter Pollution Protection**: Enabled

## File Upload Security
- **File Type Validation**: Only allowed MIME types accepted
- **File Size Limits**: 10MB maximum per file
- **Virus Scanning**: Implemented (placeholder for production antivirus)
- **Secure Filename Generation**: Prevents directory traversal
- **File Processing**: Images optimized, spreadsheets validated

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| AUTHENTICATION_ERROR | 401 | Authentication required or failed |
| AUTHORIZATION_ERROR | 403 | Insufficient permissions |
| NOT_FOUND_ERROR | 404 | Resource not found |
| DUPLICATE_ERROR | 409 | Resource already exists |
| FILE_SIZE_ERROR | 413 | File too large |
| RATE_LIMIT_ERROR | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |

## Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/vsme-esg-platform

# Server
PORT=3001
HOST=localhost
NODE_ENV=development

# Security
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# Email (for invitations)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Rate Limiting
RATE_LIMIT_MAX=1000

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Development Setup

1. **Install Dependencies**:
```bash
cd backend
npm install
```

2. **Environment Setup**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start MongoDB**:
```bash
# Using Docker
docker run --name mongodb -d -p 27017:27017 mongo:latest

# Or install MongoDB locally
```

4. **Run Development Server**:
```bash
npm run dev
```

5. **Seed Database** (optional):
```bash
npm run seed
```

## Testing

Run the test suite:
```bash
npm test
```

For test coverage:
```bash
npm run test:coverage
```

## Production Deployment

1. **Set Environment Variables**:
```bash
export NODE_ENV=production
export MONGODB_URI=your-production-mongodb-uri
export JWT_SECRET=your-production-jwt-secret
```

2. **Start Application**:
```bash
npm start
```

## API Versioning
Current version: v1
Future versions will be available at `/api/v2/`, `/api/v3/`, etc.

## Support
For API support and questions, please refer to the development team or create an issue in the project repository.