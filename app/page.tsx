import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, GraduationCap, ShieldCheck, User } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold">Hostel Management System</h1>
          </div>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Welcome to <span className="text-primary">Hostel Management</span> System
              </h1>
              <p className="text-lg text-muted-foreground dark:text-slate-400">
                A comprehensive solution for managing hostel operations, student accommodations, and administrative
                tasks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Get Started <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="College Campus"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-slate-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Access Your Portal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow dark:bg-slate-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Student Portal</h3>
                  <p className="text-muted-foreground dark:text-slate-400">
                    Access your hostel information, room details, and payments.
                  </p>
                  <Link href="/login?type=student">
                    <Button className="w-full">Student Login</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-slate-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Admin Portal</h3>
                  <p className="text-muted-foreground dark:text-slate-400">
                    Manage hostel operations, student records, and administrative tasks.
                  </p>
                  <Link href="/login?type=admin">
                    <Button className="w-full">Admin Login</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-slate-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Warden Portal</h3>
                  <p className="text-muted-foreground dark:text-slate-400">
                    Monitor student activities, handle complaints, and manage hostel facilities.
                  </p>
                  <Link href="/login?type=warden">
                    <Button className="w-full">Warden Login</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6" />
              <h3 className="text-lg font-bold">Hostel Management System</h3>
            </div>
            <p className="text-slate-400">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

