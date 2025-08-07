"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function CompanySwitcher({
  companies,
}: {
  companies: {
    name: string
    plan: string
  }[]
}) {
  const [selectedCompany, setSelectedCompany] = React.useState(companies[0])

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
                <span className="font-medium">{selectedCompany.name}</span>
                <span className="text-xs">{selectedCompany.plan}</span>
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
                key={company.name}
                onSelect={() => setSelectedCompany(company)}
              >
                🏢
                <span className="ml-2">{company.name}</span>
                {company.name === selectedCompany.name && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}