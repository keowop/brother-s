/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/defaultData';
import { useStore } from '../context/StoreContext';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { setIsBulkQuoteOpen } = useStore();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F3] border-t border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#252522] tracking-tight">
            Verified Packaging & Ordering Answers
          </h2>
          <p className="text-xs sm:text-sm text-[#252522]/70 max-w-xl mx-auto">
            Everything you need to know about honeycomb kraft paper wrap, roll dimensions, GST
            invoicing, and transit protection.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E0D5C3] rounded-xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F3] transition-colors"
                >
                  <span className="font-display text-sm font-bold text-[#252522]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A8794F] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#252522]/80 leading-relaxed border-t border-[#E0D5C3]/60 pt-3.5 bg-[#FAF8F3]/40 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bulk Support prompt */}
        <div className="mt-10 p-4 rounded-xl bg-[#EDE4D7]/40 border border-[#E0D5C3] text-center text-xs space-y-1">
          <span className="font-semibold text-[#252522]">
            Have a custom industrial question or need laboratory test samples?
          </span>
          <div>
            <button
              onClick={() => setIsBulkQuoteOpen(true)}
              className="text-[#A8794F] font-bold underline underline-offset-2 hover:text-[#252522] cursor-pointer"
            >
              Contact our packaging specialists for a bulk quote &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
