import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, GraduationCap, ShieldCheck, User, Home, BookUser, ClipboardList } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-7 w-7 text-indigo-500" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
              HostelHub
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
          <Link href="/login">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-lg shadow-indigo-500/20">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-4">
              <span className="text-sm font-medium text-indigo-400">Modern Hostel Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Streamline Your <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">Hostel Operations</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg">
              A comprehensive solution for managing student accommodations, room allocations, payments, and administrative tasks with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/login">
                <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-lg shadow-indigo-500/30">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800/50 text-gray-300 hover:text-white">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Hostel Management Dashboard"
                className="w-full h-auto object-cover"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Access Your Portal</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Tailored interfaces for different user roles with secure authentication</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Portal */}
            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800/50 border border-gray-700 hover:border-indigo-500/30 hover:translate-y-[-4px]">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-indigo-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Student Portal</h3>
                  <p className="text-gray-400">
                    Access your room details, submit maintenance requests, and view payment history.
                  </p>
                  <Link href="/login?type=student">
                    <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
                      Student Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800/50 border border-gray-700 hover:border-indigo-500/30 hover:translate-y-[-4px]">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-indigo-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Admin Portal</h3>
                  <p className="text-gray-400">
                    Manage all hostel operations, student records, and financial transactions.
                  </p>
                  <Link href="/login?type=admin">
                    <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Warden Portal */}
            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800/50 border border-gray-700 hover:border-indigo-500/30 hover:translate-y-[-4px]">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-indigo-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <BookUser className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Warden Portal</h3>
                  <p className="text-gray-400">
                    Oversee student activities, approve requests, and manage hostel facilities.
                  </p>
                  <Link href="/login?type=warden">
                    <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
                      Warden Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need for efficient hostel management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Home className="h-8 w-8 text-indigo-400" />,
                title: "Room Management",
                description: "Efficient allocation and tracking of hostel rooms with real-time availability"
              },
              {
                icon: <ClipboardList className="h-8 w-8 text-indigo-400" />,
                title: "Complaint System",
                description: "Streamlined process for submitting and tracking maintenance requests"
              },
              {
                icon: <User className="h-8 w-8 text-indigo-400" />,
                title: "Student Profiles",
                description: "Comprehensive student records with accommodation history"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-indigo-400" />,
                title: "Security",
                description: "Role-based access control and audit logs for all activities"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-indigo-500/30 transition-colors">
                <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="h-7 w-7 text-indigo-500" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                  HostelHub
                </h3>
              </div>
              <p className="text-gray-400">
                Modern hostel management solution for educational institutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} HostelHub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}