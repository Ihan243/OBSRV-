import React, { useEffect, useState } from 'react';
import { GarmentSVG } from './GarmentSVG';

// Optional official image; retain the illustrated garment when an asset is absent or fails.
export function GarmentMedia({ product, className = 'w-full h-full object-contain drop-shadow-2xl', eager = false }) {
  const source = product?.rackImage || product?.image || null;
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [source]);
  if (!product) return null;
  if (source && !failed) {
    return <img src={source} alt="" draggable={false} loading={eager ? 'eager' : 'lazy'}
      decoding="async" onError={() => setFailed(true)} className={className} />;
  }
  return <GarmentSVG product={product} className="w-full h-full drop-shadow-2xl select-none" />;
}
