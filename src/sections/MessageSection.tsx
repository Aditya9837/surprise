import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { GlassCard } from '../components/ui/GlassCard'
import { HANDWRITTEN_MESSAGE, SECTIONS } from '../constants/content'

export default function MessageSection() {
  const lines = HANDWRITTEN_MESSAGE.split('\n')

  return (
    <SectionWrapper id="message">
      <GlowingBlobs />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12">
        <SectionItem>
          <p className="text-xs tracking-[0.4em] uppercase text-pink-300/60 mb-8 text-center">
            {SECTIONS.message.chapter}
          </p>
        </SectionItem>

        <SectionItem>
          <GlassCard strong className="p-8 md:p-12 premium-shadow relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
              }}
            />

            <div className="relative">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={`font-[family-name:var(--font-handwritten)] leading-relaxed ${
                    i === 0
                      ? 'text-3xl md:text-4xl text-pink-200 mb-6'
                      : line.trim() === ''
                        ? 'h-4'
                        : 'text-xl md:text-2xl text-white/75'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end gap-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-pink-400/50" />
              <span className="text-pink-300/50 text-lg">♥</span>
            </div>
          </GlassCard>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
