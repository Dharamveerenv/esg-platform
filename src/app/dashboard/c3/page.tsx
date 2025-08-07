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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingDown, Calendar, CheckCircle, AlertCircle, BarChart3 } from "lucide-react"

export default function C3Page() {
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
                <BreadcrumbPage>C3: GHG Reduction Targets</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Targets</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Science-based targets
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reduction Progress</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34%</div>
                <p className="text-xs text-muted-foreground">
                  Total emissions reduced
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Target Years</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2030</div>
                <p className="text-xs text-muted-foreground">
                  Primary deadline
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SBTi Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Approved</div>
                <p className="text-xs text-muted-foreground">
                  Science-based targets
                </p>
              </CardContent>
            </Card>
          </div>

          {/* GHG Reduction Targets Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>GHG Emission Reduction Targets and Performance</CardTitle>
              <CardDescription>
                Science-based target setting, performance tracking, and action planning for comprehensive GHG emission reductions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="targets" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="targets">Target Setting</TabsTrigger>
                  <TabsTrigger value="tracking">Performance Tracking</TabsTrigger>
                  <TabsTrigger value="sbt">Science-Based Targets</TabsTrigger>
                  <TabsTrigger value="actions">Action Plans</TabsTrigger>
                </TabsList>

                {/* Target Setting Interface Tab */}
                <TabsContent value="targets" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">GHG Emission Reduction Target Setting</CardTitle>
                      <CardDescription>
                        Establish comprehensive reduction targets across all emission scopes with clear timelines and methodologies
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="scope1-2-targets">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              Scope 1 & 2 Emission Targets
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Current Scope 1 & 2 Targets</h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Add New Target</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Set New GHG Reduction Target</DialogTitle>
                                      <DialogDescription>
                                        Define a new emission reduction target with specific parameters
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="target-scope">Target Scope</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select scope" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="scope1">Scope 1 Only</SelectItem>
                                              <SelectItem value="scope2">Scope 2 Only</SelectItem>
                                              <SelectItem value="scope1-2">Scope 1 & 2 Combined</SelectItem>
                                              <SelectItem value="scope3">Scope 3 (specific category)</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="target-year">Target Year</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="2025">2025</SelectItem>
                                              <SelectItem value="2027">2027</SelectItem>
                                              <SelectItem value="2030">2030</SelectItem>
                                              <SelectItem value="2035">2035</SelectItem>
                                              <SelectItem value="2050">2050</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="base-year">Base Year</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select base year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="2019">2019</SelectItem>
                                              <SelectItem value="2020">2020</SelectItem>
                                              <SelectItem value="2021">2021</SelectItem>
                                              <SelectItem value="2022">2022</SelectItem>
                                              <SelectItem value="2023">2023</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="target-type">Target Type</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="absolute">Absolute Reduction</SelectItem>
                                              <SelectItem value="intensity">Intensity Reduction</SelectItem>
                                              <SelectItem value="renewable">Renewable Energy</SelectItem>
                                              <SelectItem value="carbon-neutral">Carbon Neutral</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="reduction-percentage">Reduction Percentage (%)</Label>
                                          <Input
                                            id="reduction-percentage"
                                            type="number"
                                            placeholder="e.g., 42"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="coverage-percentage">Coverage (%)</Label>
                                          <Input
                                            id="coverage-percentage"
                                            type="number"
                                            placeholder="e.g., 100"
                                            defaultValue="100"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="target-description">Target Description and Rationale</Label>
                                        <Textarea
                                          id="target-description"
                                          placeholder="Describe the target, methodology, and business rationale..."
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">Set Target</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Target Description</TableHead>
                                    <TableHead>Scope</TableHead>
                                    <TableHead>Base Year</TableHead>
                                    <TableHead>Target Year</TableHead>
                                    <TableHead>Reduction %</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Absolute Scope 1&2 Reduction</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Scope 1&2</Badge>
                                    </TableCell>
                                    <TableCell>2022</TableCell>
                                    <TableCell>2030</TableCell>
                                    <TableCell>42%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Renewable Energy Target</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Scope 2</Badge>
                                    </TableCell>
                                    <TableCell>2022</TableCell>
                                    <TableCell>2027</TableCell>
                                    <TableCell>100%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Interim Milestone 2025</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Scope 1&2</Badge>
                                    </TableCell>
                                    <TableCell>2022</TableCell>
                                    <TableCell>2025</TableCell>
                                    <TableCell>20%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="scope3-targets">
                          <AccordionTrigger>Scope 3 Emission Targets</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Material Scope 3 Categories</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Purchased Goods & Services</span>
                                        <Badge variant="destructive">Material</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Business Travel</span>
                                        <Badge variant="secondary">Not Material</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Employee Commuting</span>
                                        <Badge variant="secondary">Not Material</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Downstream Transport</span>
                                        <Badge variant="default">Material</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Processing of Sold Products</span>
                                        <Badge variant="destructive">Material</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Scope 3 Target Setting</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="scope3-target">Scope 3 Reduction Target</Label>
                                      <Input
                                        id="scope3-target"
                                        defaultValue="25% reduction by 2030"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="scope3-coverage">Coverage of Scope 3</Label>
                                      <Input
                                        id="scope3-coverage"
                                        defaultValue="67% of total Scope 3 emissions"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="supplier-engagement">Supplier Engagement Target</Label>
                                      <Input
                                        id="supplier-engagement"
                                        defaultValue="80% of suppliers by spend set SBTs by 2027"
                                      />
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="methodology">
                          <AccordionTrigger>Target Methodology and Unit Measurement</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="methodology-approach">Methodology Approach</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select methodology" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="absolute-contraction">Absolute Contraction</SelectItem>
                                        <SelectItem value="sectoral-decarbonization">Sectoral Decarbonization</SelectItem>
                                        <SelectItem value="economic-intensity">Economic Intensity</SelectItem>
                                        <SelectItem value="physical-intensity">Physical Intensity</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="unit-measurement">Unit of Measurement</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select unit" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="tco2e">tCO2e (absolute)</SelectItem>
                                        <SelectItem value="tco2e-per-revenue">tCO2e per € revenue</SelectItem>
                                        <SelectItem value="tco2e-per-production">tCO2e per tonne production</SelectItem>
                                        <SelectItem value="tco2e-per-employee">tCO2e per employee</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="baseline-emissions">Baseline Emissions (tCO2e)</Label>
                                    <Input
                                      id="baseline-emissions"
                                      defaultValue="2,450"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="boundary-definition">Organizational Boundary</Label>
                                    <Textarea
                                      id="boundary-definition"
                                      defaultValue="Operational control approach covering all facilities and operations under direct management control. Includes headquarters, processing facilities, and agricultural operations."
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="exclusions">Exclusions and Rationale</Label>
                                    <Textarea
                                      id="exclusions"
                                      defaultValue="Joint ventures where we have less than 50% control are excluded. Immaterial emission sources representing less than 5% of total inventory are excluded with detailed documentation."
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Performance Tracking Tab */}
                <TabsContent value="tracking" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Target Performance Tracking</CardTitle>
                      <CardDescription>
                        Monitor progress against established targets with variance analysis and corrective actions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Progress Dashboard</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Scope 1&2 Target (42% by 2030)</Label>
                                  <span className="text-sm font-medium">34% achieved</span>
                                </div>
                                <Progress value={34} className="w-full" />
                                <p className="text-xs text-muted-foreground">8 percentage points ahead of schedule</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Renewable Energy (100% by 2027)</Label>
                                  <span className="text-sm font-medium">78% achieved</span>
                                </div>
                                <Progress value={78} className="w-full" />
                                <p className="text-xs text-muted-foreground">On track for target achievement</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Scope 3 Target (25% by 2030)</Label>
                                  <span className="text-sm font-medium">12% achieved</span>
                                </div>
                                <Progress value={12} className="w-full" />
                                <p className="text-xs text-muted-foreground">Requires acceleration</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Performance Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">2024 Emissions (tCO2e)</span>
                                <Badge variant="default">1,618</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Baseline 2022 (tCO2e)</span>
                                <Badge variant="secondary">2,450</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Year-on-Year Reduction</span>
                                <Badge variant="default">-12.3%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Required Annual Rate</span>
                                <Badge variant="secondary">-7.2%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Performance vs Plan</span>
                                <Badge variant="default">Ahead</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Milestone Achievement Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Milestone</TableHead>
                                <TableHead>Target Date</TableHead>
                                <TableHead>Target Value</TableHead>
                                <TableHead>Current Value</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Variance</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">2025 Interim Target</TableCell>
                                <TableCell>Dec 2025</TableCell>
                                <TableCell>1,960 tCO2e</TableCell>
                                <TableCell>1,618 tCO2e</TableCell>
                                <TableCell>
                                  <Badge variant="default">Achieved Early</Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="text-green-600">-342 tCO2e</span>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Renewable Energy 50%</TableCell>
                                <TableCell>Jun 2025</TableCell>
                                <TableCell>50%</TableCell>
                                <TableCell>78%</TableCell>
                                <TableCell>
                                  <Badge variant="default">Exceeded</Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="text-green-600">+28%</span>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Scope 3 Supplier Engagement</TableCell>
                                <TableCell>Dec 2025</TableCell>
                                <TableCell>60%</TableCell>
                                <TableCell>45%</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">In Progress</Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="text-yellow-600">-15%</span>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Energy Efficiency</TableCell>
                                <TableCell>Dec 2026</TableCell>
                                <TableCell>20%</TableCell>
                                <TableCell>14%</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">On Track</Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="text-blue-600">-6%</span>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Variance Analysis and Corrective Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="variance-analysis">Performance Variance Analysis</Label>
                            <Textarea
                              id="variance-analysis"
                              defaultValue="Scope 1&2 emissions are tracking 8 percentage points ahead of target due to successful implementation of energy efficiency measures and earlier-than-planned renewable energy adoption. Scope 3 progress is lagging due to slower supplier engagement, requiring accelerated outreach programs."
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="corrective-actions">Corrective Actions Planned</Label>
                            <Textarea
                              id="corrective-actions"
                              defaultValue="1. Accelerate supplier engagement program with dedicated resources
2. Implement supplier incentive scheme for SBT adoption  
3. Expand scope 3 measurement to additional categories
4. Increase renewable energy procurement to 100% by 2026 (ahead of 2027 target)
5. Invest in additional energy efficiency projects to maintain momentum"
                              rows={5}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Science-Based Targets Tab */}
                <TabsContent value="sbt" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Science-Based Target Validation</CardTitle>
                      <CardDescription>
                        SBTi alignment, validation process, and compliance with latest climate science requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">SBTi Status</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">SBTi Commitment</span>
                                <Badge variant="default">Committed</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Target Submission</span>
                                <Badge variant="default">Approved</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Validation Date</span>
                                <Badge variant="secondary">Mar 2024</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Temperature Alignment</span>
                                <Badge variant="default">1.5°C</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Net-Zero Commitment</span>
                                <Badge variant="default">2050</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Target Categories</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Near-term Scope 1&2</span>
                                <Badge variant="default">Approved</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Near-term Scope 3</span>
                                <Badge variant="default">Approved</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Long-term Target</span>
                                <Badge variant="secondary">Submitted</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Net-Zero Target</span>
                                <Badge variant="secondary">In Development</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">FLAG Sector Guidance</span>
                                <Badge variant="default">Applied</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">SBTi Validation Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Target</TableHead>
                                <TableHead>Scope</TableHead>
                                <TableHead>Methodology</TableHead>
                                <TableHead>Temperature Alignment</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">42% absolute reduction by 2030</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Scope 1&2</Badge>
                                </TableCell>
                                <TableCell>Absolute Contraction</TableCell>
                                <TableCell>1.5°C</TableCell>
                                <TableCell>
                                  <Badge variant="default">Approved</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">25% absolute reduction by 2030</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Scope 3</Badge>
                                </TableCell>
                                <TableCell>Absolute Contraction</TableCell>
                                <TableCell>Well-below 2°C</TableCell>
                                <TableCell>
                                  <Badge variant="default">Approved</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">90% absolute reduction by 2050</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Scope 1&2</Badge>
                                </TableCell>
                                <TableCell>Long-term Trajectory</TableCell>
                                <TableCell>1.5°C</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Under Review</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Climate Science Alignment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="climate-alignment">Temperature Pathway Alignment</Label>
                            <Textarea
                              id="climate-alignment"
                              defaultValue="Our targets are aligned with limiting global warming to 1.5°C above pre-industrial levels as outlined in the Paris Agreement. The near-term targets follow the absolute contraction approach based on a carbon budget consistent with climate science requirements. Our Scope 3 target addresses our most material categories and represents meaningful action across our value chain."
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="flag-compliance">FLAG Sector Compliance</Label>
                            <Textarea
                              id="flag-compliance"
                              defaultValue="As an agricultural company, we have applied the FLAG (Forest, Land and Agriculture) sector guidance from SBTi. Our targets account for both emission reductions and land-based carbon removals. We have separated biogenic and non-biogenic emissions and set appropriate targets for each category following sector-specific methodologies."
                              rows={4}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Action Plans Tab */}
                <TabsContent value="actions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Implementation Action Plans</CardTitle>
                      <CardDescription>
                        Detailed action plans, resource allocation, and implementation roadmaps for achieving emission reduction targets
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="scope1-actions">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              Scope 1 Reduction Actions
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Timeline</TableHead>
                                    <TableHead>Investment (€)</TableHead>
                                    <TableHead>Reduction Potential</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Replace diesel generators with electric</TableCell>
                                    <TableCell>2024-2025</TableCell>
                                    <TableCell>€125,000</TableCell>
                                    <TableCell>180 tCO2e/year</TableCell>
                                    <TableCell>
                                      <Badge variant="default">In Progress</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Farm equipment electrification</TableCell>
                                    <TableCell>2025-2027</TableCell>
                                    <TableCell>€350,000</TableCell>
                                    <TableCell>320 tCO2e/year</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Planned</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Biogas plant installation</TableCell>
                                    <TableCell>2025-2026</TableCell>
                                    <TableCell>€450,000</TableCell>
                                    <TableCell>290 tCO2e/year</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Planned</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Energy efficiency upgrades</TableCell>
                                    <TableCell>2024-2026</TableCell>
                                    <TableCell>€200,000</TableCell>
                                    <TableCell>150 tCO2e/year</TableCell>
                                    <TableCell>
                                      <Badge variant="default">In Progress</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="scope2-actions">
                          <AccordionTrigger>Scope 2 Reduction Actions</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Renewable Energy Procurement</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Solar PV Installation</span>
                                      <Badge variant="default">500 kW</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Wind Power PPA</span>
                                      <Badge variant="default">2 MW</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Green Electricity Contract</span>
                                      <Badge variant="default">100%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Renewable Energy Certificates</span>
                                      <Badge variant="secondary">Transitional</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Energy Efficiency Measures</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">LED Lighting Upgrade</span>
                                      <Badge variant="default">Complete</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">HVAC System Optimization</span>
                                      <Badge variant="default">In Progress</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Building Insulation</span>
                                      <Badge variant="secondary">Planned</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Smart Energy Management</span>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="scope3-actions">
                          <AccordionTrigger>Scope 3 Reduction Actions</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="supplier-engagement">Supplier Engagement Strategy</Label>
                                <Textarea
                                  id="supplier-engagement"
                                  defaultValue="Comprehensive supplier engagement program targeting 80% of suppliers by spend to set science-based targets by 2027. Includes supplier assessment, capacity building workshops, incentive programs, and annual performance reviews. Focus on material categories including feed suppliers, packaging, and logistics providers."
                                  rows={4}
                                />
                              </div>
                              
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Initiative</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Timeline</TableHead>
                                    <TableHead>Reduction Potential</TableHead>
                                    <TableHead>Progress</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Sustainable Packaging Initiative</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Packaging</Badge>
                                    </TableCell>
                                    <TableCell>2024-2026</TableCell>
                                    <TableCell>15% reduction</TableCell>
                                    <TableCell>
                                      <Badge variant="default">60%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Local Sourcing Expansion</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Transport</Badge>
                                    </TableCell>
                                    <TableCell>2024-2027</TableCell>
                                    <TableCell>20% reduction</TableCell>
                                    <TableCell>
                                      <Badge variant="default">45%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Supplier SBT Program</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Multi-category</Badge>
                                    </TableCell>
                                    <TableCell>2024-2027</TableCell>
                                    <TableCell>30% reduction</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">25%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Regenerative Agriculture</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Agriculture</Badge>
                                    </TableCell>
                                    <TableCell>2024-2030</TableCell>
                                    <TableCell>25% reduction</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">15%</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="resource-allocation">
                          <AccordionTrigger>Resource Allocation and Investment</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Investment Summary</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Total Climate Investment</span>
                                        <Badge variant="default">€1.8M</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Annual Budget Allocation</span>
                                        <Badge variant="secondary">€350K</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Grants & Incentives</span>
                                        <Badge variant="default">€420K</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Payback Period</span>
                                        <Badge variant="secondary">4.2 years</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Annual Savings</span>
                                        <Badge variant="default">€240K</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Team and Resources</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Sustainability Team</span>
                                        <Badge variant="default">3 FTE</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Project Managers</span>
                                        <Badge variant="secondary">2 FTE</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">External Consultants</span>
                                        <Badge variant="secondary">€80K</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Training Budget</span>
                                        <Badge variant="secondary">€25K</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Technology Systems</span>
                                        <Badge variant="secondary">€45K</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save Target Data</Button>
            <Button variant="outline">Generate Progress Report</Button>
            <Button variant="outline">Update SBTi Submission</Button>
            <Button variant="outline">Export Action Plans</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}