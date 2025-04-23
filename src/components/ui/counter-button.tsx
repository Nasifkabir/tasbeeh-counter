"use client"

import { Button } from "@/components/ui/button"
import { Plus, Minus, BarChart } from "lucide-react"

interface CounterButtonsProps {
  onIncrement: () => void
  onDecrement: () => void
  onShowSummary: () => void
  count: number
}

export function CounterButtons({ onIncrement, onDecrement, onShowSummary, count }: CounterButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={onDecrement}
        className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-600 shadow-md transition-all hover:shadow-lg active:scale-95"
        size="lg"
        disabled={count <= 0}
      >
        <Minus className="h-6 w-6" />
        <span className="sr-only">Decrement</span>
      </Button>

      <Button
        onClick={onIncrement}
        className="w-24 h-24 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all hover:shadow-lg active:scale-95"
        size="lg"
      >
        <Plus className="h-8 w-8" />
        <span className="sr-only">Increment</span>
      </Button>

      <Button
        onClick={onShowSummary}
        className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition-all hover:shadow-lg active:scale-95"
        size="lg"
      >
        <BarChart className="h-6 w-6" />
        <span className="sr-only">Summary</span>
      </Button>
    </div>
  )
}
