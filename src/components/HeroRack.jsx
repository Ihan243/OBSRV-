import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { GarmentMedia } from './GarmentMedia';

export const HeroRack = ({ onSelectProduct }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-gradient-to-b from-obsrv-black via-[#0d0d0d] to-obsrv-black" id="perchero">
      {/* Ambient Background Light & Grid */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-40"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-white/[0.03] to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Editorial Header within Hero */}
      <div className="max-w-[1600px] mx-auto w-full px-6 pt-6 text-center z-10">
        <div className="inline-flex items-center space-x-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-obsrv-white/80 font-mono">
            DIGITAL SHOWROOM • INTERACTIVE RACK
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-obsrv-white">
          EVERYONE LOOKS. <span className="italic font-normal font-serif text-neutral-400">FEW OBSRV.</span>
        </h1>
        <p className="text-xs uppercase tracking-[0.35em] text-obsrv-muted mt-2 font-mono">
          Haz hover sobre las prendas para examinarlas • Clic para expandir el visor inmersivo
        </p>
      </div>

      {/* MAIN RACK CONTAINER */}
      <div className="relative w-full max-w-[1550px] mx-auto px-4 my-auto py-10 z-10">
        {/* Thin chrome rail with cylindrical end caps and integrated hooks. */}
        <div className="obsrv-motion-scroll" aria-label="Perchero de prendas OBSRV">
          <div className="obsrv-rack-assembly">
            <div className="obsrv-rack-rail-frame" aria-hidden="true">
              <div className="obsrv-rack-rail-bar" />
              <span className="obsrv-rack-rail-cap obsrv-rack-rail-cap--left" />
              <span className="obsrv-rack-rail-cap obsrv-rack-rail-cap--right" />
            </div>

        {/* The hang point is fixed: only the garment turns from profile to front. */}
          <div
            className={'obsrv-motion-rack' + (hoveredIndex !== null ? ' is-hovering' : '')}
            id="rackGarmentsList"
            role="group"
            onPointerLeave={() => setHoveredIndex(null)}
          >
            {PRODUCTS.map((prod, index) => {
              const active = hoveredIndex === index;
              const hasPhotoHanger = (prod.rackImage || prod.demoSprite) && prod.rackHangerIncluded;
              const angle = (index % 2 === 0 ? -1 : 1) * (69 + (index % 3) * 3);
              return (
                <button
                  type="button"
                  key={prod.id}
                  className={'obsrv-motion-item' + (active ? ' is-active' : '')}
                  style={{
                    '--obsrv-rest-angle': angle + 'deg',
                    '--obsrv-rest-scale': prod.scale || 1,
                    zIndex: active ? 90 : 10 + index,
                  }}
                  aria-label={'Ver ' + prod.title + ', ' + prod.priceFormatted}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'touch') setHoveredIndex(index);
                  }}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex((current) => current === index ? null : current)}
                  onClick={() => onSelectProduct(index)}
                >
                  {/* Metal hook remains anchored to the rail while the garment rotates. */}
                  <span className="obsrv-motion-hook" aria-hidden="true">
                    <svg viewBox="0 0 100 95" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={'obsrv-chrome-hook-' + prod.id} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b3e41" />
                          <stop offset="23%" stopColor="#eee" />
                          <stop offset="55%" stopColor="#8a8c8f" />
                          <stop offset="80%" stopColor="#f5f5f5" />
                          <stop offset="100%" stopColor="#45484b" />
                        </linearGradient>
                      </defs>
                      <path d="M49 10 C40 9 37 15 38 21 C39 27 51 28 55 35 C60 42 51 48 51 55 L51 72"
                        fill="none" stroke={'url(#obsrv-chrome-hook-' + prod.id + ')'}
                        strokeWidth="2.65" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                  <span className="obsrv-motion-swing" aria-hidden="true">
                    {!hasPhotoHanger && (
                      <span className="obsrv-motion-hanger">
                        <svg viewBox="0 0 220 110" aria-hidden="true">
                          <defs>
                            <linearGradient id={'motion-wood-' + prod.id} x1="0%" y1="0%" x2="100%" y2="40%">
                              <stop offset="0%" stopColor="#291910" />
                              <stop offset="37%" stopColor="#8c5d40" />
                              <stop offset="78%" stopColor="#52301e" />
                              <stop offset="100%" stopColor="#27170d" />
                            </linearGradient>
                          </defs>
                          <path d="M110 47V21c0-7 14-8 14-15 0-6-8-7-11-3" fill="none"
                            stroke="#b8babe" strokeWidth="4" strokeLinecap="round" />
                          <path d="M105 48 Q110 41 115 48L192 82Q201 88 189 92H31Q19 88 28 82Z"
                            fill={'url(#motion-wood-' + prod.id + ')'} stroke="#322017" strokeWidth="2"/>
                          <path d="M36 83L109 53 184 83" fill="none" stroke="#d3a17a" opacity=".4" strokeWidth="2"/>
                        </svg>
                      </span>
                    )}
                    <span className={'obsrv-motion-photo' + (hasPhotoHanger ? ' obsrv-motion-photo--with-hanger' : '')}>
                      <GarmentMedia product={prod} eager />
                    </span>
                  </span>
                  <span className="obsrv-motion-caption" aria-hidden="true">
                    <span className="obsrv-motion-name">{prod.title}</span>
                    <span className="obsrv-motion-price">{prod.priceFormatted}</span>
                  </span>
                </button>
              );
            })}
          </div>
          </div>
        </div>

        {/* Floor Cast Shadow */}
        <div className="w-4/5 mx-auto h-8 bg-radial from-black via-black/80 to-transparent blur-xl -mt-4 opacity-90 pointer-events-none"></div>
      </div>

      {/* Rack Bottom Controls & Quick Status */}
      <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-obsrv-muted z-10 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 font-mono text-[11px] tracking-widest">
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-600"></span>
          <span>VOL. 04 / SAN JOSÉ DROP</span>
          <span className="text-neutral-600">|</span>
          <span className="text-obsrv-white/70">{PRODUCTS.length} PIEZAS ACTIVAS</span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            className="px-6 py-2.5 rounded-full border border-white/20 bg-obsrv-charcoal/70 text-obsrv-white text-[11px] tracking-[0.25em] font-medium uppercase hover:bg-obsrv-white hover:text-obsrv-black hover:border-obsrv-white transition-all duration-300"
            href="#coleccion"
          >
            EXPLORAR CATÁLOGO COMPLETO
          </a>
        </div>
        <div className="font-mono text-[10px] tracking-widest text-neutral-500 hidden md:block">
          [ DRAG O SCROLL HORIZONTAL DISPONIBLE ]
        </div>
      </div>
    </section>
  );
};
