import React from 'react';
import { useCart } from '../context/CartContext';
import { GarmentMedia } from './GarmentMedia';
import { BRAND_INFO } from '../data/products';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    totalCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    triggerToast,
  } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      triggerToast('Agrega prendas al carrito antes de finalizar.');
      return;
    }

    // WhatsApp message composition for OBSRV Costa Rica
    let msg = `¡Hola OBSRV®! Quiero realizar el pedido de las siguientes prendas de su showroom interactivo:\n\n`;
    let total = 0;
    cart.forEach((item) => {
      const itemSubtotal = item.product.price * item.quantity;
      msg += `• ${item.quantity}x ${item.product.title} (Talla: ${item.size}) - ₡${itemSubtotal.toLocaleString()}\n`;
      total += itemSubtotal;
    });
    msg += `\nTotal del pedido: ₡${total.toLocaleString()} CRC\n¿Tienen disponibilidad y número de SINPE Móvil o pasarela para pago?`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappPhone}?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-obsrv-black border-l border-obsrv-border z-50 transform transition-transform duration-400 ease-out flex flex-col justify-between shadow-2xl ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="cartDrawer"
      >
        {/* Cart Header */}
        <div className="p-6 border-b border-obsrv-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-brand text-lg font-bold tracking-[0.2em] text-obsrv-white">
              TU CARRITO
            </span>
            <span className="text-xs font-mono bg-obsrv-charcoal px-2.5 py-0.5 rounded-full text-obsrv-white">
              {totalCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-obsrv-muted hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" id="cartItemsList">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-obsrv-muted font-mono">
              <svg className="w-12 h-12 stroke-neutral-700" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-xs uppercase tracking-widest">TU CARRITO ESTÁ VACÍO</p>
              <p className="text-[11px] text-neutral-600 max-w-xs font-sans">
                Explora el perchero digital de OBSRV® y selecciona tu prenda de streetwear favorita.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex space-x-4 border-b border-obsrv-border/60 pb-5"
              >
                <div className="w-16 h-20 bg-neutral-900 border border-neutral-800 flex items-center justify-center p-1 flex-shrink-0">
                  <GarmentMedia product={item.product} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-sans font-semibold text-obsrv-white leading-tight">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-neutral-500 hover:text-white ml-2 cursor-pointer"
                        aria-label="Eliminar producto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      TALLA: {item.size} • {item.product.color}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <div className="flex items-center border border-neutral-700 rounded">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, -1)}
                        className="px-2 py-0.5 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-white font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, 1)}
                        className="px-2 py-0.5 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-obsrv-white">
                      ₡{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer & Checkout Action */}
        <div className="p-6 bg-obsrv-card border-t border-obsrv-border space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>ENVÍO ESTIMADO (CR)</span>
            <span className="text-emerald-400 uppercase font-medium">Calculado al finalizar</span>
          </div>
          <div className="flex items-center justify-between text-base font-sans font-bold text-obsrv-white border-t border-white/5 pt-3">
            <span>SUBTOTAL</span>
            <span className="font-mono text-lg">₡{subtotal.toLocaleString()} CRC</span>
          </div>
          <p className="text-[10px] text-neutral-500 font-mono">
            Precios en Colones costarricenses (CRC). Pedidos coordinados directamente por pasarela autorizada o WhatsApp oficial de OBSRV®.
          </p>
          <div className="space-y-2 pt-2">
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-obsrv-white text-obsrv-black font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-neutral-200 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>FINALIZAR PEDIDO VÍA WHATSAPP / WEB</span>
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full py-2.5 border border-white/10 text-neutral-400 font-mono text-[11px] uppercase tracking-widest hover:text-white hover:border-white/30 transition-all cursor-pointer"
            >
              CONTINUAR EXPLORANDO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
