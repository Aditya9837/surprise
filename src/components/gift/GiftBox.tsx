import { motion } from 'framer-motion'
import { useState } from 'react'
import { ConfettiBurst } from './ConfettiBurst'
import { Fireworks } from './Fireworks'
import { FloatingHearts } from './FloatingHearts'
import { CTA, FINAL_MESSAGE } from '../../constants/content'
import { GlassCard } from '../ui/GlassCard'

export function GiftBox() {
  const [opened, setOpened] = useState(false)
  const [lidOpen, setLidOpen] = useState(false)

  const handleOpen = () => {
    if (opened) return
    setLidOpen(true)
    setTimeout(() => setOpened(true), 600)
  }

  return (
    <div className="relative flex flex-col items-center">
      <ConfettiBurst active={opened} />
      <Fireworks active={opened} />
      <FloatingHearts active={opened} />

      {!opened ? (
        <motion.button
          type="button"
          onClick={handleOpen}
          className="relative cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open the gift box"
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            {/* Glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Box body */}
            <div className="absolute bottom-0 left-0 right-0 h-3/5 rounded-b-2xl bg-gradient-to-br from-[#1a1033] to-[#2d1b4e] border border-white/10 premium-shadow overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-pink-500/20 to-transparent" />
              <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-gradient-to-b from-gold/60 to-gold/30" />
              <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 bg-gradient-to-r from-gold/30 via-gold/60 to-gold/30" />
            </div>

            {/* Lid */}
            <motion.div
              className="absolute top-[15%] left-[-5%] right-[-5%] h-[35%] origin-bottom"
              animate={lidOpen ? { rotateX: -120, y: -30 } : { rotateX: 0, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 800, transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full rounded-t-2xl bg-gradient-to-br from-[#2d1b4e] to-[#1a1033] border border-white/10 premium-shadow">
                <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-8 h-8">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gold to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
                </div>
                <div className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 bg-gradient-to-b from-gold/70 to-gold/40" />
              </div>
            </motion.div>

            {/* Sparkles around box */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-gold rounded-full"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + (i % 3) * 20}%`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>

          <motion.p
            className="mt-8 text-sm tracking-[0.3em] uppercase text-white/50 group-hover:text-pink-300 transition-colors"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {CTA.gift}
          </motion.p>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-2xl mx-auto px-6"
        >
          <GlassCard strong className="p-10 md:p-14 text-center premium-shadow">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <span className="text-5xl mb-6 block">🎁</span>
            </motion.div>

            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold text-gradient mb-4">
              {FINAL_MESSAGE.title}
            </h2>

            <p className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-white/70 italic mb-8">
              {FINAL_MESSAGE.subtitle}
            </p>

            <div className="space-y-3">
              {FINAL_MESSAGE.lines.map((line, i) => (
                <motion.p
                  key={i}
                  className="font-[family-name:var(--font-handwritten)] text-2xl md:text-3xl text-pink-200/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.3 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="mt-10 flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                >
                  ✨
                </motion.span>
              ))}
            </motion.div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  )
}
