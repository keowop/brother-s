/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { BrandLandingPage } from './components/BrandLandingPage';
import { ProductPageWithTabs } from './components/ProductPageWithTabs';
import { BulkWholesaleSection } from './components/BulkWholesaleSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ProfitCalculator } from './components/ProfitCalculator';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BulkQuoteModal } from './components/BulkQuoteModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SearchModal } from './components/SearchModal';
import { PolicyModals } from './components/PolicyModals';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, notification, dismissNotification } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 antialiased selection:bg-[#C27838]/20 selection:text-stone-950">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-white text-stone-900 rounded-xl shadow-xl text-xs border border-stone-200 animate-in slide-in-from-bottom-3 duration-200">
          {notification.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          )}
          {notification.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          {notification.type === 'info' && (
            <Info className="w-4 h-4 text-[#A8794F] shrink-0" />
          )}
          <span className="font-semibold">{notification.message}</span>
          <button
            onClick={dismissNotification}
            className="ml-2 text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Minimal Announcement Ribbon */}
      <AnnouncementBar />

      {/* E-Commerce Top Bar Navigation */}
      <Header />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Modern Brand Landing Page & Catalog */}
            <BrandLandingPage />

            {/* B2B Wholesale Quantity Slabs */}
            <div id="b2b-wholesale">
              <BulkWholesaleSection />
            </div>

            {/* Verified Merchant Reviews */}
            <ReviewsSection />

            {/* Compact FAQ Accordion */}
            <FaqSection />
          </>
        )}

        {currentView === 'product' && (
          <>
            {/* Dedicated Product Page with Interactive Tabs */}
            <ProductPageWithTabs />
          </>
        )}

        {currentView === 'calculator' && <ProfitCalculator />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Shopping Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <BulkQuoteModal />
      <OrderTrackingModal />
      <SearchModal />
      <PolicyModals currentView={currentView} onClose={() => setCurrentView('home')} />

      {/* E-Commerce Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
