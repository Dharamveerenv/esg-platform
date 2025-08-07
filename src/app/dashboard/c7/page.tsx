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
import { AlertTriangle, FileSearch, Users, Link, Calendar, CheckCircle } from "lucide-react"

export default function C7Page() {
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
                <BreadcrumbPage>C7: Human Rights Incidents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Reported in 2024
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  100% resolution rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  Days average
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Value Chain Issues</CardTitle>
                <Link className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  Supplier incident
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Human Rights Incidents Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Human Rights Incident Tracking and Management</CardTitle>
              <CardDescription>
                Comprehensive incident tracking, action management, and value chain monitoring for human rights violations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="incidents" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="incidents">Incident Tracking</TabsTrigger>
                  <TabsTrigger value="actions">Action Management</TabsTrigger>
                  <TabsTrigger value="value-chain">Value Chain Incidents</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics & Prevention</TabsTrigger>
                </TabsList>

                {/* Incident Tracking Tab */}
                <TabsContent value="incidents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Human Rights Incident Tracking Interface</CardTitle>
                      <CardDescription>
                        Comprehensive incident documentation with classification, impact assessment, and stakeholder identification
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Incident Registry</h4>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Report New Incident</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Report Human Rights Incident</DialogTitle>
                              <DialogDescription>
                                Document a new human rights incident with detailed information for investigation and resolution
                              </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="incident-type">Incident Type</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select incident type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="discrimination">Discrimination</SelectItem>
                                      <SelectItem value="harassment">Harassment</SelectItem>
                                      <SelectItem value="forced-labor">Forced Labor</SelectItem>
                                      <SelectItem value="child-labor">Child Labor</SelectItem>
                                      <SelectItem value="unsafe-conditions">Unsafe Working Conditions</SelectItem>
                                      <SelectItem value="freedom-association">Freedom of Association Violation</SelectItem>
                                      <SelectItem value="privacy-violation">Privacy Rights Violation</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="severity-level">Severity Level</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select severity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low Impact</SelectItem>
                                      <SelectItem value="medium">Medium Impact</SelectItem>
                                      <SelectItem value="high">High Impact</SelectItem>
                                      <SelectItem value="critical">Critical Impact</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="incident-date">Date of Incident</Label>
                                  <Input
                                    id="incident-date"
                                    type="date"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="incident-location">Location</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="main-facility">Main Production Facility</SelectItem>
                                      <SelectItem value="farm-operations">Farm Operations</SelectItem>
                                      <SelectItem value="distribution-center">Distribution Center</SelectItem>
                                      <SelectItem value="headquarters">Headquarters</SelectItem>
                                      <SelectItem value="supplier-site">Supplier Site</SelectItem>
                                      <SelectItem value="contractor-site">Contractor Site</SelectItem>
                                      <SelectItem value="other">Other Location</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="affected-parties">Number of Affected Parties</Label>
                                  <Input
                                    id="affected-parties"
                                    type="number"
                                    placeholder="Number of people affected"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="reporting-source">Reporting Source</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="How was this reported?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="employee-report">Employee Report</SelectItem>
                                      <SelectItem value="anonymous-hotline">Anonymous Hotline</SelectItem>
                                      <SelectItem value="management-observation">Management Observation</SelectItem>
                                      <SelectItem value="audit-finding">Audit Finding</SelectItem>
                                      <SelectItem value="external-complaint">External Complaint</SelectItem>
                                      <SelectItem value="regulatory-report">Regulatory Report</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="incident-description">Incident Description</Label>
                                <Textarea
                                  id="incident-description"
                                  placeholder="Provide detailed description of the incident, circumstances, and immediate actions taken..."
                                  rows={4}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="stakeholder-impact">Stakeholder Impact Assessment</Label>
                                <Textarea
                                  id="stakeholder-impact"
                                  placeholder="Describe the impact on affected stakeholders, including employees, communities, customers, or other parties..."
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="root-cause">Root Cause Analysis</Label>
                                <Textarea
                                  id="root-cause"
                                  placeholder="Initial assessment of underlying causes, system failures, or contributing factors..."
                                  rows={3}
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
                            <TableHead>Incident ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Affected Parties</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">HR-2024-001</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Discrimination</Badge>
                            </TableCell>
                            <TableCell>Feb 15, 2024</TableCell>
                            <TableCell>Main Facility</TableCell>
                            <TableCell>
                              <Badge variant="default">Medium</Badge>
                            </TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>
                              <Badge variant="default">Resolved</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">HR-2024-002</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Unsafe Conditions</Badge>
                            </TableCell>
                            <TableCell>May 22, 2024</TableCell>
                            <TableCell>Farm Operations</TableCell>
                            <TableCell>
                              <Badge variant="destructive">High</Badge>
                            </TableCell>
                            <TableCell>8</TableCell>
                            <TableCell>
                              <Badge variant="default">Resolved</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">HR-2024-003</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Harassment</Badge>
                            </TableCell>
                            <TableCell>Aug 10, 2024</TableCell>
                            <TableCell>Distribution Center</TableCell>
                            <TableCell>
                              <Badge variant="default">Medium</Badge>
                            </TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>
                              <Badge variant="default">Resolved</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="classification-system">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <FileSearch className="h-4 w-4" />
                              Incident Classification System
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Incident Categories</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Labor Rights Violations</span>
                                      <Badge variant="secondary">2 incidents</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Workplace Safety Issues</span>
                                      <Badge variant="secondary">1 incident</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Discrimination Cases</span>
                                      <Badge variant="outline">0 incidents</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Freedom of Association</span>
                                      <Badge variant="outline">0 incidents</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Severity Distribution</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Critical Impact</span>
                                      <Badge variant="outline">0 incidents</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">High Impact</span>
                                      <Badge variant="destructive">1 incident</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Medium Impact</span>
                                      <Badge variant="default">2 incidents</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Low Impact</span>
                                      <Badge variant="outline">0 incidents</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="classification-methodology">Classification Methodology</Label>
                                <Textarea
                                  id="classification-methodology"
                                  defaultValue="Incidents are classified based on international human rights standards, severity of impact, and number of affected stakeholders. Classification considers both immediate harm and potential for systemic issues. Severity levels guide response protocols and resource allocation. Regular review ensures classification consistency and effectiveness of response measures."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="impact-assessment">
                          <AccordionTrigger>Stakeholder Impact Assessment Framework</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="impact-methodology">Impact Assessment Methodology</Label>
                                <Textarea
                                  id="impact-methodology"
                                  defaultValue="Comprehensive stakeholder impact assessment evaluating immediate harm, long-term consequences, and ripple effects across the organization and community. Assessment considers physical, psychological, economic, and reputational impacts. Stakeholder voices are central to impact evaluation. Gender, age, and vulnerability factors are specifically considered in impact analysis."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Stakeholder Group</TableHead>
                                    <TableHead>Impact Types Assessed</TableHead>
                                    <TableHead>Assessment Method</TableHead>
                                    <TableHead>Response Priority</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Direct Victims</TableCell>
                                    <TableCell>Physical, psychological, economic</TableCell>
                                    <TableCell>Individual interviews, medical assessment</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Immediate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Employee Witnesses</TableCell>
                                    <TableCell>Psychological, workplace climate</TableCell>
                                    <TableCell>Confidential surveys, group sessions</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Work Teams</TableCell>
                                    <TableCell>Morale, productivity, trust</TableCell>
                                    <TableCell>Team meetings, manager assessment</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Local Community</TableCell>
                                    <TableCell>Reputation, economic, social</TableCell>
                                    <TableCell>Community consultation, media analysis</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
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

                {/* Action Management Tab */}
                <TabsContent value="actions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Action Management and Response</CardTitle>
                      <CardDescription>
                        Systematic action planning, implementation tracking, and effectiveness evaluation for incident response
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Action Implementation Status</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Immediate Actions (100%)</Label>
                                  <span className="text-sm font-medium">15/15 actions</span>
                                </div>
                                <Progress value={100} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Corrective Actions (92%)</Label>
                                  <span className="text-sm font-medium">11/12 actions</span>
                                </div>
                                <Progress value={92} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Preventive Actions (75%)</Label>
                                  <span className="text-sm font-medium">9/12 actions</span>
                                </div>
                                <Progress value={75} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">System Improvements (67%)</Label>
                                  <span className="text-sm font-medium">6/9 actions</span>
                                </div>
                                <Progress value={67} className="w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Response Effectiveness</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Victim Satisfaction Score</span>
                                <Badge variant="default">8.5/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Stakeholder Confidence</span>
                                <Badge variant="default">High</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Recurrence Prevention</span>
                                <Badge variant="default">100%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">System Strengthening</span>
                                <Badge variant="secondary">In Progress</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Cultural Change Impact</span>
                                <Badge variant="secondary">Measurable</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="action-planning">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Action Planning and Implementation
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Incident</TableHead>
                                    <TableHead>Action Type</TableHead>
                                    <TableHead>Action Description</TableHead>
                                    <TableHead>Responsible Party</TableHead>
                                    <TableHead>Target Date</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">HR-2024-001</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Immediate</Badge>
                                    </TableCell>
                                    <TableCell>Separate parties, provide support</TableCell>
                                    <TableCell>HR Manager</TableCell>
                                    <TableCell>Feb 16, 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Complete</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">HR-2024-001</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Corrective</Badge>
                                    </TableCell>
                                    <TableCell>Disciplinary action, training</TableCell>
                                    <TableCell>HR Director</TableCell>
                                    <TableCell>Mar 1, 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Complete</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">HR-2024-002</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Immediate</Badge>
                                    </TableCell>
                                    <TableCell>Stop unsafe work, secure area</TableCell>
                                    <TableCell>Safety Manager</TableCell>
                                    <TableCell>May 22, 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Complete</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">HR-2024-002</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Corrective</Badge>
                                    </TableCell>
                                    <TableCell>Equipment repair, procedure update</TableCell>
                                    <TableCell>Operations Manager</TableCell>
                                    <TableCell>Jun 15, 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Complete</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">HR-2024-003</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Preventive</Badge>
                                    </TableCell>
                                    <TableCell>Enhanced supervision, policy review</TableCell>
                                    <TableCell>HR Team</TableCell>
                                    <TableCell>Sep 30, 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">In Progress</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="responsible-parties">
                          <AccordionTrigger>Responsible Party Assignment</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="responsibility-framework">Responsibility Assignment Framework</Label>
                                <Textarea
                                  id="responsibility-framework"
                                  defaultValue="Clear assignment of responsibilities based on incident type, severity, and required expertise. Primary responsibility assigned to most appropriate manager or department head. Support teams identified for specialized needs. Executive oversight for high-impact incidents. Regular review of assignment effectiveness and appropriate authority levels."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Primary Responsibility Assignment</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">HR Director</span>
                                      <Badge variant="default">5 actions</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Safety Manager</span>
                                      <Badge variant="default">3 actions</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Operations Manager</span>
                                      <Badge variant="secondary">2 actions</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Legal Counsel</span>
                                      <Badge variant="secondary">1 action</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Support Team Involvement</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Employee Assistance Program</span>
                                      <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">External Legal Support</span>
                                      <Badge variant="secondary">As Needed</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Training Team</span>
                                      <Badge variant="default">Engaged</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Communications Team</span>
                                      <Badge variant="secondary">On Standby</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="progress-monitoring">
                          <AccordionTrigger>Progress Monitoring and Milestones</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="monitoring-approach">Monitoring Methodology</Label>
                                <Textarea
                                  id="monitoring-approach"
                                  defaultValue="Systematic monitoring of action implementation with regular milestone reviews. Weekly progress updates for active cases, monthly comprehensive reviews for all incidents. Key performance indicators track both quantitative and qualitative outcomes. Stakeholder feedback incorporated into effectiveness assessment. Continuous adjustment of actions based on monitoring results."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Immediate Actions</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Victim safety and support</div>
                                      <div>• Evidence preservation</div>
                                      <div>• Stakeholder notification</div>
                                      <div>• Initial investigation steps</div>
                                      <div>• Risk mitigation measures</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Corrective Actions</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Disciplinary measures</div>
                                      <div>• Process corrections</div>
                                      <div>• Training implementation</div>
                                      <div>• Policy updates</div>
                                      <div>• System strengthening</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Preventive Measures</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Culture change initiatives</div>
                                      <div>• Enhanced monitoring</div>
                                      <div>• Awareness campaigns</div>
                                      <div>• Structural improvements</div>
                                      <div>• Best practice sharing</div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="effectiveness-evaluation">
                          <AccordionTrigger>Effectiveness Evaluation</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="evaluation-criteria">Effectiveness Evaluation Criteria</Label>
                                <Textarea
                                  id="evaluation-criteria"
                                  defaultValue="Multi-dimensional evaluation considering victim satisfaction, stakeholder confidence, recurrence prevention, and system strengthening. Quantitative metrics include resolution time, cost effectiveness, and compliance indicators. Qualitative assessment covers cultural impact, relationship repair, and trust rebuilding. Long-term monitoring tracks sustained improvement and prevention effectiveness."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Evaluation Dimension</TableHead>
                                    <TableHead>Metrics</TableHead>
                                    <TableHead>Current Performance</TableHead>
                                    <TableHead>Target</TableHead>
                                    <TableHead>Trend</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Victim Satisfaction</TableCell>
                                    <TableCell>Survey scores, feedback quality</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.5/10</Badge>
                                    </TableCell>
                                    <TableCell>8.0/10</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Improving</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Resolution Timeliness</TableCell>
                                    <TableCell>Days to resolution</TableCell>
                                    <TableCell>
                                      <Badge variant="default">18 days</Badge>
                                    </TableCell>
                                    <TableCell>21 days</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Improving</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Recurrence Prevention</TableCell>
                                    <TableCell>Repeat incident rate</TableCell>
                                    <TableCell>
                                      <Badge variant="default">0%</Badge>
                                    </TableCell>
                                    <TableCell>&lt; 5%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">System Strengthening</TableCell>
                                    <TableCell>Policy/process improvements</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">7 improvements</Badge>
                                    </TableCell>
                                    <TableCell>5 improvements</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Exceeding</Badge>
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

                {/* Value Chain Incidents Tab */}
                <TabsContent value="value-chain" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Value Chain Incident Tracking</CardTitle>
                      <CardDescription>
                        Monitoring and management of human rights incidents across suppliers, contractors, and business partners
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Value Chain Coverage</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Tier 1 Suppliers</span>
                                <Badge variant="default">40 monitored</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Key Contractors</span>
                                <Badge variant="default">15 monitored</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Tier 2 Suppliers</span>
                                <Badge variant="secondary">12 monitored</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Distribution Partners</span>
                                <Badge variant="secondary">8 monitored</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Service Providers</span>
                                <Badge variant="outline">5 monitored</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Incident Response Performance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Supplier Incidents Reported</span>
                                <Badge variant="secondary">1 in 2024</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Resolution Rate</span>
                                <Badge variant="default">100%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Supplier Cooperation</span>
                                <Badge variant="default">Excellent</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Relationship Maintained</span>
                                <Badge variant="default">Yes</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">System Improvements</span>
                                <Badge variant="default">3 implemented</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="supplier-incidents">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Link className="h-4 w-4" />
                              Supplier Incident Reporting
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Supplier</TableHead>
                                    <TableHead>Incident Type</TableHead>
                                    <TableHead>Date Reported</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>Our Response</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Relationship Impact</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Agricultural Supplies Co.</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Overtime Violations</Badge>
                                    </TableCell>
                                    <TableCell>Jun 15, 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>Audit + Action Plan</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Resolved</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Strengthened</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>

                              <div className="space-y-2">
                                <Label htmlFor="supplier-response">Supplier Incident Response Protocol</Label>
                                <Textarea
                                  id="supplier-response"
                                  defaultValue="Immediate engagement with supplier to understand incident scope and impact. Joint investigation and corrective action planning. Support provided for capacity building and system improvement. Monitoring intensified during recovery period. Relationship preservation prioritized while ensuring compliance with human rights standards."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="customer-complaints">
                          <AccordionTrigger>Customer Complaint Integration</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="customer-integration">Customer Complaint Integration Strategy</Label>
                                <Textarea
                                  id="customer-integration"
                                  defaultValue="Customer complaints related to human rights are integrated into our incident management system. Regular review of customer feedback for human rights implications. Proactive communication about our human rights commitments and performance. Customer concerns trigger internal reviews and potential value chain assessments."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Customer Feedback Channels</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Customer Service Portal</span>
                                      <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Social Media Monitoring</span>
                                      <Badge variant="default">24/7</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Retailer Feedback</span>
                                      <Badge variant="secondary">Quarterly</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Consumer Surveys</span>
                                      <Badge variant="secondary">Annual</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Response Metrics</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">HR-Related Complaints</span>
                                      <Badge variant="outline">0 in 2024</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Response Time</span>
                                      <Badge variant="default">&lt; 48 hours</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Customer Satisfaction</span>
                                      <Badge variant="default">95%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Follow-up Rate</span>
                                      <Badge variant="default">100%</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="third-party-monitoring">
                          <AccordionTrigger>Third-Party Incident Monitoring</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="monitoring-strategy">Third-Party Monitoring Strategy</Label>
                                <Textarea
                                  id="monitoring-strategy"
                                  defaultValue="Comprehensive monitoring system covering direct suppliers, subcontractors, and service providers. Regular audits, worker interviews, and community feedback collection. Collaboration with industry initiatives and NGOs for broader monitoring coverage. Technology-enabled monitoring including worker hotlines and mobile reporting systems."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Monitoring Methods</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• On-site audits and inspections</div>
                                      <div>• Worker interview programs</div>
                                      <div>• Community feedback sessions</div>
                                      <div>• Anonymous reporting hotlines</div>
                                      <div>• Digital monitoring platforms</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Monitoring Frequency</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• High-risk suppliers: Quarterly</div>
                                      <div>• Standard suppliers: Bi-annual</div>
                                      <div>• New suppliers: Within 90 days</div>
                                      <div>• Post-incident: Monthly for 6 months</div>
                                      <div>• Unannounced visits: 20% of audits</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Systemic Issue Identification</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Pattern analysis across incidents</div>
                                      <div>• Industry trend monitoring</div>
                                      <div>• Root cause investigation</div>
                                      <div>• Sector-wide collaboration</div>
                                      <div>• Preventive system design</div>
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

                {/* Analytics & Prevention Tab */}
                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Analytics and Prevention Framework</CardTitle>
                      <CardDescription>
                        Data-driven analysis for pattern identification, root cause analysis, and systematic prevention strategies
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Incident Analytics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Total Incidents (2024)</span>
                                <Badge variant="secondary">3</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Trend vs 2023</span>
                                <Badge variant="default">-40%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Most Common Type</span>
                                <Badge variant="secondary">Safety Issues</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Prevention Success Rate</span>
                                <Badge variant="default">100%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">System Improvement Rate</span>
                                <Badge variant="default">95%</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Prevention Effectiveness</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Training Impact Score</span>
                                <Badge variant="default">8.9/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Culture Change Index</span>
                                <Badge variant="default">85%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Early Warning System</span>
                                <Badge variant="default">Operational</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Risk Assessment Accuracy</span>
                                <Badge variant="default">92%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Stakeholder Confidence</span>
                                <Badge variant="default">High</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Trend Analysis and Pattern Recognition</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="trend-analysis">Multi-Year Trend Analysis</Label>
                            <Textarea
                              id="trend-analysis"
                              defaultValue="Positive trend with 40% reduction in incidents compared to 2023. Shift from reactive to proactive management evident in prevention success rates. Improved reporting culture leading to earlier detection and intervention. System improvements showing sustained effectiveness in preventing recurrence. Value chain incidents remain minimal due to strong supplier engagement."
                              rows={4}
                            />
                          </div>

                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Total Incidents</TableHead>
                                <TableHead>Severity Distribution</TableHead>
                                <TableHead>Resolution Time</TableHead>
                                <TableHead>Prevention Rate</TableHead>
                                <TableHead>System Improvements</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">2024</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>High: 1, Medium: 2</TableCell>
                                <TableCell>18 days</TableCell>
                                <TableCell>100%</TableCell>
                                <TableCell>7</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">2023</TableCell>
                                <TableCell>5</TableCell>
                                <TableCell>High: 2, Medium: 3</TableCell>
                                <TableCell>25 days</TableCell>
                                <TableCell>80%</TableCell>
                                <TableCell>5</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">2022</TableCell>
                                <TableCell>7</TableCell>
                                <TableCell>High: 3, Medium: 4</TableCell>
                                <TableCell>32 days</TableCell>
                                <TableCell>65%</TableCell>
                                <TableCell>3</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Prevention Strategy and Future Planning</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="prevention-strategy">Comprehensive Prevention Strategy</Label>
                            <Textarea
                              id="prevention-strategy"
                              defaultValue="Multi-layered prevention approach combining proactive risk assessment, cultural transformation, systems strengthening, and stakeholder engagement. Focus on creating positive workplace culture where human rights are respected and protected. Investment in early warning systems, enhanced monitoring, and continuous improvement. Strong partnership with suppliers and contractors for value chain protection."
                              rows={4}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="future-initiatives">Planned Prevention Initiatives</Label>
                            <Textarea
                              id="future-initiatives"
                              defaultValue="2025 initiatives include enhanced digital monitoring systems, expanded worker voice programs, strengthened supplier capability building, and integration of AI-powered risk prediction. Focus on youth engagement and next-generation leadership in human rights protection. Community partnership programs to address broader human rights challenges in our operating areas."
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
            <Button>Save Incident Data</Button>
            <Button variant="outline">Generate Incident Report</Button>
            <Button variant="outline">Update Action Plans</Button>
            <Button variant="outline">Export Analytics</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}