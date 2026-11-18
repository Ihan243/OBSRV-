import React from 'react';

// Tonal fabric lighting: preserves the original OBSRV garment designs and details.
const shadeFabric = (value, offset) => {
  const hex = value.replace('#', '');
  if (!/^[a-f0-9]{6}$/i.test(hex)) return value;
  return '#' + [0, 2, 4].map((i) => Math.max(0, Math.min(255,
    parseInt(hex.slice(i, i + 2), 16) + offset)).toString(16).padStart(2, '0')).join('');
};
const FabricGradient = ({ product }) => (
  <defs>
    <linearGradient id={'obsrv-fabric-' + product.id} x1="0%" y1="0%" x2="100%" y2="15%">
      <stop offset="0%" stopColor={shadeFabric(product.mainColor, -15)} />
      <stop offset="19%" stopColor={shadeFabric(product.mainColor, 12)} />
      <stop offset="39%" stopColor={shadeFabric(product.mainColor, -6)} />
      <stop offset="66%" stopColor={shadeFabric(product.mainColor, 22)} />
      <stop offset="84%" stopColor={shadeFabric(product.mainColor, -7)} />
      <stop offset="100%" stopColor={shadeFabric(product.mainColor, -23)} />
    </linearGradient>
  </defs>
);
const FabricFolds = ({ product }) => {
  const light = product.mainColor.toLowerCase() === '#d9d6ce';
  const gleam = light ? '#191919' : '#f6f6f6';
  return (
    <g pointerEvents="none">
      <path d="M97 116 C109 166 99 253 113 334" stroke={gleam} strokeWidth="9"
        opacity={light ? '.12' : '.05'} strokeLinecap="round" fill="none" />
      <path d="M221 116 C205 178 217 263 200 335" stroke={gleam} strokeWidth="12"
        opacity={light ? '.13' : '.06'} strokeLinecap="round" fill="none" />
      <path d="M138 143 C145 192 128 244 142 326" stroke="#000000" strokeWidth="8"
        opacity=".12" strokeLinecap="round" fill="none" />
    </g>
  );
};

const FabricSurface = ({ product }) => {
  const id = product.id;
  let silhouette;
  if (product.type === 'hoodie') {
    silhouette = 'M60 90 L15 220 L55 235 L85 140 L80 90 C120 70 200 70 240 90 L235 140 L265 235 L305 220 L260 90 L255 350 Q160 366 65 350 Z';
  } else if (product.type === 'jacket') {
    silhouette = 'M65 95 L20 230 L60 240 L90 145 L70 90 H250 L230 145 L260 240 L300 230 L255 95 L250 350 H70 Z';
  } else if (product.type === 'pants') {
    silhouette = 'M90 80 H230 V108 L240 360 H185 L165 180 H155 L135 360 H80 L90 108 Z';
  } else {
    silhouette = 'M60 90 L10 180 L65 195 L90 130 L85 90 Q160 70 235 90 L230 130 L255 195 L310 180 L260 90 L245 340 H75 Z';
  }
  return (
    <g pointerEvents="none">
      <defs>
        <clipPath id={'obsrv-cloth-mask-' + id}><path d={silhouette}/></clipPath>
        <filter id={'obsrv-grain-' + id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".34" numOctaves="3" seed="8" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <g clipPath={'url(#obsrv-cloth-mask-' + id + ')'}>
        <rect x="0" y="0" width="320" height="400" filter={'url(#obsrv-grain-' + id + ')'}
          opacity=".075" style={{ mixBlendMode: 'soft-light' }} />
        <path d="M73 90 C104 188 100 285 109 347" stroke="#fff"
          strokeWidth="14" opacity=".028" fill="none" />
        <path d="M232 94 C200 164 215 256 196 351" stroke="#000"
          strokeWidth="18" opacity=".14" fill="none" />
        <path d="M159 103 C163 175 151 252 168 349" stroke="#fff"
          strokeWidth="4" opacity=".045" fill="none" />
      </g>
    </g>
  );
};

export const GarmentSVG = ({ product, className = "w-full h-full drop-shadow-2xl select-none" }) => {
  if (!product) return null;

  const isLight =
    product.mainColor.toLowerCase() === '#d9d6ce' ||
    product.mainColor.toLowerCase() === '#f2f0ea';
  const textColor = isLight ? '#0B0B0B' : '#F2F0EA';
  const detailColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)';

  if (product.type === 'hoodie') {
    return (
      <svg
        viewBox="0 0 320 400"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <FabricGradient product={product} />
        <defs>
          <linearGradient
            id={`grad-hoodie-${product.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={product.mainColor} />
            <stop offset="70%" stopColor={product.mainColor} />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <filter
            id={`fabric-${product.id}`}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"
            />
            <feBlend mode="multiply" in="SourceGraphic" result="blend" />
          </filter>
        </defs>

        {/* Sleeves Behind/Spread */}
        <path
          d="M 60 90 L 15 220 L 55 235 L 85 140 Z"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke="#1f1f1f"
          strokeWidth="1.5"
        />
        <path
          d="M 260 90 L 305 220 L 265 235 L 235 140 Z"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke="#1f1f1f"
          strokeWidth="1.5"
        />

        {/* Main Torso */}
        <path
          d="M 80 90 C 120 70 200 70 240 90 L 255 350 C 210 355 110 355 65 350 Z"
          fill={`url(#grad-hoodie-${product.id})`}
          stroke="#222"
          strokeWidth="2"
        />

        {/* Ribbed Hem */}
        <rect
          x="68"
          y="340"
          width="184"
          height="24"
          rx="2"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke={detailColor}
          strokeWidth="1.5"
        />

        {/* Kangaroo Pocket */}
        <path
          d="M 95 240 L 225 240 L 240 330 L 80 330 Z"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke={detailColor}
          strokeWidth="2"
        />
        <path d="M 80 260 L 98 320" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
        <path d="M 240 260 L 222 320" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />

        {/* Large Dramatic Hood Behind Collar */}
        <path
          d="M 105 85 C 105 35 215 35 215 85 C 190 100 130 100 105 85 Z"
          fill="#0d0d0d"
          stroke="#252525"
          strokeWidth="2"
        />
        <path
          d="M 130 90 C 145 115 175 115 190 90"
          fill="none"
          stroke={product.accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <FabricFolds product={product} />
        <FabricSurface product={product} />
        {/* Official OBSRV® Graphic on Chest / Back */}
        <g transform="translate(110, 150)">
          <text
            x="50"
            y="25"
            textAnchor="middle"
            fontFamily="'Syncopate', sans-serif"
            fontWeight="700"
            fontSize="12"
            fill={textColor}
            letterSpacing="4"
          >
            OBSRV®
          </text>
          <text
            x="50"
            y="42"
            textAnchor="middle"
            fontFamily="'Bodoni Moda', serif"
            fontStyle="italic"
            fontSize="9"
            fill={product.accentColor}
            letterSpacing="1"
          >
            FEW OBSRV
          </text>
          <line
            x1="20"
            y1="52"
            x2="80"
            y2="52"
            stroke={textColor}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="6"
            fill={textColor}
            opacity="0.6"
            letterSpacing="2"
          >
            09°56'N 84°05'W
          </text>
        </g>
      </svg>
    );
  }

  if (product.type === 'jacket') {
    return (
      <svg
        viewBox="0 0 320 400"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <FabricGradient product={product} />
        {/* Workwear Jacket Sleeves */}
        <path
          d="M 65 95 L 20 230 L 60 240 L 90 145 Z"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />
        <path
          d="M 255 95 L 300 230 L 260 240 L 230 145 Z"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />

        {/* Body */}
        <rect
          x="70"
          y="90"
          width="180"
          height="260"
          rx="4"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke="#282828"
          strokeWidth="2"
        />

        {/* Metallic Center Zipper */}
        <line
          x1="160"
          y1="120"
          x2="160"
          y2="350"
          stroke="#888888"
          strokeWidth="3.5"
          strokeDasharray="2,1"
        />

        {/* Shirt Collar */}
        <polygon points="120,90 160,120 100,120" fill="#242424" stroke="#333" />
        <polygon points="200,90 160,120 220,120" fill="#242424" stroke="#333" />

        {/* Pockets */}
        <rect
          x="85"
          y="150"
          width="55"
          height="65"
          rx="3"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.5"
        />
        <rect
          x="180"
          y="150"
          width="55"
          height="65"
          rx="3"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.5"
        />
        <rect
          x="85"
          y="245"
          width="60"
          height="75"
          rx="3"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.5"
        />
        <rect
          x="175"
          y="245"
          width="60"
          height="75"
          rx="3"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.5"
        />

        <FabricFolds product={product} />
        <FabricSurface product={product} />
        {/* OBSRV Minimal Label */}
        <rect
          x="90"
          y="190"
          width="28"
          height="12"
          fill="#000"
          stroke="#fff"
          strokeWidth="0.5"
        />
        <text
          x="104"
          y="199"
          textAnchor="middle"
          fontFamily="'Space Grotesk'"
          fontSize="5"
          fill="#fff"
          fontWeight="bold"
        >
          OBSRV
        </text>
      </svg>
    );
  }

  if (product.type === 'pants') {
    return (
      <svg
        viewBox="0 0 320 400"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <FabricGradient product={product} />
        {/* Waistband */}
        <rect
          x="90"
          y="80"
          width="140"
          height="28"
          rx="2"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke="#222"
          strokeWidth="1.5"
        />
        <line
          x1="90"
          y1="94"
          x2="230"
          y2="94"
          stroke={detailColor}
          strokeWidth="1"
        />
        {/* Legs */}
        <path
          d="M 90 108 L 80 360 L 135 360 L 155 180 L 165 180 L 185 360 L 240 360 L 230 108 Z"
          fill={'url(#obsrv-fabric-' + product.id + ')'}
          stroke="#262626"
          strokeWidth="1.5"
        />
        {/* Cargo Pockets */}
        <rect
          x="72"
          y="180"
          width="30"
          height="50"
          rx="2"
          fill="#181818"
          stroke="#333"
          strokeWidth="1.5"
        />
        <rect
          x="218"
          y="180"
          width="30"
          height="50"
          rx="2"
          fill="#181818"
          stroke="#333"
          strokeWidth="1.5"
        />
        <FabricFolds product={product} />
        <FabricSurface product={product} />
        {/* Drawstring hanging */}
        <path
          d="M 155 100 Q 150 140 148 160"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 165 100 Q 170 140 172 160"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x="160"
          y="270"
          textAnchor="middle"
          fontFamily="'Syncopate'"
          fontSize="8"
          fill="#555"
          letterSpacing="3"
        >
          OBSRV®
        </text>
      </svg>
    );
  }

  // High quality Oversized T-Shirt / Crewneck
  return (
    <svg
      viewBox="0 0 320 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
        <FabricGradient product={product} />
      {/* Wide Dropped Sleeves */}
      <path
        d="M 60 90 L 10 180 L 65 195 L 90 130 Z"
        fill={'url(#obsrv-fabric-' + product.id + ')'}
        stroke="#222"
        strokeWidth="1.2"
      />
      <path
        d="M 260 90 L 310 180 L 255 195 L 230 130 Z"
        fill={'url(#obsrv-fabric-' + product.id + ')'}
        stroke="#222"
        strokeWidth="1.2"
      />

      {/* Boxy Torso */}
      <path
        d="M 85 90 C 130 80 190 80 235 90 L 245 340 L 75 340 Z"
        fill={'url(#obsrv-fabric-' + product.id + ')'}
        stroke="#242424"
        strokeWidth="1.5"
      />

      {/* Chunky Collar Rib */}
      <path
        d="M 125 85 C 140 102 180 102 195 85 C 180 75 140 75 125 85 Z"
        fill="#0f0f0f"
        stroke="#333"
        strokeWidth="2"
      />

      <FabricFolds product={product} />
        <FabricSurface product={product} />
        {/* Graphic Motif */}
      <g transform="translate(100, 140)">
        <rect
          x="10"
          y="0"
          width="100"
          height="120"
          fill="none"
          stroke={textColor}
          strokeWidth="0.8"
          opacity="0.2"
        />
        <text
          x="60"
          y="40"
          textAnchor="middle"
          fontFamily="'Syncopate', sans-serif"
          fontWeight="700"
          fontSize="11"
          fill={textColor}
          letterSpacing="3"
        >
          OBSRV
        </text>
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontFamily="'Bodoni Moda', serif"
          fontStyle="italic"
          fontSize="18"
          fill={product.accentColor}
        >
          CR.04
        </text>
        <text
          x="60"
          y="90"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="7"
          fill={textColor}
          letterSpacing="2"
        >
          SAN JOSÉ URBAN STUDY
        </text>
      </g>
    </svg>
  );
};
