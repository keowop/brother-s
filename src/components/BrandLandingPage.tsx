/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Star,
  Layers,
  Box,
  Truck,
  ShieldCheck,
  Bell,
  FileText,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductSpec } from '../types';

export const BrandLandingPage: React.FC = () => {
  const {
    catalog,
    setSelectedProduct,
    setCurrentView,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsBulkQuoteOpen,
    showNotification,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCatalog =
    activeCategory === 'all'
      ? catalog
      : catalog.filter((p) => p.category === activeCategory);

  const handleOpenProduct = (prod: ProductSpec) => {
    setSelectedProduct(prod);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent, prod: ProductSpec) => {
    e.stopPropagation();
    if (prod.stockStatus === 'in_stock') {
      addToCart(prod, 1);
      setIsCartOpen(true);
    } else {
      showNotification(`Added your email to the ${prod.title} launch notification list!`, 'info');
    }
  };

  const handleQuickBuy = (e: React.MouseEvent, prod: ProductSpec) => {
    e.stopPropagation();
    if (prod.stockStatus === 'in_stock') {
      addToCart(prod, 1);
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    } else {
      setIsBulkQuoteOpen(true);
    }
  };

  return (
    <div className="bg-white">
      {/* Bright, Light, Modern Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-white text-stone-900 pt-10 pb-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-[#A8794F]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Next-Gen Protective Paper Packaging · India</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.08]">
                  Engineered to Protect.{' '}
                  <span className="text-[#A8794F]">Zero Plastic.</span>
                </h1>
                <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl [text-wrap:pretty]">
                  Replace bulky plastic bubble wrap with expandable 3D honeycomb kraft paper.
                  Interlocking cells cushion fragile ceramics, cosmetics, and e-commerce parcels
                  without sticky tape.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const heroProd = catalog.find((p) => p.stockStatus === 'in_stock');
                    if (heroProd) handleOpenProduct(heroProd);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#A8794F] hover:bg-[#966842] text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Shop Flagship Roll · ₹1,299</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsBulkQuoteOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs transition-colors border border-stone-300 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#A8794F]" />
                  <span>B2B Wholesale Slabs</span>
                </button>
              </div>

              {/* Trust Metric Strip */}
              <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 text-xs text-stone-600">
                <div>
                  <div className="text-lg font-extrabold text-stone-900">80 GSM</div>
                  <div className="text-[11px] text-stone-500">High-Tensile Virgin Kraft</div>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-stone-900">1.5x Expand</div>
                  <div className="text-[11px] text-stone-500">Up to 400m Cushioning</div>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-stone-900">24h Dispatch</div>
                  <div className="text-[11px] text-stone-500">From Central Hub</div>
                </div>
              </div>
            </div>

            {/* Visual Hero Showcase (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={() => {
                  const heroProd = catalog.find((p) => p.stockStatus === 'in_stock');
                  if (heroProd) handleOpenProduct(heroProd);
                }}
                className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md group cursor-pointer"
              >
                <img
                  src="/src/assets/images/honeycomb_kraft_roll_1792921915850.jpg"
                  alt="Brother's Honeycomb Kraft Paper Wrap Roll"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-stone-900 flex items-center gap-1.5 border border-stone-200 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Featured Flagship Roll · Ready to Ship</span>
                </div>

                <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-stone-900">10&quot; × 250m Roll</div>
                    <div className="text-[11px] text-stone-500">₹1,299 (+18% GST) · Volume discounts</div>
                  </div>
                  <span className="px-3 py-1.5 bg-[#A8794F] text-white font-bold rounded-lg text-[11px] group-hover:bg-[#966842] transition-colors">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern E-Commerce Catalog Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8794F]">
              Protective Packaging Collection
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900">
              Brother&apos;s Store Catalog
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'honeycomb_rolls', label: 'Honeycomb Wrap Rolls' },
              { id: 'dispensers', label: 'Workstation Dispensers' },
              { id: 'sleeves', label: 'Bottle Sleeves' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#A8794F] text-white font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCatalog.map((prod) => {
            const isInStock = prod.stockStatus === 'in_stock';
            return (
              <div
                key={prod.id}
                onClick={() => handleOpenProduct(prod)}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-[#A8794F] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Card Visual Frame */}
                  <div className="relative aspect-4/3 bg-stone-50 overflow-hidden border-b border-stone-100">
                    <img
                      src={prod.images[0]?.url}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      {isInStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-md shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          In Stock · Ships Today
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-stone-700 text-[11px] font-semibold rounded-md border border-stone-200">
                          <Bell className="w-3 h-3 text-[#A8794F]" />
                          {prod.leadTime}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-700 text-[11px] font-mono px-2 py-0.5 rounded border border-stone-200">
                      {prod.sku}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-[#A8794F]">
                        {prod.category.replace('_', ' ')}
                      </span>
                      {isInStock && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-stone-700 font-bold">4.9</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-base text-stone-900 group-hover:text-[#A8794F] transition-colors leading-snug">
                      {prod.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {prod.shortDescription}
                    </p>

                    {/* Price Block */}
                    <div className="pt-2 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                          ₹{prod.basePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-stone-500">
                          {isInStock ? '/ roll' : 'est.'}
                        </span>
                      </div>
                      {isInStock && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Vol. Discounts Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 pt-0">
                  {isInStock ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, prod)}
                        className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#A8794F]" />
                        <span>Add to Bag</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleQuickBuy(e, prod)}
                        className="py-2.5 px-3 bg-[#A8794F] hover:bg-[#966842] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Zap className="w-3.5 h-3.5 text-white" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, prod)}
                      className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5 text-stone-500" />
                      <span>Notify When Available</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Value Props Strip - Light Neutral */}
      <section className="bg-stone-50/80 border-y border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#A8794F] border border-amber-200 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">Self-Locking Hex Cells</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Slit kraft paper hooks naturally into itself during wrapping, removing the need for
                plastic adhesive packing tape.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#A8794F] border border-amber-200 flex items-center justify-center">
                <Box className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">80% Warehouse Space Saved</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                One compact 10-inch roll replaces 3 bulky rolls of pre-inflated plastic bubble film
                at packaging stations.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">Subsidized Surface Logistics</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Orders of 3 or more rolls qualify for free domestic freight shipping across Indian
                postal PIN zones.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">100% Tax ITC Compliance</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Automated Indian GST tax invoices with HSN 480890 for seamless monthly business
                accounting and tax credit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
