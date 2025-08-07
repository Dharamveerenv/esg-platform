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
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
          {/* Company Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information Section</CardTitle>
              <CardDescription>
                Basic company details and registration information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      placeholder="Enter company name"
                      defaultValue="Acme Agriculture Ltd"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration-number">Registration Number</Label>
                    <Input
                      id="registration-number"
                      placeholder="Enter registration number"
                      defaultValue="123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nace-code">NACE Code (Industry Classification)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select NACE code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01.11">Growing of cereals</SelectItem>
                        <SelectItem value="01.13">Growing of vegetables</SelectItem>
                        <SelectItem value="01.21">Growing of grapes</SelectItem>
                        <SelectItem value="01.41">Raising of dairy cattle</SelectItem>
                        <SelectItem value="01.46">Raising of swine/pigs</SelectItem>
                        <SelectItem value="10.11">Processing and preserving of meat</SelectItem>
                        <SelectItem value="10.51">Operation of dairies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staff-count">Staff Count (FTE)</Label>
                    <Input
                      id="staff-count"
                      type="number"
                      placeholder="Enter full-time equivalent employees"
                      defaultValue="45"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Revenue (€)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      placeholder="Enter annual revenue"
                      defaultValue="2500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reporting-period">Reporting Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reporting period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-info">Contact Information</Label>
                  <Textarea
                    id="contact-info"
                    placeholder="Enter contact details"
                    defaultValue="123 Farm Road, Rural County, Ireland"
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Premises Management Interface */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Premises Management Interface</CardTitle>
                <CardDescription>
                  Manage multiple company locations and facilities
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Premise</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Premise</DialogTitle>
                    <DialogDescription>
                      Add a new location or facility to your company profile
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="premise-type">Premise Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select premise type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="premise-size">Premise Size (M³)</Label>
                      <Input
                        id="premise-size"
                        type="number"
                        placeholder="Enter size in cubic meters"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="premise-address">Address</Label>
                      <Textarea
                        id="premise-address"
                        placeholder="Enter full address"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Premise
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Size (M³)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary">Production</Badge>
                    </TableCell>
                    <TableCell>Main Farm, County Cork, Ireland</TableCell>
                    <TableCell>15,000</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary">Office</Badge>
                    </TableCell>
                    <TableCell>Dublin Office, Temple Bar, Dublin</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary">Warehouse</Badge>
                    </TableCell>
                    <TableCell>Storage Facility, County Meath, Ireland</TableCell>
                    <TableCell>3,200</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button>Save Changes</Button>
            <Button variant="outline">Save as Draft</Button>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}