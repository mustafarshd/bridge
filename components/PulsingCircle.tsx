export default function PulsingCircle() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <div className="pulse-circle" />
    </div>
  )
}
