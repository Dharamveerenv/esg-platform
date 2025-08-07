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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Fuel, Zap, Factory, Truck } from "lucide-react"

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
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
                <Factory className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247 tCO₂e</div>
                <p className="text-xs text-muted-foreground">
                  All scopes combined
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scope 1</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">435 tCO₂e</div>
                <p className="text-xs text-muted-foreground">
                  Direct emissions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scope 2</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">312 tCO₂e</div>
                <p className="text-xs text-muted-foreground">
                  Electricity & heating
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scope 3</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">500 tCO₂e</div>
                <p className="text-xs text-muted-foreground">
                  Value chain emissions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Emissions Tracking Interface */}
          <Card>
            <CardHeader>
              <CardTitle>GHG Emissions Tracking Interface</CardTitle>
              <CardDescription>
                Track emissions across all three scopes with automatic calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="scope1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="scope1">Scope 1 Emissions</TabsTrigger>
                  <TabsTrigger value="scope2">Scope 2 Emissions</TabsTrigger>
                  <TabsTrigger value="scope3">Scope 3 Emissions</TabsTrigger>
                </TabsList>

                {/* Scope 1 Emissions */}
                <TabsContent value="scope1" className="space-y-4">
                  <Accordion type="multiple" className="w-full">
                    {/* Stationary Combustion */}
                    <AccordionItem value="stationary">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Factory className="h-4 w-4" />
                          Stationary Combustion Tracker
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Fuel Consumption</h4>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm">Add Fuel Type</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Fuel Consumption</DialogTitle>
                                  <DialogDescription>
                                    Add a new fuel type and consumption data
                                  </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="fuel-type">Fuel Type</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select fuel type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="petrol">Petrol</SelectItem>
                                          <SelectItem value="diesel">Diesel</SelectItem>
                                          <SelectItem value="fuel-oil">Fuel Oil</SelectItem>
                                          <SelectItem value="coal">Coal</SelectItem>
                                          <SelectItem value="natural-gas">Natural Gas</SelectItem>
                                          <SelectItem value="lpg">LPG</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="quantity">Quantity</Label>
                                      <Input
                                        id="quantity"
                                        type="number"
                                        placeholder="Enter quantity"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="unit">Unit</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="litres">Litres</SelectItem>
                                          <SelectItem value="kg">Kilograms</SelectItem>
                                          <SelectItem value="tonnes">Tonnes</SelectItem>
                                          <SelectItem value="kwh">kWh</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="period">Period</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="monthly">Monthly</SelectItem>
                                          <SelectItem value="quarterly">Quarterly</SelectItem>
                                          <SelectItem value="annual">Annual</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="equipment">Equipment/Location</Label>
                                    <Input
                                      id="equipment"
                                      placeholder="Describe equipment or location"
                                    />
                                  </div>
                                  <div className="bg-muted p-3 rounded-md">
                                    <div className="flex items-center gap-2">
                                      <Calculator className="h-4 w-4" />
                                      <span className="text-sm font-medium">Auto-calculated CO₂e: </span>
                                      <Badge variant="outline">45.2 tCO₂e</Badge>
                                    </div>
                                  </div>
                                  <Button type="submit" className="w-full">Add Fuel Consumption</Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Fuel Type</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>CO₂e (tonnes)</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Badge variant="secondary">Diesel</Badge>
                                </TableCell>
                                <TableCell>12,500</TableCell>
                                <TableCell>Litres</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell className="font-medium">32.5</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Badge variant="secondary">Natural Gas</Badge>
                                </TableCell>
                                <TableCell>45,000</TableCell>
                                <TableCell>kWh</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell className="font-medium">8.1</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Mobile Combustion */}
                    <AccordionItem value="mobile">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Mobile Combustion Tracker
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Vehicle Fleet Management</h4>
                            <Button size="sm">Add Vehicle</Button>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Vehicle Type</TableHead>
                                <TableHead>Fuel Type</TableHead>
                                <TableHead>Annual Consumption</TableHead>
                                <TableHead>Distance (km)</TableHead>
                                <TableHead>CO₂e (tonnes)</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Farm Tractor</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Diesel</Badge>
                                </TableCell>
                                <TableCell>3,200 L</TableCell>
                                <TableCell>15,000</TableCell>
                                <TableCell className="font-medium">8.3</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Delivery Van</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Petrol</Badge>
                                </TableCell>
                                <TableCell>2,800 L</TableCell>
                                <TableCell>25,000</TableCell>
                                <TableCell className="font-medium">6.4</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Fugitive Emissions */}
                    <AccordionItem value="fugitive">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Fugitive Emissions Tracker
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <Alert>
                            <AlertDescription>
                              Track refrigerant leaks and other fugitive emissions from equipment
                            </AlertDescription>
                          </Alert>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="refrigerant-type">Refrigerant Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select refrigerant" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="r404a">R-404a</SelectItem>
                                  <SelectItem value="r134a">R-134a</SelectItem>
                                  <SelectItem value="r407c">R-407C</SelectItem>
                                  <SelectItem value="r410a">R-410A</SelectItem>
                                  <SelectItem value="r507a">R-507A</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quantity-leaked">Quantity Leaked (kg)</Label>
                              <Input
                                id="quantity-leaked"
                                type="number"
                                placeholder="Enter quantity"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="detection-method">Detection Method</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="measured">Measured</SelectItem>
                                  <SelectItem value="estimated">Estimated</SelectItem>
                                  <SelectItem value="calculated">Calculated</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button>Add Fugitive Emission</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                {/* Scope 2 Emissions */}
                <TabsContent value="scope2" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Electricity Consumption
                      </CardTitle>
                      <CardDescription>
                        Track purchased electricity and heating
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="total-energy">Total Energy Consumption (MWh)</Label>
                          <Input
                            id="total-energy"
                            type="number"
                            placeholder="Enter total MWh"
                            defaultValue="156.7"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="electricity-consumption">Electricity Consumption (MWh)</Label>
                          <Input
                            id="electricity-consumption" 
                            type="number"
                            placeholder="Enter electricity MWh"
                            defaultValue="145.2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="renewable-energy">On-site Renewable Energy (MWh)</Label>
                          <Input
                            id="renewable-energy"
                            type="number"
                            placeholder="Enter renewable MWh"
                            defaultValue="23.4"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location (Eircode/Postcode)</Label>
                          <Input
                            id="location"
                            placeholder="Enter location code"
                            defaultValue="T12 ABC4"
                          />
                        </div>
                      </div>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Grid Emission Factors (Auto-retrieved)</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Ireland Grid Factor: <Badge variant="outline">0.295 kgCO₂e/kWh</Badge></div>
                          <div>Calculated Emissions: <Badge variant="default">42.8 tCO₂e</Badge></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Market-based Calculation</CardTitle>
                      <CardDescription>
                        Alternative calculation using renewable energy contracts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="green-tariff">Green Tariff Percentage (%)</Label>
                          <Input
                            id="green-tariff"
                            type="number"
                            placeholder="Enter percentage"
                            defaultValue="35"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recs">RECs Purchased (MWh)</Label>
                          <Input
                            id="recs"
                            type="number"
                            placeholder="Enter RECs"
                            defaultValue="50"
                          />
                        </div>
                      </div>
                      <Button variant="outline">Upload Contract Documentation</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Scope 3 Emissions */}
                <TabsContent value="scope3" className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      Scope 3 emissions are particularly important for agri-food companies as they typically represent the largest portion of total emissions.
                    </AlertDescription>
                  </Alert>

                  <Accordion type="multiple" className="w-full">
                    {/* Supplier Farm Data */}
                    <AccordionItem value="supplier-farms">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Factory className="h-4 w-4" />
                          Supplier Farm Data Collection
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Farm Suppliers</h4>
                            <Button size="sm">Add Farm Supplier</Button>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Farm Name/ID</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>SBLAS/SDAS</TableHead>
                                <TableHead>Scope 1&2 GHG (tCO₂e)</TableHead>
                                <TableHead>Revenue Allocation (%)</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>O&apos;Sullivan Dairy Farm</TableCell>
                                <TableCell>Cork, T12 XY45</TableCell>
                                <TableCell>
                                  <Badge variant="default">SDAS Participant</Badge>
                                </TableCell>
                                <TableCell>245.6</TableCell>
                                <TableCell>15%</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Purchased Goods */}
                    <AccordionItem value="purchased-goods">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Purchased Goods Tracking
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Tabs defaultValue="milk" className="w-full">
                          <TabsList>
                            <TabsTrigger value="milk">Milk Procurement</TabsTrigger>
                            <TabsTrigger value="livestock">Cattle/Sheep</TabsTrigger>
                          </TabsList>
                          <TabsContent value="milk" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="milk-quantity">Quantity (kg/L)</Label>
                                <Input
                                  id="milk-quantity"
                                  type="number"
                                  placeholder="Enter quantity"
                                  defaultValue="125000"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="milk-origin">Country of Origin</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ie">🇮🇪 Ireland</SelectItem>
                                    <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                                    <SelectItem value="nl">🇳🇱 Netherlands</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="breed">Breed Type</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select breed" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="holstein">Holstein Friesian</SelectItem>
                                    <SelectItem value="jersey">Jersey</SelectItem>
                                    <SelectItem value="mixed">Mixed Breed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <div className="text-sm">
                                <strong>Calculated Emissions:</strong> Based on quantity and emission factors: <Badge variant="default">387.5 tCO₂e</Badge>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="livestock" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="livestock-quantity">Quantity</Label>
                                <Input
                                  id="livestock-quantity"
                                  type="number"
                                  placeholder="Enter quantity"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="unit-type">Unit</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="kg">kg (carcass weight)</SelectItem>
                                    <SelectItem value="head">head (live weight)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="cattle">Cattle</SelectItem>
                                    <SelectItem value="sheep">Sheep</SelectItem>
                                    <SelectItem value="pig">Pig</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="livestock-origin">Origin Country</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ie">🇮🇪 Ireland</SelectItem>
                                    <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save All Emissions Data</Button>
            <Button variant="outline">Calculate Total Emissions</Button>
            <Button variant="outline">Generate Emissions Report</Button>
            <Button variant="outline">Export to CSV</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}