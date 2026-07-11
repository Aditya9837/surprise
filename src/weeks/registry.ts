/**
 * HOW TO ADD A NEW WEEK (every week forever)
 * ----------------------------------------
 * 1. Create:  src/weeks/week3/content.ts  (copy week2, change the words)
 * 2. Import it in this file
 * 3. Add WeekMeta to WEEK_META (story + highlights for the archive page)
 * 4. Add content to WEEK_CONTENT map:  3: week3Content
 *
 * Home (/) always opens the highest week id automatically.
 * Archive lives at /memories
 * Direct link: /week/1 , /week/2 , /week/3 …
 */

import type { WeekContent, WeekMeta } from './types'
import { week1Content } from './week1/content'
import { week2Content } from './week2/content'

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
]

const WEEK_CONTENT: Record<number, WeekContent> = {
  1: week1Content,
  2: week2Content,
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
