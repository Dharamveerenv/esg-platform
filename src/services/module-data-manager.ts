import { apiClient } from '@/lib/api-client';

export interface SaveResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
  timestamp: Date;
  auditId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number; // 0-100
}

export interface CompletionStatus {
  moduleId: string;
  completionPercentage: number;
  requiredFields: string[];
  completedFields: string[];
  lastUpdated: Date;
  validationStatus: 'valid' | 'invalid' | 'warning' | 'not_validated';
}

export class ModuleDataManager {
  private static instance: ModuleDataManager;
  private saveQueue: Map<string, any> = new Map();
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries = 3;

  static getInstance(): ModuleDataManager {
    if (!ModuleDataManager.instance) {
      ModuleDataManager.instance = new ModuleDataManager();
    }
    return ModuleDataManager.instance;
  }

  /**
   * Save module data with retry logic and error handling
   */
  async saveModuleData(moduleId: string, reportId: string, data: Record<string, unknown>): Promise<SaveResult> {
    const key = `${moduleId}-${reportId}`;
    
    try {
      // Add to save queue
      this.saveQueue.set(key, { moduleId, reportId, data, timestamp: new Date() });

      const response = await apiClient.updateModuleData(reportId, moduleId, {
        ...data,
        lastUpdated: new Date()
      });

      if (response.status === 'success') {
        // Remove from queue on success
        this.saveQueue.delete(key);
        this.retryAttempts.delete(key);

        return {
          success: true,
          data: response.data,
          timestamp: new Date(),
          auditId: response.data?.auditId
        };
      } else {
        throw new Error(response.message || 'Save operation failed');
      }
    } catch (error) {
      const attempts = this.retryAttempts.get(key) || 0;
      
      if (attempts < this.maxRetries) {
        // Increment retry count and schedule retry
        this.retryAttempts.set(key, attempts + 1);
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempts) * 1000;
        
        setTimeout(() => {
          this.saveModuleData(moduleId, reportId, data);
        }, delay);

        return {
          success: false,
          error: `Save failed, retrying... (attempt ${attempts + 1}/${this.maxRetries})`,
          timestamp: new Date()
        };
      } else {
        // Max retries reached, store in localStorage for manual recovery
        this.storeFailedSave(key, { moduleId, reportId, data });
        this.saveQueue.delete(key);
        this.retryAttempts.delete(key);

        return {
          success: false,
          error: error instanceof Error ? error.message : 'Save operation failed after retries',
          timestamp: new Date()
        };
      }
    }
  }

  /**
   * Load module data from the backend
   */
  async loadModuleData(moduleId: string, reportId: string): Promise<any> {
    try {
      const response = await apiClient.getModuleData(reportId, moduleId);
      
      if (response.status === 'success') {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load module data');
      }
    } catch (error) {
      console.error(`Failed to load ${moduleId} data:`, error);
      
      // Try to load from localStorage as fallback
      const localData = this.getLocalStorageData(moduleId, reportId);
      if (localData) {
        console.log(`Loaded ${moduleId} data from localStorage`);
        return localData;
      }
      
      throw error;
    }
  }

  /**
   * Validate module data according to business rules
   */
  validateModuleData(moduleId: string, data: Record<string, unknown>): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      score: 0
    };

    try {
      switch (moduleId) {
        case 'b0':
          return this.validateB0Data(data);
        case 'b1':
          return this.validateB1Data(data);
        case 'b2':
          return this.validateB2Data(data);
        case 'b3':
          return this.validateB3Data(data);
        case 'b8':
          return this.validateB8Data(data);
        default:
          return this.validateGenericData(data);
      }
    } catch (error) {
      result.isValid = false;
      result.errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return result;
    }
  }

  /**
   * Get module completion status
   */
  async getModuleCompletionStatus(moduleId: string, reportId: string): Promise<CompletionStatus> {
    try {
      const response = await apiClient.getModuleStatus(reportId, moduleId);
      
      if (response.status === 'success') {
        return response.data;
      } else {
        // Calculate completion based on available data
        const data = await this.loadModuleData(moduleId, reportId);
        return this.calculateCompletionStatus(moduleId, data);
      }
    } catch (error) {
      console.error(`Failed to get completion status for ${moduleId}:`, error);
      return {
        moduleId,
        completionPercentage: 0,
        requiredFields: [],
        completedFields: [],
        lastUpdated: new Date(),
        validationStatus: 'not_validated'
      };
    }
  }

  /**
   * Get all pending saves (for debugging/monitoring)
   */
  getPendingSaves(): Array<{ key: string; data: Record<string, unknown>; timestamp: Date }> {
    return Array.from(this.saveQueue.entries()).map(([key, value]) => ({
      key,
      data: value.data,
      timestamp: value.timestamp
    }));
  }

  /**
   * Force save all pending data
   */
  async flushPendingSaves(): Promise<SaveResult[]> {
    const results: SaveResult[] = [];
    const pendingSaves = Array.from(this.saveQueue.entries());

    for (const [key, { moduleId, reportId, data }] of pendingSaves) {
      const result = await this.saveModuleData(moduleId, reportId, data);
      results.push(result);
    }

    return results;
  }

  // Private helper methods

  private validateB0Data(data: Record<string, unknown>): ValidationResult {
    const result: ValidationResult = { isValid: true, errors: [], warnings: [], score: 0 };
    const requiredFields = ['companyName', 'registrationNumber', 'naceCode'];
    let completedFields = 0;

    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        result.errors.push(`${field} is required`);
        result.isValid = false;
      } else {
        completedFields++;
      }
    });

    // Validate NACE code format
    if (data.naceCode && !/^\d{2}\.\d{2}$/.test(data.naceCode)) {
      result.errors.push('NACE code must be in format XX.XX (e.g., 01.11)');
      result.isValid = false;
    }

    // Validate staff count
    if (data.staffCount && (data.staffCount < 0 || !Number.isInteger(data.staffCount))) {
      result.errors.push('Staff count must be a positive integer');
      result.isValid = false;
    }

    result.score = Math.round((completedFields / requiredFields.length) * 100);
    return result;
  }

  private validateB1Data(data: Record<string, unknown>): ValidationResult {
    const result: ValidationResult = { isValid: true, errors: [], warnings: [], score: 0 };
    
    if (!data.reportingFramework?.primaryStandard) {
      result.errors.push('Primary reporting standard is required');
      result.isValid = false;
    }

    if (!data.consolidationApproach?.method) {
      result.errors.push('Consolidation method is required');
      result.isValid = false;
    }

    result.score = result.isValid ? 100 : 0;
    return result;
  }

  private validateB2Data(data: Record<string, unknown>): ValidationResult {
    const result: ValidationResult = { isValid: true, errors: [], warnings: [], score: 0 };
    
    // B2 validation logic would go here
    result.score = 50; // Placeholder
    return result;
  }

  private validateB3Data(data: Record<string, unknown>): ValidationResult {
    const result: ValidationResult = { isValid: true, errors: [], warnings: [], score: 0 };
    
    // Validate emissions data
    if (data.scope1Emissions) {
      if (data.scope1Emissions.totalScope1 < 0) {
        result.errors.push('Scope 1 emissions cannot be negative');
        result.isValid = false;
      }
    }

    if (data.scope2Emissions) {
      if (data.scope2Emissions.totalScope2 < 0) {
        result.errors.push('Scope 2 emissions cannot be negative');
        result.isValid = false;
      }
    }

    result.score = result.isValid ? 75 : 0;
    return result;
  }

  private validateB8Data(data: Record<string, unknown>): ValidationResult {
    const result: ValidationResult = { isValid: true, errors: [], warnings: [], score: 0 };
    
    if (data.totalEmployees && data.totalEmployees < 0) {
      result.errors.push('Total employees cannot be negative');
      result.isValid = false;
    }

    if (data.genderBalance) {
      const { male, female } = data.genderBalance;
      if (male < 0 || female < 0) {
        result.errors.push('Gender balance values cannot be negative');
        result.isValid = false;
      }
    }

    result.score = result.isValid ? 80 : 0;
    return result;
  }

  private validateGenericData(data: Record<string, unknown>): ValidationResult {
    return {
      isValid: true,
      errors: [],
      warnings: [],
      score: data ? 50 : 0
    };
  }

  private calculateCompletionStatus(moduleId: string, data: Record<string, unknown>): CompletionStatus {
    const requiredFields = this.getRequiredFields(moduleId);
    const completedFields = requiredFields.filter(field => {
      const value = this.getNestedValue(data, field);
      return value !== null && value !== undefined && value !== '';
    });

    return {
      moduleId,
      completionPercentage: Math.round((completedFields.length / requiredFields.length) * 100),
      requiredFields,
      completedFields,
      lastUpdated: new Date(),
      validationStatus: 'not_validated'
    };
  }

  private getRequiredFields(moduleId: string): string[] {
    const fieldMap: Record<string, string[]> = {
      'b0': ['companyName', 'registrationNumber', 'naceCode', 'staffCount'],
      'b1': ['reportingFramework.primaryStandard', 'consolidationApproach.method'],
      'b3': ['scope1Emissions', 'scope2Emissions'],
      'b8': ['totalEmployees', 'genderBalance']
    };

    return fieldMap[moduleId] || [];
  }

  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private storeFailedSave(key: string, saveData: Record<string, unknown>): void {
    const failedSaves = JSON.parse(localStorage.getItem('esg-failed-saves') || '[]');
    failedSaves.push({
      key,
      ...saveData,
      failedAt: new Date().toISOString()
    });
    localStorage.setItem('esg-failed-saves', JSON.stringify(failedSaves));
  }

  private getLocalStorageData(moduleId: string, reportId: string): Record<string, unknown> | null {
    try {
      const key = `esg-module-${moduleId}-${reportId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const { data } = JSON.parse(stored);
        return data;
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return null;
  }
}

// Export singleton instance
export const moduleDataManager = ModuleDataManager.getInstance();