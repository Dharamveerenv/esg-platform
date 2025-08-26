"use client"

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
import { DashboardProvider, useDashboard } from "@/contexts/dashboard-context"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient } from "@/lib/api-client"
import { useState, useEffect } from "react"
import { Factory, Zap, Users, TrendingUp } from "lucide-react"

function DashboardContent() {
  const { selectedCompany, selectedReport, reports, isLoading, error } = useDashboard();
  const [liveEmissions, setLiveEmissions] = useState<any>(null);
  const [apiHealth, setApiHealth] = useState<boolean>(false);
  
  // Fetch live data for dashboard
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        // Check API health
        const healthResponse = await apiClient.healthCheck();
        setApiHealth(healthResponse.status === 'success');
        
        // Get baseline emissions data
        const emissionsResponse = await apiClient.getDemoBaseline();
        if (emissionsResponse.success) {
          setLiveEmissions(emissionsResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch live dashboard data:', error);
        setApiHealth(false);
      }
    };
    
    fetchLiveData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[60px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[80px] mb-2" />
                <Skeleton className="h-3 w-[120px] mb-2" />
                <Skeleton className="h-2 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Error: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completionPercentage = selectedReport?.reportStatus?.completionPercentage || 0;
  const reportStatus = selectedReport?.reportStatus?.currentStatus || 'Not Started';
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Overview Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reporting Status
            </CardTitle>
            <Badge variant="outline">{reportStatus}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {selectedReport ? `Report: ${selectedReport.reportMetadata.reportType} ${selectedReport.reportMetadata.reportingPeriod.fiscalYear}` : 'No report selected'}
            </p>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Company
            </CardTitle>
            <Badge variant="secondary">{selectedCompany?.industryClassification.sectorType || 'N/A'}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">
              {selectedCompany?.companyProfile.legalName || 'No Company'}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedCompany ? `${selectedCompany.headquarters.city}, ${selectedCompany.headquarters.country}` : 'Select a company'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reports Created
            </CardTitle>
            <Badge variant="default">{reports.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">
              {reports.length === 1 ? 'report available' : 'reports available'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Backend Status
            </CardTitle>
            <Badge variant={apiHealth ? "default" : "destructive"}>
              {apiHealth ? "Connected" : "Offline"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiHealth ? "✓" : "✗"}</div>
            <p className="text-xs text-muted-foreground">
              {apiHealth ? "Live calculations active" : "Check connection"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button 
          onClick={async () => {
            if (!selectedCompany) {
              alert('Please select a company first');
              return;
            }
            try {
              console.log('📝 Creating new report for company:', selectedCompany.companyProfile.legalName);
              const response = await apiClient.createDemoReport(selectedCompany._id);
              if (response.status === 'success') {
                console.log('✅ New report created:', response.data?.reportMetadata.reportType);
                // Refresh dashboard data
                window.location.reload();
              }
            } catch (error) {
              console.error('❌ Failed to create report:', error);
              alert('Failed to create report. Please try again.');
            }
          }}
          disabled={!selectedCompany}
        >
          New Report
        </Button>
        <Button 
          variant="outline"
          onClick={() => {
            if (selectedReport) {
              window.location.href = '/dashboard/b3';
            } else {
              alert('No current report selected');
            }
          }}
          disabled={!selectedReport}
        >
          Continue Current Report
        </Button>
        <Button 
          variant="outline"
          onClick={() => {
            console.log('📊 Available Reports:', reports.length);
            reports.forEach((report, index) => {
              console.log(`${index + 1}. ${report.reportMetadata.reportType} ${report.reportMetadata.reportingPeriod.fiscalYear} (${report.reportStatus.currentStatus})`);
            });
            if (reports.length === 0) {
              alert('No reports found. Create a new report first.');
            }
          }}
        >
          View All Reports ({reports.length})
        </Button>
      </div>

      {/* Live Emissions Overview */}
      {liveEmissions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Live Emissions Overview
            </CardTitle>
            <CardDescription>Real-time emissions data from backend calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Factory className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Scope 1 Total</p>
                  <p className="text-2xl font-bold">{liveEmissions.emissionsBreakdown.scope1.total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">kg CO2e</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Scope 2 Total</p>
                  <p className="text-2xl font-bold">{liveEmissions.emissionsBreakdown.scope2.total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">kg CO2e</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Total Emissions</p>
                  <p className="text-2xl font-bold">{liveEmissions.emissionsBreakdown.total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">kg CO2e</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Company Size</p>
                  <p className="text-2xl font-bold">{liveEmissions.company.employees}</p>
                  <p className="text-xs text-muted-foreground">employees</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module Status Grid - Now connected to real data with navigation */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => window.location.href = '/dashboard/b0'}>
          <CardHeader>
            <CardTitle className="text-lg">B0: General Company Information</CardTitle>
            <CardDescription>Company setup and basic information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="default">Connected</Badge>
              <Progress value={selectedCompany ? 100 : 0} className="w-20" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {selectedCompany ? 
                `${selectedCompany.companyProfile.legalName} - ${selectedCompany.workforce?.totalEmployees || 0} employees` : 
                'Ready for data entry'
              }
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => window.location.href = '/dashboard/b3'}>
          <CardHeader>
            <CardTitle className="text-lg">B3: Energy and GHG Emissions</CardTitle>
            <CardDescription>Scope 1, 2, and 3 emissions tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="default">Live Calculations</Badge>
              <Progress value={apiHealth ? 85 : 0} className="w-20" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {liveEmissions ? 
                `${liveEmissions.emissionsBreakdown.total.toLocaleString()} kg CO2e calculated` : 
                'Ready for emissions data'
              }
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => window.location.href = '/dashboard/b8'}>
          <CardHeader>
            <CardTitle className="text-lg">B8: Workforce</CardTitle>
            <CardDescription>Employee metrics and social indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="default">Connected</Badge>
              <Progress value={selectedCompany?.workforce ? 75 : 0} className="w-20" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {selectedCompany?.workforce ? 
                `${selectedCompany.workforce.totalEmployees || 0} employees tracked` : 
                'Ready for workforce data'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardProvider>
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
          <DashboardContent />
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  )
}