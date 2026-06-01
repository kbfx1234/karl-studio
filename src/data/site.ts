/**
 * Single source of truth for all site copy.
 * Edit here to change displayed text — components read from this file.
 */

export const site = {
  brand: {
    nameCN: '佳飞',
    nameEN: 'KARL',
    studio: 'KARL · STUDIO',
    tagline: 'A studio of one.',
  },
  nav: [
    { label: 'STUDIO', href: '#top' },
    { label: 'CONTACT', href: '#contact' },
  ],
  cta: { label: 'ENTER STUDIO', href: '#story' },
  social: {
    github: 'https://github.com/kbfx1234',
    email: 'mailto:kbfx1234@gmail.com',
  },
} as const

export const hero = {
  eyebrow: [
    'Autonomous driving engineer.',
    'Embodied AI explorer.',
    'Father of one.',
  ],
  lines: [
    'By day, I teach cars to see.',
    'By night, I read to a kid still learning to walk.',
    'Same hands. Different worlds.',
  ],
  cta: { label: 'READ THE STORY', href: '#story' },
  scrollHint: 'SCROLL TO ENTER',
  rightHint: '05 CHAPTERS',
  active: {
    status: 'ACTIVE — STUDIO 01',
    rows: [
      '2026 — SHANGHAI',
      'SHANGHAITECH UNIVERSITY',
      'AUTONOMOUS DRIVING',
      'EMBODIED AI',
    ],
  },
} as const

export const idCard = {
  name: 'KARL',
  subtitle: 'ENGINEER & FATHER',
  role: 'AUTONOMY → EMBODIMENT',
  id: 'KS-2024-1112',
  status: 'ACTIVE / Studio of one',
  meta: [
    'Building machines that move.',
    'Building agents that think.',
    'Raising a kid that questions both.',
  ],
} as const

export const manifesto = {
  lines: [
    'An engineer who builds machines that move.',
    'A father who learns from someone still learning to walk.',
    'Both, all the time.',
  ],
  columns: [
    {
      title: 'Autonomy.',
      body:
        'Building software that helps cars see, locate, and decide. The kind of engineering where being wrong has a cost in meters and seconds.',
    },
    {
      title: 'Embodiment.',
      body:
        'Looking next at robots that share our floor — agents that listen, reach, and learn alongside us. Not science fiction. Just slow progress, in shared space.',
    },
  ],
} as const

export const chapters = [
  {
    index: '01',
    total: '05',
    object: 'OBJECT · RIVER',
    period: '1990s—2014',
    title: 'RUGAO',
    titleCN: '如皋',
    subtitle: 'JIANGSU · COUNTY OF LONGEVITY',
    tagline: 'Where I learned that patience grows things.',
    body:
      'A small county in Jiangsu where the canals are older than anyone you’d meet. Slow cooking, slow rivers, old people who remember every winter. The first lesson: you don’t rush the things that matter.',
  },
  {
    index: '02',
    total: '05',
    object: 'OBJECT · LAB',
    period: '2014—2018',
    title: 'SHANGHAI',
    titleCN: '上海',
    subtitle: 'SHANGHAITECH UNIVERSITY',
    tagline: 'Where I learned to ask precise questions.',
    body:
      'Four years at ShanghaiTech. Math, code, and a lab that let undergraduates touch real research. Learned that a sharp question is more useful than a clever answer, and that engineers should be skeptical of their own demos first.',
  },
  {
    index: '03',
    total: '05',
    object: 'OBJECT · ROAD',
    period: '2018—2024',
    title: 'AUTONOMY',
    titleCN: '自动驾驶',
    subtitle: 'PERCEPTION · PLANNING · CONTROL',
    tagline: 'Teaching cars where they are.',
    body:
      'Autonomy stack work — perception, prediction, planning. The unforgiving kind of software where a meter of error is a real meter, and the model is graded by people who will sit in the back seat. Learned to trust evaluation pipelines more than intuition.',
  },
  {
    index: '04',
    total: '05',
    object: 'OBJECT · LOOP',
    period: '2024—2026',
    title: 'AGENTS',
    titleCN: 'AI 智能体',
    subtitle: 'TOOLS · MEMORY · PLANS',
    tagline: 'Teaching software what to want.',
    body:
      'Agents that read context, call tools, and recover from their own mistakes. Less determinism, more taste. The strange new craft of writing code that argues with you, ships anyway, and sometimes is right when you’re not.',
  },
  {
    index: '05',
    total: '05',
    object: 'OBJECT · HOME',
    period: '2026 — NOW',
    title: 'EMBODIMENT',
    titleCN: '具身智能',
    subtitle: 'ROBOTS THAT SHARE THE FLOOR',
    tagline: 'Teaching robots how to live with us.',
    body:
      'The next chapter: machines that walk into rooms with people in them. Not faster, smarter, cheaper — kinder. Watching a small human learn to balance has changed what I want machines to be capable of.',
  },
] as const

export const featured = {
  /** Set to true once a real project is ready to ship. */
  enabled: false,
  eyebrow: 'FEATURED WORK',
  count: '01 / 01',
  year: '2026',
  tags: ['AUTONOMY', 'CONCEPT', 'ONGOING'],
  title: 'AUTO / KIN',
  subtitle: 'A car that learns the way home.',
  body:
    'A speculative project: an autonomous vehicle that treats “home” as a learned destination, not a coordinate. What if the car remembers who is waiting, and adapts its driving to who’s in the back seat?',
} as const

export const footerCta = {
  question: 'Ready to look again?',
  cta: { label: 'SCROLL BACK', href: '#top' },
  signature: 'KARL · STUDIO  /  2026  /  Made with patience and a sleeping toddler nearby.',
} as const
