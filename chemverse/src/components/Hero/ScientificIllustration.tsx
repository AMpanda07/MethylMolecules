'use client';

import styles from './ScientificIllustration.module.css';

/**
 * Scientific illustration for the hero section.
 * Built entirely in SVG — no external assets required.
 * Aesthetic: premium textbook / laboratory notebook sketch.
 */
export default function ScientificIllustration() {
  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 480 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DDE9FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F7F4EC" stopOpacity="0" />
          </radialGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#27200a" floodOpacity="0.08" />
          </filter>

          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="flaskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8DDFF" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#EFF5FF" stopOpacity="0.3"/>
          </linearGradient>

          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D6FE0" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#1E5FCC" stopOpacity="0.55"/>
          </linearGradient>
        </defs>

        {/* Background glow */}
        <ellipse cx="240" cy="280" rx="200" ry="200" fill="url(#bgGlow)" />

        {/* ── Erlenmeyer Flask ─────────────────────────────── */}
        <g filter="url(#softShadow)">
          {/* Flask body */}
          <path
            d="M195 170 L155 320 C145 345 160 370 185 375 L295 375 C320 370 335 345 325 320 L285 170 Z"
            fill="url(#flaskGrad)"
            stroke="#1A1A18"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Flask neck */}
          <rect x="207" y="110" width="66" height="62" rx="4"
            fill="url(#flaskGrad)"
            stroke="#1A1A18"
            strokeWidth="1.8"
          />
          {/* Flask rim */}
          <rect x="200" y="106" width="80" height="10" rx="4"
            fill="#EFEBDD"
            stroke="#1A1A18"
            strokeWidth="1.5"
          />

          {/* Liquid fill */}
          <path
            d="M165 320 C160 340 165 362 185 375 L295 375 C315 362 320 340 315 320 Z"
            fill="url(#liquidGrad)"
          />

          {/* Liquid surface wave */}
          <path
            d="M165 320 Q200 312 240 318 Q275 324 315 320"
            stroke="#2D6FE0"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Bubbles in liquid */}
          <circle cx="205" cy="348" r="5" fill="white" fillOpacity="0.35" />
          <circle cx="268" cy="358" r="4" fill="white" fillOpacity="0.25" />
          <circle cx="238" cy="340" r="3" fill="white" fillOpacity="0.30" />

          {/* Steam / vapor lines above flask */}
          <path d="M220 96 Q215 80 222 66" stroke="#7A766C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M240 92 Q236 72 243 55" stroke="#7A766C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3.5s" repeatCount="indefinite" begin="0.5s"/>
          </path>
          <path d="M260 96 Q266 78 258 62" stroke="#7A766C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2.8s" repeatCount="indefinite" begin="1s"/>
          </path>
        </g>

        {/* ── Water molecule (H₂O) floating upper-right ─────── */}
        <g transform="translate(340, 145)" filter="url(#glow)">
          {/* Oxygen */}
          <circle cx="0" cy="0" r="18" fill="#DDE9FF" stroke="#1E5FCC" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="600"
            fontFamily="Inter, sans-serif" fill="#1E5FCC">O</text>

          {/* H left */}
          <line x1="-18" y1="0" x2="-42" y2="-18" stroke="#4A4840" strokeWidth="1.4" />
          <circle cx="-52" cy="-22" r="12" fill="#F7F4EC" stroke="#4A4840" strokeWidth="1.4" />
          <text x="-52" y="-18" textAnchor="middle" fontSize="11" fontWeight="500"
            fontFamily="Inter, sans-serif" fill="#4A4840">H</text>

          {/* H right */}
          <line x1="18" y1="0" x2="42" y2="-18" stroke="#4A4840" strokeWidth="1.4" />
          <circle cx="52" cy="-22" r="12" fill="#F7F4EC" stroke="#4A4840" strokeWidth="1.4" />
          <text x="52" y="-18" textAnchor="middle" fontSize="11" fontWeight="500"
            fontFamily="Inter, sans-serif" fill="#4A4840">H</text>

          {/* H₂O label */}
          <text x="0" y="40" textAnchor="middle" fontSize="11" fontFamily="Inter, sans-serif"
            fill="#7A766C" fontStyle="italic">H₂O</text>
        </g>

        {/* ── CO₂ molecule lower-left ────────────────────────── */}
        <g transform="translate(82, 310)">
          {/* C center */}
          <circle cx="0" cy="0" r="15" fill="#E6F4E0" stroke="#5A9E4A" strokeWidth="1.4" />
          <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="600"
            fontFamily="Inter, sans-serif" fill="#3D7A30">C</text>

          {/* Double bond left */}
          <line x1="-15" y1="-3" x2="-37" y2="-3" stroke="#5A9E4A" strokeWidth="1.4" />
          <line x1="-15" y1="3" x2="-37" y2="3" stroke="#5A9E4A" strokeWidth="1.4" />
          <circle cx="-49" cy="0" r="13" fill="#FDECEA" stroke="#C0473A" strokeWidth="1.4" />
          <text x="-49" y="4" textAnchor="middle" fontSize="11" fontWeight="600"
            fontFamily="Inter, sans-serif" fill="#C0473A">O</text>

          {/* Double bond right */}
          <line x1="15" y1="-3" x2="37" y2="-3" stroke="#5A9E4A" strokeWidth="1.4" />
          <line x1="15" y1="3" x2="37" y2="3" stroke="#5A9E4A" strokeWidth="1.4" />
          <circle cx="49" cy="0" r="13" fill="#FDECEA" stroke="#C0473A" strokeWidth="1.4" />
          <text x="49" y="4" textAnchor="middle" fontSize="11" fontWeight="600"
            fontFamily="Inter, sans-serif" fill="#C0473A">O</text>

          {/* CO₂ label */}
          <text x="0" y="28" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif"
            fill="#7A766C" fontStyle="italic">CO₂</text>
        </g>

        {/* ── Handwritten annotation ────────────────────────── */}
        <g transform="translate(310, 290)">
          <rect x="-8" y="-8" width="130" height="54" rx="4"
            fill="#FDFBF5"
            stroke="rgba(54,49,39,0.2)"
            strokeWidth="1"
          />
          <text x="8" y="12" fontSize="10" fontFamily="Georgia, serif"
            fill="#7A766C" fontStyle="italic">Found in every</text>
          <text x="8" y="26" fontSize="10" fontFamily="Georgia, serif"
            fill="#7A766C" fontStyle="italic">living thing!</text>
          {/* small arrow pointing down-left */}
          <path d="M10 40 Q20 54 30 62" stroke="#ABA79E" strokeWidth="1.2" strokeLinecap="round" markerEnd="url(#arrowhead)" />
        </g>

        {/* ── Periodic table mini snippet ───────────────────── */}
        <g transform="translate(310, 390)" filter="url(#softShadow)">
          <rect x="0" y="0" width="140" height="98" rx="6"
            fill="#FDFBF5" stroke="rgba(54,49,39,0.2)" strokeWidth="1" />

          {/* mini element cells */}
          {[
            { x:8,  y:8,  n:'H',  num:'1',  clr:'#C0473A' },
            { x:48, y:8,  n:'He', num:'2',  clr:'#7B5EA7' },
            { x:8,  y:52, n:'Li', num:'3',  clr:'#C0473A' },
            { x:48, y:52, n:'Be', num:'4',  clr:'#B86820' },
            { x:88, y:8,  n:'C',  num:'6',  clr:'#5A9E4A' },
            { x:88, y:52, n:'N',  num:'7',  clr:'#5A9E4A' },
          ].map(({ x, y, n, num, clr }) => (
            <g key={n} transform={`translate(${x},${y})`}>
              <rect width="32" height="36" rx="3"
                fill={clr + '18'} stroke={clr + '55'} strokeWidth="1" />
              <text x="5" y="10" fontSize="6" fontFamily="Inter, sans-serif"
                fill={clr} fontWeight="600">{num}</text>
              <text x="16" y="26" textAnchor="middle" fontSize="13" fontWeight="700"
                fontFamily="Inter, sans-serif" fill={clr}>{n}</text>
            </g>
          ))}

          <text x="70" y="92" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif"
            fill="#ABA79E">118 elements</text>
        </g>

        {/* ── Small orbital sketch ───────────────────────────── */}
        <g transform="translate(90, 140)" opacity="0.55">
          <circle cx="0" cy="0" r="8" fill="#DDE9FF" stroke="#1E5FCC" strokeWidth="1.2"/>
          <ellipse cx="0" cy="0" rx="30" ry="10" stroke="#1E5FCC" strokeWidth="1"
            strokeDasharray="4 3"/>
          <ellipse cx="0" cy="0" rx="30" ry="10" stroke="#1E5FCC" strokeWidth="1"
            strokeDasharray="4 3" transform="rotate(60)"/>
          <ellipse cx="0" cy="0" rx="30" ry="10" stroke="#1E5FCC" strokeWidth="1"
            strokeDasharray="4 3" transform="rotate(120)"/>
          <circle cx="30" cy="0" r="4" fill="#1E5FCC" fillOpacity="0.6"/>
          <circle cx="-15" cy="-26" r="4" fill="#1E5FCC" fillOpacity="0.6"/>
        </g>

        {/* floating element symbol */}
        <text x="62" y="200" fontSize="13" fontFamily="Georgia,serif"
          fill="#ABA79E" fontStyle="italic" opacity="0.7">Fe</text>
        <text x="390" y="390" fontSize="11" fontFamily="Georgia,serif"
          fill="#ABA79E" fontStyle="italic" opacity="0.6">Au</text>
        <text x="120" y="420" fontSize="10" fontFamily="Georgia,serif"
          fill="#ABA79E" fontStyle="italic" opacity="0.6">NaCl</text>
      </svg>
    </div>
  );
}
