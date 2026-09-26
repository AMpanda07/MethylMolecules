interface IconProps {
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

export default function AtomIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Nucleus */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {/* Orbit 1 (horizontal ellipse) */}
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85"/>
      {/* Orbit 2 (tilted 60deg) */}
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" transform="rotate(60 12 12)"/>
      {/* Orbit 3 (tilted 120deg) */}
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" transform="rotate(120 12 12)"/>
    </svg>
  );
}
