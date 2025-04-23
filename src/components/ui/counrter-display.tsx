interface CounterDisplayProps {
    count: number
    target: number
  }
  
  export function CounterDisplay({ count, target }: CounterDisplayProps) {
    return (
      <div className="relative w-48 h-48 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-inner">
        <span className="text-5xl font-bold text-emerald-800">{count}</span>
        <div className="absolute bottom-2 text-xs text-emerald-600">
          {count}/{target}
        </div>
      </div>
    )
  }
  