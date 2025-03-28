"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User, CreditCard, MessageSquare, FileText, Settings, Upload, Save } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function StudentProfilePage() {
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
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View and update your personal information</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="academic">Academic Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" defaultValue="2000-05-15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Permanent Address</Label>
                  <Textarea id="address" rows={3} defaultValue="123 Main Street, City Name, State, PIN: 123456" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">Emergency Contact</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="emergency-contact-name" placeholder="Contact Name" defaultValue="Robert Doe" />
                    <Input id="emergency-contact-number" placeholder="Contact Number" defaultValue="+91 87654 32109" />
                  </div>
                  <Input
                    id="emergency-contact-relation"
                    placeholder="Relation"
                    defaultValue="Father"
                    className="mt-2"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>Your academic details and course information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input id="student-id" defaultValue="STU001" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admission-year">Admission Year</Label>
                    <Input id="admission-year" defaultValue="2021" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" defaultValue="B.Tech Computer Science" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Current Year</Label>
                    <Input id="year" defaultValue="3rd Year" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Current Semester</Label>
                    <Input id="semester" defaultValue="5th Semester" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">Current CGPA</Label>
                    <Input id="cgpa" defaultValue="8.5" readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Hostel Details</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md">
                      <p className="text-sm font-medium text-muted-foreground">Block</p>
                      <p className="font-medium">Block A</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                      <p className="font-medium">203</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm font-medium text-muted-foreground">Room Type</p>
                      <p className="font-medium">Double Sharing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Upload and manage your important documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">ID Proof</p>
                      <p className="text-sm text-muted-foreground">Aadhar Card or PAN Card</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm">Upload</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Address Proof</p>
                      <p className="text-sm text-muted-foreground">Passport, Voter ID, or Utility Bill</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm">Upload</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Medical Certificate</p>
                      <p className="text-sm text-muted-foreground">Health and fitness certificate</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm">Upload</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Previous Semester Marksheet</p>
                      <p className="text-sm text-muted-foreground">4th Semester results</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm">Upload</Button>
                    </div>
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

