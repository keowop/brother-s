/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, X, ShieldAlert, Sparkles, Box, Leaf } from 'lucide-react';

export const WhyHoneycomb: React.FC = () => {
  return (
    <section id="why-honeycomb" className="py-16 lg:py-24 bg-[#EDE4D7]/20 border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
            <span>Material Science & Practical Mechanics</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#252522] tracking-tight leading-tight">
            How Expandable Honeycomb Wrap Works
          </h2>
          <p className="text-base sm:text-lg text-[#252522]/80 leading-relaxed [text-wrap:pretty]">
            Traditional bubble wrap traps air inside thin plastic membranes that frequently puncture
            under courier compression. Honeycomb wrap replaces pneumatic bubbles with structural
            geometry: precision slits in high-tensile kraft paper that open into a continuous 3D
            hexagonal mesh.
          </p>
        </div>

        {/* 3 Pillars of Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-[#FAF8F3] border border-[#E0D5C3] rounded-xl space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#EDE4D7] flex items-center justify-center text-[#A8794F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-[#252522]">
              Self-Locking Cells
            </h3>
            <p className="text-xs sm:text-sm text-[#252522]/75 leading-relaxed">
              As the hexagonal web expands, the angled kraft edges naturally hook into one another.
              Items can be wrapped firmly without messy adhesive tape, saving packing time on busy
              fulfillment lines.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F3] border border-[#E0D5C3] rounded-xl space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#EDE4D7] flex items-center justify-center text-[#A8794F]">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-[#252522]">
              Adaptive Form Cushioning
            </h3>
            <p className="text-xs sm:text-sm text-[#252522]/75 leading-relaxed">
              Unlike rigid cardboard inserts, expandable kraft mesh molds smoothly over tapered
              perfume bottles, artisanal ceramic mugs, and irregular handmade items, creating a
              snug protective envelope.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F3] border border-[#E0D5C3] rounded-xl space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#EDE4D7] flex items-center justify-center text-[#69765A]">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-[#252522]">
              100% Recyclable Unboxing
            </h3>
            <p className="text-xs sm:text-sm text-[#252522]/75 leading-relaxed">
              Customers can discard the entire packaging directly into standard paper recycling bins.
              No microplastics, no separating tape from film, and a distinctly artisanal unboxing
              feel.
            </p>
          </div>
        </div>

        {/* Responsible Packaging Disclaimer Callout */}
        <div className="p-6 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3] flex items-start gap-4 mb-16">
          <ShieldAlert className="w-5 h-5 text-[#A8794F] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display text-sm font-semibold text-[#252522]">
              A Note on Protective Packaging Realities
            </h4>
            <p className="text-xs sm:text-sm text-[#252522]/70 leading-relaxed">
              Brother&apos;s does not make unrealistic claims of guaranteed zero damage. Transit
              resilience in courier shipping depends on the weight and fragility of your product,
              using adequate wraps (we recommend 2–3 layers for glassware), matching box sizing, and
              appropriate void fill during dispatch.
            </p>
          </div>
        </div>

        {/* Material Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-xl font-bold text-[#252522]">
              Packaging Material Comparison
            </h3>
            <span className="text-xs text-[#252522]/60 hidden sm:inline">
              Evaluated across typical Indian e-commerce fulfillment conditions
            </span>
          </div>

          <div className="overflow-x-auto border border-[#E0D5C3] rounded-xl bg-[#FAF8F3]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E0D5C3] bg-[#EDE4D7]/40 text-[#252522]">
                  <th className="py-3 px-4 font-semibold">Evaluation Criteria</th>
                  <th className="py-3 px-4 font-bold text-[#A8794F]">Brother&apos;s Honeycomb Wrap</th>
                  <th className="py-3 px-4 font-medium text-[#252522]/70">Plastic Bubble Wrap</th>
                  <th className="py-3 px-4 font-medium text-[#252522]/70">Shredded Corrugated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0D5C3]/70 text-[#252522]/85">
                <tr>
                  <td className="py-3 px-4 font-medium text-[#252522]">Storage Space in Warehouse</td>
                  <td className="py-3 px-4 text-[#69765A] font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#69765A]" /> Compact rolls (80% less space)
                  </td>
                  <td className="py-3 px-4 text-[#252522]/60">Bulky air rolls occupy huge volume</td>
                  <td className="py-3 px-4 text-[#252522]/60">Requires large collection bins</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#252522]">Tape Requirement</td>
                  <td className="py-3 px-4 text-[#69765A] font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#69765A]" /> Interlocking cells hold without tape
                  </td>
                  <td className="py-3 px-4 text-red-700/80 flex items-center gap-1">
                    <X className="w-4 h-4" /> Requires adhesive plastic tape
                  </td>
                  <td className="py-3 px-4 text-[#252522]/60">Loose fill; requires box taping</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#252522]">End-Consumer Recycling</td>
                  <td className="py-3 px-4 text-[#69765A] font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#69765A]" /> 100% Biodegradable & curbside paper
                  </td>
                  <td className="py-3 px-4 text-red-700/80 flex items-center gap-1">
                    <X className="w-4 h-4" /> Hard to recycle LDPE film
                  </td>
                  <td className="py-3 px-4 text-[#69765A] flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#69765A]" /> Recyclable paper
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#252522]">Unboxing Aesthetic</td>
                  <td className="py-3 px-4 text-[#A8794F] font-semibold">
                    Artisanal, premium organic feel
                  </td>
                  <td className="py-3 px-4 text-[#252522]/60">Generic synthetic plastic look</td>
                  <td className="py-3 px-4 text-[#252522]/60">Dusty and messy to unpack</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
