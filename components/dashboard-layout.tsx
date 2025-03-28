"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, LogOut, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "student" | "admin" | "warden"
  userName: string
  userRole: string
  userAvatar: string
  navItems: NavItem[]
}

export function DashboardLayout({
  children,
  userType,
  userName,
  userRole,
  userAvatar,
  navItems,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white dark:bg-slate-800 border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Hostel Management</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
      ${sidebarOpen ? "block" : "hidden"} 
      md:block bg-white dark:bg-slate-800 border-r w-full md:w-64 p-4 md:p-6 space-y-6 fixed md:sticky top-0 h-screen overflow-y-auto z-10
    `}
      >
        <div className="flex items-center gap-2 mb-8 hidden md:flex">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Hostel Management</h1>
        </div>

        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userAvatar}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-sm text-muted-foreground dark:text-slate-400">{userRole}</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="dark">{children}</div>
      </main>
    </div>
  )
}

