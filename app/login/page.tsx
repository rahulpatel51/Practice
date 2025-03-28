"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, ShieldCheck, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("student")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const type = searchParams.get("type")
    if (type && ["student", "admin", "warden"].includes(type)) {
      setActiveTab(type)
    }
  }, [searchParams])

  const handleLogin = (e: React.FormEvent, userType: string) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful",
        description: `Welcome to the ${userType} dashboard`,
      })
      router.push(`/dashboard/${userType}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold">Hostel Management System</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg dark:bg-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login to Your Account</CardTitle>
            <CardDescription className="dark:text-slate-400">Access the hostel management system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Student</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
                <TabsTrigger value="warden" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Warden</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={(e) => handleLogin(e, "student")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-id">Hostel ID</Label>
                      <Input id="student-id" placeholder="Enter your hostel ID" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input id="student-password" type="password" placeholder="Enter your password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login as Student"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={(e) => handleLogin(e, "admin")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input id="admin-email" type="email" placeholder="admin@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input id="admin-password" type="password" placeholder="Enter your password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login as Admin"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="warden">
                <form onSubmit={(e) => handleLogin(e, "warden")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="warden-email">Email</Label>
                      <Input id="warden-email" type="email" placeholder="warden@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warden-password">Password</Label>
                      <Input id="warden-password" type="password" placeholder="Enter your password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login as Warden"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Forgot your password?{" "}
              <Link href="#" className="text-primary hover:underline">
                Reset it here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground dark:text-slate-400">
          <p>© {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

