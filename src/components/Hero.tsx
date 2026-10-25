/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { product, setIsBulkQuoteOpen, setCurrentView } = useStore();

  const handleScrollToProduct = () => {
    const el = document.getElementById('featured-product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('product');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
              <span className="w-2 h-2 rounded-full bg-[#A8794F]" />
              <span>Protective Paper Packaging</span>
              <span className="text-[#252522]/30" aria-hidden="true">·</span>
              <span className="text-[#69765A]">Direct from India Hub</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#252522] tracking-tight leading-[1.08] [text-wrap:balance]">
                Protect What Matters.{' '}
                <span className="text-[#A8794F]">Pack Smarter.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#252522]/80 leading-relaxed max-w-2xl [text-wrap:pretty]">
                Meet Brother&apos;s Honeycomb Kraft Paper Wrap — a practical, expandable paper
                packaging solution for e-commerce sellers, growing brands and everyday shipping needs.
              </p>
            </div>

            {/* Price Preview & Stock */}
            <div className="flex flex-wrap items-center gap-4 text-sm pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#252522] tabular-nums">
                  ₹{product.basePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#252522]/60">per roll (+18% GST)</span>
              </div>
              <span className="text-[#252522]/30" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-xs text-[#69765A] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#69765A]" />
                <span>In Stock ({product.stockCount} rolls available)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleScrollToProduct}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#FAF8F3] bg-[#252522] hover:bg-[#383833] rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Shop Honeycomb Wrap</span>
                <ArrowRight className="w-4 h-4 text-[#EDE4D7]" />
              </button>

              <button
                onClick={() => setIsBulkQuoteOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#252522] bg-[#EDE4D7] hover:bg-[#E3D8C8] rounded-lg transition-colors border border-[#DDD3C2] cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#A8794F]" />
                <span>Get Bulk Pricing</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-[#E8DFC8] grid grid-cols-3 gap-4 text-xs text-[#252522]/80">
              <div>
                <span className="block font-semibold text-[#252522]">10&quot; × 250 Metres</span>
                <span className="text-[#252522]/60 text-[11px]">Provisional roll sizing</span>
              </div>
              <div>
                <span className="block font-semibold text-[#252522]">1.5x Expansion</span>
                <span className="text-[#252522]/60 text-[11px]">Up to 400m cushioning</span>
              </div>
              <div>
                <span className="block font-semibold text-[#252522]">100% Recyclable</span>
                <span className="text-[#252522]/60 text-[11px]">Clean unbleached kraft</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden bg-[#EDE4D7]/40 border border-[#E0D5C3] p-3 shadow-md group">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#FAF8F3]">
                <img
                  src={product.images[0]?.url || '/src/assets/images/honeycomb_kraft_roll_1792921915850.jpg'}
                  alt={product.images[0]?.alt || "Brother's Honeycomb Kraft Paper Wrap Roll"}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Dimension Callout */}
                <div className="absolute bottom-3 left-3 bg-[#FAF8F3]/95 backdrop-blur-sm border border-[#E0D5C3] rounded-lg px-3 py-2 text-xs shadow-xs">
                  <div className="font-semibold text-[#252522]">10-inch width roll</div>
                  <div className="text-[11px] text-[#A8794F]">Expands into 3D hexagonal mesh</div>
                </div>

                <button
                  onClick={() => setCurrentView('product')}
                  className="absolute top-3 right-3 bg-[#252522]/80 hover:bg-[#252522] text-[#FAF8F3] backdrop-blur-sm rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors"
                >
                  View Gallery
                </button>
              </div>

              {/* Sub-gallery previews */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {product.images.slice(1, 4).map((img, i) => (
                  <button
                    key={img.id || i}
                    onClick={() => setCurrentView('product')}
                    className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#E0D5C3] bg-white group/thumb"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
