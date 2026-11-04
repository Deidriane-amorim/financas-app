export default function Logo() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      role="img"
      aria-label="Gráfico de barras com uma moeda"
    >
      <rect width="52" height="52" rx="14" fill="#3b6fd6" />

      <rect x="11" y="30" width="7" height="12" rx="2" fill="#fff" opacity="0.55" />
      <rect x="22.5" y="23" width="7" height="19" rx="2" fill="#fff" opacity="0.8" />
      <rect x="34" y="16" width="7" height="26" rx="2" fill="#fff" />

      <circle cx="14" cy="14" r="7" fill="#f5b942" />
      <text
        x="14"
        y="18"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#7a4b00"
      >
        $
      </text>
    </svg>
  );
}