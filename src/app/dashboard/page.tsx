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
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
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
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Overview Cards Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reporting Status
                </CardTitle>
                <Badge variant="outline">Basic Module</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73%</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
                <Progress value={73} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Modules
                </CardTitle>
                <Badge variant="secondary">8/11</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  3 modules remaining
                </p>
                <Progress value={73} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Compliance Score
                </CardTitle>
                <Badge variant="default">Good</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  Meeting VSME standards
                </p>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Deadline
                </CardTitle>
                <Badge variant="destructive">Urgent</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  days remaining
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button>New Report</Button>
            <Button variant="outline">Continue Draft</Button>
            <Button variant="outline">Export Report</Button>
          </div>

          {/* Module Status Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">B0: General Company Information</CardTitle>
                <CardDescription>Company setup and basic information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="default">Complete</Badge>
                  <Progress value={100} className="w-20" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Last updated: 2 days ago
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">B1: Basis for Preparation</CardTitle>
                <CardDescription>Reporting scope and methodology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="default">Complete</Badge>
                  <Progress value={100} className="w-20" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  3 subsidiaries tracked
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">B2: Practices & Policies</CardTitle>
                <CardDescription>Sustainability policies matrix</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">In Progress</Badge>
                  <Progress value={60} className="w-20" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  6/10 policies documented
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">B3: Energy and GHG Emissions</CardTitle>
                <CardDescription>Scope 1, 2, and 3 emissions tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">In Progress</Badge>
                  <Progress value={80} className="w-20" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total: 1,250 tCO2e
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">B4: Pollution</CardTitle>
                <CardDescription>Air, water, and soil pollution tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Not Started</Badge>
                  <Progress value={0} className="w-20" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  3 locations to assess
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">B5: Biodiversity</CardTitle>
                <CardDescription>Land use and biodiversity impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Not Started</Badge>
                  <Progress value={0} className="w-20" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  245 ha to assess
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}