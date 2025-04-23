"use client"

import { useState, useEffect, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import type { DhikrType, Session, TasbihState } from "@/app/types/tasbih"

// Define the dhikr types
export const dhikrTypes: DhikrType[] = [
  { id: "subhanallah", name: "SubhanAllah", arabicText: "سُبْحَانَ ٱللَّٰهِ", defaultTarget: 33 },
  { id: "alhamdulillah", name: "Alhamdulillah", arabicText: "ٱلْحَمْدُ لِلَّٰهِ", defaultTarget: 33 },
  { id: "allahuakbar", name: "Allahu Akbar", arabicText: "ٱللَّٰهُ أَكْبَرُ", defaultTarget: 34 },
  { id: "custom", name: "Custom Dhikr", arabicText: "", defaultTarget: 100 },
]

// Initialize default state
const getInitialState = (): TasbihState => {
  const initialCounts: Record<string, number> = {}
  const initialTargets: Record<string, number> = {}

  dhikrTypes.forEach((dhikr) => {
    initialCounts[dhikr.id] = 0
    initialTargets[dhikr.id] = dhikr.defaultTarget
  })

  return {
    counts: initialCounts,
    targets: initialTargets,
    totalCount: 0,
    sessions: [],
    activeTab: "subhanallah",
  }
}

// Safe localStorage operations with error handling
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      return null
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
      return false
    }
  },
}

export function useTasbih() {
  // Initialize state
  const [state, setState] = useState<TasbihState>(getInitialState())

  // Load data from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const savedState = safeLocalStorage.getItem("tasbihState")
        if (savedState) {
          const parsedState = JSON.parse(savedState) as Partial<TasbihState>
          setState((prevState) => ({
            ...prevState,
            counts: parsedState.counts || prevState.counts,
            targets: parsedState.targets || prevState.targets,
            totalCount: parsedState.totalCount || prevState.totalCount,
            sessions: parsedState.sessions || prevState.sessions,
          }))
        }
      } catch (error) {
        console.error("Failed to load tasbih state:", error)
        // Continue with default state if loading fails
      }
    }

    loadFromStorage()
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    safeLocalStorage.setItem("tasbihState", JSON.stringify(state))
  }, [state])

  // Check if target is reached and add to sessions
  useEffect(() => {
    const currentCount = state.counts[state.activeTab]
    const currentTarget = state.targets[state.activeTab]

    if (currentCount >= currentTarget && currentCount > 0) {
      // Only add a session if the count just reached the target
      // (to avoid adding multiple sessions when count > target)
      const lastSession = state.sessions[0]
      const isNewCompletion =
        !lastSession || lastSession.dhikrType !== state.activeTab || lastSession.timestamp < Date.now() - 1000 // Prevent duplicate sessions within 1 second

      if (isNewCompletion) {
        const newSession: Session = {
          id: uuidv4(), // Generate unique ID for each session
          dhikrType: state.activeTab,
          count: currentCount,
          target: currentTarget,
          timestamp: Date.now(),
        }

        setState((prev) => ({
          ...prev,
          sessions: [newSession, ...prev.sessions],
        }))
      }
    }
  }, [state.counts, state.targets, state.activeTab, state.sessions])

  // Action handlers
  const setActiveTab = useCallback((tab: string) => {
    setState((prev) => ({ ...prev, activeTab: tab }))
  }, [])

  const incrementCount = useCallback(() => {
    setState((prev) => ({
      ...prev,
      counts: {
        ...prev.counts,
        [prev.activeTab]: prev.counts[prev.activeTab] + 1,
      },
      totalCount: prev.totalCount + 1,
    }))
  }, [])

  const decrementCount = useCallback(() => {
    setState((prev) => {
      if (prev.counts[prev.activeTab] <= 0) return prev

      return {
        ...prev,
        counts: {
          ...prev.counts,
          [prev.activeTab]: prev.counts[prev.activeTab] - 1,
        },
        totalCount: prev.totalCount - 1,
      }
    })
  }, [])

  const resetCount = useCallback(() => {
    setState((prev) => ({
      ...prev,
      counts: {
        ...prev.counts,
        [prev.activeTab]: 0,
      },
    }))
  }, [])

  const updateTarget = useCallback((value: number) => {
    if (value < 1) value = 1 // Ensure target is at least 1

    setState((prev) => ({
      ...prev,
      targets: {
        ...prev.targets,
        [prev.activeTab]: value,
      },
    }))
  }, [])

  const clearSessions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sessions: [],
    }))
  }, [])

  const resetAll = useCallback(() => {
    if (window.confirm("Are you sure you want to reset all counters and history?")) {
      setState(getInitialState())
    }
  }, [])

  // Computed values
  const currentCount = state.counts[state.activeTab]
  const currentTarget = state.targets[state.activeTab]
  const progress = Math.min((currentCount / currentTarget) * 100, 100)
  const activeDhikr = dhikrTypes.find((d) => d.id === state.activeTab)

  return {
    // State
    counts: state.counts,
    targets: state.targets,
    totalCount: state.totalCount,
    sessions: state.sessions,
    activeTab: state.activeTab,

    // Computed values
    currentCount,
    currentTarget,
    progress,
    activeDhikr,

    // Actions
    setActiveTab,
    incrementCount,
    decrementCount,
    resetCount,
    updateTarget,
    clearSessions,
    resetAll,
  }
}
