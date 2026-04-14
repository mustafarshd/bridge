export default function PulsingCircle() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden
    >
      <div
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: '#F16C13',
          filter: 'blur(72px)',
          animationName: 'pulse-glow',
          animationDuration: '2.4s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}
      />
    </div>
  )
}
