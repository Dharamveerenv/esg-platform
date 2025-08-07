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
import { Shield, AlertCircle, FileText, Eye, CheckCircle, Scale } from "lucide-react"

export default function B11Page() {
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
                <BreadcrumbPage>B11: Corruption & Bribery</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Corruption Incidents</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Zero tolerance maintained
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">
                  All employees trained
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Whistleblower Reports</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Both resolved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Policy Compliance</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">
                  Full compliance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Anti-Corruption Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Anti-Corruption and Ethics Management</CardTitle>
              <CardDescription>
                Track corruption prevention measures, ethics training, reporting mechanisms, and compliance monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="incidents" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="incidents">Incidents</TabsTrigger>
                  <TabsTrigger value="policies">Policies</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                </TabsList>

                {/* Corruption Incidents Tab */}
                <TabsContent value="incidents" className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Zero corruption incidents reported. This reflects our strong ethical culture and effective prevention measures.
                    </AlertDescription>
                  </Alert>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Corruption and Bribery Incident Tracker</CardTitle>
                      <CardDescription>
                        Monitor and investigate any reports of corruption, bribery, or unethical behavior
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
                              <DialogTitle>Report Ethics/Corruption Incident</DialogTitle>
                              <DialogDescription>
                                Report suspected corruption, bribery, or unethical behavior
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
                                      <SelectItem value="bribery">Bribery</SelectItem>
                                      <SelectItem value="corruption">Corruption</SelectItem>
                                      <SelectItem value="kickbacks">Kickbacks</SelectItem>
                                      <SelectItem value="conflicts-interest">Conflicts of Interest</SelectItem>
                                      <SelectItem value="fraud">Fraud</SelectItem>
                                      <SelectItem value="embezzlement">Embezzlement</SelectItem>
                                      <SelectItem value="other">Other Unethical Behavior</SelectItem>
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
                                  <Label htmlFor="reporting-method">Reporting Method</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="How reported" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="whistleblower-hotline">Whistleblower Hotline</SelectItem>
                                      <SelectItem value="direct-supervisor">Direct Supervisor</SelectItem>
                                      <SelectItem value="hr-department">HR Department</SelectItem>
                                      <SelectItem value="ethics-officer">Ethics Officer</SelectItem>
                                      <SelectItem value="anonymous-email">Anonymous Email</SelectItem>
                                      <SelectItem value="external-audit">External Audit</SelectItem>
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
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="critical">Critical</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                                <Label htmlFor="involved-parties">Involved Parties</Label>
                                <Textarea
                                  id="involved-parties"
                                  placeholder="List individuals or entities involved..."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="evidence">Evidence/Documentation</Label>
                                <Textarea
                                  id="evidence"
                                  placeholder="Describe any evidence or supporting documentation..."
                                />
                              </div>
                              <Button type="submit" className="w-full">Submit Incident Report</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="bg-green-50 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <h4 className="font-medium text-green-800">Zero Corruption Achievement</h4>
                        </div>
                        <p className="text-sm text-green-600 mt-2">
                          No corruption or bribery incidents have been confirmed in the current reporting period. This demonstrates the effectiveness of our prevention and detection systems.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Historical Incident Trends</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Year</TableHead>
                                  <TableHead>Reports</TableHead>
                                  <TableHead>Confirmed</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>2024</TableCell>
                                  <TableCell>2</TableCell>
                                  <TableCell>0</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Clean</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>2023</TableCell>
                                  <TableCell>1</TableCell>
                                  <TableCell>0</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Clean</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>2022</TableCell>
                                  <TableCell>0</TableCell>
                                  <TableCell>0</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Clean</Badge>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Risk Assessment Results</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Overall Corruption Risk</span>
                                  <span className="text-sm font-medium">Low</span>
                                </div>
                                <Progress value={15} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Bribery Risk</span>
                                  <span className="text-sm font-medium">Very Low</span>
                                </div>
                                <Progress value={8} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Third Party Risk</span>
                                  <span className="text-sm font-medium">Low</span>
                                </div>
                                <Progress value={12} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Policies Tab */}
                <TabsContent value="policies" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Anti-Corruption Policies and Procedures</CardTitle>
                      <CardDescription>
                        Comprehensive policy framework for preventing corruption and maintaining ethical standards
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="anti-corruption-policy">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Scale className="h-4 w-4" />
                              Anti-Corruption and Bribery Policy
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="policy-version">Policy Version</Label>
                                  <Input
                                    id="policy-version"
                                    defaultValue="v3.2"
                                    readOnly
                                    className="bg-muted"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="last-review">Last Review Date</Label>
                                  <Input
                                    id="last-review"
                                    type="date"
                                    defaultValue="2024-01-15"
                                    readOnly
                                    className="bg-muted"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="next-review">Next Review Due</Label>
                                  <Input
                                    id="next-review"
                                    type="date"
                                    defaultValue="2025-01-15"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="approval-status">Approval Status</Label>
                                  <Select defaultValue="approved">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="approved">Board Approved</SelectItem>
                                      <SelectItem value="pending">Pending Approval</SelectItem>
                                      <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="policy-scope">Policy Scope and Coverage</Label>
                                <Textarea
                                  id="policy-scope"
                                  defaultValue="This policy applies to all employees, directors, contractors, consultants, and business partners of the company. It covers all forms of corruption and bribery including facilitation payments, kickbacks, and conflicts of interest. The policy extends to all business activities, transactions, and relationships worldwide."
                                  readOnly
                                  className="bg-muted"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="code-of-conduct">
                          <AccordionTrigger>Code of Conduct and Ethics</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="ethics-principles">Core Ethical Principles</Label>
                                <Textarea
                                  id="ethics-principles"
                                  defaultValue="1. INTEGRITY: Act honestly and transparently in all business dealings
2. ACCOUNTABILITY: Take responsibility for actions and decisions
3. RESPECT: Treat all stakeholders with dignity and fairness
4. COMPLIANCE: Adhere to all applicable laws and regulations
5. TRANSPARENCY: Maintain open and honest communication
6. STEWARDSHIP: Protect company resources and reputation"
                                  readOnly
                                  className="bg-muted"
                                  rows={6}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm">Employee Acknowledgment Rate</Label>
                                  <div className="flex items-center gap-2">
                                    <Progress value={100} className="flex-1" />
                                    <span className="text-sm font-medium">100%</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Annual Refresher Training</Label>
                                  <Badge variant="default">✓ Completed</Badge>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="gift-hospitality">
                          <AccordionTrigger>Gifts and Hospitality Policy</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="gift-threshold">Acceptable Gift Threshold (€)</Label>
                                  <Input
                                    id="gift-threshold"
                                    type="number"
                                    defaultValue="50"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="hospitality-threshold">Hospitality Threshold (€)</Label>
                                  <Input
                                    id="hospitality-threshold"
                                    type="number"
                                    defaultValue="100"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="approval-process">Approval Process</Label>
                                <Textarea
                                  id="approval-process"
                                  defaultValue="• Gifts under €50: No approval required, but must be reported
• Gifts €50-€200: Line manager approval required
• Gifts over €200: Ethics committee approval required
• All gifts must be appropriate and not influence business decisions
• Cash gifts are strictly prohibited regardless of amount"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="third-party-due-diligence">
                          <AccordionTrigger>Third Party Due Diligence</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Third Party Type</TableHead>
                                    <TableHead>Due Diligence Level</TableHead>
                                    <TableHead>Review Frequency</TableHead>
                                    <TableHead>Approval Required</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Major Suppliers (&gt;€50k)</TableCell>
                                    <TableCell>Enhanced</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>Ethics Committee</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Distributors/Agents</TableCell>
                                    <TableCell>Enhanced</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>Senior Management</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Standard Suppliers</TableCell>
                                    <TableCell>Standard</TableCell>
                                    <TableCell>Bi-annual</TableCell>
                                    <TableCell>Procurement</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Consultants</TableCell>
                                    <TableCell>Standard</TableCell>
                                    <TableCell>Per Engagement</TableCell>
                                    <TableCell>Department Head</TableCell>
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

                {/* Training Tab */}
                <TabsContent value="training" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Anti-Corruption Training and Awareness</CardTitle>
                      <CardDescription>
                        Comprehensive training program to ensure all personnel understand anti-corruption requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Training Program Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">New Employee Induction</span>
                                <Badge variant="default">✓ Mandatory</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Annual Refresher Training</span>
                                <Badge variant="default">✓ 100% Complete</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Manager Specific Training</span>
                                <Badge variant="default">✓ Completed</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">High-Risk Role Training</span>
                                <Badge variant="default">✓ Targeted</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Training Completion Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Overall Completion Rate</span>
                                  <span className="text-sm font-medium">100%</span>
                                </div>
                                <Progress value={100} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">Management Level</span>
                                  <span className="text-sm font-medium">100%</span>
                                </div>
                                <Progress value={100} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-sm">High-Risk Roles</span>
                                  <span className="text-sm font-medium">100%</span>
                                </div>
                                <Progress value={100} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Training Module</TableHead>
                            <TableHead>Target Audience</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Completion Rate</TableHead>
                            <TableHead>Next Due</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Anti-Corruption Fundamentals</TableCell>
                            <TableCell>All Employees</TableCell>
                            <TableCell>2 hours</TableCell>
                            <TableCell>Annual</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={100} className="w-16" />
                                <span className="text-sm">100%</span>
                              </div>
                            </TableCell>
                            <TableCell>Jan 2025</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Gifts & Hospitality Guidelines</TableCell>
                            <TableCell>All Employees</TableCell>
                            <TableCell>1 hour</TableCell>
                            <TableCell>Annual</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={100} className="w-16" />
                                <span className="text-sm">100%</span>
                              </div>
                            </TableCell>
                            <TableCell>Jan 2025</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Third Party Due Diligence</TableCell>
                            <TableCell>Procurement & Sales</TableCell>
                            <TableCell>1.5 hours</TableCell>
                            <TableCell>Annual</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={100} className="w-16" />
                                <span className="text-sm">100%</span>
                              </div>
                            </TableCell>
                            <TableCell>Feb 2025</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Whistleblowing Procedures</TableCell>
                            <TableCell>All Employees</TableCell>
                            <TableCell>30 minutes</TableCell>
                            <TableCell>Bi-annual</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={98} className="w-16" />
                                <span className="text-sm">98%</span>
                              </div>
                            </TableCell>
                            <TableCell>Jul 2024</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Training Effectiveness Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold">4.7</div>
                                <div className="text-sm text-muted-foreground">Average Training Score</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">96%</div>
                                <div className="text-sm text-muted-foreground">Knowledge Retention</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">100%</div>
                                <div className="text-sm text-muted-foreground">Certification Rate</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Monitoring Tab */}
                <TabsContent value="monitoring" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Compliance Monitoring and Reporting</CardTitle>
                      <CardDescription>
                        Ongoing monitoring systems and reporting mechanisms to ensure continued compliance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Whistleblowing System</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Anonymous Reporting Hotline</span>
                                <Badge variant="default">✓ Active 24/7</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Online Reporting Portal</span>
                                <Badge variant="default">✓ Available</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Third-Party Investigation</span>
                                <Badge variant="default">✓ Independent</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Whistleblower Protection</span>
                                <Badge variant="default">✓ Guaranteed</Badge>
                              </div>
                              <Separator />
                              <div className="text-center">
                                <div className="text-lg font-bold">2</div>
                                <div className="text-sm text-muted-foreground">Reports Received (2024)</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Internal Audit Program</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Last Ethics Audit</span>
                                <span className="text-sm font-medium">Mar 2024</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Audit Frequency</span>
                                <span className="text-sm font-medium">Annual</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">External Auditor</span>
                                <Badge variant="outline">Independent Firm</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Audit Results</span>
                                <Badge variant="default">Clean Opinion</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Next Audit Due</span>
                                <span className="text-sm font-medium">Mar 2025</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Compliance Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-medium">Key Performance Indicators</h4>
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-sm">Policy Compliance Rate</span>
                                    <span className="text-sm font-medium">100%</span>
                                  </div>
                                  <Progress value={100} className="h-2" />
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-sm">Training Completion Rate</span>
                                    <span className="text-sm font-medium">100%</span>
                                  </div>
                                  <Progress value={100} className="h-2" />
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-sm">Incident Resolution Rate</span>
                                    <span className="text-sm font-medium">100%</span>
                                  </div>
                                  <Progress value={100} className="h-2" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-medium">Risk Indicators</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">High-Risk Transactions Monitored</span>
                                  <Badge variant="secondary">58 reviewed</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Third Party Risk Assessments</span>
                                  <Badge variant="default">24 completed</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Conflict of Interest Declarations</span>
                                  <Badge variant="default">61 received</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Gift/Hospitality Registrations</span>
                                  <Badge variant="secondary">12 logged</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Regulatory Compliance Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Alert>
                              <AlertDescription>
                                All anti-corruption measures comply with Irish Criminal Justice Act, UK Bribery Act, and international best practices.
                              </AlertDescription>
                            </Alert>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Regulation/Standard</TableHead>
                                  <TableHead>Compliance Status</TableHead>
                                  <TableHead>Last Assessment</TableHead>
                                  <TableHead>Next Review</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Irish Criminal Justice Act</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Compliant</Badge>
                                  </TableCell>
                                  <TableCell>Jan 2024</TableCell>
                                  <TableCell>Jan 2025</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>UK Bribery Act 2010</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Compliant</Badge>
                                  </TableCell>
                                  <TableCell>Jan 2024</TableCell>
                                  <TableCell>Jan 2025</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>ISO 37001 (Anti-bribery)</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Implementing</Badge>
                                  </TableCell>
                                  <TableCell>Dec 2023</TableCell>
                                  <TableCell>Jun 2024</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
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
            <Button>Save Compliance Data</Button>
            <Button variant="outline">Generate Ethics Report</Button>
            <Button variant="outline">Schedule Audit</Button>
            <Button variant="outline">Export Compliance Metrics</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}