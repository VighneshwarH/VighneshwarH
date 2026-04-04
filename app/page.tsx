 'use client';

import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';


export default function Home() {
  return (
    <main className="relative" style={{fontFamily:"Outfit"}}>
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}