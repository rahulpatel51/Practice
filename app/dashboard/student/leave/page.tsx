"use client"

import { useState } from "react"
import { Home, User, CreditCard, MessageSquare, FileText, Settings } from "lucide-react"

export default function StudentLeavePage() {
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

  // Mock data for leave applications
  const leaveApplications = [
    {
      id: "L-2023-001",
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
      type: "Medical",
      fromDate: "2023-03-05",
      toDate: "2023-03-08",
      reason: "Need to visit home for medical treatment",
      appliedOn: "2023-03-03",
      status: "Rejected",
      approvedBy: "Dr. Rajesh Kumar",
      comments: [
        { user: "Warden", text: "Please provide medical certificate for approval", date: "2023-03-04" },
        { user: "Student", text: "I don't have a certificate yet as I need to visit the doctor", date: "2023-03-04" },
        { user: "Warden", text: "Rejected. Medical leave requires proper documentation.", date: "2023-03-04" },
      ],
    },
    {
      id: "L-2023-003",
      type: "Academic",
      fromDate: "2023-05-10",
      toDate: "2023-05-12",
      reason: "Attending a conference at Delhi University",
      appliedOn: "2023-05-01",
      status: "Pending",
      approvedBy: null,
      comments: [],
    },
  ]
}

//

