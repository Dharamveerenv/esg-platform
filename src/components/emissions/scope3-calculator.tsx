"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Globe, Truck, ShoppingCart, Users, Plane, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCalculations } from '@/hooks/use-calculations';

interface Scope3Entry {
  category: number;
  categoryName: string;
  calculationMethod: 'spend-based' | 'activity-based' | 'supplier-specific';
  amount: number;
  unit: string;
  description?: string;
  supplier?: string;
}

export function Scope3Calculator() {
  const { 
    calculatePreview, 
    calculationBreakdown, 
    formatEmissions,
    saveAndCalculate,
    calculationState
  } = useCalculations();

  const [scope3Entries, setScope3Entries] = useState<Scope3Entry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<Scope3Entry>>({
    category: 1,
    categoryName: '',
    calculationMethod: 'spend-based',
    amount: 0,
    unit: '',
    description: '',
    supplier: ''
  });

  // Scope 3 categories with emission factors (approximate)
  const scope3Categories = [
    { id: 1, name: 'Purchased Goods & Services', factor: 0.5, unit: 'kg CO2e/€', icon: ShoppingCart },
    { id: 2, name: 'Capital Goods', factor: 0.4, unit: 'kg CO2e/€', icon: ShoppingCart },
    { id: 3, name: 'Fuel & Energy Activities', factor: 0.3, unit: 'kg CO2e/€', icon: Globe },
    { id: 4, name: 'Upstream Transportation', factor: 0.8, unit: 'kg CO2e/tonne-km', icon: Truck },
    { id: 5, name: 'Waste Generated in Operations', factor: 0.02, unit: 'kg CO2e/kg', icon: Globe },
    { id: 6, name: 'Business Travel', factor: 0.15, unit: 'kg CO2e/km', icon: Plane },
    { id: 7, name: 'Employee Commuting', factor: 0.17, unit: 'kg CO2e/km', icon: Users },
    { id: 8, name: 'Upstream Leased Assets', factor: 0.3, unit: 'kg CO2e/€', icon: Globe },
    { id: 9, name: 'Downstream Transportation', factor: 0.8, unit: 'kg CO2e/tonne-km', icon: Truck },
    { id: 10, name: 'Processing of Sold Products', factor: 0.6, unit: 'kg CO2e/€', icon: Globe },
    { id: 11, name: 'Use of Sold Products', factor: 1.2, unit: 'kg CO2e/product', icon: Globe },
    { id: 12, name: 'End-of-life of Sold Products', factor: 0.05, unit: 'kg CO2e/kg', icon: Globe },
    { id: 13, name: 'Downstream Leased Assets', factor: 0.3, unit: 'kg CO2e/€', icon: Globe },
    { id: 14, name: 'Franchises', factor: 0.4, unit: 'kg CO2e/€', icon: Globe },
    { id: 15, name: 'Investments', factor: 0.2, unit: 'kg CO2e/€', icon: Globe }
  ];

  const getSelectedCategory = () => {
    return scope3Categories.find(cat => cat.id === currentEntry.category) || scope3Categories[0];
  };

  // Calculate emissions when entries change
  useEffect(() => {
    if (scope3Entries.length > 0) {
      // For now, we'll use simplified calculations
      // In a real implementation, this would call the backend with detailed Scope 3 data
      const totalScope3 = scope3Entries.reduce((sum, entry) => {
        const category = scope3Categories.find(cat => cat.id === entry.category);
        if (category) {
          return sum + (entry.amount * category.factor);
        }
        return sum;
      }, 0);

      // This is a simplified preview - real implementation would use backend
      console.log('Scope 3 total (preview):', totalScope3);
    }
  }, [scope3Entries]);

  const handleAddEntry = () => {
    if (currentEntry.category && currentEntry.amount && currentEntry.amount > 0) {
      const category = getSelectedCategory();
      const newEntry: Scope3Entry = {
        category: currentEntry.category,
        categoryName: category.name,
        calculationMethod: currentEntry.calculationMethod || 'spend-based',
        amount: currentEntry.amount,
        unit: getUnitForMethod(currentEntry.calculationMethod || 'spend-based', category),
        description: currentEntry.description,
        supplier: currentEntry.supplier
      };

      setScope3Entries([...scope3Entries, newEntry]);
      setCurrentEntry({
        category: 1,
        categoryName: '',
        calculationMethod: 'spend-based',
        amount: 0,
        unit: '',
        description: '',
        supplier: ''
      });
    }
  };

  const handleRemoveEntry = (index: number) => {
    setScope3Entries(scope3Entries.filter((_, i) => i !== index));
  };

  const getUnitForMethod = (method: string, category: typeof scope3Categories[0]) => {
    switch (method) {
      case 'spend-based':
        return '€';
      case 'activity-based':
        return category.id === 4 || category.id === 9 ? 'tonne-km' : 
               category.id === 6 || category.id === 7 ? 'km' : 
               category.id === 5 || category.id === 12 ? 'kg' :
               category.id === 11 ? 'products' : 'units';
      case 'supplier-specific':
        return 'kg CO2e';
      default:
        return '€';
    }
  };

  const handleSaveData = async () => {
    try {
      await saveAndCalculate('b3', {
        emissionsData: {
          scope3: {
            categories: scope3Entries
          },
          country: 'Ireland'
        }
      });
    } catch (error) {
      console.error('Failed to save Scope 3 data:', error);
    }
  };

  const getPreviewCalculation = () => {
    if (currentEntry.category && currentEntry.amount && currentEntry.amount > 0) {
      const category = getSelectedCategory();
      let emissions = 0;
      let factorUsed = category.factor;
      let unitUsed = category.unit;

      if (currentEntry.calculationMethod === 'supplier-specific') {
        // For supplier-specific, the amount IS the emissions
        emissions = currentEntry.amount;
        factorUsed = 1;
        unitUsed = 'direct kg CO2e';
      } else {
        emissions = currentEntry.amount * category.factor;
      }

      return {
        emissions,
        factor: factorUsed,
        unit: unitUsed,
        category: category.name,
        method: currentEntry.calculationMethod
      };
    }
    return null;
  };

  const preview = getPreviewCalculation();

  const getCategoryTotal = (categoryId: number) => {
    const categoryEntries = scope3Entries.filter(entry => entry.category === categoryId);
    return categoryEntries.reduce((sum, entry) => {
      const category = scope3Categories.find(cat => cat.id === entry.category);
      if (category) {
        if (entry.calculationMethod === 'supplier-specific') {
          return sum + entry.amount; // Direct emissions
        }
        return sum + (entry.amount * category.factor);
      }
      return sum;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upstream" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upstream">Upstream (1-8)</TabsTrigger>
          <TabsTrigger value="downstream">Downstream (9-15)</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="upstream" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Upstream Categories (1-8)
              </CardTitle>
              <CardDescription>
                Emissions from purchased goods, services, and upstream activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={currentEntry.category?.toString()} 
                    onValueChange={(value) => setCurrentEntry({...currentEntry, category: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {scope3Categories.slice(0, 8).map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.id}. {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Calculation Method</Label>
                  <Select 
                    value={currentEntry.calculationMethod} 
                    onValueChange={(value: 'spend-based' | 'activity-based' | 'supplier-specific') => 
                      setCurrentEntry({...currentEntry, calculationMethod: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spend-based">Spend-based</SelectItem>
                      <SelectItem value="activity-based">Activity-based</SelectItem>
                      <SelectItem value="supplier-specific">Supplier-specific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">
                    Amount ({currentEntry.calculationMethod ? getUnitForMethod(currentEntry.calculationMethod, getSelectedCategory()) : '€'})
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={currentEntry.amount || ''}
                    onChange={(e) => setCurrentEntry({...currentEntry, amount: parseFloat(e.target.value) || 0})}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier/Description</Label>
                  <Input
                    id="supplier"
                    value={currentEntry.supplier || ''}
                    onChange={(e) => setCurrentEntry({...currentEntry, supplier: e.target.value})}
                    placeholder="Optional description"
                  />
                </div>
              </div>

              {/* Method-specific guidance */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  📋 {currentEntry.calculationMethod?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Method
                </h4>
                <div className="text-sm">
                  {currentEntry.calculationMethod === 'spend-based' && (
                    <p>Enter the total spend (€) for this category. Uses industry-average emission factors.</p>
                  )}
                  {currentEntry.calculationMethod === 'activity-based' && (
                    <p>Enter specific activity data (km, kg, units, etc.). More accurate than spend-based.</p>
                  )}
                  {currentEntry.calculationMethod === 'supplier-specific' && (
                    <p>Enter emissions data provided directly by suppliers (kg CO2e). Most accurate method.</p>
                  )}
                </div>
              </div>

              {/* Real-time Preview */}
              {preview && (
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-2">
                    <Calculator className="h-4 w-4 mt-0.5 text-purple-600" />
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                        Scope 3 Category Preview
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-purple-700 dark:text-purple-300">Category:</span>{' '}
                          <Badge variant="outline" className="ml-1">
                            {currentEntry.category}. {preview.category}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-purple-700 dark:text-purple-300">Method:</span>{' '}
                          <Badge variant="outline" className="ml-1 capitalize">
                            {preview.method?.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-purple-700 dark:text-purple-300">Factor:</span>{' '}
                          <Badge variant="outline" className="ml-1">
                            {preview.factor} {preview.unit}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-purple-700 dark:text-purple-300">Emissions:</span>{' '}
                          <Badge variant="default" className="ml-1">
                            {formatEmissions(preview.emissions)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleAddEntry}
                disabled={!currentEntry.category || !currentEntry.amount || currentEntry.amount <= 0}
              >
                Add Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downstream" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Downstream Categories (9-15)
              </CardTitle>
              <CardDescription>
                Emissions from downstream transportation, product use, and end-of-life
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={currentEntry.category?.toString()} 
                    onValueChange={(value) => setCurrentEntry({...currentEntry, category: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {scope3Categories.slice(8).map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.id}. {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Calculation Method</Label>
                  <Select 
                    value={currentEntry.calculationMethod} 
                    onValueChange={(value: 'spend-based' | 'activity-based' | 'supplier-specific') => 
                      setCurrentEntry({...currentEntry, calculationMethod: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spend-based">Spend-based</SelectItem>
                      <SelectItem value="activity-based">Activity-based</SelectItem>
                      <SelectItem value="supplier-specific">Supplier-specific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">
                    Amount ({currentEntry.calculationMethod ? getUnitForMethod(currentEntry.calculationMethod, getSelectedCategory()) : '€'})
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={currentEntry.amount || ''}
                    onChange={(e) => setCurrentEntry({...currentEntry, amount: parseFloat(e.target.value) || 0})}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={currentEntry.description || ''}
                    onChange={(e) => setCurrentEntry({...currentEntry, description: e.target.value})}
                    placeholder="Optional description"
                  />
                </div>
              </div>

              {/* Real-time Preview */}
              {preview && (
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-2">
                    <Calculator className="h-4 w-4 mt-0.5 text-purple-600" />
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                        Scope 3 Category Preview
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-purple-700 dark:text-purple-300">Category:</span>{' '}
                          <Badge variant="outline" className="ml-1">
                            {currentEntry.category}. {preview.category}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-purple-700 dark:text-purple-300">Emissions:</span>{' '}
                          <Badge variant="default" className="ml-1">
                            {formatEmissions(preview.emissions)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleAddEntry}
                disabled={!currentEntry.category || !currentEntry.amount || currentEntry.amount <= 0}
              >
                Add Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Scope 3 Value Chain Summary
              </CardTitle>
              <CardDescription>
                Overview of all Scope 3 categories with emissions breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {scope3Entries.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Entries</div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {scope3Categories.filter(cat => scope3Entries.some(entry => entry.category === cat.id)).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Categories Covered</div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatEmissions(scope3Entries.reduce((sum, entry) => {
                      const category = scope3Categories.find(cat => cat.id === entry.category);
                      if (category) {
                        if (entry.calculationMethod === 'supplier-specific') {
                          return sum + entry.amount;
                        }
                        return sum + (entry.amount * category.factor);
                      }
                      return sum;
                    }, 0))}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Scope 3</div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Category Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scope3Categories.map(category => {
                    const total = getCategoryTotal(category.id);
                    const hasEntries = scope3Entries.some(entry => entry.category === category.id);
                    
                    return (
                      <Card key={category.id} className={`p-4 ${hasEntries ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {category.id}. {category.name}
                            </h4>
                            {hasEntries ? (
                              <Badge variant="default" className="mt-1">
                                {formatEmissions(total)}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="mt-1">
                                Not assessed
                              </Badge>
                            )}
                          </div>
                          <category.icon className={`h-4 w-4 ${hasEntries ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Entries List */}
      {scope3Entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Scope 3 Entries</CardTitle>
            <CardDescription>
              All value chain emissions entries with calculated emissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scope3Entries.map((entry, index) => {
                const category = scope3Categories.find(cat => cat.id === entry.category);
                let emissions = 0;
                
                if (category) {
                  if (entry.calculationMethod === 'supplier-specific') {
                    emissions = entry.amount;
                  } else {
                    emissions = entry.amount * category.factor;
                  }
                }
                
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <div className="font-medium">{entry.category}. {entry.categoryName}</div>
                        {entry.description && (
                          <div className="text-sm text-muted-foreground">{entry.description}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Method</div>
                        <div className="font-medium capitalize">{entry.calculationMethod.replace('-', ' ')}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="font-medium">{entry.amount} {entry.unit}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Factor</div>
                        <div className="font-medium">
                          {entry.calculationMethod === 'supplier-specific' ? 'Direct' : `${category?.factor} ${category?.unit}`}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Emissions</div>
                        <Badge variant="default">{formatEmissions(emissions)}</Badge>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveEntry(index)}
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

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          onClick={handleSaveData}
          disabled={calculationState.isCalculating || scope3Entries.length === 0}
        >
          {calculationState.isCalculating ? 'Saving...' : 'Save All Data'}
        </Button>
        <Button variant="outline" disabled={scope3Entries.length === 0}>
          Generate Report Section
        </Button>
      </div>

      {/* Scope 3 Assessment Guide */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Scope 3 Assessment Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <strong>Materiality Assessment:</strong> Focus on the categories most relevant to your industry and business model.
            </div>
            <div>
              <strong>Data Quality Hierarchy:</strong> Supplier-specific &gt; Activity-based &gt; Spend-based methods.
            </div>
            <div>
              <strong>Coverage:</strong> Aim to cover at least 67% of your estimated total Scope 3 emissions.
            </div>
            <div>
              <strong>Common Material Categories:</strong>
              <ul className="mt-2 ml-4 list-disc">
                <li>Manufacturing: Categories 1, 2, 4, 12</li>
                <li>Services: Categories 1, 6, 7</li>
                <li>Retail: Categories 1, 4, 11, 12</li>
                <li>Technology: Categories 1, 11, 12</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}