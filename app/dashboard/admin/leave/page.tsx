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
  CheckCircle,
  X,
  Building,
  Home,
  Users,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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

export default function AdminLeavePage() {
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

  // Mock data for leave applications
  const leaveApplications = [
    {
      id: "L-2023-001",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Weekend",
      fromDate: "2023-04-14",
      toDate: "2023-04-16",
      reason: "Going home for the weekend",
      appliedOn: "2023-04-10",
      status: "Approved",
      approvedBy: "Dr. Rajesh Kumar",
      comments: [{ user: "Warden", text: "Approved. Make sure to return on time.", date: "2023-04-11" }],
    },
    {
      id: "L-2023-002",
      studentId: "STU003",
      studentName: "Rahul Singh",
      room: "203, Block A",
      type: "Medical",
      fromDate: "2023-03-05",
      toDate: "2023-03-08",
      reason: "Need to visit home for medical treatment",
      appliedOn: "2023-03-03",
      status: "Rejected",
      approvedBy: "Dr. Rajesh Kumar",
      comments: [
        { user: "Warden", text: "Rejected. Medical leave requires proper documentation.", date: "2023-03-04" },
        { user: "Student", text: "I don't have a certificate yet as I need to visit the doctor", date: "2023-03-04" },
        { user: "Warden", text: "Rejected. Medical leave requires proper documentation.", date: "2023-03-04" },
      ],
    },
    {
      id: "L-2023-003",
      studentId: "STU002",
      studentName: "Priya Sharma",
      room: "105, Block A",
      type: "Academic",
      fromDate: "2023-05-10",
      toDate: "2023-05-12",
      reason: "Attending a conference at Delhi University",
      appliedOn: "2023-05-01",
      status: "Pending",
      approvedBy: null,
      comments: [],
    },
    {
      id: "L-2023-004",
      studentId: "STU004",
      studentName: "Ananya Patel",
      room: "304, Block B",
      type: "Personal",
      fromDate: "2023-04-20",
      toDate: "2023-04-22",
      reason: "Family function at home",
      appliedOn: "2023-04-15",
      status: "Pending",
      approvedBy: null,
      comments: [],
    },
    {
      id: "L-2023-005",
      studentId: "STU006",
      studentName: "Neha Gupta",
      room: "106, Block A",
      type: "Night Out",
      fromDate: "2023-04-18",
      toDate: "2023-04-18",
      reason: "Going for a cultural event in the city",
      appliedOn: "2023-04-16",
      status: "Pending",
      approvedBy: null,
      comments: [],
    },
  ]

  // Filter leave applications based on search term
  const filteredLeaveApplications = leaveApplications.filter(
    (application) =>
      application.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Leave application statistics
  const totalApplications = leaveApplications.length
  const pendingApplications = leaveApplications.filter((app) => app.status === "Pending").length
  const approvedApplications = leaveApplications.filter((app) => app.status === "Approved").length
  const rejectedApplications = leaveApplications.filter((app) => app.status === "Rejected").length

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
            <h1 className="text-2xl font-bold tracking-tight">Leave Application Management</h1>
            <p className="text-muted-foreground">View and manage student leave applications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <h3 className="text-2xl font-bold mt-1">{totalApplications}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">{pendingApplications}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <h3 className="text-2xl font-bold mt-1">{approvedApplications}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <h3 className="text-2xl font-bold mt-1">{rejectedApplications}</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <X className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Leave Applications</CardTitle>
                <CardDescription>Total of {leaveApplications.length} leave applications in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search applications..."
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
                        <SelectItem value="weekend">Weekend</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="night-out">Night Out</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
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
                          <th className="text-left p-3 font-medium">ID</th>
                          <th className="text-left p-3 font-medium">Student</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">From</th>
                          <th className="text-left p-3 font-medium">To</th>
                          <th className="text-left p-3 font-medium">Applied On</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeaveApplications.map((application) => (
                          <tr key={application.id} className="border-t hover:bg-slate-50">
                            <td className="p-3">{application.id}</td>
                            <td className="p-3">
                              <div>
                                <div>{application.studentName}</div>
                                <div className="text-xs text-muted-foreground">{application.room}</div>
                              </div>
                            </td>
                            <td className="p-3">{application.type}</td>
                            <td className="p-3">{application.fromDate}</td>
                            <td className="p-3">{application.toDate}</td>
                            <td className="p-3">{application.appliedOn}</td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={
                                  application.status === "Approved"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : application.status === "Rejected"
                                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }
                              >
                                {application.status}
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
                                  {application.status === "Pending" && (
                                    <>
                                      <DropdownMenuItem className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        <span>Approve</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="flex items-center gap-2">
                                        <X className="h-4 w-4" />
                                        <span>Reject</span>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Add Comment</span>
                                  </DropdownMenuItem>
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
                    Showing {filteredLeaveApplications.length} of {leaveApplications.length} applications
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

          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Leave Applications</CardTitle>
                <CardDescription>
                  Total of {leaveApplications.filter((app) => app.status === "Pending").length} pending applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications
                    .filter((application) => application.status === "Pending")
                    .map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{application.type} Leave</h3>
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                Pending
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {application.id} • Applied on {application.appliedOn}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Student:</span> {application.studentName} (
                              {application.room})
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">From Date</p>
                            <p className="font-medium">{application.fromDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">To Date</p>
                            <p className="font-medium">{application.toDate}</p>
                          </div>
                        </div>

                        <p className="text-sm mb-4">
                          <span className="font-medium">Reason: </span>
                          {application.reason}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                <span>Approve</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Approve Leave Application</DialogTitle>
                                <DialogDescription>
                                  Approve this leave application and add a comment if needed
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="comment">Comment (Optional)</Label>
                                  <Textarea id="comment" placeholder="Add a comment for the student" rows={3} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Approve Leave</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <X className="h-4 w-4" />
                                <span>Reject</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Reject Leave Application</DialogTitle>
                                <DialogDescription>
                                  Reject this leave application and provide a reason
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="reason">Reason for Rejection</Label>
                                  <Textarea
                                    id="reason"
                                    placeholder="Provide a reason for rejecting this application"
                                    rows={3}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive">Reject Leave</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Approved Leave Applications</CardTitle>
                <CardDescription>
                  Total of {leaveApplications.filter((app) => app.status === "Approved").length} approved applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications
                    .filter((application) => application.status === "Approved")
                    .map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{application.type} Leave</h3>
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                Approved
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {application.id} • Applied on {application.appliedOn}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Student:</span> {application.studentName} (
                              {application.room})
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">From Date</p>
                            <p className="font-medium">{application.fromDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">To Date</p>
                            <p className="font-medium">{application.toDate}</p>
                          </div>
                        </div>

                        <p className="text-sm mb-4">
                          <span className="font-medium">Reason: </span>
                          {application.reason}
                        </p>

                        <p className="text-sm mb-4">
                          <span className="font-medium">Approved by: </span>
                          {application.approvedBy}
                        </p>

                        {application.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Comments:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {application.comments.map((comment, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user}:</span>
                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Rejected Leave Applications</CardTitle>
                <CardDescription>
                  Total of {leaveApplications.filter((app) => app.status === "Rejected").length} rejected applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications
                    .filter((application) => application.status === "Rejected")
                    .map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{application.type} Leave</h3>
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                Rejected
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {application.id} • Applied on {application.appliedOn}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Student:</span> {application.studentName} (
                              {application.room})
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">From Date</p>
                            <p className="font-medium">{application.fromDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">To Date</p>
                            <p className="font-medium">{application.toDate}</p>
                          </div>
                        </div>

                        <p className="text-sm mb-4">
                          <span className="font-medium">Reason: </span>
                          {application.reason}
                        </p>

                        <p className="text-sm mb-4">
                          <span className="font-medium">Rejected by: </span>
                          {application.approvedBy}
                        </p>

                        {application.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Comments:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {application.comments.map((comment, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user}:</span>
                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

