"use client"

import { useState, useEffect } from "react"
import { IslamicContentService, type HadithContent, type AyahContent, type HijriDate } from "@/app/services/islamic-content"
import { useAuth } from "@/app/contexts/auth-context"

export function useIslamicContent() {
  const { user } = useAuth()
  const [dailyContent, setDailyContent] = useState<HadithContent | AyahContent | null>(null)
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch daily content and hijri date on mount
  useEffect(() => {
    // Only fetch if user preferences allow or if not logged in
    if (!user || user.preferences.showDailyContent) {
      const fetchContent = async () => {
        setIsLoading(true)
        setError(null)

        try {
          // Get cached content if available
          const cachedContent = localStorage.getItem("tasbih_daily_content")
          const cachedDate = localStorage.getItem("tasbih_daily_content_date")
          const today = new Date().toDateString()

          // Use cached content if it's from today
          if (cachedContent && cachedDate === today) {
            setDailyContent(JSON.parse(cachedContent))
          } else {
            // Fetch new content
            const content = await IslamicContentService.getDailyContent()
            setDailyContent(content)

            // Cache content with today's date
            localStorage.setItem("tasbih_daily_content", JSON.stringify(content))
            localStorage.setItem("tasbih_daily_content_date", today)
          }
        } catch (err) {
          setError("Failed to load daily content")
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchContent()
    }
  }, [user])

  // Fetch hijri date
  useEffect(() => {
    // Only fetch if user preferences allow or if not logged in
    if (!user || user.preferences.showHijriDate) {
      const fetchHijriDate = async () => {
        try {
          // Get cached hijri date if available
          const cachedHijri = localStorage.getItem("tasbih_hijri_date")
          const cachedDate = localStorage.getItem("tasbih_hijri_date_fetch")
          const today = new Date().toDateString()

          // Use cached date if it's from today
          if (cachedHijri && cachedDate === today) {
            setHijriDate(JSON.parse(cachedHijri))
          } else {
            // Fetch new hijri date
            const date = await IslamicContentService.getHijriDate()
            setHijriDate(date)

            // Cache hijri date with today's date
            localStorage.setItem("tasbih_hijri_date", JSON.stringify(date))
            localStorage.setItem("tasbih_hijri_date_fetch", today)
          }
        } catch (err) {
          console.error("Failed to load Hijri date:", err)
        }
      }

      fetchHijriDate()
    }
  }, [user])

  // Get a random hadith
  const getRandomHadith = async () => {
    try {
      setIsLoading(true)
      const hadith = await IslamicContentService.getRandomHadith()
      return hadith
    } catch (err) {
      setError("Failed to load hadith")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Get a random ayah
  const getRandomAyah = async () => {
    try {
      setIsLoading(true)
      const ayah = await IslamicContentService.getRandomAyah()
      return ayah
    } catch (err) {
      setError("Failed to load ayah")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    dailyContent,
    hijriDate,
    isLoading,
    error,
    getRandomHadith,
    getRandomAyah,
  }
}
