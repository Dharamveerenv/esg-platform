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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Recycle, RotateCcw, Trash2, Package, TrendingUp, PieChart } from "lucide-react"

export default function B7Page() {
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
                <BreadcrumbPage>B7: Resource Use & Waste</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Waste Generated</CardTitle>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5 tonnes</div>
                <p className="text-xs text-muted-foreground">
                  Annual waste production
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Diverted</CardTitle>
                <Recycle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  Recycled or reused
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Circular Practices</CardTitle>
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Implemented initiatives
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Material Efficiency</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">
                  Improvement vs last year
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Resource Use & Waste Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Use & Waste Management</CardTitle>
              <CardDescription>
                Track circular economy practices, waste generation, and material flow optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="circular-economy" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="circular-economy">Circular Economy</TabsTrigger>
                  <TabsTrigger value="waste-management">Waste Management</TabsTrigger>
                  <TabsTrigger value="material-flow">Material Flow</TabsTrigger>
                </TabsList>

                {/* Circular Economy Tab */}
                <TabsContent value="circular-economy" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Circular Economy Assessment</CardTitle>
                      <CardDescription>
                        Evaluate and track circular economy principles implementation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="design-circularity">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              Design for Circularity Assessment
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="design-score">Design Circularity Score (%)</Label>
                                  <Input
                                    id="design-score"
                                    type="number"
                                    defaultValue="75"
                                    max="100"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="material-selection">Material Selection Criteria</Label>
                                  <Select defaultValue="recyclable">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="recyclable">Recyclable Materials Priority</SelectItem>
                                      <SelectItem value="renewable">Renewable Materials Focus</SelectItem>
                                      <SelectItem value="biodegradable">Biodegradable Options</SelectItem>
                                      <SelectItem value="reusable">Reusable Design</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="design-initiatives">Design Initiatives</Label>
                                <Textarea
                                  id="design-initiatives"
                                  placeholder="Describe design for circularity initiatives..."
                                  defaultValue="Implemented modular packaging design, switched to recyclable materials for 80% of packaging, established take-back program for containers."
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="lifecycle-extension">
                          <AccordionTrigger>
                            Product Lifecycle Extension Measures
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="extension-measures">Extension Measures</Label>
                                <Textarea
                                  id="extension-measures"
                                  placeholder="Describe measures to extend product lifecycles..."
                                  defaultValue="Established refurbishment program for equipment, implemented predictive maintenance to extend machinery life, developed product upgrade services."
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="refurbishment-rate">Refurbishment Rate (%)</Label>
                                  <Input
                                    id="refurbishment-rate"
                                    type="number"
                                    defaultValue="35"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lifecycle-increase">Average Lifecycle Increase (%)</Label>
                                  <Input
                                    id="lifecycle-increase"
                                    type="number"
                                    defaultValue="25"
                                  />
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="sharing-economy">
                          <AccordionTrigger>
                            Sharing Economy Participation
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="sharing-initiatives">Sharing Economy Initiatives</Label>
                                <Textarea
                                  id="sharing-initiatives"
                                  placeholder="Describe participation in sharing economy..."
                                  defaultValue="Equipment sharing program with local farms, collaborative transportation network, shared storage facilities with industry partners."
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm">Equipment Sharing</Label>
                                  <Badge variant="default">Active</Badge>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Transport Collaboration</Label>
                                  <Badge variant="default">Active</Badge>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Resource Pooling</Label>
                                  <Badge variant="secondary">Planned</Badge>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="mt-6">
                        <h4 className="font-medium mb-4">Circular Economy KPIs Tracking</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Material Circularity Rate</span>
                                <span className="text-sm font-medium">68%</span>
                              </div>
                              <Progress value={68} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Resource Efficiency Score</span>
                                <span className="text-sm font-medium">82%</span>
                              </div>
                              <Progress value={82} className="h-2" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Waste Prevention Rate</span>
                                <span className="text-sm font-medium">45%</span>
                              </div>
                              <Progress value={45} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Circular Revenue Share</span>
                                <span className="text-sm font-medium">23%</span>
                              </div>
                              <Progress value={23} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Waste Management Tab */}
                <TabsContent value="waste-management" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Waste Management Interface</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Waste Stream</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Waste Stream</DialogTitle>
                          <DialogDescription>
                            Add a new waste category and disposal method
                          </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="waste-category">Waste Category</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="paper-cardboard">Paper & Cardboard</SelectItem>
                                  <SelectItem value="plastic">Plastic Waste</SelectItem>
                                  <SelectItem value="organic">Organic Waste</SelectItem>
                                  <SelectItem value="metal">Metal Waste</SelectItem>
                                  <SelectItem value="glass">Glass</SelectItem>
                                  <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                                  <SelectItem value="electronic">Electronic Waste</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="waste-quantity">Quantity (kg/tonne)</Label>
                              <Input
                                id="waste-quantity"
                                type="number"
                                placeholder="Enter quantity"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="disposal-method">Disposal Method</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="recycling">Recycling</SelectItem>
                                  <SelectItem value="reuse">Reuse</SelectItem>
                                  <SelectItem value="composting">Composting</SelectItem>
                                  <SelectItem value="energy-recovery">Energy Recovery</SelectItem>
                                  <SelectItem value="landfill">Landfill</SelectItem>
                                  <SelectItem value="incineration">Incineration</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="waste-contractor">Waste Contractor</Label>
                              <Input
                                id="waste-contractor"
                                placeholder="Enter contractor name"
                              />
                            </div>
                          </div>
                          <Button type="submit" className="w-full">Add Waste Stream</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Waste Category</TableHead>
                        <TableHead>Annual Quantity</TableHead>
                        <TableHead>Disposal Method</TableHead>
                        <TableHead>Contractor</TableHead>
                        <TableHead>Diversion Rate</TableHead>
                        <TableHead>ESRS Classification</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Paper & Cardboard</Badge>
                        </TableCell>
                        <TableCell>8.5 tonnes</TableCell>
                        <TableCell>
                          <Badge variant="default">Recycling</Badge>
                        </TableCell>
                        <TableCell>EcoWaste Ltd</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={95} className="w-16" />
                            <span className="text-sm">95%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Non-hazardous</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Organic Waste</Badge>
                        </TableCell>
                        <TableCell>12.3 tonnes</TableCell>
                        <TableCell>
                          <Badge variant="default">Composting</Badge>
                        </TableCell>
                        <TableCell>GreenCycle Co</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={100} className="w-16" />
                            <span className="text-sm">100%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Biodegradable</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Plastic</Badge>
                        </TableCell>
                        <TableCell>2.1 tonnes</TableCell>
                        <TableCell>
                          <Badge variant="default">Recycling</Badge>
                        </TableCell>
                        <TableCell>PlastiRecycle</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={78} className="w-16" />
                            <span className="text-sm">78%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Non-hazardous</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge variant="destructive">Chemical Waste</Badge>
                        </TableCell>
                        <TableCell>0.8 tonnes</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Specialized Treatment</Badge>
                        </TableCell>
                        <TableCell>HazWaste Pro</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={0} className="w-16" />
                            <span className="text-sm">0%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">Hazardous</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <PieChart className="h-4 w-4" />
                          Waste Diversion Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Waste Generated</span>
                            <span className="font-medium">24.5 tonnes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Recycled</span>
                            <span className="font-medium">10.6 tonnes (43%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Composted</span>
                            <span className="font-medium">12.3 tonnes (50%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Energy Recovery</span>
                            <span className="font-medium">0.8 tonnes (3%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Landfill</span>
                            <span className="font-medium">0.8 tonnes (3%)</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Diversion Rate</span>
                            <span className="text-green-600">87%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Waste Reduction Initiatives</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Source Reduction Program</span>
                            <Badge variant="default">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Packaging Optimization</span>
                            <Badge variant="default">Implemented</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Supplier Waste Requirements</span>
                            <Badge variant="default">In Place</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Employee Training Program</span>
                            <Badge variant="secondary">Ongoing</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Material Flow Tab */}
                <TabsContent value="material-flow" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Material Flow Tracker</CardTitle>
                      <CardDescription>
                        Monitor material inputs, usage efficiency, and supplier relationships
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Material Inventory</h4>
                        <Button size="sm">Add Material</Button>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Material Type</TableHead>
                            <TableHead>Annual Consumption</TableHead>
                            <TableHead>Sustainability Rating</TableHead>
                            <TableHead>Primary Supplier</TableHead>
                            <TableHead>Traceability Score</TableHead>
                            <TableHead>Substitution Opportunities</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Raw Milk</Badge>
                            </TableCell>
                            <TableCell>2.5M litres</TableCell>
                            <TableCell>
                              <Badge variant="default">A+</Badge>
                            </TableCell>
                            <TableCell>Local Dairy Cooperative</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={95} className="w-16" />
                                <span className="text-sm">95%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">Limited</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Packaging Materials</Badge>
                            </TableCell>
                            <TableCell>450 tonnes</TableCell>
                            <TableCell>
                              <Badge variant="secondary">B+</Badge>
                            </TableCell>
                            <TableCell>EcoPack Solutions</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={78} className="w-16" />
                                <span className="text-sm">78%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">High Potential</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Energy (Electricity)</Badge>
                            </TableCell>
                            <TableCell>850 MWh</TableCell>
                            <TableCell>
                              <Badge variant="default">A</Badge>
                            </TableCell>
                            <TableCell>Green Energy Co</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={85} className="w-16" />
                                <span className="text-sm">85%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">Renewable Options</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Supplier Relationship Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Supplier Sustainability Score</span>
                              <span className="text-sm font-medium">82/100</span>
                            </div>
                            <Progress value={82} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Local Sourcing Rate</span>
                              <span className="text-sm font-medium">65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Certified Suppliers</span>
                              <span className="text-sm font-medium">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Material Substitution Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Plastic Packaging → Biodegradable</span>
                              <Badge variant="default">High Impact</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Potential 35% reduction in non-recyclable waste
                            </div>
                          </div>
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Conventional → Organic Inputs</span>
                              <Badge variant="secondary">Medium Impact</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Improved sustainability rating for 20% of materials
                            </div>
                          </div>
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Grid Electricity → Solar</span>
                              <Badge variant="outline">Under Evaluation</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Potential 40% reduction in energy-related emissions
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save Resource Data</Button>
            <Button variant="outline">Generate Waste Report</Button>
            <Button variant="outline">Circular Economy Assessment</Button>
            <Button variant="outline">Export Material Flow</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}