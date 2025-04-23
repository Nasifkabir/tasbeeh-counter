"use client"

import type { Session, DhikrType } from "@/app/types/tasbih"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface SessionSummaryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessions: Session[]
  totalCount: number
  dhikrTypes: DhikrType[]
  onClearSessions: () => void
}

export function SessionSummary({
  open,
  onOpenChange,
  sessions,
  totalCount,
  dhikrTypes,
  onClearSessions,
}: SessionSummaryProps) {
  // Format date in a user-friendly way
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Session Summary</DialogTitle>
          <DialogDescription>Your dhikr sessions and statistics</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">Total Dhikr</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">Completed Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{sessions.length}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Recent Sessions</h3>
            {sessions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearSessions}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear History
              </Button>
            )}
          </div>

          {sessions.length > 0 ? (
            <div className="space-y-2">
              {sessions.slice(0, 10).map((session) => {
                const dhikr = dhikrTypes.find((d) => d.id === session.dhikrType)
                return (
                  <div key={session.id} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <p className="font-medium">{dhikr?.name || session.dhikrType}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(session.timestamp)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {session.count}/{session.target}
                      </p>
                      <p className="text-sm text-emerald-600">
                        {Math.round((session.count / session.target) * 100)}% completed
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">No completed sessions yet</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
