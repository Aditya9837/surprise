import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useWeekContent } from '../../context/WeekContext'

export function PhotoFilmStrip() {
  const { photos } = useWeekContent()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('[data-film-card]') as HTMLElement | null
    if (!card) return
    const idx = Math.round(el.scrollLeft / (card.offsetWidth + 16))
    setActive(Math.max(0, Math.min(photos.length - 1, idx)))
  }

  return (
    <div className="w-full">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-none"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      >
        {photos.map((photo, i) => (
          <motion.figure
            key={photo.id}
            data-film-card
            className="snap-center shrink-0 w-[78vw] max-w-[300px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black/40 to-transparent z-10 flex items-center justify-center gap-1">
                {[...Array(8)].map((_, d) => (
                  <span key={d} className="w-1 h-1 rounded-full bg-white/25" />
                ))}
              </div>
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <figcaption className="mt-4 text-center font-[family-name:var(--font-handwritten)] text-xl text-blush/85 px-2">
              {photo.caption}
            </figcaption>
          </motion.figure>
        ))}
        <div className="shrink-0 w-4" aria-hidden />
      </div>

      <div className="flex justify-center gap-1.5 mt-2">
        {photos.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-all"
            style={{
              width: i === active ? 18 : 6,
              background: i === active ? '#f2b8c6' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
      <p className="text-center mt-4 text-[10px] tracking-[0.25em] uppercase text-pearl/30">
        Swipe the film →
      </p>
    </div>
  )
}
