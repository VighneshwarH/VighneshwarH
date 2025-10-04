
'use client';

import { useEffect, useState, useRef } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
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

  const educationTimeline = [
    {
      period: "2022 - 2026",
      institution: "Moodlakatte Institute of Technology",
      degree: "B.E in Computer Science & Engineering (Data Science)",
      icon: "ri-graduation-cap-line"
    },
    {
      period: "2020 - 2022",
      institution: "R.N.Shetty Composite PU College Kundapura",
      degree: "Pre-University Course (PU)",
      icon: "ri-book-open-line"
    },
    {
      period: "2017 - 2019",
      institution: "V.K.R Acharya Memorial English Medium High School Kundapura",
      degree: "High School Education",
      icon: "ri-school-line"
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passionate Computer Science student specializing in Data Science, with a strong foundation in web development, UI/UX design, and data analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - About Content */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                As a dedicated Computer Science student pursuing Data Science specialization, I'm passionate about creating innovative digital solutions. My journey spans across frontend development, UI/UX design, and data analysis, allowing me to bridge the gap between technical implementation and user experience.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                I believe in continuous learning and staying updated with the latest technologies. My goal is to become a versatile full-stack developer who can design beautiful interfaces, build robust applications, and derive meaningful insights from data.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4+</div>
                  <div className="text-sm text-gray-600">Years of Education</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Technical Skills</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Education Timeline */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Education Timeline</h3>
            <div className="space-y-6">
              {educationTimeline.map((edu, index) => (
                <div key={index} className="relative">
                  {/* Timeline Line */}
                  {index < educationTimeline.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <i className={`${edu.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="text-sm font-semibold text-purple-600 mb-2">{edu.period}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
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
