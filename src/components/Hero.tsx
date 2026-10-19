import Image from "next/image";
import { portfolio, roles } from "../data/portfolio";
import { HoverRoll } from "./ui/AnimatedText";
import { useEffect, useState } from "react";
import ResumeModal from "./ui/ResumeModal";
import { LuContact } from "react-icons/lu";

function HeroWord({
  word,
  offset = false,
}: {
  word: string;
  offset?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`hero-line ${offset ? "hero-line--offset" : ""}`}
    >
      {[...word].map((character, index) => (
        <span
          className="hero-character"
          data-hero-character
          key={`${character}-${index}`}
        >
          <i>{character}</i>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";

      setIsDark(isDarkMode);
    };

    checkTheme();

    // Listen for dynamic theme toggles from your site's theme switcher
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);


  // Index 0 = Dark theme image (/images/portrait.png)
  // Index 1 = Light theme image (/images/portrait2.png)
  const currentSrc = isDark
    ? portfolio.hero.imageSrc[0]
    : (portfolio.hero.imageSrc[1] ?? portfolio.hero.imageSrc[0]);

  return (
    <section className="site-wrap hero-shell" id="top">
      {/* Eyebrow */}
      <div className="eyebrow-row" data-hero-reveal>
        <span>Full-stack · Interface design · Software Testing</span>
      </div>

      {/* Main hero */}
      <div className="hero-main">
        {/* Left content */}
        <div className="hero-content">
          {/* Title */}
          <h1
            aria-label={portfolio.name}
            className="display hero-title"
            data-cursor-target
          >
            <HeroWord word={portfolio.hero.title[0]} />

            <HeroWord word={portfolio.hero.title[1]} offset />
          </h1>

          {/* Description + CTA */}
          <div className="hero-footer">
            <p className="hero-intro" data-cursor-target data-hero-reveal>
              {portfolio.hero.introduction}
            </p>

            <div className="hero-actions" data-hero-reveal>
              <a
                className="button button--primary rounded-lg"
                data-cursor-target
                href="#work"
              >
                <HoverRoll>See the work</HoverRoll>

                <span aria-hidden="true">↘</span>
              </a>

              
              <a
                className="button rounded-lg"
                data-cursor-target
                onClick={() => setIsResumeOpen(true)}
              >
                <HoverRoll>Download Resume</HoverRoll>
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <path
                    d="M12 3v12m0 0 4-4m-4 4-4-4m-5 8h18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <figure className="portrait-wrap" data-hero-portrait>
          {/* Added 'relative' to ensure Next.js fill component stays bounded */}
          <div className="portrait-frame relative w-full h-full" data-cursor-target>
            <Image
              key={currentSrc} /* Forces immediate DOM swap on theme change */
              alt={portfolio.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 639px) 73vw, (max-width: 900px) 16rem, 21rem"
              src={currentSrc}
              className="object-cover"
            />
          </div>
          <div className="portrait-signature">
            <Image
              src={portfolio.hero.signature}
              alt={portfolio.hero.signatureAlt}
              priority
              width={180}
              height={238}
              sizes="(max-width: 639px) 2.6rem, (max-width: 900px) 3.75rem, 5.5rem"
            />
          </div>
        </figure>
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Marquee */}
      <div aria-hidden="true" className="marquee" data-hero-reveal>
        <div className="marquee__track">
          {[...roles, ...roles].map((role, index) => (
            <span key={`${role}-${index}`}>
              {role}

              <b aria-hidden="true">✦</b>
            </span>
          ))}
        </div>
      </div>

      {/* Accessible text */}
      <span className="sr-only">{roles.join(", ")}</span>
    </section>
  );
}