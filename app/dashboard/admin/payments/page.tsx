"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  FileEdit,
  Plus,
  Building,
  Home,
  Users,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
  ArrowUpDown,
  Receipt,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

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

  // Mock data for payments
  const payments = [
    {
      id: "PAY-2023-001",
      studentId: "STU001",
      studentName: "John Doe",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-01-15",
      status: "Paid",
      paymentMethod: "Online Transfer",
      semester: "Spring 2023",
      receiptNo: "HF-2023-001",
    },
    {
      id: "PAY-2023-002",
      studentId: "STU001",
      studentName: "John Doe",
      type: "Mess Fee",
      amount: 12000,
      date: "2023-01-20",
      status: "Paid",
      paymentMethod: "Online Transfer",
      semester: "Spring 2023",
      receiptNo: "MF-2023-001",
    },
    {
      id: "PAY-2023-003",
      studentId: "STU002",
      studentName: "Priya Sharma",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-01-18",
      status: "Paid",
      paymentMethod: "Credit Card",
      semester: "Spring 2023",
      receiptNo: "HF-2023-002",
    },
    {
      id: "PAY-2023-004",
      studentId: "STU002",
      studentName: "Priya Sharma",
      type: "Mess Fee",
      amount: 12000,
      date: "2023-01-22",
      status: "Paid",
      paymentMethod: "Credit Card",
      semester: "Spring 2023",
      receiptNo: "MF-2023-002",
    },
    {
      id: "PAY-2023-005",
      studentId: "STU003",
      studentName: "Rahul Singh",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-01-10",
      status: "Paid",
      paymentMethod: "Debit Card",
      semester: "Spring 2023",
      receiptNo: "HF-2023-003",
    },
    {
      id: "PAY-2023-006",
      studentId: "STU004",
      studentName: "Ananya Patel",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-07-15",
      status: "Pending",
      paymentMethod: null,
      semester: "Fall 2023",
      receiptNo: null,
    },
    {
      id: "PAY-2023-007",
      studentId: "STU006",
      studentName: "Neha Gupta",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-07-15",
      status: "Pending",
      paymentMethod: null,
      semester: "Fall 2023",
      receiptNo: null,
    },
  ]

  // Filter payments based on search term
  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Payment statistics
  const totalAmount = payments.reduce((sum, payment) => (payment.status === "Paid" ? sum + payment.amount : sum), 0)
  const pendingAmount = payments.reduce(
    (sum, payment) => (payment.status === "Pending" ? sum + payment.amount : sum),
    0,
  )
  const hostelFeeAmount = payments
    .filter((payment) => payment.type === "Hostel Fee" && payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const messFeeAmount = payments
    .filter((payment) => payment.type === "Mess Fee" && payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={navItems}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-muted-foreground">View and manage all hostel payments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Record New Payment</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>Enter the details of the payment to record in the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select>
                    <SelectTrigger id="student">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stu001">John Doe (STU001)</SelectItem>
                      <SelectItem value="stu002">Priya Sharma (STU002)</SelectItem>
                      <SelectItem value="stu003">Rahul Singh (STU003)</SelectItem>
                      <SelectItem value="stu004">Ananya Patel (STU004)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-type">Payment Type</Label>
                  <Select>
                    <SelectTrigger id="payment-type">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hostel">Hostel Fee</SelectItem>
                      <SelectItem value="mess">Mess Fee</SelectItem>
                      <SelectItem value="late">Late Fee</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-date">Payment Date</Label>
                  <Input id="payment-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="online">Online Transfer</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring2023">Spring 2023</SelectItem>
                      <SelectItem value="fall2023">Fall 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Record Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">₹{totalAmount.toLocaleString()}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hostel Fee</p>
                  <h3 className="text-2xl font-bold mt-1">₹{hostelFeeAmount.toLocaleString()}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mess Fee</p>
                  <h3 className="text-2xl font-bold mt-1">₹{messFeeAmount.toLocaleString()}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                  <h3 className="text-2xl font-bold mt-1">₹{pendingAmount.toLocaleString()}</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <ArrowUpDown className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="hostel">Hostel Fee</TabsTrigger>
            <TabsTrigger value="mess">Mess Fee</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Payments</CardTitle>
                <CardDescription>Total of {payments.length} payment records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search payments..."
                        className="pl-8 w-full md:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="hostel">Hostel Fee</SelectItem>
                        <SelectItem value="mess">Mess Fee</SelectItem>
                        <SelectItem value="late">Late Fee</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Semesters</SelectItem>
                        <SelectItem value="spring2023">Spring 2023</SelectItem>
                        <SelectItem value="fall2023">Fall 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      <span className="hidden sm:inline">Advanced Filters</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download size={16} />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Payment ID</th>
                          <th className="text-left p-3 font-medium">Student</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Amount</th>
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Semester</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment.id} className="border-t hover:bg-slate-50">
                            <td className="p-3">{payment.id}</td>
                            <td className="p-3">
                              <div>
                                <div>{payment.studentName}</div>
                                <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                              </div>
                            </td>
                            <td className="p-3">{payment.type}</td>
                            <td className="p-3">₹{payment.amount.toLocaleString()}</td>
                            <td className="p-3">{payment.date}</td>
                            <td className="p-3">{payment.semester}</td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={
                                  payment.status === "Paid"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  {payment.status === "Paid" && (
                                    <DropdownMenuItem className="flex items-center gap-2">
                                      <Download className="h-4 w-4" />
                                      <span>Download Receipt</span>
                                    </DropdownMenuItem>
                                  )}
                                  {payment.status === "Pending" && (
                                    <DropdownMenuItem className="flex items-center gap-2">
                                      <FileEdit className="h-4 w-4" />
                                      <span>Mark as Paid</span>
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredPayments.length} of {payments.length} payments
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Paid Payments</CardTitle>
                <CardDescription>
                  Total of {payments.filter((payment) => payment.status === "Paid").length} paid payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Payment ID</th>
                          <th className="text-left p-3 font-medium">Student</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Amount</th>
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Receipt No.</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments
                          .filter((payment) => payment.status === "Paid")
                          .map((payment) => (
                            <tr key={payment.id} className="border-t hover:bg-slate-50">
                              <td className="p-3">{payment.id}</td>
                              <td className="p-3">
                                <div>
                                  <div>{payment.studentName}</div>
                                  <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                                </div>
                              </td>
                              <td className="p-3">{payment.type}</td>
                              <td className="p-3">₹{payment.amount.toLocaleString()}</td>
                              <td className="p-3">{payment.date}</td>
                              <td className="p-3">{payment.receiptNo}</td>
                              <td className="p-3">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                  <Download className="h-4 w-4" />
                                  <span>Receipt</span>
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>
                  Total of {payments.filter((payment) => payment.status === "Pending").length} pending payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Payment ID</th>
                          <th className="text-left p-3 font-medium">Student</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Amount</th>
                          <th className="text-left p-3 font-medium">Due Date</th>
                          <th className="text-left p-3 font-medium">Semester</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments
                          .filter((payment) => payment.status === "Pending")
                          .map((payment) => (
                            <tr key={payment.id} className="border-t hover:bg-slate-50">
                              <td className="p-3">{payment.id}</td>
                              <td className="p-3">
                                <div>
                                  <div>{payment.studentName}</div>
                                  <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                                </div>
                              </td>
                              <td className="p-3">{payment.type}</td>
                              <td className="p-3">₹{payment.amount.toLocaleString()}</td>
                              <td className="p-3">{payment.date}</td>
                              <td className="p-3">{payment.semester}</td>
                              <td className="p-3">
                                <Button size="sm">Mark as Paid</Button>
                              </td>
                            </tr>
                          ))}
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

