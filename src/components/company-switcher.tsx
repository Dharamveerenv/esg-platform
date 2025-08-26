"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"
import { apiClient } from "@/lib/api-client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function CompanySwitcher() {
  const { companies, selectedCompany, setSelectedCompany, isLoading } = useDashboard();

  if (isLoading || !selectedCompany) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              🏢
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-medium">Loading...</span>
              <span className="text-xs">Please wait</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                🏢
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">{selectedCompany.companyProfile.legalName}</span>
                <span className="text-xs">{selectedCompany.industryClassification.sectorType}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {companies.map((company) => (
              <DropdownMenuItem
                key={company._id}
                onSelect={() => setSelectedCompany(company)}
              >
                🏢
                <div className="ml-2 flex flex-col">
                  <span className="font-medium">{company.companyProfile.legalName}</span>
                  <span className="text-xs text-muted-foreground">
                    {company.headquarters.city}, {company.headquarters.country}
                  </span>
                </div>
                {company._id === selectedCompany._id && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onSelect={async () => {
                try {
                  console.log('🏗️ Creating demo company...');
                  const response = await apiClient.createDemoCompany();
                  if (response.status === 'success' && response.data) {
                    console.log('✅ Demo company created:', response.data.companyProfile.legalName);
                    // The dashboard context will refresh companies automatically
                  }
                } catch (error) {
                  console.error('❌ Failed to create demo company:', error);
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Demo Company
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}