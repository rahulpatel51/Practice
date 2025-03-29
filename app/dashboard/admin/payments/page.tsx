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
  ChevronLeft,
  ChevronRight,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())

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
      active: true
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

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = paymentTypeFilter === "all" || payment.type.toLowerCase().includes(paymentTypeFilter.toLowerCase())
    const matchesSemester = semesterFilter === "all" || payment.semester.toLowerCase().includes(semesterFilter.toLowerCase())
    
    return matchesSearch && matchesType && matchesSemester
  })

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={navItems}
    >
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-muted-foreground">View and manage all hostel payments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 w-full md:w-auto">
                <Plus size={16} />
                <span>Record New Payment</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Record New Payment</DialogTitle>
                <DialogDescription>
                  Enter the details of the payment to record in the system.
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student" className="font-medium">
                      Student <span className="text-red-500">*</span>
                    </Label>
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
                    <Label htmlFor="payment-type" className="font-medium">
                      Payment Type <span className="text-red-500">*</span>
                    </Label>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="font-medium">
                      Amount (₹) <span className="text-red-500">*</span>
                    </Label>
                    <Input id="amount" type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-date" className="font-medium">
                      Payment Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="payment-date"
                      type="date"
                      value={date ? date.toISOString().split("T")[0] : ""}
                      onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-method" className="font-medium">
                      Payment Method
                    </Label>
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
                    <Label htmlFor="semester" className="font-medium">
                      Semester <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger id="semester">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spring2023">Spring 2023</SelectItem>
                        <SelectItem value="fall2023">Fall 2023</SelectItem>
                        <SelectItem value="spring2024">Spring 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="font-medium">
                    Notes
                  </Label>
                  <Input id="notes" placeholder="Additional notes (optional)" />
                </div>
              </div>
              <Separator />
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Record Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">₹{totalAmount.toLocaleString()}</h3>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hostel Fee</p>
                  <h3 className="text-2xl font-bold mt-1">₹{hostelFeeAmount.toLocaleString()}</h3>
                  <p className="text-xs text-muted-foreground mt-1">18 payments</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mess Fee</p>
                  <h3 className="text-2xl font-bold mt-1">₹{messFeeAmount.toLocaleString()}</h3>
                  <p className="text-xs text-muted-foreground mt-1">9 payments</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                  <h3 className="text-2xl font-bold mt-1">₹{pendingAmount.toLocaleString()}</h3>
                  <p className="text-xs text-red-600 mt-1">2 pending payments</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <ArrowUpDown className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="hostel">Hostel Fee</TabsTrigger>
              <TabsTrigger value="mess">Mess Fee</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search payments..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2 space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="type-filter">Payment Type</Label>
                      <Select
                        value={paymentTypeFilter}
                        onValueChange={(value) => {
                          setPaymentTypeFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="type-filter" className="h-8">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="hostel">Hostel Fee</SelectItem>
                          <SelectItem value="mess">Mess Fee</SelectItem>
                          <SelectItem value="late">Late Fee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="semester-filter">Semester</Label>
                      <Select
                        value={semesterFilter}
                        onValueChange={(value) => {
                          setSemesterFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="semester-filter" className="h-8">
                          <SelectValue placeholder="All Semesters" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Semesters</SelectItem>
                          <SelectItem value="spring2023">Spring 2023</SelectItem>
                          <SelectItem value="fall2023">Fall 2023</SelectItem>
                          <SelectItem value="spring2024">Spring 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Download size={16} />
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>All Payments</CardTitle>
                    <CardDescription>
                      Showing {filteredPayments.length} payment records
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments.length > 0 ? (
                        paginatedPayments.map((payment) => (
                          <TableRow key={payment.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{payment.studentName}</div>
                              <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                            </TableCell>
                            <TableCell>{payment.type}</TableCell>
                            <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              {format(new Date(payment.date), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell>{payment.semester}</TableCell>
                            <TableCell>
                              <Badge
                                variant={payment.status === "Paid" ? "default" : "secondary"}
                                className={
                                  payment.status === "Paid"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
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
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  {payment.status === "Paid" && (
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                      <Download className="h-4 w-4" />
                                      <span>Download Receipt</span>
                                    </DropdownMenuItem>
                                  )}
                                  {payment.status === "Pending" && (
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                      <FileEdit className="h-4 w-4" />
                                      <span>Mark as Paid</span>
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No payments found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Paid Payments</CardTitle>
                <CardDescription>
                  {payments.filter((p) => p.status === "Paid").length} paid payments totaling ₹
                  {payments
                    .filter((p) => p.status === "Paid")
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Receipt No.</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((p) => p.status === "Paid")
                        .map((payment) => (
                          <TableRow key={payment.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{payment.studentName}</div>
                              <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                            </TableCell>
                            <TableCell>{payment.type}</TableCell>
                            <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              {format(new Date(payment.date), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell>{payment.receiptNo}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="h-8">
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>
                  {payments.filter((p) => p.status === "Pending").length} pending payments totaling ₹
                  {payments
                    .filter((p) => p.status === "Pending")
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((p) => p.status === "Pending")
                        .map((payment) => (
                          <TableRow key={payment.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{payment.studentName}</div>
                              <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                            </TableCell>
                            <TableCell>{payment.type}</TableCell>
                            <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              {format(new Date(payment.date), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell>{payment.semester}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" className="h-8">
                                Mark as Paid
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}