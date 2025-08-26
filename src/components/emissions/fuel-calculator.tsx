"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Factory, AlertCircle, Database, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCalculations } from '@/hooks/use-calculations';
import { calculationsService } from '@/lib/calculations';
import type { FuelData } from '@/lib/calculations';

export function FuelCalculator() {
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

  const [fuelEntries, setFuelEntries] = useState<FuelData[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<FuelData>>({
    fuelType: '',
    quantity: 0,
    unit: 'litre',
    equipment: '',
    period: 'annual'
  });

  // Fetch emission factor from database when fuel type changes
  useEffect(() => {
    const fetchEmissionFactor = async () => {
      if (currentEntry.fuelType && currentEntry.fuelType.trim() !== '') {
        setLoadingFactor(true);
        try {
          const factor = await calculationsService.getEmissionFactorFromDB(currentEntry.fuelType, 'Ireland');
          setEmissionFactorData(factor);
        } catch (error) {
          console.warn('Failed to fetch emission factor:', error);
          // Fallback to hardcoded values
          const fallbackFactor = getEmissionFactorInfo(currentEntry.fuelType);
          setEmissionFactorData(fallbackFactor);
        } finally {
          setLoadingFactor(false);
        }
      } else {
        setEmissionFactorData(null);
      }
    };

    fetchEmissionFactor();
  }, [currentEntry.fuelType, getEmissionFactorInfo]);

  // Trigger calculation when fuel entries change
  useEffect(() => {
    if (fuelEntries.length > 0) {
      calculatePreview({
        scope1: {
          stationaryCombustion: fuelEntries
        },
        country: 'Ireland'
      });
    }
  }, [fuelEntries, calculatePreview]);

  const handleAddFuel = () => {
    if (currentEntry.fuelType && currentEntry.quantity && currentEntry.quantity > 0 && emissionFactorData) {
      const newEntry: FuelData = {
        fuelType: currentEntry.fuelType,
        quantity: currentEntry.quantity,
        unit: currentEntry.unit || 'litre',
        equipment: currentEntry.equipment,
        period: currentEntry.period,
        // Store the emission factor data for this entry
        _emissionFactorData: emissionFactorData,
        _isFromDatabase: !!emissionFactorData
      };

      setFuelEntries([...fuelEntries, newEntry]);
      setCurrentEntry({
        fuelType: '',
        quantity: 0,
        unit: 'litre',
        equipment: '',
        period: 'annual'
      });
    }
  };

  const handleRemoveFuel = (index: number) => {
    setFuelEntries(fuelEntries.filter((_, i) => i !== index));
  };

  const handleSaveData = async () => {
    try {
      await saveAndCalculate('b3', {
        emissionsData: {
          scope1: {
            stationaryCombustion: fuelEntries
          },
          country: 'Ireland'
        }
      });
    } catch (error) {
      console.error('Failed to save fuel data:', error);
    }
  };

  const getPreviewCalculation = () => {
    if (currentEntry.fuelType && currentEntry.quantity && currentEntry.quantity > 0) {
      // Use database emission factor if available, otherwise fallback to hardcoded
      const factorInfo = emissionFactorData || getEmissionFactorInfo(currentEntry.fuelType);
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

  return (
    <div className="space-y-6">
      {/* Add Fuel Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5" />
            Add Fuel Consumption
          </CardTitle>
          <CardDescription>
            Add fuel consumption data for stationary combustion emissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuel-type">Fuel Type</Label>
              <Select 
                value={currentEntry.fuelType} 
                onValueChange={(value) => setCurrentEntry({...currentEntry, fuelType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Natural Gas">Natural Gas</SelectItem>
                  <SelectItem value="Fuel Oil">Fuel Oil</SelectItem>
                  <SelectItem value="LPG">LPG</SelectItem>
                  <SelectItem value="Coal">Coal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
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
                  <SelectItem value="litre">Litres</SelectItem>
                  <SelectItem value="kg">Kilograms</SelectItem>
                  <SelectItem value="m3">Cubic Metres</SelectItem>
                  <SelectItem value="tonne">Tonnes</SelectItem>
                  <SelectItem value="kWh">kWh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment</Label>
              <Input
                id="equipment"
                value={currentEntry.equipment || ''}
                onChange={(e) => setCurrentEntry({...currentEntry, equipment: e.target.value})}
                placeholder="e.g. Boiler #1"
              />
            </div>
          </div>

          {/* Real-time Preview */}
          {loadingFactor && currentEntry.fuelType && (
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
                    Calculation Preview
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
              onClick={handleAddFuel}
              disabled={!currentEntry.fuelType || !currentEntry.quantity || currentEntry.quantity <= 0 || !emissionFactorData || loadingFactor}
            >
              {loadingFactor ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading Factor...
                </>
              ) : (
                'Add Fuel Entry'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fuel Entries List */}
      {fuelEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fuel Consumption Entries</CardTitle>
            <CardDescription>
              Current fuel consumption data with calculated emissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fuelEntries.map((entry, index) => {
                const factorInfo = getEmissionFactorInfo(entry.fuelType);
                const emissions = entry.quantity * factorInfo.factor;
                
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {entry.fuelType}
                          {(entry as any)._isFromDatabase && (
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
                        <div className="font-medium">{factorInfo.factor} {factorInfo.unit}</div>
                        {(entry as any)._emissionFactorData?.source && (
                          <div className="text-xs text-muted-foreground">
                            {(entry as any)._emissionFactorData.source}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Emissions</div>
                        <Badge variant="default">{formatEmissions(emissions)}</Badge>
                        {(entry as any)._emissionFactorData?.uncertainty && (
                          <div className="text-xs text-muted-foreground">
                            ±{(entry as any)._emissionFactorData.uncertainty}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveFuel(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary and Actions */}
      {fuelEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Stationary Combustion Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {fuelEntries.length}
                </div>
                <div className="text-sm text-muted-foreground">Fuel Types</div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatEmissions(calculationBreakdown.scope1.stationary)}
                </div>
                <div className="text-sm text-muted-foreground">Total Emissions</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {calculationState.lastCalculated ? 'Live' : 'Pending'}
                </div>
                <div className="text-sm text-muted-foreground">Calculation Status</div>
              </div>
            </div>

            {calculationState.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {calculationState.error}
                </AlertDescription>
              </Alert>
            )}

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
          </CardContent>
        </Card>
      )}
    </div>
  );
}