"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Calendar, CreditCard, FileText, Home, MessageSquare, Settings, User } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function StudentDashboard() {
  const navItems = [
    {
      href: "/dashboard/student",
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/student/profile",
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/student/payments",
      label: "Payments",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/student/complaints",
      label: "Complaints",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/student/leave",
      label: "Leave Applications",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/student/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <DashboardLayout
      userType="student"
      userName="John Doe"
      userRole="Room 203, Block A"
      userAvatar="JD"
      navItems={navItems}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground dark:text-slate-400">Welcome back, John Doe</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Room Number</p>
                  <h3 className="text-2xl font-bold mt-1">203</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Home className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400 mt-2">Block A, Second Floor</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Hostel Fee</p>
                  <h3 className="text-2xl font-bold mt-1">₹45,000</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">Paid for current semester</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Mess Balance</p>
                  <h3 className="text-2xl font-bold mt-1">₹2,500</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs text-yellow-600 mt-2">Valid until 30 April</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Attendance</p>
                  <h3 className="text-2xl font-bold mt-1">92%</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">Good standing</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="leave">Leave Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Room Information</CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      Details about your hostel accommodation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Room Type</p>
                          <p className="font-medium">Double Sharing</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Floor</p>
                          <p className="font-medium">Second Floor</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Block</p>
                          <p className="font-medium">Block A</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Room Number</p>
                          <p className="font-medium">203</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Roommate</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>RS</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">Rahul Singh</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription className="dark:text-slate-400">Your recent payments and dues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CreditCard className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Hostel Fee Payment</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Jan 15, 2023</p>
                          </div>
                        </div>
                        <p className="font-medium text-green-600">+₹45,000</p>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <div className="bg-yellow-100 p-2 rounded-full">
                            <CreditCard className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium">Mess Fee Payment</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Jan 20, 2023</p>
                          </div>
                        </div>
                        <p className="font-medium text-yellow-600">+₹12,000</p>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded-full">
                            <CreditCard className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">Late Fee</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Feb 5, 2023</p>
                          </div>
                        </div>
                        <p className="font-medium text-red-600">-₹500</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
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

                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Important Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Warden</p>
                        <p className="font-medium">Dr. Rajesh Kumar</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">+91 98765 43210</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Hostel Office</p>
                        <p className="font-medium">Room 101, Admin Block</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">+91 12345 67890</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Emergency</p>
                        <p className="font-medium">Security Office</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">+91 45678 90123</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notices">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Hostel Notices</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Important announcements from the administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Maintenance Schedule</h3>
                      <Badge>New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                      The water supply will be interrupted on Sunday, April 10th from 10:00 AM to 2:00 PM due to
                      maintenance work. Please store water accordingly.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">Posted on: April 5, 2023</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Hostel Day Celebration</h3>
                      <Badge variant="outline">Event</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                      Annual Hostel Day will be celebrated on April 20th. All students are requested to participate in
                      the cultural events. Registration for performances is now open.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">Posted on: March 25, 2023</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Mess Committee Elections</h3>
                      <Badge variant="outline">Important</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                      Elections for the new Mess Committee will be held on April 12th. Interested candidates can submit
                      their nominations by April 8th.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">Posted on: March 20, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Complaints & Requests</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Track your submitted complaints and requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Plumbing Issue in Bathroom</h3>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        In Progress
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                      The sink in the common bathroom is leaking. Water is accumulating on the floor.
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground dark:text-slate-400">Submitted on: April 2, 2023</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Wi-Fi Connectivity Issue</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Resolved
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                      Unable to connect to the hostel Wi-Fi network from Room 203. The signal is weak and keeps
                      disconnecting.
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground dark:text-slate-400">Submitted on: March 15, 2023</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full">Submit New Complaint</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leave">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Leave Applications</CardTitle>
                <CardDescription className="dark:text-slate-400">Manage your leave requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Weekend Leave</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Approved
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">From Date</p>
                        <p className="font-medium">April 14, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">To Date</p>
                        <p className="font-medium">April 16, 2023</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                      Going home for the weekend.
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground dark:text-slate-400">Submitted on: April 10, 2023</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Medical Leave</h3>
                      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Rejected
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">From Date</p>
                        <p className="font-medium">March 5, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">To Date</p>
                        <p className="font-medium">March 8, 2023</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                      Need to visit home for medical treatment.
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground dark:text-slate-400">Submitted on: March 3, 2023</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full">Apply for Leave</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

