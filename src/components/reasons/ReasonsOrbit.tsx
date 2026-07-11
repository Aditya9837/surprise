import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWeekContent } from '../../context/WeekContext'

export function ReasonsOrbit() {
  const { reasons } = useWeekContent()
  const [opened, setOpened] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setOpened((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reasons.map((reason, i) => {
          const isOpen = opened.has(i)
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className="text-left group relative overflow-hidden rounded-2xl p-5 md:p-6 border border-white/10"
              style={{
                background: isOpen
                  ? 'linear-gradient(135deg, rgba(196,92,116,0.25), rgba(212,181,106,0.12))'
                  : 'rgba(255,245,240,0.04)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              whileHover={{ y: -4, borderColor: 'rgba(242,184,198,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <motion.span
                  className="text-2xl shrink-0 mt-0.5"
                  animate={isOpen ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {isOpen ? '💗' : '🤍'}
                </motion.span>
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-blush/40 mb-2">
                    Reason {String(i + 1).padStart(2, '0')}
                  </p>
                  {isOpen ? (
                    <motion.p
                      className="font-[family-name:var(--font-display)] text-lg md:text-xl text-pearl/90 leading-snug"
                      initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.5 }}
                    >
                      {reason}
                    </motion.p>
                  ) : (
                    <p className="font-[family-name:var(--font-display)] text-pearl/40 italic text-sm">
                      Tap to reveal…
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <motion.p
        className="text-center mt-8 text-xs tracking-[0.25em] uppercase text-pearl/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {opened.size === reasons.length
          ? 'Every reason leads to the same place…'
          : `${opened.size} of ${reasons.length} opened`}
      </motion.p>
    </div>
  )
}
