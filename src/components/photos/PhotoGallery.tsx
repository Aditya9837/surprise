import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWeekContent } from '../../context/WeekContext'

function PhotoCard({
  src,
  caption,
  tilt,
  index,
}: {
  src: string
  caption: string
  tilt: number
  index: number
}) {
  const [failed, setFailed] = useState(false)
  const hues = [340, 20, 350, 15, 330, 25]

  return (
    <motion.figure
      className="photo-frame relative w-[min(78vw,220px)] sm:w-[min(72vw,240px)] md:w-[220px] shrink-0"
      style={{ rotate: `${tilt}deg` }}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        rotate: 0,
        scale: 1.06,
        zIndex: 20,
        transition: { duration: 0.35 },
      }}
    >
      <div className="relative overflow-hidden rounded-sm bg-[#1a1014]">
        {!failed ? (
          <img
            src={src}
            alt={caption}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full aspect-[3/4] object-cover"
          />
        ) : (
          <div
            className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-3 px-4"
            style={{
              background: `linear-gradient(160deg, hsl(${hues[index % hues.length]}, 45%, 55%), hsl(${hues[index % hues.length] + 30}, 35%, 35%))`,
            }}
          >
            <span className="text-4xl opacity-80">💕</span>
            <p className="text-white/70 text-xs text-center tracking-wide">
              Add photo
              <br />
              <span className="opacity-60">public/photos/{index + 1}.jpg</span>
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
      </div>
      <figcaption className="mt-3 text-center font-[family-name:var(--font-handwritten)] text-lg text-[#5c3d45] leading-tight px-1">
        {caption}
      </figcaption>
    </motion.figure>
  )
}

export function PhotoGallery() {
  const { photos } = useWeekContent()

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap justify-center items-end gap-6 md:gap-8 px-4 py-8">
        {photos.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            src={photo.src}
            caption={photo.caption}
            tilt={photo.tilt}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
