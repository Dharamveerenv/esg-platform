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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users, TrendingDown, Globe, BarChart3, UserPlus, UserMinus } from "lucide-react"

export default function B8Page() {
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
                <BreadcrumbPage>B8: Workforce General</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 FTE</div>
                <p className="text-xs text-muted-foreground">
                  Full-time equivalent
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gender Balance</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52% / 48%</div>
                <p className="text-xs text-muted-foreground">
                  Female / Male
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.2%</div>
                <p className="text-xs text-muted-foreground">
                  Below industry average
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Countries</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Operating locations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Workforce Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Workforce Demographics and Analytics</CardTitle>
              <CardDescription>
                Track employee counts, demographics, geographic distribution, and turnover metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="employee-count" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="employee-count">Employee Count</TabsTrigger>
                  <TabsTrigger value="demographics">Demographics</TabsTrigger>
                  <TabsTrigger value="geographic">Geographic</TabsTrigger>
                  <TabsTrigger value="turnover">Turnover</TabsTrigger>
                </TabsList>

                {/* Employee Count Tab */}
                <TabsContent value="employee-count" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Employee Count Interface</CardTitle>
                      <CardDescription>
                        Configure headcount vs FTE calculations and track different employment types
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-base font-medium">Counting Method</Label>
                        <RadioGroup defaultValue="fte" className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="headcount" id="headcount" />
                            <Label htmlFor="headcount">Headcount (Number of people)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fte" id="fte" />
                            <Label htmlFor="fte">FTE (Full-Time Equivalent)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Employment Types</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="permanent-employees">Permanent Employees</Label>
                                <Input
                                  id="permanent-employees"
                                  type="number"
                                  defaultValue="38"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="permanent-fte">FTE Equivalent</Label>
                                <Input
                                  id="permanent-fte"
                                  type="number"
                                  defaultValue="38"
                                  readOnly
                                  className="bg-muted"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="part-time-employees">Part-Time Employees</Label>
                                <Input
                                  id="part-time-employees"
                                  type="number"
                                  defaultValue="12"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="part-time-fte">FTE Equivalent</Label>
                                <Input
                                  id="part-time-fte"
                                  type="number"
                                  defaultValue="7"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="temporary-employees">Temporary/Seasonal</Label>
                                <Input
                                  id="temporary-employees"
                                  type="number"
                                  defaultValue="8"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="temporary-fte">FTE Equivalent</Label>
                                <Input
                                  id="temporary-fte"
                                  type="number"
                                  defaultValue="4"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="contractors">Contractors/Consultants</Label>
                                <Input
                                  id="contractors"
                                  type="number"
                                  defaultValue="3"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contractors-fte">FTE Equivalent</Label>
                                <Input
                                  id="contractors-fte"
                                  type="number"
                                  defaultValue="2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Contract Types</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Contract Type</TableHead>
                                <TableHead>Count</TableHead>
                                <TableHead>Percentage</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Permanent Full-time</TableCell>
                                <TableCell>38</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={62} className="w-16" />
                                    <span className="text-sm">62%</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Permanent Part-time</TableCell>
                                <TableCell>12</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={20} className="w-16" />
                                    <span className="text-sm">20%</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Temporary/Seasonal</TableCell>
                                <TableCell>8</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={13} className="w-16" />
                                    <span className="text-sm">13%</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Contractors</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={5} className="w-16" />
                                    <span className="text-sm">5%</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Summary Calculation</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">61</div>
                            <div className="text-sm text-muted-foreground">Total Headcount</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">45</div>
                            <div className="text-sm text-muted-foreground">Total FTE</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">0.74</div>
                            <div className="text-sm text-muted-foreground">FTE Conversion Factor</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Demographics Tab */}
                <TabsContent value="demographics" className="space-y-4">
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="gender-distribution">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Gender Distribution Interface
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-medium">Gender Breakdown</h4>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="male-employees">Male Employees</Label>
                                    <Input
                                      id="male-employees"
                                      type="number"
                                      defaultValue="29"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="male-percentage">Percentage</Label>
                                    <Input
                                      id="male-percentage"
                                      value="48%"
                                      readOnly
                                      className="bg-muted"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="female-employees">Female Employees</Label>
                                    <Input
                                      id="female-employees"
                                      type="number"
                                      defaultValue="32"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="female-percentage">Percentage</Label>
                                    <Input
                                      id="female-percentage"
                                      value="52%"
                                      readOnly
                                      className="bg-muted"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="other-gender">Other/Non-Binary</Label>
                                    <Input
                                      id="other-gender"
                                      type="number"
                                      defaultValue="0"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="not-disclosed">Prefer Not to Disclose</Label>
                                    <Input
                                      id="not-disclosed"
                                      type="number"
                                      defaultValue="0"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-medium">Age Group Distribution</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Age Group</TableHead>
                                    <TableHead>Count</TableHead>
                                    <TableHead>Distribution</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Under 30</TableCell>
                                    <TableCell>18</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={30} className="w-16" />
                                        <span className="text-sm">30%</span>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>30-50</TableCell>
                                    <TableCell>35</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={57} className="w-16" />
                                        <span className="text-sm">57%</span>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Over 50</TableCell>
                                    <TableCell>8</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={13} className="w-16" />
                                        <span className="text-sm">13%</span>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </div>

                          <Alert>
                            <AlertDescription>
                              Privacy protection measures are in place. Individual demographic data is anonymized and only aggregated statistics are reported.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="education-diversity">
                      <AccordionTrigger>Educational Level and Diversity Tracking</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Educational Level Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm">Secondary Education</span>
                                  <span className="text-sm font-medium">22 (36%)</span>
                                </div>
                                <Progress value={36} className="h-2" />
                                <div className="flex justify-between">
                                  <span className="text-sm">Technical/Vocational</span>
                                  <span className="text-sm font-medium">25 (41%)</span>
                                </div>
                                <Progress value={41} className="h-2" />
                                <div className="flex justify-between">
                                  <span className="text-sm">University Degree</span>
                                  <span className="text-sm font-medium">12 (20%)</span>
                                </div>
                                <Progress value={20} className="h-2" />
                                <div className="flex justify-between">
                                  <span className="text-sm">Postgraduate</span>
                                  <span className="text-sm font-medium">2 (3%)</span>
                                </div>
                                <Progress value={3} className="h-2" />
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Diversity & Inclusion Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Disability Inclusion</span>
                                  <Badge variant="secondary">3 employees</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Multicultural Workforce</span>
                                  <Badge variant="secondary">5 nationalities</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Language Diversity</span>
                                  <Badge variant="secondary">4 languages</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">D&I Training Completion</span>
                                  <Badge variant="default">95%</Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                {/* Geographic Distribution Tab */}
                <TabsContent value="geographic" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Geographic Distribution (Multi-Country Operations)</CardTitle>
                      <CardDescription>
                        Track employee distribution across different countries and regions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Country-wise Employee Distribution</h4>
                        <Button size="sm">Add Location</Button>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Country</TableHead>
                            <TableHead>Employee Count</TableHead>
                            <TableHead>Percentage</TableHead>
                            <TableHead>Local Regulations</TableHead>
                            <TableHead>Remote Work Policy</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                🇮🇪 <span>Ireland</span>
                              </div>
                            </TableCell>
                            <TableCell>52</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={85} className="w-16" />
                                <span className="text-sm">85%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">EU Compliant</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">Hybrid</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                🇬🇧 <span>United Kingdom</span>
                              </div>
                            </TableCell>
                            <TableCell>9</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={15} className="w-16" />
                                <span className="text-sm">15%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">UK Employment Law</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">Remote</Badge>
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
                            <CardTitle className="text-base">Remote Work Tracking</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm">Office-based</span>
                                <span className="text-sm font-medium">35 (57%)</span>
                              </div>
                              <Progress value={57} className="h-2" />
                              <div className="flex justify-between">
                                <span className="text-sm">Hybrid</span>
                                <span className="text-sm font-medium">17 (28%)</span>
                              </div>
                              <Progress value={28} className="h-2" />
                              <div className="flex justify-between">
                                <span className="text-sm">Fully Remote</span>
                                <span className="text-sm font-medium">9 (15%)</span>
                              </div>
                              <Progress value={15} className="h-2" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">International Assignments</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Current Expatriates</span>
                                <Badge variant="secondary">2 employees</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Cross-border Commuters</span>
                                <Badge variant="secondary">3 employees</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">International Projects</span>
                                <Badge variant="default">1 active</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Turnover Tab */}
                <TabsContent value="turnover" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Turnover Rate Calculator</CardTitle>
                      <CardDescription>
                        Calculate and analyze employee turnover with industry benchmarking
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="employees-departed">Employees Departed (Annual)</Label>
                          <Input
                            id="employees-departed"
                            type="number"
                            defaultValue="5"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-hires">New Hires (Annual)</Label>
                          <Input
                            id="new-hires"
                            type="number"
                            defaultValue="7"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="average-employees">Average Employee Count</Label>
                          <Input
                            id="average-employees"
                            type="number"
                            defaultValue="61"
                          />
                        </div>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-4">Turnover Analysis</h4>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">8.2%</div>
                            <div className="text-sm text-muted-foreground">Turnover Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">11.5%</div>
                            <div className="text-sm text-muted-foreground">Hiring Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">91.8%</div>
                            <div className="text-sm text-muted-foreground">Retention Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">+3.3%</div>
                            <div className="text-sm text-muted-foreground">Net Growth</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Departure Reasons</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm">Career Advancement</span>
                                <span className="text-sm font-medium">2 (40%)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Relocation</span>
                                <span className="text-sm font-medium">1 (20%)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Retirement</span>
                                <span className="text-sm font-medium">1 (20%)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Personal Reasons</span>
                                <span className="text-sm font-medium">1 (20%)</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Industry Benchmarking</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Company Rate</span>
                                <Badge variant="default">8.2%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Industry Average</span>
                                <Badge variant="outline">12.5%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Performance vs Industry</span>
                                <Badge variant="default">Better by 4.3%</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Retention Analysis by Department</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Department</TableHead>
                                <TableHead>Employees</TableHead>
                                <TableHead>Departures</TableHead>
                                <TableHead>Turnover Rate</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Production</TableCell>
                                <TableCell>28</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>7.1%</TableCell>
                                <TableCell>
                                  <Badge variant="default">Good</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Quality Assurance</TableCell>
                                <TableCell>8</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>12.5%</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Average</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Administration</TableCell>
                                <TableCell>12</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>8.3%</TableCell>
                                <TableCell>
                                  <Badge variant="default">Good</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Sales & Marketing</TableCell>
                                <TableCell>13</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>7.7%</TableCell>
                                <TableCell>
                                  <Badge variant="default">Good</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save Workforce Data</Button>
            <Button variant="outline">Generate HR Report</Button>
            <Button variant="outline">Export Demographics</Button>
            <Button variant="outline">Schedule Review</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}