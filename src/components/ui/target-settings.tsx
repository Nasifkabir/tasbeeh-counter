"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TargetSettingsProps {
  target: number
  dhikrName: string
  onUpdateTarget: (value: number) => void
}

export function TargetSettings({ target, dhikrName, onUpdateTarget }: TargetSettingsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4 mr-1" />
          Set Target
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Target Count</DialogTitle>
          <DialogDescription>Set your target count for {dhikrName}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="target">Target Count</Label>
            <Input
              id="target"
              type="number"
              min="1"
              value={target}
              onChange={(e) => onUpdateTarget(Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[33, 99, 100, 1000].map((num) => (
              <Button key={num} variant="outline" size="sm" onClick={() => onUpdateTarget(num)}>
                {num}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
