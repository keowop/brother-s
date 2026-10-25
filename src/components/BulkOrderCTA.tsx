/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BulkOrderCTA: React.FC = () => {
  const { setIsBulkQuoteOpen } = useStore();

  return (
    <section className="py-16 lg:py-20 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
                <span>Commercial Volume Slabs</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span>GST Tax Invoicing</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
                Packaging More Orders Every Day?
              </h2>

              <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed [text-wrap:pretty]">
                Tell us about your packaging requirements. Brother&apos;s can help you enquire
                about quantity-based pricing for your business, pallet rates, and scheduled
                dispatches across India.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A8794F]" />
                  Dedicated Account Representative
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A8794F]" />
                  Verified Indian GST Invoices
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A8794F]" />
                  Direct Factory Logistics
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => setIsBulkQuoteOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white bg-[#A8794F] hover:bg-[#966842] rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <FileText className="w-4.5 h-4.5 text-amber-100" />
                <span>Request a Bulk Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-100" />
              </button>

              <p className="text-center text-[11px] text-[#FAF8F3]/50">
                Quotes usually returned within 4 business hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
