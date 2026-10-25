/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  PackageCheck,
  Settings,
  Menu,
  X,
  Layers,
  ArrowUpRight,
  Calculator,
} from 'lucide-react';
import { useStore, AppView } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    cartCount,
    cartGrandTotal,
    setIsCartOpen,
    setIsSearchOpen,
    setIsTrackingOpen,
    setIsBulkQuoteOpen,
    currentView,
    setCurrentView,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Typographic Brand Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 text-[#A8794F] flex items-center justify-center group-hover:bg-[#A8794F] group-hover:text-white transition-colors">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-stone-900">
                Brother&apos;s
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#A8794F]">
                Packaging
              </span>
            </div>
          </button>

          {/* Zone 2: Clean E-Commerce Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 cursor-pointer ${
                currentView === 'home'
                  ? 'border-[#A8794F] text-stone-900 font-extrabold'
                  : 'border-transparent'
              }`}
            >
              Landing Page
            </button>
            <button
              onClick={() => handleNav('product')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 cursor-pointer ${
                currentView === 'product'
                  ? 'border-[#A8794F] text-stone-900 font-extrabold'
                  : 'border-transparent'
              }`}
            >
              Product Page (Tabs)
            </button>
            <button
              onClick={() => {
                if (currentView !== 'home') handleNav('home');
                setTimeout(() => {
                  document.getElementById('b2b-wholesale')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 border-transparent cursor-pointer"
            >
              Wholesale Slabs
            </button>
            <button
              onClick={() => handleNav('calculator')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 flex items-center gap-1 cursor-pointer ${
                currentView === 'calculator'
                  ? 'border-[#A8794F] text-stone-900 font-extrabold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Unit Economics</span>
            </button>
            <button
              onClick={() => handleNav('admin')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 flex items-center gap-1 cursor-pointer ${
                currentView === 'admin'
                  ? 'border-[#A8794F] text-stone-900 font-extrabold'
                  : 'border-transparent text-emerald-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Merchant Admin</span>
            </button>
          </nav>

          {/* Zone 3: Actions Cluster */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Search products and specs"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Track Order */}
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200 cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Track Order</span>
            </button>

            {/* Quick Bulk Quote CTA */}
            <button
              onClick={() => setIsBulkQuoteOpen(true)}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#A8794F] bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-200 cursor-pointer"
            >
              <span>Bulk Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#A8794F] hover:bg-[#966842] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Bag</span>
              {cartCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[11px] font-extrabold rounded-full bg-white text-[#A8794F] tabular-nums">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] font-normal text-amber-100">0</span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-900 rounded-lg hover:bg-stone-100"
          >
            Landing Page
          </button>
          <button
            onClick={() => handleNav('product')}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 rounded-lg hover:bg-stone-100"
          >
            Product Page (Tabs)
          </button>
          <button
            onClick={() => {
              if (currentView !== 'home') handleNav('home');
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('b2b-wholesale')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 rounded-lg hover:bg-stone-100"
          >
            Wholesale Slabs & Pricing
          </button>
          <button
            onClick={() => handleNav('calculator')}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 rounded-lg hover:bg-stone-100 flex items-center gap-2"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Unit Economics Calculator</span>
          </button>
          <button
            onClick={() => handleNav('admin')}
            className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-800 rounded-lg hover:bg-stone-100 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Merchant Admin</span>
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              Console
            </span>
          </button>
          <div className="pt-2 border-t border-stone-200 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTrackingOpen(true);
              }}
              className="flex-1 py-2 text-xs font-bold border border-stone-300 rounded-lg text-stone-800 text-center"
            >
              Track Order
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBulkQuoteOpen(true);
              }}
              className="flex-1 py-2 text-xs font-bold bg-[#A8794F] text-white rounded-lg text-center"
            >
              Bulk Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
