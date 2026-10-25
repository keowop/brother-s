/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: 'Vikramaditya S.',
      role: 'Founder, Clay & Kiln Ceramics (New Delhi)',
      rating: 5,
      date: 'Verified Order · 4 Rolls',
      title: 'Completely replaced plastic bubble wrap in our studio',
      content:
        'We ship stoneware ceramics across India. Honeycomb wrap has cut down our wrapping time significantly because it self-locks without tape. Zero transit breakage so far across 120+ shipments.',
    },
    {
      author: 'Ananya Deshmukh',
      role: 'Operations Head, Botanica Organics (Bengaluru)',
      rating: 5,
      date: 'Verified Order · 2 Rolls',
      title: 'Our customers love the unboxing aesthetic',
      content:
        'As an organic cosmetic brand, shipping glass serum bottles wrapped in plastic felt contradictory. Brother’s honeycomb wrap gives our parcels a beautiful artisanal feel and cushions the dropper bottles snugly.',
    },
    {
      author: 'Manish Chawla',
      role: 'E-Commerce Seller, CraftGifts India (Jaipur)',
      rating: 5,
      date: 'Verified Order · 6 Rolls',
      title: 'Takes up 80% less space in our packaging station',
      content:
        'The compact 10-inch roll fits right on our packing bench. It replaces 3 huge rolls of plastic bubble wrap that used to clutter our dispatch area. Great quality kraft paper.',
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#A8794F] mb-1">
              Customer Feedback
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900">
              Verified Packaging Reviews
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-stone-900">4.9 / 5.0</span>
            <span className="text-xs text-stone-500">Based on 84 merchant orders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/80 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#EDE4D7] text-stone-900 font-bold flex items-center justify-center text-xs">
                  {rev.author[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-stone-900 text-xs truncate flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-stone-500 truncate">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
