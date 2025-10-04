
'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="px-10 py-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="text-3xl italic font-light text-purple-600 md:text-4xl" style={{ fontFamily: "Pacifico" }}>
              Portfolio
            </div>

            <div className="items-center hidden space-x-8 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeSection === item.id
                      ? 'text-purple-600'
                      : scrolled ? 'text-gray-900 hover:text-purple-600' : 'text-white hover:text-purple-200'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-100 transition-transform duration-300"></span>
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={toggleMobileMenu}
              className="absolute text-2xl text-purple-600 cursor-pointer md:hidden right-7"
            >
              <div className="flex items-center justify-center w-6 h-6">
                <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-xl transition-all duration-300`}></i>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Popup */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${
          mobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
        }`}>
          <div className="p-6">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between p-4 text-left text-xl font-semibold rounded-xl transition-all duration-300 cursor-pointer group ${
                    activeSection === item.id
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-gray-800 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span>{item.label}</span>
                  <div className="flex items-center justify-center w-5 h-5">
                    <i className="text-lg transition-transform duration-300 ri-arrow-right-s-line group-hover:translate-x-1"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
