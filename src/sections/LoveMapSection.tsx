import { motion } from 'framer-motion'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function LoveMapSection() {
  const { loveMap, sections } = useWeekContent()
  if (!loveMap?.length) return null

  const chapter = sections.loveMap ?? {
    chapter: 'Our path',
    title: 'The love map',
    subtitle: 'From the first hello to forever.',
  }

  return (
    <SectionWrapper id="love-map">
      <GlowingBlobs />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(212,181,106,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-16">
        <SectionItem className="text-center mb-12">
          <p className="text-[11px] tracking-[0.4em] uppercase text-champagne/50 mb-4">
            {chapter.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-gradient mb-3">
            {chapter.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-pearl/45 italic">
            {chapter.subtitle}
          </p>
        </SectionItem>

        <div className="relative">
          <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-blush/50 via-champagne/30 to-blush/20" />

          <ul className="space-y-8">
            {loveMap.map((moment, i) => (
              <motion.li
                key={moment.title}
                className="relative pl-12 sm:pl-14"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                <span
                  className="absolute left-0 top-1.5 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-ink font-medium"
                  style={{
                    background:
                      i === loveMap.length - 1
                        ? 'linear-gradient(135deg, #f7e8e0, #f2b8c6)'
                        : 'rgba(255,245,240,0.08)',
                    boxShadow:
                      i === loveMap.length - 1
                        ? '0 0 24px rgba(242,184,198,0.45)'
                        : undefined,
                    color: i === loveMap.length - 1 ? '#0a0608' : '#f2b8c6',
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-[10px] tracking-[0.28em] uppercase text-blush/45 mb-1.5">
                  {moment.label}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-pearl/90 mb-1">
                  {moment.title}
                </h3>
                <p className="text-sm text-pearl/45 leading-relaxed">{moment.detail}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}
