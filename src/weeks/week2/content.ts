import type { WeekContent } from '../types'

/** Week 2 — the proposal / I love you */
export const week2Content: WeekContent = {
  herName: 'Mansi',
  siteTitle: 'For Mansi',
  landingLines: [
    'Tonight is just for you.',
    'Every heartbeat led me here.',
  ],
  photos: [
    {
      id: 1,
      src: '/photos/mansi-4.jpg',
      caption: 'That smile… soft lips, warmer heart',
      tilt: -5,
    },
    {
      id: 2,
      src: '/photos/mansi-3.jpg',
      caption: 'Your eyes say more than words ever could',
      tilt: 4,
    },
    {
      id: 3,
      src: '/photos/mansi-5.jpg',
      caption: 'Silky hair, soft smile — pure magic',
      tilt: -3,
    },
    {
      id: 4,
      src: '/photos/mansi-1.jpg',
      caption: 'The way your hair falls… I forget how to breathe',
      tilt: 5,
    },
    {
      id: 5,
      src: '/photos/mansi-6.jpg',
      caption: 'Elegant. Glowing. Impossible to look away from',
      tilt: -4,
    },
    {
      id: 6,
      src: '/photos/mansi-2.jpg',
      caption: 'Even art falls short of your beauty',
      tilt: 3,
    },
  ],
  polaroids: [],
  reasons: [
    'Your eyes hold a whole quiet universe',
    'That soft smile lives rent-free in my mind',
    'Your hair frames a face I never want to forget',
    'Your lips curve into the sweetest kind of peace',
    'You look like a dream dressed as a girl',
    'Every photo of you feels unfairly beautiful',
    'Your presence softens the whole room',
    'I fall for you a little more every glance',
  ],
  handwrittenMessage: `My dearest Mansi,

If love had a face,
it would look exactly like yours.

I have carried these words
in my chest for so long —
quiet, warm, a little scared,
and completely sure.

You are the softest thought
I wake up with,
and the last wish
I whisper before I sleep.

Tonight I am not hiding it anymore.`,
  proposal: {
    whisper: 'There is one truth I need you to hear…',
    reveal: 'I Love You',
    after:
      'Not as a line from a movie.\nNot as a joke.\nAs the most honest thing I have ever felt.',
    question: 'Will you be mine, Mansi?',
    forever: 'Forever starts with you.',
  },
  finalMessage: {
    title: 'I Love You, Mansi',
    subtitle: 'With every quiet breath, every loud heartbeat — you.',
    lines: [
      'You are my favourite almost-dream that became real.',
      'If you will have me… my heart is already yours.',
      'Say yes, and I will spend forever proving it.',
    ],
  },
  musicPlaylist: [
    {
      title: 'Aashiqui Aa Gayi',
      artist: 'Radhe Shyam',
      src: '/music/aashiqui-aa-gayi.mp3',
    },
  ],
  sections: {
    petals: {
      chapter: 'Chapter I',
      title: 'You walked into my life like a soft song',
      subtitle:
        'And suddenly ordinary moments\nstarted feeling like magic.',
    },
    hearts: {
      chapter: 'Chapter II',
      title: 'Reasons my heart chose you',
      subtitle: 'Tap each one — they were written only for you.',
    },
    polaroids: {
      chapter: 'Chapter III',
      title: 'Every little piece of you',
      subtitle: 'Eyes. Smile. Hair. That quiet glow — all of it.',
    },
    stars: {
      chapter: 'Chapter IV',
      title: 'If the stars could speak',
      subtitle:
        'Tap a falling star —\nthey already know how to say your name.',
    },
    music: {
      chapter: 'Chapter V',
      title: 'Our soundtrack',
      subtitle:
        'Aashiqui Aa Gayi — playing just for you.\nLet it hold you while courage finds its words.',
      hint: '↓ Music lives in the corner ↓',
    },
    message: {
      chapter: 'Chapter VI',
      title: 'A letter from my heart',
    },
    gift: {
      chapter: 'The Moment',
      title: 'Open this… slowly',
    },
  },
  cta: {
    enter: 'Unlock with love',
    landing: 'Walk with me',
    gift: 'Tap to open',
    yes: 'I feel it too 💕',
    maybe: 'Maybe…',
  },
  galleryMode: 'photos',
  heartsMode: 'reasons',
  finaleMode: 'proposal',
  secretGate: {
    // Aditya + Mansi → Adansi
    passwords: ['adansi'],
    hint: 'Hint: mix our names into one cute word…',
    placeholder: 'Our ship name…',
  },
}

// fill polaroids from photos for any 3d fallback
week2Content.polaroids = week2Content.photos.map((p, i) => ({
  id: p.id,
  caption: p.caption,
  gradient: [
    'from-rose-400/40 via-amber-500/20 to-rose-900/40',
    'from-amber-300/30 via-rose-400/30 to-stone-900/40',
    'from-pink-300/40 via-rose-500/25 to-amber-900/30',
  ][i % 3],
  emoji: ['🌸', '✨', '💫', '🦋', '💕', '🌙'][i % 6],
  src: p.src,
}))
