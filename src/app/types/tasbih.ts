export type DhikrType = {
    id: string
    name: string
    arabicText: string
    defaultTarget: number
  }
  
  export type Session = {
    id: string
    dhikrType: string
    count: number
    target: number
    timestamp: number
  }
  
  export type TasbihState = {
    counts: Record<string, number>
    targets: Record<string, number>
    totalCount: number
    sessions: Session[]
    activeTab: string
  }
  