import { useState, useEffect, useCallback } from 'react';
import { useDashboard } from '@/contexts/dashboard-context';
import { moduleDataManager, SaveResult, ValidationResult, CompletionStatus } from '@/services/module-data-manager';

export interface UseModuleDataOptions {
  moduleId: string;
  autoLoad?: boolean;
  autoSave?: boolean;
  saveInterval?: number;
}

export interface ModuleDataState {
  data: any;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  lastSaved?: Date;
  hasUnsavedChanges: boolean;
  validationResult?: ValidationResult;
  completionStatus?: CompletionStatus;
}

export function useModuleData({
  moduleId,
  autoLoad = true,
  autoSave = true,
  saveInterval = 5000
}: UseModuleDataOptions) {
  const { selectedReport, selectedCompany } = useDashboard();
  
  const [state, setState] = useState<ModuleDataState>({
    data: null,
    isLoading: false,
    isSaving: false,
    error: null,
    hasUnsavedChanges: false
  });

  // Load module data
  const loadData = useCallback(async () => {
    if (!selectedReport) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const data = await moduleDataManager.loadModuleData(moduleId, selectedReport._id);
      const completionStatus = await moduleDataManager.getModuleCompletionStatus(moduleId, selectedReport._id);
      
      setState(prev => ({
        ...prev,
        data,
        completionStatus,
        isLoading: false,
        hasUnsavedChanges: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load data'
      }));
    }
  }, [moduleId, selectedReport]);

  // Save module data
  const saveData = useCallback(async (dataToSave?: any): Promise<SaveResult> => {
    if (!selectedReport) {
      throw new Error('No report selected');
    }

    const savePayload = dataToSave || state.data;
    if (!savePayload) {
      throw new Error('No data to save');
    }

    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }));
      
      const result = await moduleDataManager.saveModuleData(moduleId, selectedReport._id, savePayload);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          lastSaved: result.timestamp,
          hasUnsavedChanges: false,
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          isSaving: false,
          error: result.error || 'Save failed'
        }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Save failed';
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: errorMessage
      }));
      
      return {
        success: false,
        error: errorMessage,
        timestamp: new Date()
      };
    }
  }, [moduleId, selectedReport, state.data]);

  // Update data
  const updateData = useCallback((newData: any) => {
    setState(prev => ({
      ...prev,
      data: newData,
      hasUnsavedChanges: true
    }));
  }, []);

  // Validate data
  const validateData = useCallback((dataToValidate?: any): ValidationResult => {
    const validationData = dataToValidate || state.data;
    const result = moduleDataManager.validateModuleData(moduleId, validationData);
    
    setState(prev => ({
      ...prev,
      validationResult: result
    }));
    
    return result;
  }, [moduleId, state.data]);

  // Refresh completion status
  const refreshCompletionStatus = useCallback(async () => {
    if (!selectedReport) return;

    try {
      const completionStatus = await moduleDataManager.getModuleCompletionStatus(moduleId, selectedReport._id);
      setState(prev => ({
        ...prev,
        completionStatus
      }));
    } catch (error) {
      console.error('Failed to refresh completion status:', error);
    }
  }, [moduleId, selectedReport]);

  // Auto-load data when report changes
  useEffect(() => {
    if (autoLoad && selectedReport) {
      loadData();
    }
  }, [autoLoad, selectedReport, loadData]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !state.hasUnsavedChanges || !state.data) return;

    const timeoutId = setTimeout(() => {
      saveData();
    }, saveInterval);

    return () => clearTimeout(timeoutId);
  }, [autoSave, state.hasUnsavedChanges, state.data, saveInterval, saveData]);

  return {
    // State
    ...state,
    
    // Actions
    loadData,
    saveData,
    updateData,
    validateData,
    refreshCompletionStatus,
    
    // Computed values
    isReady: !!selectedReport && !!selectedCompany,
    completionPercentage: state.completionStatus?.completionPercentage || 0,
    isValid: state.validationResult?.isValid ?? true,
    validationErrors: state.validationResult?.errors || [],
    validationWarnings: state.validationResult?.warnings || []
  };
}

// Hook for managing multiple modules
export function useMultipleModuleData(moduleIds: string[]) {
  const moduleData = moduleIds.reduce((acc, moduleId) => {
    acc[moduleId] = useModuleData({ moduleId });
    return acc;
  }, {} as Record<string, ReturnType<typeof useModuleData>>);

  const overallCompletion = useMemo(() => {
    const completions = Object.values(moduleData).map(m => m.completionPercentage);
    return completions.length > 0 
      ? Math.round(completions.reduce((sum, comp) => sum + comp, 0) / completions.length)
      : 0;
  }, [moduleData]);

  const hasUnsavedChanges = useMemo(() => {
    return Object.values(moduleData).some(m => m.hasUnsavedChanges);
  }, [moduleData]);

  const saveAllModules = useCallback(async () => {
    const results = await Promise.allSettled(
      Object.values(moduleData).map(m => m.saveData())
    );
    
    return results.map((result, index) => ({
      moduleId: moduleIds[index],
      result: result.status === 'fulfilled' ? result.value : { success: false, error: 'Save failed', timestamp: new Date() }
    }));
  }, [moduleData, moduleIds]);

  return {
    moduleData,
    overallCompletion,
    hasUnsavedChanges,
    saveAllModules
  };
}

// Import useMemo for the multiple modules hook
import { useMemo } from 'react';