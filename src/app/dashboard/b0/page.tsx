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
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useDashboard } from "@/contexts/dashboard-context"
import { apiClient } from "@/lib/api-client"
import { useState, useEffect } from "react"
import { Building, MapPin, Users } from "lucide-react"
import { AutoSaveForm } from "@/components/forms/auto-save-form"
import { ESGFormField, ESGValidationRules } from "@/components/forms/esg-form-field"

function B0Content() {
  const { selectedCompany, selectedReport } = useDashboard();
  const [companyData, setCompanyData] = useState<Record<string, unknown> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load company data
  useEffect(() => {
    if (selectedCompany) {
      setCompanyData({
        companyName: selectedCompany.companyProfile?.legalName || '',
        registrationNumber: selectedCompany.companyProfile?.registrationNumber || '',
        naceCode: selectedCompany.industryClassification?.naceCode || '',
        staffCount: selectedCompany.workforce?.totalEmployees || 0,
        revenue: selectedCompany.financialData?.revenue?.amount || 0,
        contactInfo: `${selectedCompany.headquarters?.address || ''}, ${selectedCompany.headquarters?.city || ''}, ${selectedCompany.headquarters?.country || ''}`,
        premises: selectedCompany.facilities || []
      });
    }
  }, [selectedCompany]);

  const saveCompanyData = async (dataToSave?: Record<string, unknown>) => {
    const saveData = dataToSave || companyData;
    if (!selectedReport || !saveData) return;
    
    try {
      setIsSaving(true);
      const response = await apiClient.updateModuleData(selectedReport._id, 'b0', {
        companyInformation: saveData,
        lastUpdated: new Date()
      });
      
      if (response.status === 'success') {
        console.log('✅ B0 data saved successfully');
      } else {
        console.error('❌ Failed to save B0 data:', response.message);
        throw new Error(response.message || 'Save failed');
      }
    } catch (error) {
      console.error('❌ Error saving B0 data:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const validateB0Data = (data: Record<string, unknown>) => {
    const errors: string[] = [];
    
    if (!data.companyName?.trim()) errors.push('Company name is required');
    if (!data.registrationNumber?.trim()) errors.push('Registration number is required');
    if (!data.naceCode?.trim()) errors.push('NACE code is required');
    if (data.naceCode && !/^\d{2}\.\d{2}$/.test(data.naceCode)) {
      errors.push('NACE code must be in format XX.XX');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  if (!selectedCompany) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Please select a company to view general information</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedCompany.companyProfile?.legalName}</div>
            <p className="text-xs text-muted-foreground">
              {selectedCompany.industryClassification?.sectorType}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedCompany.workforce?.totalEmployees || 0}</div>
            <p className="text-xs text-muted-foreground">Full-time equivalent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{selectedCompany.headquarters?.city}</div>
            <p className="text-xs text-muted-foreground">{selectedCompany.headquarters?.country}</p>
          </CardContent>
        </Card>
      </div>

      {/* Company Information Section with Auto-Save */}
      <AutoSaveForm
        moduleId="b0"
        reportId={selectedReport?._id || ''}
        data={companyData}
        onSave={saveCompanyData}
        validateBeforeSave={validateB0Data}
        saveInterval={3000} // 3 seconds
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information Section
            </CardTitle>
            <CardDescription>
              Basic company details and registration information (Auto-saves every 3 seconds)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ESGFormField
                  name="companyName"
                  label="Company Name"
                  value={companyData?.companyName || ''}
                  onChange={(value) => setCompanyData(prev => ({...prev, companyName: value}))}
                  required
                  placeholder="Enter company name"
                />
                
                <ESGFormField
                  name="registrationNumber"
                  label="Registration Number"
                  value={companyData?.registrationNumber || ''}
                  onChange={(value) => setCompanyData(prev => ({...prev, registrationNumber: value}))}
                  required
                  placeholder="Enter registration number"
                />
                
                <ESGFormField
                  name="naceCode"
                  label="NACE Code (Industry Classification)"
                  type="select"
                  value={companyData?.naceCode || ''}
                  onChange={(value) => setCompanyData(prev => ({...prev, naceCode: value}))}
                  required
                  placeholder="Select NACE code"
                  validation={[ESGValidationRules.naceCode]}
                  options={[
                    { value: "01.11", label: "01.11 - Growing of cereals" },
                    { value: "01.13", label: "01.13 - Growing of vegetables" },
                    { value: "01.21", label: "01.21 - Growing of grapes" },
                    { value: "01.41", label: "01.41 - Raising of dairy cattle" },
                    { value: "01.46", label: "01.46 - Raising of swine/pigs" },
                    { value: "10.11", label: "10.11 - Processing and preserving of meat" },
                    { value: "10.51", label: "10.51 - Operation of dairies" }
                  ]}
                />
                
                <ESGFormField
                  name="staffCount"
                  label="Staff Count (FTE)"
                  type="number"
                  value={companyData?.staffCount || 0}
                  onChange={(value) => setCompanyData(prev => ({...prev, staffCount: value}))}
                  placeholder="Enter full-time equivalent employees"
                  validation={[ESGValidationRules.positiveNumber]}
                  unit="FTE"
                />
                
                <ESGFormField
                  name="revenue"
                  label="Revenue"
                  type="number"
                  value={companyData?.revenue || 0}
                  onChange={(value) => setCompanyData(prev => ({...prev, revenue: value}))}
                  placeholder="Enter annual revenue"
                  validation={[ESGValidationRules.positiveNumber]}
                  unit="€"
                />
                
                <ESGFormField
                  name="reportingPeriod"
                  label="Reporting Period"
                  type="select"
                  value={companyData?.reportingPeriod || ''}
                  onChange={(value) => setCompanyData(prev => ({...prev, reportingPeriod: value}))}
                  placeholder="Select reporting period"
                  options={[
                    { value: "2024", label: "2024" },
                    { value: "2023", label: "2023" },
                    { value: "2022", label: "2022" }
                  ]}
                />
              </div>
              
              <ESGFormField
                name="contactInfo"
                label="Contact Information"
                type="textarea"
                value={companyData?.contactInfo || ''}
                onChange={(value) => setCompanyData(prev => ({...prev, contactInfo: value}))}
                placeholder="Enter contact details"
                description="Include address, phone, email, and other relevant contact information"
              />
            </div>
          </CardContent>
        </Card>
      </AutoSaveForm>

      {/* Premises Management Interface */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Premises Management Interface</CardTitle>
            <CardDescription>
              Company locations and facilities from live data
            </CardDescription>
          </div>
          <Button disabled>Add Premise</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedCompany.facilities && selectedCompany.facilities.length > 0 ? (
                selectedCompany.facilities.map((facility, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="secondary">{facility.type}</Badge>
                    </TableCell>
                    <TableCell>{facility.address}</TableCell>
                    <TableCell>{facility.size ? `${facility.size} ${facility.sizeUnit}` : 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No facilities data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={() => saveCompanyData(companyData)} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Force Save Now'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // Force save using the auto-save hook
            const forceSaveFunction = (window as any)[`forceSave_b0`];
            if (forceSaveFunction) {
              forceSaveFunction();
            }
          }}
        >
          Manual Save
        </Button>
        <Button 
          variant="outline"
          onClick={() => {
            const dataStr = JSON.stringify(companyData, null, 2);
            console.log('📊 B0 Company Data Export:', dataStr);
            navigator.clipboard.writeText(dataStr);
          }}
        >
          Export Data
        </Button>
      </div>
    </>
  );
}

export default function B0Page() {
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
                <BreadcrumbPage>B0: General Company Information</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <B0Content />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}