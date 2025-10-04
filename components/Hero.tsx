"use client";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { RiDownloadLine } from "react-icons/ri";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-gray-900 to-violet-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute w-16 h-16 rounded-full top-32 left-4 sm:left-10 sm:w-20 sm:h-20 bg-purple-500/20 animate-pulse"></div>
        <div className="absolute w-12 h-12 rounded-full top-44 right-4 sm:right-20 sm:w-16 sm:h-16 bg-blue-500/20 animate-pulse"></div>
        <div className="absolute w-10 h-10 rounded-full bottom-32 left-4 sm:left-20 sm:w-12 sm:h-12 bg-indigo-500/20 animate-pulse"></div>
        <div className="absolute w-20 h-20 rounded-full bottom-20 right-4 sm:right-10 sm:w-24 sm:h-24 bg-cyan-500/20 animate-pulse"></div>
      </div>

      <div className="relative z-20 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 order-2 text-center text-white lg:text-left lg:order-1">
            <div
              className={`transform transition-all duration-1000 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1
                className="mb-3 overflow-visible text-3xl font-bold leading-normal text-transparent drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 bg-clip-text"
                style={{ paddingBottom: "0.5rem", lineHeight: "1.2" }}
              >
                Vighneshwar H
              </h1>
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <p className="mb-3 text-lg text-gray-300 sm:text-xl md:text-2xl sm:mb-4">
                  Student • Aspiring Web/Fullstack Developer
                </p>
                <p className="mb-2 text-base text-gray-300 sm:text-lg md:text-xl">
                  UI/UX Designer • Data Analyst
                </p>
                <p className="max-w-xl mx-auto mb-6 text-sm text-gray-400 sm:text-base md:text-lg sm:mb-8 lg:max-w-2xl lg:mx-0">
                  Passionate about crafting digital experiences with modern
                  technologies, creating intuitive designs, and transforming
                  data into meaningful insights
                </p>
              </div>
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start transform transition-all duration-1000 delay-500 ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <button
                  onClick={scrollToProjects}
                  className="px-6 py-3 text-sm font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg cursor-pointer sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl whitespace-nowrap sm:text-base"
                >
                  View My Work
                </button>
                <button
                  onClick={scrollToContact}
                  className="px-6 py-3 text-sm font-semibold text-white transition-all duration-300 transform border-2 border-white rounded-full cursor-pointer sm:px-8 sm:py-4 hover:bg-white hover:text-purple-900 hover:scale-105 whitespace-nowrap sm:text-base"
                >
                  Get In Touch
                </button>
                <a
                  download={"Vighneshwar_H_Resume.pdf"}
                  href="/Vighneshwar_H_Resume.pdf"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg cursor-pointer sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl whitespace-nowrap sm:text-base"
                >
                  Download Resume <RiDownloadLine size={18} />
                </a>
              </div>
            </div>
          </div>
          {/* Right Side - Profile Image with Impressive Shape */}
          <div className="flex justify-center flex-1 order-1 lg:justify-end lg:order-2">
            <div
              className={`relative transform transition-all duration-1000 delay-700 ${
                mounted ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              {/* Outer Animated Ring */}
              <div className="absolute inset-0 border-2 rounded-full sm:border-4 border-gradient-to-r from-purple-400 to-blue-400 animate-spin"></div>
              {/* Glowing Ring Effect */}
              <div className="absolute rounded-full -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30 blur-sm animate-pulse"></div>
              {/* Main Profile Circle */}
              <div className="relative w-56 h-56 overflow-hidden border-4 rounded-full shadow-2xl sm:w-80 sm:h-80 md:w-96 md:h-96 sm:border-8 border-white/60 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                <img
                  src="https://image2url.com/images/1759576316801-91d13165-efa7-4df5-ab3d-4692acbf0cc5.png"
                  alt="Vighneshwar H - Profile"
                  className="object-cover object-top w-full h-full"
                />
              </div>
              {/* Floating Tech Icons */}
              <div className="absolute top-0 w-full h-full duration-1000 ease-in-out animate-[spin_15s_infinite_linear] ">
                <div className="absolute flex items-center justify-center w-10 h-10 delay-300 rounded-full -top-4 -left-4 sm:-top-6 sm:-left-6 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 ">
                  <i className="text-lg text-white ri-code-line sm:text-xl"></i>
                </div>
                <div className="absolute flex items-center justify-center w-10 h-10 delay-500 rounded-full -top-4 -right-4 sm:-top-6 sm:-right-6 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-purple-500 ">
                  <i className="text-lg text-white ri-palette-line sm:text-xl"></i>
                </div>
                <div className="absolute flex items-center justify-center w-10 h-10 delay-700 rounded-full -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 ">
                  <i className="text-lg text-white ri-database-line sm:text-xl"></i>
                </div>
                <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500">
                  <i className="text-lg text-white ri-bar-chart-line sm:text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div
          className={`absolute sm:-bottom-28 -bottom-[8px] left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="animate-bounce">
            <div className="flex items-center justify-center w-6 h-6">
              <i className="text-xl text-white ri-arrow-down-line sm:text-3xl"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
