'use client'

import { useState } from 'react'

interface SpeechStepProps {
  stepNumber: number
  totalSteps: number
  heading: string
  onComplete: () => void
}

export default function SpeechStep({ stepNumber, totalSteps, heading, onComplete }: SpeechStepProps) {
  const [listening, setListening] = useState(false)
  const [pressed, setPressed] = useState(false)

  const handlePointerDown = () => {
    setPressed(true)
    setListening(true)
  }

  const handlePointerUp = () => {
    setPressed(false)
    setListening(false)
    onComplete()
  }

  const handlePointerLeave = () => {
    if (pressed) handlePointerUp()
  }

  return (
    <div
      className="relative flex flex-col items-center h-dvh w-full overflow-hidden"
      style={{ background: '#130803' }}
    >
      {/* Blur layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute', top: '-15%', left: '-20%',
          width: '80vw', height: '80vw', borderRadius: '50%',
          background: '#C84010', opacity: 0.25, filter: 'blur(100px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-15%',
          width: '65vw', height: '65vw', borderRadius: '50%',
          background: '#8B2808', opacity: 0.35, filter: 'blur(80px)',
        }} />
        {/* Extra glow behind button */}
        <div style={{
          position: 'absolute', bottom: '12%', left: '50%',
          transform: 'translateX(-50%)',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: '#E05010', opacity: 0.2, filter: 'blur(60px)',
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 pt-20 gap-3">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(245,237,224,0.4)' }}>
          Step {stepNumber} of {totalSteps}
        </p>
        <h1 className="font-semibold leading-tight" style={{ color: '#F5EDE0', fontSize: 34 }}>
          {heading}
        </h1>
      </div>

      {/* Instruction */}
      <p
        className="relative z-10 text-center font-medium text-base px-10 mt-5 leading-relaxed"
        style={{ color: 'rgba(245,237,224,0.55)' }}
      >
        {listening
          ? 'Keep going\u2026'
          : 'Hold the button to speak. Release when done.'}
      </p>

      {/* 3D Hold button */}
      <div className="absolute bottom-24 flex flex-col items-center">
        <button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className="relative select-none touch-none outline-none"
          style={{ width: 230, height: 230 }}
          aria-label={listening ? 'Release when done' : 'Hold to speak'}
        >
          {/* Shadow layer */}
          <div style={{
            position: 'absolute',
            width: 220, height: 220,
            left: 5,
            top: pressed ? 14 : 20,
            borderRadius: '50%',
            background: '#6B1E04',
            filter: 'blur(4px)',
            opacity: 0.8,
            transition: 'top 80ms ease',
          }} />
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              transform: pressed ? 'translateY(6px)' : 'translateY(0)',
              background: 'radial-gradient(circle at 38% 32%, #F07030 0%, #C84010 55%, #9B2E06 100%)',
              boxShadow: pressed
                ? '0 2px 12px rgba(200,64,16,0.4)'
                : '0 12px 32px rgba(200,64,16,0.45)',
              transition: 'transform 80ms ease, box-shadow 80ms ease',
            }}
          >
            <span
              className="font-semibold text-xl select-none text-center leading-tight"
              style={{ color: '#F5EDE0', letterSpacing: '-0.01em' }}
            >
              {listening ? 'Listening\u2026' : 'Hold to Speak'}
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}
