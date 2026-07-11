import { createContext, useContext, type ReactNode } from 'react'
import type { WeekContent, WeekMeta } from '../weeks/types'
import { getWeekContent, getWeekMeta } from '../weeks/registry'

interface WeekContextValue {
  meta: WeekMeta
  content: WeekContent
}

const WeekContext = createContext<WeekContextValue | null>(null)

export function WeekProvider({
  weekId,
  children,
}: {
  weekId: number
  children: ReactNode
}) {
  const meta = getWeekMeta(weekId)
  if (!meta) {
    throw new Error(`Unknown week id: ${weekId}`)
  }
  const content = getWeekContent(weekId)

  return (
    <WeekContext.Provider value={{ meta, content }}>
      {children}
    </WeekContext.Provider>
  )
}

export function useWeek() {
  const ctx = useContext(WeekContext)
  if (!ctx) {
    throw new Error('useWeek must be used inside WeekProvider')
  }
  return ctx
}

export function useWeekContent() {
  return useWeek().content
}

export function useWeekMeta() {
  return useWeek().meta
}
