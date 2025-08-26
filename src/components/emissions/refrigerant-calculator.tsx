"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Snowflake, AlertCircle, Database, Loader2, Calculator } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCalculations } from '@/hooks/use-calculations';
import { calculationsService } from '@/lib/calculations';
import { apiClient } from '@/lib/api-client';

interface ComponentRefrigerantData {
  refrigerantType: string;
  quantity: number;
  unit: string;
  equipment?: string;
  leakageRate?: number;
  period?: string;
  _emissionFactorData?: {
    factor: number;
    unit: string;
    source: string;
    uncertainty?: string;
  };
  _isFromDatabase?: boolean;
}

export function RefrigerantCalculator() {
  const { 
    calculatePreview, 
    calculationBreakdown, 
    formatEmissions,
    getEmissionFactorInfo,
    saveAndCalculate,
    calculationState
  } = useCalculations();
  
  // State for database emission factors
  const [emissionFactorData, setEmissionFactorData] = useState<{
    factor: number;
    unit: string;
    source: string;
    uncertainty?: string;
  } | null>(null);
  const [loadingFactor, setLoadingFactor] = useState(false);

  const [refrigerantEntries, setRefrigerantEntries] = useState<ComponentRefrigerantData[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<ComponentRefrigerantData>>({
    refrigerantType: '',
    quantity: 0,
    unit: 'kg',
    equipment: '',
    leakageRate: 0,
    period: 'annual'
  });

  // State management for fugitive gases and emission factors
  const [availableFugitiveGases, setAvailableFugitiveGases] = useState<string[]>([]);
  const [loadingGases, setLoadingGases] = useState(true);
  const [gasLoadError, setGasLoadError] = useState<string | null>(null);

  // Complete fugitive gases list from UK Gov GHG Conversion Factors 2025 CSV
  const FALLBACK_FUGITIVE_GASES = [
    // Basic greenhouse gases
    'Carbon dioxide', 'Methane', 'Nitrous oxide', 'Sulphur hexafluoride (SF6)',
    
    // HFC series (complete)
    'HFC-23', 'HFC-32', 'HFC-41', 'HFC-125', 'HFC-134', 'HFC-134a',
    'HFC-143', 'HFC-143a', 'HFC-152', 'HFC-152a', 'HFC-161', 'HFC-227ea', 
    'HFC-236cb', 'HFC-236ea', 'HFC-236fa', 'HFC-245ca', 'HFC-245fa', 
    'HFC-365mfc', 'HFC-43-I0mee',
    
    // PFC series (complete)
    'Perfluoromethane (PFC-14)', 'Perfluoroethane (PFC-116)', 'Perfluoropropane (PFC-218)',
    'Perfluorocyclobutane (PFC-318)', 'Perfluorobutane (PFC-3-1-10)', 'Perfluoropentane (PFC-4-1-12)',
    'Perfluorohexane (PFC-5-1-14)', 'PFC-9-1-18', 'Perfluorocyclopropane',
    
    // Other fluorinated gases
    'Nitrogen trifluoride',
    
    // R-series refrigerants (complete from CSV)
    'R401A', 'R401B', 'R401C', 'R402A', 'R402B', 'R403A', 'R403B', 'R404A', 'R405A',
    'R406A', 'R407A', 'R407B', 'R407C', 'R407D', 'R407E', 'R407F', 'R408A', 'R409A', 'R409B',
    'R410A', 'R410B', 'R411A', 'R411B', 'R412A', 'R413A', 'R414A', 'R414B', 'R415A', 'R415B',
    'R416A', 'R417A', 'R417B', 'R417C', 'R418A', 'R419A', 'R419B', 'R420A', 'R421A', 'R421B',
    'R422A', 'R422B', 'R422C', 'R422D', 'R422E', 'R423A', 'R424A', 'R425A', 'R426A', 'R427A',
    'R428A', 'R429A', 'R430A', 'R431A', 'R432A', 'R433A', 'R433B', 'R433C', 'R434A', 'R435A',
    'R436A', 'R436B', 'R437A', 'R438A', 'R439A', 'R440A', 'R441A', 'R442A', 'R443A', 'R444A',
    'R445A', 'R500', 'R501', 'R502', 'R503', 'R504', 'R505', 'R506', 'R507A', 'R508A', 'R508B',
    'R509A', 'R510A', 'R511A', 'R512A',
    
    // CFC series
    'CFC-11/R11 = trichlorofluoromethane', 'CFC-12/R12 = dichlorodifluoromethane', 'CFC-13',
    'CFC-113', 'CFC-114', 'CFC-115',
    
    // Halon compounds
    'Halon-1211', 'Halon-1301', 'Halon-2402',
    
    // Other ozone depleting substances
    'Carbon tetrachloride', 'Methyl bromide', 'Methyl chloroform',
    
    // HCFC series (complete)
    'HCFC-21', 'HCFC-22/R22 = chlorodifluoromethane', 'HCFC-123', 'HCFC-124', 
    'HCFC-141b', 'HCFC-142b', 'HCFC-225ca', 'HCFC-225cb',
    
    // HFE compounds
    'HFE-125', 'HFE-134', 'HFE-143a', 'HCFE-235da2', 'HFE-245cb2', 'HFE-245fa2',
    'HFE-254cb2', 'HFE-347mcc3', 'HFE-347pcf2', 'HFE-356pcc3', 'HFE-449sl (HFE-7100)',
    'HFE-569sf2 (HFE-7200)', 'HFE-43-10pccc124 (H-Galden1040x)', 'HFE-236ca12 (HG-10)',
    'HFE-338pcc13 (HG-01)',
    
    // Other specialty compounds
    'Trifluoromethyl sulphur pentafluoride', 'PFPMIE', 'Dimethylether', 'Methylene chloride',
    'Methyl chloride',
    
    // Natural refrigerants and low-GWP alternatives
    'R290 = propane', 'R600A = isobutane', 'R600 = butane', 'R601 = n-pentane', 'R601A = isopentane',
    'R170 = ethane', 'R1270 = propylene', 'R1234yf*', 'R1234ze*'
  ];

  // Initialize fugitive gases from database
  useEffect(() => {
    const initializeFugitiveGases = async () => {
      try {
        setLoadingGases(true);
        setGasLoadError(null);

        console.log('🔍 Loading fugitive gases from database...');
        
        // Try multiple approaches to find fugitive emission factors
        let response = await apiClient.getEmissionFactors({
          category: 'Fugitive',
          limit: 200
        });
        
        // If Fugitive category doesn't exist, try getting all factors and filter
        if (!response.success || !response.data?.factors?.length) {
          console.log('🔄 Fugitive category not found, trying all emission factors...');
          response = await apiClient.getEmissionFactors({
            limit: 500
          });
        }
        
        if (response.success && response.data?.factors && response.data.factors.length > 0) {
          console.log(`🔍 Processing ${response.data.factors.length} emission factors from database`);
          
          // Filter for refrigerants and fugitive gases (look for common patterns)
          const gasNames = response.data.factors
            .map((factor: any) => factor.fuelSpecifications?.fuelType || factor.name || factor.factorMetadata?.name)
            .filter((name: string) => {
              if (!name || !name.trim()) return false;
              
              // Look for typical refrigerant/fugitive gas patterns
              const lowerName = name.toLowerCase();
              return lowerName.includes('hfc') || 
                     lowerName.includes('pfc') || 
                     lowerName.includes('cfc') || 
                     lowerName.startsWith('r-') ||
                     lowerName.startsWith('r4') ||
                     lowerName.includes('refrigerant') ||
                     lowerName.includes('methane') ||
                     lowerName.includes('carbon dioxide') ||
                     lowerName.includes('sulphur hexafluoride') ||
                     lowerName.includes('nitrous oxide');
            })
            .sort();

          // Remove duplicates and combine with fallback list
          const databaseGases = [...new Set(gasNames)];
          const combinedGases = [...new Set([...databaseGases, ...FALLBACK_FUGITIVE_GASES])].sort();
          
          console.log(`✅ Found ${databaseGases.length} database gases + ${FALLBACK_FUGITIVE_GASES.length} fallback = ${combinedGases.length} total`);
          
          if (combinedGases.length > 0) {
            setAvailableFugitiveGases(combinedGases);
          } else {
            throw new Error('No recognizable fugitive gases found in database');
          }
        } else {
          throw new Error('Failed to load any emission factors from database');
        }
      } catch (error) {
        console.error('❌ Failed to load fugitive gases from database:', error);
        console.log('🔄 Using fallback fugitive gases list');
        setGasLoadError('Using fallback list - database unavailable');
        setAvailableFugitiveGases(FALLBACK_FUGITIVE_GASES);
      } finally {
        setLoadingGases(false);
      }
    };

    initializeFugitiveGases();
  }, []);

  // Handle emission factor lookup when refrigerant type changes
  useEffect(() => {
    const fetchEmissionFactor = async () => {
      if (!currentEntry.refrigerantType?.trim()) {
        setEmissionFactorData(null);
        return;
      }

      setLoadingFactor(true);
      try {
        console.log(`🔍 Looking up emission factor for: ${currentEntry.refrigerantType}`);
        const factor = await calculationsService.getEmissionFactorFromDB(
          currentEntry.refrigerantType, 
          'Ireland'
        );
        console.log(`✅ Database factor found:`, factor);
        setEmissionFactorData(factor);
      } catch (error) {
        console.warn(`⚠️ Database lookup failed for ${currentEntry.refrigerantType}:`, error);
        const fallbackFactor = getEmissionFactorInfo(currentEntry.refrigerantType);
        console.log(`🔄 Using fallback factor:`, fallbackFactor);
        setEmissionFactorData(fallbackFactor);
      } finally {
        setLoadingFactor(false);
      }
    };

    fetchEmissionFactor();
  }, [currentEntry.refrigerantType, getEmissionFactorInfo]);

  // Trigger calculation when refrigerant entries change
  useEffect(() => {
    if (refrigerantEntries.length > 0) {
      // Transform to the format expected by calculatePreview
      const transformedEntries = refrigerantEntries.map(entry => ({
        type: entry.refrigerantType,
        quantityLeaked: entry.quantity,
        equipmentType: entry.equipment,
        leakageRate: entry.leakageRate
      }));
      
      calculatePreview({
        scope1: {
          fugitiveEmissions: transformedEntries
        },
        country: 'Ireland'
      });
    }
  }, [refrigerantEntries, calculatePreview]);

  const handleAddRefrigerant = () => {
    if (currentEntry.refrigerantType && currentEntry.quantity && currentEntry.quantity > 0 && emissionFactorData) {
      const newEntry: ComponentRefrigerantData = {
        refrigerantType: currentEntry.refrigerantType,
        quantity: currentEntry.quantity,
        unit: currentEntry.unit || 'kg',
        equipment: currentEntry.equipment,
        leakageRate: currentEntry.leakageRate,
        period: currentEntry.period,
        // Store the emission factor data for this entry
        _emissionFactorData: emissionFactorData,
        _isFromDatabase: !!emissionFactorData
      };

      setRefrigerantEntries([...refrigerantEntries, newEntry]);
      setCurrentEntry({
        refrigerantType: '',
        quantity: 0,
        unit: 'kg',
        equipment: '',
        leakageRate: 0,
        period: 'annual'
      });
    }
  };

  const handleRemoveRefrigerant = (index: number) => {
    setRefrigerantEntries(refrigerantEntries.filter((_, i) => i !== index));
  };

  const handleSaveData = async () => {
    try {
      // Transform component data to calculations service format
      const transformedEntries = refrigerantEntries.map(entry => ({
        type: entry.refrigerantType,
        quantityLeaked: entry.quantity,
        equipmentType: entry.equipment,
        leakageRate: entry.leakageRate
      }));

      await saveAndCalculate('b3', {
        emissionsData: {
          scope1: {
            fugitiveEmissions: transformedEntries
          },
          country: 'Ireland'
        }
      });
    } catch (error) {
      console.error('Failed to save refrigerant data:', error);
    }
  };

  const getPreviewCalculation = () => {
    if (currentEntry.refrigerantType && currentEntry.quantity && currentEntry.quantity > 0) {
      // Use database emission factor if available, otherwise fallback to hardcoded
      const factorInfo = emissionFactorData || getEmissionFactorInfo(currentEntry.refrigerantType);
      const previewEmissions = currentEntry.quantity * factorInfo.factor;
      return {
        emissions: previewEmissions,
        factorInfo,
        isFromDatabase: !!emissionFactorData
      };
    }
    return null;
  };

  const preview = getPreviewCalculation();
  const totalEmissions = refrigerantEntries.reduce((total, entry) => {
    const factorInfo = entry._emissionFactorData || getEmissionFactorInfo(entry.refrigerantType);
    return total + (entry.quantity * factorInfo.factor);
  }, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Snowflake className="h-5 w-5" />
        Fugitive Emissions (Refrigerants)
      </h3>
      
      {/* Add Refrigerant Entry Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="space-y-2">
          <Label htmlFor="refrigerant-type">Refrigerant Type</Label>
          <Select 
            value={currentEntry.refrigerantType} 
            onValueChange={(value) => setCurrentEntry({...currentEntry, refrigerantType: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select refrigerant" />
            </SelectTrigger>
            <SelectContent>
              {loadingGases ? (
                <SelectItem value="loading" disabled>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Loading fugitive gases...
                  </div>
                </SelectItem>
              ) : availableFugitiveGases.length === 0 ? (
                <SelectItem value="no-data" disabled>
                  No fugitive gases available
                </SelectItem>
              ) : (
                <>
                  {gasLoadError && (
                    <SelectItem value="error-info" disabled className="text-yellow-600">
                      ⚠️ {gasLoadError}
                    </SelectItem>
                  )}
                  {availableFugitiveGases.map((gas) => (
                    <SelectItem key={gas} value={gas}>
                      {gas}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity Leaked</Label>
          <Input
            id="quantity"
            type="number"
            step="0.01"
            value={currentEntry.quantity || ''}
            onChange={(e) => setCurrentEntry({...currentEntry, quantity: parseFloat(e.target.value) || 0})}
            placeholder="Enter quantity"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select 
            value={currentEntry.unit} 
            onValueChange={(value) => setCurrentEntry({...currentEntry, unit: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="g">Grams</SelectItem>
              <SelectItem value="tonne">Tonnes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="equipment">Equipment</Label>
          <Input
            id="equipment"
            value={currentEntry.equipment || ''}
            onChange={(e) => setCurrentEntry({...currentEntry, equipment: e.target.value})}
            placeholder="e.g. AC Unit #1"
          />
        </div>
      </div>

      {/* Real-time Preview */}
      {loadingFactor && currentEntry.refrigerantType && (
        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
            <span className="text-sm text-yellow-800 dark:text-yellow-200">
              Loading emission factor from database...
            </span>
          </div>
        </div>
      )}
      
      {preview && !loadingFactor && (
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            {preview.isFromDatabase ? (
              <Database className="h-4 w-4 mt-0.5 text-green-600" />
            ) : (
              <Calculator className="h-4 w-4 mt-0.5 text-blue-600" />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1 flex items-center gap-2">
                Fugitive Emissions Preview
                {preview.isFromDatabase && (
                  <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                    Live Database
                  </Badge>
                )}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700 dark:text-blue-300">Emission Factor:</span>{' '}
                  <Badge variant="outline" className="ml-1">
                    {preview.factorInfo.factor} {preview.factorInfo.unit}
                  </Badge>
                </div>
                <div>
                  <span className="text-blue-700 dark:text-blue-300">Calculated Emissions:</span>{' '}
                  <Badge variant="default" className="ml-1">
                    {formatEmissions(preview.emissions)}
                  </Badge>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Source: {preview.factorInfo.source}
                  {preview.factorInfo.uncertainty && (
                    <span className="ml-2">±{preview.factorInfo.uncertainty}</span>
                  )}
                </div>
                {preview.isFromDatabase && (
                  <div className="text-xs text-green-600 dark:text-green-400">
                    ✓ Using real-time database values
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          onClick={handleAddRefrigerant}
          disabled={!currentEntry.refrigerantType || !currentEntry.quantity || currentEntry.quantity <= 0 || !emissionFactorData || loadingFactor}
        >
          {loadingFactor ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading Factor...
            </>
          ) : (
            'Add Refrigerant Entry'
          )}
        </Button>
      </div>

      {/* Refrigerant Entries List */}
      {refrigerantEntries.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Current Entries</h4>
          {refrigerantEntries.map((entry, index) => {
            const factorInfo = entry._emissionFactorData || getEmissionFactorInfo(entry.refrigerantType);
            const emissions = entry.quantity * factorInfo.factor;
            
            return (
              <div 
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {entry.refrigerantType}
                      {entry._isFromDatabase && (
                        <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 text-xs">
                          <Database className="h-3 w-3 mr-1" />
                          DB
                        </Badge>
                      )}
                    </div>
                    {entry.equipment && (
                      <div className="text-sm text-muted-foreground">{entry.equipment}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Quantity</div>
                    <div className="font-medium">{entry.quantity} {entry.unit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Factor</div>
                    <div className="font-medium text-xs">{factorInfo.factor} {factorInfo.unit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Emissions</div>
                    <Badge variant="default">{formatEmissions(emissions)}</Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRemoveRefrigerant(index)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {refrigerantEntries.length > 0 && (
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Total Fugitive Emissions</div>
              <div className="text-sm text-muted-foreground">{refrigerantEntries.length} refrigerant entries</div>
            </div>
            <Badge variant="default" className="text-lg px-3 py-1">
              {formatEmissions(totalEmissions)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSaveData}
              disabled={calculationState.isCalculating}
            >
              {calculationState.isCalculating ? 'Saving...' : 'Save All Data'}
            </Button>
            <Button variant="outline">
              Generate Report Section
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}