// 위에서 본 방석과 좌우 압력을 보여 주는 그림입니다. left/right는 0~100 사이 값입니다.
export function PressureMap({ left, right }: { left: number; right: number }) {
  const blob = (value: number) => ({
    opacity: value === 0 ? 0 : 0.25 + (value / 100) * 0.9,
    r: 34 + (value / 100) * 46,
  })
  const l = blob(left)
  const r = blob(right)

  return (
    <svg viewBox="0 0 320 260" className="pressure-svg" aria-hidden="true">
      <defs>
        <radialGradient id="heat" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff3b30" />
          <stop offset="0.45" stopColor="#ff9f0a" />
          <stop offset="0.8" stopColor="#0066cc" stopOpacity="0.6" />
          <stop offset="1" stopColor="#0066cc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="20" y="20" width="280" height="220" rx="56" fill="#2c2c2e" />
      <rect
        x="34"
        y="34"
        width="252"
        height="192"
        rx="44"
        fill="none"
        stroke="#48484a"
        strokeWidth="2"
        strokeDasharray="5 7"
      />
      <circle className="heat" cx="110" cy="140" r={l.r} fill="url(#heat)" opacity={l.opacity} />
      <circle className="heat" cx="210" cy="140" r={r.r} fill="url(#heat)" opacity={r.opacity} />
      <line x1="160" y1="44" x2="160" y2="216" stroke="#48484a" strokeWidth="2" />
      <text x="70" y="70" fill="#a1a1a6" fontSize="14" fontWeight="700">
        왼쪽
      </text>
      <text x="250" y="70" fill="#a1a1a6" fontSize="14" fontWeight="700" textAnchor="end">
        오른쪽
      </text>
    </svg>
  )
}
