export type GalleryMode = 'photos' | 'polaroids3d'
export type HeartsMode = 'reasons' | 'convergence'
export type FinaleMode = 'proposal' | 'message'

export interface WeekPhoto {
  id: number
  src: string
  caption: string
  tilt: number
}

export interface WeekPolaroid {
  id: number
  caption: string
  gradient: string
  emoji: string
  src?: string
}

export interface WeekTrack {
  title: string
  artist: string
  src: string
}

export interface WeekSections {
  petals: { chapter: string; title: string; subtitle: string }
  hearts: { chapter: string; title: string; subtitle: string }
  polaroids: { chapter: string; title: string; subtitle: string }
  stars: { chapter: string; title: string; subtitle: string }
  music: { chapter: string; title: string; subtitle: string; hint: string }
  message: { chapter: string; title?: string }
  gift: { chapter: string; title: string }
  loveMap?: { chapter: string; title: string; subtitle: string }
}

export interface WeekCta {
  enter: string
  landing: string
  gift: string
  yes?: string
  maybe?: string
}

export interface WeekProposal {
  whisper: string
  reveal: string
  after: string
  question: string
  forever: string
}

export interface WeekFinalMessage {
  title: string
  subtitle: string
  lines: string[]
}

export interface LoveMapMoment {
  label: string
  title: string
  detail: string
}

export interface SecretGateConfig {
  /** Accepted answers (compared lowercase, trimmed) */
  passwords: string[]
  hint: string
  placeholder: string
}

/** Full experience content for one week */
export interface WeekContent {
  herName: string
  siteTitle: string
  landingLines: string[]
  photos: WeekPhoto[]
  polaroids: WeekPolaroid[]
  reasons: string[]
  handwrittenMessage: string
  proposal?: WeekProposal
  finalMessage: WeekFinalMessage
  musicPlaylist: WeekTrack[]
  sections: WeekSections
  cta: WeekCta
  galleryMode: GalleryMode
  heartsMode: HeartsMode
  finaleMode: FinaleMode
  secretGate?: SecretGateConfig
  loveMap?: LoveMapMoment[]
}

/** Archive card / registry metadata */
export interface WeekMeta {
  id: number
  slug: string
  weekLabel: string
  title: string
  subtitle: string
  dateLabel: string
  /** ISO date for countdown math, e.g. 2026-07-11 */
  dateISO?: string
  story: string
  highlights: string[]
  mood: string
  accent: string
}
