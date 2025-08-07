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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Droplets, AlertTriangle, TrendingDown, MapPin, Clock, CheckCircle } from "lucide-react"

export default function B6Page() {
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
                <BreadcrumbPage>B6: Water</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Water Withdrawal</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125,400 L</div>
                <p className="text-xs text-muted-foreground">
                  Annual consumption
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Stress Areas</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  High stress location
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Efficiency</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-8%</div>
                <p className="text-xs text-muted-foreground">
                  Reduction vs last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35%</div>
                <p className="text-xs text-muted-foreground">
                  Water reused/recycled
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Water Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Water Management and Conservation</CardTitle>
              <CardDescription>
                Track water withdrawal, consumption, and conservation measures across all operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="withdrawal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="withdrawal">Water Withdrawal</TabsTrigger>
                  <TabsTrigger value="stress-assessment">Stress Assessment</TabsTrigger>
                  <TabsTrigger value="consumption">Water Consumption</TabsTrigger>
                </TabsList>

                {/* Water Withdrawal Tab */}
                <TabsContent value="withdrawal" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Water Withdrawal Assessment</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Water Source</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Water Source</DialogTitle>
                          <DialogDescription>
                            Add a new water withdrawal source and consumption data
                          </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="water-source">Water Source Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="surface">Surface Water (River/Lake)</SelectItem>
                                  <SelectItem value="groundwater">Groundwater (Borehole/Well)</SelectItem>
                                  <SelectItem value="municipal">Municipal Water Supply</SelectItem>
                                  <SelectItem value="rainwater">Rainwater Harvesting</SelectItem>
                                  <SelectItem value="recycled">Recycled/Treated Water</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="withdrawal-volume">Total Withdrawal (L)</Label>
                              <Input
                                id="withdrawal-volume"
                                type="number"
                                placeholder="Enter annual volume"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location (Eircode)</Label>
                              <Input
                                id="location"
                                placeholder="Enter location code"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="permit-number">Withdrawal Permit</Label>
                              <Input
                                id="permit-number"
                                placeholder="Enter permit number"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="permit-expiry">Permit Expiry Date</Label>
                              <Input
                                id="permit-expiry"
                                type="date"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="seasonal-variation">Seasonal Variation</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select pattern" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="constant">Constant Year-Round</SelectItem>
                                  <SelectItem value="summer-peak">Summer Peak</SelectItem>
                                  <SelectItem value="winter-peak">Winter Peak</SelectItem>
                                  <SelectItem value="seasonal">Highly Seasonal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button type="submit" className="w-full">Add Water Source</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source Type</TableHead>
                        <TableHead>Annual Volume (L)</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Permit Status</TableHead>
                        <TableHead>Seasonal Pattern</TableHead>
                        <TableHead>Quality Parameters</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Groundwater</Badge>
                        </TableCell>
                        <TableCell>85,000</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 ABC4
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Valid until 2026</Badge>
                        </TableCell>
                        <TableCell>Summer Peak</TableCell>
                        <TableCell>
                          <Badge variant="outline">Good Quality</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Municipal</Badge>
                        </TableCell>
                        <TableCell>35,400</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 XY67
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Municipal Supply</Badge>
                        </TableCell>
                        <TableCell>Constant</TableCell>
                        <TableCell>
                          <Badge variant="outline">Treated</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge variant="secondary">Rainwater</Badge>
                        </TableCell>
                        <TableCell>5,000</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 ZW89
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">No Permit Required</Badge>
                        </TableCell>
                        <TableCell>Highly Seasonal</TableCell>
                        <TableCell>
                          <Badge variant="outline">Filtered</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Water Source Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Groundwater</span>
                            <span className="text-sm font-medium">85,000 L (67.8%)</span>
                          </div>
                          <Progress value={67.8} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Municipal Supply</span>
                            <span className="text-sm font-medium">35,400 L (28.2%)</span>
                          </div>
                          <Progress value={28.2} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Rainwater Harvesting</span>
                            <span className="text-sm font-medium">5,000 L (4.0%)</span>
                          </div>
                          <Progress value={4.0} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Stress Assessment Tab */}
                <TabsContent value="stress-assessment" className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Water stress assessment helps identify locations where water scarcity may impact operations and local communities.
                    </AlertDescription>
                  </Alert>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">High Water-Stress Area Identification</CardTitle>
                      <CardDescription>
                        Assessment based on WRI Aqueduct Water Risk Atlas and local conditions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Location</TableHead>
                            <TableHead>Water Stress Level</TableHead>
                            <TableHead>Withdrawal Volume (L)</TableHead>
                            <TableHead>Risk Indicators</TableHead>
                            <TableHead>Mitigation Measures</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                T12 ABC4 (Cork)
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="destructive">High Stress</Badge>
                            </TableCell>
                            <TableCell>85,000</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Badge variant="outline" className="text-xs">Seasonal Drought</Badge>
                                <Badge variant="outline" className="text-xs">High Demand</Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">Water Recycling</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                T12 XY67 (Dublin)
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">Medium Stress</Badge>
                            </TableCell>
                            <TableCell>35,400</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">Urban Competition</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">Efficiency Measures</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Water Scarcity Risk Indicators</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Physical Water Scarcity</span>
                            <Badge variant="secondary">Medium Risk</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Economic Water Scarcity</span>
                            <Badge variant="outline">Low Risk</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Seasonal Variability</span>
                            <Badge variant="destructive">High Risk</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Competition with Communities</span>
                            <Badge variant="secondary">Medium Risk</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Alternative Source Evaluation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Rainwater Harvesting Potential</span>
                            <Badge variant="default">High</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Greywater Recycling</span>
                            <Badge variant="secondary">In Development</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Alternative Supplier Available</span>
                            <Badge variant="outline">Limited</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Water Consumption Tab */}
                <TabsContent value="consumption" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Water Consumption Calculator</CardTitle>
                      <CardDescription>
                        Track water use across different production processes and calculate consumption intensity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="production-water">Production Process Water (L)</Label>
                          <Input
                            id="production-water"
                            type="number"
                            placeholder="Enter volume"
                            defaultValue="95000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cleaning-water">Cleaning & Sanitation (L)</Label>
                          <Input
                            id="cleaning-water"
                            type="number"
                            placeholder="Enter volume"
                            defaultValue="18000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cooling-water">Cooling System (L)</Label>
                          <Input
                            id="cooling-water"
                            type="number"
                            placeholder="Enter volume"
                            defaultValue="8400"
                          />
                        </div>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Water Consumption Breakdown</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Production</span>
                              <span className="text-sm font-medium">95,000 L (78.2%)</span>
                            </div>
                            <Progress value={78.2} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Cleaning</span>
                              <span className="text-sm font-medium">18,000 L (14.8%)</span>
                            </div>
                            <Progress value={14.8} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Cooling</span>
                              <span className="text-sm font-medium">8,400 L (6.9%)</span>
                            </div>
                            <Progress value={6.9} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Water Recycling and Reuse</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="recycled-volume">Water Recycled (L)</Label>
                              <Input
                                id="recycled-volume"
                                type="number"
                                defaultValue="43900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reuse-application">Reuse Application</Label>
                              <Select defaultValue="cleaning">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cleaning">Cleaning Operations</SelectItem>
                                  <SelectItem value="cooling">Cooling Systems</SelectItem>
                                  <SelectItem value="irrigation">Irrigation</SelectItem>
                                  <SelectItem value="process">Process Water</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <div className="text-sm font-medium text-green-800">
                              Recycling Rate: 35.0% of total consumption
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              Exceeds industry average of 25%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Water Efficiency Measures</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Low-flow Equipment Installed</span>
                            <Badge variant="default">✓ Complete</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Leak Detection System</span>
                            <Badge variant="default">✓ Active</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Process Optimization</span>
                            <Badge variant="secondary">In Progress</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Employee Training Program</span>
                            <Badge variant="default">✓ Ongoing</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Consumption Intensity Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">50.1 L</div>
                          <div className="text-sm text-muted-foreground">per kg product</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">2,784 L</div>
                          <div className="text-sm text-muted-foreground">per €1000 revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">-8.3%</div>
                          <div className="text-sm text-muted-foreground">change vs last year</div>
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
            <Button>Save Water Data</Button>
            <Button variant="outline">Generate Water Report</Button>
            <Button variant="outline">Schedule Assessment</Button>
            <Button variant="outline">Export Usage Data</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}