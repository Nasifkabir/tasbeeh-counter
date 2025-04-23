"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RotateCcw } from "lucide-react"

// Import our custom hooks and components
import { useTasbih, dhikrTypes } from "@/app/hooks/use-tasbih"
import { CounterDisplay } from "@/components/ui/counrter-display"
import { CounterButtons } from "@/components/ui/counter-button"
import { TargetSettings } from "@/components/ui/target-settings"
import { SessionSummary } from "@/components/ui/session-summary"

export default function TasbihCounter() {
  const [showSummary, setShowSummary] = useState(false)

  const {
    activeTab,
    setActiveTab,
    currentCount,
    currentTarget,
    progress,
    activeDhikr,
    totalCount,
    sessions,
    incrementCount,
    decrementCount,
    resetCount,
    updateTarget,
    clearSessions,
  } = useTasbih()

  // Error handling for missing activeDhikr
  const dhikrName = activeDhikr?.name || "Dhikr"

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Tasbeeh Counter</CardTitle>
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

      {/* Session summary dialog */}
      <SessionSummary
        open={showSummary}
        onOpenChange={setShowSummary}
        sessions={sessions}
        totalCount={totalCount}
        dhikrTypes={dhikrTypes}
        onClearSessions={clearSessions}
      />
    </main>
  )
}
