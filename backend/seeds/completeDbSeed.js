/**
 * Complete Database Seeding Script
 * Seeds all collections with comprehensive demo data
 */

const mongoose = require('mongoose');
const Company = require('../models/Company');
const Report = require('../models/Report');
const EmissionFactor = require('../models/EmissionFactor');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/esg-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Comprehensive Company Data
const companiesData = [
  {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
    companyProfile: {
      legalName: 'GreenTech Agriculture Ltd',
      registrationNumber: 'IE-AG-2024-001',
      entityType: 'Limited Company',
      incorporationDate: new Date('2018-03-15'),
      businessDescription: 'Sustainable agriculture and organic farming solutions',
      website: 'https://greentech-agriculture.ie',
      primaryContactEmail: 'info@greentech-agriculture.ie',
      primaryContactPhone: '+353-1-555-0123'
    },
    headquarters: {
      address: '123 Rural Innovation Park',
      city: 'Cork',
      stateProvince: 'Munster',
      postalCode: 'T12 ABC1',
      country: 'Ireland'
    },
    industryClassification: {
      sectorType: 'Agriculture',
      naceCode: '01.11',
      sectorDescription: 'Growing of cereals (except rice), leguminous crops and oil seeds',
      isicCode: '0111',
      sicCode: '0111'
    },
    workforce: {
      totalEmployees: 45,
      permanentEmployees: 38,
      partTimeEmployees: 12,
      temporaryEmployees: 8,
      contractors: 3,
      genderDistribution: {
        male: 22,
        female: 23
      },
      turnoverRate: 8.2,
      averageAge: 38.5,
      trainingHoursPerEmployee: 24
    },
    financialData: {
      currency: 'EUR',
      fiscalYearEnd: '31-12',
      revenue: {
        amount: 2500000,
        year: 2024
      },
      assets: {
        amount: 1800000,
        year: 2024
      },
      marketCapitalization: null
    },
    facilities: [
      {
        type: 'Production',
        address: 'Main Farm Complex, County Cork, Ireland',
        size: 15000,
        sizeUnit: 'M³',
        operationalStatus: 'Active',
        certifications: ['EU Organic', 'GlobalGAP']
      },
      {
        type: 'Office',
        address: 'Innovation Center, Dublin 2, Ireland',
        size: 500,
        sizeUnit: 'M²',
        operationalStatus: 'Active',
        certifications: ['LEED Gold']
      },
      {
        type: 'Warehouse',
        address: 'Storage Facility, County Meath, Ireland',
        size: 3200,
        sizeUnit: 'M²',
        operationalStatus: 'Active',
        certifications: ['BRC Food Safety']
      }
    ],
    operatingCountries: ['Ireland', 'United Kingdom'],
    subsidiaries: [],
    certifications: [
      {
        name: 'EU Organic Certification',
        issuingBody: 'Organic Trust',
        issueDate: new Date('2019-01-15'),
        expiryDate: new Date('2025-01-15'),
        certificateNumber: 'ORG-IE-2019-001'
      },
      {
        name: 'ISO 14001:2015',
        issuingBody: 'NSAI',
        issueDate: new Date('2020-06-20'),
        expiryDate: new Date('2026-06-20'),
        certificateNumber: 'ISO-14001-IE-2020-123'
      }
    ],
    sustainabilityCommitments: {
      netZeroTarget: {
        hasTarget: true,
        targetYear: 2035,
        scopesCovered: ['Scope 1', 'Scope 2', 'Scope 3'],
        validatedBy: 'Science Based Targets initiative'
      },
      renewableEnergyTarget: {
        hasTarget: true,
        targetPercentage: 80,
        targetYear: 2030,
        currentPercentage: 35
      },
      wasteReductionTarget: {
        hasTarget: true,
        targetPercentage: 50,
        targetYear: 2028,
        baselineYear: 2020
      }
    }
  },
  {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
    companyProfile: {
      legalName: 'EcoManufacturing Solutions Ltd',
      registrationNumber: 'IE-MFG-2024-002',
      entityType: 'Limited Company',
      incorporationDate: new Date('2015-09-10'),
      businessDescription: 'Sustainable manufacturing and renewable energy solutions',
      website: 'https://ecomanufacturing.ie',
      primaryContactEmail: 'contact@ecomanufacturing.ie',
      primaryContactPhone: '+353-1-555-0456'
    },
    headquarters: {
      address: '456 Industrial Estate',
      city: 'Dublin',
      stateProvince: 'Leinster',
      postalCode: 'D15 XYZ2',
      country: 'Ireland'
    },
    industryClassification: {
      sectorType: 'Manufacturing',
      naceCode: '25.50',
      sectorDescription: 'Forging, pressing, stamping and roll-forming of metal; powder metallurgy',
      isicCode: '2550',
      sicCode: '2550'
    },
    workforce: {
      totalEmployees: 125,
      permanentEmployees: 110,
      partTimeEmployees: 25,
      temporaryEmployees: 15,
      contractors: 8,
      genderDistribution: {
        male: 75,
        female: 50
      },
      turnoverRate: 6.8,
      averageAge: 42.1,
      trainingHoursPerEmployee: 32
    },
    financialData: {
      currency: 'EUR',
      fiscalYearEnd: '31-12',
      revenue: {
        amount: 8500000,
        year: 2024
      },
      assets: {
        amount: 6200000,
        year: 2024
      },
      marketCapitalization: null
    },
    facilities: [
      {
        type: 'Production',
        address: 'Manufacturing Plant, Dublin Industrial Estate',
        size: 25000,
        sizeUnit: 'M²',
        operationalStatus: 'Active',
        certifications: ['ISO 9001:2015', 'ISO 14001:2015']
      },
      {
        type: 'R&D',
        address: 'Innovation Lab, Trinity College Campus',
        size: 1200,
        sizeUnit: 'M²',
        operationalStatus: 'Active',
        certifications: ['ISO 17025']
      }
    ],
    operatingCountries: ['Ireland', 'United Kingdom', 'Germany'],
    subsidiaries: ['EcoMfg UK Ltd', 'EcoMfg Deutschland GmbH'],
    certifications: [
      {
        name: 'ISO 9001:2015',
        issuingBody: 'NSAI',
        issueDate: new Date('2021-03-10'),
        expiryDate: new Date('2027-03-10'),
        certificateNumber: 'ISO-9001-IE-2021-456'
      }
    ],
    sustainabilityCommitments: {
      netZeroTarget: {
        hasTarget: true,
        targetYear: 2040,
        scopesCovered: ['Scope 1', 'Scope 2'],
        validatedBy: 'Internal validation'
      },
      renewableEnergyTarget: {
        hasTarget: true,
        targetPercentage: 100,
        targetYear: 2032,
        currentPercentage: 62
      }
    }
  }
];

// Enhanced Emission Factors
const emissionFactorsData = [
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-15'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland',
      region: 'EU'
    },
    fuelSpecifications: {
      fuelType: 'Diesel',
      description: 'Automotive gas oil for stationary combustion'
    },
    emissionFactorData: {
      co2Factor: 2.541,
      ch4Factor: 0.0001,
      n2oFactor: 0.0001,
      totalCo2eFactor: 2.5412,
      unit: 'litre',
      uncertainty: 4.8,
      confidenceLevel: 'High'
    },
    qualityIndicators: {
      dataQuality: 'High',
      geographicRepresentativeness: 'High',
      temporalRepresentativeness: 'High',
      technologyRepresentativeness: 'High'
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Mobile',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-15'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Petrol',
      description: 'Motor gasoline for vehicles'
    },
    emissionFactorData: {
      co2Factor: 2.180,
      ch4Factor: 0.0001,
      n2oFactor: 0.0001,
      totalCo2eFactor: 2.1801,
      unit: 'litre',
      uncertainty: 4.2,
      confidenceLevel: 'High'
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-15'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Natural Gas',
      description: 'Pipeline natural gas'
    },
    emissionFactorData: {
      co2Factor: 0.1844,
      ch4Factor: 0.0000037,
      n2oFactor: 0.0000037,
      totalCo2eFactor: 0.1844074,
      unit: 'kWh',
      uncertainty: 5.2,
      confidenceLevel: 'High'
    }
  },
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-15'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Electricity',
      description: 'Grid electricity Ireland'
    },
    emissionFactorData: {
      co2Factor: 0.296,
      ch4Factor: 0.000012,
      n2oFactor: 0.0000024,
      totalCo2eFactor: 0.2960144,
      unit: 'kWh',
      uncertainty: 8.2,
      confidenceLevel: 'High'
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'DEFRA',
      version: '2024.1',
      publishedDate: new Date('2024-02-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'United Kingdom'
    },
    fuelSpecifications: {
      fuelType: 'Diesel',
      description: 'Gas oil for stationary combustion'
    },
    emissionFactorData: {
      co2Factor: 2.51,
      ch4Factor: 0.0001,
      n2oFactor: 0.0001,
      totalCo2eFactor: 2.5101,
      unit: 'litre',
      uncertainty: 4.5,
      confidenceLevel: 'High'
    }
  },
  {
    factorMetadata: {
      category: 'Scope2',
      subCategory: 'Grid',
      source: 'EEA',
      version: '2024.1',
      publishedDate: new Date('2024-03-01'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'European Union',
      region: 'EU'
    },
    fuelSpecifications: {
      fuelType: 'Electricity',
      description: 'EU grid electricity average'
    },
    emissionFactorData: {
      co2Factor: 0.275,
      ch4Factor: 0.000015,
      n2oFactor: 0.0000030,
      totalCo2eFactor: 0.275018,
      unit: 'kWh',
      uncertainty: 12.5,
      confidenceLevel: 'Medium'
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-15'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'LPG',
      description: 'Liquefied petroleum gas'
    },
    emissionFactorData: {
      co2Factor: 1.510,
      ch4Factor: 0.0000062,
      n2oFactor: 0.00000062,
      totalCo2eFactor: 1.5100682,
      unit: 'litre',
      uncertainty: 3.8,
      confidenceLevel: 'High'
    }
  },
  {
    factorMetadata: {
      category: 'Scope1',
      subCategory: 'Stationary',
      source: 'SEAI',
      version: '2024.1',
      publishedDate: new Date('2024-01-15'),
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31')
    },
    geographicScope: {
      country: 'Ireland'
    },
    fuelSpecifications: {
      fuelType: 'Coal',
      description: 'Bituminous coal'
    },
    emissionFactorData: {
      co2Factor: 2240,
      ch4Factor: 0.1,
      n2oFactor: 0.015,
      totalCo2eFactor: 2244.725,
      unit: 'tonne',
      uncertainty: 7.5,
      confidenceLevel: 'Medium'
    }
  }
];

// Sample Reports Data
const reportsData = [
  {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439021'),
    companyId: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
    reportMetadata: {
      reportType: 'Annual Sustainability Report',
      reportingFramework: ['GRI Standards', 'EU Taxonomy'],
      reportingPeriod: {
        fiscalYear: 2024,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31')
      },
      currency: 'EUR',
      language: 'English',
      preparationDate: new Date('2024-11-15'),
      publicationDate: null,
      version: '1.0',
      status: 'In Progress'
    },
    reportStatus: {
      currentStatus: 'In Progress',
      completionPercentage: 65,
      lastUpdated: new Date('2024-12-08'),
      submissionDeadline: new Date('2025-03-31'),
      reviewStatus: 'Pending Internal Review',
      approvalStatus: 'Pending'
    },
    moduleData: {
      b0: {
        companyInformation: {
          dataComplete: true,
          lastUpdated: new Date('2024-11-20'),
          status: 'Complete'
        }
      },
      b3: {
        emissionsData: {
          scope1: {
            stationaryCombustion: [
              {
                fuelType: 'Diesel',
                quantity: 12000,
                unit: 'litre',
                equipment: 'Generators',
                period: 'Annual'
              },
              {
                fuelType: 'Natural Gas',
                quantity: 245000,
                unit: 'kWh',
                equipment: 'Boilers',
                period: 'Annual'
              }
            ],
            mobileCombustion: [
              {
                type: 'Farm Tractor',
                calculationMethod: 'fuel-based',
                fuelConsumption: 8500,
                fuelType: 'Diesel'
              }
            ]
          },
          scope2: {
            electricity: [
              {
                country: 'Ireland',
                quantity: 485000,
                unit: 'kWh',
                renewableEnergyConsumption: 120000
              }
            ]
          }
        },
        calculationResults: {
          scope1Total: 66845.2,
          scope2Total: 108040.0,
          totalEmissions: 174885.2,
          emissionIntensity: {
            value: 69.95,
            unit: 'kg CO2e/€1000 revenue'
          },
          lastCalculated: new Date('2024-12-08')
        },
        dataComplete: true,
        lastUpdated: new Date('2024-12-08'),
        status: 'Complete'
      },
      b8: {
        workforceData: {
          totalEmployees: 45,
          genderBalance: { male: 22, female: 23 },
          turnoverRate: 8.2,
          trainingHours: 1080
        },
        dataComplete: true,
        lastUpdated: new Date('2024-11-25'),
        status: 'Complete'
      }
    },
    qualityAssurance: {
      internalReview: {
        completed: false,
        reviewer: null,
        reviewDate: null,
        comments: []
      },
      externalAssurance: {
        required: true,
        provider: null,
        level: 'Limited',
        scope: ['Scope 1', 'Scope 2', 'Scope 3 selected categories']
      }
    },
    compliance: {
      regulatoryRequirements: ['EU CSRD', 'Irish Companies Act'],
      frameworks: ['GRI Standards', 'TCFD'],
      standards: ['ISO 14064-1'],
      certifications: ['EU Organic', 'ISO 14001:2015']
    }
  },
  {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439022'),
    companyId: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
    reportMetadata: {
      reportType: 'ESG Assessment Report',
      reportingFramework: ['SASB', 'EU Taxonomy'],
      reportingPeriod: {
        fiscalYear: 2024,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31')
      },
      currency: 'EUR',
      language: 'English',
      preparationDate: new Date('2024-10-30'),
      publicationDate: null,
      version: '1.2',
      status: 'Draft'
    },
    reportStatus: {
      currentStatus: 'Draft',
      completionPercentage: 40,
      lastUpdated: new Date('2024-12-01'),
      submissionDeadline: new Date('2025-04-15'),
      reviewStatus: 'Not Started',
      approvalStatus: 'Pending'
    },
    moduleData: {
      b0: {
        companyInformation: {
          dataComplete: true,
          lastUpdated: new Date('2024-10-30'),
          status: 'Complete'
        }
      },
      b3: {
        emissionsData: {
          scope1: {
            stationaryCombustion: [
              {
                fuelType: 'Natural Gas',
                quantity: 850000,
                unit: 'kWh',
                equipment: 'Manufacturing Equipment',
                period: 'Annual'
              }
            ]
          },
          scope2: {
            electricity: [
              {
                country: 'Ireland',
                quantity: 1245000,
                unit: 'kWh',
                renewableEnergyConsumption: 772000
              }
            ]
          }
        },
        calculationResults: {
          scope1Total: 156740.0,
          scope2Total: 139928.0,
          totalEmissions: 296668.0,
          emissionIntensity: {
            value: 34.9,
            unit: 'kg CO2e/€1000 revenue'
          },
          lastCalculated: new Date('2024-12-01')
        },
        dataComplete: false,
        lastUpdated: new Date('2024-12-01'),
        status: 'In Progress'
      }
    },
    qualityAssurance: {
      internalReview: {
        completed: false,
        reviewer: null,
        reviewDate: null,
        comments: []
      },
      externalAssurance: {
        required: false,
        provider: null,
        level: null,
        scope: []
      }
    },
    compliance: {
      regulatoryRequirements: ['EU CSRD'],
      frameworks: ['SASB'],
      standards: ['ISO 14064-1'],
      certifications: ['ISO 9001:2015', 'ISO 14001:2015']
    }
  }
];

// Seeding Functions
const seedCompanies = async () => {
  try {
    await Company.deleteMany({});
    await Company.insertMany(companiesData);
    console.log('✅ Companies seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding companies:', error);
    throw error;
  }
};

const seedEmissionFactors = async () => {
  try {
    await EmissionFactor.deleteMany({});
    await EmissionFactor.insertMany(emissionFactorsData);
    console.log('✅ Emission factors seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding emission factors:', error);
    throw error;
  }
};

const seedReports = async () => {
  try {
    await Report.deleteMany({});
    await Report.insertMany(reportsData);
    console.log('✅ Reports seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding reports:', error);
    throw error;
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting comprehensive database seeding...');
    
    await connectDB();
    
    // Seed all collections
    await seedEmissionFactors();
    await seedCompanies();
    await seedReports();
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Seeded data summary:');
    console.log(`   - ${companiesData.length} companies`);
    console.log(`   - ${emissionFactorsData.length} emission factors`);
    console.log(`   - ${reportsData.length} reports`);
    
    // Verify seeding
    const companiesCount = await Company.countDocuments();
    const emissionFactorsCount = await EmissionFactor.countDocuments();
    const reportsCount = await Report.countDocuments();
    
    console.log('✅ Verification counts:');
    console.log(`   - Companies: ${companiesCount}`);
    console.log(`   - Emission Factors: ${emissionFactorsCount}`);
    console.log(`   - Reports: ${reportsCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = {
  seedDatabase,
  seedCompanies,
  seedEmissionFactors,
  seedReports,
  companiesData,
  emissionFactorsData,
  reportsData
};