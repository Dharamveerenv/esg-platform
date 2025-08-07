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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function B1Page() {
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
                <BreadcrumbPage>B1: Basis for Preparation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Reporting Scope Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting Scope Selection</CardTitle>
              <CardDescription>
                Define the scope and boundaries of your ESG reporting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Module Selection</Label>
                <RadioGroup defaultValue="basic">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic">Basic Module Only (B0-B11)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comprehensive" id="comprehensive" />
                    <Label htmlFor="comprehensive">Basic + Comprehensive Module (B0-B11 + C1-C9)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Reporting Type</Label>
                <RadioGroup defaultValue="individual">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual Company Reporting</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consolidated" id="consolidated" />
                    <Label htmlFor="consolidated">Consolidated Group Reporting</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sensitive-info">Sensitive Information Omissions</Label>
                <Textarea
                  id="sensitive-info"
                  placeholder="Describe any sensitive information omitted and justification..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporting-boundaries">Reporting Boundaries Definition</Label>
                <Textarea
                  id="reporting-boundaries"
                  placeholder="Define the organizational and operational boundaries for reporting..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Subsidiary Management Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subsidiary Management</CardTitle>
                <CardDescription>
                  Manage subsidiaries and related entities for consolidated reporting
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Subsidiary</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Subsidiary</DialogTitle>
                    <DialogDescription>
                      Add a subsidiary or related entity to your reporting scope
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subsidiary-name">Subsidiary Name</Label>
                        <Input
                          id="subsidiary-name"
                          placeholder="Enter subsidiary name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="legal-form">Legal Form</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select legal form" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ltd">Limited Company (Ltd)</SelectItem>
                            <SelectItem value="plc">Public Limited Company (PLC)</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="branch">Branch Office</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nace-sector">NACE Sector</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select NACE sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01.11">Growing of cereals</SelectItem>
                            <SelectItem value="01.13">Growing of vegetables</SelectItem>
                            <SelectItem value="01.41">Raising of dairy cattle</SelectItem>
                            <SelectItem value="10.11">Processing and preserving of meat</SelectItem>
                            <SelectItem value="10.51">Operation of dairies</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ie">🇮🇪 Ireland</SelectItem>
                            <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                            <SelectItem value="fr">🇫🇷 France</SelectItem>
                            <SelectItem value="de">🇩🇪 Germany</SelectItem>
                            <SelectItem value="nl">🇳🇱 Netherlands</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="balance-sheet">Balance Sheet Total (€)</Label>
                        <Input
                          id="balance-sheet"
                          type="number"
                          placeholder="Enter balance sheet total"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="turnover">Turnover (€)</Label>
                        <Input
                          id="turnover"
                          type="number"
                          placeholder="Enter annual turnover"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employees">Employee Count (FTE)</Label>
                        <Input
                          id="employees"
                          type="number"
                          placeholder="Enter employee count"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ownership">Ownership Percentage (%)</Label>
                        <Input
                          id="ownership"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Enter ownership percentage"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Address/Eircode)</Label>
                      <Textarea
                        id="location"
                        placeholder="Enter full address including Eircode/Postcode"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="control-mechanism">Control Mechanism</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select control mechanism" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="voting-rights">Voting Rights</SelectItem>
                          <SelectItem value="board-control">Board Control</SelectItem>
                          <SelectItem value="contractual">Contractual Control</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">
                      Add Subsidiary
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Legal Form</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Turnover (€)</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Ownership %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Acme Foods UK Ltd</TableCell>
                    <TableCell>
                      <Badge variant="outline">Ltd</Badge>
                    </TableCell>
                    <TableCell>🇬🇧 UK</TableCell>
                    <TableCell>€1,200,000</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Green Farms Partnership</TableCell>
                    <TableCell>
                      <Badge variant="outline">Partnership</Badge>
                    </TableCell>
                    <TableCell>🇮🇪 Ireland</TableCell>
                    <TableCell>€800,000</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>60%</TableCell>
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

          {/* Sustainability Certification Manager */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Sustainability Certification Manager</CardTitle>
                <CardDescription>
                  Track sustainability certifications and third-party assessments
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Certification</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Sustainability Certification</DialogTitle>
                    <DialogDescription>
                      Add a new sustainability certification or assessment
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Certification Provider</Label>
                      <Input
                        id="provider"
                        placeholder="e.g., Origin Green, Bord Bia, ISO 14001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cert-name">Certification Name/Description</Label>
                      <Input
                        id="cert-name"
                        placeholder="Enter certification name or description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="evaluation-date">Evaluation Date</Label>
                      <Input
                        id="evaluation-date"
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating/Score (if applicable)</Label>
                      <Input
                        id="rating"
                        placeholder="Enter rating, score, or grade"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input
                        id="expiry-date"
                        type="date"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Certification
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Certification</TableHead>
                    <TableHead>Evaluation Date</TableHead>
                    <TableHead>Rating/Score</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Origin Green</TableCell>
                    <TableCell>Sustainable Dairy Production</TableCell>
                    <TableCell>2024-01-15</TableCell>
                    <TableCell>
                      <Badge variant="default">A+</Badge>
                    </TableCell>
                    <TableCell>2026-01-15</TableCell>
                    <TableCell>
                      <Badge variant="default">Valid</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ISO</TableCell>
                    <TableCell>ISO 14001 Environmental Management</TableCell>
                    <TableCell>2023-06-20</TableCell>
                    <TableCell>
                      <Badge variant="default">Certified</Badge>
                    </TableCell>
                    <TableCell>2026-06-20</TableCell>
                    <TableCell>
                      <Badge variant="default">Valid</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              This module establishes the foundation for your ESG reporting. Ensure all subsidiaries and certifications are accurately recorded as they will impact subsequent module calculations.
            </AlertDescription>
          </Alert>

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