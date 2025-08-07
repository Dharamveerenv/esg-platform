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
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, Droplets, Sprout, MapPin, TrendingUp } from "lucide-react"

export default function B4Page() {
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
                <BreadcrumbPage>B4: Pollution</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Air Pollution Sources</CardTitle>
                <Cloud className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Tracked sources
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Discharge Points</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Monitored locations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Soil Monitoring Sites</CardTitle>
                <Sprout className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Testing locations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Pollution Tracking Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Pollution Monitoring and Tracking</CardTitle>
              <CardDescription>
                Monitor air, water, and soil pollution across all company locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="air" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="air">Air Pollution</TabsTrigger>
                  <TabsTrigger value="water">Water Pollution</TabsTrigger>
                  <TabsTrigger value="soil">Soil Pollution</TabsTrigger>
                </TabsList>

                {/* Air Pollution Tab */}
                <TabsContent value="air" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Air Pollution Tracker</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Air Pollution Source</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Air Pollution Source</DialogTitle>
                          <DialogDescription>
                            Add a new air pollution monitoring point
                          </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="air-pollutant">Pollutant Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select pollutant" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ammonia">Ammonia (NH₃)</SelectItem>
                                  <SelectItem value="pm10">Particulate Matter (PM10)</SelectItem>
                                  <SelectItem value="pm25">Particulate Matter (PM2.5)</SelectItem>
                                  <SelectItem value="nox">Nitrogen Oxides (NOx)</SelectItem>
                                  <SelectItem value="so2">Sulfur Dioxide (SO₂)</SelectItem>
                                  <SelectItem value="vocs">Volatile Organic Compounds (VOCs)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="air-quantity">Quantity (kg/L)</Label>
                              <Input
                                id="air-quantity"
                                type="number"
                                placeholder="Enter quantity"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="air-location">Location (Eircode/Geolocation)</Label>
                              <Input
                                id="air-location"
                                placeholder="Enter location code"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="measurement-method">Measurement Method</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="continuous">Continuous Monitoring</SelectItem>
                                  <SelectItem value="periodic">Periodic Sampling</SelectItem>
                                  <SelectItem value="calculated">Calculated/Estimated</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="facility-mapping">Facility Description</Label>
                            <Textarea
                              id="facility-mapping"
                              placeholder="Describe the facility or equipment causing emissions..."
                            />
                          </div>
                          <Button type="submit" className="w-full">Add Air Pollution Source</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pollutant Type</TableHead>
                        <TableHead>Quantity (kg/L)</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Regulatory Limit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Ammonia (NH₃)</Badge>
                        </TableCell>
                        <TableCell>125.4</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 ABC4
                          </div>
                        </TableCell>
                        <TableCell>Continuous</TableCell>
                        <TableCell>200 kg/L</TableCell>
                        <TableCell>
                          <Badge variant="default">Within Limits</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">PM10</Badge>
                        </TableCell>
                        <TableCell>8.2</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 XY67
                          </div>
                        </TableCell>
                        <TableCell>Periodic</TableCell>
                        <TableCell>15 kg/L</TableCell>
                        <TableCell>
                          <Badge variant="default">Within Limits</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Trend Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>Air pollution levels decreased by 12% compared to last year</span>
                      </div>
                      <Progress value={88} className="mt-2" />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Water Pollution Tab */}
                <TabsContent value="water" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Water Pollution Tracker</h3>
                    <Button>Add Water Discharge Point</Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Effluent Type</TableHead>
                        <TableHead>Flow Rate (kg/L)</TableHead>
                        <TableHead>BOD Concentration (mg/L)</TableHead>
                        <TableHead>COD Concentration (mg/L)</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Water Body</TableHead>
                        <TableHead>Permit Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Dairy Processing</Badge>
                        </TableCell>
                        <TableCell>2,500</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell>T12 ABC4</TableCell>
                        <TableCell>River Lee</TableCell>
                        <TableCell>
                          <Badge variant="default">Valid Permit</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Cleaning Water</Badge>
                        </TableCell>
                        <TableCell>800</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>65</TableCell>
                        <TableCell>T12 XY67</TableCell>
                        <TableCell>Local Stream</TableCell>
                        <TableCell>
                          <Badge variant="default">Valid Permit</Badge>
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
                        <CardTitle className="text-base">Treatment System Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Primary Treatment</span>
                            <Badge variant="default">Operational</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Secondary Treatment</span>
                            <Badge variant="default">Operational</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Tertiary Treatment</span>
                            <Badge variant="outline">Not Required</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Water Quality Monitoring</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Last Test Date</span>
                            <span className="text-sm">2024-01-15</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Next Test Due</span>
                            <span className="text-sm">2024-04-15</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Compliance Status</span>
                            <Badge variant="default">Compliant</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Soil Pollution Tab */}
                <TabsContent value="soil" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Soil Pollution Tracker</h3>
                    <Button>Add Monitoring Site</Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Site Name</TableHead>
                        <TableHead>Soil Type</TableHead>
                        <TableHead>Heavy Metals (mg/kg)</TableHead>
                        <TableHead>Nitrates (mg/kg)</TableHead>
                        <TableHead>Phosphates (mg/kg)</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Test Schedule</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Field A - North</TableCell>
                        <TableCell>
                          <Badge variant="outline">Clay Loam</Badge>
                        </TableCell>
                        <TableCell>2.1</TableCell>
                        <TableCell>45.6</TableCell>
                        <TableCell>12.3</TableCell>
                        <TableCell>T12 ABC4</TableCell>
                        <TableCell>Bi-annual</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Field B - South</TableCell>
                        <TableCell>
                          <Badge variant="outline">Sandy Loam</Badge>
                        </TableCell>
                        <TableCell>1.8</TableCell>
                        <TableCell>38.2</TableCell>
                        <TableCell>15.7</TableCell>
                        <TableCell>T12 XY67</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Alert>
                    <AlertDescription>
                      All soil monitoring results are within acceptable regulatory limits. Next scheduled testing: March 2024.
                    </AlertDescription>
                  </Alert>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Soil Health Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Overall Soil Health Score</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={85} className="flex-1" />
                            <span className="text-sm font-medium">85%</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Contamination Risk Level</Label>
                          <div className="mt-1">
                            <Badge variant="default">Low Risk</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save All Pollution Data</Button>
            <Button variant="outline">Generate Pollution Report</Button>
            <Button variant="outline">Schedule Monitoring</Button>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}