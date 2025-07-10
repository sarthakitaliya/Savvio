export const Logo = () => {
  return (
    <svg
      width="55"
      height="40"
      viewBox="0 0 55 40"
      className="align-middle"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Savvio Logo Option 1"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <path
        d="M8 10 Q8 7 12 7 H20 L23 10 H38 Q42 10 42 14 V30 Q42 34 38 34 H12 Q8 34 8 30 Z"
        fill="url(#grad1)"
      />
      <line
        x1="12"
        y1="18"
        x2="36"
        y2="18"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <line
        x1="12"
        y1="22"
        x2="30"
        y2="22"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <line
        x1="12"
        y1="26"
        x2="34"
        y2="26"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.8"
      />
    </svg>
  );
};