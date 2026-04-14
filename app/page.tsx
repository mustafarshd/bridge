'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import StepOne from '@/components/StepOne'
import SpeechStep from '@/components/SpeechStep'
import StepFour from '@/components/StepFour'
import { trackEvent } from '@/lib/track'

const RiveAnimation = dynamic(() => import('@/components/RiveAnimation'), { ssr: false })

type Screen = 'home' | 'step1' | 'step2' | 'step3' | 'step4'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home')

  const goTo = (next: Screen) => setScreen(next)

  const handleStart = () => {
    trackEvent('exercise_started')
    goTo('step1')
  }

  const handleStep1Done = () => {
    trackEvent('step_completed', 1)
    goTo('step2')
  }

  const handleStep2Done = () => {
    trackEvent('step_completed', 2)
    goTo('step3')
  }

  const handleStep3Done = () => {
    trackEvent('step_completed', 3)
    trackEvent('exercise_completed')
    goTo('step4')
  }

  return (
    <main className="relative h-dvh w-full max-w-[430px] mx-auto overflow-hidden" style={{ background: '#130803' }}>
      <Fade visible={screen === 'home'}>
        <HomeScreen onStart={handleStart} />
      </Fade>
      <Fade visible={screen === 'step1'}>
        <StepOne onComplete={handleStep1Done} />
      </Fade>
      <Fade visible={screen === 'step2'}>
        {screen === 'step2' && (
          <SpeechStep
            stepNumber={2}
            totalSteps={4}
            heading="Describe how you're feeling out loud."
            onComplete={handleStep2Done}
          />
        )}
      </Fade>
      <Fade visible={screen === 'step3'}>
        {screen === 'step3' && (
          <SpeechStep
            stepNumber={3}
            totalSteps={4}
            heading="Say out loud what you have to do next."
            onComplete={handleStep3Done}
          />
        )}
      </Fade>
      <Fade visible={screen === 'step4'}>
        <StepFour />
      </Fade>
    </main>
  )
}

function Fade({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {children}
    </div>
  )
}

function OrangeBlurs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div style={{
        position: 'absolute', top: '-15%', left: '-20%',
        width: '75vw', height: '75vw', borderRadius: '50%',
        background: '#C84010', opacity: 0.28, filter: 'blur(90px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', right: '-15%',
        width: '65vw', height: '65vw', borderRadius: '50%',
        background: '#8B2808', opacity: 0.35, filter: 'blur(80px)',
      }} />
    </div>
  )
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-between h-dvh w-full px-6 py-14">
      <OrangeBlurs />

      <div className="relative z-10 flex flex-col items-center gap-2 text-center pt-6">
        <h1 className="text-5xl font-semibold tracking-tight" style={{ color: '#F5EDE0' }}>
          Bridge
        </h1>
        <p className="text-base font-light max-w-[220px] leading-relaxed" style={{ color: 'rgba(245,237,224,0.55)' }}>
          A short exercise to shift your state and get moving.
        </p>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center">
        <RiveAnimation className="w-64 h-64" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 w-full">
        <p className="text-sm text-center" style={{ color: 'rgba(245,237,224,0.4)' }}>
          About 2 minutes. No account needed.
        </p>
        <button
          onClick={onStart}
          className="w-full max-w-xs py-4 rounded-2xl text-base font-semibold active:scale-95 transition-transform duration-150"
          style={{ background: '#C84010', color: '#F5EDE0' }}
        >
          Start
        </button>
      </div>
    </div>
  )
}

export { OrangeBlurs }
