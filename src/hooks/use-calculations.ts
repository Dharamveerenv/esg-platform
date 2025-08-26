/**
 * React hook for real-time ESG calculations
 * Provides reactive calculations as users input data in forms
 */

import { useState, useEffect, useCallback } from 'react';
import { useDashboard } from '@/contexts/dashboard-context';
import { calculationsService, type EmissionsInput, type WorkforceData } from '@/lib/calculations';

interface CalculationState {
  scope1Total: number;
  scope2Total: number;
  scope3Total: number;
  totalEmissions: number;
  workforceMetrics: {
    turnoverRate?: number;
    accidentRate?: number;
    genderPayGap?: number;
  };
  isCalculating: boolean;
  error: string | null;
  lastCalculated: Date | null;
}

interface CalculationBreakdown {
  scope1: {
    stationary: number;
    mobile: number;
    fugitive: number;
    total: number;
  };
  scope2: {
    locationBased: number;
    marketBased: number;
  };
  formattedEmissions: {
    scope1: string;
    scope2: string;
    scope3: string;
    total: string;
  };
}

export const useCalculations = () => {
  const { selectedReport } = useDashboard();
  
  const [calculationState, setCalculationState] = useState<CalculationState>({
    scope1Total: 0,
    scope2Total: 0,
    scope3Total: 0,
    totalEmissions: 0,
    workforceMetrics: {},
    isCalculating: false,
    error: null,
    lastCalculated: null
  });

  const [calculationBreakdown, setCalculationBreakdown] = useState<CalculationBreakdown>({
    scope1: { stationary: 0, mobile: 0, fugitive: 0, total: 0 },
    scope2: { locationBased: 0, marketBased: 0 },
    formattedEmissions: { scope1: '0 kg CO2e', scope2: '0 kg CO2e', scope3: '0 kg CO2e', total: '0 kg CO2e' }
  });

  /**
   * Calculate emissions preview (client-side for immediate feedback)
   */
  const calculatePreview = useCallback((emissionsData: EmissionsInput) => {
    try {
      setCalculationState(prev => ({ ...prev, isCalculating: true, error: null }));

      let scope1Result = { stationary: 0, mobile: 0, fugitive: 0, total: 0 };
      let scope2Result = { locationBased: 0, marketBased: 0 };

      // Calculate Scope 1 if data provided
      if (emissionsData.scope1) {
        scope1Result = calculationsService.calculateScope1Preview(emissionsData.scope1);
      }

      // Calculate Scope 2 if data provided
      if (emissionsData.scope2) {
        scope2Result = calculationsService.calculateScope2Preview(emissionsData.scope2.electricityData);
      }

      const totalEmissions = scope1Result.total + scope2Result.locationBased;

      // Update state
      setCalculationState(prev => ({
        ...prev,
        scope1Total: scope1Result.total,
        scope2Total: scope2Result.locationBased,
        totalEmissions,
        isCalculating: false,
        lastCalculated: new Date()
      }));

      setCalculationBreakdown({
        scope1: scope1Result,
        scope2: scope2Result,
        formattedEmissions: {
          scope1: calculationsService.formatEmissions(scope1Result.total),
          scope2: calculationsService.formatEmissions(scope2Result.locationBased),
          scope3: calculationsService.formatEmissions(0), // TODO: Implement Scope 3
          total: calculationsService.formatEmissions(totalEmissions)
        }
      });

    } catch (error) {
      setCalculationState(prev => ({
        ...prev,
        isCalculating: false,
        error: error instanceof Error ? error.message : 'Calculation failed'
      }));
    }
  }, []);

  /**
   * Calculate workforce metrics preview
   */
  const calculateWorkforcePreview = useCallback((workforceData: WorkforceData) => {
    try {
      const metrics = calculationsService.calculateWorkforceMetricsPreview(workforceData);
      
      setCalculationState(prev => ({
        ...prev,
        workforceMetrics: metrics,
        lastCalculated: new Date()
      }));

    } catch (error) {
      setCalculationState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Workforce calculation failed'
      }));
    }
  }, []);

  /**
   * Perform full backend calculation
   */
  const calculateFull = useCallback(async (emissionsData: EmissionsInput) => {
    if (!selectedReport) {
      throw new Error('No report selected');
    }

    try {
      setCalculationState(prev => ({ ...prev, isCalculating: true, error: null }));

      // Validate data first
      const validation = calculationsService.validateEmissionsData(emissionsData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Perform backend calculation
      const result = await calculationsService.calculateRealTimeEmissions(
        selectedReport._id, 
        emissionsData
      );

      if (result.success && result.data) {
        const data = result.data;
        
        setCalculationState(prev => ({
          ...prev,
          scope1Total: data.scope1?.total || 0,
          scope2Total: data.scope2?.total || 0,
          scope3Total: data.scope3?.total || 0,
          totalEmissions: data.total || 0,
          isCalculating: false,
          lastCalculated: new Date()
        }));

        return result.data;
      } else {
        throw new Error(result.error || 'Calculation failed');
      }

    } catch (error) {
      setCalculationState(prev => ({
        ...prev,
        isCalculating: false,
        error: error instanceof Error ? error.message : 'Calculation failed'
      }));
      throw error;
    }
  }, [selectedReport]);

  /**
   * Save emissions data and trigger calculation
   */
  const saveAndCalculate = useCallback(async (
    moduleId: string, 
    data: any, 
    triggerCalculation = true
  ) => {
    if (!selectedReport) {
      throw new Error('No report selected');
    }

    try {
      setCalculationState(prev => ({ ...prev, isCalculating: true, error: null }));

      // Save data first
      const saveResult = await calculationsService.saveEmissionsData(
        selectedReport._id,
        moduleId,
        data
      );

      if (!saveResult.success) {
        throw new Error(saveResult.error || 'Failed to save data');
      }

      // Trigger calculation if requested
      if (triggerCalculation && data.emissionsData) {
        await calculateFull(data.emissionsData);
      }

      return saveResult.data;

    } catch (error) {
      setCalculationState(prev => ({
        ...prev,
        isCalculating: false,
        error: error instanceof Error ? error.message : 'Save and calculation failed'
      }));
      throw error;
    }
  }, [selectedReport, calculateFull]);

  /**
   * Load saved emissions data
   */
  const loadEmissionsData = useCallback(async (moduleId: string) => {
    if (!selectedReport) {
      return null;
    }

    try {
      const result = await calculationsService.getEmissionsData(
        selectedReport._id,
        moduleId
      );

      if (result.success) {
        return result.data;
      } else {
        console.warn(`Failed to load ${moduleId} data:`, result.error);
        return null;
      }
    } catch (error) {
      console.error(`Error loading ${moduleId} data:`, error);
      return null;
    }
  }, [selectedReport]);

  /**
   * Get emission factor information
   */
  const getEmissionFactorInfo = useCallback((fuelType: string, country?: string) => {
    return calculationsService.getEmissionFactorInfo(fuelType, country);
  }, []);

  /**
   * Format emissions for display
   */
  const formatEmissions = useCallback((value: number, unit?: string) => {
    return calculationsService.formatEmissions(value, unit);
  }, []);

  /**
   * Clear current calculations
   */
  const clearCalculations = useCallback(() => {
    setCalculationState({
      scope1Total: 0,
      scope2Total: 0,
      scope3Total: 0,
      totalEmissions: 0,
      workforceMetrics: {},
      isCalculating: false,
      error: null,
      lastCalculated: null
    });
    setCalculationBreakdown({
      scope1: { stationary: 0, mobile: 0, fugitive: 0, total: 0 },
      scope2: { locationBased: 0, marketBased: 0 },
      formattedEmissions: { scope1: '0 kg CO2e', scope2: '0 kg CO2e', scope3: '0 kg CO2e', total: '0 kg CO2e' }
    });
  }, []);

  /**
   * Auto-load data when report changes
   */
  useEffect(() => {
    if (selectedReport) {
      // Load existing calculation results if available
      loadEmissionsData('b3').then(data => {
        if (data?.emissionsData) {
          calculatePreview(data.emissionsData);
        }
      });
    } else {
      clearCalculations();
    }
  }, [selectedReport, loadEmissionsData, calculatePreview, clearCalculations]);

  return {
    // State
    calculationState,
    calculationBreakdown,
    
    // Actions
    calculatePreview,
    calculateWorkforcePreview,
    calculateFull,
    saveAndCalculate,
    loadEmissionsData,
    clearCalculations,
    
    // Utilities
    getEmissionFactorInfo,
    formatEmissions,
    
    // Computed values
    hasData: calculationState.totalEmissions > 0,
    isReportSelected: !!selectedReport,
  };
};