"use client"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  User,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
  Building,
  Users,
  Bell,
  Lock,
  Save,
  Globe,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminSettingsPage() {
  const navItems = [
    {
      href: "/dashboard/admin",
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/students",
      label: "Students",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/rooms",
      label: "Rooms",
      icon: <Building className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/payments",
      label: "Payments",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/complaints",
      label: "Complaints",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/leave",
      label: "Leave Applications",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={navItems}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Manage hostel system settings and configurations</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>User Management</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general hostel system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hostel-name">Hostel Name</Label>
                  <Input id="hostel-name" defaultValue="University Hostel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@university.edu" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-number">Contact Number</Label>
                  <Input id="contact-number" defaultValue="+91 12345 67890" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Hostel Address</Label>
                  <Textarea id="address" rows={3} defaultValue="123 University Campus, Main Road, City - 123456" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academic-year">Current Academic Year</Label>
                  <Input id="academic-year" defaultValue="2023-2024" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                    <option value="ist">Indian Standard Time (IST)</option>
                    <option value="utc">Coordinated Universal Time (UTC)</option>
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="pst">Pacific Standard Time (PST)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                    <option value="inr">Indian Rupee (₹)</option>
                    <option value="usd">US Dollar ($)</option>
                    <option value="eur">Euro (€)</option>
                    <option value="gbp">British Pound (£)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the system in maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Policy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Minimum Password Length</p>
                        <p className="text-sm text-muted-foreground">Set minimum length for user passwords</p>
                      </div>
                      <Input type="number" className="w-20" defaultValue="8" min="6" max="16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Require Special Characters</p>
                        <p className="text-sm text-muted-foreground">Require at least one special character</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Require Numbers</p>
                        <p className="text-sm text-muted-foreground">Require at least one number</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Password Expiry</p>
                        <p className="text-sm text-muted-foreground">Days before password expires</p>
                      </div>
                      <Input type="number" className="w-20" defaultValue="90" min="30" max="180" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable for Admins</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable for Wardens</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for all warden accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable for Students</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for all student accounts</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Minutes of inactivity before session expires</p>
                      </div>
                      <Input type="number" className="w-20" defaultValue="30" min="5" max="120" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Remember Me Duration</p>
                        <p className="text-sm text-muted-foreground">Days to remember login (if selected)</p>
                      </div>
                      <Input type="number" className="w-20" defaultValue="14" min="1" max="30" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Student Registration</p>
                        <p className="text-sm text-muted-foreground">Send email when a new student is registered</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Confirmation</p>
                        <p className="text-sm text-muted-foreground">Send email when a payment is received</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Leave Application Status</p>
                        <p className="text-sm text-muted-foreground">Send email when leave status changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Complaint Status</p>
                        <p className="text-sm text-muted-foreground">Send email when complaint status changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Emergency Alerts</p>
                        <p className="text-sm text-muted-foreground">Send SMS for emergency situations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Reminders</p>
                        <p className="text-sm text-muted-foreground">Send SMS reminders for due payments</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Configuration</h3>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-server">SMTP Server</Label>
                    <Input id="smtp-server" defaultValue="smtp.university.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input id="smtp-username" defaultValue="hostel@university.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input id="smtp-password" type="password" defaultValue="********" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input id="from-email" defaultValue="hostel@university.edu" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Admin Users</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Email</th>
                          <th className="text-left p-3 font-medium">Role</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3">Admin User</td>
                          <td className="p-3">admin@university.edu</td>
                          <td className="p-3">Super Admin</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Sanjay Kumar</td>
                          <td className="p-3">sanjay@university.edu</td>
                          <td className="p-3">Admin</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Add Admin User</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Warden Users</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Email</th>
                          <th className="text-left p-3 font-medium">Block</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3">Dr. Rajesh Kumar</td>
                          <td className="p-3">rajesh@university.edu</td>
                          <td className="p-3">Block A</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Dr. Priya Verma</td>
                          <td className="p-3">priya@university.edu</td>
                          <td className="p-3">Block B</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Add Warden User</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Role Permissions</h3>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm mb-4">Configure what each role can access and modify in the system</p>
                    <Button size="sm">Manage Role Permissions</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

