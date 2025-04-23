"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RotateCcw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MainNav } from "@/components/ui/main-nav"
import { CounterDisplay } from "@/components/ui/counrter-display"
import { CounterButtons } from "@/components/ui/counter-button"
import { TargetSettings } from "@/components/ui/target-settings"
import { SessionSummary } from "@/components/ui/session-summary"
import { useAuth } from "@/app/contexts/auth-context"
import { useTasbih } from "@/app/hooks/use-tasbih"
import { useIslamicContent } from "@/app/hooks/use-islamic-content"

export default function CounterPage() {
  const [showSummary, setShowSummary] = useState(false)
  const { user, isGuest, isLoading: authLoading, enterGuestMode } = useAuth()
  const router = useRouter()

  // If not authenticated and not in guest mode, enter guest mode automatically
  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      enterGuestMode()
    }
  }, [user, isGuest, authLoading, enterGuestMode])

  const {
    activeTab,
    setActiveTab,
    currentCount,
    currentTarget,
    progress,
    activeDhikr,
    totalCount,
    sessions,
    dhikrTypes,
    incrementCount,
    decrementCount,
    resetCount,
    updateTarget,
    clearSessions,
    showMotivation,
    motivationMessage,
  } = useTasbih()

  const { dailyContent, hijriDate } = useIslamicContent()

  // Error handling for missing activeDhikr
  const dhikrName = activeDhikr?.name || "Dhikr"

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNav />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Guest mode banner */}
          {isGuest && (
            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>You're using guest mode. Create an account to save your progress.</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Hijri date display */}
          {hijriDate && (user?.preferences.showHijriDate || isGuest) && (
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">{hijriDate.format}</p>
            </div>
          )}

          {/* Daily content */}
          {dailyContent && (user?.preferences.showDailyContent || isGuest) && (
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{"surah" in dailyContent ? "Daily Ayah" : "Daily Hadith"}</CardTitle>
              </CardHeader>
              <CardContent>
                {"surah" in dailyContent ? (
                  <div className="space-y-2">
                    <p className="text-xl font-arabic text-right">{dailyContent.text}</p>
                    <p className="text-sm">{dailyContent.translation}</p>
                    <p className="text-xs text-muted-foreground">
                      Surah {dailyContent.surah}, Ayah {dailyContent.ayah}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="italic">{dailyContent.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {dailyContent.source} ({dailyContent.reference})
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Motivational popup */}
          {showMotivation && (
            <Alert className="mb-4 bg-green-50 dark:bg-green-900/20 border-green-200">
              <AlertDescription className="text-center font-medium">{motivationMessage}</AlertDescription>
            </Alert>
          )}

          {/* Main tasbih counter */}
          <Card className="shadow-lg border-0 bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Tasbih Counter</CardTitle>
              <CardDescription>Track your dhikr with this digital counter</CardDescription>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mx-4">
                {dhikrTypes.map((dhikr) => (
                  <TabsTrigger key={dhikr.id} value={dhikr.id}>
                    {dhikr.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {dhikrTypes.map((dhikr) => (
                <TabsContent key={dhikr.id} value={dhikr.id} className="px-4">
                  <div className="text-center mb-2">
                    <p className="text-xl font-arabic">{dhikr.arabicText}</p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <CardContent className="flex flex-col items-center gap-6 pt-2">
              {/* Target and progress */}
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Target: {currentTarget}</span>
                  <TargetSettings target={currentTarget} dhikrName={dhikrName} onUpdateTarget={updateTarget} />
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Main counter display */}
              <CounterDisplay count={currentCount} target={currentTarget} />

              {/* Counter buttons */}
              <CounterButtons
                onIncrement={incrementCount}
                onDecrement={decrementCount}
                onShowSummary={() => setShowSummary(true)}
                count={currentCount}
              />
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetCount} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>

              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Total dhikr: </span>
                {totalCount}
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Session summary dialog */}
      <SessionSummary
        open={showSummary}
        onOpenChange={setShowSummary}
        sessions={sessions}
        totalCount={totalCount}
        dhikrTypes={dhikrTypes}
        onClearSessions={clearSessions}
      />
    </div>
  )
}
