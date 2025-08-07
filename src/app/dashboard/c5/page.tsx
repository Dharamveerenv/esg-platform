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
import { Users, UserCheck, GraduationCap, TrendingUp, Crown, Award } from "lucide-react"

export default function C5Page() {
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
                <BreadcrumbPage>C5: Additional Workforce Characteristics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Management Diversity</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38%</div>
                <p className="text-xs text-muted-foreground">
                  Female management
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Extended Workforce</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  Non-employee workers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leadership Pipeline</CardTitle>
                <Crown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  Positions with successors
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Development Programs</CardTitle>
                <GraduationCap className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Active programs
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Workforce Characteristics Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Workforce Characteristics and Development</CardTitle>
              <CardDescription>
                Management diversity analysis, extended workforce tracking, and comprehensive leadership development programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="diversity" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="diversity">Management Diversity</TabsTrigger>
                  <TabsTrigger value="extended">Extended Workforce</TabsTrigger>
                  <TabsTrigger value="leadership">Leadership Development</TabsTrigger>
                  <TabsTrigger value="programs">Development Programs</TabsTrigger>
                </TabsList>

                {/* Management Diversity Tab */}
                <TabsContent value="diversity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Management Diversity Analysis</CardTitle>
                      <CardDescription>
                        Comprehensive analysis of management diversity across all levels with targets and action plans
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="gender-diversity">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Gender Diversity by Management Level
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Management Level Breakdown</h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Update Management Data</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Update Management Demographics</DialogTitle>
                                      <DialogDescription>
                                        Update management diversity data by level and category
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="management-level">Management Level</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="executive">Executive/C-Suite</SelectItem>
                                              <SelectItem value="senior">Senior Management</SelectItem>
                                              <SelectItem value="middle">Middle Management</SelectItem>
                                              <SelectItem value="junior">Junior Management</SelectItem>
                                              <SelectItem value="supervisory">Supervisory</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="reporting-period">Reporting Period</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="2024-q4">Q4 2024</SelectItem>
                                              <SelectItem value="2024-q3">Q3 2024</SelectItem>
                                              <SelectItem value="2024-q2">Q2 2024</SelectItem>
                                              <SelectItem value="2024-q1">Q1 2024</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="male-count">Male Managers</Label>
                                          <Input
                                            id="male-count"
                                            type="number"
                                            placeholder="Number of male managers"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="female-count">Female Managers</Label>
                                          <Input
                                            id="female-count"
                                            type="number"
                                            placeholder="Number of female managers"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="other-count">Other/Non-Binary</Label>
                                          <Input
                                            id="other-count"
                                            type="number"
                                            placeholder="Number (optional)"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="undisclosed-count">Prefer Not to Say</Label>
                                          <Input
                                            id="undisclosed-count"
                                            type="number"
                                            placeholder="Number (optional)"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="diversity-notes">Diversity Context and Notes</Label>
                                        <Textarea
                                          id="diversity-notes"
                                          placeholder="Additional context about diversity initiatives or changes..."
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">Update Management Data</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Management Level</TableHead>
                                    <TableHead>Male</TableHead>
                                    <TableHead>Female</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Female %</TableHead>
                                    <TableHead>Trend (YoY)</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Executive/C-Suite</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">33%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">+33%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Senior Management</TableCell>
                                    <TableCell>4</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>7</TableCell>
                                    <TableCell>
                                      <Badge variant="default">43%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">+14%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Middle Management</TableCell>
                                    <TableCell>8</TableCell>
                                    <TableCell>6</TableCell>
                                    <TableCell>14</TableCell>
                                    <TableCell>
                                      <Badge variant="default">43%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">+8%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Junior Management</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>9</TableCell>
                                    <TableCell>21</TableCell>
                                    <TableCell>
                                      <Badge variant="default">43%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">+5%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Supervisory</TableCell>
                                    <TableCell>18</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>30</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">40%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">+3%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="bg-muted/50">
                                    <TableCell className="font-bold">Total Management</TableCell>
                                    <TableCell className="font-bold">44</TableCell>
                                    <TableCell className="font-bold">31</TableCell>
                                    <TableCell className="font-bold">75</TableCell>
                                    <TableCell>
                                      <Badge variant="default" className="font-bold">41%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">+7%</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="diversity-targets">
                          <AccordionTrigger>Diversity Targets and Action Plans</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Diversity Targets Progress</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label className="text-sm">40% Female Management by 2026</Label>
                                          <span className="text-sm font-medium">41% achieved</span>
                                        </div>
                                        <Progress value={102} className="w-full" />
                                        <p className="text-xs text-green-600">Target exceeded - setting new 45% target</p>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label className="text-sm">35% Female Senior Management by 2025</Label>
                                          <span className="text-sm font-medium">43% achieved</span>
                                        </div>
                                        <Progress value={123} className="w-full" />
                                        <p className="text-xs text-green-600">Target exceeded ahead of schedule</p>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label className="text-sm">50% Female Leadership Pipeline by 2027</Label>
                                          <span className="text-sm font-medium">48% achieved</span>
                                        </div>
                                        <Progress value={96} className="w-full" />
                                        <p className="text-xs text-blue-600">On track for target achievement</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Diversity Initiatives</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Mentorship Program</span>
                                        <Badge variant="default">Active</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Leadership Development</span>
                                        <Badge variant="default">15 participants</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Unconscious Bias Training</span>
                                        <Badge variant="default">100% complete</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Flexible Work Arrangements</span>
                                        <Badge variant="default">85% uptake</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Diversity Council</span>
                                        <Badge variant="default">Established</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="diversity-strategy">Diversity and Inclusion Strategy</Label>
                                <Textarea
                                  id="diversity-strategy"
                                  defaultValue="Our comprehensive D&I strategy focuses on creating an inclusive culture where all employees can thrive. Key pillars include equitable recruitment practices, mentorship and sponsorship programs, leadership development initiatives specifically designed to advance underrepresented groups, and regular bias awareness training. We measure success through both quantitative metrics and qualitative employee feedback."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="other-diversity">
                          <AccordionTrigger>Additional Diversity Dimensions</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Age Diversity</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Under 30</span>
                                      <Badge variant="secondary">12%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">30-50</span>
                                      <Badge variant="default">68%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Over 50</span>
                                      <Badge variant="secondary">20%</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Educational Background</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Advanced Degrees</span>
                                      <Badge variant="default">45%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Bachelor&apos;s Degree</span>
                                      <Badge variant="default">40%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Professional Certification</span>
                                      <Badge variant="secondary">15%</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Tenure Distribution</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">0-2 years</span>
                                      <Badge variant="secondary">18%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">3-7 years</span>
                                      <Badge variant="default">45%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">8+ years</span>
                                      <Badge variant="default">37%</Badge>
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

                {/* Extended Workforce Tab */}
                <TabsContent value="extended" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Extended Workforce Tracking</CardTitle>
                      <CardDescription>
                        Comprehensive tracking of non-employee workers including contractors, consultants, and temporary workers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Extended Workforce Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Self-Employed Contractors</span>
                                <Badge variant="default">28</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Temporary Agency Workers</span>
                                <Badge variant="secondary">8</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Consultants</span>
                                <Badge variant="secondary">4</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Interns</span>
                                <Badge variant="outline">2</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Total Extended Workforce</span>
                                <Badge variant="default" className="font-bold">42</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Engagement Terms Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Short-term (&lt; 6 months)</span>
                                <Badge variant="secondary">45%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Medium-term (6-18 months)</span>
                                <Badge variant="default">35%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Long-term (&gt; 18 months)</span>
                                <Badge variant="default">20%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Average Engagement</span>
                                <Badge variant="secondary">8.5 months</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="contractor-tracking">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4" />
                              Self-Employed Contractor Management
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Active Contractors</h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Add Contractor</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Add New Contractor</DialogTitle>
                                      <DialogDescription>
                                        Register a new self-employed contractor with engagement details
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="contractor-name">Contractor Name</Label>
                                          <Input
                                            id="contractor-name"
                                            placeholder="Full name or company"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="contractor-type">Contractor Type</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="individual">Individual Contractor</SelectItem>
                                              <SelectItem value="company">Company/Firm</SelectItem>
                                              <SelectItem value="freelancer">Freelancer</SelectItem>
                                              <SelectItem value="specialist">Specialist Consultant</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="work-area">Work Area/Department</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select area" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="agriculture">Agriculture Operations</SelectItem>
                                              <SelectItem value="it">IT & Technology</SelectItem>
                                              <SelectItem value="marketing">Marketing & Sales</SelectItem>
                                              <SelectItem value="finance">Finance & Accounting</SelectItem>
                                              <SelectItem value="operations">Operations</SelectItem>
                                              <SelectItem value="maintenance">Maintenance</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="engagement-start">Engagement Start Date</Label>
                                          <Input
                                            id="engagement-start"
                                            type="date"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="contract-duration">Contract Duration (months)</Label>
                                          <Input
                                            id="contract-duration"
                                            type="number"
                                            placeholder="Expected duration"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="monthly-hours">Expected Monthly Hours</Label>
                                          <Input
                                            id="monthly-hours"
                                            type="number"
                                            placeholder="Average hours per month"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="work-description">Work Description and Scope</Label>
                                        <Textarea
                                          id="work-description"
                                          placeholder="Describe the work scope, deliverables, and key responsibilities..."
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">Add Contractor</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Contractor</TableHead>
                                    <TableHead>Work Area</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Hours/Month</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Green Tech Solutions Ltd</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">IT & Technology</Badge>
                                    </TableCell>
                                    <TableCell>Jan 2024</TableCell>
                                    <TableCell>12 months</TableCell>
                                    <TableCell>60</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">John Murphy</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Agriculture Operations</Badge>
                                    </TableCell>
                                    <TableCell>Mar 2024</TableCell>
                                    <TableCell>8 months</TableCell>
                                    <TableCell>80</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Marketing Plus Agency</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Marketing & Sales</Badge>
                                    </TableCell>
                                    <TableCell>Feb 2024</TableCell>
                                    <TableCell>6 months</TableCell>
                                    <TableCell>40</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Sarah O&apos;Connor</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Finance & Accounting</Badge>
                                    </TableCell>
                                    <TableCell>Nov 2023</TableCell>
                                    <TableCell>18 months</TableCell>
                                    <TableCell>35</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="temporary-workers">
                          <AccordionTrigger>Temporary Agency Worker Monitoring</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Agency Partners</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Manpower Ireland</span>
                                      <Badge variant="default">5 workers</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Adecco Solutions</span>
                                      <Badge variant="secondary">2 workers</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">CPL Resources</span>
                                      <Badge variant="secondary">1 worker</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Placement Areas</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Production Operations</span>
                                      <Badge variant="default">4 workers</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Packaging & Distribution</span>
                                      <Badge variant="secondary">3 workers</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Administrative Support</span>
                                      <Badge variant="outline">1 worker</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="temp-worker-policy">Temporary Worker Management Policy</Label>
                                <Textarea
                                  id="temp-worker-policy"
                                  defaultValue="All temporary agency workers receive the same health and safety training as permanent employees. Equal treatment principles apply to working conditions and access to facilities. Regular performance reviews ensure quality standards. Long-term temporary placements (>12 months) are reviewed for potential permanent positions."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="internship-programs">
                          <AccordionTrigger>Internship and Graduate Programs</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="internship-strategy">Internship Program Strategy</Label>
                                <Textarea
                                  id="internship-strategy"
                                  defaultValue="Our internship program focuses on providing meaningful work experience in sustainable agriculture and business operations. Programs range from 3-12 months and include mentorship, skills development, and potential career pathways. We partner with local universities and agricultural colleges to attract diverse talent."
                                  rows={3}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Program</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Current Participants</TableHead>
                                    <TableHead>University Partners</TableHead>
                                    <TableHead>Conversion Rate</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Agricultural Science Internship</TableCell>
                                    <TableCell>6 months</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>UCD, LYIT</TableCell>
                                    <TableCell>
                                      <Badge variant="default">60%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Business Operations Internship</TableCell>
                                    <TableCell>4 months</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>TCD, UL</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">40%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Graduate Trainee Program</TableCell>
                                    <TableCell>12 months</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>Multiple</TableCell>
                                    <TableCell>
                                      <Badge variant="default">80%</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Leadership Development Tab */}
                <TabsContent value="leadership" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Leadership Development Framework</CardTitle>
                      <CardDescription>
                        Comprehensive leadership development including succession planning, pipeline assessment, and development programs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Succession Planning Status</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Executive Positions (Ready Now)</Label>
                                  <span className="text-sm font-medium">100%</span>
                                </div>
                                <Progress value={100} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Senior Management (Ready 1-2 years)</Label>
                                  <span className="text-sm font-medium">85%</span>
                                </div>
                                <Progress value={85} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Middle Management (Ready 2-3 years)</Label>
                                  <span className="text-sm font-medium">72%</span>
                                </div>
                                <Progress value={72} className="w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Leadership Pipeline Strength</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">High Potential Employees</span>
                                <Badge variant="default">18</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Leadership Program Participants</span>
                                <Badge variant="default">15</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Cross-functional Assignments</span>
                                <Badge variant="secondary">12</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Internal Promotion Rate</span>
                                <Badge variant="default">78%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Leadership Retention Rate</span>
                                <Badge variant="default">92%</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="succession-planning">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Crown className="h-4 w-4" />
                              Succession Planning Documentation
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Current Holder</TableHead>
                                    <TableHead>Successor 1</TableHead>
                                    <TableHead>Successor 2</TableHead>
                                    <TableHead>Readiness</TableHead>
                                    <TableHead>Development Needed</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">CEO</TableCell>
                                    <TableCell>Current CEO</TableCell>
                                    <TableCell>CFO (Internal)</TableCell>
                                    <TableCell>Operations Director</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Ready Now</Badge>
                                    </TableCell>
                                    <TableCell>Strategic Leadership</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">CFO</TableCell>
                                    <TableCell>Current CFO</TableCell>
                                    <TableCell>Finance Manager</TableCell>
                                    <TableCell>External Candidate</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">1-2 years</Badge>
                                    </TableCell>
                                    <TableCell>Executive Leadership</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Operations Director</TableCell>
                                    <TableCell>Current Director</TableCell>
                                    <TableCell>Production Manager</TableCell>
                                    <TableCell>Quality Manager</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Ready Now</Badge>
                                    </TableCell>
                                    <TableCell>Strategic Planning</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Agriculture Manager</TableCell>
                                    <TableCell>Current Manager</TableCell>
                                    <TableCell>Senior Agronomist</TableCell>
                                    <TableCell>Farm Operations Lead</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">2-3 years</Badge>
                                    </TableCell>
                                    <TableCell>Management Skills</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="pipeline-assessment">
                          <AccordionTrigger>Leadership Pipeline Assessment</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="pipeline-methodology">Assessment Methodology</Label>
                                <Textarea
                                  id="pipeline-methodology"
                                  defaultValue="Our leadership pipeline assessment uses a competency-based framework evaluating technical skills, leadership potential, cultural fit, and growth mindset. Annual reviews include 360-degree feedback, performance metrics, and development goal progress. High-potential employees are identified through structured talent review processes."
                                  rows={3}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">High Potential Identification</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Performance Rating (Top 20%)</span>
                                      <Badge variant="default">18 employees</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Leadership Competency Score</span>
                                      <Badge variant="secondary">Avg 8.2/10</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Growth Potential Rating</span>
                                      <Badge variant="default">High: 15, Medium: 22</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Promotion Readiness</span>
                                      <Badge variant="default">12 within 2 years</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Development Priorities</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Strategic Thinking</span>
                                      <Badge variant="destructive">8 need development</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Change Management</span>
                                      <Badge variant="secondary">6 need development</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Digital Leadership</span>
                                      <Badge variant="destructive">10 need development</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Sustainability Leadership</span>
                                      <Badge variant="secondary">5 need development</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="diversity-leadership">
                          <AccordionTrigger>Diversity in Leadership Development</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="diversity-commitment">Diversity in Leadership Commitment</Label>
                                <Textarea
                                  id="diversity-commitment"
                                  defaultValue="We are committed to building a diverse leadership pipeline that reflects our workforce and communities. Our development programs actively identify and nurture diverse talent through mentorship, sponsorship, and targeted development opportunities. Special focus on removing barriers and creating inclusive pathways to leadership."
                                  rows={3}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Pipeline Diversity Metrics</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Female High Potentials</span>
                                      <Badge variant="default">48%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Under 35 High Potentials</span>
                                      <Badge variant="default">35%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Diverse Background Leaders</span>
                                      <Badge variant="secondary">28%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">International Experience</span>
                                      <Badge variant="secondary">22%</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Targeted Development Programs</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Women in Leadership Program</span>
                                      <Badge variant="default">8 participants</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Emerging Leaders Program</span>
                                      <Badge variant="default">12 participants</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Cross-Cultural Leadership</span>
                                      <Badge variant="secondary">6 participants</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Mentorship Matching</span>
                                      <Badge variant="default">15 pairs</Badge>
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

                {/* Development Programs Tab */}
                <TabsContent value="programs" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Comprehensive Development Programs</CardTitle>
                      <CardDescription>
                        Overview of all development programs, participation rates, and effectiveness metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Program Portfolio</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Leadership Development Programs</span>
                                <Badge variant="default">4 programs</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Technical Skills Training</span>
                                <Badge variant="default">8 programs</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Professional Certifications</span>
                                <Badge variant="secondary">6 programs</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Mentorship Programs</span>
                                <Badge variant="default">3 programs</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Cross-functional Projects</span>
                                <Badge variant="secondary">5 active</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Participation & Investment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Total Participants</span>
                                <Badge variant="default">89 employees</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Participation Rate</span>
                                <Badge variant="default">76%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Training Hours per Employee</span>
                                <Badge variant="default">42 hours</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Development Investment</span>
                                <Badge variant="secondary">€85,000</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">ROI Estimate</span>
                                <Badge variant="default">3.2:1</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Program Name</TableHead>
                            <TableHead>Target Audience</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Participants</TableHead>
                            <TableHead>Completion Rate</TableHead>
                            <TableHead>Effectiveness Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Executive Leadership Program</TableCell>
                            <TableCell>Senior Management</TableCell>
                            <TableCell>6 months</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>
                              <Badge variant="default">100%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">9.2/10</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Emerging Leaders Program</TableCell>
                            <TableCell>High Potentials</TableCell>
                            <TableCell>4 months</TableCell>
                            <TableCell>12</TableCell>
                            <TableCell>
                              <Badge variant="default">92%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">8.8/10</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Women in Leadership</TableCell>
                            <TableCell>Female Employees</TableCell>
                            <TableCell>3 months</TableCell>
                            <TableCell>8</TableCell>
                            <TableCell>
                              <Badge variant="default">100%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">9.1/10</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Sustainable Agriculture Certification</TableCell>
                            <TableCell>Agricultural Staff</TableCell>
                            <TableCell>2 months</TableCell>
                            <TableCell>18</TableCell>
                            <TableCell>
                              <Badge variant="secondary">85%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">8.3/10</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Digital Skills Bootcamp</TableCell>
                            <TableCell>All Employees</TableCell>
                            <TableCell>6 weeks</TableCell>
                            <TableCell>25</TableCell>
                            <TableCell>
                              <Badge variant="secondary">88%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">8.0/10</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Project Management Certification</TableCell>
                            <TableCell>Management Level</TableCell>
                            <TableCell>3 months</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>
                              <Badge variant="default">90%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">8.7/10</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Program Effectiveness and Impact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="impact-assessment">Development Impact Assessment</Label>
                            <Textarea
                              id="impact-assessment"
                              defaultValue="Our development programs demonstrate strong impact on employee engagement, retention, and performance. Participants show 25% higher promotion rates and 15% better performance ratings. Leadership programs have contributed to improved diversity metrics and stronger succession planning. Technical training programs have enhanced operational efficiency and sustainability performance."
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="future-plans">Future Development Planning</Label>
                            <Textarea
                              id="future-plans"
                              defaultValue="Planned expansions include digital leadership training, sustainability competency development, and international assignment programs. Focus on building capabilities in areas critical to our business strategy: climate adaptation, technology adoption, and stakeholder engagement. Investment in external partnerships with business schools and professional associations."
                              rows={4}
                            />
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
            <Button>Save Workforce Data</Button>
            <Button variant="outline">Generate Diversity Report</Button>
            <Button variant="outline">Update Leadership Pipeline</Button>
            <Button variant="outline">Export Development Plans</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}