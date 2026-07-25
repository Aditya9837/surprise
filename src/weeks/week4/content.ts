import type { WeekContent } from '../types'

/** Week 4 — July 25, 2026 · full flourish / flower garden */
export const week4Content: WeekContent = {
  herName: 'Mansi',
  siteTitle: 'Blooming for Mansi',
  landingLines: [
    'Two weeks of loving you…',
    'and everything is opening.',
  ],
  photos: [
    {
      id: 1,
      src: '/photos/mansi-1.jpg',
      caption: 'Petals envy that glow',
      tilt: -4,
    },
    {
      id: 2,
      src: '/photos/mansi-3.jpg',
      caption: 'Spring learned beauty from your eyes',
      tilt: 5,
    },
    {
      id: 3,
      src: '/photos/mansi-5.jpg',
      caption: 'Soft bloom. Loud heartbeat.',
      tilt: -3,
    },
    {
      id: 4,
      src: '/photos/mansi-4.jpg',
      caption: 'A whole garden in one smile',
      tilt: 4,
    },
    {
      id: 5,
      src: '/photos/mansi-6.jpg',
      caption: 'Florals tried. You won.',
      tilt: -5,
    },
    {
      id: 6,
      src: '/photos/mansi-2.jpg',
      caption: 'My favourite season is you',
      tilt: 3,
    },
  ],
  polaroids: [],
  reasons: [
    'You bloom even on quiet days',
    'Your smile opens every locked room in me',
    'Loving you feels like spring arriving early',
    'You make ordinary hours feel golden',
    'Your softness is my favourite strength',
    'I keep choosing the garden with you in it',
  ],
  handwrittenMessage: `My Mansi,

If this week were a garden,
every flower would know your name.

You walked into my days
like light through leaves —
soft, sudden, impossible to forget.

I am not rushing the seasons.
I am watering this —
patiently, fully, only for you.

Bloom with me.
Stay with me.
Be the garden I come home to.

— Yours, Aditya`,
  finalMessage: {
    title: 'In Full Bloom',
    subtitle: 'July 25, 2026 — two weeks of forever, still opening.',
    lines: [
      'You are the garden I never knew I needed.',
      'Every petal of this week was for you.',
      'Keep blooming, Mansi. I’m right here.',
    ],
  },
  musicPlaylist: [
    {
      title: 'Aashiqui Aa Gayi',
      artist: 'Radhe Shyam',
      src: '/music/aashiqui-aa-gayi.mp3',
    },
    {
      title: 'Dekhha Tenu',
      artist: 'Mr. & Mrs. Mahi',
      src: '/music/dekha-tenu.mp3',
    },
  ],
  sections: {
    petals: {
      chapter: 'The garden',
      title: 'Tap the earth. Watch us grow.',
      subtitle: 'Every bloom you plant\nis another reason I stay.',
    },
    hearts: {
      chapter: 'Bouquet',
      title: 'Pick your blooms',
      subtitle: 'Six flowers. Six truths. Gather them for her.',
    },
    polaroids: {
      chapter: 'Petal frames',
      title: 'Beauty in full colour',
      subtitle: 'Slide through Mansi — soft as spring light.',
    },
    stars: {
      chapter: 'Night garden',
      title: 'Stars between flowers',
      subtitle: 'Even after dark, something keeps glowing.',
    },
    music: {
      chapter: 'Garden soundtrack',
      title: 'Songs that smell like spring',
      subtitle: 'Play soft. Let the petals fall in time.',
      hint: '↓ Player in the corner ↓',
    },
    message: {
      chapter: 'Pressed letter',
      title: 'Between the pages',
    },
    gift: {
      chapter: 'Final bloom',
      title: 'One flower left for you',
    },
  },
  cta: {
    enter: 'Enter the garden',
    landing: 'Walk into the blooms',
    gift: 'Open the bloom',
  },
  galleryMode: 'filmstrip',
  heartsMode: 'reasons',
  finaleMode: 'bloom',
  journeyLayout: 'flourish',
  secretGate: {
    passwords: ['adansi'],
    hint: 'Hint: our cute ship name…',
    placeholder: 'Adansi…',
  },
}

week4Content.polaroids = week4Content.photos.map((p, i) => ({
  id: p.id,
  caption: p.caption,
  gradient: [
    'from-rose-300/40 via-pink-400/25 to-amber-900/30',
    'from-pink-200/40 via-rose-400/30 to-stone-900/40',
    'from-amber-200/30 via-rose-300/30 to-rose-900/35',
  ][i % 3],
  emoji: ['🌸', '🌺', '🌷', '🌹', '💮', '🌼'][i % 6],
  src: p.src,
}))
