import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { GiftBox } from '../components/gift/GiftBox'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function GiftSection() {
  const { sections } = useWeekContent()

  return (
    <SectionWrapper
      id="gift"
      stayVisible
      className="romantic-veil relative z-10 !overflow-y-auto !overflow-x-hidden !items-start !min-h-[100dvh] py-20 sm:py-24"
    >
      <GlowingBlobs />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center bottom, rgba(196, 92, 116, 0.2) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-20 w-full px-5 sm:px-6 pb-32">
        <SectionItem className="text-center mb-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-champagne/55 mb-4">
            {sections.gift.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient-gold">
            {sections.gift.title}
          </h2>
        </SectionItem>

        <SectionItem>
          <GiftBox />
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
