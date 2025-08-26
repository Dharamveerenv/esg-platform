"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCalculations } from '@/hooks/use-calculations';

interface ElectricityEntry {
  country: string;
  consumption: number; // kWh
  renewablePercentage: number;
  steamConsumption?: number; // MWh
  districtHeating?: number; // MWh
  description?: string;
}

export function ElectricityCalculator() {
  const { 
    calculatePreview, 
    calculationBreakdown, 
    formatEmissions,
    getEmissionFactorInfo,
    saveAndCalculate,
    calculationState
  } = useCalculations();

  const [electricityEntries, setElectricityEntries] = useState<ElectricityEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<ElectricityEntry>>({
    country: '',
    consumption: 0,
    renewablePercentage: 0,
    steamConsumption: 0,
    districtHeating: 0,
    description: ''
  });

  // Grid emission factors (kg CO2e/kWh)
  const gridFactors: Record<string, { location: number; market: number; source: string }> = {
    'ireland': { location: 0.2263, market: 0.2490, source: 'SEAI 2024' },
    'uk': { location: 0.2080, market: 0.2285, source: 'BEIS 2024' },
    'france': { location: 0.0571, market: 0.0628, source: 'ADEME 2024' },
    'germany': { location: 0.3661, market: 0.4023, source: 'UBA 2024' },
    'netherlands': { location: 0.2820, market: 0.3102, source: 'CBS 2024' }
  };

  // Calculate emissions when entries change
  useEffect(() => {
    if (electricityEntries.length > 0) {
      const scope2Data = electricityEntries.map(entry => ({
        country: entry.country,
        quantity: entry.consumption,
        unit: 'kWh',
        renewableEnergyConsumption: entry.consumption * (entry.renewablePercentage / 100)
      }));

      calculatePreview({
        scope2: {
          electricityData: scope2Data
        },
        country: electricityEntries[0]?.country || 'Ireland'
      });
    }
  }, [electricityEntries, calculatePreview]);

  const handleAddElectricity = () => {
    if (currentEntry.country && currentEntry.consumption && currentEntry.consumption > 0) {
      const newEntry: ElectricityEntry = {
        country: currentEntry.country,
        consumption: currentEntry.consumption,
        renewablePercentage: currentEntry.renewablePercentage || 0,
        steamConsumption: currentEntry.steamConsumption || 0,
        districtHeating: currentEntry.districtHeating || 0,
        description: currentEntry.description
      };

      setElectricityEntries([...electricityEntries, newEntry]);
      setCurrentEntry({
        country: '',
        consumption: 0,
        renewablePercentage: 0,
        steamConsumption: 0,
        districtHeating: 0,
        description: ''
      });
    }
  };

  const handleRemoveElectricity = (index: number) => {
    setElectricityEntries(electricityEntries.filter((_, i) => i !== index));
  };

  const handleSaveData = async () => {
    try {
      const scope2Data = electricityEntries.map(entry => ({
        country: entry.country,
        quantity: entry.consumption,
        unit: 'kWh',
        renewableEnergyConsumption: entry.consumption * (entry.renewablePercentage / 100),
        steamConsumption: entry.steamConsumption,
        districtHeating: entry.districtHeating
      }));

      await saveAndCalculate('b3', {
        emissionsData: {
          scope2: {
            electricityData: scope2Data
          },
          country: electricityEntries[0]?.country || 'Ireland'
        }
      });
    } catch (error) {
      console.error('Failed to save electricity data:', error);
    }
  };

  const getPreviewCalculation = () => {
    if (currentEntry.country && currentEntry.consumption && currentEntry.consumption > 0) {
      const gridFactor = gridFactors[currentEntry.country] || { location: 0.3, market: 0.33, source: 'Default EU' };
      const renewableConsumption = currentEntry.consumption * (currentEntry.renewablePercentage || 0) / 100;
      const conventionalConsumption = currentEntry.consumption - renewableConsumption;
      
      const locationEmissions = currentEntry.consumption * gridFactor.location;
      const marketEmissions = conventionalConsumption * gridFactor.market;

      return {
        locationEmissions,
        marketEmissions,
        renewableConsumption,
        conventionalConsumption,
        gridFactor
      };
    }
    return null;
  };

  const preview = getPreviewCalculation();

  return (
    <div className="space-y-6">
      {/* Add Electricity Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Add Electricity Consumption
          </CardTitle>
          <CardDescription>
            Add electricity and energy consumption data for Scope 2 emissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country/Grid</Label>
              <Select 
                value={currentEntry.country} 
                onValueChange={(value) => setCurrentEntry({...currentEntry, country: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ireland">Ireland</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="netherlands">Netherlands</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="consumption">Annual Consumption (kWh)</Label>
              <Input
                id="consumption"
                type="number"
                value={currentEntry.consumption || ''}
                onChange={(e) => setCurrentEntry({...currentEntry, consumption: parseFloat(e.target.value) || 0})}
                placeholder="Enter electricity consumption"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="renewable">Renewable Energy (%)</Label>
              <Input
                id="renewable"
                type="number"
                value={currentEntry.renewablePercentage || ''}
                onChange={(e) => setCurrentEntry({...currentEntry, renewablePercentage: parseFloat(e.target.value) || 0})}
                placeholder="0-100%"
                max="100"
                min="0"
              />
            </div>
          </div>

          {/* Additional Energy Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="steam">Steam Consumption (MWh/year)</Label>
              <Input
                id="steam"
                type="number"
                value={currentEntry.steamConsumption || ''}
                onChange={(e) => setCurrentEntry({...currentEntry, steamConsumption: parseFloat(e.target.value) || 0})}
                placeholder="Enter steam consumption"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heating">District Heating (MWh/year)</Label>
              <Input
                id="heating"
                type="number"
                value={currentEntry.districtHeating || ''}
                onChange={(e) => setCurrentEntry({...currentEntry, districtHeating: parseFloat(e.target.value) || 0})}
                placeholder="Enter heating consumption"
              />
            </div>
          </div>

          {/* Real-time Preview */}
          {preview && (
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2">
                <Calculator className="h-4 w-4 mt-0.5 text-green-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Scope 2 Calculation Preview
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div>
                        <span className="text-green-700 dark:text-green-300">Location-based Emissions:</span>{' '}
                        <Badge variant="outline" className="ml-1">
                          {formatEmissions(preview.locationEmissions)}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-green-700 dark:text-green-300">Market-based Emissions:</span>{' '}
                        <Badge variant="default" className="ml-1">
                          {formatEmissions(preview.marketEmissions)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-green-700 dark:text-green-300">Grid Factor:</span>{' '}
                        <Badge variant="outline">
                          {preview.gridFactor.location} kg CO2e/kWh
                        </Badge>
                      </div>
                      <div>
                        <span className="text-green-700 dark:text-green-300">Renewable:</span>{' '}
                        <Badge variant="outline">
                          {Math.round(preview.renewableConsumption).toLocaleString()} kWh ({currentEntry.renewablePercentage}%)
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Source: {preview.gridFactor.source}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleAddElectricity}
              disabled={!currentEntry.country || !currentEntry.consumption || currentEntry.consumption <= 0}
            >
              Add Electricity Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Electricity Entries List */}
      {electricityEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Electricity Consumption Entries</CardTitle>
            <CardDescription>
              Current electricity consumption data with calculated emissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {electricityEntries.map((entry, index) => {
                const gridFactor = gridFactors[entry.country] || { location: 0.3, market: 0.33, source: 'Default' };
                const locationEmissions = entry.consumption * gridFactor.location;
                const renewableConsumption = entry.consumption * (entry.renewablePercentage / 100);
                const marketEmissions = (entry.consumption - renewableConsumption) * gridFactor.market;
                
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <div className="font-medium capitalize">{entry.country}</div>
                        <div className="text-sm text-muted-foreground">{entry.consumption.toLocaleString()} kWh</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Renewable</div>
                        <div className="font-medium">{entry.renewablePercentage}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Grid Factor</div>
                        <div className="font-medium">{gridFactor.location} kg/kWh</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location-based</div>
                        <Badge variant="outline">{formatEmissions(locationEmissions)}</Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Market-based</div>
                        <Badge variant="default">{formatEmissions(marketEmissions)}</Badge>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveElectricity(index)}
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
      {electricityEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Scope 2 Electricity Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {electricityEntries.length}
                </div>
                <div className="text-sm text-muted-foreground">Energy Sources</div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatEmissions(calculationBreakdown.scope2.locationBased)}
                </div>
                <div className="text-sm text-muted-foreground">Location-based</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatEmissions(calculationBreakdown.scope2.marketBased)}
                </div>
                <div className="text-sm text-muted-foreground">Market-based</div>
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

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📊 Scope 2 Methodology</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Location-based:</strong> Uses average grid emission factors
                </div>
                <div>
                  <strong>Market-based:</strong> Accounts for renewable energy purchases
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