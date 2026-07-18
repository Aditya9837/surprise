import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ConfettiBurst } from './ConfettiBurst'
import { Fireworks } from './Fireworks'
import { FloatingHearts } from './FloatingHearts'
import { useWeekContent, useWeekMeta } from '../../context/WeekContext'
import { GlassCard } from '../ui/GlassCard'
import { downloadMemoryCard } from '../../utils/memoryCard'

type Stage = 'sealed' | 'whisper' | 'reveal' | 'question'

export function GiftBox() {
  const content = useWeekContent()

  if (content.finaleMode === 'proposal' && content.proposal) {
    return <ProposalFinale />
  }

  if (content.finaleMode === 'envelope') {
    return <EnvelopeFinale />
  }

  return <MessageFinale />
}

function EnvelopeFinale() {
  const { cta, finalMessage, herName } = useWeekContent()
  const meta = useWeekMeta()
  const [opened, setOpened] = useState(false)
  const [showFX, setShowFX] = useState(false)

  useEffect(() => {
    if (!opened) return
    setShowFX(true)
    const t = window.setTimeout(() => setShowFX(false), 2800)
    return () => clearTimeout(t)
  }, [opened])

  return (
    <div className="relative flex flex-col items-center w-full px-4" style={{ zIndex: 30 }}>
      <ConfettiBurst active={showFX} />
      <FloatingHearts active={showFX} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="envelope"
            type="button"
            onClick={() => setOpened(true)}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Open the letter"
          >
            <motion.div
              className="absolute -inset-8 rounded-full blur-3xl"
              style={{ background: 'rgba(232,213,168,0.25)' }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />

            <div className="relative w-64 sm:w-72 h-44 sm:h-48">
              <div
                className="absolute inset-0 rounded-md border border-white/15 shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #3a242c, #1a1014)',
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1/2 origin-top"
                  style={{
                    background: 'linear-gradient(180deg, #4a3038, #2a1820)',
                    clipPath: 'polygon(0 0, 50% 70%, 100% 0)',
                  }}
                />
                <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-champagne/50 flex items-center justify-center bg-[#1a1014] shadow-[0_0_30px_rgba(232,213,168,0.35)]">
                  <span className="font-[family-name:var(--font-script)] text-2xl text-champagne">
                    M
                  </span>
                </div>
              </div>
            </div>

            <motion.p
              className="mt-10 text-sm tracking-[0.3em] uppercase text-pearl/50 group-hover:text-champagne transition-colors"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {cta.gift}
            </motion.p>
            <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-pearl/25">
              A sealed letter for you
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl w-full relative"
            style={{ zIndex: 40 }}
          >
            <div
              className="rounded-sm p-8 sm:p-12 text-center relative"
              style={{
                background: 'linear-gradient(165deg, #f7efe6, #f0e0d4)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a5a66]/70 mb-4">
                {meta.dateLabel}
              </p>
              <h2 className="font-[family-name:var(--font-script)] text-4xl sm:text-5xl text-[#5c3d45] mb-3">
                {finalMessage.title}
              </h2>
              <p className="font-[family-name:var(--font-display)] text-base sm:text-lg text-[#7a5560] italic mb-8">
                {finalMessage.subtitle}
              </p>
              <div className="space-y-3 mb-10">
                {finalMessage.lines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="font-[family-name:var(--font-handwritten)] text-xl sm:text-2xl text-[#6b4550]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.2 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <motion.button
                type="button"
                onClick={() =>
                  downloadMemoryCard({
                    herName,
                    dateLabel: meta.dateLabel || 'Forever',
                    title: finalMessage.title,
                    subtitle: finalMessage.subtitle,
                  })
                }
                className="inline-flex items-center justify-center min-h-12 px-8 py-3 rounded-full text-[11px] tracking-[0.22em] uppercase text-[#f7efe6] font-medium"
                style={{ background: 'linear-gradient(135deg, #c45c74, #8a4a58)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Save this day ↓
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MessageFinale() {
  const { cta, finalMessage, herName } = useWeekContent()
  const meta = useWeekMeta()
  const [opened, setOpened] = useState(false)
  const [lidOpen, setLidOpen] = useState(false)

  const handleOpen = () => {
    if (opened) return
    setLidOpen(true)
    setTimeout(() => setOpened(true), 600)
  }

  return (
    <div className="relative flex flex-col items-center z-20">
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
            <motion.div
              className="absolute inset-0 rounded-3xl blur-2xl"
              style={{ background: 'rgba(196, 92, 116, 0.35)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="absolute bottom-0 left-0 right-0 h-3/5 rounded-b-2xl bg-gradient-to-br from-[#1a1014] to-[#2a1820] border border-white/10 premium-shadow overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-blush/20 to-transparent" />
              <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-gradient-to-b from-champagne/60 to-champagne/30" />
              <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 bg-gradient-to-r from-champagne/30 via-champagne/60 to-champagne/30" />
            </div>

            <motion.div
              className="absolute top-[15%] left-[-5%] right-[-5%] h-[35%] origin-bottom"
              animate={lidOpen ? { rotateX: -120, y: -30 } : { rotateX: 0, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 800, transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full rounded-t-2xl bg-gradient-to-br from-[#2a1820] to-[#1a1014] border border-white/10 premium-shadow">
                <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-8 h-8">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-champagne to-gold shadow-[0_0_20px_rgba(212,181,106,0.5)]" />
                </div>
                <div className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 bg-gradient-to-b from-champagne/70 to-champagne/40" />
              </div>
            </motion.div>
          </div>

          <motion.p
            className="mt-8 text-sm tracking-[0.3em] uppercase text-pearl/50 group-hover:text-blush transition-colors"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {cta.gift}
          </motion.p>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 max-w-2xl mx-auto px-6 pb-16"
        >
          <GlassCard strong className="p-8 sm:p-10 md:p-14 text-center premium-shadow">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-semibold text-gradient mb-4">
              {finalMessage.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-lg md:text-2xl text-pearl/70 italic mb-8">
              {finalMessage.subtitle}
            </p>
            <div className="space-y-3 mb-10">
              {finalMessage.lines.map((line, i) => (
                <motion.p
                  key={i}
                  className="font-[family-name:var(--font-handwritten)] text-xl sm:text-2xl md:text-3xl text-blush/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.3 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={() =>
                downloadMemoryCard({
                  herName,
                  dateLabel: meta.dateLabel || 'Forever',
                  title: finalMessage.title,
                  subtitle: finalMessage.subtitle,
                })
              }
              className="inline-flex items-center justify-center min-h-12 px-8 py-4 rounded-full text-xs tracking-[0.22em] uppercase text-ink font-medium"
              style={{
                background: 'linear-gradient(135deg, #f7e8e0, #f2b8c6 45%, #e8d5a8)',
                boxShadow: '0 0 40px rgba(242,184,198,0.5)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Save this day ↓
            </motion.button>
          </GlassCard>
        </motion.div>
      )}
    </div>
  )
}

function ProposalFinale() {
  const { cta, proposal, herName } = useWeekContent()
  const meta = useWeekMeta()
  const [stage, setStage] = useState<Stage>('sealed')
  const [celebrating, setCelebrating] = useState(false)
  const answerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (stage !== 'question') return
    const t = window.setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 400)
    return () => clearTimeout(t)
  }, [stage])

  if (!proposal) return null

  const open = () => {
    if (stage !== 'sealed') return
    setStage('whisper')
    window.setTimeout(() => setStage('reveal'), 2000)
    window.setTimeout(() => {
      setStage('question')
      setCelebrating(true)
    }, 4200)
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <ConfettiBurst active={celebrating} />
      <Fireworks active={celebrating} />
      <FloatingHearts active={celebrating} />

      <AnimatePresence mode="wait">
        {stage === 'sealed' && (
          <motion.button
            key="sealed"
            type="button"
            onClick={open}
            className="relative cursor-pointer group z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Open the proposal"
          >
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: 'rgba(196, 92, 116, 0.45)' }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />

            <div className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
              <motion.svg
                viewBox="0 0 24 24"
                className="w-24 h-24 md:w-28 md:h-28 drop-shadow-[0_0_40px_rgba(242,184,198,0.7)]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="url(#proposalHeartGrad)"
                />
                <defs>
                  <linearGradient id="proposalHeartGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f7e8e0" />
                    <stop offset="50%" stopColor="#f2b8c6" />
                    <stop offset="100%" stopColor="#d4b56a" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </div>

            <motion.p
              className="mt-10 text-sm tracking-[0.35em] uppercase text-pearl/45 group-hover:text-blush transition-colors"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              {cta.gift}
            </motion.p>
          </motion.button>
        )}

        {stage === 'whisper' && (
          <motion.div
            key="whisper"
            className="text-center px-6 max-w-xl z-20"
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-pearl/70 italic leading-relaxed">
              {proposal.whisper}
            </p>
          </motion.div>
        )}

        {(stage === 'reveal' || stage === 'question') && (
          <motion.div
            key="reveal-block"
            className="text-center px-4 sm:px-6 max-w-3xl relative z-20 w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-[family-name:var(--font-script)] text-5xl sm:text-7xl md:text-8xl shimmer-text leading-none mb-4 px-2">
              {proposal.reveal}
            </h2>

            {meta.dateLabel && (
              <p className="text-[11px] tracking-[0.3em] uppercase text-champagne/60 mb-5">
                {meta.dateLabel} · a day to remember forever
              </p>
            )}

            <p className="font-[family-name:var(--font-display)] text-base md:text-lg text-pearl/50 italic whitespace-pre-line leading-relaxed max-w-lg mx-auto mb-10">
              {proposal.after}
            </p>

            {stage === 'question' && (
              <div ref={answerRef} id="proposal-answer" className="scroll-mt-24">
                <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-light text-gradient-gold mb-3 px-2">
                  {proposal.question}
                </h3>
                <p className="font-[family-name:var(--font-script)] text-2xl sm:text-3xl text-blush/70 mb-8">
                  {proposal.forever}
                </p>
                <YesMoment
                  label={cta.yes ?? 'Yes 💕'}
                  maybeLabel={cta.maybe ?? 'Maybe…'}
                  dateLabel={meta.dateLabel}
                  herName={herName}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function YesMoment({
  label,
  maybeLabel = 'Maybe…',
  dateLabel,
  herName,
}: {
  label: string
  maybeLabel?: string
  dateLabel?: string
  herName: string
}) {
  const [saidYes, setSaidYes] = useState(false)
  const [maybePos, setMaybePos] = useState({ x: 0, y: 0 })
  const [tease, setTease] = useState('')
  const [fleeCount, setFleeCount] = useState(0)

  const teases = [
    'Try again 💕',
    'Not that button…',
    'My heart says Yes',
    'Come on… Yes looks nicer',
    'Almost… try the other one',
  ]

  const flee = () => {
    const angle = Math.random() * Math.PI * 2
    const dist = 60 + Math.random() * 80
    setMaybePos({
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    })
    setFleeCount((c) => c + 1)
    setTease(teases[fleeCount % teases.length])
  }

  if (saidYes) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 pb-8"
      >
        <p className="font-[family-name:var(--font-script)] text-4xl sm:text-5xl md:text-6xl text-gradient">
          You just made me the happiest
        </p>
        {dateLabel && (
          <p className="text-[11px] tracking-[0.3em] uppercase text-pearl/40">
            {dateLabel} — forever ours
          </p>
        )}
        <motion.button
          type="button"
          onClick={() =>
            downloadMemoryCard({
              herName,
              dateLabel: dateLabel ?? 'Forever',
              title: 'I Love You',
              subtitle: 'A day to remember forever',
            })
          }
          className="inline-flex items-center justify-center min-h-12 px-8 py-4 rounded-full text-xs tracking-[0.22em] uppercase text-ink font-medium"
          style={{
            background: 'linear-gradient(135deg, #f7e8e0, #f2b8c6 45%, #e8d5a8)',
            boxShadow: '0 0 40px rgba(242,184,198,0.5)',
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Save this day ↓
        </motion.button>
        <p className="text-[10px] tracking-[0.2em] uppercase text-pearl/30">
          Downloads a memory card for your phone
        </p>
      </motion.div>
    )
  }

  return (
    <div className="relative flex flex-col items-center gap-6 min-h-[160px] pb-10 px-2">
      <p className="text-[10px] tracking-[0.25em] uppercase text-pearl/35">
        Choose carefully…
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative w-full max-w-md mx-auto">
        <motion.button
          type="button"
          onClick={() => setSaidYes(true)}
          className="relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full text-sm tracking-[0.2em] uppercase text-ink font-medium z-10 min-h-14"
          style={{
            background: 'linear-gradient(135deg, #f7e8e0, #f2b8c6 45%, #e8d5a8)',
            boxShadow: '0 0 50px rgba(242, 184, 198, 0.55)',
          }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {label}
        </motion.button>

        <motion.button
          type="button"
          onMouseEnter={flee}
          onClick={flee}
          onTouchStart={(e) => {
            e.preventDefault()
            flee()
          }}
          animate={{ x: maybePos.x, y: maybePos.y }}
          transition={{ type: 'spring', stiffness: 380, damping: 16 }}
          className="w-full sm:w-auto inline-flex items-center justify-center min-h-12 px-8 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase text-pearl/60 border border-white/20 bg-white/[0.06] z-20"
        >
          {maybeLabel}
        </motion.button>
      </div>

      <AnimatePresence>
        {tease && (
          <motion.p
            key={tease + fleeCount}
            className="font-[family-name:var(--font-handwritten)] text-2xl text-blush/80"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {tease}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
