import React from 'react';
import { BRAND_INFO } from '../data/products';

export const Footer = () => {
  return (
    <footer className="bg-obsrv-black border-t border-obsrv-border py-16 px-6 text-xs text-obsrv-muted">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Col 1: Brand */}
        <div className="space-y-4 md:col-span-2">
          <div className="font-brand text-2xl font-bold tracking-[0.25em] text-obsrv-white">
            OBSRV<span className="text-xs align-top font-sans text-obsrv-muted font-normal ml-0.5">®</span>
          </div>
          <p className="font-serif italic text-base text-neutral-400 max-w-md">
            “Everyone looks. Few obsrv.”
          </p>
          <p className="text-neutral-500 max-w-sm font-sans leading-relaxed">
            Plataforma de streetwear editorial e indumentaria de autor creada en San José, Costa Rica.
          </p>
          <div className="pt-2 font-mono text-[11px] text-obsrv-white flex items-center space-x-4">
            <a
              className="hover:underline flex items-center space-x-1"
              href={BRAND_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>INSTAGRAM: @OBSRV.CR</span>
            </a>
            <span>•</span>
            <a
              className="hover:underline text-emerald-400"
              href={`https://wa.me/${BRAND_INFO.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WHATSAPP PEDIDOS
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3 font-mono">
          <span className="block text-obsrv-white tracking-widest text-[11px] font-bold uppercase mb-2">
            EXPLORAR
          </span>
          <a className="block hover:text-white transition-colors" href="#perchero">
            Perchero 3D
          </a>
          <a className="block hover:text-white transition-colors" href="#coleccion">
            Colección Completa
          </a>
          <a className="block hover:text-white transition-colors" href="#editorial">
            Campaña Editorial
          </a>
          <a className="block hover:text-white transition-colors" href="#manifiesto">
            Manifiesto OBSRV
          </a>
        </div>

        {/* Col 3: Customer Care / Info */}
        <div className="space-y-3 font-mono">
          <span className="block text-obsrv-white tracking-widest text-[11px] font-bold uppercase mb-2">
            CLIENTES &amp; ENVÍOS
          </span>
          <span className="block">Envíos Costa Rica: Correos de CR / Mensajería</span>
          <span className="block">Tiempos de entrega: 24 a 48 hrs hábiles</span>
          <span className="block">Políticas de cambios y devoluciones</span>
          <span className="block">Guía de tallas Oversize Fit</span>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto pt-8 border-t border-obsrv-border/40 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600">
        <div>© 2026 OBSRV® COSTA RICA. TODOS LOS DERECHOS RESERVADOS.</div>
        <div className="mt-3 sm:mt-0">DESIGNED AS AN INTERACTIVE DIGITAL SHOWROOM</div>
      </div>
    </footer>
  );
};
