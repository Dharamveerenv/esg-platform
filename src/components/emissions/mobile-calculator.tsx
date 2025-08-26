"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Car, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCalculations } from '@/hooks/use-calculations';

interface VehicleEntry {
  vehicleType: string;
  fuelType: string;
  calculationMethod: 'fuel-based' | 'distance-based';
  fuelConsumption?: number; // litres/year
  distanceTraveled?: number; // km/year
  vehicleDescription?: string;
}

export function MobileCalculator() {
  const { 
    calculatePreview, 
    calculationBreakdown, 
    formatEmissions,
    saveAndCalculate,
    calculationState
  } = useCalculations();

  const [vehicleEntries, setVehicleEntries] = useState<VehicleEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<VehicleEntry>>({
    vehicleType: '',
    fuelType: '',
    calculationMethod: 'fuel-based',
    fuelConsumption: 0,
    distanceTraveled: 0,
    vehicleDescription: ''
  });

  // Vehicle emission factors
  const fuelFactors: Record<string, { factor: number; unit: string }> = {
    'diesel': { factor: 2.67, unit: 'kg CO2e/litre' },
    'petrol': { factor: 2.31, unit: 'kg CO2e/litre' },
    'hybrid': { factor: 1.85, unit: 'kg CO2e/litre' }
  };

  const distanceFactors: Record<string, { diesel: number; petrol: number; hybrid: number; unit: string }> = {
    'car': { diesel: 0.171, petrol: 0.168, hybrid: 0.109, unit: 'kg CO2e/km' },
    'van': { diesel: 0.253, petrol: 0.249, hybrid: 0.162, unit: 'kg CO2e/km' },
    'truck': { diesel: 0.451, petrol: 0.445, hybrid: 0.290, unit: 'kg CO2e/km' },
    'motorbike': { diesel: 0.113, petrol: 0.108, hybrid: 0.070, unit: 'kg CO2e/km' }
  };

  // Calculate emissions when entries change
  useEffect(() => {
    if (vehicleEntries.length > 0) {
      const mobileData = vehicleEntries.map(entry => ({
        type: entry.vehicleType,
        fuelType: entry.fuelType,
        calculationMethod: entry.calculationMethod,
        fuelConsumption: entry.fuelConsumption || 0,
        distanceTraveled: entry.distanceTraveled || 0,
        distanceUnit: 'km',
        weightClass: 'standard'
      }));

      calculatePreview({
        scope1: {
          mobileCombustion: mobileData
        },
        country: 'Ireland'
      });
    }
  }, [vehicleEntries, calculatePreview]);

  const handleAddVehicle = () => {
    if (currentEntry.vehicleType && currentEntry.fuelType && currentEntry.calculationMethod) {
      const isValidEntry = 
        (currentEntry.calculationMethod === 'fuel-based' && currentEntry.fuelConsumption && currentEntry.fuelConsumption > 0) ||
        (currentEntry.calculationMethod === 'distance-based' && currentEntry.distanceTraveled && currentEntry.distanceTraveled > 0);

      if (isValidEntry) {
        const newEntry: VehicleEntry = {
          vehicleType: currentEntry.vehicleType,
          fuelType: currentEntry.fuelType,
          calculationMethod: currentEntry.calculationMethod,
          fuelConsumption: currentEntry.fuelConsumption || 0,
          distanceTraveled: currentEntry.distanceTraveled || 0,
          vehicleDescription: currentEntry.vehicleDescription
        };

        setVehicleEntries([...vehicleEntries, newEntry]);
        setCurrentEntry({
          vehicleType: '',
          fuelType: '',
          calculationMethod: 'fuel-based',
          fuelConsumption: 0,
          distanceTraveled: 0,
          vehicleDescription: ''
        });
      }
    }
  };

  const handleRemoveVehicle = (index: number) => {
    setVehicleEntries(vehicleEntries.filter((_, i) => i !== index));
  };

  const handleSaveData = async () => {
    try {
      const mobileData = vehicleEntries.map(entry => ({
        type: entry.vehicleType,
        fuelType: entry.fuelType,
        calculationMethod: entry.calculationMethod,
        fuelConsumption: entry.fuelConsumption || 0,
        distanceTraveled: entry.distanceTraveled || 0,
        distanceUnit: 'km',
        weightClass: 'standard'
      }));

      await saveAndCalculate('b3', {
        emissionsData: {
          scope1: {
            mobileCombustion: mobileData
          },
          country: 'Ireland'
        }
      });
    } catch (error) {
      console.error('Failed to save mobile combustion data:', error);
    }
  };

  const getPreviewCalculation = () => {
    if (currentEntry.vehicleType && currentEntry.fuelType && currentEntry.calculationMethod) {
      if (currentEntry.calculationMethod === 'fuel-based' && currentEntry.fuelConsumption && currentEntry.fuelConsumption > 0) {
        const fuelFactor = fuelFactors[currentEntry.fuelType];
        const emissions = currentEntry.fuelConsumption * fuelFactor.factor;
        return {
          emissions,
          method: 'fuel-based',
          factor: fuelFactor.factor,
          unit: fuelFactor.unit,
          quantity: currentEntry.fuelConsumption,
          quantityUnit: 'litres'
        };
      } else if (currentEntry.calculationMethod === 'distance-based' && currentEntry.distanceTraveled && currentEntry.distanceTraveled > 0) {
        const distanceFactor = distanceFactors[currentEntry.vehicleType];
        if (distanceFactor) {
          const factor = distanceFactor[currentEntry.fuelType as keyof typeof distanceFactor] as number;
          const emissions = currentEntry.distanceTraveled * factor;
          return {
            emissions,
            method: 'distance-based',
            factor,
            unit: distanceFactor.unit,
            quantity: currentEntry.distanceTraveled,
            quantityUnit: 'km'
          };
        }
      }
    }
    return null;
  };

  const preview = getPreviewCalculation();

  return (
    <div className="space-y-6">
      {/* Add Vehicle Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Add Company Vehicle
          </CardTitle>
          <CardDescription>
            Add mobile combustion data for company-owned or controlled vehicles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle-type">Vehicle Type</Label>
              <Select 
                value={currentEntry.vehicleType} 
                onValueChange={(value) => setCurrentEntry({...currentEntry, vehicleType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="motorbike">Motorbike</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calc-method">Calculation Method</Label>
              <Select 
                value={currentEntry.calculationMethod} 
                onValueChange={(value: 'fuel-based' | 'distance-based') => setCurrentEntry({...currentEntry, calculationMethod: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fuel-based">Fuel-based</SelectItem>
                  <SelectItem value="distance-based">Distance-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditional Input Fields */}
          {currentEntry.calculationMethod === 'fuel-based' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fuel-consumption">Fuel Consumption (Litres/Year)</Label>
                <Input
                  id="fuel-consumption"
                  type="number"
                  value={currentEntry.fuelConsumption || ''}
                  onChange={(e) => setCurrentEntry({...currentEntry, fuelConsumption: parseFloat(e.target.value) || 0})}
                  placeholder="Enter annual fuel consumption"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-desc">Vehicle Description (Optional)</Label>
                <Input
                  id="vehicle-desc"
                  value={currentEntry.vehicleDescription || ''}
                  onChange={(e) => setCurrentEntry({...currentEntry, vehicleDescription: e.target.value})}
                  placeholder="e.g., Company Car #1, Delivery Van"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="distance">Distance Traveled (km/Year)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={currentEntry.distanceTraveled || ''}
                  onChange={(e) => setCurrentEntry({...currentEntry, distanceTraveled: parseFloat(e.target.value) || 0})}
                  placeholder="Enter annual distance"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-desc">Vehicle Description (Optional)</Label>
                <Input
                  id="vehicle-desc"
                  value={currentEntry.vehicleDescription || ''}
                  onChange={(e) => setCurrentEntry({...currentEntry, vehicleDescription: e.target.value})}
                  placeholder="e.g., Company Car #1, Delivery Van"
                />
              </div>
            </div>
          )}

          {/* Real-time Preview */}
          {preview && (
            <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-2">
                <Calculator className="h-4 w-4 mt-0.5 text-orange-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-1">
                    Mobile Combustion Preview
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-orange-700 dark:text-orange-300">Method:</span>{' '}
                      <Badge variant="outline" className="ml-1 capitalize">
                        {preview.method}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-orange-700 dark:text-orange-300">Quantity:</span>{' '}
                      <Badge variant="outline" className="ml-1">
                        {preview.quantity} {preview.quantityUnit}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-orange-700 dark:text-orange-300">Emission Factor:</span>{' '}
                      <Badge variant="outline" className="ml-1">
                        {preview.factor} {preview.unit}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-orange-700 dark:text-orange-300">Emissions:</span>{' '}
                      <Badge variant="default" className="ml-1">
                        {formatEmissions(preview.emissions)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleAddVehicle}
              disabled={!currentEntry.vehicleType || !currentEntry.fuelType || 
                (currentEntry.calculationMethod === 'fuel-based' && (!currentEntry.fuelConsumption || currentEntry.fuelConsumption <= 0)) ||
                (currentEntry.calculationMethod === 'distance-based' && (!currentEntry.distanceTraveled || currentEntry.distanceTraveled <= 0))
              }
            >
              Add Vehicle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Entries List */}
      {vehicleEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Company Vehicle Fleet</CardTitle>
            <CardDescription>
              Current mobile combustion data with calculated emissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vehicleEntries.map((entry, index) => {
                let emissions = 0;
                let factor = 0;
                let unit = '';

                if (entry.calculationMethod === 'fuel-based' && entry.fuelConsumption) {
                  const fuelFactor = fuelFactors[entry.fuelType];
                  emissions = entry.fuelConsumption * fuelFactor.factor;
                  factor = fuelFactor.factor;
                  unit = fuelFactor.unit;
                } else if (entry.calculationMethod === 'distance-based' && entry.distanceTraveled) {
                  const distanceFactor = distanceFactors[entry.vehicleType];
                  if (distanceFactor) {
                    factor = distanceFactor[entry.fuelType as keyof typeof distanceFactor] as number;
                    emissions = entry.distanceTraveled * factor;
                    unit = distanceFactor.unit;
                  }
                }
                
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <div className="font-medium capitalize">{entry.vehicleType}</div>
                        <div className="text-sm text-muted-foreground capitalize">{entry.fuelType}</div>
                        {entry.vehicleDescription && (
                          <div className="text-xs text-muted-foreground">{entry.vehicleDescription}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Method</div>
                        <div className="font-medium capitalize">{entry.calculationMethod.replace('-', ' ')}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Quantity</div>
                        <div className="font-medium">
                          {entry.calculationMethod === 'fuel-based' 
                            ? `${entry.fuelConsumption} L` 
                            : `${entry.distanceTraveled} km`}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Factor</div>
                        <div className="font-medium">{factor} {unit.split(' ')[1]}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Emissions</div>
                        <Badge variant="default">{formatEmissions(emissions)}</Badge>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveVehicle(index)}
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
      {vehicleEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Mobile Combustion Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {vehicleEntries.length}
                </div>
                <div className="text-sm text-muted-foreground">Vehicles</div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatEmissions(calculationBreakdown.scope1.mobile)}
                </div>
                <div className="text-sm text-muted-foreground">Total Mobile Emissions</div>
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

            <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🚗 Mobile Combustion Methods</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Fuel-based:</strong> Uses actual fuel consumption records (most accurate)
                </div>
                <div>
                  <strong>Distance-based:</strong> Uses vehicle type and distance traveled
                </div>
              </div>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}