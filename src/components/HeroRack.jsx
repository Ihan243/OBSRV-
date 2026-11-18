import React from 'react';
import { PRODUCTS } from '../data/products';
import { GarmentSVG } from './GarmentSVG';

export const HeroRack = ({ onSelectProduct }) => {
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
        {/* Upper Support Structure & Metallic Rod */}
        <div className="relative w-full mb-1">
          {/* Structural Brackets Left & Right */}
          <div className="absolute -top-7 left-8 w-4 h-8 bg-neutral-800 rounded-sm border border-neutral-600 flex flex-col items-center justify-end pb-1 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
          </div>
          <div className="absolute -top-7 right-8 w-4 h-8 bg-neutral-800 rounded-sm border border-neutral-600 flex flex-col items-center justify-end pb-1 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
          </div>

          {/* The Metal Rod */}
          <div className="h-2.5 w-full rounded-full metallic-rod relative z-20 flex items-center justify-between px-6">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-400/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-400/40"></div>
          </div>
          {/* Rod drop shadow onto garments */}
          <div className="w-full h-8 bg-gradient-to-b from-black/80 to-transparent absolute top-3 left-0 z-10 pointer-events-none"></div>
        </div>

        {/* Garments Hanging on the Rack (Interactive 3D Perspective) */}
        <div
          className="rack-perspective obsrv-realistic-rack relative flex items-start justify-center -space-x-12 sm:-space-x-16 md:-space-x-20 lg:-space-x-24 px-4 pt-0 pb-8 overflow-visible"
          id="rackGarmentsList"
        >
          {PRODUCTS.map((prod, index) => (
            <div
              key={prod.id}
              role="button"
              tabIndex={0}
              aria-label={`Ver ${prod.title}, ${prod.priceFormatted}`}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectProduct(index); } }}
              className="garment-card group relative flex-shrink-0 cursor-pointer w-[190px] sm:w-[220px] md:w-[250px] lg:w-[270px] select-none"
              style={{
                transform: `rotateY(${(index % 2 === 0 ? -1 : 1) * (70 + (index % 3) * 4)}deg) scale(${prod.scale})`,
                zIndex: 20 + index,
              }}
              onClick={() => onSelectProduct(index)}
            >
              {/* The hook and wooden shoulder form one physical hanger attached to the rail. */}
              <div className="hanger-hook obsrv-hanger-real w-full flex flex-col items-center -mb-24 relative -top-3 z-30 pointer-events-none">
                <svg viewBox="0 0 220 110" className="w-36 sm:w-40 lg:w-44 h-[110px] overflow-visible" aria-hidden="true">
                  <defs>
                    <linearGradient id={'obsrv-wood-' + prod.id} x1="0%" y1="0%" x2="100%" y2="40%">
                      <stop offset="0%" stopColor="#28170f" />
                      <stop offset="26%" stopColor="#754b34" />
                      <stop offset="53%" stopColor="#9a6a48" />
                      <stop offset="85%" stopColor="#452a1f" />
                      <stop offset="100%" stopColor="#24150e" />
                    </linearGradient>
                    <linearGradient id={'obsrv-hook-' + prod.id} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#434343" />
                      <stop offset="35%" stopColor="#e4e5e5" />
                      <stop offset="76%" stopColor="#66686a" />
                      <stop offset="100%" stopColor="#282828" />
                    </linearGradient>
                  </defs>
                  <path d="M110 48 V25 C110 16 124 16 124 8 C124 2 119 1 114 3"
                    fill="none" stroke={'url(#obsrv-hook-' + prod.id + ')'} strokeWidth="4"
                    strokeLinecap="round" />
                  <path d="M106 49 Q110 43 114 49 L193 82 Q199 86 191 90 H29 Q21 86 27 82 Z"
                    fill={'url(#obsrv-wood-' + prod.id + ')'} stroke="#382116" strokeWidth="1.5" />
                  <path d="M32 83 L109 52 Q110 52 112 52 L188 83"
                    fill="none" stroke="#e3a87d" strokeOpacity=".4" strokeWidth="1.5" />
                  <path d="M32 87 H187" fill="none" stroke="#170e09" strokeOpacity=".65" strokeWidth="2" />
                  <text x="110" y="85" textAnchor="middle" fontSize="8"
                    fontFamily="sans-serif" fontWeight="700" letterSpacing="2"
                    fill="#e1b18a" opacity=".7">OBSRV</text>
                </svg>
              </div>

              {/* Garment Illustration Stage */}
              <div className="w-full aspect-[3/4] relative flex items-center justify-center p-2">
                {prod.rackImage ? (
                  <img src={prod.rackImage} alt="" draggable={false}
                    className="w-full h-full object-contain drop-shadow-2xl select-none" />
                ) : (
                  <GarmentSVG product={prod} />
                )}
              </div>

              {/* Garment Floating Info Tag on Hover */}
              <div className="garment-tag absolute -bottom-6 left-1/2 -translate-x-1/2 w-max max-w-[210px] text-center bg-obsrv-black/95 border border-white/20 backdrop-blur-md px-3.5 py-2 rounded shadow-2xl opacity-0 transform translate-y-3 transition-all duration-300 pointer-events-none z-50">
                <span className="block text-[8px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  {prod.collection}
                </span>
                <span className="block text-[11px] font-sans font-semibold tracking-wider text-obsrv-white truncate">
                  {prod.title}
                </span>
                <span className="block text-xs font-mono font-bold text-white mt-0.5">
                  {prod.priceFormatted}
                </span>
                <span className="inline-block mt-1 text-[8px] font-mono text-emerald-400 tracking-wider">
                  ● CLIC PARA EXPANDIR
                </span>
              </div>
            </div>
          ))}
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
