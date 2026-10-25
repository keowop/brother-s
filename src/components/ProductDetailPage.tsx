/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShoppingBag,
  ArrowRight,
  FileText,
  Ruler,
  Weight,
  Layers,
  Truck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_PIN_CODES } from '../data/defaultData';

export const ProductDetailPage: React.FC = () => {
  const {
    product,
    pricingTiers,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsBulkQuoteOpen,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pinInput, setPinInput] = useState('');
  const [pinResult, setPinResult] = useState<{
    tested: boolean;
    serviceable: boolean;
    city?: string;
    state?: string;
    estimatedDays?: string;
  } | null>(null);

  // Active volume tier calculation
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

  const checkPinCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim();
    if (clean.length !== 6) return;

    if (SAMPLE_PIN_CODES[clean]) {
      const match = SAMPLE_PIN_CODES[clean];
      setPinResult({
        tested: true,
        serviceable: true,
        city: match.city,
        state: match.state,
        estimatedDays: match.estimatedDays,
      });
    } else {
      // General valid Indian 6-digit PIN code estimation
      setPinResult({
        tested: true,
        serviceable: true,
        city: 'Verified PIN Sector',
        state: 'India',
        estimatedDays: '2-4 business days (Express Surface Cargo)',
      });
    }
  };

  return (
    <div className="py-10 lg:py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#252522]/60 mb-8">
          <span>Home</span>
          <span>/</span>
          <span>Protective Packaging</span>
          <span>/</span>
          <span className="font-semibold text-[#252522]">{product.title}</span>
        </nav>

        {/* Contiguous Purchase Module: Gallery Left, Sticky Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Left (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Viewport */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FAF8F3] border border-[#E0D5C3] shadow-xs group">
              <img
                src={product.images[selectedImageIndex]?.url}
                alt={product.images[selectedImageIndex]?.alt}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#252522]/85 text-[#FAF8F3] backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium">
                {product.images[selectedImageIndex]?.title}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                    selectedImageIndex === idx
                      ? 'border-[#252522] shadow-xs scale-[1.02]'
                      : 'border-[#E0D5C3] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Comprehensive Technical Specification Table */}
            <div className="pt-8 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#252522]">
                Detailed Technical Specifications
              </h3>
              <div className="border border-[#E0D5C3] rounded-xl overflow-hidden bg-white text-xs">
                <div className="divide-y divide-[#E0D5C3]">
                  <div className="grid grid-cols-2 p-3.5 bg-[#EDE4D7]/20">
                    <span className="font-semibold text-[#252522]">Product Title</span>
                    <span className="text-[#252522]/85">{product.title}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-semibold text-[#252522]">SKU Code</span>
                    <span className="text-[#252522]/85 font-mono">{product.sku}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5 bg-[#EDE4D7]/20">
                    <span className="font-semibold text-[#252522]">Roll Width</span>
                    <span className="text-[#252522]/85">{product.width}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-semibold text-[#252522]">Unexpanded Length</span>
                    <span className="text-[#252522]/85">{product.length}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5 bg-[#EDE4D7]/20">
                    <span className="font-semibold text-[#252522]">Expansion Ratio</span>
                    <span className="text-[#69765A] font-semibold">{product.expansionRatio}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-semibold text-[#252522]">Paper Basis Weight (GSM)</span>
                    <span className="text-[#252522]/85">{product.gsm}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5 bg-[#EDE4D7]/20">
                    <span className="font-semibold text-[#252522]">Material Composition</span>
                    <span className="text-[#252522]/85">{product.material}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-semibold text-[#252522]">Natural Color</span>
                    <span className="text-[#252522]/85">{product.color}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5 bg-[#EDE4D7]/20">
                    <span className="font-semibold text-[#252522]">Indian Tax Treatment</span>
                    <span className="text-[#252522]/85">{product.taxRatePercent}% GST (HSN 480890)</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-semibold text-[#252522]">Packaging Storage</span>
                    <span className="text-[#252522]/85">Store in dry ambient conditions away from direct water</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Purchase Module Right (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl p-6 lg:p-7 shadow-xs space-y-5">
              {/* Header Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#69765A] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#69765A]" />
                    In Stock ({product.stockCount} rolls ready)
                  </span>
                  <span className="text-[#252522]/60 font-mono text-[11px]">{product.sku}</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#252522] leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs text-[#252522]/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Dynamic Price Box */}
              <div className="p-4 rounded-xl bg-[#EDE4D7]/40 border border-[#E0D5C3] space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#252522] tabular-nums">
                      ₹{unitPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#252522]/60">per roll</span>
                  </div>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-[#69765A] bg-white px-2 py-0.5 rounded border border-[#D5DACF]">
                      {discountPercent}% Tier Discount
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#252522]/65 flex items-center justify-between">
                  <span>+18% GST (₹{Math.round(unitPrice * 0.18)} tax)</span>
                  <span>Free shipping on 3+ rolls</span>
                </div>
              </div>

              {/* Volume Discount Slabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#252522]">Volume Slabs:</span>
                  <button
                    onClick={() => setIsBulkQuoteOpen(true)}
                    className="text-[#A8794F] font-semibold hover:underline"
                  >
                    Need 20+ rolls? Request Quote &rarr;
                  </button>
                </div>
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
                            className={`text-[10px] font-semibold ${
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

              {/* Quantity Stepper & Total Preview */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="flex items-center border border-[#E0D5C3] bg-white rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-sm font-semibold hover:bg-[#EDE4D7]/50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 text-sm font-bold text-[#252522] min-w-10 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2.5 text-sm font-semibold hover:bg-[#EDE4D7]/50 transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#252522]/60">Subtotal (excl. tax)</div>
                  <div className="text-base font-bold text-[#252522] tabular-nums">
                    ₹{totalRawPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#252522] bg-[#EDE4D7] hover:bg-[#E3D8C8] border border-[#DDD3C2] rounded-lg transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#A8794F]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#FAF8F3] bg-[#252522] hover:bg-[#383833] rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#EDE4D7]" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBulkQuoteOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#A8794F] bg-white border border-[#E0D5C3] hover:border-[#A8794F] rounded-lg transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Custom Bulk Pricing</span>
                </button>
              </div>

              {/* PIN Code Serviceability Checker */}
              <div className="pt-4 border-t border-[#E0D5C3] space-y-2">
                <span className="text-xs font-semibold text-[#252522] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A8794F]" />
                  Check Delivery Serviceability
                </span>
                <form onSubmit={checkPinCode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Indian PIN (e.g. 110020)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-[#E0D5C3] rounded-lg text-xs font-mono focus:outline-hidden focus:border-[#A8794F]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#252522] bg-[#EDE4D7] hover:bg-[#E3D8C8] rounded-lg border border-[#DDD3C2] transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pinResult && pinResult.tested && (
                  <div className="p-2.5 rounded-lg bg-[#EDE4D7]/30 border border-[#E0D5C3] text-xs space-y-1">
                    <div className="font-semibold text-[#69765A] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Serviceable · {pinResult.city}, {pinResult.state}
                    </div>
                    <div className="text-[11px] text-[#252522]/70">
                      Estimated Delivery: {pinResult.estimatedDays}
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-[#252522]/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#69765A]" />
                  <span>Verified Indian GST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#69765A]" />
                  <span>48h Transit Damage Cover</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
