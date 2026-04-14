'use client'

import { useEffect, useRef, useState } from 'react'

interface StepOneProps {
  onComplete: () => void
}

const MOVEMENT_GOAL = 300
const MOVEMENT_THRESHOLD = 0.9

type Status = 'needs-permission' | 'listening' | 'unsupported' | 'denied'

export default function StepOne({ onComplete }: StepOneProps) {
  const [status, setStatus] = useState<Status>('listening')
  const handlerRef = useRef<((e: DeviceMotionEvent) => void) | null>(null)
  const scoreRef = useRef(0)
  const [moved, setMoved] = useState(false)

  const startListening = () => {
    const handler = (e: DeviceMotionEvent) => {
      if (moved) return
      const a = e.acceleration
      const ag = e.accelerationIncludingGravity
      let mag = 0
      if (a && (a.x !== null || a.y !== null || a.z !== null)) {
        mag = Math.sqrt((a.x ?? 0) ** 2 + (a.y ?? 0) ** 2 + (a.z ?? 0) ** 2)
      } else if (ag) {
        const raw = Math.sqrt((ag.x ?? 0) ** 2 + (ag.y ?? 0) ** 2 + (ag.z ?? 0) ** 2)
        mag = Math.abs(raw - 9.81)
      }
      if (mag > MOVEMENT_THRESHOLD) {
        scoreRef.current += 1
        if (scoreRef.current >= MOVEMENT_GOAL) setMoved(true)
      }
    }
    handlerRef.current = handler
    window.addEventListener('devicemotion', handler)
    setStatus('listening')
  }

  useEffect(() => {
    if (typeof window === 'undefined' || typeof DeviceMotionEvent === 'undefined') {
      setStatus('unsupported')
      return
    }
    type DME = typeof DeviceMotionEvent & { requestPermission?: () => Promise<string> }
    if (typeof (DeviceMotionEvent as DME).requestPermission === 'function') {
      setStatus('needs-permission')
    } else {
      startListening()
    }
    return () => {
      if (handlerRef.current) window.removeEventListener('devicemotion', handlerRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const requestPermission = async () => {
    type DME = typeof DeviceMotionEvent & { requestPermission: () => Promise<string> }
    try {
      const result = await (DeviceMotionEvent as DME).requestPermission()
      if (result === 'granted') startListening()
      else setStatus('denied')
    } catch {
      setStatus('denied')
    }
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center h-dvh w-full px-6 gap-10"
      style={{ background: '#130803' }}
    >
      {/* Blur layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute', top: '-10%', right: '-20%',
          width: '70vw', height: '70vw', borderRadius: '50%',
          background: '#C84010', opacity: 0.3, filter: 'blur(90px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-20%',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: '#8B2808', opacity: 0.3, filter: 'blur(80px)',
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(245,237,224,0.4)' }}>
          Step 1 of 4
        </p>
        <h1 className="text-3xl font-semibold leading-snug max-w-xs" style={{ color: '#F5EDE0' }}>
          Shift your state. Walk around for a bit.
        </h1>
        <p className="text-base" style={{ color: 'rgba(245,237,224,0.55)' }}>
          Come back when you&apos;re ready.
        </p>
      </div>

      {status === 'needs-permission' && (
        <button
          onClick={requestPermission}
          className="relative z-10 px-6 py-3 rounded-2xl text-base font-semibold"
          style={{ background: '#C84010', color: '#F5EDE0' }}
        >
          Allow motion sensor
        </button>
      )}

      {status !== 'needs-permission' && (
        <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-xs">
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl text-base font-semibold active:scale-95 transition-transform duration-150"
            style={{ background: '#C84010', color: '#F5EDE0' }}
          >
            I&apos;m up
          </button>
        </div>
      )}
    </div>
  )
}
