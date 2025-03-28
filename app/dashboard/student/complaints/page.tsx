"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Home, User, CreditCard, MessageSquare, FileText, Settings, Plus, Search } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState("")

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

  // Mock data for complaints
  const complaints = [
    {
      id: "C-2023-001",
      type: "Plumbing",
      issue: "Sink leaking in common bathroom",
      date: "2023-04-02",
      status: "In Progress",
      description:
        "The sink in the common bathroom is leaking. Water is accumulating on the floor creating a slippery surface.",
      assignedTo: "Maintenance Staff",
      comments: [
        { user: "Admin", text: "Maintenance team has been notified", date: "2023-04-02" },
        { user: "Maintenance", text: "Will check today", date: "2023-04-03" },
      ],
    },
    {
      id: "C-2023-002",
      type: "Wi-Fi",
      issue: "Poor connectivity in room",
      date: "2023-03-15",
      status: "Resolved",
      description:
        "Unable to connect to the hostel Wi-Fi network from Room 203. The signal is weak and keeps disconnecting.",
      assignedTo: "IT Support",
      comments: [
        { user: "Admin", text: "IT team will check the router", date: "2023-03-16" },
        { user: "IT Support", text: "Router has been replaced", date: "2023-03-18" },
        { user: "Admin", text: "Issue resolved", date: "2023-03-20" },
      ],
    },
    {
      id: "C-2023-003",
      type: "Electrical",
      issue: "Power socket not working",
      date: "2023-03-10",
      status: "Pending",
      description:
        "The power socket near my bed is not working. I've tried plugging in different devices but none work.",
      assignedTo: "Pending Assignment",
      comments: [],
    },
  ]

  // Filter complaints based on search term
  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.issue.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout
      userType="student"
      userName="John Doe"
      userRole="Room 203, Block A"
      userAvatar="JD"
      navItems={navItems}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Complaints & Requests</h1>
            <p className="text-muted-foreground dark:text-slate-400">
              Submit and track your complaints and maintenance requests
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>New Complaint</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit New Complaint</DialogTitle>
                <DialogDescription className="dark:text-slate-400">
                  Fill in the details of your complaint or maintenance request
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="complaint-type">Complaint Type</Label>
                  <Select>
                    <SelectTrigger id="complaint-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="wifi">Wi-Fi/Internet</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaint-title">Title</Label>
                  <Input id="complaint-title" placeholder="Brief title of your complaint" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaint-description">Description</Label>
                  <Textarea
                    id="complaint-description"
                    placeholder="Provide detailed information about your complaint"
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaint-location">Location</Label>
                  <Input
                    id="complaint-location"
                    placeholder="Where is the issue located?"
                    defaultValue="Room 203, Block A"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Complaint</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="dark:bg-slate-800">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>All Complaints</CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      View all your submitted complaints and requests
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
                    <Input
                      type="search"
                      placeholder="Search complaints..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredComplaints.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground dark:text-slate-400">No complaints found</p>
                    </div>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{complaint.issue}</h3>
                            <Badge
                              variant="outline"
                              className={
                                complaint.status === "Resolved"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : complaint.status === "In Progress"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {complaint.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <p className="text-xs text-muted-foreground dark:text-slate-400">ID: {complaint.id}</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">|</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">{complaint.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
                          {complaint.description}
                        </p>

                        {complaint.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Comments:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {complaint.comments.map((comment, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user}:</span>
                                    <span className="text-xs text-muted-foreground dark:text-slate-400">
                                      {comment.date}
                                    </span>
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Pending Complaints</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Complaints that are waiting to be addressed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "Pending")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{complaint.issue}</h3>
                            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                              Pending
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <p className="text-xs text-muted-foreground dark:text-slate-400">ID: {complaint.id}</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">|</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">{complaint.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
                          {complaint.description}
                        </p>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>In Progress Complaints</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Complaints that are currently being addressed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "In Progress")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{complaint.issue}</h3>
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              In Progress
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <p className="text-xs text-muted-foreground dark:text-slate-400">ID: {complaint.id}</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">|</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">{complaint.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
                          {complaint.description}
                        </p>

                        {complaint.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Comments:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {complaint.comments.map((comment, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user}:</span>
                                    <span className="text-xs text-muted-foreground dark:text-slate-400">
                                      {comment.date}
                                    </span>
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Resolved Complaints</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Complaints that have been successfully resolved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "Resolved")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{complaint.issue}</h3>
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Resolved
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <p className="text-xs text-muted-foreground dark:text-slate-400">ID: {complaint.id}</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">|</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">{complaint.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
                          {complaint.description}
                        </p>

                        {complaint.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Comments:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {complaint.comments.map((comment, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user}:</span>
                                    <span className="text-xs text-muted-foreground dark:text-slate-400">
                                      {comment.date}
                                    </span>
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
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

