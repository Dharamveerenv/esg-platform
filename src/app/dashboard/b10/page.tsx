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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Euro, TrendingUp, Users, BarChart3, DollarSign, Award } from "lucide-react"

export default function B10Page() {
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
                <BreadcrumbPage>B10: Workforce Remuneration</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gender Pay Gap</CardTitle>
                <Euro className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-muted-foreground">
                  Below industry average
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CEO Pay Ratio</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1:18</div>
                <p className="text-xs text-muted-foreground">
                  CEO to median worker
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Living Wage Coverage</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">
                  All employees covered
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Benefits Coverage</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  Benefit categories
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Remuneration Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Workforce Remuneration and Benefits</CardTitle>
              <CardDescription>
                Track pay equity, compensation structure, benefits provision, and remuneration transparency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pay-equity" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pay-equity">Pay Equity</TabsTrigger>
                  <TabsTrigger value="compensation">Compensation</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="transparency">Transparency</TabsTrigger>
                </TabsList>

                {/* Pay Equity Tab */}
                <TabsContent value="pay-equity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Gender Pay Gap Analysis</CardTitle>
                      <CardDescription>
                        Monitor and address gender-based pay disparities across all levels
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Overall Pay Gap Metrics</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="unadjusted-gap">Unadjusted Pay Gap (%)</Label>
                                <Input
                                  id="unadjusted-gap"
                                  type="number"
                                  defaultValue="2.1"
                                  step="0.1"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="adjusted-gap">Adjusted Pay Gap (%)</Label>
                                <Input
                                  id="adjusted-gap"
                                  type="number"
                                  defaultValue="0.8"
                                  step="0.1"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="median-gap">Median Pay Gap (%)</Label>
                                <Input
                                  id="median-gap"
                                  type="number"
                                  defaultValue="1.5"
                                  step="0.1"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="bonus-gap">Bonus Gap (%)</Label>
                                <Input
                                  id="bonus-gap"
                                  type="number"
                                  defaultValue="3.2"
                                  step="0.1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Pay Gap by Level</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Job Level</TableHead>
                                <TableHead>Pay Gap</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Senior Management</TableCell>
                                <TableCell>0.5%</TableCell>
                                <TableCell>
                                  <Badge variant="default">Excellent</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Middle Management</TableCell>
                                <TableCell>1.8%</TableCell>
                                <TableCell>
                                  <Badge variant="default">Good</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Professional</TableCell>
                                <TableCell>2.3%</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Monitor</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Support</TableCell>
                                <TableCell>1.2%</TableCell>
                                <TableCell>
                                  <Badge variant="default">Good</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Pay Equity Action Plan</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Annual Pay Equity Review</span>
                              <Badge variant="default">✓ Complete</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Job Evaluation System</span>
                              <Badge variant="default">✓ Implemented</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Salary Band Transparency</span>
                              <Badge variant="default">✓ Active</Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Manager Training on Bias</span>
                              <Badge variant="secondary">In Progress</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Pay Gap Remediation</span>
                              <Badge variant="secondary">Ongoing</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">External Pay Equity Audit</span>
                              <Badge variant="outline">Scheduled</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Multi-Dimensional Pay Equity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="ethnicity-gap">
                          <AccordionTrigger>Ethnicity Pay Gap Analysis</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm">Ethnic Minority Pay Gap</Label>
                                  <div className="flex items-center gap-2">
                                    <Progress value={97} className="flex-1" />
                                    <span className="text-sm font-medium">-3.0%</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Negative gap indicates ethnic minorities earn more on average
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Representation in Leadership</Label>
                                  <div className="flex items-center gap-2">
                                    <Progress value={25} className="flex-1" />
                                    <span className="text-sm font-medium">25%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="age-gap">
                          <AccordionTrigger>Age-Based Pay Analysis</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Age Group</TableHead>
                                    <TableHead>Average Salary</TableHead>
                                    <TableHead>Relative to Overall</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Under 30</TableCell>
                                    <TableCell>€42,500</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">-8.5%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>30-50</TableCell>
                                    <TableCell>€48,200</TableCell>
                                    <TableCell>
                                      <Badge variant="default">+3.8%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Over 50</TableCell>
                                    <TableCell>€46,800</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">+0.8%</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="disability-gap">
                          <AccordionTrigger>Disability Pay Equity</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Alert>
                                <AlertDescription>
                                  All employees with disabilities receive equal pay for equal work, with workplace adjustments provided as needed.
                                </AlertDescription>
                              </Alert>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm">Pay Equity Status</Label>
                                  <Badge variant="default">100% Equal Pay</Badge>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Accommodation Support</Label>
                                  <Badge variant="default">Fully Provided</Badge>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Compensation Structure Tab */}
                <TabsContent value="compensation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Executive Compensation and Ratios</CardTitle>
                      <CardDescription>
                        Track CEO pay ratios and executive compensation transparency
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">CEO Compensation Breakdown</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="ceo-base">Base Salary (€)</Label>
                                <Input
                                  id="ceo-base"
                                  type="number"
                                  defaultValue="185000"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="ceo-bonus">Annual Bonus (€)</Label>
                                <Input
                                  id="ceo-bonus"
                                  type="number"
                                  defaultValue="95000"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="ceo-equity">Equity Compensation (€)</Label>
                                <Input
                                  id="ceo-equity"
                                  type="number"
                                  defaultValue="125000"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="ceo-benefits">Benefits & Perquisites (€)</Label>
                                <Input
                                  id="ceo-benefits"
                                  type="number"
                                  defaultValue="45000"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Pay Ratio Analysis</h4>
                          <div className="bg-muted p-4 rounded-md">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold">€450,000</div>
                                <div className="text-sm text-muted-foreground">Total CEO Compensation</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">€25,000</div>
                                <div className="text-sm text-muted-foreground">Median Worker Pay</div>
                              </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="text-center">
                              <div className="text-3xl font-bold text-primary">1:18</div>
                              <div className="text-sm text-muted-foreground">CEO-to-Median Worker Ratio</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Executive Team Ratios</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Position</TableHead>
                                  <TableHead>Total Compensation</TableHead>
                                  <TableHead>Ratio to Median</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>CEO</TableCell>
                                  <TableCell>€450,000</TableCell>
                                  <TableCell>1:18</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>COO</TableCell>
                                  <TableCell>€320,000</TableCell>
                                  <TableCell>1:13</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>CFO</TableCell>
                                  <TableCell>€295,000</TableCell>
                                  <TableCell>1:12</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>CTO</TableCell>
                                  <TableCell>€285,000</TableCell>
                                  <TableCell>1:11</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Industry Benchmarking</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Company CEO Ratio</span>
                                <Badge variant="default">1:18</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Industry Average</span>
                                <Badge variant="outline">1:35</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Sector Best Practice</span>
                                <Badge variant="outline">1:15</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Performance vs Industry</span>
                                <Badge variant="default">48% Below Average</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Living Wage and Compensation Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Living Wage Coverage</h4>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm">Employees Above Living Wage</span>
                                <span className="text-sm font-medium">100%</span>
                              </div>
                              <Progress value={100} className="h-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center">
                                <div className="text-xl font-bold">€12.70</div>
                                <div className="text-xs text-muted-foreground">Living Wage (Ireland)</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold">€15.50</div>
                                <div className="text-xs text-muted-foreground">Our Minimum Wage</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Salary Band Structure</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Level</TableHead>
                                <TableHead>Min (€)</TableHead>
                                <TableHead>Max (€)</TableHead>
                                <TableHead>Employees</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Entry Level</TableCell>
                                <TableCell>28,000</TableCell>
                                <TableCell>35,000</TableCell>
                                <TableCell>18</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Experienced</TableCell>
                                <TableCell>35,000</TableCell>
                                <TableCell>55,000</TableCell>
                                <TableCell>25</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Senior</TableCell>
                                <TableCell>55,000</TableCell>
                                <TableCell>85,000</TableCell>
                                <TableCell>12</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Management</TableCell>
                                <TableCell>85,000</TableCell>
                                <TableCell>150,000</TableCell>
                                <TableCell>6</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Benefits Tab */}
                <TabsContent value="benefits" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Employee Benefits and Social Protection</CardTitle>
                      <CardDescription>
                        Comprehensive benefits package and social protection coverage
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Benefits Portfolio</h4>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Add Benefit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Employee Benefit</DialogTitle>
                              <DialogDescription>
                                Add a new benefit or update existing benefit coverage
                              </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="benefit-category">Benefit Category</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="health">Health & Medical</SelectItem>
                                      <SelectItem value="retirement">Retirement & Pension</SelectItem>
                                      <SelectItem value="time-off">Time Off & Leave</SelectItem>
                                      <SelectItem value="family">Family Support</SelectItem>
                                      <SelectItem value="wellness">Wellness & Lifestyle</SelectItem>
                                      <SelectItem value="financial">Financial Support</SelectItem>
                                      <SelectItem value="professional">Professional Development</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="benefit-name">Benefit Name</Label>
                                  <Input
                                    id="benefit-name"
                                    placeholder="Enter benefit name"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="coverage-rate">Coverage Rate (%)</Label>
                                  <Input
                                    id="coverage-rate"
                                    type="number"
                                    placeholder="100"
                                    max="100"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="employer-contribution">Employer Contribution (%)</Label>
                                  <Input
                                    id="employer-contribution"
                                    type="number"
                                    placeholder="Enter percentage"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="benefit-description">Benefit Description</Label>
                                <Textarea
                                  id="benefit-description"
                                  placeholder="Describe the benefit and its terms..."
                                />
                              </div>
                              <Button type="submit" className="w-full">Add Benefit</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Benefit Category</TableHead>
                            <TableHead>Specific Benefit</TableHead>
                            <TableHead>Coverage</TableHead>
                            <TableHead>Employer Contribution</TableHead>
                            <TableHead>Employee Participation</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Health & Medical</Badge>
                            </TableCell>
                            <TableCell>Private Health Insurance</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>85%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={92} className="w-16" />
                                <span className="text-sm">92%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Retirement</Badge>
                            </TableCell>
                            <TableCell>Company Pension Scheme</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>6%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={88} className="w-16" />
                                <span className="text-sm">88%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Time Off</Badge>
                            </TableCell>
                            <TableCell>Annual Leave (25+ days)</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={100} className="w-16" />
                                <span className="text-sm">100%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Family Support</Badge>
                            </TableCell>
                            <TableCell>Maternity/Paternity Leave</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={100} className="w-16" />
                                <span className="text-sm">100%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Wellness</Badge>
                            </TableCell>
                            <TableCell>Gym Membership Subsidy</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>50%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={65} className="w-16" />
                                <span className="text-sm">65%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Badge variant="secondary">Professional</Badge>
                            </TableCell>
                            <TableCell>Training & Development Fund</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={78} className="w-16" />
                                <span className="text-sm">78%</span>
                              </div>
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
                            <CardTitle className="text-base">Benefits Utilization Summary</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm">Health Benefits</span>
                                <span className="text-sm font-medium">92% utilization</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Retirement Benefits</span>
                                <span className="text-sm font-medium">88% participation</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Wellness Programs</span>
                                <span className="text-sm font-medium">65% engagement</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Professional Development</span>
                                <span className="text-sm font-medium">78% usage</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-medium">
                                <span className="text-sm">Overall Benefits Satisfaction</span>
                                <span className="text-sm">8.4/10</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Total Rewards Value</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="text-center">
                                <div className="text-2xl font-bold">€58,500</div>
                                <div className="text-sm text-muted-foreground">Average Total Compensation</div>
                              </div>
                              <Separator />
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Base Salary</span>
                                  <span className="text-sm font-medium">€46,500 (79%)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Benefits Value</span>
                                  <span className="text-sm font-medium">€12,000 (21%)</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Transparency Tab */}
                <TabsContent value="transparency" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Remuneration Transparency and Communication</CardTitle>
                      <CardDescription>
                        Ensure transparent communication about compensation philosophy and practices
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Transparency Initiatives</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Salary Band Publication</span>
                                <Badge variant="default">✓ Published</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Pay Equity Reports</span>
                                <Badge variant="default">✓ Annual</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Compensation Philosophy</span>
                                <Badge variant="default">✓ Documented</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Benefits Guide</span>
                                <Badge variant="default">✓ Available</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Performance Criteria</span>
                                <Badge variant="default">✓ Transparent</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Employee Communications</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Annual Compensation Review</span>
                                <Badge variant="default">Completed</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Total Rewards Statements</span>
                                <Badge variant="default">Issued</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Manager Training on Pay</span>
                                <Badge variant="secondary">Ongoing</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Employee Pay Surveys</span>
                                <Badge variant="outline">Planned</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Compensation Philosophy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label htmlFor="comp-philosophy">Our Compensation Approach</Label>
                            <Textarea
                              id="comp-philosophy"
                              defaultValue="Our compensation philosophy is built on principles of fairness, transparency, and performance. We believe in:

1. EQUITY: Equal pay for equal work, regardless of gender, ethnicity, age, or other protected characteristics
2. COMPETITIVENESS: Market-competitive compensation to attract and retain top talent
3. PERFORMANCE: Merit-based increases and bonuses tied to individual and company performance
4. TRANSPARENCY: Open communication about pay structures, ranges, and progression opportunities
5. TOTAL REWARDS: Comprehensive benefits package that supports employee wellbeing and financial security

We regularly review our compensation practices through external benchmarking and internal pay equity analyses to ensure we maintain these principles."
                              rows={12}
                              readOnly
                              className="bg-muted"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Regulatory Compliance and Reporting</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Alert>
                              <AlertDescription>
                                All remuneration practices comply with Irish employment law and EU regulations on pay transparency and equality.
                              </AlertDescription>
                            </Alert>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium">Gender Pay Gap Report</Label>
                                <div className="flex items-center gap-2">
                                  <Badge variant="default">✓ Filed</Badge>
                                  <span className="text-sm text-muted-foreground">Due: March 2024</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-medium">Equal Pay Audit</Label>
                                <div className="flex items-center gap-2">
                                  <Badge variant="default">✓ Complete</Badge>
                                  <span className="text-sm text-muted-foreground">Next: March 2025</span>
                                </div>
                              </div>
                            </div>
                          </div>
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
            <Button>Save Remuneration Data</Button>
            <Button variant="outline">Generate Pay Equity Report</Button>
            <Button variant="outline">Export Compensation Analysis</Button>
            <Button variant="outline">Schedule Review</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}