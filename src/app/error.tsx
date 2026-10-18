'use client'

import Link from 'next/link'
import { HiArrowPath, HiOutlineArrowLeft } from 'react-icons/hi2'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

function BrokenConnectionIllustration() {
  return (
    <svg
      aria-label="Abstract illustration of a broken connection"
      className="error-illustration error-illustration--failure"
      fill="none"
      role="img"
      viewBox="0 0 520 430"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Abstract illustration of a broken connection</title>
      <path className="error-illustration__route" d="M40 300H169L211 255H298L341 300H480" />
      <path className="error-illustration__route error-illustration__route--fine" d="M40 359H122L164 316H226M297 316H357L400 359H480" />
      <g className="error-illustration__pin error-illustration__pin--square">
        <rect x="151" y="74" width="218" height="181" rx="16" />
        <path d="M212 132L251 171L290 132M251 94V207" />
        <path d="M196 219H324" />
      </g>
      <path className="error-illustration__orbit" d="M82 216C82 101 160 28 260 28C360 28 438 101 438 216" />
      <g className="error-illustration__signal">
        <path d="M105 101L147 143" />
        <path d="M105 143L147 101" />
        <path d="M373 101L415 143" />
        <path d="M373 143L415 101" />
      </g>
      <text className="error-illustration__coordinates" x="40" y="390">CONNECTION INTERRUPTED</text>
    </svg>
  )
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="error-page">
      <section className="error-page__content" aria-labelledby="error-title">
        <div className="error-page__copy">
          <p className="error-page__eyebrow"><span />A brief interruption</p>
          <p aria-hidden="true" className="error-page__code">500</p>
          <h1 id="error-title">Something slipped out of frame.</h1>
          <p className="error-page__summary">
            The page hit an unexpected issue. Try again, or return home and start from a known place.
          </p>
          <div className="error-page__actions">
            <button className="error-page__action error-page__action--solid" onClick={reset} type="button">
              <HiArrowPath aria-hidden="true" />
              Try again
            </button>
            <Link className="error-page__action" href="/">
              <HiOutlineArrowLeft aria-hidden="true" />
              Back to home
            </Link>
          </div>
          {error.digest ? <p className="error-page__digest">Reference: {error.digest}</p> : null}
        </div>
        <BrokenConnectionIllustration />
      </section>
    </main>
  )
}
