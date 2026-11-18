import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/products';

export const Header = () => {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-obsrv-black/90 backdrop-blur-md border-b border-obsrv-border/40 transition-all duration-300" id="mainHeader">
      {/* Top Announcement Bar */}
      <div className="bg-obsrv-charcoal/80 border-b border-white/5 py-1.5 px-4 text-center">
        <p className="text-[10px] tracking-[0.28em] font-medium uppercase text-obsrv-muted">
          OBSRV® COSTA RICA • NUEVO DROP LIMITADO • ENVÍOS A TODO EL PAÍS &amp; WORLDWIDE
        </p>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1720px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Menu Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] font-medium">
          <a className="hover:text-white transition-colors duration-200" href="#perchero">
            PERCHERO
          </a>
          <a className="hover:text-white transition-colors duration-200" href="#coleccion">
            COLECCIÓN
          </a>
          <a className="hover:text-white transition-colors duration-200" href="#editorial">
            EDITORIAL
          </a>
          <a className="hover:text-white transition-colors duration-200" href="#manifiesto">
            MANIFIESTO
          </a>
        </nav>

        {/* Center Brand Logo */}
        <div className="flex items-center justify-center flex-1 md:flex-none">
          <a className="group flex flex-col items-center" href="#perchero">
            <span className="font-brand text-2xl md:text-3xl font-bold tracking-[0.25em] text-obsrv-white group-hover:tracking-[0.3em] transition-all duration-300">
              OBSRV<span className="text-xs align-top font-sans text-obsrv-muted font-normal ml-0.5">®</span>
            </span>
            <span className="text-[8px] tracking-[0.45em] text-obsrv-muted uppercase -mt-1 font-mono">
              SAN JOSÉ, CR
            </span>
          </a>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center space-x-6 text-xs tracking-widest">
          <a
            className="hidden lg:flex items-center space-x-1 text-obsrv-muted hover:text-obsrv-white transition-colors"
            href={BRAND_INFO.instagram}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>IG: @OBSRV.CR</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full border border-obsrv-border/70 bg-obsrv-charcoal/50 hover:bg-obsrv-white hover:text-obsrv-black hover:border-obsrv-white transition-all duration-300 flex items-center space-x-2 group"
            aria-label="Abrir carrito de compras"
          >
            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
            <span className="text-[11px] font-mono font-medium tracking-wider">
              {totalCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
