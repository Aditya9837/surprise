import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypingAnimationProps {
  lines: string[]
  speed?: number
  pauseBetween?: number
  className?: string
  onComplete?: () => void
}

export function TypingAnimation({
  lines,
  speed = 55,
  pauseBetween = 1200,
  className = '',
  onComplete,
}: TypingAnimationProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return

    const currentLine = lines[lineIndex]
    if (!currentLine) {
      setDone(true)
      onComplete?.()
      return
    }

    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed)
      return () => clearTimeout(t)
    }

    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1)
        setCharIndex(0)
      }, pauseBetween)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      setDone(true)
      onComplete?.()
    }, pauseBetween)
    return () => clearTimeout(t)
  }, [lineIndex, charIndex, lines, speed, pauseBetween, done, onComplete])

  return (
    <div className={`space-y-2 md:space-y-4 ${className}`}>
      {lines.map((line, i) => {
        if (i > lineIndex) return null
        const text = i === lineIndex ? line.slice(0, charIndex) : line
        const isLast = i === lines.length - 1
        const isActive = i === lineIndex && !done

        return (
          <motion.p
            key={i}
            className={`font-[family-name:var(--font-display)] leading-tight tracking-wide ${
              isLast
                ? 'text-lg sm:text-2xl md:text-4xl text-pearl/75 font-light italic'
                : 'text-base sm:text-xl md:text-3xl text-pearl/55 font-light italic'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {text}
            {isActive && (
              <motion.span
                className="inline-block w-[3px] h-[0.85em] bg-blush ml-1 align-middle rounded-full"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.p>
        )
      })}
    </div>
  )
}
