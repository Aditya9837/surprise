import { motion } from 'framer-motion'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

const HIGHLIGHTS = [
  'chaand',
  'phool',
  'khwaab',
  'dua',
  'sukoon',
  'muskuraahat',
  'mansi',
]

function PoemLine({ line, index }: { line: string; index: number }) {
  const trimmed = line.trim()
  if (!trimmed) {
    return <div className="h-5 sm:h-6" />
  }

  const isTitle = index === 0 || trimmed.startsWith('For you')
  const isSign = trimmed.startsWith('—') || trimmed.startsWith('-')

  const parts = trimmed.split(/(\s+)/)

  return (
    <motion.p
      className={`leading-relaxed ${
        isTitle
          ? 'font-[family-name:var(--font-script)] text-3xl sm:text-4xl text-gradient mb-8'
          : isSign
            ? 'font-[family-name:var(--font-display)] text-lg sm:text-xl text-pearl/45 italic mt-10'
            : 'font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl text-pearl/80 italic'
      }`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ delay: Math.min(index * 0.06, 0.8), duration: 0.55 }}
    >
      {parts.map((part, i) => {
        const clean = part.replace(/[.,…]/g, '').toLowerCase()
        const glow = HIGHLIGHTS.includes(clean)
        return (
          <span
            key={i}
            className={
              glow
                ? 'text-blush font-medium'
                : undefined
            }
            style={
              glow
                ? { textShadow: '0 0 24px rgba(242,184,198,0.35)' }
                : undefined
            }
          >
            {part}
          </span>
        )
      })}
    </motion.p>
  )
}

export default function MessageSection() {
  const { handwrittenMessage, sections } = useWeekContent()
  const lines = handwrittenMessage.split('\n')
  const feelsLikePoem =
    handwrittenMessage.toLowerCase().includes('chaand') ||
    handwrittenMessage.toLowerCase().includes('sukoon') ||
    handwrittenMessage.toLowerCase().includes('khwaab')

  return (
    <SectionWrapper id="message">
      <GlowingBlobs />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(196, 92, 116, 0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12">
        <SectionItem>
          <p className="text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-3 text-center">
            {sections.message.chapter}
          </p>
          {sections.message.title && (
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center text-gradient mb-10">
              {sections.message.title}
            </h2>
          )}
        </SectionItem>

        <SectionItem>
          <div
            className={`glass-strong rounded-3xl p-8 md:p-12 premium-shadow relative overflow-hidden ${
              feelsLikePoem ? 'text-center' : ''
            }`}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(232, 213, 168, 0.5) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(242, 184, 198, 0.45) 0%, transparent 70%)',
              }}
            />

            <div className="relative space-y-1">
              {feelsLikePoem
                ? lines.map((line, i) => <PoemLine key={i} line={line} index={i} />)
                : lines.map((line, i) => (
                    <p
                      key={i}
                      className={`font-[family-name:var(--font-handwritten)] leading-relaxed ${
                        i === 0
                          ? 'text-3xl md:text-4xl text-blush mb-6'
                          : line.trim() === ''
                            ? 'h-4'
                            : 'text-xl md:text-2xl text-pearl/75'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-3">
              {feelsLikePoem ? (
                <>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-blush/40" />
                  <span className="text-blush/50 text-sm tracking-[0.2em] uppercase">sukoon</span>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-blush/40" />
                </>
              ) : (
                <div className="ml-auto flex items-center gap-3">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-blush/50" />
                  <span className="text-blush/60 text-lg">♥</span>
                </div>
              )}
            </div>
          </div>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
