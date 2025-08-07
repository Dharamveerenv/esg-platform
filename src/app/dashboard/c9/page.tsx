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
import { Users, Crown, Award, TrendingUp, Target, UserCheck } from "lucide-react"

export default function C9Page() {
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
                <BreadcrumbPage>C9: Governance Gender Diversity</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Board Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  Total board size
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Female Directors</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  43% representation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Independence Rate</CardTitle>
                <Crown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">71%</div>
                <p className="text-xs text-muted-foreground">
                  Independent directors
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Effectiveness Score</CardTitle>
                <Award className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7</div>
                <p className="text-xs text-muted-foreground">
                  Out of 10
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Governance Gender Diversity Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Governance Gender Diversity and Board Effectiveness</CardTitle>
              <CardDescription>
                Comprehensive analysis of governing body composition, diversity metrics, and governance effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="composition" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="composition">Board Composition</TabsTrigger>
                  <TabsTrigger value="effectiveness">Governance Effectiveness</TabsTrigger>
                  <TabsTrigger value="development">Leadership Development</TabsTrigger>
                  <TabsTrigger value="performance">Performance Monitoring</TabsTrigger>
                </TabsList>

                {/* Board Composition Tab */}
                <TabsContent value="composition" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Governing Body Composition Analysis</CardTitle>
                      <CardDescription>
                        Detailed analysis of board demographics, diversity ratios, and skills matrix
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Gender Diversity Overview</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Female Representation (43%)</Label>
                                  <span className="text-sm font-medium">3 of 7 directors</span>
                                </div>
                                <Progress value={43} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Target Achievement (43% vs 40%)</Label>
                                  <span className="text-sm font-medium">Target exceeded</span>
                                </div>
                                <Progress value={107} className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label className="text-sm">Independence Rate (71%)</Label>
                                  <span className="text-sm font-medium">5 of 7 directors</span>
                                </div>
                                <Progress value={71} className="w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Diversity Trends</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">2024 Female Representation</span>
                                <Badge variant="default">43%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">2023 Female Representation</span>
                                <Badge variant="secondary">29%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">3-Year Trend</span>
                                <Badge variant="default">+14pp</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Industry Benchmark</span>
                                <Badge variant="secondary">35%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Best Practice Target</span>
                                <Badge variant="outline">50%</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="board-members">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Board Member Demographics and Tenure
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Current Board Composition</h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Add Board Member</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Add New Board Member</DialogTitle>
                                      <DialogDescription>
                                        Add a new board member with demographic and expertise information
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="member-name">Full Name</Label>
                                          <Input
                                            id="member-name"
                                            placeholder="Enter full name"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="member-position">Board Position</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select position" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="chair">Board Chair</SelectItem>
                                              <SelectItem value="vice-chair">Vice Chair</SelectItem>
                                              <SelectItem value="independent">Independent Director</SelectItem>
                                              <SelectItem value="executive">Executive Director</SelectItem>
                                              <SelectItem value="non-executive">Non-Executive Director</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="member-gender">Gender</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="male">Male</SelectItem>
                                              <SelectItem value="female">Female</SelectItem>
                                              <SelectItem value="other">Other</SelectItem>
                                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="appointment-date">Appointment Date</Label>
                                          <Input
                                            id="appointment-date"
                                            type="date"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="independence-status">Independence Status</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="independent">Independent</SelectItem>
                                              <SelectItem value="non-independent">Non-Independent</SelectItem>
                                              <SelectItem value="executive">Executive</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="age-range">Age Range</Label>
                                          <Select>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="30-40">30-40</SelectItem>
                                              <SelectItem value="41-50">41-50</SelectItem>
                                              <SelectItem value="51-60">51-60</SelectItem>
                                              <SelectItem value="61-70">61-70</SelectItem>
                                              <SelectItem value="over-70">Over 70</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="expertise-areas">Key Expertise Areas</Label>
                                        <Textarea
                                          id="expertise-areas"
                                          placeholder="List key expertise areas, experience, and qualifications..."
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">Add Board Member</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Tenure</TableHead>
                                    <TableHead>Independence</TableHead>
                                    <TableHead>Key Expertise</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">John O&apos;Sullivan</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Board Chair</Badge>
                                    </TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>8 years</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Non-Independent</Badge>
                                    </TableCell>
                                    <TableCell>Agriculture, Strategy</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Mary Catherine Walsh</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent Director</Badge>
                                    </TableCell>
                                    <TableCell>Female</TableCell>
                                    <TableCell>3 years</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent</Badge>
                                    </TableCell>
                                    <TableCell>Finance, ESG</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Sarah Murphy</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent Director</Badge>
                                    </TableCell>
                                    <TableCell>Female</TableCell>
                                    <TableCell>2 years</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent</Badge>
                                    </TableCell>
                                    <TableCell>Marketing, Digital</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Michael Ryan</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Executive Director</Badge>
                                    </TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>12 years</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Executive</Badge>
                                    </TableCell>
                                    <TableCell>Operations, Agriculture</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Patricia Kennedy</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent Director</Badge>
                                    </TableCell>
                                    <TableCell>Female</TableCell>
                                    <TableCell>1 year</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent</Badge>
                                    </TableCell>
                                    <TableCell>Legal, Compliance</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">David Collins</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent Director</Badge>
                                    </TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>4 years</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent</Badge>
                                    </TableCell>
                                    <TableCell>Technology, Innovation</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">James O&apos;Brien</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent Director</Badge>
                                    </TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>6 years</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Independent</Badge>
                                    </TableCell>
                                    <TableCell>Finance, Risk</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="skills-matrix">
                          <AccordionTrigger>Skills Matrix and Experience Mapping</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="skills-overview">Board Skills and Experience Overview</Label>
                                <Textarea
                                  id="skills-overview"
                                  defaultValue="Our board combines deep industry expertise with diverse professional backgrounds spanning agriculture, finance, technology, legal, marketing, and ESG. The skills matrix ensures comprehensive coverage of critical areas while identifying development opportunities. Regular assessment confirms alignment with strategic needs and industry evolution."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Skill/Experience Area</TableHead>
                                    <TableHead>Required Level</TableHead>
                                    <TableHead>Current Coverage</TableHead>
                                    <TableHead>Board Members</TableHead>
                                    <TableHead>Gap Assessment</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Agriculture & Food Industry</TableCell>
                                    <TableCell>Expert</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Strong</Badge>
                                    </TableCell>
                                    <TableCell>3 members</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Adequate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Financial Management</TableCell>
                                    <TableCell>Expert</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Strong</Badge>
                                    </TableCell>
                                    <TableCell>2 members</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Adequate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">ESG & Sustainability</TableCell>
                                    <TableCell>Advanced</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Moderate</Badge>
                                    </TableCell>
                                    <TableCell>1 member</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Development Needed</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Technology & Digital</TableCell>
                                    <TableCell>Advanced</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Moderate</Badge>
                                    </TableCell>
                                    <TableCell>2 members</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Adequate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Legal & Regulatory</TableCell>
                                    <TableCell>Advanced</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Strong</Badge>
                                    </TableCell>
                                    <TableCell>1 member</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Adequate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Risk Management</TableCell>
                                    <TableCell>Advanced</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Strong</Badge>
                                    </TableCell>
                                    <TableCell>2 members</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Adequate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Marketing & Branding</TableCell>
                                    <TableCell>Intermediate</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Moderate</Badge>
                                    </TableCell>
                                    <TableCell>1 member</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Adequate</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">International Markets</TableCell>
                                    <TableCell>Intermediate</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Limited</Badge>
                                    </TableCell>
                                    <TableCell>0 members</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">Significant Gap</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="diversity-targets">
                          <AccordionTrigger>Diversity Targets and Progress</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Current Diversity Targets</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label className="text-sm">40% Female Directors by 2025</Label>
                                          <span className="text-sm font-medium">43% achieved</span>
                                        </div>
                                        <Progress value={107} className="w-full" />
                                        <p className="text-xs text-green-600">Target exceeded ahead of schedule</p>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label className="text-sm">50% Female Directors by 2027</Label>
                                          <span className="text-sm font-medium">43% progress</span>
                                        </div>
                                        <Progress value={86} className="w-full" />
                                        <p className="text-xs text-blue-600">On track for achievement</p>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label className="text-sm">Age Diversity &lt; 60 avg by 2026</Label>
                                          <span className="text-sm font-medium">58 years current</span>
                                        </div>
                                        <Progress value={75} className="w-full" />
                                        <p className="text-xs text-blue-600">Good progress toward target</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Additional Diversity Dimensions</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Average Age</span>
                                        <Badge variant="secondary">58 years</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Age Range</span>
                                        <Badge variant="secondary">42-68 years</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">International Experience</span>
                                        <Badge variant="outline">29% (2 members)</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">Different Ethnic Backgrounds</span>
                                        <Badge variant="outline">14% (1 member)</Badge>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm">University Education</span>
                                        <Badge variant="default">100%</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="diversity-strategy">Board Diversity Strategy</Label>
                                <Textarea
                                  id="diversity-strategy"
                                  defaultValue="Our board diversity strategy goes beyond gender to include age, experience, skills, and backgrounds. We seek directors who bring different perspectives, experiences, and capabilities that enhance board effectiveness. The nomination process actively considers diversity criteria while prioritizing qualifications and fit. Regular assessment ensures our diversity efforts translate into improved governance outcomes."
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

                {/* Governance Effectiveness Tab */}
                <TabsContent value="effectiveness" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Governance Effectiveness Assessment</CardTitle>
                      <CardDescription>
                        Comprehensive evaluation of board performance, processes, and governance effectiveness
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Board Performance Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Overall Effectiveness Score</span>
                                <Badge variant="default">8.7/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Meeting Attendance Rate</span>
                                <Badge variant="default">96%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Decision-Making Quality</span>
                                <Badge variant="default">9.1/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Strategic Oversight</span>
                                <Badge variant="default">8.5/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Risk Management Oversight</span>
                                <Badge variant="secondary">8.2/10</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Governance Processes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Board Evaluation Process</span>
                                <Badge variant="default">Annual</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Committee Structure</span>
                                <Badge variant="default">4 committees</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Director Induction Program</span>
                                <Badge variant="default">Comprehensive</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Continuing Education</span>
                                <Badge variant="default">Regular</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Succession Planning</span>
                                <Badge variant="secondary">In Development</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="board-evaluation">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4" />
                              Board Evaluation Process
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="evaluation-process">Board Evaluation Methodology</Label>
                                <Textarea
                                  id="evaluation-process"
                                  defaultValue="Annual comprehensive board evaluation conducted by external facilitator every three years, with internal evaluation in intervening years. Process includes board effectiveness survey, individual director assessments, committee evaluations, and stakeholder feedback. Results inform development planning, process improvements, and succession planning."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Evaluation Area</TableHead>
                                    <TableHead>2024 Score</TableHead>
                                    <TableHead>2023 Score</TableHead>
                                    <TableHead>Trend</TableHead>
                                    <TableHead>Key Improvements</TableHead>
                                    <TableHead>Priority Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Board Dynamics</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.9/10</Badge>
                                    </TableCell>
                                    <TableCell>8.1/10</TableCell>
                                    <TableCell>
                                      <Badge variant="default">+0.8</Badge>
                                    </TableCell>
                                    <TableCell>Improved diversity, communication</TableCell>
                                    <TableCell>Maintain momentum</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Strategic Oversight</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.5/10</Badge>
                                    </TableCell>
                                    <TableCell>8.3/10</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">+0.2</Badge>
                                    </TableCell>
                                    <TableCell>ESG integration, long-term focus</TableCell>
                                    <TableCell>Digital strategy focus</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Risk Management</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">8.2/10</Badge>
                                    </TableCell>
                                    <TableCell>7.8/10</TableCell>
                                    <TableCell>
                                      <Badge variant="default">+0.4</Badge>
                                    </TableCell>
                                    <TableCell>Enhanced climate risk oversight</TableCell>
                                    <TableCell>Cyber risk capabilities</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Stakeholder Engagement</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.8/10</Badge>
                                    </TableCell>
                                    <TableCell>8.0/10</TableCell>
                                    <TableCell>
                                      <Badge variant="default">+0.8</Badge>
                                    </TableCell>
                                    <TableCell>Improved investor relations</TableCell>
                                    <TableCell>Community engagement</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Performance Monitoring</TableCell>
                                    <TableCell>
                                      <Badge variant="default">8.6/10</Badge>
                                    </TableCell>
                                    <TableCell>8.4/10</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">+0.2</Badge>
                                    </TableCell>
                                    <TableCell>Better KPI dashboard</TableCell>
                                    <TableCell>ESG metrics integration</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="committee-structure">
                          <AccordionTrigger>Committee Structure and Effectiveness</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Board Committees</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Audit Committee</span>
                                      <Badge variant="default">3 members</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Nomination & Remuneration</span>
                                      <Badge variant="default">3 members</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Risk & Sustainability</span>
                                      <Badge variant="default">4 members</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Strategy Committee</span>
                                      <Badge variant="secondary">5 members</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Committee Performance</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Audit Committee</span>
                                      <Badge variant="default">9.2/10</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Nomination & Remuneration</span>
                                      <Badge variant="default">8.5/10</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Risk & Sustainability</span>
                                      <Badge variant="default">8.8/10</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Strategy Committee</span>
                                      <Badge variant="secondary">8.1/10</Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Committee</TableHead>
                                    <TableHead>Chair</TableHead>
                                    <TableHead>Female Representation</TableHead>
                                    <TableHead>Key Responsibilities</TableHead>
                                    <TableHead>Meeting Frequency</TableHead>
                                    <TableHead>Effectiveness</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Audit Committee</TableCell>
                                    <TableCell>James O&apos;Brien (M)</TableCell>
                                    <TableCell>
                                      <Badge variant="default">67% (2/3)</Badge>
                                    </TableCell>
                                    <TableCell>Financial oversight, external audit</TableCell>
                                    <TableCell>Quarterly</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Nomination & Remuneration</TableCell>
                                    <TableCell>Mary Catherine Walsh (F)</TableCell>
                                    <TableCell>
                                      <Badge variant="default">67% (2/3)</Badge>
                                    </TableCell>
                                    <TableCell>Board composition, compensation</TableCell>
                                    <TableCell>Bi-annual</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Very Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Risk & Sustainability</TableCell>
                                    <TableCell>Patricia Kennedy (F)</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">50% (2/4)</Badge>
                                    </TableCell>
                                    <TableCell>Risk oversight, ESG governance</TableCell>
                                    <TableCell>Quarterly</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Strategy Committee</TableCell>
                                    <TableCell>John O&apos;Sullivan (M)</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">40% (2/5)</Badge>
                                    </TableCell>
                                    <TableCell>Strategic planning, M&A</TableCell>
                                    <TableCell>Bi-annual</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="nomination-process">
                          <AccordionTrigger>Nomination and Selection Process</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="nomination-process">Director Nomination Process</Label>
                                <Textarea
                                  id="nomination-process"
                                  defaultValue="Structured nomination process led by Nomination & Remuneration Committee with focus on skills, diversity, and cultural fit. Use of external search consultants for director identification. Comprehensive due diligence including background checks, reference verification, and competency assessment. Board diversity policy guides all nomination decisions while maintaining merit-based selection."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Selection Criteria</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Relevant industry experience</div>
                                      <div>• Leadership and governance experience</div>
                                      <div>• Strategic thinking capabilities</div>
                                      <div>• Cultural fit and values alignment</div>
                                      <div>• Diversity of background and perspective</div>
                                      <div>• Time commitment and availability</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Diversity Considerations</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Gender diversity targets</div>
                                      <div>• Age and tenure balance</div>
                                      <div>• Professional background diversity</div>
                                      <div>• Geographic and cultural diversity</div>
                                      <div>• Skills and expertise gaps</div>
                                      <div>• Independence requirements</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Evaluation Process</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="space-y-2">
                                      <div>• Initial screening by search firm</div>
                                      <div>• Committee interview process</div>
                                      <div>• Board member meetings</div>
                                      <div>• Due diligence and references</div>
                                      <div>• Board recommendation</div>
                                      <div>• Shareholder approval</div>
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

                {/* Leadership Development Tab */}
                <TabsContent value="development" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Board Leadership Development</CardTitle>
                      <CardDescription>
                        Comprehensive development programs for current and future board leaders
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Director Development Program</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Onboarding Program</span>
                                <Badge variant="default">Comprehensive</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Continuing Education</span>
                                <Badge variant="default">Quarterly</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">External Programs</span>
                                <Badge variant="secondary">Annual</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Industry Conferences</span>
                                <Badge variant="default">Regular</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Skills Assessment</span>
                                <Badge variant="secondary">Bi-annual</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Development Investment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Annual Budget</span>
                                <Badge variant="default">€45,000</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Per Director Allocation</span>
                                <Badge variant="secondary">€6,400</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">External Programs</span>
                                <Badge variant="secondary">€28,000</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Internal Development</span>
                                <Badge variant="secondary">€17,000</Badge>
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
                              Board Succession Planning
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="succession-strategy">Board Succession Strategy</Label>
                                <Textarea
                                  id="succession-strategy"
                                  defaultValue="Proactive succession planning ensures board continuity and diversity. Annual review of director tenure, retirement planning, and skills evolution needs. Pipeline development through advisory roles, committee participation, and mentorship programs. Focus on diversity objectives while maintaining board effectiveness and institutional knowledge."
                                  rows={4}
                                />
                              </div>

                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Director</TableHead>
                                    <TableHead>Current Tenure</TableHead>
                                    <TableHead>Planned Retirement</TableHead>
                                    <TableHead>Succession Priority</TableHead>
                                    <TableHead>Skills to Replace</TableHead>
                                    <TableHead>Diversity Target</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">John O&apos;Sullivan</TableCell>
                                    <TableCell>8 years</TableCell>
                                    <TableCell>2027</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">High</Badge>
                                    </TableCell>
                                    <TableCell>Agriculture, Leadership</TableCell>
                                    <TableCell>Maintain diversity</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Michael Ryan</TableCell>
                                    <TableCell>12 years</TableCell>
                                    <TableCell>2026</TableCell>
                                    <TableCell>
                                      <Badge variant="destructive">High</Badge>
                                    </TableCell>
                                    <TableCell>Operations, Agriculture</TableCell>
                                    <TableCell>Female candidate preferred</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">James O&apos;Brien</TableCell>
                                    <TableCell>6 years</TableCell>
                                    <TableCell>2029</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Medium</Badge>
                                    </TableCell>
                                    <TableCell>Finance, Risk</TableCell>
                                    <TableCell>Open to diversity</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">David Collins</TableCell>
                                    <TableCell>4 years</TableCell>
                                    <TableCell>2030+</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">Low</Badge>
                                    </TableCell>
                                    <TableCell>Technology, Innovation</TableCell>
                                    <TableCell>Continue development</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="development-programs">
                          <AccordionTrigger>Development Programs and Training</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Program</TableHead>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead>Participants</TableHead>
                                    <TableHead>Focus Areas</TableHead>
                                    <TableHead>Provider</TableHead>
                                    <TableHead>Effectiveness</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Director Induction</TableCell>
                                    <TableCell>As needed</TableCell>
                                    <TableCell>New directors</TableCell>
                                    <TableCell>Governance, industry, culture</TableCell>
                                    <TableCell>Internal + External</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">ESG Governance Program</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>All directors</TableCell>
                                    <TableCell>ESG oversight, climate risks</TableCell>
                                    <TableCell>External Expert</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Very Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Digital Transformation</TableCell>
                                    <TableCell>Bi-annual</TableCell>
                                    <TableCell>Selected directors</TableCell>
                                    <TableCell>Technology, digital strategy</TableCell>
                                    <TableCell>Consultant</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary">Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Financial Literacy</TableCell>
                                    <TableCell>As needed</TableCell>
                                    <TableCell>Non-financial directors</TableCell>
                                    <TableCell>Financial analysis, reporting</TableCell>
                                    <TableCell>Internal CFO</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Very Good</Badge>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Risk Management</TableCell>
                                    <TableCell>Annual</TableCell>
                                    <TableCell>Risk committee</TableCell>
                                    <TableCell>Enterprise risk, cyber risk</TableCell>
                                    <TableCell>External Expert</TableCell>
                                    <TableCell>
                                      <Badge variant="default">Excellent</Badge>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="diversity-development">
                          <AccordionTrigger>Diversity and Inclusion Development</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="diversity-development">Diversity Leadership Development</Label>
                                <Textarea
                                  id="diversity-development"
                                  defaultValue="Targeted development programs to enhance diversity and inclusion capabilities at board level. Unconscious bias training for all directors, inclusive leadership workshops, and cultural competency development. Mentorship programs pairing experienced and new directors. Special focus on developing female directors for leadership roles."
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Leadership Pipeline</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Female Committee Chairs</span>
                                      <Badge variant="default">50% (2/4)</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Future Chair Candidates</span>
                                      <Badge variant="secondary">2 female, 1 male</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Mentorship Pairs</span>
                                      <Badge variant="default">3 active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">External Board Experience</span>
                                      <Badge variant="secondary">6 directors</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Development Outcomes</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Leadership Readiness Score</span>
                                      <Badge variant="default">8.5/10</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Succession Depth</span>
                                      <Badge variant="default">Strong</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Diversity Targets Progress</span>
                                      <Badge variant="default">Ahead</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Board Effectiveness Trend</span>
                                      <Badge variant="default">Improving</Badge>
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

                {/* Performance Monitoring Tab */}
                <TabsContent value="performance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance Monitoring and Accountability</CardTitle>
                      <CardDescription>
                        Comprehensive monitoring of governance performance with stakeholder feedback and continuous improvement
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Governance KPIs</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Board Meeting Attendance</span>
                                <Badge variant="default">96%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Committee Meeting Attendance</span>
                                <Badge variant="default">94%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Director Engagement Score</span>
                                <Badge variant="default">8.8/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Decision Quality Rating</span>
                                <Badge variant="default">9.1/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Stakeholder Confidence</span>
                                <Badge variant="default">High</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Improvement Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Diversity Progress Score</span>
                                <Badge variant="default">95%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Skills Gap Closure</span>
                                <Badge variant="secondary">75%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Development Program Uptake</span>
                                <Badge variant="default">100%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Action Plan Completion</span>
                                <Badge variant="default">88%</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Best Practice Adoption</span>
                                <Badge variant="default">Strong</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Stakeholder Feedback and Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Stakeholder Group</TableHead>
                                <TableHead>Feedback Method</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Overall Rating</TableHead>
                                <TableHead>Key Strengths</TableHead>
                                <TableHead>Improvement Areas</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Shareholders</TableCell>
                                <TableCell>Annual Survey</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>
                                  <Badge variant="default">8.6/10</Badge>
                                </TableCell>
                                <TableCell>Strategic oversight, diversity</TableCell>
                                <TableCell>ESG communication</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Management Team</TableCell>
                                <TableCell>360° Feedback</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>
                                  <Badge variant="default">8.9/10</Badge>
                                </TableCell>
                                <TableCell>Support, guidance, decisions</TableCell>
                                <TableCell>Digital strategy input</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">External Auditors</TableCell>
                                <TableCell>Professional Assessment</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>
                                  <Badge variant="default">9.2/10</Badge>
                                </TableCell>
                                <TableCell>Audit oversight, independence</TableCell>
                                <TableCell>Risk appetite clarity</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Regulators</TableCell>
                                <TableCell>Compliance Review</TableCell>
                                <TableCell>As required</TableCell>
                                <TableCell>
                                  <Badge variant="default">Compliant</Badge>
                                </TableCell>
                                <TableCell>Governance framework</TableCell>
                                <TableCell>ESG reporting depth</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">ESG Rating Agencies</TableCell>
                                <TableCell>Rating Assessment</TableCell>
                                <TableCell>Annual</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">B+ average</Badge>
                                </TableCell>
                                <TableCell>Diversity progress</TableCell>
                                <TableCell>ESG expertise depth</TableCell>
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
                              defaultValue="Systematic approach to governance improvement based on regular evaluation, stakeholder feedback, and best practice benchmarking. Annual action plans address identified development areas with clear timelines and accountability. Integration of diversity and effectiveness objectives ensures balanced progress across all governance dimensions."
                              rows={4}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="future-priorities">2025 Improvement Priorities</Label>
                            <Textarea
                              id="future-priorities"
                              defaultValue="Key priorities include enhancing digital governance capabilities, strengthening ESG expertise across the board, implementing advanced succession planning tools, and expanding stakeholder engagement mechanisms. Focus on achieving 50% female representation by 2027 while maintaining high effectiveness standards. Investment in governance technology and board portal enhancements."
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
            <Button>Save Board Data</Button>
            <Button variant="outline">Generate Governance Report</Button>
            <Button variant="outline">Update Diversity Metrics</Button>
            <Button variant="outline">Export Board Analysis</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}