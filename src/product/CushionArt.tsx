// 제품 사진이 아직 없어서 쓰는 방석 일러스트입니다. 실제 사진이 생기면 이 자리를 바꾸세요.
export function CushionArt() {
  return (
    <svg viewBox="0 0 640 380" role="img" aria-label="의자 위에 올려 둔 HURI UP 스마트 방석 일러스트">
      <defs>
        <linearGradient id="cushion-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3c" />
          <stop offset="1" stopColor="#1d1d1f" />
        </linearGradient>
        <linearGradient id="cushion-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1d1f" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <radialGradient id="cushion-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0066cc" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0066cc" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="320" cy="330" rx="250" ry="26" fill="#000" opacity="0.08" />

      {/* 옆면 */}
      <path
        d="M90 190 Q90 290 150 300 L490 300 Q550 290 550 190 L550 220 Q550 320 490 330 L150 330 Q90 320 90 220 Z"
        fill="url(#cushion-side)"
      />
      {/* 윗면 */}
      <path
        d="M150 90 L490 90 Q560 95 552 190 Q545 290 490 300 L150 300 Q95 290 88 190 Q80 95 150 90 Z"
        fill="url(#cushion-top)"
      />
      {/* 박음질 */}
      <path
        d="M162 112 L478 112 Q530 118 526 190 Q521 268 478 278 L162 278 Q119 268 114 190 Q110 118 162 112 Z"
        fill="none"
        stroke="#6e6e73"
        strokeWidth="2"
        strokeDasharray="6 8"
      />

      {/* 압력 감지 영역 (좌우) */}
      <ellipse cx="250" cy="200" rx="70" ry="52" fill="url(#cushion-glow)" />
      <ellipse cx="390" cy="200" rx="70" ry="52" fill="url(#cushion-glow)" />

      {/* 진동 표시 */}
      <g stroke="#0066cc" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M585 150 Q600 190 585 230" />
        <path d="M605 135 Q628 190 605 245" />
        <path d="M55 150 Q40 190 55 230" />
        <path d="M35 135 Q12 190 35 245" />
      </g>

      <text x="320" y="262" textAnchor="middle" fill="#a1a1a6" fontSize="18" fontWeight="700" letterSpacing="4">
        HURI UP
      </text>
    </svg>
  )
}
