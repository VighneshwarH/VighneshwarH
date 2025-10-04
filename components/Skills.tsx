
'use client';

import { useEffect, useState, useRef } from 'react';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('frontend');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      skills: [
        { name: 'HTML', level: 80, icon: 'ri-html5-line' },
        { name: 'CSS', level: 80, icon: 'ri-css3-line' },
        { name: 'JavaScript', level: 70, icon: 'ri-javascript-line' },
        { name: 'React JS', level: 50, icon: 'ri-reactjs-line' },
        { name: 'TailwindCSS', level: 50, icon: 'ri-tailwind-css-line' }
      ]
    },
    design: {
      title: 'Design Tools',
      skills: [
        { name: 'Figma', level: 70, icon: 'ri-pen-nib-line' },
        { name: 'Canva', level: 70, icon: 'ri-palette-line' }
      ]
    },
    programming: {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 70, icon: 'ri-javascript-line' },
        { name: 'Python', level: 50, icon: 'ri-code-line' },
        { name: 'C', level: 50, icon: 'ri-terminal-line' },
        { name: 'Java', level: 50, icon: 'ri-java-line' }
      ]
    },
    databases: {
      title: 'Databases',
      skills: [
        { name: 'Oracle SQL', level: 50, icon: 'ri-database-line' },
        { name: 'MongoDB', level: 50, icon: 'ri-database-2-line' },
        { name: 'MySQL', level: 50, icon: 'ri-database-line' }
      ]
    },
    analysis: {
      title: 'Data Analysis & Visualization',
      skills: [
        { name: 'Excel', level: 60, icon: 'ri-file-excel-line' },
        { name: 'PowerBI', level: 60, icon: 'ri-bar-chart-line' }
      ]
    },
    tools: {
      title: 'Version Control & Project Management',
      skills: [
        { name: 'GitHub', level: 90, icon: 'ri-github-line' },
        { name: 'Git', level: 80, icon: 'ri-git-branch-line' }
      ]
    }
  };

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: 'ri-code-line' },
    { id: 'design', label: 'Design', icon: 'ri-palette-line' },
    { id: 'programming', label: 'Programming', icon: 'ri-terminal-line' },
    { id: 'databases', label: 'Databases', icon: 'ri-database-line' },
    { id: 'analysis', label: 'Data Analysis', icon: 'ri-bar-chart-line' },
    { id: 'tools', label: 'Tools', icon: 'ri-tools-line' }
  ];

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-40 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl px-6 mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Technical Skills</h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            A comprehensive overview of my technical expertise across various domains of technology and development.
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-center w-5 h-5">
                <i className={tab.icon}></i>
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Content */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            <h3 className="mb-8 text-2xl font-bold text-center text-gray-900">
              {skillCategories[activeTab as keyof typeof skillCategories].title}
            </h3>
            
            <div className="grid gap-8 md:grid-cols-2">
              {skillCategories[activeTab as keyof typeof skillCategories].skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                        <i className={skill.icon}></i>
                      </div>
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">{skill.level}%</span>
                  </div>
                  <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
                    <div
                      className="h-full transition-all duration-1000 ease-out origin-left transform rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
