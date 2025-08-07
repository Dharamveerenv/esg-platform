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
import { TreePine, MapPin, Shield, Sprout, Map, Camera } from "lucide-react"

export default function B5Page() {
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
                <BreadcrumbPage>B5: Biodiversity</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Land Use</CardTitle>
                <Map className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245 ha</div>
                <p className="text-xs text-muted-foreground">
                  Total area managed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nature-Oriented Area</CardTitle>
                <TreePine className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 ha</div>
                <p className="text-xs text-muted-foreground">
                  18.4% of total area
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protected Areas</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Sites identified
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Biodiversity Score</CardTitle>
                <Sprout className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">
                  Above average
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Biodiversity Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Biodiversity Impact Assessment and Management</CardTitle>
              <CardDescription>
                Track land use, nature-oriented areas, and biodiversity-sensitive locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="land-use" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="land-use">Land Use Assessment</TabsTrigger>
                  <TabsTrigger value="nature-areas">Nature-Oriented Areas</TabsTrigger>
                  <TabsTrigger value="protected-areas">Protected Areas</TabsTrigger>
                </TabsList>

                {/* Land Use Assessment Tab */}
                <TabsContent value="land-use" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Land Use Assessment</CardTitle>
                      <CardDescription>
                        Document total land use and track changes over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="total-land">Total Land Use (hectares)</Label>
                          <Input
                            id="total-land"
                            type="number"
                            placeholder="Enter total land area"
                            defaultValue="245"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sealed-area">Sealed Area (hectares)</Label>
                          <Input
                            id="sealed-area"
                            type="number"
                            placeholder="Enter sealed area"
                            defaultValue="15"
                          />
                        </div>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Land Use Breakdown</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Agricultural Land</span>
                              <span className="text-sm font-medium">185 ha (75.5%)</span>
                            </div>
                            <Progress value={75.5} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Forest/Woodland</span>
                              <span className="text-sm font-medium">35 ha (14.3%)</span>
                            </div>
                            <Progress value={14.3} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Built Environment</span>
                              <span className="text-sm font-medium">15 ha (6.1%)</span>
                            </div>
                            <Progress value={6.1} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Water Bodies</span>
                              <span className="text-sm font-medium">10 ha (4.1%)</span>
                            </div>
                            <Progress value={4.1} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Land Use Change Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Agricultural (ha)</TableHead>
                                <TableHead>Forest (ha)</TableHead>
                                <TableHead>Built (ha)</TableHead>
                                <TableHead>Change Notes</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>2024</TableCell>
                                <TableCell>185</TableCell>
                                <TableCell>35</TableCell>
                                <TableCell>15</TableCell>
                                <TableCell>Added 5ha woodland</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>2023</TableCell>
                                <TableCell>190</TableCell>
                                <TableCell>30</TableCell>
                                <TableCell>15</TableCell>
                                <TableCell>Converted 5ha to forest</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Nature-Oriented Areas Tab */}
                <TabsContent value="nature-areas" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Nature-Oriented Area Tracker</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Nature Area</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Nature-Oriented Area</DialogTitle>
                          <DialogDescription>
                            Add a new nature-oriented area or conservation project
                          </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="area-type">Area Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select area type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="on-site">On-site Conservation</SelectItem>
                                  <SelectItem value="off-site">Off-site Conservation</SelectItem>
                                  <SelectItem value="restoration">Habitat Restoration</SelectItem>
                                  <SelectItem value="biodiversity-corridor">Biodiversity Corridor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="area-size">Area Size (hectares)</Label>
                              <Input
                                id="area-size"
                                type="number"
                                placeholder="Enter area size"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="habitat-type">Habitat Classification</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select habitat" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="woodland">Woodland</SelectItem>
                                  <SelectItem value="grassland">Grassland</SelectItem>
                                  <SelectItem value="wetland">Wetland</SelectItem>
                                  <SelectItem value="hedgerow">Hedgerow</SelectItem>
                                  <SelectItem value="scrubland">Scrubland</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location (Eircode)</Label>
                              <Input
                                id="location"
                                placeholder="Enter location code"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="conservation-measures">Conservation Measures</Label>
                            <Textarea
                              id="conservation-measures"
                              placeholder="Describe conservation initiatives and management practices..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="species-monitoring">Species Monitoring Programs</Label>
                            <Textarea
                              id="species-monitoring"
                              placeholder="List species monitoring programs and biodiversity surveys..."
                            />
                          </div>
                          <Button type="submit" className="w-full">Add Nature Area</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Area Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size (ha)</TableHead>
                        <TableHead>Habitat</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Conservation Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Oak Woodland Reserve</TableCell>
                        <TableCell>
                          <Badge variant="secondary">On-site</Badge>
                        </TableCell>
                        <TableCell>25 ha</TableCell>
                        <TableCell>
                          <Badge variant="outline">Woodland</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 ABC4
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Active Management</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hedgerow Network</TableCell>
                        <TableCell>
                          <Badge variant="secondary">On-site</Badge>
                        </TableCell>
                        <TableCell>8 ha</TableCell>
                        <TableCell>
                          <Badge variant="outline">Hedgerow</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 XY67
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Established</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Wetland Restoration</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Restoration</Badge>
                        </TableCell>
                        <TableCell>12 ha</TableCell>
                        <TableCell>
                          <Badge variant="outline">Wetland</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 ZW89
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">In Progress</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Biodiversity Action Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Native Species Reintroduction</span>
                          <Badge variant="secondary">In Progress</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Invasive Species Control</span>
                          <Badge variant="default">Ongoing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Habitat Connectivity Enhancement</span>
                          <Badge variant="outline">Planned</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Protected Areas Tab */}
                <TabsContent value="protected-areas" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Biodiversity-Sensitive Area Checker</h3>
                    <Button>Add Protected Area</Button>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Areas identified as biodiversity-sensitive require special management considerations and may be subject to additional regulations.
                    </AlertDescription>
                  </Alert>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Site Name</TableHead>
                        <TableHead>Official Designation</TableHead>
                        <TableHead>IUCN Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>EEA Status</TableHead>
                        <TableHead>Boundary Mapping</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Blackwater Valley SAC</TableCell>
                        <TableCell>
                          <Badge variant="default">Special Area of Conservation</Badge>
                        </TableCell>
                        <TableCell>IV</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 ABC4
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">EEA Registered</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Camera className="h-3 w-3 mr-1" />
                            View Map
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Local Nature Reserve</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Nature Reserve</Badge>
                        </TableCell>
                        <TableCell>V</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            T12 XY67
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Local Designation</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Camera className="h-3 w-3 mr-1" />
                            View Map
                          </Button>
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
                        <CardTitle className="text-base">Impact Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label className="text-sm">Environmental Impact Level</Label>
                            <div className="flex items-center gap-2">
                              <Progress value={25} className="flex-1" />
                              <Badge variant="default">Low Impact</Badge>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Assessment based on proximity to protected areas and activity intensity
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Conservation Measures</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Buffer Zones Established</span>
                            <Badge variant="default">✓</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Species Surveys Completed</span>
                            <Badge variant="default">✓</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Management Plan Updated</span>
                            <Badge variant="secondary">In Progress</Badge>
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
            <Button>Save Biodiversity Data</Button>
            <Button variant="outline">Generate Biodiversity Report</Button>
            <Button variant="outline">Schedule Survey</Button>
            <Button variant="outline">Export GIS Data</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}