import React, { useEffect, useState } from 'react';
import { GarmentSVG } from './GarmentSVG';

/** Supports official product imagery, demo atlas, and safe SVG fallback. */
export function GarmentMedia({ product, className = 'w-full h-full object-contain drop-shadow-2xl', eager = false }) {
  const source = product?.rackImage || product?.image || null;
  const sprite = product?.demoSprite;
  const identity = source || (sprite ? sprite.src + '#' + sprite.index : '');
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [identity]);
  if (!product) return null;
  if (source && !failed) {
    return <img src={source} alt="" draggable={false} loading={eager ? 'eager' : 'lazy'}
      decoding="async" onError={() => setFailed(true)} className={className} />;
  }
  if (sprite && !failed) {
    const col = sprite.index % 3;
    const row = Math.floor(sprite.index / 3);
    return (
      <span className="obsrv-demo-sprite" role="img" aria-label="Mockup ilustrativo de la prenda">
        <img src={sprite.src} alt="" draggable={false} loading={eager ? 'eager' : 'lazy'}
          decoding="async" onError={() => setFailed(true)}
          style={{ position: 'absolute', width: '300%', height: '200%', maxWidth: 'none',
            left: '-' + (col * 100) + '%', top: '-' + (row * 100) + '%' }} />
      </span>
    );
  }
  return <GarmentSVG product={product} className="w-full h-full drop-shadow-2xl select-none" />;
}
