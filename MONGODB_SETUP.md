# MongoDB Configuration Guide for VSME ESG Platform

## Quick Setup Options

### Option 1: Local MongoDB (Development)

1. **Install MongoDB Community Edition**
   ```bash
   # macOS with Homebrew
   brew install mongodb-community
   brew services start mongodb-community

   # Ubuntu/Debian
   sudo apt-get install mongodb

   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Create Database Directory**
   ```bash
   sudo mkdir -p /data/db
   sudo chown -R `id -un` /data/db
   ```

3. **Start MongoDB Service**
   ```bash
   # macOS/Linux
   mongod

   # Windows
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
   ```

4. **Environment Configuration**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   
   # Update MongoDB URI
   MONGODB_URI=mongodb://localhost:27017/vsme-esg-platform
   ```

### Option 2: MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free tier (512MB storage)
   - Create new project: "VSME ESG Platform"

2. **Create Database Cluster**
   - Click "Build a Database"
   - Choose "Shared" (Free tier)
   - Select region closest to you
   - Cluster name: "vsme-esg-cluster"

3. **Database Security Setup**
   ```
   Database Access:
   - Username: vsme-admin
   - Password: [Generate strong password]
   - Built-in Role: Atlas admin

   Network Access:
   - Add IP Address: 0.0.0.0/0 (for development)
   - For production: Add specific IP addresses
   ```

4. **Get Connection String**
   ```
   - Click "Connect" → "Connect your application"
   - Driver: Node.js
   - Copy connection string
   ```

5. **Environment Configuration**
   ```bash
   # Update .env file
   MONGODB_URI=mongodb+srv://vsme-admin:YOUR_PASSWORD@vsme-esg-cluster.xxxxx.mongodb.net/vsme-esg-platform?retryWrites=true&w=majority
   ```

## Database Structure

### Collections Overview
```
vsme-esg-platform/
├── users                 # User accounts and authentication
├── companies            # Company profiles and premises
├── reports              # ESG reports with modules
├── emissionfactors      # Emission calculation factors
├── refrigerantgwps      # Refrigerant GWP values
├── nacecodes           # Industry classification
├── countries           # Geographic reference data
├── sustainabilitystandards # Reporting frameworks
├── auditlogs           # System audit trail
└── sessions            # User sessions (TTL indexed)
```

### Estimated Storage Usage (Free Tier: 512MB)
```
- Emission Factors: ~50MB
- Reference Data: ~10MB
- User Data: ~5MB (100 users)
- Company Data: ~20MB (50 companies)
- Reports: ~400MB (500 reports)
- Audit Logs: ~25MB
```

## Performance Optimization

### Essential Indexes (Auto-created by backend)
```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ "companyAssociations.companyId": 1 })

// Companies
db.companies.createIndex({ "companyProfile.legalName": "text" })
db.companies.createIndex({ "industryClassification.primaryNACECode": 1 })

// Reports
db.reports.createIndex({ companyId: 1, "reportMetadata.reportingPeriod.fiscalYear": -1 })
db.reports.createIndex({ "reportStatus.currentStatus": 1 })

// Emission Factors
db.emissionfactors.createIndex({ 
  "factorMetadata.category": 1, 
  "fuelSpecifications.fuelType": 1, 
  "geographicScope.country": 1 
})
```

### Memory Management
```javascript
// Connection pooling (already configured in server.js)
mongoose.connect(mongoURI, {
  maxPoolSize: 10,        // Max 10 connections
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
```

## Security Configuration

### Authentication & Access Control
```javascript
// Database users (Atlas)
vsme-admin: Full access (development)
vsme-app: Read/write specific collections (production)
vsme-readonly: Read-only access (analytics)
```

### Network Security
```
Development: Allow all IPs (0.0.0.0/0)
Production: Whitelist specific IPs
- Application servers
- Developer IPs
- Monitoring services
```

## Backup & Recovery

### MongoDB Atlas (Automatic)
- Continuous backups every 6 hours
- Point-in-time recovery
- Cross-region replication

### Local MongoDB
```bash
# Backup
mongodump --db vsme-esg-platform --out /backup/

# Restore
mongorestore --db vsme-esg-platform /backup/vsme-esg-platform/
```

## Monitoring & Maintenance

### Atlas Monitoring
- Performance Advisor
- Real-time performance metrics
- Index suggestions
- Query profiler

### Health Checks
```bash
# Test connection
node -e "
const mongoose = require('mongoose');
mongoose.connect('YOUR_MONGODB_URI')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection failed:', err));
"
```

## Environment-Specific Setup

### Development
```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/vsme-esg-platform-dev

# Or Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vsme-esg-platform-dev
```

### Production
```bash
# Atlas with replica set
MONGODB_URI=mongodb+srv://prod-user:secure-password@prod-cluster.mongodb.net/vsme-esg-platform?retryWrites=true&w=majority&readPreference=primary

# Additional production settings
MONGODB_MAX_POOL_SIZE=20
MONGODB_MIN_POOL_SIZE=5
```

## Troubleshooting

### Common Issues
1. **Connection Timeout**
   ```
   Error: MongooseServerSelectionError
   Solution: Check network access, IP whitelist
   ```

2. **Authentication Failed**
   ```
   Error: Authentication failed
   Solution: Verify username/password, database permissions
   ```

3. **Storage Limit Exceeded**
   ```
   Error: Storage quota exceeded
   Solution: Upgrade Atlas tier or clean old data
   ```

### Debug Connection
```javascript
// Add to server.js for debugging
mongoose.set('debug', true);
mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
```

## Getting Started

1. **Choose setup option** (Atlas recommended)
2. **Configure environment variables**
3. **Start backend server**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
4. **Verify connection** - Check console for "✅ MongoDB connected successfully"
5. **Seed default data** - Emission factors will be auto-seeded

## Support

- MongoDB Atlas Support: https://support.mongodb.com/
- MongoDB Community Forums: https://community.mongodb.com/
- Backend logs will show detailed connection information