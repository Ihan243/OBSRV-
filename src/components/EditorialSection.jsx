import React from 'react';

export const EditorialSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-obsrv-black overflow-hidden py-24" id="editorial">
      {/* Editorial Background Image with Urban San José Vibe */}
      <div className="absolute inset-0 z-0">
        <img
          alt="OBSRV Streetwear Campaign Editorial"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-40 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1800&q=80"
          onError={(e) => {
            // High reliability fallback
            e.currentTarget.src = "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsrv-black via-obsrv-black/60 to-obsrv-black/80"></div>
        <div className="absolute inset-0 bg-noise opacity-30"></div>
      </div>

      {/* Editorial Typography Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <span className="text-xs uppercase font-mono tracking-[0.4em] text-neutral-400 mb-6 border border-neutral-700/60 bg-black/40 px-4 py-1.5 backdrop-blur-md">
          EDITORIAL CAMPAIGN • MANIFESTO 01
        </span>
        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-obsrv-white leading-[1.05]">
          EVERYONE LOOKS.<br />
          <span className="italic font-light text-neutral-300">FEW OBSRV.</span>
        </h2>
        <p className="font-sans text-lg sm:text-2xl text-neutral-300 font-light tracking-[0.2em] mt-6 uppercase">
          Wearable Art. San José, Costa Rica.
        </p>
        <p className="max-w-2xl text-sm sm:text-base text-neutral-400 font-light leading-relaxed mt-4 font-sans">
          Nacidos en el asfalto josefino. Diseñamos piezas que desafían la mirada casual y exigen atención consciente. Cada prenda es un lienzo editorial confeccionado en cortes oversize pesados y materiales de alta durabilidad.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <a
            className="px-8 py-3.5 bg-obsrv-white text-obsrv-black font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-neutral-200 transition-all duration-300 shadow-xl"
            href="#coleccion"
          >
            DESCUBRE OBSRV
          </a>
          <a
            className="px-8 py-3.5 border border-white/30 text-obsrv-white font-sans text-xs uppercase tracking-[0.25em] font-medium hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            href="#manifiesto"
          >
            LEER EL MANIFIESTO
          </a>
        </div>
      </div>
    </section>
  );
};
