import { motion, AnimatePresence } from 'framer-motion'
import { useState, type FormEvent } from 'react'

interface EnterGateProps {
  onEnter: () => void
  herName: string
  enterLabel: string
  weekLabel?: string
  dateLabel?: string
  secretGate?: {
    passwords: string[]
    hint: string
    placeholder: string
  }
}

export function EnterGate({
  onEnter,
  herName,
  enterLabel,
  weekLabel,
  dateLabel,
  secretGate,
}: EnterGateProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(0)
  const needsPassword = Boolean(secretGate?.passwords.length)

  const tryUnlock = (e?: FormEvent) => {
    e?.preventDefault()
    if (!needsPassword || !secretGate) {
      onEnter()
      return
    }

    const normalized = value.trim().toLowerCase().replace(/\s+/g, '')
    const ok = secretGate.passwords.some((p) => p.trim().toLowerCase().replace(/\s+/g, '') === normalized)

    if (ok) {
      setError(false)
      onEnter()
      return
    }

    setError(true)
    setShake((n) => n + 1)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center romantic-veil"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full blur-[100px]"
        style={{ background: 'rgba(196, 92, 116, 0.35)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center px-5 sm:px-8 max-w-lg w-full">
        <motion.div
          className="mx-auto mb-8 sm:mb-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_24px_rgba(242,184,198,0.6)]">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#f2b8c6"
            />
          </svg>
        </motion.div>

        <motion.p
          className="text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.45em] uppercase text-blush/50 mb-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {weekLabel ?? 'A private moment'}
          {dateLabel ? ` · ${dateLabel}` : ''}
        </motion.p>

        <motion.h1
          className="font-[family-name:var(--font-script)] text-5xl sm:text-6xl md:text-7xl text-gradient mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          {herName}
        </motion.h1>

        <motion.p
          className="font-[family-name:var(--font-display)] text-base sm:text-lg text-pearl/55 italic mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {needsPassword
            ? 'A secret lock. Only your heart knows the key.'
            : 'Something I have been holding in my heart is waiting for you inside.'}
        </motion.p>

        <motion.form
          key={shake}
          onSubmit={tryUnlock}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={error ? { opacity: 1, x: [0, -10, 10, -8, 8, 0] } : { opacity: 1, y: 0 }}
          transition={{ delay: error ? 0 : 0.9, duration: error ? 0.45 : 0.6 }}
        >
          {needsPassword && secretGate && (
            <div className="space-y-2">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  setError(false)
                }}
                placeholder={secretGate.placeholder}
                autoComplete="off"
                autoCapitalize="off"
                className="w-full max-w-xs mx-auto block rounded-full bg-white/5 border border-white/15 px-5 py-3.5 text-center text-pearl placeholder:text-pearl/25 outline-none focus:border-blush/50 transition-colors"
                aria-label="Secret password"
              />
              <p className="text-[10px] tracking-[0.15em] text-pearl/30">{secretGate.hint}</p>
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="text-xs text-rose-soft/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Not that one… try again, softly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          <motion.button
            type="submit"
            className="relative inline-flex items-center justify-center min-h-12 px-8 sm:px-10 py-4 rounded-full text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-ink font-medium overflow-hidden w-full sm:w-auto max-w-xs mx-auto"
            style={{
              background: 'linear-gradient(135deg, #f7e8e0, #f2b8c6 50%, #e8d5a8)',
              boxShadow: '0 0 40px rgba(242, 184, 198, 0.45)',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">{enterLabel}</span>
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-8 text-[10px] tracking-[0.3em] uppercase text-pearl/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Music begins with your touch
        </motion.p>
      </div>
    </motion.div>
  )
}
