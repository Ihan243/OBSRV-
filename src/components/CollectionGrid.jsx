import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { GarmentSVG } from './GarmentSVG';
import { useCart } from '../context/CartContext';

export const CollectionGrid = ({ onSelectProduct }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { addToCart } = useCart();

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="py-24 px-6 max-w-[1700px] mx-auto w-full border-t border-obsrv-border/40" id="coleccion">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-obsrv-border">
        <div>
          <p className="text-xs uppercase font-mono tracking-[0.3em] text-obsrv-muted mb-2">
            CATÁLOGO EDITORIAL
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-obsrv-white">
            COLECCIÓN PERMANENTE &amp; DROPS
          </h2>
        </div>
        <div className="mt-6 md:mt-0 flex items-center space-x-6 text-xs font-mono text-obsrv-muted">
          <span id="collectionCounter">
            MOSTRANDO <strong className="text-obsrv-white">{filteredProducts.length} {filteredProducts.length === 1 ? 'PIEZA' : 'PIEZAS'}</strong>
          </span>
          <span>•</span>
          <span>MONEDA: <strong>CRC (₡)</strong></span>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="mb-12 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-obsrv-border/50 pb-6" id="categoryFilterBar">
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] border transition-all duration-300 ${
                isActive
                  ? 'bg-obsrv-white text-obsrv-black border-obsrv-white font-semibold shadow-lg'
                  : 'bg-obsrv-charcoal/40 text-neutral-400 border-obsrv-border hover:border-neutral-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-14" id="collectionGrid">
        {filteredProducts.map((prod) => {
          const originalIndex = PRODUCTS.findIndex((p) => p.id === prod.id);
          return (
            <div
              key={prod.id}
              className="product-grid-card group flex flex-col justify-between bg-obsrv-card/40 border border-obsrv-border/80 hover:border-white/30 transition-all duration-500 ease-out p-5 rounded-sm"
            >
              {/* Upper Stage */}
              <div
                className="relative w-full aspect-[4/5] bg-neutral-950 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => onSelectProduct(originalIndex)}
              >
                {/* Tag Drop */}
                <span className="absolute top-3 left-3 text-[9px] font-mono tracking-widest text-neutral-400 bg-obsrv-black/80 px-2.5 py-1 border border-white/10 z-10">
                  {prod.collection}
                </span>

                <div className="w-4/5 h-4/5 group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
                  <GarmentSVG product={prod} />
                </div>

                <div className="absolute inset-0 bg-obsrv-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <span className="px-5 py-2.5 bg-obsrv-white text-obsrv-black text-xs font-mono uppercase tracking-widest font-semibold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    VISUALIZAR PIEZA
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-5 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-sans text-sm font-semibold tracking-wide text-obsrv-white group-hover:text-neutral-200">
                    {prod.title}
                  </h3>
                  <span className="font-mono text-xs font-bold text-obsrv-white ml-2 whitespace-nowrap">
                    {prod.priceFormatted}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400 font-sans line-clamp-2">
                  {prod.description}
                </p>

                <div className="pt-3 border-t border-obsrv-border flex items-center justify-between">
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-neutral-400">
                    <span>TALLAS:</span>
                    {prod.sizes.map((s) => (
                      <span key={s} className="px-1 border border-neutral-800">
                        {s}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => addToCart(prod, prod.sizes[0])}
                    className="text-[11px] font-mono uppercase text-obsrv-white hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>+ CARRITO</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
