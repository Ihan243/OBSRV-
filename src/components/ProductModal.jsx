import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { GarmentMedia } from './GarmentMedia';
import { useCart } from '../context/CartContext';

const formatEditorialTitle = (title) =>
  title.toLocaleLowerCase('es').replace(/(^|[\s/'"-])\p{L}/gu, (part) => part.toLocaleUpperCase('es'));

function Chevron({ direction }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d={direction === 'left' ? 'M15 18L9 12L15 6' : 'M9 18L15 12L9 6'} />
    </svg>
  );
}

/**
 * SUDIV-inspired immersive OBSRV garment viewer.
 * Preserves the background rack, product carousel and the existing cart flow.
 */
export const ProductModal = ({ activeIndex, onClose, onNavigate }) => {
  const product = activeIndex == null ? null : PRODUCTS[activeIndex];
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [showAvailability, setShowAvailability] = useState(false);
  const [direction, setDirection] = useState(1);
  const [outgoing, setOutgoing] = useState(null);
  const prevIndex = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!product) {
      prevIndex.current = null;
      setOutgoing(null);
      return;
    }
    if (prevIndex.current !== null && prevIndex.current !== activeIndex) {
      setOutgoing({ index: prevIndex.current, direction });
    }
    prevIndex.current = activeIndex;
    setSelectedSize(product.sizes?.[0] ?? '');
    setShowAvailability(false);
  }, [activeIndex, product]);

  useEffect(() => {
    if (!product) return undefined;
    const existingOverflow = document.body.style.overflow;
    previousFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = existingOverflow;
      previousFocus.current?.focus?.({ preventScroll: true });
    };
  }, [Boolean(product)]);

  const changeProduct = (delta) => {
    setDirection(delta);
    onNavigate(delta);
  };

  useEffect(() => {
    if (!product) return undefined;
    const keydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (showAvailability) setShowAvailability(false);
        else onClose();
      } else if (event.key === 'ArrowLeft' && !showAvailability) {
        event.preventDefault();
        changeProduct(-1);
      } else if (event.key === 'ArrowRight' && !showAvailability) {
        event.preventDefault();
        changeProduct(1);
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [activeIndex, product, showAvailability, onClose, onNavigate]);

  if (!product) return null;

  const addSelectedProduct = () => {
    addToCart(product, selectedSize);
    // CartDrawer already opens inside addToCart; close this layer so it is visible.
    onClose();
  };

  const count = String(activeIndex + 1).padStart(2, '0');
  const total = String(PRODUCTS.length).padStart(2, '0');
  const title = formatEditorialTitle(product.title);

  return (
    <div className="obsrv-viewer-overlay" id="productViewer"
      onClick={(event) => {
        // The layout fills the viewport, so checking target === currentTarget
        // would miss clicks on the visible dark backdrop inside the layout.
        // Close from any empty region, but keep product interactions working.
        if (event.target.closest('[data-viewer-keep-open], button, a, input, select, textarea')) return;
        onClose();
      }}>
      <div className="obsrv-viewer-layout" role="dialog" aria-modal="true"
        aria-label={'Vista ampliada: ' + product.title}>
        <button ref={closeRef} type="button" className="obsrv-viewer-close"
          onClick={onClose} aria-label="Cerrar visor de producto">
          CERRAR <span className="obsrv-viewer-close-key">ESC</span>
        </button>

        <div className="obsrv-viewer-showcase">
          <button className="obsrv-viewer-arrow" type="button"
            aria-label="Ver prenda anterior" onClick={() => changeProduct(-1)}>
            <Chevron direction="left" />
          </button>

          <div className="obsrv-viewer-image-stage" data-viewer-keep-open>
            {outgoing && PRODUCTS[outgoing.index] && (
              <div key={'out-' + outgoing.index}
                className={'obsrv-viewer-image obsrv-viewer-image--exit ' +
                  (outgoing.direction < 0 ? 'obsrv-viewer-move-left' : 'obsrv-viewer-move-right')}
                aria-hidden="true" onAnimationEnd={() => setOutgoing(null)}>
                <GarmentMedia product={PRODUCTS[outgoing.index]} eager />
              </div>
            )}
            <div key={product.id}
              className={'obsrv-viewer-image obsrv-viewer-image--enter ' +
                (direction < 0 ? 'obsrv-viewer-move-left' : 'obsrv-viewer-move-right')}>
              <GarmentMedia product={product} eager />
            </div>
          </div>

          <button className="obsrv-viewer-arrow" type="button"
            aria-label="Ver prenda siguiente" onClick={() => changeProduct(1)}>
            <Chevron direction="right" />
          </button>
        </div>

        <div className="obsrv-viewer-information" data-viewer-keep-open aria-live="polite">
          <span className="obsrv-viewer-counter">{count} / {total}</span>
          <h2 className="obsrv-viewer-title" title={product.title}>{title}</h2>
          <p className="obsrv-viewer-price">{product.priceFormatted}</p>

          <button type="button" className="obsrv-viewer-availability"
            aria-expanded={showAvailability} aria-controls="obsrv-availability-panel"
            onClick={() => setShowAvailability((open) => !open)}>
            {showAvailability ? 'OCULTAR OPCIONES' : 'VER DISPONIBILIDAD'}
          </button>

          {showAvailability && (
            <div className="obsrv-viewer-purchase" id="obsrv-availability-panel">
              <p className="obsrv-viewer-purchase-label">Selecciona una talla</p>
              <div className="obsrv-viewer-sizes" role="group" aria-label="Tallas disponibles">
                {product.sizes.map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={'obsrv-viewer-size ' + (selectedSize === size ? 'is-selected' : '')}>
                    {size}
                  </button>
                ))}
              </div>
              <button className="obsrv-viewer-cart" type="button"
                onClick={addSelectedProduct} disabled={!selectedSize}>
                AGREGAR AL CARRITO
              </button>
              <p className="obsrv-viewer-demo-note">Vista conceptual: prendas e inventario ilustrativos.</p>
            </div>
          )}

          <span className="obsrv-viewer-help" aria-hidden="true">
            ← → EXPLORAR · ESC CERRAR
          </span>
        </div>
      </div>
    </div>
  );
};
