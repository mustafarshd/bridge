'use client'

export default function StepFour() {
  return (
    <div
      className="relative flex flex-col items-center justify-between h-dvh w-full px-6 py-14"
      style={{ background: '#130803' }}
    >
      {/* Blur layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute', top: '10%', left: '-20%',
          width: '70vw', height: '70vw', borderRadius: '50%',
          background: '#C84010', opacity: 0.25, filter: 'blur(90px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-15%',
          width: '65vw', height: '65vw', borderRadius: '50%',
          background: '#8B2808', opacity: 0.3, filter: 'blur(80px)',
        }} />
      </div>

      <div />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: '#C84010' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5EDE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-2xl font-semibold leading-snug max-w-xs" style={{ color: '#F5EDE0' }}>
          You know what you&apos;re doing next.
        </p>

        <p className="text-base font-medium leading-relaxed max-w-xs" style={{ color: 'rgba(245,237,224,0.55)' }}>
          Close this and go.
        </p>
      </div>

      <button
        onClick={() => window.close()}
        className="relative z-10 w-full max-w-xs py-4 rounded-2xl text-base font-semibold active:scale-95 transition-transform duration-150"
        style={{ background: '#C84010', color: '#F5EDE0' }}
      >
        Let&apos;s go
      </button>
    </div>
  )
}
