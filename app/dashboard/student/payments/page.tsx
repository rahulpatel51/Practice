"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User, CreditCard, MessageSquare, FileText, Settings, Download, Calendar, ArrowRight } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function StudentPaymentsPage() {
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
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Manage your hostel and mess fee payments</p>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hostel Fee</p>
                  <h3 className="text-2xl font-bold mt-1">₹45,000</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">Paid for current semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mess Fee</p>
                  <h3 className="text-2xl font-bold mt-1">₹12,000</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">Paid for current semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Payment</p>
                  <h3 className="text-2xl font-bold mt-1">₹57,000</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs text-yellow-600 mt-2">Due on July 15, 2023</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="pending">Pending Payments</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View all your previous payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Receipt No.</th>
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Description</th>
                          <th className="text-left p-3 font-medium">Amount</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3">HF-2023-001</td>
                          <td className="p-3">Jan 15, 2023</td>
                          <td className="p-3">Hostel Fee - Spring Semester 2023</td>
                          <td className="p-3">₹45,000</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Paid
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              <span>Receipt</span>
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">MF-2023-001</td>
                          <td className="p-3">Jan 20, 2023</td>
                          <td className="p-3">Mess Fee - Spring Semester 2023</td>
                          <td className="p-3">₹12,000</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Paid
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              <span>Receipt</span>
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">LF-2023-001</td>
                          <td className="p-3">Feb 5, 2023</td>
                          <td className="p-3">Late Fee - Spring Semester 2023</td>
                          <td className="p-3">₹500</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Paid
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              <span>Receipt</span>
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">HF-2022-002</td>
                          <td className="p-3">Jul 10, 2022</td>
                          <td className="p-3">Hostel Fee - Fall Semester 2022</td>
                          <td className="p-3">₹45,000</td>
                          <td className="p-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Paid
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              <span>Receipt</span>
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

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>Upcoming fee payments that need to be made</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">Hostel Fee - Fall Semester 2023</h3>
                        <p className="text-sm text-muted-foreground mt-1">Due on July 15, 2023</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Upcoming
                          </Badge>
                          <p className="text-sm font-medium">₹45,000</p>
                        </div>
                      </div>
                      <Button className="flex items-center gap-2">
                        <span>Pay Now</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">Mess Fee - Fall Semester 2023</h3>
                        <p className="text-sm text-muted-foreground mt-1">Due on July 20, 2023</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Upcoming
                          </Badge>
                          <p className="text-sm font-medium">₹12,000</p>
                        </div>
                      </div>
                      <Button className="flex items-center gap-2">
                        <span>Pay Now</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receipts">
            <Card>
              <CardHeader>
                <CardTitle>Payment Receipts</CardTitle>
                <CardDescription>Download receipts for your payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Hostel Fee Receipt</h3>
                      <Badge variant="outline">Spring 2023</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Receipt for hostel fee payment of ₹45,000 made on January 15, 2023.
                    </p>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Mess Fee Receipt</h3>
                      <Badge variant="outline">Spring 2023</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Receipt for mess fee payment of ₹12,000 made on January 20, 2023.
                    </p>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Late Fee Receipt</h3>
                      <Badge variant="outline">Spring 2023</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Receipt for late fee payment of ₹500 made on February 5, 2023.
                    </p>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Hostel Fee Receipt</h3>
                      <Badge variant="outline">Fall 2022</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Receipt for hostel fee payment of ₹45,000 made on July 10, 2022.
                    </p>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
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

