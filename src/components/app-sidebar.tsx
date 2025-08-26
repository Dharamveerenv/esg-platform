import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { CompanySwitcher } from "@/components/company-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  companies: [
    {
      name: "Acme Agriculture Ltd",
      plan: "VSME Basic",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      isActive: true,
    },
    {
      title: "Basic Modules (B0-B11)",
      items: [
        {
          title: "B0: General Company Information",
          url: "/dashboard/b0",
        },
        {
          title: "B1: Basis for Preparation",
          url: "/dashboard/b1",
        },
        {
          title: "B2: Practices & Policies",  
          url: "/dashboard/b2",
        },
        {
          title: "B3: Energy and GHG Emissions",
          url: "/dashboard/b3",
        },
        {
          title: "B4: Pollution",
          url: "/dashboard/b4",
        },
        {
          title: "B5: Biodiversity",
          url: "/dashboard/b5",
        },
        {
          title: "B6: Water",
          url: "/dashboard/b6",
        },
        {
          title: "B7: Resource Use & Waste",
          url: "/dashboard/b7",
        },
        {
          title: "B8: Workforce General",
          url: "/dashboard/b8",
        },
        {
          title: "B9: Workforce Health & Safety",
          url: "/dashboard/b9",
        },
        {
          title: "B10: Workforce Remuneration",
          url: "/dashboard/b10",
        },
        {
          title: "B11: Corruption & Bribery",
          url: "/dashboard/b11",
        },
      ],
    },
    {
      title: "Comprehensive Modules (C1-C9)",
      items: [
        {
          title: "C1: Business Model Strategy",
          url: "/dashboard/c1",
        },
        {
          title: "C2: Enhanced Practices Description",
          url: "/dashboard/c2",
        },
        {
          title: "C3: GHG Reduction Targets",
          url: "/dashboard/c3",
        },
        {
          title: "C4: Climate Risks Assessment",
          url: "/dashboard/c4",
        },
        {
          title: "C5: Additional Workforce Characteristics",
          url: "/dashboard/c5",
        },
        {
          title: "C6: Human Rights Policies",
          url: "/dashboard/c6",
        },
        {
          title: "C7: Human Rights Incidents",
          url: "/dashboard/c7",
        },
        {
          title: "C8: Sector Revenue Tracking",
          url: "/dashboard/c8",
        },
        {
          title: "C9: Governance Gender Diversity",
          url: "/dashboard/c9",
        },
      ],
    },
    {
      title: "Reporting & Export",
      items: [
        {
          title: "Generate Reports",
          url: "/dashboard/reports",
        },
        {
          title: "Data Visualization",
          url: "/dashboard/analytics",
        },
        {
          title: "Quality Assurance",
          url: "/dashboard/qa",
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          title: "User Management",
          url: "/dashboard/users",
        },
        {
          title: "System Configuration",
          url: "/dashboard/config",
        },
        {
          title: "Support & Training",
          url: "/dashboard/support",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <CompanySwitcher />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items ? (
                  item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild>
                        <a href={subItem.url}>
                          {subItem.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}