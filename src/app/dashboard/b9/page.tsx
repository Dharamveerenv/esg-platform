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
import { Shield, AlertTriangle, TrendingDown, Heart, HardHat, CheckCircle } from "lucide-react"

export default function B9Page() {
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
                <BreadcrumbPage>B9: Workforce Health & Safety</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Work-Related Accidents</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  This year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fatalities</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Zero incidents
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">
                  Excellent rating
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">
                  All employees trained
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Health & Safety Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Workforce Health & Safety Management</CardTitle>
              <CardDescription>
                Track workplace accidents, fatalities, safety programs, and health management systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="accidents" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="accidents">Accidents</TabsTrigger>
                  <TabsTrigger value="fatalities">Fatalities</TabsTrigger>
                  <TabsTrigger value="safety-systems">Safety Systems</TabsTrigger>
                  <TabsTrigger value="health-programs">Health Programs</TabsTrigger>
                </TabsList>

                {/* Work-Related Accidents Tab */}
                <TabsContent value="accidents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Work-Related Accidents Tracker</CardTitle>
                      <CardDescription>
                        Record and manage workplace accidents, near misses, and safety incidents
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Incident Reporting</h4>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Report Incident</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Report Work-Related Incident</DialogTitle>
                              <DialogDescription>
                                Record details of workplace accident or safety incident
                              </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="incident-type">Incident Type</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="minor-injury">Minor Injury</SelectItem>
                                      <SelectItem value="major-injury">Major Injury</SelectItem>
                                      <SelectItem value="near-miss">Near Miss</SelectItem>
                                      <SelectItem value="property-damage">Property Damage</SelectItem>
                                      <SelectItem value="occupational-illness">Occupational Illness</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="incident-date">Incident Date</Label>
                                  <Input
                                    id="incident-date"
                                    type="date"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="employee-category">Employee Category</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="permanent">Permanent Employee</SelectItem>
                                      <SelectItem value="temporary">Temporary Worker</SelectItem>
                                      <SelectItem value="contractor">Contractor</SelectItem>
                                      <SelectItem value="visitor">Visitor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lost-time-days">Lost Time Days</Label>
                                  <Input
                                    id="lost-time-days"
                                    type="number"
                                    placeholder="Enter days lost"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="incident-description">Incident Description</Label>
                                <Textarea
                                  id="incident-description"
                                  placeholder="Detailed description of the incident..."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="corrective-actions">Corrective Actions Taken</Label>
                                <Textarea
                                  id="corrective-actions"
                                  placeholder="List corrective and preventive actions..."
                                />
                              </div>
                              <Button type="submit" className="w-full">Submit Incident Report</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Incident Type</TableHead>
                            <TableHead>Employee Category</TableHead>
                            <TableHead>Lost Time Days</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2024-01-15</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Minor Injury</Badge>
                            </TableCell>
                            <TableCell>Permanent Employee</TableCell>
                            <TableCell>2 days</TableCell>
                            <TableCell>
                              <Badge variant="outline">Low</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">Closed</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2024-03-22</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Near Miss</Badge>
                            </TableCell>
                            <TableCell>Contractor</TableCell>
                            <TableCell>0 days</TableCell>
                            <TableCell>
                              <Badge variant="outline">Medium</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">Under Investigation</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Accident Rate Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Lost Time Injury Rate (LTIR)</span>
                                  <span className="text-sm font-medium">3.3 per 100 FTE</span>
                                </div>
                                <Progress value={33} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Total Recordable Incident Rate</span>
                                  <span className="text-sm font-medium">4.9 per 100 FTE</span>
                                </div>
                                <Progress value={49} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Near Miss Reporting Rate</span>
                                  <span className="text-sm font-medium">12.1 per 100 FTE</span>
                                </div>
                                <Progress value={85} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Common Incident Types</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm">Slips, Trips, Falls</span>
                                <span className="text-sm font-medium">40%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Equipment-related</span>
                                <span className="text-sm font-medium">30%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Manual Handling</span>
                                <span className="text-sm font-medium">20%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Chemical Exposure</span>
                                <span className="text-sm font-medium">10%</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Fatalities Tab */}
                <TabsContent value="fatalities" className="space-y-4">
                  <Alert>
                    <Heart className="h-4 w-4" />
                    <AlertDescription>
                      Zero fatalities target maintained. All workplace fatalities require immediate investigation and regulatory reporting.
                    </AlertDescription>
                  </Alert>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Fatality Prevention and Tracking</CardTitle>
                      <CardDescription>
                        Monitor and prevent workplace fatalities through comprehensive safety measures
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-green-50 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <h4 className="font-medium text-green-800">Zero Fatalities Achievement</h4>
                        </div>
                        <p className="text-sm text-green-600 mt-2">
                          No workplace fatalities recorded in the current reporting period. This achievement reflects our commitment to employee safety.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">High-Risk Activity Monitoring</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Working at Height</span>
                                <Badge variant="default">Controlled</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Machinery Operation</span>
                                <Badge variant="default">Controlled</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Chemical Handling</span>
                                <Badge variant="default">Controlled</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Confined Space Work</span>
                                <Badge variant="outline">Not Applicable</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Emergency Response Readiness</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">First Aid Trained Staff</span>
                                <Badge variant="default">15 persons</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Emergency Drills (Annual)</span>
                                <Badge variant="default">4 completed</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Defibrillator Units</span>
                                <Badge variant="default">2 units</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Emergency Contact System</span>
                                <Badge variant="default">Operational</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Fatality Prevention Measures</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <Label htmlFor="prevention-measures">Implemented Prevention Strategies</Label>
                              <Textarea
                                id="prevention-measures"
                                defaultValue="1. Comprehensive safety training for all employees
2. Regular equipment maintenance and safety inspections
3. Mandatory personal protective equipment (PPE) usage
4. Lock-out/tag-out procedures for equipment maintenance
5. Job safety analysis for high-risk activities
6. Incident reporting and investigation procedures
7. Regular safety audits and compliance checks"
                                rows={8}
                                readOnly
                                className="bg-muted"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Safety Systems Tab */}
                <TabsContent value="safety-systems" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Health and Safety Management System</CardTitle>
                      <CardDescription>
                        Comprehensive safety management framework and compliance tracking
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="management-system">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <HardHat className="h-4 w-4" />
                              Safety Management System Framework
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="safety-policy">Safety Policy Status</Label>
                                  <Select defaultValue="implemented">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="implemented">Fully Implemented</SelectItem>
                                      <SelectItem value="reviewed">Under Review</SelectItem>
                                      <SelectItem value="updating">Being Updated</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="iso-certification">ISO 45001 Certification</Label>
                                  <Select defaultValue="certified">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="certified">Certified</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="safety-objectives">Current Safety Objectives</Label>
                                <Textarea
                                  id="safety-objectives"
                                  placeholder="List key safety objectives and targets..."
                                  defaultValue="1. Maintain zero fatalities target
2. Reduce lost-time injuries by 15%
3. Achieve 100% safety training completion
4. Implement behavioral safety program
5. Enhance near-miss reporting culture"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="training-programs">
                          <AccordionTrigger>Safety Training and Competency Programs</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Training Program</TableHead>
                                    <TableHead>Target Audience</TableHead>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead>Completion Rate</TableHead>
                                    <TableHead>Next Due</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>General Safety Induction</TableCell>
                                    <TableCell>All Employees</TableCell>
                                    <TableCell>Upon Hiring</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={100} className="w-16" />
                                        <span className="text-sm">100%</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>Ongoing</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Equipment Safety Training</TableCell>
                                    <TableCell>Operators</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={95} className="w-16" />
                                        <span className="text-sm">95%</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>Mar 2024</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>First Aid Training</TableCell>
                                    <TableCell>Designated Staff</TableCell>
                                    <TableCell>3 Years</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={88} className="w-16" />
                                        <span className="text-sm">88%</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>Jun 2024</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Chemical Safety</TableCell>
                                    <TableCell>Lab Staff</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={100} className="w-16" />
                                        <span className="text-sm">100%</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>Complete</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="safety-committees">
                          <AccordionTrigger>Safety Committees and Worker Participation</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Safety Committee Composition</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm">Management Representatives</span>
                                        <span className="text-sm font-medium">3 members</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm">Worker Representatives</span>
                                        <span className="text-sm font-medium">4 members</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm">Safety Officer</span>
                                        <span className="text-sm font-medium">1 member</span>
                                      </div>
                                      <Separator />
                                      <div className="flex justify-between font-medium">
                                        <span className="text-sm">Total Committee Size</span>
                                        <span className="text-sm">8 members</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Committee Activities</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Monthly Meetings</span>
                                        <Badge variant="default">Regular</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Safety Inspections</span>
                                        <Badge variant="default">Quarterly</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Incident Reviews</span>
                                        <Badge variant="default">As Required</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Policy Updates</span>
                                        <Badge variant="secondary">Annual</Badge>
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

                {/* Health Programs Tab */}
                <TabsContent value="health-programs" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Employee Health and Wellness Programs</CardTitle>
                      <CardDescription>
                        Comprehensive health monitoring and wellness initiatives for workforce
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Health Surveillance Programs</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Annual Health Assessments</span>
                                <Badge variant="default">Active</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Occupational Health Screening</span>
                                <Badge variant="default">Implemented</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Mental Health Support</span>
                                <Badge variant="default">Available</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Ergonomic Assessments</span>
                                <Badge variant="secondary">Planned</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Wellness Initiative Participation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Health Assessment Participation</span>
                                  <span className="text-sm font-medium">89%</span>
                                </div>
                                <Progress value={89} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Wellness Program Enrollment</span>
                                  <span className="text-sm font-medium">72%</span>
                                </div>
                                <Progress value={72} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Mental Health Resource Usage</span>
                                  <span className="text-sm font-medium">15%</span>
                                </div>
                                <Progress value={15} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Occupational Health Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Health Metric</TableHead>
                                <TableHead>Current Value</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Trend</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Occupational Illness Rate</TableCell>
                                <TableCell>0.8 per 100 FTE</TableCell>
                                <TableCell>&lt; 1.0</TableCell>
                                <TableCell>
                                  <TrendingDown className="h-4 w-4 text-green-500" />
                                </TableCell>
                                <TableCell>
                                  <Badge variant="default">On Target</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Stress-Related Absences</TableCell>
                                <TableCell>2.1%</TableCell>
                                <TableCell>&lt; 3.0%</TableCell>
                                <TableCell>
                                  <TrendingDown className="h-4 w-4 text-green-500" />
                                </TableCell>
                                <TableCell>
                                  <Badge variant="default">Good</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Return to Work Rate</TableCell>
                                <TableCell>95%</TableCell>
                                <TableCell>&gt; 90%</TableCell>
                                <TableCell>
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </TableCell>
                                <TableCell>
                                  <Badge variant="default">Excellent</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Health Promotion Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <Label htmlFor="health-activities">Current Health Promotion Programs</Label>
                              <Textarea
                                id="health-activities"
                                defaultValue="1. On-site fitness facilities and subsidized gym memberships
2. Nutrition education and healthy eating programs
3. Smoking cessation support and resources
4. Mental health awareness workshops and counseling services
5. Ergonomic workstation assessments and improvements
6. Regular health screenings and vaccination programs
7. Stress management and mindfulness training
8. Work-life balance initiatives and flexible working arrangements"
                                rows={8}
                                readOnly
                                className="bg-muted"
                              />
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
            <Button>Save Health & Safety Data</Button>
            <Button variant="outline">Generate Safety Report</Button>
            <Button variant="outline">Schedule Training</Button>
            <Button variant="outline">Export Metrics</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}