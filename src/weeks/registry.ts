/**
 * HOW TO ADD A NEW WEEK (every week forever)
 * ----------------------------------------
 * 1. Create:  src/weeks/weekN/content.ts
 * 2. Import it here + add WEEK_META + WEEK_CONTENT
 * Home (/) always opens the highest week id.
 */

import type { WeekContent, WeekMeta } from './types'
import { week1Content } from './week1/content'
import { week2Content } from './week2/content'
import { week3Content } from './week3/content'
import { week4Content } from './week4/content'

export const WEEK_META: WeekMeta[] = [
  {
    id: 1,
    slug: 'week-1',
    weekLabel: 'Week 1',
    title: 'The First Hello',
    subtitle: 'Day one — soft, honest, unforgettable',
    dateLabel: 'First week',
    dateISO: '2026-07-04',
    story:
      'The very first surprise. A quiet website after the first conversation — no big promises, just honesty and good vibes.',
    highlights: [
      '“Some people leave a mark in just one day.”',
      'A handwritten note about how natural talking felt',
      'Gift reveal: “Glad We Talked, Mansi”',
      'Song: Dekhha Tenu',
    ],
    mood: 'First spark',
    accent: '#c084fc',
  },
  {
    id: 2,
    slug: 'week-2',
    weekLabel: 'Week 2',
    title: 'I Love You',
    subtitle: 'The moment the heart stopped hiding',
    dateLabel: 'July 11, 2026',
    dateISO: '2026-07-11',
    story:
      'July 11, 2026 — the day I told her I love her. Photos, reasons, a love letter, and a proposal she will never forget.',
    highlights: [
      'July 11, 2026 — our forever date',
      'I Love You',
      'Will you be mine, Mansi?',
      'Photos of her — eyes, smile, hair, glow',
    ],
    mood: 'Forever begins',
    accent: '#f2b8c6',
  },
  {
    id: 3,
    slug: 'week-3',
    weekLabel: 'Week 3',
    title: 'Still Choosing You',
    subtitle: 'Seven days later — deeper, quieter, surer',
    dateLabel: 'July 18, 2026',
    dateISO: '2026-07-18',
    story:
      'One week after I love you — opens dark: midnight confession, locked desire, mirror dare — then soft days, love map, sukoon, sealed letter.',
    highlights: [
      'Dark romance trio (confession · hold · mirror)',
      'Seven Soft Days + Love Map',
      'Film-strip + sukoon shayari',
      'Sealed letter finale',
    ],
    mood: 'Dark then soft',
    accent: '#c45c74',
  },
  {
    id: 4,
    slug: 'week-4',
    weekLabel: 'Week 4',
    title: 'In Full Bloom',
    subtitle: 'Two weeks later — a whole garden for her',
    dateLabel: 'July 25, 2026',
    dateISO: '2026-07-25',
    story:
      'Week 4 opens as a living garden — petal storms, tap-to-bloom flowers, a bouquet of truths, and a finale that blossoms just for Mansi.',
    highlights: [
      'Petal storm + living bloom garden',
      'Tap anywhere to plant flowers',
      'Build her a digital bouquet',
      'Bloom finale — open the flower',
    ],
    mood: 'Full flourish',
    accent: '#f2b8c6',
  },
]

const WEEK_CONTENT: Record<number, WeekContent> = {
  1: week1Content,
  2: week2Content,
  3: week3Content,
  4: week4Content,
}

export function getLatestWeekId(): number {
  return Math.max(...WEEK_META.map((w) => w.id))
}

export function getWeekMeta(id: number): WeekMeta | undefined {
  return WEEK_META.find((w) => w.id === id)
}

export function getWeekMetaBySlug(slug: string): WeekMeta | undefined {
  return WEEK_META.find((w) => w.slug === slug)
}

export function getWeekContent(id: number): WeekContent {
  const content = WEEK_CONTENT[id]
  if (!content) {
    throw new Error(`No content registered for week ${id}. Add it in weeks/registry.ts`)
  }
  return content
}

export function getAllWeeksNewestFirst(): WeekMeta[] {
  return [...WEEK_META].sort((a, b) => b.id - a.id)
}

export function getAllWeeksOldestFirst(): WeekMeta[] {
  return [...WEEK_META].sort((a, b) => a.id - b.id)
}
