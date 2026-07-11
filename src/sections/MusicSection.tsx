import { motion } from 'framer-motion'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'
import { HiMusicalNote } from 'react-icons/hi2'

export default function MusicSection() {
  const { sections } = useWeekContent()

  return (
    <SectionWrapper id="music">
      <GlowingBlobs />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 50%, rgba(196, 92, 116, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(212, 181, 106, 0.12) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <SectionItem>
          <div className="glass-strong rounded-3xl p-10 md:p-14 premium-shadow">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-6"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-white/10"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(242,184,198,0.35), rgba(212,181,106,0.25))',
                }}
              >
                <HiMusicalNote className="text-4xl text-blush" />
              </div>
            </motion.div>

            <p className="text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-6">
              {sections.music.chapter}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient mb-6">
              {sections.music.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-pearl/55 italic leading-relaxed mb-4 whitespace-pre-line">
              {sections.music.subtitle}
            </p>
            <p className="text-sm text-pearl/30 tracking-wide">{sections.music.hint}</p>
          </div>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
