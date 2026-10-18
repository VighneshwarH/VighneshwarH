'use client'

import { HiArrowPath } from 'react-icons/hi2'
import { agency } from './fonts'
import './globals.css'

type GlobalErrorProps = {
  retry: () => void
}

export default function GlobalError({ retry }: GlobalErrorProps) {
  return (
    <html lang="en" className={agency.variable}>
      <body>
        <main className="error-page error-page--global">
          <section className="error-page__content" aria-labelledby="global-error-title">
            <div className="error-page__copy">
              <p className="error-page__eyebrow"><span />A moment, please</p>
              <p aria-hidden="true" className="error-page__code">500</p>
              <h1 id="global-error-title">We lost the signal.</h1>
              <p className="error-page__summary">
                The site needs a moment to reconnect. Try loading the experience again.
              </p>
              <button className="error-page__action error-page__action--solid" onClick={retry} type="button">
                <HiArrowPath aria-hidden="true" />
                Try again
              </button>
            </div>

            <svg
              aria-label="Abstract illustration of an interrupted signal"
              className="error-illustration error-illustration--failure"
              fill="none"
              role="img"
              viewBox="0 0 520 430"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Abstract illustration of an interrupted signal</title>
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
          </section>
        </main>
      </body>
    </html>
  )
}
