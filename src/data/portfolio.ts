import { withBasePath } from '../lib/paths'

export type Project = {
  title: string
  eyebrow: string
  gradient: string
  imageSrc: string | null
  imageAlt: string
  problem: string
  result: string
  technologies: string[]
}

export type Job = {
  period: string
  role: string
  company: string
  description: string
}

export type Education = {
  period: string
  degree: string
  institution: string
  percent_or_cgpa: string
}

export const portfolio = {
  name: 'Vighneshwar Hebbar',
  shortName: 'VH',
  email: 'vighneshwarh5487@gmail.com',
  links: {
    github: 'https://github.com/VighneshwarH',
    linkedin: 'https://www.linkedin.com/in/vighneshwara-vishwanatha-hebbar-vh5487',
    instagram: 'https://www.instagram.com/h__vighneshofficial/',
    phone: 'tel: +919110445487'
  },
  hero: {
    title: ['Vighneshwar', 'Hebbar'],
    introduction: 'A designer and developer who can design beautiful UI/UX and develop responsive websites and applications.',

    imageSrc: [withBasePath('./images/portrait.png'),withBasePath('./images/portrait2.png')],
    imageAlt: 'Portrait placeholder for Vighneshwar Hebbar',
    signature: withBasePath('/images/Signature.png'),
    signatureAlt: 'SIgnature placeholder for Vighneshwar Hebbar'
  },
} as const

export const navigation = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
] as const

export const roles = ['Full-stack developer', 'UI/UX designer']

export const skills = [
  { category: 'Languages', items: [`TypeScript`, 'JavaScript', 'Python', 'SQL','Java'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'GSAP & Motion','JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Springboot', 'PostgreSQL', 'MySQL','MongoDB'] },
  { category: 'Tools', items: ['VSCode', 'IntelliJ IDEA', 'Git & GitHub', 'Docker','Fireflnk','Selenium'] },
  { category: 'Design', items: ['Figma', 'Adobe Illustrator','Canva']},
]

// Replace these three entries with your real education details.
export const education: Education[] = [
  {
    period: '2019',
    degree: 'SSLC',
    institution: 'V.K.R Acharya Memorial English Medium High School, Kundapura',
    percent_or_cgpa: '90%',
  },
  {
    period: '2020-2022',
    degree: 'PUC',
    institution: 'R.N.S Composite PU College, Kundapura',
    percent_or_cgpa: '80%',
  },
  {
    period: '2022 - 2026',
    degree: 'B.E CSE(DS)',
    institution: 'Moodlakatte Institute of Technology, Kundapura',
    percent_or_cgpa: '8.6 CGPA',
  },
]

export const projects: Project[] = [
  {
    title: 'StaffCube',
    eyebrow: '01 / Enterprise Level Software Development',
    gradient: 'linear-gradient(135deg, #c93410 0%, #f0b44c 100%)',
    // Add a local path here (for example: '/images/kirana-ledger.jpg') to replace the generated artwork.
    imageSrc: null,
    imageAlt: 'Abstract placeholder for StaffCube',
    problem: 'Many of the traditional HRMS applications lack payouts, reminders, and they are majory just like a CRUD application with just few additional features.',
    result: 'Implementing AI chatbot tied up to every users with respective to their roles and generate AI Reports of the entire company progress. \n Implementing Payout feature to pay the employees according to company policies, and CTC structures',
    technologies: ['React', 'Java', 'Springboot', 'MySQL', 'AI Tools'],
  },
  {
    title: 'CareerWay',
    eyebrow: '02 / SOftware for Careers and Opportunities',
    gradient: 'linear-gradient(135deg, #183a42 0%, #86bea6 100%)',
    imageSrc: null,
    imageAlt: 'Abstract placeholder for CareerWay',
    problem: 'Ops teams refreshed five tools to spot incidents and found them minutes late.',
    result: 'A real-time dashboard handling 50k events a minute with p95 renders under 120 ms.',
    technologies: ['React', 'Java', 'Springboot', 'PostgreSQL','AI Tools',],
  },
  {
    title: 'EMOSENSE',
    eyebrow: '03 / Machine Learning',
    gradient: 'linear-gradient(135deg, #3e2b60 0%, #efafc2 100%)',
    imageSrc: null,
    imageAlt: 'Abstract placeholder for EMOSENSE',
    problem: 'Majority of the VER systems only implemented with English, and lacking of VER systems for regional languages like Kannada, Hindi, Telugu etc. It also lacks of suggesting suitable activities for that emotion captured.',
    result: 'Recognizing emotions from Kannada audio inputs and suggesting suitable personlaized activities',
    technologies: ['React', 'Tailwind', 'Python', 'Machine Learning'],
  },
]

export const jobs: Job[] = [
  {
    period: 'Feb 2026 — May 2026',
    role: 'Software Test Engineer',
    company: 'QSpiders - A unit of TestYantra Software Solutions',
    description: `Accelerated QA delivery by 20% through 100+ manual and automated test cases, driving faster release cycles with functional, regression, smoke, integration, and end‑to‑end testing for ShoppersStack.
    Boosted automation efficiency and product reliability by engineering 50+ resilient workflows, optimizing 50+ UI locators, and ensuring end‑to‑end defect traceability in Fireflink from requirements to resolution
    `,
  },
]
