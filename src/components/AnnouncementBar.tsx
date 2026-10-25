/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { setIsBulkQuoteOpen } = useStore();

  if (dismissed) return null;

  return (
    <div className="bg-amber-50/80 border-b border-amber-200/60 text-stone-800 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[12px] font-medium tracking-wide">
          <span className="font-bold text-[#A8794F]">Brother&apos;s Packaging</span>
          <span className="text-stone-300" aria-hidden="true">·</span>
          <span>Smarter Protective Paper Packaging for Indian E-Commerce</span>
          <span className="hidden md:inline text-stone-300" aria-hidden="true">·</span>
          <button
            onClick={() => setIsBulkQuoteOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-[#A8794F] hover:underline cursor-pointer"
          >
            Volume discounts from 3+ rolls
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
