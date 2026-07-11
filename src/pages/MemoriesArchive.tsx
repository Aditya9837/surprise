import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllWeeksNewestFirst, getLatestWeekId, getWeekMeta } from '../weeks/registry'

function useNextWeekCountdown() {
  const latest = getWeekMeta(getLatestWeekId())
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!latest?.dateISO) {
    return { label: 'Week 3 soon…', ready: false }
  }

  const base = new Date(`${latest.dateISO}T00:00:00`)
  const unlock = new Date(base)
  unlock.setDate(unlock.getDate() + 7)
  const diff = unlock.getTime() - now

  if (diff <= 0) {
    return {
      label: `Week ${latest.id + 1} is ready to be written…`,
      ready: true,
    }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  const secs = Math.floor((diff / 1000) % 60)

  return {
    label: `Week ${latest.id + 1} unlocks in ${days}d ${hours}h ${mins}m ${secs}s`,
    ready: false,
  }
}

export default function MemoriesArchive() {
  const weeks = getAllWeeksNewestFirst()
  const latestId = getLatestWeekId()
  const navigate = useNavigate()
  const countdown = useNextWeekCountdown()

  return (
    <div className="min-h-dvh romantic-veil relative overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(196,92,116,0.18) 0%, transparent 55%)',
        }}
      />

      <div
        className="relative z-10 w-full max-w-lg mx-auto py-14 sm:py-20 pb-28"
        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
      >
        <Link
          to="/"
          className="inline-flex items-center text-[11px] tracking-[0.22em] uppercase text-pearl/40 hover:text-blush transition-colors mb-14"
        >
          ← Latest
        </Link>

        <header className="mb-14 sm:mb-16 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-blush/45 mb-5">
            For Mansi
          </p>
          <h1 className="font-[family-name:var(--font-script)] text-5xl sm:text-6xl text-gradient leading-none mb-5">
            Our weeks
          </h1>
          <p className="font-[family-name:var(--font-display)] text-base text-pearl/40 italic">
            Every chapter, kept forever
          </p>
        </header>

        <div>
          {weeks.map((week, i) => {
            const isLatest = week.id === latestId
            return (
              <motion.button
                key={week.id}
                type="button"
                onClick={() => navigate(`/week/${week.id}`)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                whileTap={{ scale: 0.985 }}
                className="group w-full text-left py-8 border-t border-white/[0.08] first:border-t-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-blush/40 rounded-sm"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.28em] uppercase text-pearl/35 mb-3">
                      <span style={{ color: week.accent }}>{week.weekLabel}</span>
                      {week.dateLabel ? `  ·  ${week.dateLabel}` : ''}
                      {isLatest ? '  ·  Latest' : ''}
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-[1.75rem] text-pearl/95 mb-2 leading-snug">
                      {week.title}
                    </h2>
                    <p className="font-[family-name:var(--font-display)] text-sm text-pearl/40 italic leading-relaxed">
                      {week.subtitle}
                    </p>
                  </div>

                  <span
                    className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm text-ink transition-transform group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, #f7e8e0, ${week.accent})`,
                      boxShadow: `0 0 24px ${week.accent}40`,
                    }}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </motion.button>
            )
          })}

          <div className="border-t border-white/[0.08] pt-10 mt-2 text-center space-y-2">
            <p className="font-[family-name:var(--font-display)] text-pearl/45 italic text-base sm:text-lg">
              {countdown.label}
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-pearl/25">
              {countdown.ready ? 'Time to add the next chapter' : 'A new surprise every week'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
