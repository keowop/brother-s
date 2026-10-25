/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, X, ArrowRight, Layers, FileText, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FAQ_DATA } from '../data/defaultData';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    product,
    setCurrentView,
    setIsBulkQuoteOpen,
    addToCart,
    setIsCartOpen,
  } = useStore();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Filter searchable items
  const matchingFaqs = cleanQuery
    ? FAQ_DATA.filter(
        (f) =>
          f.q.toLowerCase().includes(cleanQuery) ||
          f.a.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchesProduct =
    cleanQuery &&
    (product.title.toLowerCase().includes(cleanQuery) ||
      product.description.toLowerCase().includes(cleanQuery) ||
      product.gsm.toLowerCase().includes(cleanQuery) ||
      product.material.toLowerCase().includes(cleanQuery) ||
      'honeycomb kraft paper roll packaging wrap protective'.includes(cleanQuery));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E0D5C3] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#A8794F] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search specs, roll dimensions, GSM, bulk tiers, FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium bg-transparent border-none focus:outline-hidden text-[#252522]"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded text-[#252522]/50 hover:text-[#252522]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {!cleanQuery ? (
            <div className="space-y-3 py-4">
              <span className="font-semibold text-[#252522]/60 uppercase tracking-wider text-[10px] block">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  '10 inch width',
                  '80 GSM kraft',
                  'Expansion ratio',
                  'Bulk pricing slabs',
                  'Replacing bubble wrap',
                  'Cosmetics packaging',
                  'GST invoice',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-[#EDE4D7]/50 hover:bg-[#EDE4D7] rounded-lg text-xs font-medium text-[#252522] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Product Match */}
              {matchesProduct && (
                <div className="p-3.5 bg-white border border-[#E0D5C3] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#A8794F] uppercase tracking-wider">
                      Flagship Product
                    </span>
                    <span className="font-bold text-[#252522] tabular-nums">
                      ₹{product.basePrice.toLocaleString('en-IN')} / roll
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#252522]">
                    {product.title}
                  </h4>
                  <p className="text-xs text-[#252522]/70">
                    {product.width} × {product.length} · {product.gsm} ·{' '}
                    {product.expansionRatio}
                  </p>
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setCurrentView('product');
                      }}
                      className="px-3 py-1.5 bg-[#A8794F] hover:bg-[#966842] text-white rounded-md text-xs font-semibold shadow-xs cursor-pointer"
                    >
                      View Specifications
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        setIsSearchOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="px-3 py-1.5 bg-[#EDE4D7] text-[#252522] rounded-md text-xs font-semibold"
                    >
                      Add 1 Roll to Bag
                    </button>
                  </div>
                </div>
              )}

              {/* FAQ Matches */}
              {matchingFaqs.length > 0 && (
                <div className="space-y-2">
                  <span className="font-semibold text-[#252522]/60 uppercase tracking-wider text-[10px] block">
                    Knowledge Base & FAQs:
                  </span>
                  {matchingFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white border border-[#E0D5C3] rounded-xl space-y-1"
                    >
                      <h5 className="font-bold text-[#252522] text-xs">{faq.q}</h5>
                      <p className="text-[11px] text-[#252522]/75 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* No match fallback */}
              {!matchesProduct && matchingFaqs.length === 0 && (
                <div className="py-8 text-center space-y-2">
                  <p className="text-xs text-[#252522]/60">
                    No exact results found for &quot;{query}&quot;.
                  </p>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setIsBulkQuoteOpen(true);
                    }}
                    className="text-xs text-[#A8794F] font-bold underline"
                  >
                    Have a specific question? Contact our team &rarr;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
