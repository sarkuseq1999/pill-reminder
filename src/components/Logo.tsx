interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Pill icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pill capsule shape - rotated 45 degrees */}
        <g transform="rotate(-45 24 24)">
          {/* Left half (indigo) */}
          <rect x="8" y="14" width="16" height="20" rx="10" fill="#6366f1" />
          {/* Right half (lighter) */}
          <rect x="24" y="14" width="16" height="20" rx="10" fill="#a5b4fc" />
          {/* Full capsule outline for clean shape */}
          <rect x="8" y="14" width="32" height="20" rx="10" fill="none" />
        </g>
        {/* Checkmark */}
        <path
          d="M20 25L23 28L29 21"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold text-slate-100 tracking-tight">
          Pill
          <span className="text-indigo-400">Reminder</span>
        </span>
      </div>
    </div>
  );
}
