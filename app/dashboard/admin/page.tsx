"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Bell,
  Building,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminDashboard() {
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
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground dark:text-slate-400">Manage hostel operations</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
              <Input type="search" placeholder="Search..." className="w-full md:w-[200px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Total Students</p>
                  <h3 className="text-2xl font-bold mt-1">450</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400 mt-2">Across all blocks</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Rooms Occupied</p>
                  <h3 className="text-2xl font-bold mt-1">215/250</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">86% occupancy rate</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">₹45,75,000</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">Current semester</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Pending Requests</p>
                  <h3 className="text-2xl font-bold mt-1">24</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs text-yellow-600 mt-2">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      Latest actions in the hostel management system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">New Student Registration</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">2 hours ago</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            Amit Kumar was assigned to Room 304, Block B
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CreditCard className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Payment Received</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">5 hours ago</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            Hostel fee payment of ₹45,000 received from Priya Sharma
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <MessageSquare className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">New Complaint</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Yesterday</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            Electrical issue reported in Room 105, Block A
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Leave Application</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Yesterday</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            Rahul Singh applied for weekend leave (Apr 14-16)
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Occupancy Status</CardTitle>
                    <CardDescription className="dark:text-slate-400">Current room occupancy by block</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Block A</p>
                          <p className="text-sm font-medium">90% (90/100)</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Block B</p>
                          <p className="text-sm font-medium">85% (85/100)</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Block C</p>
                          <p className="text-sm font-medium">80% (40/50)</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                    <CardDescription className="dark:text-slate-400">Items requiring your attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Leave Application</h3>
                          <Badge>Urgent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                          Rahul Singh (Room 203) has requested weekend leave from Apr 14-16.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="w-full">
                            Reject
                          </Button>
                          <Button size="sm" className="w-full">
                            Approve
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Room Change Request</h3>
                          <Badge variant="outline">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                          Priya Sharma (Room 105) has requested to change to Room 210.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="w-full">
                            Reject
                          </Button>
                          <Button size="sm" className="w-full">
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 h-12 w-12 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Cultural Night</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">April 15, 2023</p>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 h-12 w-12 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Sports Day</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">April 22, 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Student Directory</CardTitle>
                <CardDescription className="dark:text-slate-400">Manage all students in the hostel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
                    <Input type="search" placeholder="Search students..." className="w-full md:w-[300px] pl-8" />
                  </div>
                  <Button>Add New Student</Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Room</th>
                          <th className="text-left p-3 font-medium">Course</th>
                          <th className="text-left p-3 font-medium">Contact</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t dark:border-slate-600">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <span>John Doe</span>
                            </div>
                          </td>
                          <td className="p-3">203, Block A</td>
                          <td className="p-3">Computer Science</td>
                          <td className="p-3">+91 98765 43210</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t dark:border-slate-600">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>PS</AvatarFallback>
                              </Avatar>
                              <span>Priya Sharma</span>
                            </div>
                          </td>
                          <td className="p-3">105, Block A</td>
                          <td className="p-3">Electronics</td>
                          <td className="p-3">+91 87654 32109</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

