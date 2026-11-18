import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroRack } from './components/HeroRack';
import { MarqueeBanner } from './components/MarqueeBanner';
import { EditorialSection } from './components/EditorialSection';
import { CollectionGrid } from './components/CollectionGrid';
import { ManifestoSection } from './components/ManifestoSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { PRODUCTS } from './data/products';

export function App() {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const handleSelectProduct = (index) => {
    setActiveModalIndex(index);
  };

  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };

  const handleNavigateModal = (direction) => {
    setActiveModalIndex((prev) => {
      if (prev === null) return 0;
      let next = prev + direction;
      if (next < 0) next = PRODUCTS.length - 1;
      if (next >= PRODUCTS.length) next = 0;
      return next;
    });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-obsrv-black text-obsrv-white selection:bg-obsrv-white selection:text-obsrv-black">
        {/* Fixed Header */}
        <Header />

        {/* 1. Fullscreen Hero & Interactive Streetwear 3D Rack */}
        <HeroRack onSelectProduct={handleSelectProduct} />

        {/* 2. Animated Continuous Brand Marquee */}
        <MarqueeBanner />

        {/* 3. Fullscreen Editorial Section: Campaign Photography */}
        <EditorialSection />

        {/* 4. Traditional Collection Grid with Filters */}
        <CollectionGrid onSelectProduct={handleSelectProduct} />

        {/* 5. Manifesto Section / The Art of Being OBSRV */}
        <ManifestoSection />

        {/* 6. Footer */}
        <Footer />

        {/* 7. In-Page Immersive Product Viewer (Modal Overlay) */}
        <ProductModal
          activeIndex={activeModalIndex}
          onClose={handleCloseModal}
          onNavigate={handleNavigateModal}
        />

        {/* 8. Cart Drawer (Slide-Over Panel) */}
        <CartDrawer />

        {/* Toast Notification */}
        <Toast />
      </div>
    </CartProvider>
  );
}

export default App;
