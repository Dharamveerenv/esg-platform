import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">VSME ESG Platform</CardTitle>
          <CardDescription>
            Enter your company credentials to access the ESG reporting dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Company Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="company">Company Sector</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agriculture">Agriculture & Food</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me for 30 days
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the VSME ESG Platform Terms and Conditions
                </Label>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Access ESG Dashboard
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Corporate SSO
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Need access for your company?{" "}
              <a href="#" className="underline underline-offset-4">
                Request Account
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <Alert>
        <AlertDescription>
          This platform helps agri-food companies comply with EFRAG VSME sustainability reporting standards.
        </AlertDescription>
      </Alert>
    </div>
  )
}