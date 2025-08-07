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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar } from "@/components/ui/calendar"
import { FileText, Users, Shield, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function C2Page() {
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
                <BreadcrumbPage>C2: Enhanced Practices Description</BreadcrumbPage>
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
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  Comprehensive framework
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Implementation Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">
                  Fully implemented
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Senior Responsibility</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Executive owners
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Governance Score</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">A+</div>
                <p className="text-xs text-muted-foreground">
                  Excellent rating
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Practices Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Practices and Policy Framework</CardTitle>
              <CardDescription>
                Detailed policy documentation, senior responsibility assignment, and governance integration for comprehensive ESG practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="policies" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="policies">Policy Framework</TabsTrigger>
                  <TabsTrigger value="responsibility">Senior Responsibility</TabsTrigger>
                  <TabsTrigger value="governance">Governance Integration</TabsTrigger>
                </TabsList>

                {/* Detailed Policy Framework Tab */}
                <TabsContent value="policies" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Detailed Policy Framework</CardTitle>
                      <CardDescription>
                        Comprehensive policy development, documentation, and effectiveness assessment across all sustainability areas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="environmental-policies">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              Environmental Policies
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Policy Area</TableHead>
                                    <TableHead>Current Version</TableHead>
                                    <TableHead>Last Review</TableHead>
                                    <TableHead>Next Review</TableHead>
                                    <TableHead>Effectiveness Score</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Climate Change Policy</TableCell>
                                    <TableCell>v3.1</TableCell>
                                    <TableCell>Jan 2024</TableCell>
                                    <TableCell>Jan 2025</TableCell>
                                    <TableCell>
                                      <Badge variant="default">95%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Pollution Prevention Policy</TableCell>
                                    <TableCell>v2.3</TableCell>
                                    <TableCell>Mar 2024</TableCell>
                                    <TableCell>Mar 2025</TableCell>
                                    <TableCell>
                                      <Badge variant="default">88%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Water Management Policy</TableCell>
                                    <TableCell>v1.8</TableCell>
                                    <TableCell>Feb 2024</TableCell>
                                    <TableCell>Feb 2025</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">78%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Under Review</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Biodiversity Policy</TableCell>
                                    <TableCell>v2.1</TableCell>
                                    <TableCell>Jan 2024</TableCell>
                                    <TableCell>Jan 2025</TableCell>
                                    <TableCell>
                                      <Badge variant="default">92%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Circular Economy Policy</TableCell>
                                    <TableCell>v1.5</TableCell>
                                    <TableCell>Apr 2024</TableCell>
                                    <TableCell>Apr 2025</TableCell>
                                    <TableCell>
                                      <Badge variant="default">85%</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Policy Development Process</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="policy-development">Policy Development Methodology</Label>
                                      <Textarea
                                        id="policy-development"
                                        defaultValue="Our policy development follows a systematic 6-stage process:
1. Stakeholder consultation and needs assessment
2. Best practice research and regulatory review
3. Draft policy development with cross-functional input
4. Internal review and impact assessment
5. Senior management approval and board ratification
6. Implementation planning with training and communication"
                                        rows={6}
                                        readOnly
                                        className="bg-muted"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="policy-timeline">Typical Development Timeline</Label>
                                        <Input
                                          id="policy-timeline"
                                          defaultValue="3-6 months per policy"
                                          readOnly
                                          className="bg-muted"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="review-cycle">Review Cycle</Label>
                                        <Input
                                          id="review-cycle"
                                          defaultValue="Annual review, 3-year major revision"
                                          readOnly
                                          className="bg-muted"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="social-policies">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-500" />
                              Social and Workforce Policies
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Policy Area</TableHead>
                                    <TableHead>Current Version</TableHead>
                                    <TableHead>Coverage</TableHead>
                                    <TableHead>Implementation Status</TableHead>
                                    <TableHead>Effectiveness</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Workforce General Policy</TableCell>
                                    <TableCell>v2.4</TableCell>
                                    <TableCell>All Employees</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Review</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Health & Safety Policy</TableCell>
                                    <TableCell>v3.2</TableCell>
                                    <TableCell>All Personnel</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Review</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Value Chain Workers Policy</TableCell>
                                    <TableCell>v1.7</TableCell>
                                    <TableCell>Supply Chain</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Implementing</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Good</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Update</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Community Relations Policy</TableCell>
                                    <TableCell>v1.9</TableCell>
                                    <TableCell>Local Communities</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Good</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Review</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Consumer Protection Policy</TableCell>
                                    <TableCell>v2.1</TableCell>
                                    <TableCell>End Users</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Fully Implemented</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Review</Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="governance-policies">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-purple-500" />
                              Governance and Ethics Policies
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Business Conduct Policies</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Anti-Corruption Policy</span>
                                        <Badge variant="default">v3.2</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Code of Ethics</span>
                                        <Badge variant="default">v2.8</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Whistleblowing Policy</span>
                                        <Badge variant="default">v1.9</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Data Privacy Policy</span>
                                        <Badge variant="default">v2.3</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Conflict of Interest Policy</span>
                                        <Badge variant="default">v1.6</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Policy Effectiveness Metrics</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-sm">Policy Awareness Rate</span>
                                          <span className="text-sm font-medium">98%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div className="bg-green-500 h-2 rounded-full" style={{width: '98%'}}></div>
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-sm">Implementation Score</span>
                                          <span className="text-sm font-medium">94%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-sm">Compliance Rate</span>
                                          <span className="text-sm font-medium">96%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Policy Communication and Training</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="communication-strategy">Communication Strategy</Label>
                                      <Textarea
                                        id="communication-strategy"
                                        defaultValue="Multi-channel communication approach ensures all stakeholders receive relevant policy information:
• New employee orientation includes comprehensive policy overview
• Annual policy refresh training for all employees
• Targeted training for role-specific policies
• Digital policy portal with easy access and search functionality
• Regular policy updates communicated through multiple channels
• Management briefings on policy changes and implications"
                                        rows={6}
                                      />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="text-center">
                                        <div className="text-2xl font-bold">100%</div>
                                        <div className="text-sm text-muted-foreground">Employee Training Completion</div>
                                      </div>
                                      <div className="text-center">
                                        <div className="text-2xl font-bold">24</div>
                                        <div className="text-sm text-muted-foreground">Training Hours (Annual)</div>
                                      </div>
                                      <div className="text-center">
                                        <div className="text-2xl font-bold">95%</div>
                                        <div className="text-sm text-muted-foreground">Policy Assessment Pass Rate</div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="stakeholder-consultation">
                          <AccordionTrigger>Stakeholder Consultation Process</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="consultation-approach">Stakeholder Consultation Methodology</Label>
                                <Textarea
                                  id="consultation-approach"
                                  defaultValue="Our stakeholder consultation process ensures comprehensive input in policy development:
• Multi-stakeholder workshops for policy co-creation
• Online surveys and feedback platforms
• Focus groups with key stakeholder representatives
• One-on-one consultations with critical stakeholders
• Public comment periods for community-impacting policies
• Regular feedback loops and policy impact assessments"
                                  rows={6}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Stakeholder Group</TableHead>
                                    <TableHead>Consultation Method</TableHead>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead>Last Consultation</TableHead>
                                    <TableHead>Feedback Incorporation Rate</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Employees</TableCell>
                                    <TableCell>Surveys, Focus Groups</TableCell>
                                    <TableCell>Quarterly</TableCell>
                                    <TableCell>Mar 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">85%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Customers</TableCell>
                                    <TableCell>Advisory Panels</TableCell>
                                    <TableCell>Bi-annual</TableCell>
                                    <TableCell>Feb 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">78%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Local Communities</TableCell>
                                    <TableCell>Public Meetings</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>Jan 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">65%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Suppliers</TableCell>
                                    <TableCell>Supplier Summits</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>Dec 2023</TableCell>
                                    <TableCell>
                                      <Badge variant="default">72%</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Regulatory Bodies</TableCell>
                                    <TableCell>Formal Consultations</TableCell>
                                    <TableCell>As Required</TableCell>
                                    <TableCell>Mar 2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">90%</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="implementation-tracking">
                          <AccordionTrigger>Implementation Timeline and Tracking</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Implementation Timeline Management</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Implementation Phase</TableHead>
                                        <TableHead>Timeline</TableHead>
                                        <TableHead>Responsible Party</TableHead>
                                        <TableHead>Progress</TableHead>
                                        <TableHead>Status</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>Policy Development</TableCell>
                                        <TableCell>Months 1-3</TableCell>
                                        <TableCell>Policy Team</TableCell>
                                        <TableCell>
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="default">Complete</Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Stakeholder Review</TableCell>
                                        <TableCell>Month 4</TableCell>
                                        <TableCell>Stakeholder Relations</TableCell>
                                        <TableCell>
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="default">Complete</Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Management Approval</TableCell>
                                        <TableCell>Month 5</TableCell>
                                        <TableCell>Executive Team</TableCell>
                                        <TableCell>
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="default">Complete</Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Training & Communication</TableCell>
                                        <TableCell>Months 6-7</TableCell>
                                        <TableCell>HR & Communications</TableCell>
                                        <TableCell>
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="secondary">In Progress</Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Full Implementation</TableCell>
                                        <TableCell>Month 8</TableCell>
                                        <TableCell>All Departments</TableCell>
                                        <TableCell>
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gray-400 h-2 rounded-full" style={{width: '25%'}}></div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="outline">Pending</Badge>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </CardContent>
                              </Card>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Senior Responsibility Assignment Tab */}
                <TabsContent value="responsibility" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Senior Management Responsibility Assignment</CardTitle>
                      <CardDescription>
                        Clear accountability structure with defined roles, responsibilities, and performance metrics for senior leadership
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Executive Accountability Matrix</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>ESG Area</TableHead>
                                  <TableHead>Senior Owner</TableHead>
                                  <TableHead>Performance Score</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Climate Strategy</TableCell>
                                  <TableCell>CEO</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Excellent</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Environmental Management</TableCell>
                                  <TableCell>COO</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Good</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Workforce & Safety</TableCell>
                                  <TableCell>CHRO</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Excellent</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Ethics & Governance</TableCell>
                                  <TableCell>General Counsel</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Excellent</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Community Relations</TableCell>
                                  <TableCell>CMO</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Good</Badge>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Management Level Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Board Level</span>
                                <Badge variant="default">5 Directors</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">C-Suite</span>
                                <Badge variant="default">4 Executives</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Senior Management</span>
                                <Badge variant="secondary">8 Managers</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Department Heads</span>
                                <Badge variant="secondary">12 Heads</Badge>
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between font-medium">
                                <span className="text-sm">Total ESG Accountability</span>
                                <Badge variant="default">29 Leaders</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="decision-authority">
                          <AccordionTrigger>Decision-Making Authority and Reporting Lines</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="authority-structure">Decision-Making Authority Structure</Label>
                                <Textarea
                                  id="authority-structure"
                                  defaultValue="Clear decision-making hierarchy ensures rapid and effective ESG decision implementation:

BOARD LEVEL (Strategic Decisions):
• Overall ESG strategy approval and resource allocation
• Major policy changes and risk tolerance setting
• CEO performance evaluation including ESG metrics

EXECUTIVE LEVEL (Operational Decisions):
• Policy implementation and operational adjustments
• Budget allocation for ESG initiatives
• Cross-departmental coordination and conflict resolution

MANAGEMENT LEVEL (Tactical Decisions):
• Day-to-day operational ESG compliance
• Team-level performance management
• Local implementation of ESG policies and procedures"
                                  rows={12}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Decision Type</TableHead>
                                    <TableHead>Authority Level</TableHead>
                                    <TableHead>Approval Process</TableHead>
                                    <TableHead>Typical Timeline</TableHead>
                                    <TableHead>Escalation Path</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Strategic ESG Direction</TableCell>
                                    <TableCell>Board</TableCell>
                                    <TableCell>Board Resolution</TableCell>
                                    <TableCell>1-3 months</TableCell>
                                    <TableCell>N/A</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Policy Changes</TableCell>
                                    <TableCell>Executive Committee</TableCell>
                                    <TableCell>Executive Approval</TableCell>
                                    <TableCell>2-4 weeks</TableCell>
                                    <TableCell>Board</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Budget Allocation (&gt;€100k)</TableCell>
                                    <TableCell>CEO/CFO</TableCell>
                                    <TableCell>Executive Review</TableCell>
                                    <TableCell>1-2 weeks</TableCell>
                                    <TableCell>Board (if material)</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Operational Adjustments</TableCell>
                                    <TableCell>Department Head</TableCell>
                                    <TableCell>Management Approval</TableCell>
                                    <TableCell>1-5 days</TableCell>
                                    <TableCell>Executive Committee</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Compliance Issues</TableCell>
                                    <TableCell>Compliance Officer</TableCell>
                                    <TableCell>Immediate Action</TableCell>
                                    <TableCell>Same day</TableCell>
                                    <TableCell>General Counsel</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="performance-metrics">
                          <AccordionTrigger>Performance Evaluation and Accountability Tracking</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Performance Metrics by Level</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="text-sm font-medium">Board Level KPIs</Label>
                                        <div className="text-sm text-muted-foreground mt-1">
                                          • Overall ESG performance score<br/>
                                          • Stakeholder satisfaction ratings<br/>
                                          • Regulatory compliance status<br/>
                                          • ESG risk management effectiveness
                                        </div>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Executive Level KPIs</Label>
                                        <div className="text-sm text-muted-foreground mt-1">
                                          • Departmental ESG target achievement<br/>
                                          • Policy implementation rates<br/>
                                          • Team ESG training completion<br/>
                                          • Cross-functional collaboration scores
                                        </div>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Management Level KPIs</Label>
                                        <div className="text-sm text-muted-foreground mt-1">
                                          • Operational ESG compliance rates<br/>
                                          • Team performance on ESG metrics<br/>
                                          • Process improvement initiatives<br/>
                                          • Local stakeholder engagement
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Accountability Mechanisms</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Performance Reviews</span>
                                        <Badge variant="default">Quarterly</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">360° Feedback</span>
                                        <Badge variant="secondary">Annual</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Compensation Link</span>
                                        <Badge variant="default">25% Weight</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Public Disclosure</span>
                                        <Badge variant="default">Annual</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Board Reporting</span>
                                        <Badge variant="default">Monthly</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Current Performance Dashboard</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Executive</TableHead>
                                        <TableHead>ESG Area</TableHead>
                                        <TableHead>Q1 Score</TableHead>
                                        <TableHead>Target</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Trend</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>CEO</TableCell>
                                        <TableCell>Overall ESG Performance</TableCell>
                                        <TableCell>92</TableCell>
                                        <TableCell>90</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Above Target</Badge>
                                        </TableCell>
                                        <TableCell>📈</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>COO</TableCell>
                                        <TableCell>Environmental Operations</TableCell>
                                        <TableCell>87</TableCell>
                                        <TableCell>85</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Above Target</Badge>
                                        </TableCell>
                                        <TableCell>📈</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>CHRO</TableCell>
                                        <TableCell>Workforce & Safety</TableCell>
                                        <TableCell>95</TableCell>
                                        <TableCell>90</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Excellent</Badge>
                                        </TableCell>
                                        <TableCell>📈</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>CFO</TableCell>
                                        <TableCell>ESG Financial Integration</TableCell>
                                        <TableCell>83</TableCell>
                                        <TableCell>85</TableCell>
                                        <TableCell>
                                          <Badge variant="secondary">Below Target</Badge>
                                        </TableCell>
                                        <TableCell>📉</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </CardContent>
                              </Card>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Governance Integration Tab */}
                <TabsContent value="governance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Governance Integration Framework</CardTitle>
                      <CardDescription>
                        Comprehensive integration of ESG practices into corporate governance, risk management, and strategic decision-making processes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="board-oversight">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Board Oversight and ESG Governance
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Board ESG Oversight Structure</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">ESG Committee</span>
                                        <Badge variant="default">5 Directors</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Independent Directors</span>
                                        <Badge variant="default">3 of 5</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">ESG Expertise</span>
                                        <Badge variant="default">4 Directors</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Meeting Frequency</span>
                                        <Badge variant="secondary">Quarterly</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Board Time on ESG</span>
                                        <Badge variant="default">30%</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">ESG Committee Responsibilities</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Oversee ESG strategy development and implementation</div>
                                      <div>• Review ESG performance and KPIs quarterly</div>
                                      <div>• Assess ESG-related risks and opportunities</div>
                                      <div>• Approve significant ESG policies and initiatives</div>
                                      <div>• Monitor stakeholder engagement effectiveness</div>
                                      <div>• Ensure ESG disclosure quality and transparency</div>
                                      <div>• Evaluate management ESG performance</div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Board ESG Training and Development</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Training Area</TableHead>
                                          <TableHead>Frequency</TableHead>
                                          <TableHead>Last Completed</TableHead>
                                          <TableHead>Completion Rate</TableHead>
                                          <TableHead>Next Scheduled</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell>ESG Fundamentals</TableCell>
                                          <TableCell>Annual</TableCell>
                                          <TableCell>Jan 2024</TableCell>
                                          <TableCell>
                                            <Badge variant="default">100%</Badge>
                                          </TableCell>
                                          <TableCell>Jan 2025</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Climate Risk Assessment</TableCell>
                                          <TableCell>Bi-annual</TableCell>
                                          <TableCell>Mar 2024</TableCell>
                                          <TableCell>
                                            <Badge variant="default">100%</Badge>
                                          </TableCell>
                                          <TableCell>Sep 2024</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>ESG Reporting Standards</TableCell>
                                          <TableCell>Annual</TableCell>
                                          <TableCell>Feb 2024</TableCell>
                                          <TableCell>
                                            <Badge variant="default">100%</Badge>
                                          </TableCell>
                                          <TableCell>Feb 2025</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Stakeholder Engagement</TableCell>
                                          <TableCell>Annual</TableCell>
                                          <TableCell>Apr 2024</TableCell>
                                          <TableCell>
                                            <Badge variant="secondary">80%</Badge>
                                          </TableCell>
                                          <TableCell>Apr 2025</TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="risk-management">
                          <AccordionTrigger>Risk Management Integration</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="risk-integration">ESG Risk Management Framework</Label>
                                <Textarea
                                  id="risk-integration"
                                  defaultValue="ESG risks are fully integrated into our enterprise risk management framework through:

IDENTIFICATION & ASSESSMENT:
• Regular ESG risk mapping across all business operations
• Climate scenario analysis and stress testing
• Stakeholder risk assessment and materiality analysis
• Supply chain ESG risk evaluation
• Regulatory compliance risk monitoring

MANAGEMENT & MITIGATION:
• Risk appetite statements for key ESG areas
• Mitigation strategies and contingency planning
• Insurance coverage for environmental liabilities
• Crisis management protocols for ESG incidents
• Regular risk monitoring and reporting systems"
                                  rows={12}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Key ESG Risk Areas</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Risk Category</TableHead>
                                          <TableHead>Risk Level</TableHead>
                                          <TableHead>Mitigation Status</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell>Climate Transition</TableCell>
                                          <TableCell>
                                            <Badge variant="default">Medium</Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="default">Well Managed</Badge>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Physical Climate</TableCell>
                                          <TableCell>
                                            <Badge variant="secondary">Low</Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="default">Managed</Badge>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Supply Chain ESG</TableCell>
                                          <TableCell>
                                            <Badge variant="default">Medium</Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="secondary">Improving</Badge>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Regulatory Compliance</TableCell>
                                          <TableCell>
                                            <Badge variant="secondary">Low</Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="default">Well Managed</Badge>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Reputation & Social</TableCell>
                                          <TableCell>
                                            <Badge variant="secondary">Low</Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="default">Managed</Badge>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Risk Monitoring Dashboard</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-sm">Overall ESG Risk Score</span>
                                          <span className="text-sm font-medium">Low-Medium</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '35%'}}></div>
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-sm">Risk Mitigation Progress</span>
                                          <span className="text-sm font-medium">78%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-sm">Incident Response Readiness</span>
                                          <span className="text-sm font-medium">92%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="performance-incentives">
                          <AccordionTrigger>Performance Incentive Alignment</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Executive Compensation ESG Integration</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">ESG Weight in Total Comp</span>
                                        <Badge variant="default">25%</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Short-term Incentive ESG</span>
                                        <Badge variant="default">30%</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Long-term Incentive ESG</span>
                                        <Badge variant="default">20%</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Board Fee ESG Component</span>
                                        <Badge variant="secondary">10%</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">ESG Performance Period</span>
                                        <Badge variant="outline">3 Years</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">ESG KPIs in Compensation</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div><strong>Environmental (40%):</strong></div>
                                      <div>• GHG emission reduction targets</div>
                                      <div>• Renewable energy adoption</div>
                                      <div>• Waste reduction achievements</div>
                                      
                                      <div className="pt-2"><strong>Social (35%):</strong></div>
                                      <div>• Employee safety performance</div>
                                      <div>• Diversity and inclusion metrics</div>
                                      <div>• Community investment goals</div>
                                      
                                      <div className="pt-2"><strong>Governance (25%):</strong></div>
                                      <div>• Ethics training completion</div>
                                      <div>• Board diversity targets</div>
                                      <div>• Compliance performance</div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Performance Evaluation Framework</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Performance Level</TableHead>
                                        <TableHead>ESG Score Range</TableHead>
                                        <TableHead>Incentive Multiplier</TableHead>
                                        <TableHead>Current Performance</TableHead>
                                        <TableHead>Trend</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>Exceptional</TableCell>
                                        <TableCell>95-100</TableCell>
                                        <TableCell>1.25x</TableCell>
                                        <TableCell>CEO: 96</TableCell>
                                        <TableCell>
                                          <Badge variant="default">↗️ Improving</Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Exceeds Expectations</TableCell>
                                        <TableCell>85-94</TableCell>
                                        <TableCell>1.10x</TableCell>
                                        <TableCell>COO: 89</TableCell>
                                        <TableCell>
                                          <Badge variant="default">↗️ Improving</Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Meets Expectations</TableCell>
                                        <TableCell>75-84</TableCell>
                                        <TableCell>1.00x</TableCell>
                                        <TableCell>CFO: 78</TableCell>
                                        <TableCell>
                                          <Badge variant="secondary">→ Stable</Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Below Expectations</TableCell>
                                        <TableCell>60-74</TableCell>
                                        <TableCell>0.75x</TableCell>
                                        <TableCell>None</TableCell>
                                        <TableCell>N/A</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Unsatisfactory</TableCell>
                                        <TableCell>&lt;60</TableCell>
                                        <TableCell>0.00x</TableCell>
                                        <TableCell>None</TableCell>
                                        <TableCell>N/A</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </CardContent>
                              </Card>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="external-assurance">
                          <AccordionTrigger>External Assurance Arrangements</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">External Assurance Overview</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">ESG Data Assurance</span>
                                        <Badge variant="default">Limited</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">GHG Emissions Verification</span>
                                        <Badge variant="default">Reasonable</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Safety Data Audit</span>
                                        <Badge variant="default">Limited</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Third-party ESG Rating</span>
                                        <Badge variant="secondary">Annual</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">ISO Certification</span>
                                        <Badge variant="default">Multi-standard</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Assurance Providers</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div><strong>ESG Data Assurance:</strong> PwC Ireland</div>
                                      <div><strong>GHG Verification:</strong> Bureau Veritas</div>
                                      <div><strong>Safety Audit:</strong> DNV GL</div>
                                      <div><strong>ESG Rating:</strong> Sustainalytics</div>
                                      <div><strong>ISO Certifications:</strong> NSAI</div>
                                      <div><strong>Legal Compliance:</strong> A&L Goodbody</div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Assurance Schedule and Results</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Assurance Area</TableHead>
                                        <TableHead>Provider</TableHead>
                                        <TableHead>Scope</TableHead>
                                        <TableHead>Last Completed</TableHead>
                                        <TableHead>Result</TableHead>
                                        <TableHead>Next Due</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>ESG Reporting</TableCell>
                                        <TableCell>PwC</TableCell>
                                        <TableCell>Limited Assurance</TableCell>
                                        <TableCell>Mar 2024</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Clean Opinion</Badge>
                                        </TableCell>
                                        <TableCell>Mar 2025</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>GHG Emissions</TableCell>
                                        <TableCell>Bureau Veritas</TableCell>
                                        <TableCell>Scope 1 & 2</TableCell>
                                        <TableCell>Feb 2024</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Verified</Badge>
                                        </TableCell>
                                        <TableCell>Feb 2025</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>ISO 14001</TableCell>
                                        <TableCell>NSAI</TableCell>
                                        <TableCell>Environmental Management</TableCell>
                                        <TableCell>Jan 2024</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Certified</Badge>
                                        </TableCell>
                                        <TableCell>Jan 2027</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>ISO 45001</TableCell>
                                        <TableCell>NSAI</TableCell>
                                        <TableCell>OH&S Management</TableCell>
                                        <TableCell>Feb 2024</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Certified</Badge>
                                        </TableCell>
                                        <TableCell>Feb 2027</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>ESG Rating</TableCell>
                                        <TableCell>Sustainalytics</TableCell>
                                        <TableCell>Overall ESG Performance</TableCell>
                                        <TableCell>Dec 2023</TableCell>
                                        <TableCell>
                                          <Badge variant="default">Medium Risk</Badge>
                                        </TableCell>
                                        <TableCell>Dec 2024</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Continuous Monitoring System</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="monitoring-system">Continuous Monitoring Framework</Label>
                                      <Textarea
                                        id="monitoring-system"
                                        defaultValue="Our continuous monitoring system ensures ongoing compliance and performance validation:

• Real-time data collection and validation systems
• Monthly internal ESG performance reviews
• Quarterly third-party spot checks and assessments
• Annual comprehensive external assurance processes
• Continuous stakeholder feedback integration
• Regular benchmarking against industry best practices
• Automated alert systems for performance deviations
• Integration with enterprise risk management systems"
                                        rows={8}
                                      />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
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
            <Button>Save Enhanced Practices Data</Button>
            <Button variant="outline">Generate Governance Report</Button>
            <Button variant="outline">Update Policy Registry</Button>
            <Button variant="outline">Export Responsibility Matrix</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}