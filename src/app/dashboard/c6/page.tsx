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
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Shield, FileText, Users, Phone, AlertCircle, CheckCircle } from "lucide-react"

export default function C6Page() {
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
                <BreadcrumbPage>C6: Human Rights Policies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Human rights policies
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Implementation Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground">
                  Fully implemented
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grievance Channels</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Reporting mechanisms
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Coverage</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">
                  Employees trained
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Human Rights Policies Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Human Rights Policy Framework and Implementation</CardTitle>
              <CardDescription>
                Comprehensive human rights policy framework with implementation monitoring and effective grievance mechanisms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="policies" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="policies">Policy Framework</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                  <TabsTrigger value="grievance">Grievance Mechanism</TabsTrigger>
                </TabsList>

                {/* Policy Framework Tab */}
                <TabsContent value="policies" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Human Rights Policy Existence Framework</CardTitle>
                      <CardDescription>
                        Comprehensive policy framework covering all key human rights areas with implementation status
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="core-policies">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-blue-500" />
                              Core Human Rights Policies
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Policy Status Overview</h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Update Policy Status</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Update Human Rights Policy</DialogTitle>
                                      <DialogDescription>
                                        Update the status and details of a human rights policy
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="policy-type">Policy Type</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select policy" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="child-labor">Child Labor Policy</SelectItem>
                                              <SelectItem value="forced-labor">Forced Labor Policy</SelectItem>
                                              <SelectItem value="human-trafficking">Human Trafficking Policy</SelectItem>
                                              <SelectItem value="discrimination">Non-Discrimination Policy</SelectItem>
                                              <SelectItem value="workplace-safety">Workplace Safety Policy</SelectItem>
                                              <SelectItem value="freedom-association">Freedom of Association Policy</SelectItem>
                                              <SelectItem value="fair-wages">Fair Wages Policy</SelectItem>
                                              <SelectItem value="privacy-rights">Privacy Rights Policy</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="policy-status">Policy Status</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="fully-implemented">Fully Implemented</SelectItem>
                                              <SelectItem value="partial-implementation">Partial Implementation</SelectItem>
                                              <SelectItem value="under-development">Under Development</SelectItem>
                                              <SelectItem value="planned">Planned</SelectItem>
                                              <SelectItem value="not-applicable">Not Applicable</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="last-review">Last Review Date</Label>
                                          <Input
                                            id="last-review"
                                            type="date"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="next-review">Next Review Date</Label>
                                          <Input
                                            id="next-review"
                                            type="date"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="coverage-scope">Coverage Scope</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select scope" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="all-operations">All Operations</SelectItem>
                                              <SelectItem value="direct-employees">Direct Employees Only</SelectItem>
                                              <SelectItem value="including-contractors">Including Contractors</SelectItem>
                                              <SelectItem value="value-chain">Entire Value Chain</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="implementation-level">Implementation Level (%)</Label>
                                          <Input
                                            id="implementation-level"
                                            type="number"
                                            placeholder="0-100"
                                            min="0"
                                            max="100"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="policy-description">Policy Description and Key Measures</Label>
                                        <Textarea
                                          id="policy-description"
                                          placeholder="Describe the policy framework, key measures, and implementation approach..."
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">Update Policy Status</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Labor Rights Policies</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={true} />
                                        <span className="text-sm">Child Labor Policy</span>
                                      </div>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={true} />
                                        <span className="text-sm">Forced Labor Policy</span>
                                      </div>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={true} />
                                        <span className="text-sm">Human Trafficking Policy</span>
                                      </div>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={true} />
                                        <span className="text-sm">Freedom of Association</span>
                                      </div>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Workplace Rights Policies</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={true} />
                                        <span className="text-sm">Non-Discrimination Policy</span>
                                      </div>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={true} />
                                        <span className="text-sm">Workplace Safety Policy</span>
                                      </div>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={true} />
                                        <span className="text-sm">Fair Wages Policy</span>
                                      </div>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Switch checked={false} />
                                        <span className="text-sm">Privacy Rights Policy</span>
                                      </div>
                                      <Badge variant="secondary">In Development</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Policy Area</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Coverage Scope</TableHead>
                                    <TableHead>Last Review</TableHead>
                                    <TableHead>Implementation %</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Child Labor Prevention</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>Entire Value Chain</TableCell>
                                    <TableCell>Jan 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">100%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Forced Labor Prevention</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>Including Contractors</TableCell>
                                    <TableCell>Feb 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">100%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Non-Discrimination</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>All Operations</TableCell>
                                    <TableCell>Mar 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">98%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Workplace Safety</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>All Operations</TableCell>
                                    <TableCell>Jan 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">95%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="additional-policies">
                          <AccordionTrigger>Additional Human Rights Specifications</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="additional-policies">Other Human Rights Policies</Label>
                                <Textarea
                                  id="additional-policies"
                                  defaultValue="Our comprehensive human rights framework includes additional policies addressing:
• Indigenous Rights and Land Rights (relevant for agricultural operations)
• Community Relations and Free, Prior, and Informed Consent
• Environmental Rights and Right to Clean Environment  
• Cultural Rights and Heritage Protection
• Access to Water and Food Security Rights
• Workers' Right to Collective Bargaining and Union Representation
• Supplier and Contractor Human Rights Standards
• Customer and Consumer Rights Protection"
                                  rows={8}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Community Rights</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Community Consultation</span>
                                      <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Land Rights Respect</span>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Cultural Heritage Protection</span>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Environmental Justice</span>
                                      <Badge variant="secondary">Developing</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Value Chain Rights</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Supplier Standards</span>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Contractor Requirements</span>
                                      <Badge variant="default">Enforced</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Customer Rights</span>
                                      <Badge variant="default">Protected</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Due Diligence Process</span>
                                      <Badge variant="default">Active</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="policy-development">
                          <AccordionTrigger>Policy Development and Review Process</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="development-process">Policy Development Methodology</Label>
                                <Textarea
                                  id="development-process"
                                  defaultValue="Our human rights policy development follows international standards including the UN Guiding Principles on Business and Human Rights, ILO Core Conventions, and Universal Declaration of Human Rights. Policies are developed through stakeholder consultation, risk assessment, legal review, and board approval. Regular updates ensure alignment with evolving standards and operational changes."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Review Schedule</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Annual Policy Review</span>
                                      <Badge variant="default">Scheduled</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Risk Assessment Integration</span>
                                      <Badge variant="default">Ongoing</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Stakeholder Feedback</span>
                                      <Badge variant="secondary">Quarterly</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Legal Compliance Check</span>
                                      <Badge variant="default">Bi-annual</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Stakeholder Involvement</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Employee Consultation</span>
                                      <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Union Engagement</span>
                                      <Badge variant="default">Regular</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Community Input</span>
                                      <Badge variant="secondary">Periodic</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">NGO Collaboration</span>
                                      <Badge variant="secondary">As needed</Badge>
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

                {/* Implementation Tab */}
                <TabsContent value="implementation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Policy Implementation and Communication</CardTitle>
                      <CardDescription>
                        Comprehensive implementation framework including training, communication, and capacity building
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Implementation Progress</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Policy Communication (100%)</Label>
                                  <span className="text-sm font-medium">All employees</span>
                                </div>
                                <Progress value={100} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Training Completion (98%)</Label>
                                  <span className="text-sm font-medium">115/117 employees</span>
                                </div>
                                <Progress value={98} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Supplier Integration (85%)</Label>
                                  <span className="text-sm font-medium">34/40 suppliers</span>
                                </div>
                                <Progress value={85} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Procedure Documentation (92%)</Label>
                                  <span className="text-sm font-medium">23/25 procedures</span>
                                </div>
                                <Progress value={92} className="w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Training and Awareness</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">General HR Training</span>
                                <Badge variant="default">117 completed</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Management Training</span>
                                <Badge variant="default">25 completed</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Specialized Training</span>
                                <Badge variant="secondary">15 completed</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Refresher Training</span>
                                <Badge variant="secondary">Annual</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Supplier Training</span>
                                <Badge variant="secondary">34 suppliers</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="training-programs">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Training Programs and Capacity Building
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Training Program</TableHead>
                                    <TableHead>Target Audience</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Completion Rate</TableHead>
                                    <TableHead>Effectiveness Score</TableHead>
                                    <TableHead>Next Session</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Human Rights Fundamentals</TableCell>
                                    <TableCell>All Employees</TableCell>
                                    <TableCell>4 hours</TableCell>
                                    <TableCell>
                                      <Badge variant="default">98%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">9.1/10</Badge>
                                    </TableCell>
                                    <TableCell>Mar 2025</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Management Responsibilities</TableCell>
                                    <TableCell>Management</TableCell>
                                    <TableCell>8 hours</TableCell>
                                    <TableCell>
                                      <Badge variant="default">100%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.8/10</Badge>
                                    </TableCell>
                                    <TableCell>Jun 2025</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Grievance Handling</TableCell>
                                    <TableCell>HR & Management</TableCell>
                                    <TableCell>6 hours</TableCell>
                                    <TableCell>
                                      <Badge variant="default">100%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">9.3/10</Badge>
                                    </TableCell>
                                    <TableCell>Apr 2025</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Supplier Requirements</TableCell>
                                    <TableCell>Procurement Team</TableCell>
                                    <TableCell>3 hours</TableCell>
                                    <TableCell>
                                      <Badge variant="default">100%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">8.5/10</Badge>
                                    </TableCell>
                                    <TableCell>May 2025</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="communication-strategy">
                          <AccordionTrigger>Communication and Awareness Strategy</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="communication-approach">Communication Strategy</Label>
                                <Textarea
                                  id="communication-approach"
                                  defaultValue="Multi-channel communication approach ensuring all stakeholders understand their human rights responsibilities and protections. Regular updates through company communications, intranet postings, team meetings, and training sessions. Clear, accessible language used in all communications with translations available as needed. Visual aids and infographics used to enhance understanding."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Internal Communication Channels</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Employee Handbook</span>
                                      <Badge variant="default">Updated</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Company Intranet</span>
                                      <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Team Meetings</span>
                                      <Badge variant="default">Monthly</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Notice Boards</span>
                                      <Badge variant="default">Updated</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Email Communications</span>
                                      <Badge variant="secondary">As needed</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">External Communication</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Supplier Communications</span>
                                      <Badge variant="default">Quarterly</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Community Outreach</span>
                                      <Badge variant="secondary">Bi-annual</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Website Publication</span>
                                      <Badge variant="default">Current</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Customer Information</span>
                                      <Badge variant="secondary">On request</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Regulatory Reporting</span>
                                      <Badge variant="default">Compliant</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="capacity-building">
                          <AccordionTrigger>Organizational Capacity Building</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="capacity-strategy">Capacity Building Strategy</Label>
                                <Textarea
                                  id="capacity-strategy"
                                  defaultValue="Systematic approach to building internal capacity for human rights management. Focus on developing expertise in HR team, management leadership, and operational implementation. Regular skills assessment, targeted training programs, and external expert engagement. Knowledge management systems to capture and share learning across the organization."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Leadership Development</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Executive training on human rights governance</div>
                                      <div>• Management accountability frameworks</div>
                                      <div>• Leadership skills for inclusive culture</div>
                                      <div>• Strategic human rights planning</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Operational Capacity</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• HR team specialization</div>
                                      <div>• Grievance handling procedures</div>
                                      <div>• Risk assessment capabilities</div>
                                      <div>• Monitoring and evaluation systems</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">External Support</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Legal expert consultations</div>
                                      <div>• NGO partnership programs</div>
                                      <div>• Industry best practice sharing</div>
                                      <div>• Professional development opportunities</div>
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

                {/* Monitoring Tab */}
                <TabsContent value="monitoring" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Implementation Monitoring and Compliance</CardTitle>
                      <CardDescription>
                        Regular monitoring procedures, compliance assessments, and continuous improvement processes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Monitoring Framework</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Regular Policy Reviews</span>
                                <Badge variant="default">Annual</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Compliance Audits</span>
                                <Badge variant="default">Bi-annual</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Employee Surveys</span>
                                <Badge variant="secondary">Annual</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Supplier Assessments</span>
                                <Badge variant="default">Ongoing</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Grievance Tracking</span>
                                <Badge variant="default">Real-time</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Performance Indicators</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Zero Tolerance Violations</span>
                                <Badge variant="default">0 incidents</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Training Completion Rate</span>
                                <Badge variant="default">98%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Employee Awareness Score</span>
                                <Badge variant="default">8.7/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Grievance Resolution Time</span>
                                <Badge variant="default">&lt; 30 days</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Supplier Compliance Rate</span>
                                <Badge variant="secondary">85%</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Regular Monitoring Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Monitoring Activity</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Responsible Party</TableHead>
                                <TableHead>Last Completed</TableHead>
                                <TableHead>Next Due</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Policy Effectiveness Review</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>HR Director</TableCell>
                                <TableCell>Jan 2024</TableCell>
                                <TableCell>Jan 2025</TableCell>
                                <TableCell>
                                  <Badge variant="default">On Schedule</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Compliance Audit</TableCell>
                                <TableCell>Bi-annual</TableCell>
                                <TableCell>External Auditor</TableCell>
                                <TableCell>Jul 2024</TableCell>
                                <TableCell>Jan 2025</TableCell>
                                <TableCell>
                                  <Badge variant="default">Scheduled</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Employee Survey</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>HR Team</TableCell>
                                <TableCell>Nov 2024</TableCell>
                                <TableCell>Nov 2025</TableCell>
                                <TableCell>
                                  <Badge variant="default">Complete</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Supplier Assessment</TableCell>
                                <TableCell>Ongoing</TableCell>
                                <TableCell>Procurement</TableCell>
                                <TableCell>Dec 2024</TableCell>
                                <TableCell>Q1 2025</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">In Progress</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Training Effectiveness</TableCell>
                                <TableCell>Quarterly</TableCell>
                                <TableCell>L&D Team</TableCell>
                                <TableCell>Dec 2024</TableCell>
                                <TableCell>Mar 2025</TableCell>
                                <TableCell>
                                  <Badge variant="default">Current</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Continuous Improvement Process</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="improvement-approach">Continuous Improvement Framework</Label>
                            <Textarea
                              id="improvement-approach"
                              defaultValue="Systematic approach to continuous improvement based on monitoring results, stakeholder feedback, and emerging best practices. Regular review cycles identify areas for enhancement, policy updates, and procedural improvements. Integration of lessons learned from incidents, external assessments, and industry developments. Action planning with clear timelines and accountability."
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="recent-improvements">Recent Improvements Implemented</Label>
                            <Textarea
                              id="recent-improvements"
                              defaultValue="• Enhanced grievance mechanism with additional anonymous reporting channels
• Updated training materials with interactive elements and case studies
• Strengthened supplier assessment process with on-site evaluations
• Improved policy communication with multilingual materials
• Expanded monitoring to include contractor and temporary worker assessment
• Integration of human rights considerations into business decision-making processes"
                              rows={6}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Grievance Mechanism Tab */}
                <TabsContent value="grievance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Grievance Mechanism and Complaints Handling</CardTitle>
                      <CardDescription>
                        Comprehensive grievance mechanism with multiple reporting channels and effective resolution processes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Reporting Channels</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Anonymous Hotline</span>
                                <Badge variant="default">24/7 Available</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Email Reporting</span>
                                <Badge variant="default">Active</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Online Portal</span>
                                <Badge variant="default">Secure</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">In-Person Reporting</span>
                                <Badge variant="default">Available</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Written Complaints</span>
                                <Badge variant="secondary">Traditional</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Resolution Performance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Average Resolution Time</span>
                                <Badge variant="default">18 days</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Resolution Rate</span>
                                <Badge variant="default">95%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Satisfaction Score</span>
                                <Badge variant="default">8.3/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Retaliation Incidents</span>
                                <Badge variant="default">0</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Repeat Complaints</span>
                                <Badge variant="secondary">5%</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="reporting-procedures">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Reporting Procedures and Channels
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="reporting-procedures">Reporting Procedure Overview</Label>
                                <Textarea
                                  id="reporting-procedures"
                                  defaultValue="Multiple confidential and anonymous reporting channels available to all stakeholders. Clear procedures for submitting complaints with protection against retaliation. Accessible reporting methods accommodate different comfort levels and circumstances. Regular communication about availability and use of grievance mechanisms. Training provided to all employees on how to report concerns."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Reporting Channel</TableHead>
                                    <TableHead>Accessibility</TableHead>
                                    <TableHead>Anonymity Level</TableHead>
                                    <TableHead>Response Time</TableHead>
                                    <TableHead>Best Used For</TableHead>
                                    <TableHead>Usage Rate</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Anonymous Hotline</TableCell>
                                    <TableCell>24/7</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Full Anonymity</Badge>
                                    </TableCell>
                                    <TableCell>24 hours</TableCell>
                                    <TableCell>Sensitive issues</TableCell>
                                    <TableCell>
                                      <Badge variant="default">35%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Secure Email</TableCell>
                                    <TableCell>Always</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Confidential</Badge>
                                    </TableCell>
                                    <TableCell>48 hours</TableCell>
                                    <TableCell>Detailed complaints</TableCell>
                                    <TableCell>
                                      <Badge variant="default">40%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Online Portal</TableCell>
                                    <TableCell>Always</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Anonymous Option</Badge>
                                    </TableCell>
                                    <TableCell>72 hours</TableCell>
                                    <TableCell>All complaint types</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">15%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Direct Supervisor</TableCell>
                                    <TableCell>Business hours</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Identified</Badge>
                                    </TableCell>
                                    <TableCell>Immediate</TableCell>
                                    <TableCell>Workplace issues</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">8%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">HR Department</TableCell>
                                    <TableCell>Business hours</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Confidential</Badge>
                                    </TableCell>
                                    <TableCell>24 hours</TableCell>
                                    <TableCell>HR-related issues</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">2%</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="investigation-process">
                          <AccordionTrigger>Investigation and Resolution Process</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="investigation-process">Investigation Methodology</Label>
                                <Textarea
                                  id="investigation-process"
                                  defaultValue="Structured investigation process ensuring fairness, confidentiality, and thoroughness. Trained investigators handle all complaints with appropriate expertise and impartiality. Clear timelines for investigation steps with regular communication to complainants. Documentation maintained throughout process while protecting confidentiality. Independent review for serious allegations."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Initial Response</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Acknowledgment within 24-48 hours</div>
                                      <div>• Initial assessment and classification</div>
                                      <div>• Assignment to appropriate investigator</div>
                                      <div>• Protection measures if needed</div>
                                      <div>• Timeline communication</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Investigation Phase</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Evidence gathering and documentation</div>
                                      <div>• Interviews with relevant parties</div>
                                      <div>• Review of policies and procedures</div>
                                      <div>• Expert consultation if needed</div>
                                      <div>• Interim measures implementation</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Resolution & Follow-up</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Findings determination and documentation</div>
                                      <div>• Corrective action implementation</div>
                                      <div>• Communication with complainant</div>
                                      <div>• Monitoring for retaliation</div>
                                      <div>• System improvement recommendations</div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="grievance-tracking">
                          <AccordionTrigger>Grievance Tracking and Analysis</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Complaint Category</TableHead>
                                    <TableHead>2024 Cases</TableHead>
                                    <TableHead>Resolved</TableHead>
                                    <TableHead>Avg Resolution Time</TableHead>
                                    <TableHead>Satisfaction Rate</TableHead>
                                    <TableHead>Trend</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Workplace Harassment</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>15 days</TableCell>
                                    <TableCell>
                                      <Badge variant="default">9.0/10</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Stable</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Discrimination</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>22 days</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">7.5/10</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Improving</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Safety Concerns</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>8 days</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.7/10</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Stable</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Working Conditions</TableCell>
                                    <TableCell>4</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>12 days</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.2/10</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Decreasing</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Other HR Issues</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>10 days</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.5/10</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Stable</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>

                              <div className="space-y-2">
                                <Label htmlFor="trend-analysis">Grievance Trend Analysis</Label>
                                <Textarea
                                  id="trend-analysis"
                                  defaultValue="Overall grievance levels remain low with effective resolution processes. Most common issues relate to working conditions and safety, reflecting our commitment to maintaining high standards. Quick resolution times for safety issues demonstrate prioritization of employee wellbeing. High satisfaction rates indicate effective grievance handling. Continuous monitoring identifies opportunities for preventive measures."
                                  rows={4}
                                />
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
            <Button>Save Policy Data</Button>
            <Button variant="outline">Generate HR Report</Button>
            <Button variant="outline">Update Training Records</Button>
            <Button variant="outline">Export Compliance Report</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}