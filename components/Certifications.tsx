"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaPython } from "react-icons/fa6";
import { LuAward, LuCode, LuPalette, LuBrainCircuit, LuDatabase, LuShield } from "react-icons/lu";

export default function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredCertification, setHoveredCertification] = useState<number | null>(null);
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

  const certifications = [
    {
      id: 1,
      title: "Programming Fundamentals Using Python",
      category: "programming",
      description:
        "Certification in fundamental programming concepts and practices using Python.",
      image: "/Python_Certificate.jpg",
      tech: ["Python"],
      link: "#",
      icon: <LuCode />
    },
    {
      id: 2,
      title: "Getting Started with PowerBI",
      category: "data analysis",
      description:
        "Certification in using PowerBI for data visualization and analysis.",
      image: "/Power_BI_Certificate.jpg",
      tech: ["PowerBI"],
      link: "#",
      icon: <LuCode />
    },
    {
      id: 3,
      title: "Introduction to Web Design and Development",
      category: "web development",
      description:
        "Certification in basic web design and development principles, including HTML, CSS, and JavaScript.",
      image: "/Web_Development_Certificate.jpg",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "#",
      icon: <LuCode />
    }
  ];

  const filters = [
    { key: "all", label: "All Certifications" },
    { key: "web development", label: "Web Development" },
    { key: "data analysis", label: "Data Analysis" },
    { key: "programming", label: "Programming" },
  ];

  const filteredCertifications =
    activeFilter === "all"
      ? certifications
      : certifications.filter((cert) => cert.category === activeFilter);

  return (
    <section
      id="certifications"
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
            My Certifications
          </h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            A showcase of my professional certifications and achievements
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

        {/* Certifications Grid */}
        {filteredCertifications.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertifications.map((cert, index) => (
              <div
                key={cert.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
                onMouseEnter={() => setHoveredCertification(cert.id)}
                onMouseLeave={() => setHoveredCertification(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="object-cover object-top w-full h-48 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4`}
                  >
                    <Link href={cert.link} className="px-4 py-2 font-medium text-purple-600 transition-colors duration-300 bg-white rounded-full cursor-pointer hover:bg-purple-600 hover:text-white whitespace-nowrap">
                      View Certificate
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                    {cert.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium text-purple-700 rounded-full bg-gradient-to-r from-purple-100 to-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="absolute px-4 py-2 text-white rounded-full right-5 top-4 bg-gradient-to-r from-purple-600 to-blue-600">
                    <span className="text-[16px] capitalize flex items-center justify-center gap-3">
                      {cert.category}{cert.icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-lg text-center text-gray-500 transition-opacity duration-500">
            No Certifications found.
          </div>
        )}
      </div>
    </section>
  );
}