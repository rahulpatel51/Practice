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
  Trash2,
  Plus,
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
import { Separator } from "@/components/ui/separator"

export default function AdminRoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roomTypeFilter, setRoomTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

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

  // Mock data for rooms
  const rooms = [
    {
      id: "A-101",
      block: "A",
      number: "101",
      type: "Double Sharing",
      capacity: 2,
      occupied: 2,
      status: "Occupied",
      occupants: ["John Doe", "Rahul Singh"],
      lastMaintenance: "2023-02-15",
    },
    {
      id: "A-102",
      block: "A",
      number: "102",
      type: "Double Sharing",
      capacity: 2,
      occupied: 1,
      status: "Partially Occupied",
      occupants: ["Priya Sharma"],
      lastMaintenance: "2023-02-15",
    },
    {
      id: "A-103",
      block: "A",
      number: "103",
      type: "Single",
      capacity: 1,
      occupied: 1,
      status: "Occupied",
      occupants: ["Vikram Mehta"],
      lastMaintenance: "2023-02-15",
    },
    {
      id: "A-104",
      block: "A",
      number: "104",
      type: "Double Sharing",
      capacity: 2,
      occupied: 0,
      status: "Vacant",
      occupants: [],
      lastMaintenance: "2023-02-15",
    },
    {
      id: "B-201",
      block: "B",
      number: "201",
      type: "Double Sharing",
      capacity: 2,
      occupied: 2,
      status: "Occupied",
      occupants: ["Ananya Patel", "Neha Gupta"],
      lastMaintenance: "2023-03-10",
    },
    {
      id: "B-202",
      block: "B",
      number: "202",
      type: "Double Sharing",
      capacity: 2,
      occupied: 2,
      status: "Occupied",
      occupants: ["Amit Kumar", "Rajesh Verma"],
      lastMaintenance: "2023-03-10",
    },
    {
      id: "B-203",
      block: "B",
      number: "203",
      type: "Single",
      capacity: 1,
      occupied: 0,
      status: "Under Maintenance",
      occupants: [],
      lastMaintenance: "2023-04-05",
    },
    {
      id: "C-301",
      block: "C",
      number: "301",
      type: "Triple Sharing",
      capacity: 3,
      occupied: 2,
      status: "Partially Occupied",
      occupants: ["Sanjay Patel", "Kiran Shah"],
      lastMaintenance: "2023-01-20",
    },
  ]

  // Filter rooms based on search term and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = 
      roomTypeFilter === "all" || 
      room.type.toLowerCase().includes(roomTypeFilter.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" || 
      room.status.toLowerCase().includes(statusFilter.toLowerCase())
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Room statistics
  const totalRooms = rooms.length
  const occupiedRooms = rooms.filter((room) => room.status === "Occupied").length
  const partiallyOccupiedRooms = rooms.filter((room) => room.status === "Partially Occupied").length
  const vacantRooms = rooms.filter((room) => room.status === "Vacant").length
  const underMaintenanceRooms = rooms.filter((room) => room.status === "Under Maintenance").length

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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Room Management</h1>
            <p className="text-muted-foreground">View and manage all hostel rooms</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus size={16} />
                <span>Add New Room</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">Add New Room</DialogTitle>
                <DialogDescription>Enter the details of the new room to add to the hostel.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="block">Block</Label>
                    <Select>
                      <SelectTrigger id="block">
                        <SelectValue placeholder="Select block" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Block A</SelectItem>
                        <SelectItem value="b">Block B</SelectItem>
                        <SelectItem value="c">Block C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-number">Room Number</Label>
                    <Input id="room-number" placeholder="Enter room number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <Select>
                    <SelectTrigger id="room-type">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="double">Double Sharing</SelectItem>
                      <SelectItem value="triple">Triple Sharing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" min="1" max="4" placeholder="Enter room capacity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-status">Room Status</Label>
                  <Select>
                    <SelectTrigger id="room-status">
                      <SelectValue placeholder="Select room status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacant">Vacant</SelectItem>
                      <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Add Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Rooms</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{totalRooms}</h3>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                  <Building className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupied</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{occupiedRooms}</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <Building className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Partially Occupied</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{partiallyOccupiedRooms}</h3>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                  <Building className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vacant</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{vacantRooms}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 xl:block hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Under Maintenance</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{underMaintenanceRooms}</h3>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                  <Building className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="block-a">Block A</TabsTrigger>
              <TabsTrigger value="block-b">Block B</TabsTrigger>
              <TabsTrigger value="block-c">Block C</TabsTrigger>
            </TabsList>
            
            <div className="w-full md:w-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                <Download size={16} />
                <span>Export</span>
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white">All Rooms</CardTitle>
                <CardDescription>Total of {rooms.length} rooms in the hostel</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="relative w-full">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search rooms..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="double">Double Sharing</SelectItem>
                        <SelectItem value="triple">Triple Sharing</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="partially">Partially Occupied</SelectItem>
                        <SelectItem value="vacant">Vacant</SelectItem>
                        <SelectItem value="maintenance">Under Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room ID</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Block</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room Number</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Type</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Capacity</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Occupancy</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredRooms.length > 0 ? (
                          filteredRooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="p-3 text-gray-900 dark:text-white">{room.id}</td>
                              <td className="p-3 text-gray-900 dark:text-white">Block {room.block}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.number}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.type}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.capacity}</td>
                              <td className="p-3 text-gray-900 dark:text-white">
                                {room.occupied}/{room.capacity}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    room.status === "Occupied"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                      : room.status === "Partially Occupied"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : room.status === "Vacant"
                                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                  }
                                >
                                  {room.status}
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
                                  <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                      <Eye className="h-4 w-4" />
                                      <span>View Details</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                      <FileEdit className="h-4 w-4" />
                                      <span>Edit Room</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                      <Users className="h-4 w-4" />
                                      <span>Manage Occupants</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
                                      <Trash2 className="h-4 w-4" />
                                      <span>Delete Room</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="p-4 text-center text-gray-500 dark:text-gray-400">
                              No rooms found matching your criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredRooms.length} of {rooms.length} rooms
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

          {/* Block-specific tabs with similar improvements */}
          <TabsContent value="block-a">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white">Block A Rooms</CardTitle>
                <CardDescription>
                  Total of {rooms.filter((room) => room.block === "A").length} rooms in Block A
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room ID</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room Number</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Type</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Capacity</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Occupancy</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {rooms
                          .filter((room) => room.block === "A")
                          .map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="p-3 text-gray-900 dark:text-white">{room.id}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.number}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.type}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.capacity}</td>
                              <td className="p-3 text-gray-900 dark:text-white">
                                {room.occupied}/{room.capacity}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    room.status === "Occupied"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                      : room.status === "Partially Occupied"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : room.status === "Vacant"
                                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                  }
                                >
                                  {room.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                  View Details
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

          <TabsContent value="block-b">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white">Block B Rooms</CardTitle>
                <CardDescription>
                  Total of {rooms.filter((room) => room.block === "B").length} rooms in Block B
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room ID</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room Number</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Type</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Capacity</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Occupancy</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {rooms
                          .filter((room) => room.block === "B")
                          .map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="p-3 text-gray-900 dark:text-white">{room.id}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.number}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.type}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.capacity}</td>
                              <td className="p-3 text-gray-900 dark:text-white">
                                {room.occupied}/{room.capacity}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    room.status === "Occupied"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                      : room.status === "Partially Occupied"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : room.status === "Vacant"
                                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                  }
                                >
                                  {room.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                  View Details
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

          <TabsContent value="block-c">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white">Block C Rooms</CardTitle>
                <CardDescription>
                  Total of {rooms.filter((room) => room.block === "C").length} rooms in Block C
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room ID</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Room Number</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Type</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Capacity</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Occupancy</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {rooms
                          .filter((room) => room.block === "C")
                          .map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="p-3 text-gray-900 dark:text-white">{room.id}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.number}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.type}</td>
                              <td className="p-3 text-gray-900 dark:text-white">{room.capacity}</td>
                              <td className="p-3 text-gray-900 dark:text-white">
                                {room.occupied}/{room.capacity}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    room.status === "Occupied"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                      : room.status === "Partially Occupied"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : room.status === "Vacant"
                                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                  }
                                >
                                  {room.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                  View Details
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}