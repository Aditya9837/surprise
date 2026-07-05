import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HiPlay, HiPause, HiMusicalNote } from 'react-icons/hi2'
import { MUSIC_TRACK } from '../../constants/content'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || startedRef.current) return true

    try {
      await audio.play()
      startedRef.current = true
      setPlaying(true)
      setAutoplayBlocked(false)
      return true
    } catch {
      setAutoplayBlocked(true)
      return false
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onCanPlay = () => {
      void tryPlay()
    }

    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void tryPlay()
    } else {
      audio.addEventListener('canplay', onCanPlay, { once: true })
    }

    const onFirstInteraction = () => {
      void tryPlay()
    }

    document.addEventListener('click', onFirstInteraction, { once: true })
    document.addEventListener('touchstart', onFirstInteraction, { once: true })
    document.addEventListener('keydown', onFirstInteraction, { once: true })

    return () => {
      audio.removeEventListener('canplay', onCanPlay)
      document.removeEventListener('click', onFirstInteraction)
      document.removeEventListener('touchstart', onFirstInteraction)
      document.removeEventListener('keydown', onFirstInteraction)
    }
  }, [tryPlay])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      startedRef.current = false
      setPlaying(false)
    } else {
      await tryPlay()
    }
  }, [playing, tryPlay])

  const onTimeUpdate = () => {
    const audio = audioRef.current
    if (audio && audio.duration) {
      setProgress(audio.currentTime / audio.duration)
    }
  }

  const onLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio) setDuration(audio.duration)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_TRACK.src}
        loop
        autoPlay
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <motion.div
        className="fixed bottom-6 right-6 z-[9000]"
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="glass-strong rounded-2xl p-5 mb-4 w-72 premium-shadow"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <HiMusicalNote className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{MUSIC_TRACK.title}</p>
                  <p className="text-xs text-white/50">{MUSIC_TRACK.artist}</p>
                </div>
              </div>

              <div
                className="h-1.5 bg-white/10 rounded-full cursor-pointer mb-2 overflow-hidden"
                onClick={seek}
                role="slider"
                aria-valuenow={progress * 100}
                tabIndex={0}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-white/40 tracking-wider">
                <span>{formatTime(progress * duration)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {autoplayBlocked && !playing && (
                <p className="text-[10px] text-pink-300/70 mt-3 text-center tracking-wide">
                  Tap anywhere to start the music ✨
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 justify-end">
          <motion.button
            type="button"
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            {playing ? <HiPause className="text-2xl" /> : <HiPlay className="text-2xl ml-0.5" />}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle player details"
          >
            <HiMusicalNote />
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
