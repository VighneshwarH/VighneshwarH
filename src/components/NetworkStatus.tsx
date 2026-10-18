'use client'

import { useEffect, useState } from 'react'
import { HiArrowPath } from 'react-icons/hi2'
import { withBasePath } from '@/lib/paths'

function DisconnectedIllustration() {
  return (
    <svg
      aria-label="Abstract illustration of a disconnected signal"
      className="network-status__illustration"
      fill="none"
      role="img"
      viewBox="0 0 560 430"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Abstract illustration of a disconnected signal</title>
      <path className="network-status__orbit" d="M92 217C92 115 175 32 278 32C381 32 464 115 464 217" />
      <path className="network-status__orbit network-status__orbit--inner" d="M124 217C124 132 193 63 278 63C363 63 432 132 432 217" />
      <path className="network-status__route" d="M40 331H138L181 288H235M325 288H379L422 331H520" />
      <path className="network-status__route network-status__route--fine" d="M83 386H177L220 343H336L379 386H477" />
      <g className="network-status__device">
        <rect x="203" y="154" width="150" height="132" rx="16" />
        <path d="M231 261H325" />
        <path d="M254 235L302 187" />
        <circle cx="248" cy="192" r="7" />
        <circle cx="309" cy="253" r="7" />
      </g>
      <g className="network-status__signal">
        <path d="M151 109L195 153" />
        <path d="M151 153L195 109" />
        <path d="M361 109L405 153" />
        <path d="M361 153L405 109" />
      </g>
      <circle className="network-status__node" cx="40" cy="331" r="7" />
      <circle className="network-status__node" cx="520" cy="331" r="7" />
      <text className="network-status__coordinates" x="40" y="281">NO NETWORK</text>
      <text className="network-status__coordinates" x="379" y="281">TRY AGAIN</text>
    </svg>
  )
}

export default function NetworkStatus() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const updateConnection = () => setIsOffline(!window.navigator.onLine)

    updateConnection()
    window.addEventListener('offline', updateConnection)
    window.addEventListener('online', updateConnection)

    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && window.isSecureContext) {
      navigator.serviceWorker.register(withBasePath('/sw.js'), { scope: withBasePath('/') }).catch(() => {
        // The in-app offline panel still works if a browser blocks service workers.
      })
    }

    return () => {
      window.removeEventListener('offline', updateConnection)
      window.removeEventListener('online', updateConnection)
    }
  }, [])

  if (!isOffline) return null

  return (
    <aside aria-live="assertive" className="network-status" role="alert">
      <div className="network-status__content">
        <div className="network-status__copy">
          <p className="network-status__eyebrow"><i />Connection interrupted</p>
          <p aria-hidden="true" className="network-status__code">OFF</p>
          <h2>You&apos;re temporarily out of range.</h2>
          <p>
            Check your connection, then try again. Your place here will be waiting for you.
          </p>
          <button className="network-status__action" onClick={() => window.location.reload()} type="button">
            <HiArrowPath aria-hidden="true" />
            Retry connection
          </button>
        </div>
        <DisconnectedIllustration />
      </div>
    </aside>
  )
}
