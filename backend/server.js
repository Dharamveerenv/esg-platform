/**
 * VSME ESG Platform - Backend Server
 * Express.js server with MongoDB integration
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/authRoutes');
//const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const reportRoutes = require('./routes/reportRoutes');
const fileRoutes = require('./routes/fileRoutes');
const emissionFactorRoutes = require('./routes/emissionFactorRoutes');
const referenceRoutes = require('./routes/referenceRoutes');
const calculationRoutes = require('./routes/calculationRoutes');
const b3Routes = require('./routes/b3Routes');
const b3DevRoutes = require('./routes/b3DevRoutes');

// Import middleware
const { AppError } = require('./utils/appError');
const globalErrorHandler = require('./middleware/errorHandler');
const requestTracking = require('./middleware/requestTracking');

// Load environment variables
dotenv.config();

const app = express();

// Trust proxy for deployment
app.set('trust proxy', 1);

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));
app.use(cors(corsOptions));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  max: process.env.RATE_LIMIT_MAX || 1000,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health' || req.path === '/api/health';
  }
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization
app.use(mongoSanitize()); // Against NoSQL query injection
app.use(xss()); // Against XSS attacks
app.use(hpp()); // Against parameter pollution

// Request tracking middleware (includes logging)
app.use(requestTracking);

// Import ResponseFormatter for health checks
const ResponseFormatter = require('./utils/responseFormatter');

// Health check endpoint
app.get('/health', (req, res) => {
  const healthData = {
    service: 'VSME ESG Platform API',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
  
  return ResponseFormatter.success(res, healthData, 'Service is healthy');
});

app.get('/api/health', (req, res) => {
  const healthData = {
    service: 'VSME ESG Platform API',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
  
  return ResponseFormatter.success(res, healthData, 'API is healthy');
});

// API routes 
app.use('/api/auth', authRoutes);
//app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/emission-factors', emissionFactorRoutes);
app.use('/api/reference', referenceRoutes);
app.use('/api/calculations', calculationRoutes);
app.use('/api/reports', b3Routes);
app.use('/api/dev/b3', b3DevRoutes);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vsme-esg-platform';
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 MongoDB URI:', mongoURI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connected successfully');
    
    // Seed default emission factors if needed
    const EmissionFactor = require('./models/EmissionFactor');
    const factorCount = await EmissionFactor.countDocuments();
    
    if (factorCount === 0) {
      console.log('📋 Seeding default emission factors...');
      await EmissionFactor.seedDefaultFactors();
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // For demo purposes, continue without database
    console.log('⚠️  Running in demo mode without database connection');
    console.log('📝 Some features may not work properly');
  }
};

// Start server
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start server
    const server = app.listen(PORT, HOST, () => {
      console.log('🚀 VSME ESG Platform Backend Server Started');
      console.log('=' .repeat(50));
      console.log(`🌐 Server running at: http://${HOST}:${PORT}`);
      console.log(`📡 API available at: http://${HOST}:${PORT}/api`);
      console.log(`🏥 Health check: http://${HOST}:${PORT}/health`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('=' .repeat(50));
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Process terminated');
        mongoose.connection.close();
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Process terminated');
        mongoose.connection.close();
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Promise Rejection:', err.name, err.message);
  console.log('🛑 Shutting down the server due to unhandled promise rejection');
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.name, err.message);
  console.log('🛑 Shutting down the server due to uncaught exception');
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;