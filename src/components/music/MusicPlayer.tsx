import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HiPlay, HiPause, HiMusicalNote, HiForward } from 'react-icons/hi2'
import type { WeekTrack } from '../../weeks/types'

interface MusicPlayerProps {
  unlocked: boolean
  playlist: WeekTrack[]
}

export function MusicPlayer({ unlocked, playlist }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const tracks = playlist.length > 0 ? playlist : []
  const track = tracks[trackIndex] ?? tracks[0]

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      await audio.play()
      setPlaying(true)
      setAutoplayBlocked(false)
      return true
    } catch {
      setAutoplayBlocked(true)
      return false
    }
  }, [])

  useEffect(() => {
    setTrackIndex(0)
  }, [playlist])

  useEffect(() => {
    if (!unlocked || !track) return
    void play()
  }, [unlocked, play, trackIndex, track])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      await play()
    }
  }, [playing, play])

  const nextTrack = useCallback(() => {
    if (tracks.length < 2) return
    setTrackIndex((i) => (i + 1) % tracks.length)
  }, [tracks.length])

  const onEnded = () => {
    if (tracks.length > 1) {
      nextTrack()
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0
      void play()
    }
  }

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

  if (!unlocked || !track) return null

  return (
    <>
      <audio
        ref={audioRef}
        key={track.src}
        src={track.src}
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
        loop={tracks.length === 1}
      />

      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9000] safe-bottom"
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="glass-strong rounded-2xl p-4 sm:p-5 mb-3 sm:mb-4 w-[min(18rem,calc(100vw-2rem))] premium-shadow"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #c45c74, #d4b56a)' }}
                >
                  <HiMusicalNote className="text-white text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-pearl truncate">{track.title}</p>
                  <p className="text-xs text-pearl/45 truncate">{track.artist}</p>
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
                  className="h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: 'linear-gradient(90deg, #f2b8c6, #d4b56a)',
                  }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-pearl/35 tracking-wider">
                <span>{formatTime(progress * duration)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {autoplayBlocked && !playing && (
                <p className="text-[10px] text-blush/70 mt-3 text-center tracking-wide">
                  Tap play to start the music
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 justify-end">
          {tracks.length > 1 && (
            <motion.button
              type="button"
              onClick={nextTrack}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-pearl/60 hover:text-pearl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next song"
            >
              <HiForward />
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={togglePlay}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-ink border border-white/25"
            style={{
              background: 'linear-gradient(135deg, #f7e8e0, #f2b8c6, #e8d5a8)',
              boxShadow: '0 0 30px rgba(242, 184, 198, 0.5)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            {playing ? <HiPause className="text-xl sm:text-2xl" /> : <HiPlay className="text-xl sm:text-2xl ml-0.5" />}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-pearl/60 hover:text-pearl transition-colors"
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
