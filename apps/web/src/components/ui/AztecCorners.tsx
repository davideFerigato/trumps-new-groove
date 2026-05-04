export default function AztecCorners() {
  return (
    <>
      {/* Top-left corner */}
      <svg
        className="absolute top-0 left-0 w-8 h-8 -translate-x-1 -translate-y-1"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0 L12 0 L12 4 L4 4 L4 12 L0 12 Z" fill="var(--color-gold-500)" />
        <path d="M2 2 L4 2 L4 4 L2 4 Z" fill="var(--color-surface-dark)" />
      </svg>
      {/* Top-right corner */}
      <svg
        className="absolute top-0 right-0 w-8 h-8 translate-x-1 -translate-y-1"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 0 L20 0 L20 4 L28 4 L28 12 L32 12 Z" fill="var(--color-gold-500)" />
        <path d="M30 2 L28 2 L28 4 L30 4 Z" fill="var(--color-surface-dark)" />
      </svg>
      {/* Bottom-left corner */}
      <svg
        className="absolute bottom-0 left-0 w-8 h-8 -translate-x-1 translate-y-1"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 32 L12 32 L12 28 L4 28 L4 20 L0 20 Z" fill="var(--color-gold-500)" />
        <path d="M2 30 L4 30 L4 28 L2 28 Z" fill="var(--color-surface-dark)" />
      </svg>
      {/* Bottom-right corner */}
      <svg
        className="absolute bottom-0 right-0 w-8 h-8 translate-x-1 translate-y-1"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 32 L20 32 L20 28 L28 28 L28 20 L32 20 Z" fill="var(--color-gold-500)" />
        <path d="M30 30 L28 30 L28 28 L30 28 Z" fill="var(--color-surface-dark)" />
      </svg>
    </>
  );
}