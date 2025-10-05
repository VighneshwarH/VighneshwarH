 'use client';

import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import CursorFollower from '@/components/CursorFollower';


export default function Home() {
  return (
    <main className="relative" style={{fontFamily:"Outfit"}}>
      <CursorFollower/>
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}