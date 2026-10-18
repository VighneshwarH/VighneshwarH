import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi2'

function LostSignalIllustration() {
  return (
    <svg
      aria-label="Abstract map pin that has lost its signal"
      className="error-illustration"
      fill="none"
      role="img"
      viewBox="0 0 520 430"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="error-illustration__route" d="M43 341C119 341 133 285 194 285C267 285 260 358 340 358C409 358 414 263 489 263" />
      <path className="error-illustration__route error-illustration__route--fine" d="M70 390C137 390 151 332 211 332C281 332 303 401 386 401C428 401 446 379 473 351" />
      <circle className="error-illustration__waypoint" cx="43" cy="341" r="7" />
      <circle className="error-illustration__waypoint" cx="489" cy="263" r="7" />
      <g className="error-illustration__pin">
        <path d="M258 61C191 61 137 114 137 180C137 264 258 343 258 343C258 343 379 264 379 180C379 114 325 61 258 61Z" />
        <circle cx="258" cy="180" r="48" />
        <path d="M258 155V207M232 181H284" />
      </g>
      <path className="error-illustration__orbit" d="M88 186C88 90 164 13 260 13C356 13 434 91 434 187" />
      <path className="error-illustration__orbit error-illustration__orbit--inner" d="M113 186C113 104 179 38 261 38C343 38 409 104 409 186" />
      <g className="error-illustration__signal">
        <path d="M397 89L450 36" />
        <path d="M419 111L477 53" />
        <path d="M440 132L493 79" />
      </g>
      <text className="error-illustration__coordinates" x="44" y="229">404° 00&apos; N</text>
      <text className="error-illustration__coordinates" x="385" y="224">NOT FOUND</text>
    </svg>
  )
}

export default function NotFound() {
  return (
    <main className="error-page">
      <section className="error-page__content" aria-labelledby="not-found-title">
        <div className="error-page__copy">
          <p className="error-page__eyebrow"><span />Off the map</p>
          <p aria-hidden="true" className="error-page__code">404</p>
          <h1 id="not-found-title">This page took a wrong turn.</h1>
          <p className="error-page__summary">
            The route you followed does not lead anywhere at the moment. Let&apos;s get you back to the work.
          </p>
          <Link className="error-page__action" href="/">
            <HiArrowLeft aria-hidden="true" />
            Back to home
          </Link>
        </div>
        <LostSignalIllustration />
      </section>
    </main>
  )
}
