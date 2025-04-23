"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MainNav } from "@/components/ui/main-nav"
import { useAuth } from "@/app/contexts/auth-context"
import { useTheme } from "@/app/contexts/theme-context"
import { audioManager } from "@/app/utils/audio-utils"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const { user, isGuest, isLoading, updateUser } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [audioAvailable, setAudioAvailable] = useState(false)

  // Check audio availability
  useEffect(() => {
    // We need to wait a bit to check audio availability after user interaction
    const timer = setTimeout(() => {
      setAudioAvailable(audioManager.isAudioAvailable())
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Redirect to login if not authenticated or in guest mode
  useEffect(() => {
    if (!isLoading && !user && !isGuest) {
      router.push("/login")
    }
  }, [user, isGuest, isLoading, router])

  // Update user preferences
  const updatePreference = (key: string, value: any) => {
    if (user) {
      updateUser({
        preferences: {
          ...user.preferences,
          [key]: value,
        },
      })
    }

    // Handle audio feedback for both guest and logged-in users
    if (key === "audioFeedback") {
      audioManager.setEnabled(value)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user && !isGuest) {
    return null // Will redirect to login
  }

  // Get preferences from user or use defaults for guest
  const preferences = user?.preferences || {
    theme: "system",
    audioFeedback: true,
    showHijriDate: true,
    showDailyContent: true,
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNav />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Customize your tasbih counter experience</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup
                  value={theme}
                  onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Enable or disable app features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="audio-feedback">Audio Feedback</Label>
                  {!audioAvailable && (
                    <Badge variant="outline" className="text-amber-500">
                      Using vibration fallback
                    </Badge>
                  )}
                </div>
                <Switch
                  id="audio-feedback"
                  checked={preferences.audioFeedback}
                  onCheckedChange={(checked) => updatePreference("audioFeedback", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hijri-date">Show Hijri Date</Label>
                <Switch
                  id="hijri-date"
                  checked={preferences.showHijriDate}
                  onCheckedChange={(checked) => updatePreference("showHijriDate", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="daily-content">Show Daily Ayah/Hadith</Label>
                <Switch
                  id="daily-content"
                  checked={preferences.showDailyContent}
                  onCheckedChange={(checked) => updatePreference("showDailyContent", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
