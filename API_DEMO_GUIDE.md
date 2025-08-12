# API Demo Guide

## Overview

This guide demonstrates how to use the VSME ESG Platform API client with the existing frontend components. The API client provides a comprehensive interface to interact with the backend ESG reporting system.

## Quick Start

### 1. Environment Setup

```bash
# Copy environment configuration
cp .env.example .env.local

# Edit .env.local and set your API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Access Demo Page

Navigate to `/demo` in your application to access the interactive API demo dashboard.

### 3. Run Quick Test

Click "Quick API Test" to verify basic API connectivity and reference data availability.

### 4. Run Complete Workflow

Click "Complete Workflow Demo" to execute a full demonstration including:
- API health check
- Company management
- Report creation
- ESG data entry
- Emissions calculations
- Analytics generation

## API Client Features

### Authentication
- JWT-based authentication with refresh tokens
- Multi-factor authentication support
- Role-based access control
- Session management

### Company Management
- Create and manage companies
- Multi-company user associations
- Role-based permissions per company

### ESG Reporting
- Create and manage ESG reports
- Support for all VSME ESG modules (B0-B11)
- Real-time calculation engine
- Progress tracking and status management

### Calculations
- Scope 1, 2, and 3 emissions calculations
- Workforce metrics calculations
- Emission factor database integration
- Multi-source emission factors (SEAI, UK Gov, EPA, etc.)

### Analytics
- Report analytics and visualizations
- Trend analysis
- Benchmark comparisons
- Export capabilities (PDF, Excel, JSON)

## Integration Examples

### 1. Login Form Integration

```typescript
import { demoUtils } from '@/lib/demo-integration';

const handleLogin = async (credentials) => {
  const result = await demoUtils.auth.performDemoLogin(credentials);
  if (result.success) {
    // Handle successful login
    setUser(result.user);
    router.push('/dashboard');
  } else {
    // Handle login error
    setError(result.message);
  }
};
```

### 2. Company Switcher Integration

```typescript
import { demoUtils } from '@/lib/demo-integration';

const fetchCompanies = async () => {
  try {
    const companies = await demoUtils.companies.fetchUserCompanies();
    setCompanies(companies);
  } catch (error) {
    console.error('Failed to fetch companies:', error);
  }
};
```

### 3. ESG Module Data Integration

```typescript
import { demoUtils } from '@/lib/demo-integration';

const saveB3Data = async (reportId, emissionsData) => {
  try {
    await demoUtils.modules.updateModuleData(reportId, 'b3', emissionsData);
    // Trigger calculations
    const results = await demoUtils.modules.performDemoEmissionsCalculation(reportId);
    setCalculationResults(results);
  } catch (error) {
    console.error('Failed to save B3 data:', error);
  }
};
```

### 4. Chart Data Integration

```typescript
import { demoUtils } from '@/lib/demo-integration';

const fetchChartData = async (reportId) => {
  try {
    const analytics = await demoUtils.analytics.getReportAnalytics(reportId);
    // Transform data for chart component
    const chartData = transformAnalyticsData(analytics);
    setChartData(chartData);
  } catch (error) {
    console.error('Failed to fetch chart data:', error);
  }
};
```

## Available Demo Services

### DemoAuthenticationService
- `performDemoLogin(credentials)` - Handle user authentication
- `performDemoLogout()` - Handle user logout
- `isUserAuthenticated()` - Check authentication status
- `getCurrentUser()` - Get current user profile

### DemoCompanyService
- `fetchUserCompanies()` - Get all user companies
- `createDemoCompany()` - Create demo company
- `getCompanyDetails(companyId)` - Get company details

### DemoReportService
- `fetchCompanyReports(companyId)` - Get company reports
- `createDemoReport(companyId)` - Create demo report
- `getReportDetails(reportId)` - Get report details
- `updateReportStatus(reportId, status)` - Update report status

### DemoESGModuleService
- `getB3Data(reportId)` - Get B3 emissions data
- `getB8Data(reportId)` - Get B8 workforce data
- `performDemoEmissionsCalculation(reportId)` - Calculate emissions
- `updateModuleData(reportId, moduleId, data)` - Update module data

### DemoAnalyticsService
- `getReportAnalytics(reportId)` - Get analytics data
- `getReportSummary(reportId)` - Get report summary

### DemoWorkflowOrchestrator
- `executeCompleteDemo()` - Run complete workflow demo
- `executeQuickDemo()` - Run quick API test

## API Client Direct Usage

```typescript
import { apiClient } from '@/lib/api-client';

// Authentication
const loginResponse = await apiClient.login({ email, password });

// Companies
const companies = await apiClient.getCompanies();
const company = await apiClient.getCompany(companyId);

// Reports
const reports = await apiClient.getReports(companyId);
const report = await apiClient.createReport(reportData);

// ESG Modules
const b3Data = await apiClient.getB3Data(reportId);
await apiClient.updateB3Scope1(reportId, scope1Data);
const calculations = await apiClient.calculateB3Emissions(reportId);

// Analytics
const analytics = await apiClient.getReportAnalytics(reportId);
const summary = await apiClient.getReportSummary(reportId);

// Export
const exportResponse = await apiClient.exportReport(reportId, 'pdf');
```

## Error Handling

The API client includes comprehensive error handling:

```typescript
try {
  const result = await apiClient.getReports(companyId);
  if (result.status === 'success') {
    // Handle success
    setReports(result.data);
  } else {
    // Handle API error
    setError(result.message);
  }
} catch (error) {
  // Handle network/request error
  console.error('Request failed:', error);
  setError('Network error occurred');
}
```

## Backend Integration

The API client is designed to work with the comprehensive backend system that includes:

- **MongoDB Database**: User, Company, Report, and EmissionFactor models
- **JWT Authentication**: Secure token-based authentication with MFA support
- **Calculation Engine**: Advanced emissions and workforce calculations
- **Emission Factor Database**: Multi-source factors from SEAI, UK Gov, EPA, etc.
- **Role-Based Access**: Granular permissions for different user roles
- **Export System**: PDF, Excel, and JSON export capabilities

## Testing

Use the demo page (`/demo`) to:
1. Test API connectivity
2. Verify authentication flows
3. Test CRUD operations
4. Validate calculation accuracy
5. Check export functionality
6. Monitor performance

## Production Considerations

When deploying to production:
1. Update `NEXT_PUBLIC_API_URL` to your production API endpoint
2. Implement proper error boundaries
3. Add loading states for all async operations
4. Implement proper authentication state management
5. Add offline support where appropriate
6. Monitor API performance and errors

## Support

For issues or questions about the API integration:
1. Check the demo page for working examples
2. Review the integration analysis document
3. Test individual API endpoints using the demo utilities
4. Verify backend connectivity and authentication