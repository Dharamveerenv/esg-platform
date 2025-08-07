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
import { Building, Target, Users, TrendingUp, Globe, Lightbulb } from "lucide-react"

export default function C1Page() {
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
                <BreadcrumbPage>C1: Business Model Strategy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Key Products/Services</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Core business lines
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Presence</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Countries served
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Key Stakeholders</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Stakeholder groups
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Strategy Alignment</CardTitle>
                <Target className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  ESG integration score
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Business Model Strategy Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Business Model and Strategy Framework</CardTitle>
              <CardDescription>
                Comprehensive analysis of business model, market position, stakeholder relationships, and sustainability strategy integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="business-model" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="business-model">Business Model</TabsTrigger>
                  <TabsTrigger value="market-analysis">Market Analysis</TabsTrigger>
                  <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                  <TabsTrigger value="sustainability">Sustainability Strategy</TabsTrigger>
                </TabsList>

                {/* Business Model Documentation Tab */}
                <TabsContent value="business-model" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Business Model Documentation</CardTitle>
                      <CardDescription>
                        Define core business model elements including products, services, value proposition, and revenue streams
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="products-services">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Products and Services Portfolio
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Core Products/Services</h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Add Product/Service</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Add Product/Service</DialogTitle>
                                      <DialogDescription>
                                        Add a new product or service to your business portfolio
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="product-name">Product/Service Name</Label>
                                          <Input
                                            id="product-name"
                                            placeholder="Enter name"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="product-category">Category</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="agricultural-products">Agricultural Products</SelectItem>
                                              <SelectItem value="food-processing">Food Processing</SelectItem>
                                              <SelectItem value="dairy-products">Dairy Products</SelectItem>
                                              <SelectItem value="meat-products">Meat Products</SelectItem>
                                              <SelectItem value="consulting-services">Consulting Services</SelectItem>
                                              <SelectItem value="technology-solutions">Technology Solutions</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="revenue-contribution">Revenue Contribution (%)</Label>
                                          <Input
                                            id="revenue-contribution"
                                            type="number"
                                            placeholder="Enter percentage"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="sustainability-rating">Sustainability Rating</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select rating" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="high">High Impact</SelectItem>
                                              <SelectItem value="medium">Medium Impact</SelectItem>
                                              <SelectItem value="low">Low Impact</SelectItem>
                                              <SelectItem value="neutral">Neutral</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="product-description">Description and Value Proposition</Label>
                                        <Textarea
                                          id="product-description"
                                          placeholder="Describe the product/service and its unique value proposition..."
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">Add to Portfolio</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product/Service</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Revenue Share</TableHead>
                                    <TableHead>Sustainability Impact</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Organic Dairy Products</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Dairy Products</Badge>
                                    </TableCell>
                                    <TableCell>45%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High Impact</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Sustainable Agriculture Consulting</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Consulting Services</Badge>
                                    </TableCell>
                                    <TableCell>25%</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High Impact</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Farm Equipment Leasing</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Technology Solutions</Badge>
                                    </TableCell>
                                    <TableCell>20%</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Medium Impact</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Organic Meat Processing</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Meat Products</Badge>
                                    </TableCell>
                                    <TableCell>10%</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Medium Impact</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="value-proposition">
                          <AccordionTrigger>Value Proposition and Competitive Advantage</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="unique-value-prop">Unique Value Proposition</Label>
                                <Textarea
                                  id="unique-value-prop"
                                  defaultValue="We provide premium organic agricultural products and sustainable farming solutions that help customers reduce environmental impact while maintaining high quality and profitability. Our integrated approach combines traditional farming wisdom with modern sustainable practices."
                                  rows={4}
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="competitive-advantages">Key Competitive Advantages</Label>
                                  <Textarea
                                    id="competitive-advantages"
                                    defaultValue="• 25+ years of organic farming expertise
• Certified organic and sustainable farming practices
• Direct relationships with premium retailers
• Proprietary sustainable farming technology
• Strong brand reputation for quality and sustainability
• Integrated supply chain from farm to consumer"
                                    rows={6}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="target-customers">Target Customer Segments</Label>
                                  <Textarea
                                    id="target-customers"
                                    defaultValue="• Premium organic food retailers
• Health-conscious consumers
• Restaurants focusing on sustainable ingredients
• Other farmers seeking sustainable practices
• Food processors requiring organic inputs
• Export markets in Europe and North America"
                                    rows={6}
                                  />
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="revenue-model">
                          <AccordionTrigger>Revenue Model and Key Resources</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Revenue Streams</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-sm">Product Sales</span>
                                        <span className="text-sm font-medium">65%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm">Consulting Services</span>
                                        <span className="text-sm font-medium">20%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm">Equipment Leasing</span>
                                        <span className="text-sm font-medium">10%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm">Training & Certification</span>
                                        <span className="text-sm font-medium">5%</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Key Resources & Capabilities</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Certified Organic Farmland</span>
                                        <Badge variant="default">500 hectares</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Processing Facilities</span>
                                        <Badge variant="default">3 locations</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Technical Expertise</span>
                                        <Badge variant="default">High</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Distribution Network</span>
                                        <Badge variant="secondary">Regional</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Brand Recognition</span>
                                        <Badge variant="default">Strong</Badge>
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

                {/* Market Analysis Tab */}
                <TabsContent value="market-analysis" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Market Analysis and Positioning</CardTitle>
                      <CardDescription>
                        Comprehensive analysis of market dynamics, competitive landscape, and growth opportunities
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Market Description</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="market-size">Total Addressable Market Size</Label>
                              <Input
                                id="market-size"
                                defaultValue="€2.5 billion (Ireland organic food market)"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="market-growth">Annual Growth Rate</Label>
                              <Input
                                id="market-growth"
                                defaultValue="8.5% CAGR"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="market-share">Current Market Share</Label>
                              <Input
                                id="market-share"
                                defaultValue="3.2% (regional market)"
                              />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Geographic Presence</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Region/Country</TableHead>
                                  <TableHead>Market Presence</TableHead>
                                  <TableHead>Revenue Share</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Ireland (Domestic)</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Strong</Badge>
                                  </TableCell>
                                  <TableCell>70%</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>United Kingdom</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Growing</Badge>
                                  </TableCell>
                                  <TableCell>20%</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Other EU Markets</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">Limited</Badge>
                                  </TableCell>
                                  <TableCell>10%</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Competitive Landscape Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="main-competitors">Main Competitors</Label>
                              <Textarea
                                id="main-competitors"
                                defaultValue="1. Glenisk Organic Foods - Market leader in organic dairy
2. Organic Trust certified farms - Various regional players
3. International organic brands - Imported premium products
4. Traditional agriculture companies - Expanding into organic
5. Direct-to-consumer organic farms - Growing niche players"
                                rows={5}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="competitive-analysis">Competitive Advantages vs. Competitors</Label>
                              <Textarea
                                id="competitive-analysis"
                                defaultValue="Strengths:
• Higher sustainability standards than most competitors
• Integrated farm-to-table approach
• Strong local relationships and brand trust
• Expertise in both production and consulting
• Lower transportation costs due to local sourcing

Opportunities:
• Expanding into new geographic markets
• Developing new sustainable product lines
• Leveraging technology for precision agriculture
• Building partnerships with international distributors"
                                rows={8}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Customer Segment Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Customer Segment</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Growth Rate</TableHead>
                                <TableHead>Profitability</TableHead>
                                <TableHead>Strategic Priority</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Premium Retailers</TableCell>
                                <TableCell>Large</TableCell>
                                <TableCell>
                                  <Badge variant="default">High (12%)</Badge>
                                </TableCell>
                                <TableCell>High</TableCell>
                                <TableCell>
                                  <Badge variant="default">Primary</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Restaurants & Hospitality</TableCell>
                                <TableCell>Medium</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Medium (6%)</Badge>
                                </TableCell>
                                <TableCell>Medium</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Secondary</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Direct Consumers</TableCell>
                                <TableCell>Growing</TableCell>
                                <TableCell>
                                  <Badge variant="default">High (15%)</Badge>
                                </TableCell>
                                <TableCell>Very High</TableCell>
                                <TableCell>
                                  <Badge variant="default">Primary</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>B2B Agricultural Services</TableCell>
                                <TableCell>Medium</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Medium (8%)</Badge>
                                </TableCell>
                                <TableCell>High</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">Secondary</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Stakeholder Relationships Tab */}
                <TabsContent value="stakeholders" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Business Relationships and Stakeholder Mapping</CardTitle>
                      <CardDescription>
                        Key stakeholder identification, engagement strategies, and relationship management
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Primary Stakeholders</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Customers</span>
                                <Badge variant="default">High Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Employees</span>
                                <Badge variant="default">High Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Suppliers</span>
                                <Badge variant="secondary">Medium Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Investors/Owners</span>
                                <Badge variant="default">High Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Local Communities</span>
                                <Badge variant="secondary">Medium Influence</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Secondary Stakeholders</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Regulatory Bodies</span>
                                <Badge variant="secondary">Medium Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Industry Associations</span>
                                <Badge variant="outline">Low Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Environmental Groups</span>
                                <Badge variant="secondary">Medium Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Academic Institutions</span>
                                <Badge variant="outline">Low Influence</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Media</span>
                                <Badge variant="outline">Low Influence</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Key Partnership Documentation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Strategic Partnerships</h4>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button>Add Partnership</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Add Strategic Partnership</DialogTitle>
                                    <DialogDescription>
                                      Document a key business partnership or collaboration
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="partner-name">Partner Name</Label>
                                        <Input
                                          id="partner-name"
                                          placeholder="Enter partner organization"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="partnership-type">Partnership Type</Label>
                                        <Select>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="supplier">Supplier Partnership</SelectItem>
                                            <SelectItem value="distributor">Distribution Partnership</SelectItem>
                                            <SelectItem value="technology">Technology Partnership</SelectItem>
                                            <SelectItem value="research">Research Collaboration</SelectItem>
                                            <SelectItem value="joint-venture">Joint Venture</SelectItem>
                                            <SelectItem value="strategic-alliance">Strategic Alliance</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="sustainability-criteria">Sustainability Criteria</Label>
                                        <Select>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select criteria" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="high">High Sustainability Standards</SelectItem>
                                            <SelectItem value="medium">Medium Sustainability Standards</SelectItem>
                                            <SelectItem value="basic">Basic Sustainability Standards</SelectItem>
                                            <SelectItem value="improving">Improving Sustainability</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="partnership-start">Partnership Start Date</Label>
                                        <Input
                                          id="partnership-start"
                                          type="date"
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="partnership-description">Partnership Description and Objectives</Label>
                                      <Textarea
                                        id="partnership-description"
                                        placeholder="Describe the partnership, its objectives, and mutual benefits..."
                                      />
                                    </div>
                                    <Button type="submit" className="w-full">Add Partnership</Button>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </div>

                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Partner</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Sustainability Rating</TableHead>
                                  <TableHead>Duration</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">SuperValu Premium</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Distribution Partnership</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="default">High Standards</Badge>
                                  </TableCell>
                                  <TableCell>5 years</TableCell>
                                  <TableCell>
                                    <Button variant="outline" size="sm">View</Button>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Teagasc Research</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Research Collaboration</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="default">High Standards</Badge>
                                  </TableCell>
                                  <TableCell>3 years</TableCell>
                                  <TableCell>
                                    <Button variant="outline" size="sm">View</Button>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Local Organic Farmers Cooperative</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Supplier Partnership</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="default">High Standards</Badge>
                                  </TableCell>
                                  <TableCell>Ongoing</TableCell>
                                  <TableCell>
                                    <Button variant="outline" size="sm">View</Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Stakeholder Engagement Strategy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="engagement-approach">Overall Engagement Approach</Label>
                              <Textarea
                                id="engagement-approach"
                                defaultValue="Our stakeholder engagement strategy focuses on transparent communication, collaborative decision-making, and shared value creation. We prioritize regular dialogue with high-influence stakeholders and maintain open channels for feedback and concerns."
                                rows={4}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="engagement-activities">Key Engagement Activities</Label>
                              <Textarea
                                id="engagement-activities"
                                defaultValue="• Quarterly customer advisory panels
• Annual employee sustainability surveys
• Monthly supplier sustainability assessments
• Bi-annual community impact meetings
• Regular regulatory compliance consultations
• Ongoing collaboration with research institutions
• Social media and digital engagement programs"
                                rows={7}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Sustainability Strategy Tab */}
                <TabsContent value="sustainability" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sustainability Strategy Integration</CardTitle>
                      <CardDescription>
                        Comprehensive integration of sustainability objectives with business strategy and operations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="sustainability-objectives">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              Sustainability Objectives and Targets
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="sustainability-vision">Sustainability Vision Statement</Label>
                                <Textarea
                                  id="sustainability-vision"
                                  defaultValue="To be Ireland's leading sustainable agriculture company, demonstrating that environmental stewardship, social responsibility, and economic prosperity can work hand in hand to create lasting value for all stakeholders."
                                  rows={3}
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Environmental Objectives</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="space-y-2">
                                        <Label className="text-sm">Carbon Neutrality by 2030</Label>
                                        <div className="flex items-center gap-2">
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                                          </div>
                                          <span className="text-sm">65%</span>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm">Zero Waste to Landfill by 2025</Label>
                                        <div className="flex items-center gap-2">
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                                          </div>
                                          <span className="text-sm">80%</span>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm">50% Reduction in Water Usage</Label>
                                        <div className="flex items-center gap-2">
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{width: '35%'}}></div>
                                          </div>
                                          <span className="text-sm">35%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Social and Governance Objectives</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="space-y-2">
                                        <Label className="text-sm">Living Wage for All Employees</Label>
                                        <div className="flex items-center gap-2">
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                                          </div>
                                          <span className="text-sm">100%</span>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm">40% Female Leadership by 2026</Label>
                                        <div className="flex items-center gap-2">
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{width: '32%'}}></div>
                                          </div>
                                          <span className="text-sm">32%</span>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm">100% Ethical Supply Chain</Label>
                                        <div className="flex items-center gap-2">
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                                          </div>
                                          <span className="text-sm">85%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="material-topics">
                          <AccordionTrigger>Material Topics Identification and Prioritization</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Material Topic</TableHead>
                                    <TableHead>Business Impact</TableHead>
                                    <TableHead>Stakeholder Importance</TableHead>
                                    <TableHead>Priority Level</TableHead>
                                    <TableHead>Current Performance</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Climate Change & GHG Emissions</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Critical</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Sustainable Agriculture Practices</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Critical</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Water Management</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Employee Well-being</TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Very High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Supply Chain Ethics</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="default">High</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="governance-structure">
                          <AccordionTrigger>Sustainability Governance Structure</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Governance Structure</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Board-level ESG Oversight</span>
                                        <Badge variant="default">Established</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Sustainability Committee</span>
                                        <Badge variant="default">Active</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Chief Sustainability Officer</span>
                                        <Badge variant="secondary">Planned 2024</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">ESG Reporting Framework</span>
                                        <Badge variant="default">Implemented</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">External ESG Advisory</span>
                                        <Badge variant="default">Engaged</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Performance Measurement</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">KPI Dashboard</span>
                                        <Badge variant="default">Live</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Monthly ESG Reporting</span>
                                        <Badge variant="default">Implemented</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Third-party Verification</span>
                                        <Badge variant="default">Annual</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Stakeholder Surveys</span>
                                        <Badge variant="secondary">Bi-annual</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Public ESG Disclosure</span>
                                        <Badge variant="default">Annual</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="governance-description">Sustainability Governance Framework Description</Label>
                                <Textarea
                                  id="governance-description"
                                  defaultValue="Our sustainability governance framework ensures ESG considerations are integrated into all business decisions. The Board of Directors maintains ultimate oversight, with quarterly reviews of sustainability performance. The Sustainability Committee, comprising senior executives from all business units, meets monthly to track progress, address challenges, and identify opportunities. All department heads have sustainability KPIs integrated into their performance objectives, ensuring accountability throughout the organization."
                                  rows={5}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="performance-framework">
                          <AccordionTrigger>Performance Measurement Framework</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="measurement-approach">Performance Measurement Approach</Label>
                                <Textarea
                                  id="measurement-approach"
                                  defaultValue="We employ a comprehensive measurement framework aligned with global standards including GRI, SASB, and TCFD. Our approach combines quantitative metrics with qualitative assessments, ensuring we capture both the numerical performance and the contextual factors that drive sustainable outcomes. Regular benchmarking against industry peers and continuous improvement processes ensure our framework remains relevant and effective."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Environmental KPIs</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• GHG emissions (Scope 1,2,3)</div>
                                      <div>• Energy consumption & efficiency</div>
                                      <div>• Water usage & quality</div>
                                      <div>• Waste generation & diversion</div>
                                      <div>• Biodiversity impact metrics</div>
                                      <div>• Land use efficiency</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Social KPIs</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Employee satisfaction & retention</div>
                                      <div>• Diversity & inclusion metrics</div>
                                      <div>• Health & safety performance</div>
                                      <div>• Training & development hours</div>
                                      <div>• Community investment</div>
                                      <div>• Customer satisfaction</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Governance KPIs</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Board diversity & independence</div>
                                      <div>• Ethics training completion</div>
                                      <div>• Supply chain compliance</div>
                                      <div>• Data privacy & security</div>
                                      <div>• Transparency & disclosure</div>
                                      <div>• Stakeholder engagement</div>
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
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save Business Strategy Data</Button>
            <Button variant="outline">Generate Strategy Report</Button>
            <Button variant="outline">Update Stakeholder Registry</Button>
            <Button variant="outline">Export Business Model</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}