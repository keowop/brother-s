/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BulkWholesaleSection: React.FC = () => {
  const { product, pricingTiers, setIsBulkQuoteOpen, addToCart, setIsCartOpen } = useStore();

  const handleSelectTier = (minQty: number) => {
    addToCart(product, minQty);
    setIsCartOpen(true);
  };

  return (
    <section className="py-12 lg:py-16 bg-stone-50 border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8794F] block mb-1">
              Commercial Packaging Procurement
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900">
              B2B Wholesale & Quantity Slabs
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBulkQuoteOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#A8794F] text-white rounded-lg text-xs font-bold hover:bg-[#966842] transition-colors shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-white" />
              <span>Request Custom Pallet Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Wholesale Slabs Cards - Crisp Light Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {pricingTiers.map((tier) => {
            const slabPrice = Math.round(
              product.basePrice * (1 - tier.discountPercentage / 100)
            );
            const isCustom = tier.isBulkEnquiry;
            return (
              <div
                key={tier.id}
                className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 shadow-2xs ${
                  isCustom
                    ? 'bg-amber-50/50 border-[#A8794F]'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">{tier.label}</span>
                    {tier.discountPercentage > 0 && (
                      <span className="text-[10px] font-bold bg-[#A8794F] text-white px-2 py-0.5 rounded">
                        Save {tier.discountPercentage}%
                      </span>
                    )}
                  </div>

                  <div className="pt-1">
                    {isCustom ? (
                      <div className="text-xl font-extrabold text-stone-900">Custom Slab</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-stone-900 tabular-nums">
                          ₹{slabPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-stone-500">/ roll</span>
                      </div>
                    )}
                    <span className="text-[10px] text-stone-500 block pt-0.5">
                      +18% GST with Tax Invoice
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-[11px] text-stone-600 pt-2 border-t border-stone-100">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{tier.minQty >= 3 ? 'Free Surface Shipping' : 'Subsidized Courier'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Input Tax Credit (ITC)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Same-day dispatch</span>
                    </li>
                  </ul>
                </div>

                <div>
                  {isCustom ? (
                    <button
                      type="button"
                      onClick={() => setIsBulkQuoteOpen(true)}
                      className="w-full py-2.5 px-3 bg-[#A8794F] hover:bg-[#966842] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer text-center"
                    >
                      Enquire for 20+ Rolls
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSelectTier(tier.minQty)}
                      className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg text-xs transition-colors cursor-pointer text-center border border-stone-200"
                    >
                      Add {tier.minQty} Rolls to Bag
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
