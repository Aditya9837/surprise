import { motion } from 'framer-motion'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { GlassCard } from '../components/ui/GlassCard'
import { SECTIONS } from '../constants/content'
import { HiMusicalNote } from 'react-icons/hi2'

export default function MusicSection() {
  return (
    <SectionWrapper id="music">
      <GlowingBlobs />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 30% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <SectionItem>
          <GlassCard className="p-10 md:p-14">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 flex items-center justify-center mx-auto border border-white/10">
                <HiMusicalNote className="text-4xl text-pink-300" />
              </div>
            </motion.div>

            <p className="text-xs tracking-[0.4em] uppercase text-pink-300/60 mb-6">
              {SECTIONS.music.chapter}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient mb-6">
              {SECTIONS.music.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-white/60 italic leading-relaxed mb-4 whitespace-pre-line">
              {SECTIONS.music.subtitle}
            </p>
            <p className="text-sm text-white/30 tracking-wide">
              {SECTIONS.music.hint}
            </p>
          </GlassCard>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
