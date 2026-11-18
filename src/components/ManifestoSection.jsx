import React from 'react';

export const ManifestoSection = () => {
  return (
    <section className="py-24 px-6 bg-obsrv-charcoal/50 border-t border-obsrv-border relative overflow-hidden" id="manifiesto">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typography & Concept */}
        <div className="lg:col-span-6 space-y-8">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-obsrv-muted">
            FILOSOFÍA DE MARCA
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-obsrv-white leading-tight">
            THE ART OF<br />
            <span className="italic font-normal text-neutral-400">BEING OBSRV.</span>
          </h2>
          <div className="space-y-6 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            <p>
              En un mundo saturado de estímulos rápidos y modas desechables, mirar no es suficiente. <strong>OBSRV</strong> nace en San José, Costa Rica, como una respuesta estética a la uniformidad visual urbana.
            </p>
            <p>
              Fusionamos la crudeza del graffiti y el diseño gráfico experimental con la precisión y el calibre de la sastrería editorial contemporánea. Cada silueta, costura y gramaje de tela de 240g–400g está calculado para que la prenda no solo vista, sino que comunique una postura ante el entorno.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
              <div>
                <span className="block text-obsrv-white font-medium text-sm">SAN JOSÉ ORIGIN</span>
                <span className="text-obsrv-muted">Diseñado y producido con orgullo e identidad costarricense.</span>
              </div>
              <div>
                <span className="block text-obsrv-white font-medium text-sm">LIMITED QUANTITIES</span>
                <span className="text-obsrv-muted">Cero sobreproducción. Drops numerados y exclusivos.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High Fashion Editorial Collage */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-neutral-900 overflow-hidden relative group">
              <img
                alt="Editorial streetwear pose"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono tracking-widest text-white">
                LOOK 01 / HEAVY COTTON
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-10">
            <div className="aspect-[3/4] bg-neutral-900 overflow-hidden relative group">
              <img
                alt="Streetwear San Jose Editorial"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono tracking-widest text-white">
                LOOK 02 / GRAPHIC SERIES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
