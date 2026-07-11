import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function MessageSection() {
  const { handwrittenMessage, sections } = useWeekContent()
  const lines = handwrittenMessage.split('\n')

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
          <div className="glass-strong rounded-3xl p-8 md:p-12 premium-shadow relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(232, 213, 168, 0.5) 0%, transparent 70%)',
              }}
            />

            <div className="relative">
              {lines.map((line, i) => (
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

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end gap-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-blush/50" />
              <span className="text-blush/60 text-lg">♥</span>
            </div>
          </div>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
