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
import { DollarSign, AlertTriangle, CheckCircle, FileCheck, BarChart3, Shield } from "lucide-react"

export default function C8Page() {
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
                <BreadcrumbPage>C8: Sector Revenue Tracking</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€8.2M</div>
                <p className="text-xs text-muted-foreground">
                  Annual revenue 2024
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Controversial Sectors</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-muted-foreground">
                  No controversial revenue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">EU Taxonomy Eligible</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground">
                  Eligible activities
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxonomy Aligned</CardTitle>
                <FileCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <p className="text-xs text-muted-foreground">
                  Fully compliant
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sector Revenue Tracking Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Sector Revenue Analysis and EU Taxonomy Compliance</CardTitle>
              <CardDescription>
                Comprehensive tracking of controversial sector revenue and EU taxonomy alignment assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="controversial" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="controversial">Controversial Sectors</TabsTrigger>
                  <TabsTrigger value="taxonomy">EU Taxonomy</TabsTrigger>
                  <TabsTrigger value="analysis">Revenue Analysis</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance Monitoring</TabsTrigger>
                </TabsList>

                {/* Controversial Sector Revenue Tab */}
                <TabsContent value="controversial" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Controversial Sector Revenue Assessment</CardTitle>
                      <CardDescription>
                        Detailed tracking and assessment of revenue from potentially controversial business sectors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="weapons-sector">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2 justify-between w-full">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-red-500" />
                                Weapons and Defense Sector
                              </div>
                              <Badge variant="outline">€0 - 0%</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="weapons-assessment">Weapons Sector Assessment</Label>
                                <Textarea
                                  id="weapons-assessment"
                                  defaultValue="Our company operates exclusively in the agricultural and food processing sector. We have no direct or indirect involvement in weapons manufacturing, defense contracting, or military supply chains. All products are civilian agricultural goods with no dual-use applications. Regular review confirms zero revenue from weapons-related activities."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Activity Category</TableHead>
                                    <TableHead>Assessment</TableHead>
                                    <TableHead>Revenue (€)</TableHead>
                                    <TableHead>Percentage</TableHead>
                                    <TableHead>Justification</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Weapons Manufacturing</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Not Applicable</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>Agricultural business only</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Defense Contracting</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Not Applicable</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>No government defense contracts</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Military Supply Chain</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Not Applicable</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>Civilian markets only</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Dual-Use Technology</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Not Applicable</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>No relevant technology products</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="tobacco-sector">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2 justify-between w-full">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                                Tobacco Sector
                              </div>
                              <Badge variant="outline">€0 - 0%</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="tobacco-assessment">Tobacco Sector Assessment</Label>
                                <Textarea
                                  id="tobacco-assessment"
                                  defaultValue="No involvement in tobacco production, processing, or distribution. Our agricultural operations focus exclusively on food crops and livestock. We do not grow tobacco, provide services to tobacco companies, or have any tobacco-related business relationships. This exclusion is part of our health-focused business strategy."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Product Categories</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Tobacco Manufacturing</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Tobacco Processing</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Tobacco Distribution</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Related Services</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Supply Chain Check</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Tobacco Suppliers</span>
                                      <Badge variant="default">None</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Tobacco Customers</span>
                                      <Badge variant="default">None</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Joint Ventures</span>
                                      <Badge variant="default">None</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Licensing Agreements</span>
                                      <Badge variant="default">None</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="fossil-fuel-sector">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2 justify-between w-full">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-gray-500" />
                                Fossil Fuel Sector
                              </div>
                              <Badge variant="outline">€0 - 0%</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="fossil-fuel-assessment">Fossil Fuel Sector Assessment</Label>
                                <Textarea
                                  id="fossil-fuel-assessment"
                                  defaultValue="No direct revenue from fossil fuel extraction, processing, or power generation. Our energy-related activities focus on renewable energy adoption and sustainable practices. While we purchase fuel for farm equipment and transportation, this represents operational costs rather than revenue-generating activities. We are transitioning to renewable energy sources where possible."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Fossil Fuel Activity</TableHead>
                                    <TableHead>Revenue Breakdown</TableHead>
                                    <TableHead>Amount (€)</TableHead>
                                    <TableHead>Percentage</TableHead>
                                    <TableHead>Future Plans</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Coal Mining/Power</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">No Revenue</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>Not applicable</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Oil Upstream/Downstream</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">No Revenue</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>Not applicable</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Natural Gas Operations</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">No Revenue</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>Not applicable</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Conventional vs Unconventional</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">No Revenue</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>Focus on renewables</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="other-controversial">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2 justify-between w-full">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                Other Controversial Sectors
                              </div>
                              <Badge variant="outline">€0 - 0%</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Chemical/Pesticide Revenue</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Hazardous Chemical Production</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Banned Pesticide Manufacturing</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Toxic Substance Processing</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Approved Agricultural Chemicals</span>
                                      <Badge variant="secondary">€45,000</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Gambling & Adult Entertainment</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Gambling Operations</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Casino Services</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Adult Entertainment</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Related Services</span>
                                      <Badge variant="outline">€0</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="chemical-justification">Chemical/Pesticide Business Rationale</Label>
                                <Textarea
                                  id="chemical-justification"
                                  defaultValue="Limited revenue from approved agricultural chemicals represents essential crop protection services for organic and sustainable farming. All chemicals used are EU-approved, environmentally certified, and applied according to strict sustainability protocols. This represents 0.55% of total revenue and supports our mission of sustainable agriculture. Continuous transition toward biological and organic alternatives is ongoing."
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

                {/* EU Taxonomy Tab */}
                <TabsContent value="taxonomy" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">EU Taxonomy Alignment Assessment</CardTitle>
                      <CardDescription>
                        Comprehensive assessment of EU taxonomy eligibility and alignment across all business activities
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Taxonomy Performance Overview</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Eligible Activities (75%)</Label>
                                  <span className="text-sm font-medium">€6.15M</span>
                                </div>
                                <Progress value={75} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Aligned Activities (42%)</Label>
                                  <span className="text-sm font-medium">€3.44M</span>
                                </div>
                                <Progress value={42} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">DNSH Compliance (56%)</Label>
                                  <span className="text-sm font-medium">€4.59M</span>
                                </div>
                                <Progress value={56} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Minimum Safeguards (95%)</Label>
                                  <span className="text-sm font-medium">€7.79M</span>
                                </div>
                                <Progress value={95} className="w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Environmental Objectives</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Climate Change Mitigation</span>
                                <Badge variant="default">€2.1M (25%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Climate Change Adaptation</span>
                                <Badge variant="secondary">€0.8M (10%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Sustainable Water Use</span>
                                <Badge variant="secondary">€0.4M (5%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Circular Economy</span>
                                <Badge variant="outline">€0.1M (1%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Pollution Prevention</span>
                                <Badge variant="outline">€0.04M (0.5%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Biodiversity Protection</span>
                                <Badge variant="outline">€0M (0%)</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="eligibility-assessment">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Taxonomy Eligibility Assessment
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Business Activity</TableHead>
                                    <TableHead>NACE Code</TableHead>
                                    <TableHead>Revenue (€)</TableHead>
                                    <TableHead>Percentage</TableHead>
                                    <TableHead>Eligibility Status</TableHead>
                                    <TableHead>Environmental Objective</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Organic Agriculture</TableCell>
                                    <TableCell>A01.1</TableCell>
                                    <TableCell>€3,200,000</TableCell>
                                    <TableCell>39%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Eligible</Badge>
                                    </TableCell>
                                    <TableCell>Climate Mitigation</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Sustainable Food Processing</TableCell>
                                    <TableCell>C10.1</TableCell>
                                    <TableCell>€1,800,000</TableCell>
                                    <TableCell>22%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Eligible</Badge>
                                    </TableCell>
                                    <TableCell>Climate Mitigation</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Renewable Energy Generation</TableCell>
                                    <TableCell>D35.1</TableCell>
                                    <TableCell>€150,000</TableCell>
                                    <TableCell>2%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Eligible</Badge>
                                    </TableCell>
                                    <TableCell>Climate Mitigation</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Water Management</TableCell>
                                    <TableCell>E36.0</TableCell>
                                    <TableCell>€400,000</TableCell>
                                    <TableCell>5%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Eligible</Badge>
                                    </TableCell>
                                    <TableCell>Sustainable Water</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Climate Resilient Agriculture</TableCell>
                                    <TableCell>A01.6</TableCell>
                                    <TableCell>€600,000</TableCell>
                                    <TableCell>7%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Eligible</Badge>
                                    </TableCell>
                                    <TableCell>Climate Adaptation</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Traditional Processing</TableCell>
                                    <TableCell>C10.8</TableCell>
                                    <TableCell>€2,050,000</TableCell>
                                    <TableCell>25%</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Not Eligible</Badge>
                                    </TableCell>
                                    <TableCell>N/A</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="alignment-evaluation">
                          <AccordionTrigger>Alignment Evaluation with Technical Criteria</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="alignment-methodology">Alignment Assessment Methodology</Label>
                                <Textarea
                                  id="alignment-methodology"
                                  defaultValue="Detailed assessment of eligible activities against EU taxonomy technical screening criteria. Each activity evaluated for substantial contribution to environmental objectives, compliance with do no significant harm (DNSH) criteria, and adherence to minimum social safeguards. Regular monitoring and verification processes ensure continued alignment."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Activity</TableHead>
                                    <TableHead>Substantial Contribution</TableHead>
                                    <TableHead>DNSH Assessment</TableHead>
                                    <TableHead>Minimum Safeguards</TableHead>
                                    <TableHead>Overall Alignment</TableHead>
                                    <TableHead>Revenue (€)</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Organic Agriculture</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Yes</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Compliant</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Met</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Aligned</Badge>
                                    </TableCell>
                                    <TableCell>€3,200,000</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Sustainable Processing</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Partial</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Minor Issues</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Met</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Partially Aligned</Badge>
                                    </TableCell>
                                    <TableCell>€240,000</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Renewable Energy</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Yes</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Compliant</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Met</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Aligned</Badge>
                                    </TableCell>
                                    <TableCell>€150,000</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Water Management</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Partial</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Under Review</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Met</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Not Aligned</Badge>
                                    </TableCell>
                                    <TableCell>€0</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="dnsh-assessment">
                          <AccordionTrigger>Do No Significant Harm (DNSH) Assessment</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="dnsh-framework">DNSH Assessment Framework</Label>
                                <Textarea
                                  id="dnsh-framework"
                                  defaultValue="Comprehensive assessment ensuring activities do not significantly harm any of the six environmental objectives. Detailed impact evaluation across climate change, water resources, circular economy, pollution, and biodiversity. Regular monitoring and improvement planning address any identified risks or negative impacts."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">DNSH Compliance Status</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Climate Change Mitigation</span>
                                      <Badge variant="default">Compliant</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Climate Change Adaptation</span>
                                      <Badge variant="default">Compliant</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Sustainable Water Use</span>
                                      <Badge variant="secondary">Minor Risks</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Circular Economy</span>
                                      <Badge variant="secondary">Improvement Needed</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Pollution Prevention</span>
                                      <Badge variant="default">Compliant</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Biodiversity Protection</span>
                                      <Badge variant="default">Compliant</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Improvement Actions</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Water Efficiency Upgrade</span>
                                      <Badge variant="secondary">In Progress</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Waste Reduction Program</span>
                                      <Badge variant="secondary">Planned</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Packaging Optimization</span>
                                      <Badge variant="default">Complete</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Biodiversity Monitoring</span>
                                      <Badge variant="default">Ongoing</Badge>
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

                {/* Revenue Analysis Tab */}
                <TabsContent value="analysis" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Revenue Analysis and Business Justification</CardTitle>
                      <CardDescription>
                        Comprehensive analysis of revenue streams with business rationale and transition planning
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Revenue Stream Distribution</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Sustainable Agriculture (39%)</Label>
                                  <span className="text-sm font-medium">€3.2M</span>
                                </div>
                                <Progress value={39} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Traditional Processing (25%)</Label>
                                  <span className="text-sm font-medium">€2.05M</span>
                                </div>
                                <Progress value={25} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Sustainable Processing (22%)</Label>
                                  <span className="text-sm font-medium">€1.8M</span>
                                </div>
                                <Progress value={22} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Climate Solutions (14%)</Label>
                                  <span className="text-sm font-medium">€1.15M</span>
                                </div>
                                <Progress value={14} className="w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Sustainability Classification</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">High Sustainability Impact</span>
                                <Badge variant="default">€5.15M (63%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Medium Sustainability Impact</span>
                                <Badge variant="secondary">€2.45M (30%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Transitioning Activities</span>
                                <Badge variant="secondary">€0.55M (7%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Controversial Sectors</span>
                                <Badge variant="outline">€0M (0%)</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Neutral Activities</span>
                                <Badge variant="outline">€0.05M (0.6%)</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="business-rationale">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <FileCheck className="h-4 w-4" />
                              Business Rationale Documentation
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="strategic-rationale">Strategic Business Rationale</Label>
                                <Textarea
                                  id="strategic-rationale"
                                  defaultValue="Our revenue portfolio is strategically aligned with sustainability objectives and market demand for environmentally responsible products. The focus on organic agriculture and sustainable processing reflects our commitment to environmental stewardship and positions us well for future regulatory developments. Traditional processing activities are being systematically upgraded to meet higher sustainability standards."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Revenue Growth Strategy</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Expand Organic Agriculture</span>
                                      <Badge variant="default">Priority 1</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Enhance Processing Sustainability</span>
                                      <Badge variant="default">Priority 2</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Develop Climate Solutions</span>
                                      <Badge variant="secondary">Priority 3</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Phase Out Traditional Methods</span>
                                      <Badge variant="secondary">Ongoing</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Market Positioning</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Premium Sustainable Brand</span>
                                      <Badge variant="default">Established</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">B2B Sustainability Partner</span>
                                      <Badge variant="default">Growing</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Climate Solutions Provider</span>
                                      <Badge variant="secondary">Emerging</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Industry Sustainability Leader</span>
                                      <Badge variant="default">Recognized</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="transition-planning">
                          <AccordionTrigger>Transition Planning for Controversial Sectors</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="transition-strategy">Transition Strategy</Label>
                                <Textarea
                                  id="transition-strategy"
                                  defaultValue="While we have minimal exposure to controversial sectors, our transition strategy focuses on completely eliminating any potential risks. The small chemical/pesticide revenue (0.55%) is being systematically reduced through organic alternatives adoption. All activities are reviewed annually for potential controversy risks and sustainability alignment."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Activity</TableHead>
                                    <TableHead>Current Revenue</TableHead>
                                    <TableHead>Risk Level</TableHead>
                                    <TableHead>Transition Plan</TableHead>
                                    <TableHead>Target Date</TableHead>
                                    <TableHead>Alternative</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Approved Agricultural Chemicals</TableCell>
                                    <TableCell>€45,000</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Low</Badge>
                                    </TableCell>
                                    <TableCell>Organic Transition</TableCell>
                                    <TableCell>Dec 2025</TableCell>
                                    <TableCell>Biological Controls</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Traditional Energy Use</TableCell>
                                    <TableCell>€5,000</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Minimal</Badge>
                                    </TableCell>
                                    <TableCell>Renewable Adoption</TableCell>
                                    <TableCell>Jun 2025</TableCell>
                                    <TableCell>Solar/Wind Power</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="stakeholder-communication">
                          <AccordionTrigger>Stakeholder Communication Strategy</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="communication-approach">Communication Strategy</Label>
                                <Textarea
                                  id="communication-approach"
                                  defaultValue="Proactive and transparent communication about our revenue sources and sustainability commitments. Regular reporting to stakeholders on taxonomy alignment progress and controversial sector exposure. Clear messaging about our transition plans and sustainability investments. Engagement with investors, customers, and regulators on ESG performance."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Investor Relations</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Quarterly ESG performance reports</div>
                                      <div>• Annual taxonomy alignment disclosure</div>
                                      <div>• Sustainability investor presentations</div>
                                      <div>• ESG rating agency engagement</div>
                                      <div>• Green financing communications</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Customer Communication</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Sustainability product labeling</div>
                                      <div>• Supply chain transparency reports</div>
                                      <div>• Customer sustainability guides</div>
                                      <div>• Social media sustainability content</div>
                                      <div>• Industry conference presentations</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Regulatory Engagement</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• CSRD compliance reporting</div>
                                      <div>• Taxonomy regulation alignment</div>
                                      <div>• Industry consultation participation</div>
                                      <div>• Regulatory body communications</div>
                                      <div>• Policy development input</div>
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

                {/* Compliance Monitoring Tab */}
                <TabsContent value="compliance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Compliance Monitoring and Risk Assessment</CardTitle>
                      <CardDescription>
                        Ongoing monitoring of regulatory compliance, risk assessment, and disclosure requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Compliance Status</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">EU Taxonomy Regulation</span>
                                <Badge variant="default">Compliant</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">CSRD Requirements</span>
                                <Badge variant="default">On Track</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">SFDR Disclosure</span>
                                <Badge variant="secondary">In Progress</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Industry Standards</span>
                                <Badge variant="default">Exceeded</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Voluntary Frameworks</span>
                                <Badge variant="default">Active</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Risk Assessment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Controversial Sector Risk</span>
                                <Badge variant="default">Very Low</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Taxonomy Misalignment Risk</span>
                                <Badge variant="secondary">Medium</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Regulatory Change Risk</span>
                                <Badge variant="secondary">Medium</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Greenwashing Risk</span>
                                <Badge variant="default">Low</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Investor Scrutiny Risk</span>
                                <Badge variant="default">Low</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Monitoring Schedule and Activities</CardTitle>
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
                                <TableCell className="font-medium">Revenue Classification Review</TableCell>
                                <TableCell>Quarterly</TableCell>
                                <TableCell>Finance Director</TableCell>
                                <TableCell>Dec 2024</TableCell>
                                <TableCell>Mar 2025</TableCell>
                                <TableCell>
                                  <Badge variant="default">Current</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Taxonomy Alignment Assessment</TableCell>
                                <TableCell>Bi-annual</TableCell>
                                <TableCell>Sustainability Team</TableCell>
                                <TableCell>Jun 2024</TableCell>
                                <TableCell>Dec 2024</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Due</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">DNSH Compliance Check</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>Environmental Manager</TableCell>
                                <TableCell>Jan 2024</TableCell>
                                <TableCell>Jan 2025</TableCell>
                                <TableCell>
                                  <Badge variant="default">Scheduled</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Controversial Sector Screening</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>Compliance Officer</TableCell>
                                <TableCell>Nov 2024</TableCell>
                                <TableCell>Nov 2025</TableCell>
                                <TableCell>
                                  <Badge variant="default">Complete</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Stakeholder Disclosure Update</TableCell>
                                <TableCell>Quarterly</TableCell>
                                <TableCell>Communications Team</TableCell>
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
                          <CardTitle className="text-base">Continuous Improvement Framework</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="improvement-approach">Continuous Improvement Strategy</Label>
                            <Textarea
                              id="improvement-approach"
                              defaultValue="Systematic approach to improving taxonomy alignment and reducing any controversial sector exposure. Regular benchmarking against industry peers and best practices. Integration of stakeholder feedback and regulatory developments into our strategy. Investment in capability building and system enhancements to maintain compliance excellence."
                              rows={4}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="future-enhancements">Planned Enhancements</Label>
                            <Textarea
                              id="future-enhancements"
                              defaultValue="2025 initiatives include enhanced digital monitoring systems for revenue classification, expanded DNSH assessment capabilities, and improved stakeholder reporting tools. Development of predictive analytics for regulatory compliance and integration of AI-powered risk assessment tools. Strengthened third-party verification processes and external assurance programs."
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
            <Button>Save Revenue Data</Button>
            <Button variant="outline">Generate Taxonomy Report</Button>
            <Button variant="outline">Update Compliance Status</Button>
            <Button variant="outline">Export Revenue Analysis</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}