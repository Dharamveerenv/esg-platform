# Quick Start Development Guide
## Get Your ESG Dashboard Running in 30 Minutes

## 🚀 **Immediate Setup (Next 30 Minutes)**

### **Step 1: Environment Setup (5 minutes)**

1. **Clone and Setup**
```bash
# If not already done
cd your-esg-project
npm install

# Backend setup
cd backend
npm install
```

2. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
MONGODB_URI=mongodb://localhost:27017/vsme-esg-platform
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
NODE_ENV=development
PORT=3001
```

### **Step 2: Database Setup (10 minutes)**

1. **Install MongoDB (if not installed)**
```bash
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) - recommended
# Get connection string from https://cloud.mongodb.com
```

2. **Test Database Connection**
```bash
# In backend directory
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vsme-esg-platform')
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database error:', err));
"
```

### **Step 3: Complete Critical Backend Files (10 minutes)**

1. **Create Missing Utility Files**
```bash
# In backend directory
mkdir -p utils middleware

# Create AppError utility
cat > utils/appError.js << 'EOF'
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
EOF

# Create catchAsync utility
cat > utils/catchAsync.js << 'EOF'
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
EOF

# Create error handler middleware
cat > middleware/errorHandler.js << 'EOF'
const AppError = require('../utils/appError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
};
EOF
```

2. **Create Basic Company Routes**
```bash
cat > routes/companyRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();

// Demo company routes for quick start
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: {
      companies: [
        {
          _id: 'demo-company-1',
          companyProfile: {
            legalName: 'Green Tech Solutions Ltd',
            tradingName: 'GreenTech'
          },
          headquarters: {
            city: 'Dublin',
            country: 'Ireland'
          },
          industryClassification: {
            sectorType: 'Technology'
          },
          totalEmployees: 150
        }
      ]
    }
  });
});

router.get('/:id', (req, res) => {
  res.json({
    status: 'success',
    data: {
      company: {
        _id: req.params.id,
        companyProfile: {
          legalName: 'Green Tech Solutions Ltd',
          tradingName: 'GreenTech',
          primaryEmail: 'info@greentech.com',
          primaryPhone: '+353-1-234-5678'
        },
        headquarters: {
          street: '123 Innovation Drive',
          city: 'Dublin',
          county: 'Dublin',
          country: 'Ireland'
        }
      }
    }
  });
});

module.exports = router;
EOF
```

3. **Create Basic Report Routes**
```bash
cat > routes/reportRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();

// Demo report routes
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: {
      reports: [
        {
          _id: 'demo-report-1',
          companyId: 'demo-company-1',
          reportMetadata: {
            reportType: 'VSME',
            reportingPeriod: {
              fiscalYear: 2024,
              startDate: '2024-01-01',
              endDate: '2024-12-31'
            }
          },
          reportStatus: {
            currentStatus: 'InProgress',
            completionPercentage: 45
          },
          calculationResults: {
            ghgEmissionsSummary: {
              totalGHGEmissions: 1250.5,
              totalScope1: 850.2,
              totalScope2: 400.3
            }
          }
        }
      ]
    }
  });
});

module.exports = router;
EOF
```

### **Step 4: Start the Backend (2 minutes)**

```bash
# In backend directory
npm run dev

# You should see:
# 🚀 VSME ESG Platform Backend Server Started
# 🌐 Server running at: http://localhost:3001
# ✅ MongoDB connected successfully
```

### **Step 5: Test Backend API (3 minutes)**

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test auth endpoint
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@greentech.com","password":"demo123"}'

# Test companies endpoint
curl http://localhost:3001/api/companies
```

## 🎯 **Next 30 Minutes: Frontend Integration**

### **Step 6: Update Frontend API Client (5 minutes)**

1. **Update API Base URL**
```typescript
// src/lib/api-client.ts - Update the constructor
constructor(baseURL: string = 'http://localhost:3001/api') {
  this.baseURL = baseURL;
  // ... rest of constructor
}
```

2. **Test API Connection**
```bash
# In project root (frontend)
npm run dev

# Open browser to http://localhost:3000
# Try logging in with: demo@greentech.com / demo123
```

### **Step 7: Create Basic Dashboard Pages (15 minutes)**

1. **Enhanced Dashboard Home**
```bash
# Create new dashboard page
cat > src/app/dashboard/page.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';
import { Building, FileText, Zap, Users } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    companies: 0,
    reports: 0,
    totalEmissions: 0,
    employees: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [companiesRes, reportsRes] = await Promise.all([
        apiClient.getCompanies(),
        apiClient.getReports()
      ]);

      setStats({
        companies: companiesRes.data?.length || 0,
        reports: reportsRes.data?.length || 0,
        totalEmissions: reportsRes.data?.[0]?.calculationResults?.ghgEmissionsSummary?.totalGHGEmissions || 0,
        employees: 150 // Demo data
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ESG Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your sustainability performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.companies}</div>
            <p className="text-xs text-muted-foreground">
              Active organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reports}</div>
            <p className="text-xs text-muted-foreground">
              ESG reports created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalEmissions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              kg CO2e this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.employees}</div>
            <p className="text-xs text-muted-foreground">
              Total workforce
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates to your ESG data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">B3 Emissions data updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New report created</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-muted rounded-md">
                📊 Create New Report
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded-md">
                ⚡ Update Emissions Data
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded-md">
                👥 Manage Workforce Data
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded-md">
                📈 View Analytics
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
EOF
```

2. **Create Reports Page**
```bash
cat > src/app/dashboard/reports/page.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import { Plus, FileText, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
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

  if (isLoading) {
    return <div className="p-6">Loading reports...</div>;
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
        {reports.map((report, index) => (
          <Card key={report._id || index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {report.reportMetadata?.reportType} {report.reportMetadata?.reportingPeriod?.fiscalYear}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Company Report
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {report.reportStatus?.currentStatus || 'Draft'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {report.reportMetadata?.reportingPeriod?.startDate} - 
                  {report.reportMetadata?.reportingPeriod?.endDate}
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
              Create your first ESG report to get started
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
EOF
```

### **Step 8: Update Navigation (5 minutes)**

```bash
# Update the sidebar to include new routes
# Edit src/components/app-sidebar.tsx to add:
# - Dashboard overview
# - Reports management
# - Companies
# - Analytics
```

### **Step 9: Test Complete Flow (5 minutes)**

1. **Start both servers**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

2. **Test the flow**
- Visit http://localhost:3000
- Login with demo credentials
- Navigate to dashboard
- Check reports page
- Verify API calls in browser dev tools

## 🎉 **You Now Have a Working ESG Dashboard!**

### **What You've Accomplished:**
- ✅ Backend API running with demo data
- ✅ Frontend connected to backend
- ✅ Basic authentication flow
- ✅ Dashboard with real API integration
- ✅ Reports management interface
- ✅ Company data display

### **Next Steps (Choose Your Priority):**

1. **Add Real Database Data** (30 minutes)
   - Complete MongoDB setup
   - Add real emission factors
   - Create sample companies and reports

2. **Implement B3 Emissions Module** (2 hours)
   - Build emissions data entry forms
   - Connect calculation engine
   - Add real-time calculations

3. **Enhance UI/UX** (1 hour)
   - Add loading states
   - Improve error handling
   - Add data visualization charts

4. **Add Authentication** (1 hour)
   - Complete user registration
   - Add role-based access
   - Implement MFA

### **Development Commands:**
```bash
# Backend development
cd backend && npm run dev

# Frontend development  
npm run dev

# Run both with concurrently (optional)
npm install -g concurrently
concurrently "cd backend && npm run dev" "npm run dev"
```

### **Troubleshooting:**
- **MongoDB connection issues**: Check if MongoDB is running
- **API 404 errors**: Verify backend server is running on port 3001
- **CORS issues**: Check CORS configuration in backend/server.js
- **Frontend build errors**: Run `npm install` and check Node.js version

You now have a solid foundation for your ESG dashboard! The next phase would be implementing the specific ESG modules and calculations based on your requirements.