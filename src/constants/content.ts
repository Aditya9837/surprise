/**
 * Back-compat shims — prefer useWeekContent() inside week experiences.
 * Points at the latest week so stray imports don't break.
 */
import { getLatestWeekId, getWeekContent } from '../weeks/registry'

const latest = getWeekContent(getLatestWeekId())

export const HER_NAME = latest.herName
export const SITE_TITLE = latest.siteTitle
export const LANDING_LINES = latest.landingLines
export const PHOTOS = latest.photos
export const POLAROIDS = latest.polaroids
export const REASONS = latest.reasons
export const HANDWRITTEN_MESSAGE = latest.handwrittenMessage
export const PROPOSAL = latest.proposal!
export const FINAL_MESSAGE = latest.finalMessage
export const MUSIC_PLAYLIST = latest.musicPlaylist
export const MUSIC_TRACK = latest.musicPlaylist[0]
export const SECTIONS = latest.sections
export const CTA = latest.cta
