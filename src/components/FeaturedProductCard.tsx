/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check, ShieldCheck, Ruler, Weight, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FeaturedProductCard: React.FC = () => {
  const {
    product,
    pricingTiers,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setCurrentView,
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  // Calculate price for selected quantity based on configured tiers
  const getTierForQty = (qty: number) => {
    const sorted = [...pricingTiers].sort((a, b) => a.minQty - b.minQty);
    let matched = sorted[0];
    for (const t of sorted) {
      if (qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty)) {
        matched = t;
        break;
      }
      if (t.maxQty === null && qty >= t.minQty) {
        matched = t;
      }
    }
    return matched;
  };

  const currentTier = getTierForQty(quantity);
  const discountPercent = currentTier?.discountPercentage || 0;
  const unitPrice = Math.round(product.basePrice * (1 - discountPercent / 100));
  const totalRawPrice = unitPrice * quantity;
  const taxAmount = Math.round(totalRawPrice * (product.taxRatePercent / 100));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <section id="featured-product" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
            <span>Packaging Supplies</span>
            <span className="text-[#252522]/30" aria-hidden="true">·</span>
            <span>Flagship Release</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#252522] tracking-tight">
            Our First Packaging Essential
          </h2>
          <p className="text-sm sm:text-base text-[#252522]/70 [text-wrap:pretty]">
            Engineered for high-volume wrapping. Expandable brown kraft paper that locks into 3D
            cushioning cells to protect your shipments sustainably.
          </p>
        </div>

        {/* Featured Showcase Card */}
        <div className="bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Section */}
            <div className="lg:col-span-6 bg-[#EDE4D7]/20 p-6 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E0D5C3]">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white border border-[#E0D5C3]/80 group">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#252522] text-[#FAF8F3] px-3 py-1 rounded text-xs font-medium">
                  SKU: {product.sku}
                </div>
              </div>

              {/* Verified Specification Badges */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#E0D5C3]/70 text-xs">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#A8794F] shrink-0" />
                  <div>
                    <span className="block font-semibold text-[#252522]">10 in × 250 m</span>
                    <span className="text-[11px] text-[#252522]/60">Provisional Dimensions</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-[#A8794F] shrink-0" />
                  <div>
                    <span className="block font-semibold text-[#252522]">80 GSM</span>
                    <span className="text-[11px] text-[#252522]/60">Virgin Kraft Grade</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#A8794F] shrink-0" />
                  <div>
                    <span className="block font-semibold text-[#252522]">24h Dispatch</span>
                    <span className="text-[11px] text-[#252522]/60">From Central Hub</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Configuration & Purchase Module */}
            <div className="lg:col-span-6 p-6 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#69765A] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#69765A]" />
                    <span>In Stock · Ready to Dispatch</span>
                  </div>
                  <button
                    onClick={() => setCurrentView('product')}
                    className="text-xs font-semibold text-[#A8794F] hover:underline flex items-center gap-1"
                  >
                    <span>View Technical Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#252522]">
                  {product.title}
                </h3>

                <p className="text-sm text-[#252522]/75 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Pricing Display */}
                <div className="p-4 rounded-xl bg-[#EDE4D7]/40 border border-[#E0D5C3] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-extrabold text-[#252522] tabular-nums">
                        ₹{unitPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#252522]/60 ml-2">/ roll</span>
                    </div>
                    {discountPercent > 0 && (
                      <span className="text-xs font-bold text-[#69765A] bg-white px-2.5 py-1 rounded-md border border-[#D5DACF]">
                        {discountPercent}% Volume Discount Applied
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#252522]/60 flex items-center justify-between pt-1">
                    <span>Applicable GST: 18% (₹{Math.round(unitPrice * 0.18)} per roll)</span>
                    <span>Free delivery on 3+ rolls</span>
                  </div>
                </div>

                {/* Volume Tiers Breakdown */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-[#252522] block">
                    Quantity Pricing Slabs:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {pricingTiers.slice(0, 3).map((tier) => {
                      const isActive =
                        quantity >= tier.minQty &&
                        (tier.maxQty === null || quantity <= tier.maxQty);
                      const tierPrice = Math.round(
                        product.basePrice * (1 - tier.discountPercentage / 100)
                      );
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setQuantity(tier.minQty)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            isActive
                              ? 'border-[#252522] bg-[#252522] text-[#FAF8F3]'
                              : 'border-[#E0D5C3] bg-white text-[#252522] hover:border-[#A8794F]'
                          }`}
                        >
                          <div className="text-[11px] font-medium opacity-80">
                            {tier.minQty}
                            {tier.maxQty ? `–${tier.maxQty}` : '+'} rolls
                          </div>
                          <div className="text-sm font-bold tabular-nums">
                            ₹{tierPrice.toLocaleString('en-IN')}
                          </div>
                          {tier.discountPercentage > 0 && (
                            <div
                              className={`text-[10px] font-semibold mt-0.5 ${
                                isActive ? 'text-[#EDE4D7]' : 'text-[#69765A]'
                              }`}
                            >
                              Save {tier.discountPercentage}%
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-[#252522]/80 block">Select Rolls:</span>
                    <div className="flex items-center border border-[#E0D5C3] bg-white rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3.5 py-2 text-sm font-semibold hover:bg-[#EDE4D7]/40 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-[#252522] min-w-10 text-center tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3.5 py-2 text-sm font-semibold hover:bg-[#EDE4D7]/40 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-medium text-[#252522]/80 block">Estimated Total:</span>
                    <div className="text-lg font-bold text-[#252522] tabular-nums py-1.5">
                      ₹{totalRawPrice.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-[#252522]/60">
                        (+ ₹{taxAmount.toLocaleString('en-IN')} GST)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E0D5C3]">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-[#252522] bg-[#EDE4D7] hover:bg-[#E3D8C8] border border-[#DDD3C2] rounded-lg transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#A8794F]" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-[#FAF8F3] bg-[#252522] hover:bg-[#383833] rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4 text-[#EDE4D7]" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] text-[#252522]/70 pt-1">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#69765A]" />
                    <span>GST Invoiced</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#69765A]" />
                    <span>Transit Inspected</span>
                  </span>
                  <span>·</span>
                  <span>Dispatched in 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
