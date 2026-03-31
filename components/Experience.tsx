"use client";

import { useEffect, useState, useRef } from "react";
import { AiFillTool } from "react-icons/ai";
import { FaPython, FaTools } from "react-icons/fa";
import {LuBug, LuGraduationCap } from "react-icons/lu";
import { MdWork } from "react-icons/md";
import { TbTool } from "react-icons/tb";

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      id: 1,
      title: "B.E in CSE (Data Science)",
      category: "education",
      company: "Visvesvaraya Technological University",
      duration: "2022 - 2026",
      description:
        "Pursuing a degree in Computer Science with a focus on Data Science. Coursework includes machine learning, data analysis, and software development. Additionally, I have learnt other than data science subjects such as programming languages like Java, Python, JavaScript, React.js, Tailwind CSS, and more.",
      tech: ["Data Science", "Machine Learning", "Python", "Java", "JavaScript"],
      icon: <LuGraduationCap size={22} />
    },
    {
      id: 2,
      title: "Software Testing with Python",
      category: "course",
      company: "QSpiders Rajajinagar - Bangalore",
      duration: "Feb 2026 - Aug 2026",
      description:
        "Completed a comprehensive course on software testing, covering both manual and automated testing methodologies. Gained hands-on experience with tools like Selenium, Postman, and PyTest, and developed a strong understanding of testing principles and best practices.",
      tech: ["Selenium", "Postman", "PyTest", "Manual Testing", "Automated Testing"],
      icon: <><LuBug /><FaPython /></>
    },
    
    {
      id: 3,
      title: "Software Testing Intern",
      category: "Internship",
      company: "Robowaves",
      duration: "Feb 2026 - Present",
      description:
        "Currently interning as a Software Testing Intern at Robowaves, where I am responsible for designing and executing test cases, identifying and reporting bugs, and collaborating with the development team to ensure the quality of software products. This role has provided me with practical experience in real-world testing scenarios and has enhanced my skills in both manual and automated testing. I have worked in Fireflink, a scriptless automation tool, and have gained experience in using Selenium and Postman for testing purposes.",
      tech: ["Selenium", "Postman", "PyTest", "Manual Testing", "Automated Testing"],
      icon: <><LuBug /><FaTools /></> 
    },
  ];

  const filters = [
    { key: "all", label: "All Experiences" },
    { key: "education", label: "Education" },
    { key: "course", label: "Course" },
    { key: "Internship", label: "Internship" },
  ];

  const filteredExperiences =
    activeFilter === "all"
      ? experiences
      : experiences.filter((exp) => exp.category === activeFilter);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-28 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="px-6 mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            My Experiences
          </h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            My professional journey and educational background
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 shadow-md"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Experiences Grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[fit-content(100%)]">
            {filteredExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
                onMouseEnter={() => setHoveredExperience(exp.id)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                  </div>
                  <p className="mb-2 text-sm font-medium text-purple-600">{exp.duration}</p>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium text-purple-700 rounded-full bg-gradient-to-r from-purple-100 to-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-lg text-center text-gray-500 transition-opacity duration-500">
            No experiences found.
          </div>
        )}
      </div>
    </section>
  );
}