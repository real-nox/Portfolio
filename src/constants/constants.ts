type projets = {
  id: string,
  title: string,
  tags: string[],
  desc: string,
  year: string,
  color: string,
  color2: string,
  link: string
}[]

export const PROJECTS: projets = [
  {
    id: "09",
    title: "Parlons",
    tags: ["Expo", "React Native", "TypeScript", "Neon"],
    desc: "Personal project using: React Native Expo.\nMobile App for French Language development helpful for TCF.\n\nProject under development",
    year: "2026",
    color: '#6366F1',
    color2: '#4d50fa',
    link: "https://github.com/real-nox/Parlons"
  },
  {
    id: '08',
    title: 'Storely',
    tags: ['React.js', 'Neon', 'TypeScript'],
    desc: "I coded Storely, my personal project, using: React.js (TypeScript), Express, Neon.\nI deepened my skills in strict typing with TypeScript and handling asynchronous data fetching from REST APIs.",
    year: '2026',
    color: '#57e5ff',
    color2: '#29a0b5',
    link: 'https://github.com/real-nox/Storely',
  },
  {
    id: '06',
    title: 'Chatty',
    tags: ['Node.js', 'PostgreSQL', 'React'],
    desc: "I coded ChatAPP my personal project using : React.js (JavaScript ES6+), Express, PostgreSQL and socket.io\nI learned how to develop chat web app using websockets.\nI deepened my skills in REST API and it's middlewares",
    year: '2026',
    color: '#ee8779',
    color2: '#b45245',
    link: 'https://github.com/real-nox/ChatAPP',
  },
  {
    id: '01',
    title: 'StudentWeb',
    tags: ['Node.js', 'PostgreSQL', 'React'],
    desc: "I coded StudentWeb my personal project using : Node.js (JavaScript ES6+), Express, Neon(PostgreSQL), EJS\nI started learning backend at this project.\nIt was my first full stack web project.",
    year: '2026',
    color: '#79eeac',
    color2: '#45b46c',
    link: 'https://github.com/real-nox/Student-Web',
  },
]

export const EXPERIENCES = [
  {
    id: '07',
    title: 'Stagiaire Développeur Mobile et Automatisation',
    tags: ['React Native', 'Odoo', 'TypeScript', 'n8n', 'authentik'],
    desc: "Developed and deployed a React Native field management app for DATAXPRESS, integrated with Authentik SSO security and automated Odoo ERP synchronization via n8n.",
    year: '2026 - 08 / 2026',
    color: '#577eff',
    color2: 'rgb(79, 74, 221)'
  },
]

type skills = {label: string, level: number}

export const SKILLS : skills[] = [
  { label: "JavaScript", level: 92 },
  { label: 'TypeScript', level: 70 },
  { label: 'Python', level: 65 },
  { label: 'React', level: 80 },
  { label: "C/C++", level: 35},
]

export const TICKER_ITEMS = [
  'OPEN TO INTERNSHIPS',
  'BUILDING MOBILE APPS',
  'CURRENTLY: WORKING ON PERSONAL PROJECTS',
  'AVAILABLE 2026',
  'BUILDING WEB APPS',
  'OPEN TO INTERNSHIPS',
  'BUILDING MOBILE APPS',
  'CURRENTLY: WORKING ON PERSONAL PROJECTS',
  'AVAILABLE 2026',
  'BUILDING WEB APPS',
]