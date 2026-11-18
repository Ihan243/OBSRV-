import React from 'react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { showToast, toastMessage } = useCart();

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-obsrv-white text-obsrv-black px-5 py-3 rounded shadow-2xl font-mono text-xs flex items-center space-x-3 transform transition-all duration-300 pointer-events-none ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
      id="toastNotification"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span id="toastMessage">{toastMessage}</span>
    </div>
  );
};
