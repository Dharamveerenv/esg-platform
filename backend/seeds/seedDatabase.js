#!/usr/bin/env node
/**
 * VSME ESG Platform - Database Seeding Script
 * Seeds the database with emission factors and demo data for development and demo
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedEmissionFactors, getDemoCalculationData } = require('./emissionFactorSeeds');

// Load environment variables
dotenv.config();

async function connectDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vsme-esg-platform';
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 MongoDB URI:', mongoURI.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
}

async function runSeeding() {
  console.log('🚀 VSME ESG Platform Database Seeding');
  console.log('=' .repeat(50));
  
  try {
    // Connect to database
    const connected = await connectDatabase();
    if (!connected) {
      console.error('❌ Database connection failed. Exiting...');
      process.exit(1);
    }
    
    // Seed emission factors
    console.log('\n📊 Seeding Emission Factors...');
    const factorResults = await seedEmissionFactors();
    console.log(`✅ Seeded ${factorResults.factorsSeeded} emission factors`);
    
    // Get demo data for testing
    const demoData = getDemoCalculationData();
    console.log(`🧪 Demo scenarios prepared: ${demoData.scenarios.length}`);
    
    console.log('\n🎯 Seeding Summary:');
    console.log(`   📊 Emission Factors: ${factorResults.factorsSeeded}`);
    console.log(`   🏭 Demo Company: ${demoData.company.name}`);
    console.log(`   🌍 Countries: Ireland, UK, EU`);
    console.log(`   ⚡ Scopes: 1, 2 (Scope 3 planned)`);
    console.log(`   🧪 Demo Scenarios: ${demoData.scenarios.length}`);
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('🚀 Ready for API testing and frontend demo');
    
    return true;
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error.stack);
    return false;
  }
}

// Run seeding if called directly
if (require.main === module) {
  runSeeding()
    .then((success) => {
      if (success) {
        console.log('\n🎉 Seeding completed successfully');
        process.exit(0);
      } else {
        console.log('\n💥 Seeding failed');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('💥 Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { runSeeding, connectDatabase };