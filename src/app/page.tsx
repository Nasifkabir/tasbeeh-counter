import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Smartphone, Moon, Users, Volume2, BarChart2 } from "lucide-react"
import { HomeNav } from "@/components/ui/home-nav"
import { Footer } from "@/components/ui/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNav />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Digital Tasbih Counter for Your Spiritual Journey
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track your dhikr, set targets, and enhance your spiritual practice with our modern, feature-rich
                  tasbih counter app.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="relative w-full max-w-[400px] aspect-square rounded-full bg-gradient-to-tr from-emerald-500/20 to-emerald-500/5 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-500/30 to-emerald-500/10 animate-pulse" />
                <div className="relative w-3/4 h-3/4 rounded-full bg-background shadow-lg flex items-center justify-center">
                  <span className="text-6xl font-bold text-emerald-600">33</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need for Dhikr</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our tasbih counter app comes with all the features you need to enhance your spiritual practice.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden">
              <div className="absolute right-2 top-2 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardContent className="p-6">
                <Smartphone className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold">Multiple Dhikr Types</h3>
                <p className="text-muted-foreground">
                  Track SubhanAllah, Alhamdulillah, Allahu Akbar, and create your own custom dhikr phrases.
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute right-2 top-2 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardContent className="p-6">
                <Moon className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold">Dark Mode</h3>
                <p className="text-muted-foreground">
                  Comfortable counting in any lighting condition with our beautiful dark mode.
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute right-2 top-2 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardContent className="p-6">
                <Users className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold">User Profiles</h3>
                <p className="text-muted-foreground">
                  Save your progress across devices and keep track of your spiritual journey.
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute right-2 top-2 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardContent className="p-6">
                <Volume2 className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold">Audio Feedback</h3>
                <p className="text-muted-foreground">
                  Satisfying audio feedback for each count and when you complete your target.
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute right-2 top-2 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardContent className="p-6">
                <BarChart2 className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold">Statistics</h3>
                <p className="text-muted-foreground">
                  Track your progress with detailed statistics and session history.
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute right-2 top-2 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardContent className="p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 mb-4 text-emerald-600"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 14v.01" />
                </svg>
                <h3 className="text-xl font-bold">Islamic Content</h3>
                <p className="text-muted-foreground">
                  Daily Ayah and Hadith, Hijri date, and motivational Islamic messages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See It In Action</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our beautiful and intuitive interface makes dhikr counting a joy.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl py-12">
            <div className="rounded-lg border bg-background shadow-lg overflow-hidden">
              <div className="flex items-center border-b px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto text-sm font-medium">Tasbih Counter App</div>
              </div>
              <div className="aspect-[16/9] bg-muted p-4">
                <div className="h-full w-full rounded-md bg-white dark:bg-gray-800 p-6 flex flex-col items-center justify-center">
                  <div className="w-full max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold">Tasbih Counter</div>
                      <div className="text-sm text-muted-foreground">12 Ramadan, 1445 AH</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 text-center py-2 rounded-md font-medium text-sm">
                        SubhanAllah
                      </div>
                      <div className="bg-emerald-600 text-white text-center py-2 rounded-md font-medium text-sm">
                        Alhamdulillah
                      </div>
                      <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 text-center py-2 rounded-md font-medium text-sm">
                        Allahu Akbar
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mb-6 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center shadow-inner">
                        <span className="text-4xl font-bold text-emerald-800 dark:text-emerald-300">15</span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M5 12h14" />
                        </svg>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M3 3v18h18" />
                          <path d="m19 9-5 5-4-4-3 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-emerald-800 dark:text-emerald-200 sm:text-4xl md:text-5xl">
                Start Your Dhikr Journey Today
              </h2>
              <p className="max-w-[600px] text-emerald-800/80 dark:text-emerald-200/80 md:text-xl/relaxed">
                Join thousands of Muslims enhancing their spiritual practice with our tasbih counter app.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Create Account
                </Button>
              </Link>
              <Link href="/counter">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900"
                >
                  Try Guest Mode
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Users Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from people who have enhanced their spiritual practice with our app.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">AM</span>
                  </span>
                  <div>
                    <p className="text-sm font-medium">Ahmed M.</p>
                    <p className="text-sm text-muted-foreground">Saudi Arabia</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    "This app has transformed my daily dhikr practice. The counter is intuitive and the statistics help
                    me stay consistent."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">FJ</span>
                  </span>
                  <div>
                    <p className="text-sm font-medium">Fatima J.</p>
                    <p className="text-sm text-muted-foreground">United Kingdom</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    "I love the daily Ayah and Hadith feature. It gives me something to reflect on while doing my
                    dhikr."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">YK</span>
                  </span>
                  <div>
                    <p className="text-sm font-medium">Yusuf K.</p>
                    <p className="text-sm text-muted-foreground">United States</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    "The custom dhikr feature is amazing. I can add any phrase I want and track my progress over time."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
