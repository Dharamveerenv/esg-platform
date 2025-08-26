/**
 * Seed Emission Factors from Excel CSV Data
 * Parses the CSV file and populates MongoDB with all emission factors
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const EmissionFactor = require('../models/EmissionFactor');

class CSVEmissionFactorSeeder {
  constructor() {
    this.csvPath = path.join(__dirname, '../../Full Scope 1_2 Activity Data_Emission Factors V.0.csv');
    this.factors = [];
  }

  // Parse CSV file and extract emission factors
  parseCsvData() {
    console.log('📊 Reading CSV file...');
    const csvContent = fs.readFileSync(this.csvPath, 'utf-8');
    const lines = csvContent.split('\n').map(line => line.trim()).filter(line => line);
    
    let currentScope = '';
    let currentCategory = '';
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const cells = this.parseCsvLine(line);
      
      // Detect scope sections
      if (line.includes('Scope 1')) {
        currentScope = 'Scope1';
        i++;
        continue;
      }
      
      if (line.includes('Scope 2')) {
        currentScope = 'Scope2';
        i++;
        continue;
      }

      // Detect categories
      if (line.includes('Mobile Combustion')) {
        currentCategory = 'Mobile';
        i++;
        continue;
      }
      
      if (line.includes('Stationary Combustion')) {
        currentCategory = 'Stationary';
        i++;
        continue;
      }
      
      if (line.includes('Fugitive Emissions')) {
        currentCategory = 'Fugitive';
        i++;
        continue;
      }
      
      if (line.includes('Purchased Electricity')) {
        currentCategory = 'Grid';
        i++;
        continue;
      }
      
      if (line.includes('Purchased Heating') || line.includes('Purchased Cooling') || line.includes('Purchased Steam')) {
        currentCategory = 'Grid';
        i++;
        continue;
      }

      // Skip headers and empty lines
      if (!cells[0] || cells[0] === 'Fuel' || cells[0] === 'Location' || cells[0] === 'Refrigant/Gas' || 
          cells[0] === 'Delivery Vehicles' || cells.length < 4) {
        i++;
        continue;
      }

      // Parse actual emission factor data
      if (currentScope && currentCategory && cells[1] && !isNaN(parseFloat(cells[1]))) {
        try {
          const factor = this.createEmissionFactor(cells, currentScope, currentCategory);
          if (factor) {
            this.factors.push(factor);
            console.log(`✅ Parsed: ${factor.fuelSpecifications.fuelType} (${factor.geographicScope.country})`);
          }
        } catch (error) {
          console.log(`⚠️  Skipped line ${i + 1}: ${error.message}`);
        }
      }

      i++;
    }

    console.log(`📋 Total factors parsed: ${this.factors.length}`);
  }

  // Parse CSV line handling commas within quotes
  parseCsvLine(line) {
    const cells = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    cells.push(current.trim());
    return cells;
  }

  // Create emission factor object from CSV data
  createEmissionFactor(cells, scope, category) {
    const [fuel, emissionFactor, unit, activityUnit, source] = cells;
    
    if (!fuel || !emissionFactor || !unit || !source) {
      throw new Error('Missing required fields');
    }

    // Extract country from fuel name
    const country = this.extractCountry(fuel, source);
    const cleanFuelType = this.cleanFuelType(fuel);
    
    // Parse emission factor value
    const factorValue = parseFloat(emissionFactor);
    if (isNaN(factorValue)) {
      throw new Error('Invalid emission factor value');
    }

    // Map CSV units to database units
    const dbUnit = this.mapUnit(unit);
    
    // Determine source
    const dbSource = this.mapSource(source);

    return {
      factorMetadata: {
        category: scope,
        subCategory: category,
        source: dbSource,
        version: '2024-2025',
        publishedDate: new Date('2024-01-01'),
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2025-12-31')
      },
      geographicScope: {
        country: country,
        region: country === 'Ireland' ? 'EU' : this.getRegion(country)
      },
      fuelSpecifications: {
        fuelType: cleanFuelType,
        description: fuel
      },
      emissionFactorData: {
        co2Factor: factorValue, // Simplified - using total as CO2 for now
        ch4Factor: 0, // Would need to be calculated from detailed factors
        n2oFactor: 0, // Would need to be calculated from detailed factors
        totalCo2eFactor: factorValue,
        unit: dbUnit,
        confidenceLevel: dbSource === 'SEAI' ? 'High' : 'Medium'
      },
      qualityIndicators: {
        dataQuality: dbSource === 'SEAI' ? 'High' : 'Medium',
        geographicRepresentativeness: country === 'Ireland' ? 'High' : 'Medium',
        temporalRepresentativeness: 'High',
        technologyRepresentativeness: 'Medium'
      }
    };
  }

  // Extract country from fuel description
  extractCountry(fuel, source) {
    if (fuel.includes('(Ireland)') || source.includes('SEAI')) return 'Ireland';
    if (fuel.includes('(UK)') || source.includes('UK Gov')) return 'United Kingdom';
    if (source.includes('EEA')) {
      if (fuel.includes('Austria')) return 'Austria';
      if (fuel.includes('Belgium')) return 'Belgium';
      if (fuel.includes('Bulgaria')) return 'Bulgaria';
      if (fuel.includes('Croatia')) return 'Croatia';
      if (fuel.includes('Cyprus')) return 'Cyprus';
      if (fuel.includes('Czechia')) return 'Czechia';
      if (fuel.includes('Denmark')) return 'Denmark';
      if (fuel.includes('Estonia')) return 'Estonia';
      if (fuel.includes('Finland')) return 'Finland';
      if (fuel.includes('France')) return 'France';
      if (fuel.includes('Germany')) return 'Germany';
      if (fuel.includes('Greece')) return 'Greece';
      if (fuel.includes('Hungary')) return 'Hungary';
      if (fuel.includes('Italy')) return 'Italy';
      if (fuel.includes('Latvia')) return 'Latvia';
      if (fuel.includes('Lithuania')) return 'Lithuania';
      if (fuel.includes('Luxembourg')) return 'Luxembourg';
      if (fuel.includes('Malta')) return 'Malta';
      if (fuel.includes('Netherlands')) return 'Netherlands';
      if (fuel.includes('Poland')) return 'Poland';
      if (fuel.includes('Portugal')) return 'Portugal';
      if (fuel.includes('Romania')) return 'Romania';
      if (fuel.includes('Slovakia')) return 'Slovakia';
      if (fuel.includes('Slovenia')) return 'Slovenia';
      if (fuel.includes('Spain')) return 'Spain';
      if (fuel.includes('Sweden')) return 'Sweden';
      return 'European Union';
    }
    if (source.includes('US EPA')) return 'United States';
    
    return 'Ireland'; // Default
  }

  // Clean fuel type for database enum
  cleanFuelType(fuel) {
    const cleaned = fuel.replace(/\([^)]*\)/g, '').trim();
    
    // Map to database enum values
    if (cleaned.toLowerCase().includes('natural gas') || cleaned.toLowerCase().includes('cng')) return 'Natural Gas';
    if (cleaned.toLowerCase().includes('diesel')) return 'Diesel';
    if (cleaned.toLowerCase().includes('petrol')) return 'Petrol';
    if (cleaned.toLowerCase().includes('fuel oil')) return 'Fuel Oil';
    if (cleaned.toLowerCase().includes('lpg')) return 'LPG';
    if (cleaned.toLowerCase().includes('propane')) return 'Propane';
    if (cleaned.toLowerCase().includes('butane')) return 'Butane';
    if (cleaned.toLowerCase().includes('coal')) return 'Coal';
    if (cleaned.toLowerCase().includes('electricity')) return 'Electricity';
    if (cleaned.toLowerCase().includes('wood')) return 'Wood';
    if (cleaned.toLowerCase().includes('biomass') || cleaned.toLowerCase().includes('biogas')) return 'Biomass';
    if (cleaned.toLowerCase().includes('peat')) return 'Peat';
    
    // For refrigerants, try to match common types
    if (cleaned.includes('R-') || cleaned.includes('HFC') || cleaned.includes('CFC')) return 'R-404A';
    
    return 'Other';
  }

  // Map CSV units to database units
  mapUnit(unit) {
    if (unit.includes('litre')) return 'litre';
    if (unit.includes('kWh')) return 'kWh';
    if (unit.includes('m3') || unit.includes('m³')) return 'm3';
    if (unit.includes('kg')) return 'kg';
    if (unit.includes('tonne')) return 'tonne';
    if (unit.includes('km')) return 'km';
    return 'litre'; // Default
  }

  // Map CSV sources to database sources
  mapSource(source) {
    if (source.includes('SEAI')) return 'SEAI';
    if (source.includes('UK Gov')) return 'UKGov';
    if (source.includes('EEA')) return 'EEA';
    if (source.includes('EPA')) return 'EPA';
    return 'Other';
  }

  // Get region for country
  getRegion(country) {
    const euCountries = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 
                        'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 
                        'Hungary', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 
                        'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 
                        'Slovenia', 'Spain', 'Sweden'];
    
    if (euCountries.includes(country)) return 'EU';
    if (country === 'United Kingdom') return 'Europe';
    if (country === 'United States') return 'North America';
    return 'Global';
  }

  // Seed the database
  async seedDatabase() {
    try {
      console.log('🔌 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI);
      
      console.log('🗑️  Clearing existing emission factors...');
      await EmissionFactor.deleteMany({});
      
      console.log('💾 Inserting emission factors...');
      const result = await EmissionFactor.insertMany(this.factors, { ordered: false });
      
      console.log('✅ Database seeding completed!');
      console.log(`📊 Inserted ${result.length} emission factors`);
      
      // Show sample of what was inserted
      console.log('\n📋 Sample factors:');
      const samples = await EmissionFactor.find({}).limit(5);
      samples.forEach(factor => {
        console.log(`   ${factor.fuelSpecifications.fuelType} (${factor.geographicScope.country}): ${factor.emissionFactorData.totalCo2eFactor} ${factor.emissionFactorData.unit}`);
      });

      await mongoose.connection.close();
      console.log('🔌 Database connection closed');
      
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    }
  }

  // Run the complete seeding process
  async run() {
    console.log('🚀 Starting CSV Emission Factor Seeding...\n');
    
    try {
      this.parseCsvData();
      await this.seedDatabase();
      console.log('\n🎉 Seeding completed successfully!');
    } catch (error) {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const seeder = new CSVEmissionFactorSeeder();
  seeder.run();
}

module.exports = CSVEmissionFactorSeeder;