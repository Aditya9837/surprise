import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { GiftBox } from '../components/gift/GiftBox'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { SECTIONS } from '../constants/content'

export default function GiftSection() {
  return (
    <SectionWrapper id="gift">
      <GlowingBlobs />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center bottom, rgba(124, 58, 237, 0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full px-6 py-16">
        <SectionItem className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-4">
            {SECTIONS.gift.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient-gold">
            {SECTIONS.gift.title}
          </h2>
        </SectionItem>

        <SectionItem>
          <GiftBox />
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
