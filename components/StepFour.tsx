'use client'

import { useState } from 'react'
import PulsingCircle from '@/components/PulsingCircle'

export default function StepFour() {
  const [showManual, setShowManual] = useState(false)

  const handleClose = () => {
    window.close()
    // If still open after a tick, the browser blocked it — show fallback
    setTimeout(() => setShowManual(true), 300)
  }

  return (
    <div
      className="relative flex flex-col items-center justify-between h-dvh w-full px-6 py-14 overflow-hidden"
      style={{ background: '#F5DBC8' }}
    >
      <PulsingCircle />

      <div />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: '#F16C13' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-2xl font-semibold leading-snug max-w-xs" style={{ color: '#221509' }}>
          You know what you&apos;re doing next.
        </p>

        <p className="text-base font-medium leading-relaxed max-w-xs" style={{ color: 'rgba(34,21,9,0.6)' }}>
          Close this and go.
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-xs">
        {showManual ? (
          <p className="text-center text-base font-medium" style={{ color: 'rgba(34,21,9,0.6)' }}>
            Close this tab to finish.
          </p>
        ) : (
          <button
            onClick={handleClose}
            className="w-full py-4 rounded-2xl text-base font-semibold active:scale-95 transition-transform duration-150"
            style={{ background: '#F16C13', color: '#fff' }}
          >
            Let&apos;s go
          </button>
        )}
      </div>
    </div>
  )
}
