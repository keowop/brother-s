/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingCart, Sparkles, Gift, Heart, Home, Factory } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhoIsItFor: React.FC = () => {
  const { setIsBulkQuoteOpen } = useStore();

  const customerSegments = [
    {
      icon: ShoppingCart,
      title: 'Online Sellers & Marketplaces',
      badge: 'High-Volume Shipping',
      description:
        'Sellers on Amazon, Flipkart, and Shopify needing fast packing speeds, lower tape expenses, and compact storage.',
      typicalVolume: '5–50 rolls / month',
    },
    {
      icon: Sparkles,
      title: 'D2C Consumer Brands',
      badge: 'Unboxing Focus',
      description:
        'Eco-conscious lifestyle brands elevating customer unboxing while eliminating single-use plastic bubble film.',
      typicalVolume: '10–100 rolls / month',
    },
    {
      icon: Heart,
      title: 'Cosmetics & Skincare',
      badge: 'Glass & Pipettes',
      description:
        'Apothecaries and beauty labs protecting fragile glass serum droppers, essential oil vials, and luxury cream jars.',
      typicalVolume: '3–25 rolls / month',
    },
    {
      icon: Home,
      title: 'Ceramics & Home Decor',
      badge: 'Fragile Curvature',
      description:
        'Potters, artisanal glassware creators, and candle makers wrapping irregular, tapered, or sculpted shapes.',
      typicalVolume: '4–30 rolls / month',
    },
    {
      icon: Gift,
      title: 'Artisanal Gifts & Hampers',
      badge: 'Natural Aesthetic',
      description:
        'Gifting houses and event hampers looking for tactile, earthy kraft paper textures that look intentional.',
      typicalVolume: '2–20 rolls / month',
    },
    {
      icon: Factory,
      title: 'Small Manufacturers',
      badge: 'Component Protection',
      description:
        'Engineering, hardware, and handcrafted goods seeking scratch protection during inter-facility transit.',
      typicalVolume: '20–200 rolls / month',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#EDE4D7]/20 border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
            <span>Target Industries</span>
            <span className="text-[#252522]/30" aria-hidden="true">·</span>
            <span>Packaging Applications</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#252522] tracking-tight">
            Who Uses Brother&apos;s Honeycomb Wrap?
          </h2>
          <p className="text-sm sm:text-base text-[#252522]/70 [text-wrap:pretty]">
            From boutique indie makers to fast-scaling e-commerce dispatch centers across India.
          </p>
        </div>

        {/* 6-Card Restrained Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerSegments.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <div
                key={i}
                className="bg-[#FAF8F3] border border-[#E0D5C3] rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#A8794F] transition-colors shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#EDE4D7] flex items-center justify-center text-[#A8794F]">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#69765A] uppercase tracking-wider">
                      {seg.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#252522]">
                    {seg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#252522]/75 leading-relaxed">
                    {seg.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E0D5C3]/70 flex items-center justify-between text-xs">
                  <span className="text-[#252522]/60">Typical Usage:</span>
                  <span className="font-semibold text-[#252522] tabular-nums">
                    {seg.typicalVolume}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inbound volume prompt */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#252522]/70">
            Have specialized volume requirements or need customized pallet shipping?{' '}
            <button
              onClick={() => setIsBulkQuoteOpen(true)}
              className="font-semibold text-[#A8794F] underline underline-offset-4 hover:text-[#252522] transition-colors cursor-pointer"
            >
              Enquire about custom B2B slabs &rarr;
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
