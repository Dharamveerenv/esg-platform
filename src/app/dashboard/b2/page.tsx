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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, CheckCircle, AlertCircle, Clock } from "lucide-react"

const sustainabilityIssues = [
  {
    id: "climate-change",
    title: "Climate Change",
    description: "Policies and practices related to climate action and GHG emissions",
    policyExists: true,
    publiclyAvailable: true,
    hasTargets: true,
    status: "complete"
  },
  {
    id: "pollution",
    title: "Pollution Management",
    description: "Air, water, and soil pollution prevention and management",
    policyExists: true,
    publiclyAvailable: false,
    hasTargets: true,
    status: "in-progress"
  },
  {
    id: "water-marine",
    title: "Water & Marine Resources",
    description: "Water management and marine ecosystem protection",
    policyExists: false,
    publiclyAvailable: false,
    hasTargets: false,
    status: "not-started"
  },
  {
    id: "biodiversity",
    title: "Biodiversity & Ecosystems",
    description: "Biodiversity protection and ecosystem management",
    policyExists: true,
    publiclyAvailable: true,
    hasTargets: false,
    status: "in-progress"
  },
  {
    id: "circular-economy",
    title: "Circular Economy",
    description: "Resource efficiency and circular business practices",
    policyExists: false,
    publiclyAvailable: false,
    hasTargets: false,
    status: "not-started"
  },
  {
    id: "own-workforce",
    title: "Own Workforce",
    description: "Employee rights, working conditions, and development",
    policyExists: true,
    publiclyAvailable: true,
    hasTargets: true,
    status: "complete"
  },
  {
    id: "value-chain-workers",
    title: "Workers in Value Chain",
    description: "Supply chain worker rights and conditions",
    policyExists: true,
    publiclyAvailable: false,
    hasTargets: false,
    status: "in-progress"
  },
  {
    id: "affected-communities",
    title: "Affected Communities",
    description: "Community engagement and impact management",
    policyExists: false,
    publiclyAvailable: false,
    hasTargets: false,
    status: "not-started"
  },
  {
    id: "consumers-end-users",
    title: "Consumers and End-users",
    description: "Product safety and consumer protection",
    policyExists: true,
    publiclyAvailable: true,
    hasTargets: true,
    status: "complete"
  },
  {
    id: "business-conduct",
    title: "Business Conduct",
    description: "Ethics, anti-corruption, and business integrity",
    policyExists: true,
    publiclyAvailable: true,
    hasTargets: true,
    status: "complete"
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "in-progress":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "not-started":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "complete":
      return <Badge variant="default">Complete</Badge>
    case "in-progress":
      return <Badge variant="secondary">In Progress</Badge>
    case "not-started":
      return <Badge variant="outline">Not Started</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const calculateProgress = () => {
  const completed = sustainabilityIssues.filter(issue => issue.status === "complete").length
  return (completed / sustainabilityIssues.length) * 100
}

export default function B2Page() {
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
                <BreadcrumbPage>B2: Sustainability Practices & Policies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Interactive Matrix for 10 Sustainability Issues
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Track policies, public availability, and targets for each sustainability issue</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>
                Document your organization&apos;s sustainability practices across 10 key areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm text-muted-foreground">{Math.round(calculateProgress())}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Sustainability Issues Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Issues Matrix</CardTitle>
              <CardDescription>
                Configure policies, targets, and public availability for each sustainability issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Sustainability Issue</TableHead>
                    <TableHead className="text-center">Policy Exists</TableHead>
                    <TableHead className="text-center">Publicly Available</TableHead>
                    <TableHead className="text-center">Has Targets</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sustainabilityIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(issue.status)}
                          <div>
                            <div className="font-medium">{issue.title}</div>
                            <div className="text-sm text-muted-foreground">{issue.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={issue.policyExists} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={issue.publiclyAvailable} disabled={!issue.policyExists} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={issue.hasTargets} />
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(issue.status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Detailed Policy Information */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Policy Information</CardTitle>
              <CardDescription>
                Expand each section to provide detailed information about your sustainability policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {sustainabilityIssues.filter(issue => issue.policyExists).map((issue) => (
                  <AccordionItem key={issue.id} value={issue.id}>
                    <AccordionTrigger className="flex items-center gap-2">
                      {getStatusIcon(issue.status)}
                      {issue.title}
                      {issue.publiclyAvailable && (
                        <Badge variant="outline" className="ml-auto mr-4">Public</Badge>
                      )}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Policy Document Link</label>
                            <input 
                              type="url" 
                              className="w-full p-2 border rounded-md" 
                              placeholder="https://company.com/policies/..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Last Updated</label>
                            <input 
                              type="date" 
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Responsible Department</label>
                            <select className="w-full p-2 border rounded-md">
                              <option>Sustainability</option>
                              <option>Operations</option>
                              <option>HR</option>
                              <option>Legal & Compliance</option>
                              <option>Quality Assurance</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Review Frequency</label>
                            <select className="w-full p-2 border rounded-md">
                              <option>Annual</option>
                              <option>Bi-annual</option>
                              <option>Quarterly</option>
                              <option>As needed</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Policy Description</label>
                          <textarea 
                            className="w-full p-2 border rounded-md min-h-[100px]" 
                            placeholder={`Describe your ${issue.title.toLowerCase()} policy, including key objectives, scope, and implementation measures...`}
                          />
                        </div>
                        {issue.hasTargets && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Targets & KPIs</label>
                            <textarea 
                              className="w-full p-2 border rounded-md min-h-[80px]" 
                              placeholder="List specific targets, KPIs, and deadlines related to this policy area..."
                            />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm">Save Changes</Button>
                          <Button variant="outline" size="sm">Upload Document</Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Policies Documented</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sustainabilityIssues.filter(issue => issue.policyExists).length}/10
                </div>
                <Progress 
                  value={(sustainabilityIssues.filter(issue => issue.policyExists).length / 10) * 100} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Publicly Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sustainabilityIssues.filter(issue => issue.publiclyAvailable).length}/10
                </div>
                <Progress 
                  value={(sustainabilityIssues.filter(issue => issue.publiclyAvailable).length / 10) * 100} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">With Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sustainabilityIssues.filter(issue => issue.hasTargets).length}/10
                </div>
                <Progress 
                  value={(sustainabilityIssues.filter(issue => issue.hasTargets).length / 10) * 100} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save All Changes</Button>
            <Button variant="outline">Save as Draft</Button>
            <Button variant="outline">Export Matrix</Button>
            <Button variant="outline">Generate Policy Report</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}