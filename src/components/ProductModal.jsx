import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { GarmentMedia } from './GarmentMedia';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ activeIndex, onClose, onNavigate }) => {
  const product = PRODUCTS[activeIndex];
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    if (activeIndex === null || activeIndex === undefined) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeIndex, onClose, onNavigate]);

  if (!product) return null;

  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const totalItems = String(PRODUCTS.length).padStart(2, '0');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between transition-all duration-500 ease-out animate-fadeIn"
      id="productViewer"
    >
      {/* Top Bar of Viewer */}
      <div className="w-full max-w-[1700px] mx-auto px-6 py-6 flex items-center justify-between z-20">
        <div className="flex items-center space-x-4">
          <span className="font-brand text-xl font-bold tracking-[0.25em] text-obsrv-white">
            OBSRV<span className="text-xs align-top font-sans text-obsrv-muted font-normal ml-0.5">®</span>
          </span>
          <span className="text-neutral-600 font-mono text-xs">/</span>
          <span className="font-mono text-xs text-obsrv-muted tracking-widest uppercase">
            {formattedIndex} / {totalItems}
          </span>
        </div>

        {/* Close Action */}
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono uppercase tracking-[0.2em] text-obsrv-white hover:bg-obsrv-white hover:text-obsrv-black transition-all flex items-center space-x-2 group cursor-pointer"
        >
          <span>CERRAR</span>
          <span className="text-neutral-400 group-hover:text-black">ESC</span>
        </button>
      </div>

      {/* Center Carousel Area with Left / Right Arrows */}
      <div className="relative w-full flex-1 flex items-center justify-center px-4 md:px-16 overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={() => onNavigate(-1)}
          className="absolute left-6 md:left-12 z-30 p-4 rounded-full bg-obsrv-charcoal/70 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          aria-label="Prenda anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>

        {/* Active Big Garment Stage */}
        <div className="relative max-w-xl w-full h-[65vh] flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center transition-all duration-500 transform animate-float-slow">
            <GarmentMedia product={product} eager />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate(1)}
          className="absolute right-6 md:right-12 z-30 p-4 rounded-full bg-obsrv-charcoal/70 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          aria-label="Prenda siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Bottom Controls & Purchasing Panel */}
      <div className="w-full bg-obsrv-card/90 border-t border-obsrv-border/70 backdrop-blur-md px-6 py-6 z-20">
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Garment Title, Price & Details */}
          <div className="text-center lg:text-left">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-1">
              {product.collection} • {product.material}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-obsrv-white">
              {product.title}
            </h3>
            <p className="font-mono text-base font-semibold text-white mt-1">
              {product.priceFormatted} CRC
            </p>
          </div>

          {/* Center: Size Selector */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              SELECCIONA TALLA (OVERSIZE FIT)
            </span>
            <div className="flex items-center space-x-2">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-mono border rounded transition-all cursor-pointer ${
                      isSelected
                        ? 'border-obsrv-white bg-obsrv-white text-obsrv-black font-bold'
                        : 'border-neutral-700 text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Add to Cart */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="px-8 py-3.5 bg-obsrv-white text-obsrv-black font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-neutral-200 transition-all duration-300 shadow-xl flex items-center space-x-3 cursor-pointer"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>AGREGAR AL CARRITO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
