"use client";

import { useEffect, useState, useRef } from "react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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

  const projects = [
    {
      id: 1,
      title: "EMOSENSE - Kannada SER Chatbot(On-Going)",
      category: "machine-learning",
      description:
        "A Chatbot which detects emotions from Kannada voice datasets, suggests suitable relaxation activities.",
      image: "https://image2url.com/images/1759576790701-e46b4dbc-b17e-4488-86d0-447f9c87861a.jpeg",
      tech: ["Figma", "React.js", "Tailwind CSS", "Machine Learning"],
      link: "#",
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "frontend",
      description:
        "Responsive portfolio website with smooth animations and modern design patterns.",
      image: "https://image2url.com/images/1759576861793-5d6e7d75-615b-41de-9033-8819675128c2.png",
      tech: ["Next.js", "React", "Tailwind CSS"],
      link: "#",
    },
    {
      id: 3,
      title: "Ochi.Design",
      category: "frontend",
      description:
        "A Presentation Website for amazing presentations across the world.",
      image: "https://image2url.com/images/1759599957682-4db37c67-cf43-434e-845f-857d7bd578a0.png",
      tech: ["React", "Tailwind CSS"],
      link: "#",
    },
    {
      id: 4,
      title: "Graphy Logo Design",
      category: "design",
      description:
        "A logo for a Graphics Design company, showcasing modern design principles and vibrant colors.",
      image: "https://image2url.com/images/1759601500315-55b239a4-0689-4a21-9048-72c3ca704e3a.png",
      tech: ["Figma", "User Research", "Prototyping", "Design System"],
      link: "#",
    },
  ];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "frontend", label: "Frontend" },
    { key: "design", label: "Design" },
    { key: "data", label: "Data Analysis" },
    { key: "programming", label: "Programming" },
    { key: "machine-learning", label: "Machine Learning" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
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
            Featured Projects
          </h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            A showcase of my work across development, design, and data analysis
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

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover object-top w-full h-48 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4`}
                  >
                    <button className="px-4 py-2 font-medium text-purple-600 transition-colors duration-300 bg-white rounded-full cursor-pointer hover:bg-purple-600 hover:text-white whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium text-purple-700 rounded-full bg-gradient-to-r from-purple-100 to-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="absolute flex items-center justify-center px-4 py-2 text-white rounded-full right-5 top-4 bg-gradient-to-r from-purple-600 to-blue-600">
                    <span className="text-sm capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-lg text-center text-gray-500 transition-opacity duration-500">
            No Projects found.
          </div>
        )}
      </div>
    </section>
  );
}
