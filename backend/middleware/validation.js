/**
 * Enhanced Validation Middleware
 * Handles request data validation with comprehensive schema validation
 */

const { ValidationError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseFormatter = require('../utils/responseFormatter');

// Validation helper functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validatePhoneNumber = (phone) => {
  // International phone number format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

const validatePostalCode = (postalCode, country) => {
  const postalRegexes = {
    'IE': /^[A-Z]\d{2}[\s]?[A-Z0-9]{4}$/, // Irish Eircode
    'GB': /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, // UK postcode
    'US': /^\d{5}(-\d{4})?$/, // US ZIP code
    'CA': /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, // Canadian postal code
    'DE': /^\d{5}$/, // German postal code
    'FR': /^\d{5}$/ // French postal code
  };
  
  const regex = postalRegexes[country.toUpperCase()];
  return regex ? regex.test(postalCode) : true; // Default to true for unknown countries
};

const validateNACECode = (code) => {
  // NACE code format: XX.XX
  const naceRegex = /^\d{2}\.\d{2}$/;
  return naceRegex.test(code);
};

const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end && start <= new Date();
};

// Generic validation function
const validateField = (value, field, rules) => {
  const errors = [];
  
  // Required validation
  if (rules.required && (value === undefined || value === null || value === '')) {
    errors.push({
      field,
      code: 'REQUIRED',
      message: `${field} is required`,
      value
    });
    return errors; // If required field is missing, skip other validations
  }
  
  // Skip other validations if field is not required and empty
  if (!rules.required && (value === undefined || value === null || value === '')) {
    return errors;
  }
  
  // Type validation
  if (rules.type && typeof value !== rules.type) {
    errors.push({
      field,
      code: 'INVALID_TYPE',
      message: `${field} must be of type ${rules.type}`,
      value
    });
  }
  
  // String validations
  if (rules.type === 'string' && typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push({
        field,
        code: 'MIN_LENGTH',
        message: `${field} must be at least ${rules.minLength} characters long`,
        value
      });
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push({
        field,
        code: 'MAX_LENGTH',
        message: `${field} must be at most ${rules.maxLength} characters long`,
        value
      });
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push({
        field,
        code: 'PATTERN_MISMATCH',
        message: rules.patternMessage || `${field} format is invalid`,
        value
      });
    }
  }
  
  // Number validations
  if (rules.type === 'number' && typeof value === 'number') {
    if (rules.min && value < rules.min) {
      errors.push({
        field,
        code: 'MIN_VALUE',
        message: `${field} must be at least ${rules.min}`,
        value
      });
    }
    
    if (rules.max && value > rules.max) {
      errors.push({
        field,
        code: 'MAX_VALUE',
        message: `${field} must be at most ${rules.max}`,
        value
      });
    }
  }
  
  // Enum validation
  if (rules.enum && !rules.enum.includes(value)) {
    errors.push({
      field,
      code: 'INVALID_ENUM',
      message: `${field} must be one of: ${rules.enum.join(', ')}`,
      value
    });
  }
  
  // Custom validation
  if (rules.custom && typeof rules.custom === 'function') {
    const customResult = rules.custom(value);
    if (customResult !== true) {
      errors.push({
        field,
        code: 'CUSTOM_VALIDATION',
        message: customResult || `${field} is invalid`,
        value
      });
    }
  }
  
  return errors;
};

// Schema validator
const validateSchema = (data, schema) => {
  const errors = [];
  
  const validate = (obj, schemaObj, path = '') => {
    for (const [key, rules] of Object.entries(schemaObj)) {
      const fullPath = path ? `${path}.${key}` : key;
      const value = obj?.[key];
      
      if (rules.type === 'object' && rules.properties) {
        // Nested object validation
        const fieldErrors = validateField(value, fullPath, { required: rules.required, type: 'object' });
        errors.push(...fieldErrors);
        
        if (value && typeof value === 'object') {
          validate(value, rules.properties, fullPath);
        }
      } else if (rules.type === 'array') {
        // Array validation
        const fieldErrors = validateField(value, fullPath, rules);
        errors.push(...fieldErrors);
        
        if (Array.isArray(value) && rules.items) {
          value.forEach((item, index) => {
            if (rules.items.type === 'object' && rules.items.properties) {
              validate(item, rules.items.properties, `${fullPath}[${index}]`);
            } else {
              const itemErrors = validateField(item, `${fullPath}[${index}]`, rules.items);
              errors.push(...itemErrors);
            }
          });
        }
      } else {
        // Regular field validation
        const fieldErrors = validateField(value, fullPath, rules);
        errors.push(...fieldErrors);
      }
    }
  };
  
  validate(data, schema);
  return errors;
};

// Create validation middleware from schema
const createValidator = (schema) => {
  return catchAsync(async (req, res, next) => {
    const errors = validateSchema(req.body, schema);
    
    if (errors.length > 0) {
      return ResponseFormatter.validationError(res, errors);
    }
    
    next();
  });
};

// Validation schemas
const schemas = {
  // User registration schema
  userRegistration: {
    email: {
      type: 'string',
      required: true,
      custom: (value) => validateEmail(value) || 'Invalid email format'
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
      custom: (value) => validatePassword(value) || 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'
    },
    firstName: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 50
    },
    lastName: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 50
    },
    position: {
      type: 'string',
      maxLength: 100
    },
    department: {
      type: 'string',
      maxLength: 100
    }
  },

  // User login schema
  userLogin: {
    email: {
      type: 'string',
      required: true,
      custom: (value) => validateEmail(value) || 'Invalid email format'
    },
    password: {
      type: 'string',
      required: true,
      minLength: 1
    },
    mfaToken: {
      type: 'string',
      pattern: /^\d{6}$/,
      patternMessage: 'MFA token must be 6 digits'
    }
  },

  // Company creation schema
  company: {
    companyProfile: {
      type: 'object',
      required: true,
      properties: {
        legalName: {
          type: 'string',
          required: true,
          minLength: 1,
          maxLength: 200
        },
        tradingName: {
          type: 'string',
          maxLength: 200
        },
        companyRegistrationNumber: {
          type: 'string',
          required: true,
          pattern: /^[A-Z0-9]{6,12}$/,
          patternMessage: 'Company registration number must be 6-12 alphanumeric characters'
        },
        primaryEmail: {
          type: 'string',
          required: true,
          custom: (value) => validateEmail(value) || 'Invalid email format'
        },
        primaryPhone: {
          type: 'string',
          custom: (value) => validatePhoneNumber(value) || 'Invalid phone number format'
        },
        website: {
          type: 'string',
          custom: (value) => validateURL(value) || 'Invalid website URL'
        }
      }
    },
    headquarters: {
      type: 'object',
      required: true,
      properties: {
        street: {
          type: 'string',
          required: true,
          maxLength: 200
        },
        city: {
          type: 'string',
          required: true,
          maxLength: 100
        },
        county: {
          type: 'string',
          maxLength: 100
        },
        country: {
          type: 'string',
          required: true,
          enum: ['IE', 'GB', 'US', 'CA', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE']
        },
        eircode: {
          type: 'string',
          custom: (value, data) => {
            const country = data?.headquarters?.country;
            return validatePostalCode(value, country) || `Invalid postal code for ${country}`;
          }
        }
      }
    },
    industryClassification: {
      type: 'object',
      properties: {
        primaryNACECode: {
          type: 'string',
          custom: (value) => validateNACECode(value) || 'Invalid NACE code format (XX.XX)'
        },
        sectorType: {
          type: 'string',
          enum: ['Agriculture', 'Manufacturing', 'Technology', 'Services', 'Energy', 'Finance', 'Healthcare', 'Retail', 'Construction', 'Transportation']
        }
      }
    }
  },

  // Report creation schema
  report: {
    companyId: {
      type: 'string',
      required: true,
      pattern: /^[0-9a-fA-F]{24}$/,
      patternMessage: 'Invalid company ID format'
    },
    reportingPeriod: {
      type: 'object',
      required: true,
      properties: {
        startDate: {
          type: 'string',
          required: true,
          pattern: /^\d{4}-\d{2}-\d{2}$/,
          patternMessage: 'Start date must be in YYYY-MM-DD format'
        },
        endDate: {
          type: 'string',
          required: true,
          pattern: /^\d{4}-\d{2}-\d{2}$/,
          patternMessage: 'End date must be in YYYY-MM-DD format'
        },
        fiscalYear: {
          type: 'number',
          required: true,
          min: 2020,
          max: new Date().getFullYear() + 1
        }
      }
    },
    reportType: {
      type: 'string',
      required: true,
      enum: ['VSME', 'Full ESG', 'Custom']
    }
  },

  // Emission factor schema
  emissionFactor: {
    factorMetadata: {
      type: 'object',
      required: true,
      properties: {
        category: {
          type: 'string',
          required: true,
          enum: ['Scope1', 'Scope2', 'Scope3']
        },
        subCategory: {
          type: 'string',
          required: true
        },
        source: {
          type: 'string',
          required: true,
          enum: ['SEAI', 'DEFRA', 'EPA', 'IPCC', 'Custom']
        }
      }
    },
    fuelSpecifications: {
      type: 'object',
      required: true,
      properties: {
        fuelType: {
          type: 'string',
          required: true
        },
        description: {
          type: 'string',
          maxLength: 500
        }
      }
    },
    emissionFactorData: {
      type: 'object',
      required: true,
      properties: {
        totalCo2eFactor: {
          type: 'number',
          required: true,
          min: 0
        },
        unit: {
          type: 'string',
          required: true,
          enum: ['kg', 'litre', 'm3', 'kWh', 'tonne']
        }
      }
    }
  },

  // Calculation request schema
  calculationRequest: {
    fuelData: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        properties: {
          fuelType: {
            type: 'string',
            required: true
          },
          quantity: {
            type: 'number',
            required: true,
            min: 0
          },
          unit: {
            type: 'string',
            required: true,
            enum: ['kg', 'litre', 'm3', 'kWh', 'tonne']
          }
        }
      }
    },
    country: {
      type: 'string',
      required: true,
      enum: ['IE', 'GB', 'US', 'CA', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE']
    }
  },

  // User invitation schema
  userInvitation: {
    email: {
      type: 'string',
      required: true,
      custom: (value) => validateEmail(value) || 'Invalid email format'
    },
    firstName: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 50
    },
    lastName: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 50
    },
    position: {
      type: 'string',
      maxLength: 100
    },
    department: {
      type: 'string',
      maxLength: 100
    },
    companyId: {
      type: 'string',
      required: true,
      pattern: /^[0-9a-fA-F]{24}$/,
      patternMessage: 'Invalid company ID format'
    },
    role: {
      type: 'string',
      enum: ['Admin', 'Manager', 'Editor', 'Viewer'],
      default: 'Editor'
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },

  // User role update schema
  userRoleUpdate: {
    role: {
      type: 'string',
      required: true,
      enum: ['Admin', 'Manager', 'Editor', 'Viewer']
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['read:reports', 'write:reports', 'delete:reports', 'read:companies', 'write:companies', 'manage:users']
      }
    }
  }
};

// Create validation middleware for each schema
const validators = {};
Object.keys(schemas).forEach(schemaName => {
  validators[`validate${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)}`] = createValidator(schemas[schemaName]);
});

// Legacy validators (updated to use new system)
const validateCompany = createValidator(schemas.company);
const validateReport = createValidator(schemas.report);
const validateEmissionFactor = createValidator(schemas.emissionFactor);
const validateUserRegistration = createValidator(schemas.userRegistration);
const validateUserLogin = createValidator(schemas.userLogin);
const validateCalculationRequest = createValidator(schemas.calculationRequest);
const validateUserInvitation = createValidator(schemas.userInvitation);
const validateUserRoleUpdate = createValidator(schemas.userRoleUpdate);

// Custom validation for specific use cases
const validatePremise = catchAsync(async (req, res, next) => {
  const premiseSchema = {
    name: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 200
    },
    type: {
      type: 'string',
      required: true,
      enum: ['Office', 'Production', 'Warehouse', 'Retail', 'Other']
    },
    address: {
      type: 'object',
      required: true,
      properties: {
        street: { type: 'string', required: true },
        city: { type: 'string', required: true },
        country: { 
          type: 'string', 
          required: true,
          enum: ['IE', 'GB', 'US', 'CA', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE']
        }
      }
    }
  };
  
  const errors = validateSchema(req.body, premiseSchema);
  if (errors.length > 0) {
    return ResponseFormatter.validationError(res, errors);
  }
  
  next();
});

const validateModule = (moduleType) => {
  return catchAsync(async (req, res, next) => {
    // Module-specific validation can be enhanced here
    // For now, validate that data exists and is an object
    if (!req.body || typeof req.body !== 'object') {
      return ResponseFormatter.validationError(res, [{
        field: 'data',
        code: 'REQUIRED',
        message: 'Module data is required',
        value: req.body
      }]);
    }
    
    next();
  });
};

// B3 Module Validation Schemas
const b3StationaryCombustionSchema = {
  sourceCategory: { type: 'string', required: true },
  facilityName: { type: 'string', required: true },
  activityData: { type: 'object', required: true },
  fuelType: { type: 'string', required: true }
};

const b3MobileCombustionSchema = {
  vehicleCategory: { type: 'string', required: true },
  fuelType: { type: 'string', required: true },
  activityData: { type: 'object', required: true }
};

const b3FugitiveEmissionsSchema = {
  emissionSource: { type: 'string', required: true },
  refrigerantDetails: { type: 'object', required: true },
  activityData: { type: 'object', required: true }
};

const b3ElectricityConsumptionSchema = {
  facilityDetails: { type: 'object', required: true },
  activityData: { type: 'object', required: true }
};

// B3 Validators
const validateB3StationaryCombustion = catchAsync(async (req, res, next) => {
  const errors = validateSchema(req.body, b3StationaryCombustionSchema);
  if (errors.length > 0) {
    return ResponseFormatter.validationError(res, errors);
  }
  next();
});

const validateB3MobileCombustion = catchAsync(async (req, res, next) => {
  const errors = validateSchema(req.body, b3MobileCombustionSchema);
  if (errors.length > 0) {
    return ResponseFormatter.validationError(res, errors);
  }
  next();
});

const validateB3FugitiveEmissions = catchAsync(async (req, res, next) => {
  const errors = validateSchema(req.body, b3FugitiveEmissionsSchema);
  if (errors.length > 0) {
    return ResponseFormatter.validationError(res, errors);
  }
  next();
});

const validateB3ElectricityConsumption = catchAsync(async (req, res, next) => {
  const errors = validateSchema(req.body, b3ElectricityConsumptionSchema);
  if (errors.length > 0) {
    return ResponseFormatter.validationError(res, errors);
  }
  next();
});

// Export all validators
module.exports = {
  // Schema-based validators
  createValidator,
  validateSchema,
  schemas,
  ...validators,
  
  // Specific validators
  validateCompany,
  validatePremise,
  validateReport,
  validateModule,
  validateEmissionFactor,
  validateUserRegistration,
  validateUserLogin,
  validateCalculationRequest,
  validateUserInvitation,
  validateUserRoleUpdate,
  
  // B3 Module validators
  validateB3StationaryCombustion,
  validateB3MobileCombustion,
  validateB3FugitiveEmissions,
  validateB3ElectricityConsumption,
  
  // Validator map for dynamic lookup
  b3StationaryCombustion: validateB3StationaryCombustion,
  b3MobileCombustion: validateB3MobileCombustion,
  b3FugitiveEmissions: validateB3FugitiveEmissions,
  b3ElectricityConsumption: validateB3ElectricityConsumption,
  
  // Helper functions
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validatePostalCode,
  validateNACECode,
  validateURL,
  validateDateRange
};