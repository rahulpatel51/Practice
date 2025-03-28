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
  CheckCircle,
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

export default function AdminComplaintsPage() {
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

  // Mock data for complaints
  const complaints = [
    {
      id: "C-2023-001",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Plumbing",
      issue: "Sink leaking in common bathroom",
      description:
        "The sink in the common bathroom is leaking. Water is accumulating on the floor creating a slippery surface.",
      date: "2023-04-02",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "Maintenance Staff",
      comments: [
        { user: "Admin", text: "Maintenance team has been notified", date: "2023-04-02" },
        { user: "Maintenance", text: "Will check today", date: "2023-04-03" },
      ],
    },
    {
      id: "C-2023-002",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Wi-Fi",
      issue: "Poor connectivity in room",
      description:
        "Unable to connect to the hostel Wi-Fi network from Room 203. The signal is weak and keeps disconnecting.",
      date: "2023-03-15",
      status: "Resolved",
      priority: "High",
      assignedTo: "IT Support",
      comments: [
        { user: "Admin", text: "IT team will check the router", date: "2023-03-16" },
        { user: "IT Support", text: "Router has been replaced", date: "2023-03-18" },
        { user: "Admin", text: "Issue resolved", date: "2023-03-20" },
      ],
    },
    {
      id: "C-2023-003",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Electrical",
      issue: "Power socket not working",
      description:
        "The power socket near my bed is not working. I've tried plugging in different devices but none work.",
      date: "2023-03-10",
      status: "Pending",
      priority: "Low",
      assignedTo: "Pending Assignment",
      comments: [],
    },
    {
      id: "C-2023-004",
      studentId: "STU002",
      studentName: "Priya Sharma",
      room: "105, Block A",
      type: "Furniture",
      issue: "Broken chair",
      description: "One of the chairs in my room is broken. The leg is loose and it's unsafe to sit on.",
      date: "2023-04-05",
      status: "Pending",
      priority: "Medium",
      assignedTo: "Pending Assignment",
      comments: [],
    },
    {
      id: "C-2023-005",
      studentId: "STU003",
      studentName: "Rahul Singh",
      room: "203, Block A",
      type: "Cleaning",
      issue: "Bathroom needs cleaning",
      description:
        "The shared bathroom on our floor hasn't been cleaned properly. There's mold growing in the corners.",
      date: "2023-04-10",
      status: "In Progress",
      priority: "High",
      assignedTo: "Cleaning Staff",
      comments: [{ user: "Admin", text: "Cleaning staff has been notified", date: "2023-04-10" }],
    },
    {
      id: "C-2023-006",
      studentId: "STU004",
      studentName: "Ananya Patel",
      room: "304, Block B",
      type: "Security",
      issue: "Broken door lock",
      description: "The lock on my room door is broken. I can't lock my room when I leave.",
      date: "2023-04-12",
      status: "Pending",
      priority: "High",
      assignedTo: "Pending Assignment",
      comments: [],
    },
  ]

  // Filter complaints based on search term
  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Complaint statistics
  const totalComplaints = complaints.length
  const pendingComplaints = complaints.filter((complaint) => complaint.status === "Pending").length
  const inProgressComplaints = complaints.filter((complaint) => complaint.status === "In Progress").length
  const resolvedComplaints = complaints.filter((complaint) => complaint.status === "Resolved").length
  const highPriorityComplaints = complaints.filter((complaint) => complaint.priority === "High").length

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
            <h1 className="text-2xl font-bold tracking-tight">Complaint Management</h1>
            <p className="text-muted-foreground">View and manage all student complaints and maintenance requests</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                  <h3 className="text-2xl font-bold mt-1">{totalComplaints}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">{pendingComplaints}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <h3 className="text-2xl font-bold mt-1">{inProgressComplaints}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <h3 className="text-2xl font-bold mt-1">{resolvedComplaints}</h3>
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
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <h3 className="text-2xl font-bold mt-1">{highPriorityComplaints}</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Complaints</CardTitle>
                <CardDescription>Total of {complaints.length} complaints in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search complaints..."
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
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="wifi">Wi-Fi</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
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
                          <th className="text-left p-3 font-medium">Issue</th>
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Priority</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredComplaints.map((complaint) => (
                          <tr key={complaint.id} className="border-t hover:bg-slate-50">
                            <td className="p-3">{complaint.id}</td>
                            <td className="p-3">
                              <div>
                                <div>{complaint.studentName}</div>
                                <div className="text-xs text-muted-foreground">{complaint.room}</div>
                              </div>
                            </td>
                            <td className="p-3">{complaint.type}</td>
                            <td className="p-3">{complaint.issue}</td>
                            <td className="p-3">{complaint.date}</td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={
                                  complaint.priority === "High"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : complaint.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                }
                              >
                                {complaint.priority}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={
                                  complaint.status === "Resolved"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : complaint.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }
                              >
                                {complaint.status}
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
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <FileEdit className="h-4 w-4" />
                                    <span>Update Status</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Add Comment</span>
                                  </DropdownMenuItem>
                                  {complaint.status !== "Resolved" && (
                                    <DropdownMenuItem className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Mark as Resolved</span>
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
                    Showing {filteredComplaints.length} of {complaints.length} complaints
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
                <CardTitle>Pending Complaints</CardTitle>
                <CardDescription>
                  Total of {complaints.filter((complaint) => complaint.status === "Pending").length} pending complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "Pending")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.issue}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  complaint.priority === "High"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : complaint.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                }
                              >
                                {complaint.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {complaint.id} • {complaint.type} • Reported on {complaint.date}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Student:</span> {complaint.studentName} ({complaint.room})
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{complaint.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <FileEdit className="h-4 w-4" />
                                <span>Assign</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Assign Complaint</DialogTitle>
                                <DialogDescription>
                                  Assign this complaint to staff and update its status
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="assign-to">Assign To</Label>
                                  <Select>
                                    <SelectTrigger id="assign-to">
                                      <SelectValue placeholder="Select staff" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="maintenance">Maintenance Staff</SelectItem>
                                      <SelectItem value="it">IT Support</SelectItem>
                                      <SelectItem value="cleaning">Cleaning Staff</SelectItem>
                                      <SelectItem value="security">Security Staff</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="priority">Priority</Label>
                                  <Select defaultValue={complaint.priority.toLowerCase()}>
                                    <SelectTrigger id="priority">
                                      <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="status">Status</Label>
                                  <Select defaultValue="in-progress">
                                    <SelectTrigger id="status">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="comment">Comment</Label>
                                  <Textarea id="comment" placeholder="Add a comment about this assignment" rows={3} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Assign & Update</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>In Progress Complaints</CardTitle>
                <CardDescription>
                  Total of {complaints.filter((complaint) => complaint.status === "In Progress").length} complaints in
                  progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "In Progress")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.issue}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  complaint.priority === "High"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : complaint.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                }
                              >
                                {complaint.priority}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                In Progress
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {complaint.id} • {complaint.type} • Reported on {complaint.date}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{complaint.description}</p>

                        {complaint.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Comments:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {complaint.comments.map((comment, index) => (
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>Add Comment</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Add Comment</DialogTitle>
                                <DialogDescription>
                                  Add a comment to update the status of this complaint
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="comment">Comment</Label>
                                  <Textarea id="comment" placeholder="Add your comment here" rows={4} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Add Comment</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Resolved Complaints</CardTitle>
                <CardDescription>
                  Total of {complaints.filter((complaint) => complaint.status === "Resolved").length} resolved
                  complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "Resolved")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.issue}</h3>
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                Resolved
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {complaint.id} • {complaint.type} • Reported on {complaint.date}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Resolved by:</span> {complaint.assignedTo}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{complaint.description}</p>

                        {complaint.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Resolution History:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {complaint.comments.map((comment, index) => (
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
                            <span>View Full Details</span>
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

