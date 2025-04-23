"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/contexts/auth-context"
import { Moon, Sun, User, Settings, Home, LogOut } from "lucide-react"
import { useTheme } from "@/app/contexts/theme-context"

export function MainNav() {
  const pathname = usePathname()
  const { user, isGuest, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const isActive = (path: string) => pathname === path

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📿</span>
            <span className="font-bold">Tasbih</span>
          </Link>
        </div>
        <nav className="ml-auto flex items-center space-x-2">
          <Link href="/">
            <Button variant={isActive("/") ? "default" : "ghost"} size="sm" className="text-sm">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>

          {(user || isGuest) && (
            <Link href="/profile">
              <Button variant={isActive("/profile") ? "default" : "ghost"} size="sm" className="text-sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          )}

          {(user || isGuest) && (
            <Link href="/settings">
              <Button variant={isActive("/settings") ? "default" : "ghost"} size="sm" className="text-sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {(user || isGuest) && (
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              {isGuest ? "Exit Guest" : "Logout"}
            </Button>
          )}
        </nav>
      </div>
    </div>
  )
}
