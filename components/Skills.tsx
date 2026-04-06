
'use client';

import { useEffect, useState, useRef } from 'react';
import { BiBarChart, BiBug, BiGitBranch } from 'react-icons/bi';
import { BsGithub} from 'react-icons/bs';
import { DiMongodb } from 'react-icons/di';
import { FaFigma, FaTools } from 'react-icons/fa';
import { FaHtml5, FaJava, FaPython } from 'react-icons/fa6';
import { GrMysql, GrOracle, GrReactjs } from 'react-icons/gr';
import { MdChecklist } from 'react-icons/md';
import { RiFileExcelFill, RiTailwindCssFill } from 'react-icons/ri';
import { SiCanva, SiJavascript, SiNumpy } from 'react-icons/si';

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
      // skills: [
      //   { name: 'HTML',icon: 'ri-html5-line' },
      //   { name: 'CSS',icon: 'ri-css3-fill' },
      //   { name: 'JavaScript',icon: 'ri-javascript-line' },
      //   { name: 'React JS',icon: 'ri-reactjs-line' },
      //   { name: 'TailwindCSS',icon: 'ri-tailwind-css-line' }
      // ]
      skills: [
        { name: 'HTML',icon: <FaHtml5 /> },
        { name: 'CSS',icon: <FaPython /> },
        { name: 'JavaScript',icon: <SiJavascript /> },
        { name: 'React JS',icon: <GrReactjs /> },
        { name: 'TailwindCSS',icon: <RiTailwindCssFill /> }
      ]
    },
    design: {
      title: 'Design Tools',
      skills: [
        { name: 'Figma',icon: <FaFigma/> },
        { name: 'Canva',icon: <SiCanva /> }
      ]
    },
    programming: {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', icon: <SiJavascript /> },
        { name: 'Python', icon: <FaPython /> },
        { name: 'Java', icon: <FaJava /> }
      ]
    },
    databases: {
      title: 'Databases',
      skills: [
        { name: 'Oracle SQL', icon: <GrOracle /> },
        { name: 'MongoDB', icon: <DiMongodb /> },
        { name: 'MySQL', icon: <GrMysql /> }
      ]
    },
    analysis: {
      title: 'Data Analysis & Visualization',
      skills: [
        { name: 'Excel',icon: <RiFileExcelFill /> },
        { name: 'PowerBI',icon: <BiBarChart/> },
        { name: 'NumPy',icon: <SiNumpy /> },
      ]
    },
    software_testing: {
      title: 'Software Testing',
      skills: [
        { name: 'Manual Testing', level: 60, icon: <MdChecklist/> },
        { name: 'Automated Testing', level: 40, icon: <BiBug /> },
        { name: 'Fireflink', level: 70, icon: < FaTools /> }
      ]
    },
    tools: {
      title: 'Version Control & Project Management',
      skills: [
        { name: 'GitHub', level: 90, icon: <BsGithub /> },
        { name: 'Git', level: 80, icon: <BiGitBranch /> }
      ]
    }
  };

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: 'ri-code-line' },
    { id: 'design', label: 'Design', icon: 'ri-palette-line' },
    { id: 'programming', label: 'Programming', icon: 'ri-terminal-box-line' },
    { id: 'databases', label: 'Databases', icon: 'ri-database-2-line' },
    { id: 'analysis', label: 'Data Analysis', icon: 'ri-bar-chart-fill' },
    { id: 'software_testing', label: 'Testing', icon: 'ri-bug-line' },
    { id: 'tools', label: 'Tools', icon: 'ri-tools-line' }
  ];

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-40 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl px-6 mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">My Technical Skills</h2>
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
            <h3 className="mb-12 text-2xl font-bold text-center text-gray-900">
              {skillCategories[activeTab as keyof typeof skillCategories].title}
            </h3>
            
            <div className="flex justify-center items-center flex-wrap gap-4">
              {skillCategories[activeTab as keyof typeof skillCategories].skills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center justify-center group transition-transform duration-300 hover:scale-110">
                  <div className="flex items-center justify-center w-20 h-20 mb-4 text-4xl text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg group-hover:shadow-xl transition-shadow">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-semibold text-center text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
