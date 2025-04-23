"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  name: string
  email: string
  createdAt: string
  preferences: {
    theme: "light" | "dark" | "system"
    audioFeedback: boolean
    showHijriDate: boolean
    showDailyContent: boolean
  }
  customDhikrs: {
    id: string
    name: string
    arabicText: string
    defaultTarget: number
  }[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isGuest: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  updateUser: (userData: Partial<User>) => void
  enterGuestMode: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123", // In a real app, this would be hashed
    createdAt: new Date().toISOString(),
    preferences: {
      theme: "system" as const,
      audioFeedback: true,
      showHijriDate: true,
      showDailyContent: true,
    },
    customDhikrs: [
      {
        id: "custom-1",
        name: "La ilaha illallah",
        arabicText: "لا إله إلا الله",
        defaultTarget: 100,
      },
    ],
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("tasbih_user")
        const savedIsGuest = localStorage.getItem("tasbih_guest") === "true"

        if (savedUser) {
          setUser(JSON.parse(savedUser))
        } else if (savedIsGuest) {
          setIsGuest(true)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Save user data when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("tasbih_user", JSON.stringify(user))
    }
  }, [user])

  // Save guest mode status
  useEffect(() => {
    localStorage.setItem("tasbih_guest", isGuest.toString())
  }, [isGuest])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user with matching credentials
      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid email or password")
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser

      setUser(userWithoutPassword)
      setIsGuest(false)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        createdAt: new Date().toISOString(),
        preferences: {
          theme: "system",
          audioFeedback: true,
          showHijriDate: true,
          showDailyContent: true,
        },
        customDhikrs: [],
      }

      // In a real app, we would save this to a database
      // For demo, we'll just set the current user
      setUser(newUser)
      setIsGuest(false)
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsGuest(false)
    localStorage.removeItem("tasbih_user")
    localStorage.removeItem("tasbih_guest")
    // In a real app, we would also clear any auth tokens
  }

  const resetPassword = async (email: string) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user exists
      const userExists = MOCK_USERS.some((u) => u.email === email)

      if (!userExists) {
        throw new Error("No user found with this email")
      }

      // In a real app, we would send a password reset email
      console.log(`Password reset email sent to ${email}`)
    } catch (error) {
      console.error("Password reset error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    setUser({
      ...user,
      ...userData,
    })
  }

  const enterGuestMode = () => {
    setUser(null)
    setIsGuest(true)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isGuest,
        login,
        signup,
        logout,
        resetPassword,
        updateUser,
        enterGuestMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
