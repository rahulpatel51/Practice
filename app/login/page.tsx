"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, ShieldCheck, User, Home, Key, Mail, ChevronLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("student")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const type = searchParams.get("type")
    if (type && ["student", "admin", "warden"].includes(type)) {
      setActiveTab(type)
    }
  }, [searchParams])

  const handleLogin = (e: React.FormEvent, userType: string) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful",
        description: `Welcome to the ${userType} dashboard`,
      })
      router.push(`/dashboard/${userType}`)
    }, 1000)
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Reset link sent",
        description: "We've sent a password reset link to your email",
      })
      setShowForgotPassword(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
            aria-label="Go to homepage"
          >
            <GraduationCap className="h-7 w-7 text-indigo-500" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
              HostelHub
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/#features" 
              className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-2 py-1"
              aria-label="View features"
            >
              Features
            </Link>
            <Link 
              href="/#about" 
              className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-2 py-1"
              aria-label="Learn about us"
            >
              About
            </Link>
            <Link 
              href="/#contact" 
              className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-2 py-1"
              aria-label="Contact us"
            >
              Contact
            </Link>
          </nav>
          
          <Link href="/" passHref legacyBehavior>
            <Button 
              asChild
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Return to home"
            >
              <a>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Home
              </a>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden shadow-xl">
            {/* Gradient Accent */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" aria-hidden="true"></div>
            
            <CardHeader className="text-center pt-8 pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-500/10 p-3 rounded-full">
                  {showForgotPassword ? (
                    <Mail className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                  ) : (
                    <Key className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl text-white font-bold">
                {showForgotPassword ? "Reset Your Password" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {showForgotPassword 
                  ? "Enter your email to receive a reset link"
                  : `Login to your ${activeTab} account`}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-6 pb-6">
              {showForgotPassword ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email" className="text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                      aria-describedby="email-help"
                    />
                    <p id="email-help" className="text-xs text-gray-500">
                      Enter the email associated with your account
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-500"
                      onClick={() => setShowForgotPassword(false)}
                      aria-label="Cancel password reset"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      disabled={isLoading}
                      aria-label="Send password reset link"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg 
                            className="animate-spin h-4 w-4" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : "Send Reset Link"}
                    </Button>
                  </div>
                </form>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-gray-800 p-1 rounded-lg h-auto">
                    <TabsTrigger
                      value="student"
                      className="flex flex-col items-center gap-1 py-2 px-1 rounded-md data-[state=active]:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-label="Student login"
                    >
                      <User className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">Student</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="admin"
                      className="flex flex-col items-center gap-1 py-2 px-1 rounded-md data-[state=active]:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-label="Admin login"
                    >
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">Admin</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="warden"
                      className="flex flex-col items-center gap-1 py-2 px-1 rounded-md data-[state=active]:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-label="Warden login"
                    >
                      <Home className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">Warden</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Student Login */}
                  <TabsContent value="student">
                    <form onSubmit={(e) => handleLogin(e, "student")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-id" className="text-gray-300">Hostel ID</Label>
                        <Input
                          id="student-id"
                          placeholder="HST20230001"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                          aria-describedby="student-id-help"
                        />
                        <p id="student-id-help" className="text-xs text-gray-500">
                          Your unique hostel identification number
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-password" className="text-gray-300">Password</Label>
                        <Input
                          id="student-password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        disabled={isLoading}
                        aria-label="Login as student"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg 
                              className="animate-spin h-4 w-4" 
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </span>
                        ) : "Login as Student"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Admin Login */}
                  <TabsContent value="admin">
                    <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-email" className="text-gray-300">Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@hostelhub.edu"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                          aria-describedby="admin-email-help"
                        />
                        <p id="admin-email-help" className="text-xs text-gray-500">
                          Your administrative email address
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-password" className="text-gray-300">Password</Label>
                        <Input
                          id="admin-password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        disabled={isLoading}
                        aria-label="Login as admin"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg 
                              className="animate-spin h-4 w-4" 
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </span>
                        ) : "Login as Admin"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Warden Login */}
                  <TabsContent value="warden">
                    <form onSubmit={(e) => handleLogin(e, "warden")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="warden-email" className="text-gray-300">Email</Label>
                        <Input
                          id="warden-email"
                          type="email"
                          placeholder="warden@hostelhub.edu"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                          aria-describedby="warden-email-help"
                        />
                        <p id="warden-email-help" className="text-xs text-gray-500">
                          Your warden email address
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="warden-password" className="text-gray-300">Password</Label>
                        <Input
                          id="warden-password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        disabled={isLoading}
                        aria-label="Login as warden"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg 
                              className="animate-spin h-4 w-4" 
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </span>
                        ) : "Login as Warden"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col items-center pt-0 pb-6">
              {!showForgotPassword && (
                <button 
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1"
                  aria-label="Forgot password?"
                >
                  Forgot password?
                </button>
              )}
              <p className="text-xs text-gray-400">
                By continuing, you agree to our{' '}
                <Link 
                  href="#" 
                  className="text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1"
                  aria-label="View terms of service"
                >
                  Terms
                </Link>{' '}
                and{' '}
                <Link 
                  href="#" 
                  className="text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1"
                  aria-label="View privacy policy"
                >
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6 text-indigo-500" aria-hidden="true" />
              <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                HostelHub
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} HostelHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}