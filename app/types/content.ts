export type Person = {
  name: string
  role: string
}

export type TimelineItem = {
  year: string
  icon: string
  title: string
  text: string
}

export type Memory = {
  quote: string
  name: string
  relation: string
  date: string
}

export type Quote = {
  text: string
  theme: string
}

export type GalleryPhoto = {
  id: number
  title: string
  category: string
  src: string
}

export type VideoItem = {
  title: string
  date: string
  tone: string
}

export type LegacyValue = {
  icon: string
  title: string
  text: string
}

export type SiteContent = {
  person: {
    fullName: string
    displayName: string
    yearsLabel: string
    caption: string
    tagline: string
    homeQuote: string
    portraitSrc: string
    birthDate: string
    deathDate: string
    burialDate: string
  }
  story: {
    eyebrow: string
    title: string
    lede: string
    timeline: TimelineItem[]
  }
  family: {
    grandparents: Person[]
    center: { name: string; years: string; married: string }
    wife: Person
    children: Person[]
    grandchildren: Person[]
    epigraph: string
  }
  memories: Memory[]
  quotes: Quote[]
  gallery: GalleryPhoto[]
  videos: VideoItem[]
  legacy: {
    values: LegacyValue[]
    resting: {
      eyebrow: string
      heading: string
      epitaph: string
      note: string
      verse: string
      imageSrc: string
      imageAlt: string
    }
    giftQuote: string
    giftNote: string
  }
  anniversary: {
    farewell: string
    signOff: string
  }
}
