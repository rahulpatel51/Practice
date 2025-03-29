"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  FileEdit,
  Trash2,
  UserPlus,
  Users,
  UserCheck,
  UserX,
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
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { adminNavItems } from "@/components/admin/admin-nav-items"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

type Student = {
  id: string
  name: string
  room: string
  course: string
  year: string
  contact: string
  email: string
  status: "Active" | "On Leave" | "Suspended"
  avatar: string
  feeStatus: "Paid" | "Pending" | "Overdue"
  admissionDate: string
  emergencyContact?: string
  address?: string
}

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [students, setStudents] = useState<Student[]>([
    {
      id: "STU001",
      name: "John Doe",
      room: "203, Block A",
      course: "Computer Science",
      year: "3rd Year",
      contact: "+91 98765 43210",
      email: "john.doe@example.com",
      status: "Active",
      avatar: "JD",
      feeStatus: "Paid",
      admissionDate: "2021-07-15",
      emergencyContact: "+91 98765 43211",
      address: "123 Main St, Bangalore, Karnataka"
    },
    {
      id: "STU002",
      name: "Priya Sharma",
      room: "105, Block A",
      course: "Electronics",
      year: "2nd Year",
      contact: "+91 87654 32109",
      email: "priya.sharma@example.com",
      status: "Active",
      avatar: "PS",
      feeStatus: "Paid",
      admissionDate: "2022-07-10",
      emergencyContact: "+91 87654 32108",
      address: "456 Oak Ave, Mumbai, Maharashtra"
    },
    {
      id: "STU003",
      name: "Rahul Singh",
      room: "203, Block A",
      course: "Computer Science",
      year: "3rd Year",
      contact: "+91 76543 21098",
      email: "rahul.singh@example.com",
      status: "On Leave",
      avatar: "RS",
      feeStatus: "Paid",
      admissionDate: "2021-07-12",
      emergencyContact: "+91 76543 21097",
      address: "789 Pine Rd, Delhi"
    },
    {
      id: "STU004",
      name: "Ananya Patel",
      room: "304, Block B",
      course: "Mechanical",
      year: "4th Year",
      contact: "+91 65432 10987",
      email: "ananya.patel@example.com",
      status: "Active",
      avatar: "AP",
      feeStatus: "Pending",
      admissionDate: "2020-07-20",
      emergencyContact: "+91 65432 10986",
      address: "321 Elm St, Hyderabad, Telangana"
    },
    {
      id: "STU005",
      name: "Vikram Mehta",
      room: "210, Block A",
      course: "Civil",
      year: "2nd Year",
      contact: "+91 54321 09876",
      email: "vikram.mehta@example.com",
      status: "Active",
      avatar: "VM",
      feeStatus: "Paid",
      admissionDate: "2022-07-18",
      emergencyContact: "+91 54321 09875",
      address: "654 Maple Dr, Chennai, Tamil Nadu"
    },
    {
      id: "STU006",
      name: "Neha Gupta",
      room: "106, Block A",
      course: "Information Technology",
      year: "1st Year",
      contact: "+91 43210 98765",
      email: "neha.gupta@example.com",
      status: "Active",
      avatar: "NG",
      feeStatus: "Pending",
      admissionDate: "2023-07-05",
      emergencyContact: "+91 43210 98764",
      address: "987 Cedar Ln, Pune, Maharashtra"
    },
  ])

  // State for new student form
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'avatar' | 'status' | 'feeStatus' | 'admissionDate'>>({
    name: "",
    room: "",
    course: "",
    year: "",
    contact: "",
    email: "",
  })

  // State for editing student
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const [deleteStudentId, setDeleteStudentId] = useState<string | null>(null)

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCourse = courseFilter === "all" || student.course.toLowerCase().includes(courseFilter.toLowerCase())
    const matchesYear = yearFilter === "all" || student.year.startsWith(yearFilter)
    
    return matchesSearch && matchesCourse && matchesYear
  })

  // Handle adding a new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.contact) {
      toast.error("Please fill in all required fields")
      return
    }

    const initials = newStudent.name.split(' ').map(n => n[0]).join('').toUpperCase()
    const newId = `STU${String(students.length + 1).padStart(3, '0')}`
    
    const addedStudent: Student = {
      ...newStudent,
      id: newId,
      avatar: initials,
      status: "Active",
      feeStatus: "Pending",
      admissionDate: new Date().toISOString().split('T')[0]
    }

    setStudents([...students, addedStudent])
    setNewStudent({
      name: "",
      room: "",
      course: "",
      year: "",
      contact: "",
      email: "",
    })
    toast.success("Student added successfully")
  }

  // Handle updating a student
  const handleUpdateStudent = () => {
    if (!editingStudent) return

    const updatedStudents = students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    )
    
    setStudents(updatedStudents)
    setEditingStudent(null)
    toast.success("Student updated successfully")
  }

  // Handle deleting a student
  const handleDeleteStudent = () => {
    if (!deleteStudentId) return

    setStudents(students.filter(student => student.id !== deleteStudentId))
    setDeleteStudentId(null)
    toast.success("Student deleted successfully")
  }

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={adminNavItems}
    >
      <div className="max-w-7xl mx-auto space-y-6 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground">View and manage all students in the hostel</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                <UserPlus size={16} />
                <span>Add New Student</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the details of the new student to add them to the hostel.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="Enter full name" 
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter email address" 
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number <span className="text-red-500">*</span></Label>
                    <Input 
                      id="contact" 
                      placeholder="Enter contact number" 
                      value={newStudent.contact}
                      onChange={(e) => setNewStudent({...newStudent, contact: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={newStudent.course}
                      onValueChange={(value) => setNewStudent({...newStudent, course: value})}
                    >
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      value={newStudent.year}
                      onValueChange={(value) => setNewStudent({...newStudent, year: value})}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Room</Label>
                    <Input 
                      id="room" 
                      placeholder="Enter room number" 
                      value={newStudent.room}
                      onChange={(e) => setNewStudent({...newStudent, room: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700" 
                  onClick={handleAddStudent}
                >
                  Add Student
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={students.length}
            icon={<Users className="h-5 w-5" />}
            color="bg-indigo-100 text-indigo-600"
          />
          <StatCard
            title="Active Students"
            value={students.filter((s) => s.status === "Active").length}
            icon={<UserCheck className="h-5 w-5" />}
            color="bg-emerald-100 text-emerald-600"
          />
          <StatCard
            title="On Leave"
            value={students.filter((s) => s.status === "On Leave").length}
            icon={<UserX className="h-5 w-5" />}
            color="bg-amber-100 text-amber-600"
          />
          <StatCard
            title="Fee Pending"
            value={students.filter((s) => s.feeStatus === "Pending").length}
            icon={<Users className="h-5 w-5" />}
            color="bg-red-100 text-red-600"
          />
        </div>

        {/* Student Directory */}
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Students Directory</CardTitle>
                <CardDescription>
                  Total of {students.length} students registered in the hostel
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Advanced</span>
              </Button>
            </div>

            {/* Student Table */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-4 font-medium">Student</th>
                      <th className="text-left p-4 font-medium">Room</th>
                      <th className="text-left p-4 font-medium">Course</th>
                      <th className="text-left p-4 font-medium">Year</th>
                      <th className="text-left p-4 font-medium">Fee Status</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr 
                          key={student.id} 
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-slate-100 dark:bg-slate-700">
                                  {student.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{student.room}</td>
                          <td className="p-4">{student.course}</td>
                          <td className="p-4">{student.year}</td>
                          <td className="p-4">
                            <Badge
                              variant="outline"
                              className={
                                student.feeStatus === "Paid"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300"
                                  : student.feeStatus === "Pending"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
                                    : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                              }
                            >
                              {student.feeStatus}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant="outline"
                              className={
                                student.status === "Active"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300"
                                  : student.status === "On Leave"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
                                    : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                              }
                            >
                              {student.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {/* View Button */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                    onClick={() => setViewingStudent(student)}
                                  >
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View</span>
                                  </Button>
                                </DialogTrigger>
                                {viewingStudent && (
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Student Details</DialogTitle>
                                      <DialogDescription>
                                        Complete information about {viewingStudent.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                          <AvatarFallback className="text-xl bg-slate-100 dark:bg-slate-700">
                                            {viewingStudent.avatar}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="text-xl font-bold">{viewingStudent.name}</h3>
                                          <p className="text-muted-foreground">{viewingStudent.id}</p>
                                          <Badge className="mt-1">
                                            {viewingStudent.course} - {viewingStudent.year}
                                          </Badge>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label>Room</Label>
                                          <p className="font-medium">{viewingStudent.room}</p>
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Admission Date</Label>
                                          <p className="font-medium">{viewingStudent.admissionDate}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label>Contact</Label>
                                          <p className="font-medium">{viewingStudent.contact}</p>
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Email</Label>
                                          <p className="font-medium">{viewingStudent.email}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label>Emergency Contact</Label>
                                        <p className="font-medium">
                                          {viewingStudent.emergencyContact || "Not provided"}
                                        </p>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label>Address</Label>
                                        <p className="font-medium">
                                          {viewingStudent.address || "Not provided"}
                                        </p>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label>Status</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingStudent.status === "Active"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                : viewingStudent.status === "On Leave"
                                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                            }
                                          >
                                            {viewingStudent.status}
                                          </Badge>
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Fee Status</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingStudent.feeStatus === "Paid"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                : viewingStudent.feeStatus === "Pending"
                                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                            }
                                          >
                                            {viewingStudent.feeStatus}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button>Close</Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                )}
                              </Dialog>
                              
                              {/* Edit Button */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                    onClick={() => setEditingStudent(student)}
                                  >
                                    <FileEdit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </DialogTrigger>
                                {editingStudent && (
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Student</DialogTitle>
                                      <DialogDescription>
                                        Update the details of {editingStudent.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-name">Name</Label>
                                          <Input
                                            id="edit-name"
                                            value={editingStudent.name}
                                            onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-email">Email</Label>
                                          <Input
                                            id="edit-email"
                                            type="email"
                                            value={editingStudent.email}
                                            onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                                          />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-contact">Contact</Label>
                                          <Input
                                            id="edit-contact"
                                            value={editingStudent.contact}
                                            onChange={(e) => setEditingStudent({...editingStudent, contact: e.target.value})}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-room">Room</Label>
                                          <Input
                                            id="edit-room"
                                            value={editingStudent.room}
                                            onChange={(e) => setEditingStudent({...editingStudent, room: e.target.value})}
                                          />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-course">Course</Label>
                                          <Select
                                            value={editingStudent.course}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, course: value})}
                                          >
                                            <SelectTrigger id="edit-course">
                                              <SelectValue placeholder="Select course" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Computer Science">Computer Science</SelectItem>
                                              <SelectItem value="Electronics">Electronics</SelectItem>
                                              <SelectItem value="Mechanical">Mechanical</SelectItem>
                                              <SelectItem value="Civil">Civil</SelectItem>
                                              <SelectItem value="Information Technology">Information Technology</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-year">Year</Label>
                                          <Select
                                            value={editingStudent.year}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, year: value})}
                                          >
                                            <SelectTrigger id="edit-year">
                                              <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="1st Year">1st Year</SelectItem>
                                              <SelectItem value="2nd Year">2nd Year</SelectItem>
                                              <SelectItem value="3rd Year">3rd Year</SelectItem>
                                              <SelectItem value="4th Year">4th Year</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-status">Status</Label>
                                          <Select
                                            value={editingStudent.status}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, status: value as Student['status']})}
                                          >
                                            <SelectTrigger id="edit-status">
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Active">Active</SelectItem>
                                              <SelectItem value="On Leave">On Leave</SelectItem>
                                              <SelectItem value="Suspended">Suspended</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-feeStatus">Fee Status</Label>
                                          <Select
                                            value={editingStudent.feeStatus}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, feeStatus: value as Student['feeStatus']})}
                                          >
                                            <SelectTrigger id="edit-feeStatus">
                                              <SelectValue placeholder="Select fee status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Paid">Paid</SelectItem>
                                              <SelectItem value="Pending">Pending</SelectItem>
                                              <SelectItem value="Overdue">Overdue</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-emergencyContact">Emergency Contact</Label>
                                        <Input
                                          id="edit-emergencyContact"
                                          value={editingStudent.emergencyContact || ""}
                                          onChange={(e) => setEditingStudent({...editingStudent, emergencyContact: e.target.value})}
                                        />
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-address">Address</Label>
                                        <Textarea
                                          id="edit-address"
                                          value={editingStudent.address || ""}
                                          onChange={(e) => setEditingStudent({...editingStudent, address: e.target.value})}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                      </DialogClose>
                                      <Button 
                                        className="bg-indigo-600 hover:bg-indigo-700" 
                                        onClick={handleUpdateStudent}
                                      >
                                        Save Changes
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                )}
                              </Dialog>
                              
                              {/* Delete Button */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="hover:bg-slate-200 dark:hover:bg-slate-700 text-red-600 hover:text-red-700"
                                    onClick={() => setDeleteStudentId(student.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Delete Student</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete {student.name}? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button 
                                      variant="destructive" 
                                      onClick={handleDeleteStudent}
                                    >
                                      Delete Student
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          No students found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredStudents.length}</span> of{" "}
                <span className="font-medium">{students.length}</span> students
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <div className={`${color} p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}