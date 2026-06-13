import React from 'react';

export default function Logo({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      {...props}
    >
      <defs>
        {/* Subtle shadow for the white squircle to float elegantly */}
        <filter id="logo-tile-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* White Rounded Square Container (App Icon Tile) */}
      <rect x="2" y="2" width="44" height="44" rx="9" fill="#FFFFFF" filter="url(#logo-tile-shadow)" />

      {/* Symmetrical, Aligned Circular Zen Swirl (Left/Upper Swirl - Grey) */}
      <path
        d="M 24,7 A 8.5,8.5 0 0,0 24,24 A 8.5,8.5 0 0,1 24,41 A 17,17 0 0,0 24,7 Z"
        fill="#555555"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Symmetrical, Aligned Circular Zen Swirl (Right/Lower Swirl - Black) */}
      <path
        d="M 24,41 A 8.5,8.5 0 0,0 24,24 A 8.5,8.5 0 0,1 24,7 A 17,17 0 0,0 24,41 Z"
        fill="#000000"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
