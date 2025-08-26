"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, Fuel, Zap, Factory, Truck, Car, Building, Globe } from "lucide-react"
// Simplified imports - removed complex components
import { FuelCalculator } from "@/components/emissions/fuel-calculator"
import { RefrigerantCalculator } from "@/components/emissions/refrigerant-calculator"
// import { MobileCalculator } from "@/components/emissions/mobile-calculator"
// import { ElectricityCalculator } from "@/components/emissions/electricity-calculator"
// import { Scope3Calculator } from "@/components/emissions/scope3-calculator"
// import { useCalculations } from "@/hooks/use-calculations"
import { apiClient } from "@/lib/api-client"
import { useState, useEffect } from "react"

// Emission Factors Component
function EmissionFactorsView() {
  const [factors, setFactors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [countryFilter, setCountryFilter] = useState<string>("all")

  const loadEmissionFactors = async () => {
    try {
      setLoading(true)
      setError("")
      
      const params = {
        ...(categoryFilter && categoryFilter !== 'all' && { category: categoryFilter }),
        ...(countryFilter && countryFilter !== 'all' && { country: countryFilter }),
        limit: 20
      }

      const response = await apiClient.getEmissionFactors(params)
      
      if (response.success && response.data) {
        setFactors(response.data.factors || [])
      } else {
        throw new Error(response.error?.message || 'Failed to load emission factors')
      }
    } catch (err: any) {
      console.error('Failed to load emission factors:', err)
      setError('Backend unavailable - showing demo factors')
      
      // Show demo data on error
      setFactors([
        {
          _id: 'demo-1',
          factorMetadata: { category: 'Scope1', source: 'SEAI', version: '2024' },
          geographicScope: { country: 'Ireland' },
          fuelSpecifications: { fuelType: 'Natural Gas' },
          emissionFactorData: { totalCo2eFactor: 2.02, unit: 'm3', confidenceLevel: 'High' }
        },
        {
          _id: 'demo-2',
          factorMetadata: { category: 'Scope1', source: 'SEAI', version: '2024' },
          geographicScope: { country: 'Ireland' },
          fuelSpecifications: { fuelType: 'Diesel' },
          emissionFactorData: { totalCo2eFactor: 2.67, unit: 'litre', confidenceLevel: 'High' }
        },
        {
          _id: 'demo-3',
          factorMetadata: { category: 'Scope2', source: 'SEAI', version: '2024' },
          geographicScope: { country: 'Ireland' },
          fuelSpecifications: { fuelType: 'Electricity' },
          emissionFactorData: { totalCo2eFactor: 0.2263, unit: 'kWh', confidenceLevel: 'High' }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEmissionFactors()
  }, [categoryFilter, countryFilter])

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="space-y-2">
          <Label>Scope</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All scopes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scopes</SelectItem>
              <SelectItem value="Scope1">Scope 1</SelectItem>
              <SelectItem value="Scope2">Scope 2</SelectItem>
              <SelectItem value="Scope3">Scope 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Country</Label>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="Ireland">Ireland</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>&nbsp;</Label>
          <Button onClick={loadEmissionFactors} className="w-full">
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-2">⚠️</div>
            <div className="flex-1">
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading emission factors...</span>
        </div>
      )}

      {/* Factors Table */}
      {!loading && (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fuel Type</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Emission Factor</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factors.map((factor) => (
                <TableRow key={factor._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-gray-500" />
                      {factor.fuelSpecifications.fuelType}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={factor.factorMetadata.category === 'Scope1' ? 'bg-red-100 text-red-800' : 
                                   factor.factorMetadata.category === 'Scope2' ? 'bg-blue-100 text-blue-800' : 
                                   'bg-green-100 text-green-800'}>
                      {factor.factorMetadata.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      {factor.geographicScope.country}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {factor.emissionFactorData.totalCo2eFactor.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-sm">
                    kg CO₂e/{factor.emissionFactorData.unit}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {factor.factorMetadata.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={factor.emissionFactorData.confidenceLevel === 'High' ? 'default' : 'secondary'}>
                      {factor.emissionFactorData.confidenceLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {factors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No emission factors found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function B3Content() {
  // Simplified - removed complex calculation hook
  // const { calculationState, calculationBreakdown, formatEmissions } = useCalculations();
  const [liveData, setLiveData] = useState<any>(null);
  const [reportId, setReportId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  
  // Initialize B3 development mode and fetch live data
  useEffect(() => {
    const initializeLiveB3 = async () => {
      try {
        console.log('🚀 Starting B3 initialization...');
        setIsLoading(true);
        
        // Initialize the development report with timeout and error handling
        const initResponse = await Promise.race([
          apiClient.initB3DemoReport(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('API timeout')), 5000))
        ]) as any;
        
        console.log('📡 Init response:', initResponse);
        
        if (initResponse?.success && initResponse?.data) {
          const developmentReportId = initResponse.data.reportId;
          setReportId(developmentReportId);
          console.log('✅ B3 Development mode initialized:', developmentReportId);
          
          // Set basic data structure
          setLiveData({
            mode: 'development',
            emissionsBreakdown: { total: 0, scope1: { total: 0 }, scope2: { total: 0 } },
            activities: [],
            reportId: developmentReportId
          });
          console.log('✅ Live B3 data set');
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error: any) {
        console.error('❌ Failed to initialize live B3 data:', error);
        console.log('🔄 Initializing in offline mode...');
        
        // Fallback to offline mode
        const fallbackReportId = `offline-${Date.now()}`;
        setReportId(fallbackReportId);
        setLiveData({
          mode: 'offline',
          emissionsBreakdown: { total: 0, scope1: { total: 0 }, scope2: { total: 0 } },
          activities: [],
          reportId: fallbackReportId
        });
        setError('Backend unavailable - running in offline mode');
        console.log('✅ Offline mode initialized');
      } finally {
        setIsLoading(false);
        console.log('🏁 B3 initialization completed');
      }
    };
    
    initializeLiveB3();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Initializing B3 Development Mode...</p>
        </div>
      </div>
    );
  }

  // Don't block the entire page for backend errors, show as warning banner instead

  return (
    <>
      {/* Error Warning Banner */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-2">⚠️</div>
            <div className="flex-1">
              <p className="text-sm text-yellow-800">{error}</p>
              <p className="text-xs text-yellow-600 mt-1">
                Interface available in demo mode. Some features may be limited.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {setError(''); window.location.reload()}}
              className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
            >
              Retry
            </Button>
          </div>
        </div>
      )}
      
      {/* Overview Cards with Live Data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {liveData?.emissionsBreakdown?.total ? 
                `${liveData.emissionsBreakdown.total.toLocaleString()} kg CO2e` : 
                '0 kg CO2e'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {liveData?.mode === 'development' ? 'Development Mode - Ready for calculations' : 'Live calculation from backend'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scope 1</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {liveData?.emissionsBreakdown?.scope1?.total ? 
                `${liveData.emissionsBreakdown.scope1.total.toLocaleString()} kg CO2e` : 
                '0 kg CO2e'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {liveData?.mode === 'development' ? 'Development Mode - No activities yet' : 'Direct emissions (Real-time)'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scope 2</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {liveData?.emissionsBreakdown?.scope2?.total ? 
                `${liveData.emissionsBreakdown.scope2.total.toLocaleString()} kg CO2e` : 
                liveData?.mode === 'development' ? 
                '0 kg CO2e' : 
                '0 kg CO2e'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {liveData?.mode === 'development' ? 'Development Mode - Ready for data' : 'Electricity & heating (Connected)'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emission Intensity</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {liveData?.calculations?.emissionIntensity ? 
                `${liveData.calculations.emissionIntensity.value} ${liveData.calculations.emissionIntensity.unit}` : 
                liveData?.mode === 'development' ? 
                '0.0 kg CO2e/€' : 
                'Calculating...'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {liveData?.mode === 'development' ? 'Development Mode' : 'Per revenue euro'}
            </p>
          </CardContent>
        </Card>
      </div>


      {/* Four Tabs Tabbed Interface */}
      <Tabs defaultValue="scope1" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scope1" className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            Scope 1: Direct Emissions
          </TabsTrigger>
          <TabsTrigger value="scope2" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Scope 2: Electricity
          </TabsTrigger>
          <TabsTrigger value="scope3" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Scope 3: Value Chain
          </TabsTrigger>
          <TabsTrigger value="factors" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Emission Factors
          </TabsTrigger>
        </TabsList>

        {/* Scope 1: Direct Emissions */}
        <TabsContent value="scope1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5" />
                Scope 1: Direct GHG Emissions
              </CardTitle>
              <CardDescription>
                Direct emissions from sources owned or controlled by your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Live Database Fuel Calculator */}
                <FuelCalculator />
                
                {/* Mobile Combustion */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Mobile Combustion (Company Vehicles)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Vehicle Type</Label>
                      <Select>
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
                      <Label>Fuel Consumption (Litres/Year)</Label>
                      <Input type="number" placeholder="Enter fuel consumption" />
                    </div>
                    <div className="space-y-2">
                      <Label>Fuel Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button>Add Vehicle</Button>
                </div>

                {/* Process Emissions & Refrigerants */}
                <RefrigerantCalculator />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scope 2: Electricity */}
        <TabsContent value="scope2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Scope 2: Indirect Emissions from Energy
              </CardTitle>
              <CardDescription>
                Emissions from purchased electricity, steam, heating, and cooling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Electricity Consumption */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Electricity Consumption</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Annual Consumption (kWh)</Label>
                    <Input type="number" placeholder="Enter electricity consumption" />
                  </div>
                  <div className="space-y-2">
                    <Label>Country/Grid</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ireland">Ireland</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Renewable Energy (%)</Label>
                    <Input type="number" placeholder="0-100%" max="100" />
                  </div>
                </div>
              </div>

              {/* Heating/Cooling */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">District Heating/Cooling</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Steam Consumption (MWh/year)</Label>
                    <Input type="number" placeholder="Enter steam consumption" />
                  </div>
                  <div className="space-y-2">
                    <Label>District Heating (MWh/year)</Label>
                    <Input type="number" placeholder="Enter heating consumption" />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Scope 2 Calculation Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Location-based:</strong> Uses average emission factors for electricity grids
                  </div>
                  <div>
                    <strong>Market-based:</strong> Uses emission factors from specific electricity products
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scope 3: Value Chain */}
        <TabsContent value="scope3" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Scope 3: Value Chain Emissions
              </CardTitle>
              <CardDescription>
                All other indirect emissions in your value chain (15 categories)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upstream Categories */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Upstream Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">1. Purchased Goods & Services</h4>
                    <div className="space-y-2">
                      <Label>Annual Procurement Spend (€)</Label>
                      <Input type="number" placeholder="Enter total procurement spend" />
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">3. Fuel & Energy Activities</h4>
                    <div className="space-y-2">
                      <Label>Additional Energy-related Emissions</Label>
                      <Textarea placeholder="Describe upstream fuel extraction, transmission losses..." />
                    </div>
                  </Card>
                </div>
              </div>

              {/* Transportation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Transportation & Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">4. Upstream Transportation</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Transportation Mode</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transport mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="truck">Road Freight</SelectItem>
                            <SelectItem value="ship">Sea Freight</SelectItem>
                            <SelectItem value="air">Air Freight</SelectItem>
                            <SelectItem value="rail">Rail Freight</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Distance (km) / Weight (tonnes)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="number" placeholder="Distance" />
                          <Input type="number" placeholder="Weight" />
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">6. Business Travel</h4>
                    <div className="space-y-2">
                      <Label>Annual Travel Spend (€)</Label>
                      <Input type="number" placeholder="Enter travel spend" />
                      <Label>Employee Commuting</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="# Employees" />
                        <Input placeholder="Avg km/day" />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Downstream Categories */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Downstream Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">11. Use of Sold Products</h4>
                    <div className="space-y-2">
                      <Label>Product Lifetime Emissions</Label>
                      <Textarea placeholder="Describe emissions from product usage..." />
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">5. Waste Generated</h4>
                    <div className="space-y-2">
                      <Label>Annual Waste (tonnes)</Label>
                      <Input type="number" placeholder="Enter waste amount" />
                      <Label>Waste Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select waste type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="municipal">Municipal Solid Waste</SelectItem>
                          <SelectItem value="recycling">Recycling</SelectItem>
                          <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Scope 3 Note */}
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📋 Scope 3 Assessment Guide</h4>
                <p className="text-sm mb-2">
                  Scope 3 represents the largest portion of most organizations' carbon footprint (typically 70-90%).
                </p>
                <p className="text-sm">
                  <strong>Tip:</strong> Start with the most material categories for your industry. 
                  Consider using spend-based, activity-based, or supplier-specific methods.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emission Factors Tab */}
        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Emission Factors Database
              </CardTitle>
              <CardDescription>
                Browse and view emission factors used in calculations from SEAI, DEFRA, EPA and other sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmissionFactorsView />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button 
          size="lg" 
          className="flex items-center gap-2"
          onClick={async () => {
            try {
              if (!reportId) return;
              // Refresh live calculations using development API
              const response = await apiClient.calculateB3SummaryDev(reportId);
              if (response.success) {
                setLiveData(response.data);
                console.log('✅ Recalculated Total Emissions from Development API');
              }
            } catch (error) {
              console.error('❌ Calculation failed:', error);
            }
          }}
          disabled={false}
        >
          <Calculator className="h-4 w-4" />
          Recalculate Total Emissions
        </Button>
        <Button variant="outline" size="lg">
          Save Progress
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={async () => {
            try {
              if (!reportId) return;
              // Get current B3 data
              const response = await apiClient.getB3DataDev(reportId);
              if (response.success) {
                console.log('📊 Current B3 Data:', response.data);
                alert('B3 data logged to console');
              }
            } catch (error) {
              console.error('Get B3 data failed:', error);
            }
          }}
        >
          View Current Data
        </Button>
      </div>
    </>
  );
}

export default function B3Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    ESG Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>B3: Energy and GHG Emissions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-6">
            <B3Content />
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}