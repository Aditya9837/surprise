import { Link } from 'react-router-dom'
import { useWeekMeta } from '../../context/WeekContext'
import { getLatestWeekId } from '../../weeks/registry'

export function WeekChrome() {
  const meta = useWeekMeta()
  const isLatest = meta.id === getLatestWeekId()

  return (
    <div className="fixed top-0 left-0 right-0 z-[8500] pointer-events-none safe-top">
      <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4 md:px-6">
        <Link
          to="/memories"
          className="pointer-events-auto glass rounded-full min-h-10 px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] md:text-xs tracking-[0.18em] sm:tracking-[0.25em] uppercase text-pearl/70 hover:text-pearl border border-white/10 transition-colors inline-flex items-center"
        >
          All memories
        </Link>

        <div className="pointer-events-auto glass rounded-full min-h-10 px-3 sm:px-4 py-2 flex items-center gap-2 border border-white/10 max-w-[55%]">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: meta.accent, boxShadow: `0 0 10px ${meta.accent}` }}
          />
          <span className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-pearl/70 truncate">
            {meta.weekLabel}
            {meta.dateLabel ? ` · ${meta.dateLabel}` : ''}
            {isLatest ? ' · latest' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
