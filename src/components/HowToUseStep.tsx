/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, CheckCircle2 } from 'lucide-react';

export const HowToUseStep: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Pull & Expand',
      subtitle: 'Activate the 3D hexagonal mesh',
      desc: 'Draw the kraft paper roll firmly with both hands. Notice how the pre-cut slits gently yield and stretch open into raised hexagonal cushions with approx 1.5x expansion.',
      image: '/src/assets/images/honeycomb_mesh_closeup_1792921916507.jpg',
      imageAlt: 'Expanded kraft honeycomb paper cells stretched open',
      proTip: 'Keep consistent tension across the 10-inch width for uniform honeycomb elevation.',
    },
    {
      num: '02',
      title: 'Interlock & Wrap',
      subtitle: 'Enclose the product securely',
      desc: 'Roll your fragile glassware, cosmetic bottle, or ceramic gift item snugly. The angled paper edges naturally catch and lock onto each other without needing plastic adhesive tape.',
      image: '/src/assets/images/honeycomb_wrapped_item_1792921916889.jpg',
      imageAlt: 'Bottle and cosmetic jar snugly wrapped in honeycomb paper',
      proTip: 'For heavy or ultra-fragile items, apply 2 to 3 continuous layers for maximum damping.',
    },
    {
      num: '03',
      title: 'Pack & Dispatch',
      subtitle: 'Seat into an outer shipping box',
      desc: 'Tuck the wrapped parcel into a sturdy corrugated mailer. Fill any remaining void space so the item remains immobilized during courier handling and transit.',
      image: '/src/assets/images/honeycomb_roll_dimensions_1792921917854.jpg',
      imageAlt: 'Finished kraft packaging parcel inside shipping carton',
      proTip: 'Seal your outer carton with water-activated kraft paper tape for a 100% recyclable parcel.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F3] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
            <span>Packaging Technique</span>
            <span className="text-[#252522]/30" aria-hidden="true">·</span>
            <span>Three Simple Steps</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#252522] tracking-tight">
            How to Use Brother&apos;s Honeycomb Wrap
          </h2>
          <p className="text-sm sm:text-base text-[#252522]/70 [text-wrap:pretty]">
            Fast, intuitive packaging that speeds up order fulfillment without messy plastic dispensers.
          </p>
        </div>

        {/* Step Selector & Visual Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Step Controls (Left) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((s, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#252522] bg-[#FAF8F3] shadow-xs'
                      : 'border-[#E0D5C3] bg-[#EDE4D7]/20 hover:bg-[#EDE4D7]/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-lg font-bold font-display ${
                        isSelected ? 'text-[#A8794F]' : 'text-[#252522]/40'
                      }`}
                    >
                      {s.num}
                    </span>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-base font-bold text-[#252522]">
                          {s.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-[#69765A] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Active Step
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-[#A8794F]">{s.subtitle}</p>
                      <p className="text-xs text-[#252522]/75 leading-relaxed pt-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Visual Preview (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white border border-[#E0D5C3]/80">
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].imageAlt}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#252522]/90 text-[#FAF8F3] backdrop-blur-sm px-3 py-1 rounded-md text-xs font-semibold">
                  Step {steps[activeStep].num}: {steps[activeStep].title}
                </div>
              </div>

              {/* Step Pro-Tip Callout */}
              <div className="p-4 rounded-xl bg-[#EDE4D7]/40 border border-[#E0D5C3] flex items-start gap-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-[#A8794F] text-[#FAF8F3] flex items-center justify-center shrink-0 text-[11px] font-bold">
                  i
                </div>
                <div>
                  <span className="font-semibold text-[#252522]">Packaging Tip: </span>
                  <span className="text-[#252522]/80">{steps[activeStep].proTip}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
