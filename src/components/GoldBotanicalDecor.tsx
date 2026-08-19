export function GoldBotanicalDecor({ position }: { position: 'left' | 'right' }) {
  return (
    <div
      className={`absolute top-0 ${
        position === 'left' ? 'left-0' : 'right-0'
      } pointer-events-none z-10 w-28 sm:w-36 md:w-44 opacity-85 select-none`}
    >
      <svg
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${position === 'right' ? '-scale-x-100' : ''}`}
      >
        <defs>
          <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#eab308" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#ca8a04" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#854d0e" stopOpacity="0.3" />
          </linearGradient>
          <filter id={`goldGlow-${position}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g stroke={`url(#goldGrad-${position})`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" filter={`url(#goldGlow-${position})`}>
          {/* Main Arched Stem */}
          <path d="M 0 0 C 30 15, 75 25, 120 15 C 135 12, 148 7, 155 2" />
          <path d="M 0 15 C 40 30, 85 45, 130 35 C 145 30, 152 24, 158 18" strokeWidth="0.9" opacity="0.8" />
          <path d="M 0 35 C 35 55, 70 70, 110 65 C 130 62, 145 50, 150 40" strokeWidth="0.8" opacity="0.6" />

          {/* Botanical Delicate Leaves and Berries */}
          <path d="M 25 12 C 28 5, 36 6, 38 15 C 34 20, 26 18, 25 12 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.3" />
          <path d="M 45 18 C 50 10, 58 12, 60 22 C 55 26, 47 24, 45 18 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.35" />
          <path d="M 70 20 C 76 11, 86 14, 88 24 C 82 28, 73 26, 70 20 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.4" />
          <path d="M 95 18 C 102 8, 112 12, 113 22 C 107 26, 98 25, 95 18 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.4" />
          <path d="M 120 14 C 127 5, 136 8, 136 17 C 131 22, 122 20, 120 14 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.35" />

          {/* Lower Drooping Leaves */}
          <path d="M 30 25 C 28 35, 34 42, 42 39 C 43 32, 38 26, 30 25 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.3" />
          <path d="M 55 35 C 52 46, 60 54, 68 50 C 69 42, 64 36, 55 35 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.35" />
          <path d="M 80 43 C 78 56, 88 64, 96 58 C 96 49, 90 43, 80 43 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.3" />
          <path d="M 105 45 C 104 57, 114 62, 120 56 C 120 49, 113 44, 105 45 Z" fill={`url(#goldGrad-${position})`} fillOpacity="0.25" />

          {/* Delicate Fine Tendrils & Little Gold Buds */}
          <circle cx="40" cy="8" r="2" fill={`url(#goldGrad-${position})`} />
          <circle cx="63" cy="14" r="2.2" fill={`url(#goldGrad-${position})`} />
          <circle cx="91" cy="15" r="2" fill={`url(#goldGrad-${position})`} />
          <circle cx="116" cy="11" r="1.8" fill={`url(#goldGrad-${position})`} />
          <circle cx="140" cy="9" r="1.5" fill={`url(#goldGrad-${position})`} />

          <circle cx="45" cy="42" r="1.8" fill={`url(#goldGrad-${position})`} />
          <circle cx="72" cy="53" r="2" fill={`url(#goldGrad-${position})`} />
          <circle cx="100" cy="60" r="1.8" fill={`url(#goldGrad-${position})`} />
        </g>
      </svg>
    </div>
  );
}
