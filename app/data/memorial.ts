export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'His Story', to: '/story' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Memories', to: '/memories' },
  { label: 'Quotes', to: '/quotes' },
  { label: 'Family', to: '/family-tree' },
  { label: 'Letters', to: '/letters' },
  { label: 'Videos', to: '/videos' },
  { label: 'Anniversary', to: '/anniversary' },
  { label: 'Legacy', to: '/legacy' },
] as const

export const storyTimeline = [
  {
    year: '1958',
    icon: '❋',
    title: 'A New Beginning',
    text: 'Born on a quiet spring morning in a small village, the youngest of four children. His mother often said his laughter filled the house from the very first day.',
  },
  {
    year: '1950s',
    icon: '✎',
    title: 'Childhood Adventures',
    text: "Long summers by the river, catching fireflies with his brothers, and learning to build with his father's hands. School reports always said: 'A gentle, curious boy.'",
  },
  {
    year: '1962',
    icon: '☘',
    title: 'Coming of Age',
    text: 'Graduated with honors and left home for the city. Started work as an apprentice — the beginning of a lifelong craft.',
  },
  {
    year: '1968',
    icon: '♡',
    title: 'Meeting Mologadi',
    text: "He found his life partner in Mologadi. Together they built a home of faith, love, and devotion — a marriage blessed by God.",
  },
  {
    year: '1972',
    icon: '✦',
    title: 'Becoming a Father',
    text: 'The proudest days of his life began as his sons arrived. He raised Thabo, Levy, Jacky, and Tumi with strength, prayer, and boundless love.',
  },
  {
    year: 'Ministry',
    icon: '⚜',
    title: 'Called to Pastor',
    text: 'He answered the call to shepherd God\'s people. With Bible in hand and conviction in his voice, he delivered the word of God faithfully — never holding back the truth spoken in love.',
  },
  {
    year: 'Family',
    icon: '☀',
    title: 'Husband, Father, Shepherd',
    text: "At home he was a devoted husband to Mologadi and a loving father to his four sons. In the church he was a pastor whose messages stirred hearts and strengthened faith.",
  },
  {
    year: '2024',
    icon: '✧',
    title: 'Peaceful Farewell',
    text: 'Surrounded by the family he loved so dearly, he closed his eyes with a small, familiar smile on 9 July 2024. He was laid to rest on 14 July 2024. He left the world softer than he found it.',
  },
]

export const galleryFilters = ['All', 'Family', 'Tributes', 'Service'] as const

export const galleryPhotos = [
  {
    id: 1,
    title: 'Speaking from the heart',
    category: 'Tributes',
    src: '/images/dad1.jpeg',
  },
  {
    id: 2,
    title: 'Standing side by side',
    category: 'Family',
    src: '/images/dad2.jpeg',
  },
  {
    id: 3,
    title: 'Portrait of our beloved',
    category: 'Family',
    src: '/images/portrait.png',
  },
  {
    id: 4,
    title: 'Family gathered in prayer',
    category: 'Family',
    src: '/images/relative1.jpeg',
  },
  {
    id: 5,
    title: 'Together under the tent',
    category: 'Family',
    src: '/images/relative2.jpeg',
  },
  {
    id: 6,
    title: 'Words of remembrance',
    category: 'Tributes',
    src: '/images/relative3.jpeg',
  },
  {
    id: 7,
    title: 'A loving tribute',
    category: 'Tributes',
    src: '/images/relatives3.jpeg',
  },
  {
    id: 8,
    title: 'Songs of farewell',
    category: 'Tributes',
    src: '/images/ceb1.jpeg',
  },
  {
    id: 9,
    title: 'Lifting his memory in song',
    category: 'Tributes',
    src: '/images/ceb2.jpeg',
  },
  {
    id: 10,
    title: 'Colleagues and friends',
    category: 'Family',
    src: '/images/colleques1.jpeg',
  },
  {
    id: 11,
    title: 'At rest',
    category: 'Service',
    src: '/images/casket1.jpeg',
  },
  {
    id: 12,
    title: 'Final goodbye',
    category: 'Service',
    src: '/images/casket2.jpeg',
  },
]

export const memories = [
  {
    quote:
      'As a husband and a pastor, he never grew tired of delivering the word of God. His sermons were spoken with love, and his faith guided our home every day.',
    name: 'Mologadi',
    relation: 'Wife',
    date: '14 July 2024',
  },
  {
    quote:
      'Papa lived what he preached. Whether at the pulpit or at the dinner table, the word of God was always on his lips and in his heart.',
    name: 'Thabo',
    relation: 'Son',
    date: '14 July 2024',
  },
  {
    quote:
      'He taught us to stand tall in faith, to pray with sincerity, and to serve others the way a true shepherd serves his flock.',
    name: 'Levy',
    relation: 'Son',
    date: '15 July 2024',
  },
  {
    quote:
      "I still hear his voice lifting Scripture with power and tenderness. He'd smile and say, 'Keep believing, my boy — God is faithful.'",
    name: 'Jacky',
    relation: 'Son',
    date: '16 July 2024',
  },
  {
    quote:
      'Our father was a pastor in every sense. He never failed to deliver the word of God with courage, humility, and love for his people.',
    name: 'Tumi',
    relation: 'Son',
    date: '16 July 2024',
  },
]

export const quotes = [
  { text: 'Never grow weary of delivering the word of God — it is life to those who hear it.', theme: 'On ministry' },
  { text: 'A quiet faith speaks louder than any shout.', theme: 'On presence' },
  { text: 'Measure your days in prayer and kindness, not in hours.', theme: 'On living' },
  { text: 'Never go to bed angry, and never leave without saying I love you.', theme: 'On family' },
  { text: 'Work with your hands, love with your heart, and walk with the Lord.', theme: 'On faith' },
  { text: 'The seeds of Scripture you plant today shade generations tomorrow.', theme: 'On legacy' },
  { text: 'Be the reason someone believes in the goodness of God.', theme: 'On character' },
  { text: 'You cannot pour from an empty cup — so keep yours full of prayer and gratitude.', theme: 'On gratitude' },
]

export const familyTree = {
  grandparents: [
    { name: 'Grandfather Elias', role: 'Father' },
    { name: 'Grandmother Marta', role: 'Mother' },
  ],
  center: { name: 'Our Father', years: '1958 — 2024', married: 'married to Mologadi' },
  wife: { name: 'Mologadi', role: 'Beloved Wife' },
  children: [
    { name: 'Thabo', role: 'Son' },
    { name: 'Levy', role: 'Son' },
    { name: 'Jacky', role: 'Son' },
    { name: 'Tumi', role: 'Son' },
  ],
  grandchildren: [] as { name: string; role: string }[],
}

export const videos = [
  { title: '50th Anniversary Toast', date: 'June 2019', tone: '#8a7a6e' },
  { title: 'Sunday in the Garden', date: 'May 2020', tone: '#6f8f72' },
  { title: "Papa's Fishing Lessons", date: 'August 2018', tone: '#6e8b8a' },
  { title: 'Christmas Morning', date: 'December 2021', tone: '#8b6e6e' },
  { title: 'His Favorite Song', date: 'March 2022', tone: '#8a7e92' },
  { title: 'A Message to the Grandkids', date: 'October 2022', tone: '#7d8f9a' },
]

export const legacyValues = [
  {
    icon: '❦',
    title: 'Kindness First',
    text: 'He believed every stranger was simply a friend he hadn\'t met yet.',
  },
  {
    icon: '⚘',
    title: 'Patience',
    text: "He'd say, 'Good things take the time they take.' He was rarely, if ever, rushed.",
  },
  {
    icon: '☘',
    title: 'Hard Work',
    text: 'Every task, no matter how small, deserved his full attention and care.',
  },
  {
    icon: '✦',
    title: 'Faithful Ministry',
    text: 'As a pastor, he never stopped delivering the word of God — with courage, humility, and love.',
  },
  {
    icon: '♡',
    title: 'Gratitude',
    text: 'He never forgot to thank God — for people, for the day, and for every blessing.',
  },
  {
    icon: '❋',
    title: 'Curiosity',
    text: 'He studied Scripture daily and kept learning, right up until the end.',
  },
]

/** Passed away 9 July 2024; laid to rest 14 July 2024 */
export const farewellDate = new Date('2024-07-09T12:00:00')
export const burialDate = new Date('2024-07-14T12:00:00')
