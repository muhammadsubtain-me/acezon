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

      {/* Solid Black Rounded Arch Logo */}
      <g transform="translate(-2, -2.78) scale(0.52)">
        <path
          d="M 21,77 C 17,83 24,85 27.5,79.5 C 35,69 42,49 50,49 C 58,49 65,69 72.5,79.5 C 76,85 83,83 79,77 C 72,61 63,20 50,20 C 37,20 28,61 21,77 Z"
          fill="#000000"
        />
      </g>
    </svg>
  );
}
