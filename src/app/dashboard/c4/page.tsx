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
import { CloudRain, Thermometer, TrendingUp, Shield, AlertTriangle, Map } from "lucide-react"

export default function C4Page() {
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
                <BreadcrumbPage>C4: Climate Risks Assessment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Physical Risks</CardTitle>
                <CloudRain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Identified hazards
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transition Risks</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Policy & market risks
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Assets</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Facilities at risk
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Adaptation Progress</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">
                  Actions implemented
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Climate Risks Assessment Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Climate Risk Assessment and Adaptation Planning</CardTitle>
              <CardDescription>
                Comprehensive assessment of physical and transition climate risks with detailed adaptation strategies and monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="physical-risks" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="physical-risks">Physical Risks</TabsTrigger>
                  <TabsTrigger value="transition-risks">Transition Risks</TabsTrigger>
                  <TabsTrigger value="adaptation">Adaptation Actions</TabsTrigger>
                  <TabsTrigger value="monitoring">Risk Monitoring</TabsTrigger>
                </TabsList>

                {/* Physical Risks Tab */}
                <TabsContent value="physical-risks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Physical Climate Risk Identification</CardTitle>
                      <CardDescription>
                        Assessment of acute and chronic physical climate hazards with exposure and vulnerability analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="acute-risks">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              Acute Physical Risks
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Extreme Weather Events</h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Add Risk Assessment</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Add Physical Risk Assessment</DialogTitle>
                                      <DialogDescription>
                                        Document a new physical climate risk with detailed assessment
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="hazard-type">Climate Hazard</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select hazard" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="flooding">Flooding</SelectItem>
                                              <SelectItem value="extreme-heat">Extreme Heat</SelectItem>
                                              <SelectItem value="drought">Drought</SelectItem>
                                              <SelectItem value="storms">Severe Storms</SelectItem>
                                              <SelectItem value="hail">Hail</SelectItem>
                                              <SelectItem value="frost">Frost Events</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="time-horizon">Time Horizon</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select horizon" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="short">Short-term (0-5 years)</SelectItem>
                                              <SelectItem value="medium">Medium-term (5-15 years)</SelectItem>
                                              <SelectItem value="long">Long-term (15-30 years)</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="likelihood">Likelihood</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select likelihood" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="very-low">Very Low (0-5%)</SelectItem>
                                              <SelectItem value="low">Low (5-25%)</SelectItem>
                                              <SelectItem value="medium">Medium (25-75%)</SelectItem>
                                              <SelectItem value="high">High (75-95%)</SelectItem>
                                              <SelectItem value="very-high">Very High (95-100%)</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="impact-severity">Impact Severity</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select severity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="negligible">Negligible</SelectItem>
                                              <SelectItem value="minor">Minor</SelectItem>
                                              <SelectItem value="moderate">Moderate</SelectItem>
                                              <SelectItem value="major">Major</SelectItem>
                                              <SelectItem value="catastrophic">Catastrophic</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="financial-impact">Financial Impact (€)</Label>
                                          <Input
                                            id="financial-impact"
                                            type="number"
                                            placeholder="Estimated impact"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="asset-exposure">Asset Exposure</Label>
                                          <Input
                                            id="asset-exposure"
                                            placeholder="Affected assets/locations"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="risk-description">Risk Description and Vulnerability Factors</Label>
                                        <Textarea
                                          id="risk-description"
                                          placeholder="Describe the climate hazard, exposure pathways, and vulnerability factors..."
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">Add Risk Assessment</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Climate Hazard</TableHead>
                                    <TableHead>Time Horizon</TableHead>
                                    <TableHead>Likelihood</TableHead>
                                    <TableHead>Impact</TableHead>
                                    <TableHead>Financial Impact</TableHead>
                                    <TableHead>Risk Level</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Extreme Flooding</TableCell>
                                    <TableCell>Short-term</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Major</Badge>
                                    </TableCell>
                                    <TableCell>€850,000</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">High</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Severe Drought</TableCell>
                                    <TableCell>Medium-term</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Major</Badge>
                                    </TableCell>
                                    <TableCell>€1,200,000</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Extreme Heat Events</TableCell>
                                    <TableCell>Short-term</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Moderate</Badge>
                                    </TableCell>
                                    <TableCell>€320,000</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Medium</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Severe Storms & Hail</TableCell>
                                    <TableCell>Short-term</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Moderate</Badge>
                                    </TableCell>
                                    <TableCell>€180,000</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="chronic-risks">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-orange-500" />
                              Chronic Physical Risks
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Temperature Changes</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Rising Annual Temperatures</span>
                                      <Badge variant="default">+2.5°C by 2050</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Growing Season Extension</span>
                                      <Badge variant="secondary">+3 weeks</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Heat Stress Days</span>
                                      <Badge variant="destructive">+45 days/year</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Cooling Degree Days</span>
                                      <Badge variant="secondary">+180/year</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Precipitation Patterns</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Annual Precipitation Change</span>
                                      <Badge variant="secondary">-8%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Summer Rainfall Reduction</span>
                                      <Badge variant="destructive">-25%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Winter Rainfall Increase</span>
                                      <Badge variant="default">+15%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Drought Risk Increase</span>
                                      <Badge variant="destructive">High</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="chronic-impacts">Chronic Risk Impact Assessment</Label>
                                <Textarea
                                  id="chronic-impacts"
                                  defaultValue="Long-term climate changes pose significant risks to agricultural productivity and operational continuity. Rising temperatures and changing precipitation patterns will affect crop yields, water availability, and energy costs. The agricultural sector faces particular vulnerability to chronic temperature increases and shifts in seasonal weather patterns, requiring adaptive management strategies."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="asset-exposure">
                          <AccordionTrigger>Asset Exposure and Vulnerability Mapping</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Asset/Location</TableHead>
                                    <TableHead>Asset Type</TableHead>
                                    <TableHead>Primary Hazards</TableHead>
                                    <TableHead>Exposure Level</TableHead>
                                    <TableHead>Vulnerability Score</TableHead>
                                    <TableHead>Risk Priority</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Main Processing Facility</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Industrial</Badge>
                                    </TableCell>
                                    <TableCell>Flooding, Extreme Heat</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                    <TableCell>7.8/10</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Critical</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Farm Operations (South)</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Agricultural</Badge>
                                    </TableCell>
                                    <TableCell>Drought, Heat Stress</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">High</Badge>
                                    </TableCell>
                                    <TableCell>8.2/10</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Critical</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Distribution Center</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Logistics</Badge>
                                    </TableCell>
                                    <TableCell>Flooding, Storms</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>5.4/10</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Headquarters Office</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Commercial</Badge>
                                    </TableCell>
                                    <TableCell>Extreme Heat, Storms</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Low</Badge>
                                    </TableCell>
                                    <TableCell>3.2/10</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Low</Badge>
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

                {/* Transition Risks Tab */}
                <TabsContent value="transition-risks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Climate Transition Risk Assessment</CardTitle>
                      <CardDescription>
                        Assessment of policy, legal, technology, market, and reputation transition risks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="policy-legal">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-blue-500" />
                              Policy and Legal Risks
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Policy/Regulation</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Timeline</TableHead>
                                    <TableHead>Impact Level</TableHead>
                                    <TableHead>Financial Impact</TableHead>
                                    <TableHead>Preparedness</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">EU Carbon Border Adjustment</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Trade Policy</Badge>
                                    </TableCell>
                                    <TableCell>2026</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>€120,000/year</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Moderate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">National Carbon Tax Increase</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Carbon Pricing</Badge>
                                    </TableCell>
                                    <TableCell>2025-2030</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                    <TableCell>€280,000/year</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Agricultural Emissions Standards</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Sector Regulation</Badge>
                                    </TableCell>
                                    <TableCell>2027</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>€450,000</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Limited</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">CSRD Compliance Requirements</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Reporting</Badge>
                                    </TableCell>
                                    <TableCell>2025</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>€85,000</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="technology-risks">
                          <AccordionTrigger>Technology and Innovation Risks</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Technology Disruption Risks</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Alternative Protein Technologies</span>
                                      <Badge variant="destructive">High</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Precision Agriculture Tech</span>
                                      <Badge variant="secondary">Medium</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Renewable Energy Systems</span>
                                      <Badge variant="default">Opportunity</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Carbon Capture Technologies</span>
                                      <Badge variant="secondary">Medium</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Technology Investment Risks</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Stranded Asset Risk</span>
                                      <Badge variant="destructive">€650,000</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">R&D Investment Need</span>
                                      <Badge variant="secondary">€380,000</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Technology Adoption Timeline</span>
                                      <Badge variant="secondary">3-5 years</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Competitive Disadvantage Risk</span>
                                      <Badge variant="default">Medium</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="tech-strategy">Technology Transition Strategy</Label>
                                <Textarea
                                  id="tech-strategy"
                                  defaultValue="Proactive monitoring of emerging technologies in agriculture and food production. Investment in precision agriculture and renewable energy systems to reduce transition risks. Partnership strategy with technology providers to ensure early access to climate-friendly innovations. Regular assessment of existing technology portfolio for stranded asset risks."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="market-risks">
                          <AccordionTrigger>Market and Economic Risks</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="demand-shifts">Consumer Demand Shifts</Label>
                                <Textarea
                                  id="demand-shifts"
                                  defaultValue="Increasing consumer preference for sustainable and climate-friendly products. Risk of demand reduction for conventional agricultural products. Opportunity for premium positioning of organic and regenerative products. Need for product portfolio diversification to meet changing consumer expectations."
                                  rows={3}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Supply Chain Risks</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Input Cost Volatility</span>
                                      <Badge variant="destructive">High</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Supplier Climate Readiness</span>
                                      <Badge variant="secondary">Mixed</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Transport Cost Increases</span>
                                      <Badge variant="default">Medium</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Alternative Sourcing Needs</span>
                                      <Badge variant="secondary">Medium</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Financial Market Risks</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Green Finance Access</span>
                                      <Badge variant="default">Opportunity</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">ESG Performance Impact</span>
                                      <Badge variant="default">High</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Climate Risk Disclosure</span>
                                      <Badge variant="secondary">Required</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Insurance Cost Changes</span>
                                      <Badge variant="destructive">Increasing</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="reputation-risks">
                          <AccordionTrigger>Reputation and Stakeholder Risks</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="reputation-assessment">Reputation Risk Assessment</Label>
                                <Textarea
                                  id="reputation-assessment"
                                  defaultValue="Climate performance increasingly important for brand reputation and stakeholder trust. Risk of negative perception if climate commitments are not met or if climate impacts are not adequately managed. Opportunity for competitive advantage through climate leadership and transparent reporting."
                                  rows={3}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Stakeholder Group</TableHead>
                                    <TableHead>Key Concerns</TableHead>
                                    <TableHead>Impact Level</TableHead>
                                    <TableHead>Engagement Status</TableHead>
                                    <TableHead>Mitigation Priority</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Customers & Retailers</TableCell>
                                    <TableCell>Climate footprint, sustainable sourcing</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Critical</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Investors</TableCell>
                                    <TableCell>Climate risk management, TCFD compliance</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Active</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Local Communities</TableCell>
                                    <TableCell>Environmental impact, resilience</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Moderate</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">NGOs & Activists</TableCell>
                                    <TableCell>Climate commitments, transparency</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Limited</Badge>
                                    </TableCell>
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

                {/* Adaptation Actions Tab */}
                <TabsContent value="adaptation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Climate Adaptation Strategy and Actions</CardTitle>
                      <CardDescription>
                        Comprehensive adaptation measures, investment planning, and implementation monitoring
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Adaptation Progress Overview</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Physical Infrastructure (85% complete)</Label>
                                  <span className="text-sm font-medium">17/20 actions</span>
                                </div>
                                <Progress value={85} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Agricultural Adaptation (72% complete)</Label>
                                  <span className="text-sm font-medium">13/18 actions</span>
                                </div>
                                <Progress value={72} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Technology & Systems (60% complete)</Label>
                                  <span className="text-sm font-medium">9/15 actions</span>
                                </div>
                                <Progress value={60} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Business Continuity (88% complete)</Label>
                                  <span className="text-sm font-medium">7/8 actions</span>
                                </div>
                                <Progress value={88} className="w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Investment Summary</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Total Adaptation Investment</span>
                                <Badge variant="default">€2.8M</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Committed to Date</span>
                                <Badge variant="secondary">€1.9M</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Government Grants Received</span>
                                <Badge variant="default">€650K</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Expected ROI</span>
                                <Badge variant="default">4.2:1</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Risk Reduction Value</span>
                                <Badge variant="default">€8.5M</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="infrastructure-adaptation">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Map className="h-4 w-4" />
                              Infrastructure Adaptation Measures
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Adaptation Measure</TableHead>
                                    <TableHead>Target Risk</TableHead>
                                    <TableHead>Investment</TableHead>
                                    <TableHead>Timeline</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Effectiveness</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Flood Protection Barriers</TableCell>
                                    <TableCell>Extreme Flooding</TableCell>
                                    <TableCell>€480,000</TableCell>
                                    <TableCell>2024-2025</TableCell>
                                    <TableCell>
                                      <Badge variant="default">90% Complete</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Backup Power Systems</TableCell>
                                    <TableCell>Extreme Weather</TableCell>
                                    <TableCell>€220,000</TableCell>
                                    <TableCell>2024</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Complete</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Climate-Controlled Storage</TableCell>
                                    <TableCell>Heat/Temperature</TableCell>
                                    <TableCell>€350,000</TableCell>
                                    <TableCell>2024-2025</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Planned</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Enhanced Drainage Systems</TableCell>
                                    <TableCell>Flooding/Waterlogging</TableCell>
                                    <TableCell>€180,000</TableCell>
                                    <TableCell>2025</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Design Phase</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="agricultural-adaptation">
                          <AccordionTrigger>Agricultural and Operational Adaptation</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="crop-adaptation">Crop and Livestock Adaptation Strategy</Label>
                                <Textarea
                                  id="crop-adaptation"
                                  defaultValue="Implementation of climate-resilient crop varieties and drought-tolerant species. Diversification of crop rotation to build soil resilience. Introduction of heat-stress resistant livestock breeds. Development of alternative feed sources to reduce dependency on climate-sensitive crops. Implementation of precision agriculture technologies for optimal resource use."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Water Management</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Irrigation Efficiency Upgrade</span>
                                      <Badge variant="default">Complete</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Rainwater Harvesting</span>
                                      <Badge variant="default">Implemented</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Drought-Resistant Crops</span>
                                      <Badge variant="secondary">50% Converted</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Water Storage Capacity</span>
                                      <Badge variant="default">+300%</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Soil and Land Management</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Cover Crop Implementation</span>
                                      <Badge variant="default">85% Fields</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Soil Carbon Enhancement</span>
                                      <Badge variant="secondary">In Progress</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Erosion Control Measures</span>
                                      <Badge variant="default">Complete</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Regenerative Practices</span>
                                      <Badge variant="secondary">60% Adoption</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="business-continuity">
                          <AccordionTrigger>Business Continuity and Emergency Preparedness</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="continuity-planning">Business Continuity Framework</Label>
                                <Textarea
                                  id="continuity-planning"
                                  defaultValue="Comprehensive business continuity plan addressing climate-related disruptions. Emergency response protocols for extreme weather events. Supply chain diversification to reduce single-point-of-failure risks. Communication systems for crisis management. Regular drills and plan updates based on emerging climate risks."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Emergency Response</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• 24/7 monitoring systems</div>
                                      <div>• Early warning protocols</div>
                                      <div>• Emergency evacuation plans</div>
                                      <div>• Crisis communication system</div>
                                      <div>• Recovery procedures</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Supply Chain Resilience</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Supplier risk assessment</div>
                                      <div>• Alternative supplier network</div>
                                      <div>• Strategic inventory buffers</div>
                                      <div>• Local sourcing priority</div>
                                      <div>• Supply chain monitoring</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Financial Protection</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Climate risk insurance</div>
                                      <div>• Emergency fund reserves</div>
                                      <div>• Parametric insurance coverage</div>
                                      <div>• Business interruption coverage</div>
                                      <div>• Recovery financing options</div>
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

                {/* Risk Monitoring Tab */}
                <TabsContent value="monitoring" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Climate Risk Monitoring and Review</CardTitle>
                      <CardDescription>
                        Ongoing monitoring systems, performance indicators, and adaptive management processes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Monitoring Systems</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Weather Monitoring Stations</span>
                              <Badge variant="default">5 Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Climate Data Integration</span>
                              <Badge variant="default">Real-time</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Risk Dashboard Updates</span>
                              <Badge variant="secondary">Monthly</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Scenario Analysis Review</span>
                              <Badge variant="secondary">Annual</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Early Warning System</span>
                              <Badge variant="default">Operational</Badge>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Performance Indicators</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Adaptation Effectiveness Score</span>
                              <Badge variant="default">7.8/10</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Risk Reduction Achievement</span>
                              <Badge variant="default">72%</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Climate Resilience Index</span>
                              <Badge variant="secondary">6.4/10</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Emergency Response Time</span>
                              <Badge variant="default">&lt; 2 hours</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Recovery Time Objective</span>
                              <Badge variant="secondary">48 hours</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Risk Register Updates and Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Risk Category</TableHead>
                                <TableHead>Current Level</TableHead>
                                <TableHead>Trend (12 months)</TableHead>
                                <TableHead>Key Changes</TableHead>
                                <TableHead>Next Review</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Acute Physical Risks</TableCell>
                                <TableCell>
                                  <Badge variant="destructive">High</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="destructive">Increasing</Badge>
                                </TableCell>
                                <TableCell>More frequent extreme events</TableCell>
                                <TableCell>Mar 2025</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Chronic Physical Risks</TableCell>
                                <TableCell>
                                  <Badge variant="default">Medium-High</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Stable</Badge>
                                </TableCell>
                                <TableCell>Temperature projections updated</TableCell>
                                <TableCell>Jun 2025</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Policy & Legal Risks</TableCell>
                                <TableCell>
                                  <Badge variant="default">Medium-High</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="destructive">Increasing</Badge>
                                </TableCell>
                                <TableCell>New EU regulations expected</TableCell>
                                <TableCell>Feb 2025</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Technology Risks</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Medium</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="default">Improving</Badge>
                                </TableCell>
                                <TableCell>Technology adoption progress</TableCell>
                                <TableCell>May 2025</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Market Risks</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Medium</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Stable</Badge>
                                </TableCell>
                                <TableCell>Consumer preferences shifting</TableCell>
                                <TableCell>Apr 2025</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Adaptive Management Process</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="adaptive-approach">Adaptive Management Framework</Label>
                            <Textarea
                              id="adaptive-approach"
                              defaultValue="Dynamic approach to climate risk management with regular review and adjustment cycles. Integration of new climate science and projections into risk assessments. Flexibility to adjust adaptation measures based on effectiveness monitoring. Continuous learning from climate events and near-misses. Stakeholder feedback integration into risk management updates."
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="review-schedule">Review and Update Schedule</Label>
                            <Textarea
                              id="review-schedule"
                              defaultValue="• Quarterly: Operational risk monitoring and KPI review
• Semi-annual: Adaptation measure effectiveness assessment  
• Annual: Comprehensive risk register update and scenario refresh
• Ad-hoc: Response to significant climate events or policy changes
• Triennial: Full climate risk assessment with external validation"
                              rows={5}
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
            <Button>Save Risk Assessment</Button>
            <Button variant="outline">Generate TCFD Report</Button>
            <Button variant="outline">Update Risk Register</Button>
            <Button variant="outline">Export Adaptation Plan</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}