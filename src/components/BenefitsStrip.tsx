/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, Box, Sparkles, Building2 } from 'lucide-react';

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: Layers,
      title: 'Expandable Honeycomb Structure',
      description:
        'Hexagonal interlocking cells expand upon gentle pull, cushioning goods without plastic film.',
    },
    {
      icon: Box,
      title: 'Convenient Roll Format',
      description:
        'Compact 10-inch width roll stores in 80% less space than pre-inflated plastic bubble rolls.',
    },
    {
      icon: Sparkles,
      title: 'Flexible Wrapping Applications',
      description:
        'Adapts smoothly to curved, cylindrical, and irregular items like glassware, cosmetics and decor.',
    },
    {
      icon: Building2,
      title: 'Bulk Enquiries Welcome',
      description:
        'Direct slab pricing, pro-forma GST invoicing, and freight dispatch for growing e-commerce sellers.',
    },
  ];

  return (
    <section className="border-y border-[#E8DFC8] bg-[#EDE4D7]/30 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[#E0D5C3] flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className="w-4.5 h-4.5 text-[#A8794F]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-sm font-semibold text-[#252522]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#252522]/70 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
