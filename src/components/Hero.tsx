import { portfolio, roles } from '../data/portfolio'
import { HoverRoll } from './ui/AnimatedText'
import DownloadIcon from '@mui/icons-material/Download';

function HeroWord({
  word,
  offset = false,
}: {
  word: string
  offset?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={`hero-line ${
        offset ? 'hero-line--offset' : ''
      }`}
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
  )
}

export function Hero() {
  return (
    <section
      className="site-wrap hero-shell"
      id="top"
    >
      {/* Eyebrow */}
      <div
        className="eyebrow-row"
        data-hero-reveal
      >
        <span>
          Full-stack · Interface design
        </span>
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
            <HeroWord
              word={portfolio.hero.title[0]}
            />

            <HeroWord
              word={portfolio.hero.title[1]}
              offset
            />
          </h1>

          {/* Description + CTA */}
          <div className="hero-footer">

            <p
              className="hero-intro"
              data-hero-reveal
            >
              {portfolio.hero.introduction}
            </p>

            <div
              className="hero-actions"
              data-hero-reveal
            >
              <a
                className="button button--primary"
                data-cursor-target
                href="#work"
              >
                <HoverRoll>
                  See the work
                </HoverRoll>

                <span aria-hidden="true">
                  ↘
                </span>
              </a>

              <a
                className="button"
                data-cursor-target
                href="#contact"
              >
                <HoverRoll>
                  Start a conversation
                </HoverRoll>
              </a>
              <a
                className="button"
                data-cursor-target
                href="#contact"
              >
                <HoverRoll>
                  Download Resume 
                </HoverRoll>
                <DownloadIcon/>
              </a>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <figure
          className="portrait-wrap"
          data-cursor-target
          data-hero-portrait
        >
          <div className="portrait-frame">
            <img
              src={portfolio.hero.imageSrc}
              alt={portfolio.hero.imageAlt}
            />
          </div>
        </figure>
      </div>

      {/* Marquee */}
      <div
        aria-hidden="true"
        className="marquee"
        data-hero-reveal
      >
        <div className="marquee__track">
          {[...roles, ...roles].map(
            (role, index) => (
              <span
                key={`${role}-${index}`}
              >
                {role}

                <b aria-hidden="true">
                  ✦
                </b>
              </span>
            ),
          )}
        </div>
      </div>

      {/* Accessible text */}
      <span className="sr-only">
        {roles.join(', ')}
      </span>
    </section>
  )
}