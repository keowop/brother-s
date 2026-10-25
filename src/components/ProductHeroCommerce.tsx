/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShoppingBag,
  Zap,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Layers,
  MapPin,
  ArrowRight,
  FileText,
  Star,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_PIN_CODES } from '../data/defaultData';

export const ProductHeroCommerce: React.FC = () => {
  const {
    product,
    pricingTiers,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsBulkQuoteOpen,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('10x250');
  const [pinCode, setPinCode] = useState('');
  const [pinStatus, setPinStatus] = useState<{
    checked: boolean;
    valid: boolean;
    city?: string;
    eta?: string;
  } | null>(null);

  // Compute active volume tier discount
  const getActiveTier = (qty: number) => {
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

  const activeTier = getActiveTier(selectedQuantity);
  const discountPercent = activeTier?.discountPercentage || 0;
  const unitPrice = Math.round(product.basePrice * (1 - discountPercent / 100));
  const rawTotal = unitPrice * selectedQuantity;
  const taxAmount = Math.round(rawTotal * 0.18);
  const isFreeShipping = selectedQuantity >= 3;

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
    setIsCartOpen(true);
  };

  const handleInstantBuy = () => {
    addToCart(product, selectedQuantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinCode.trim();
    if (clean.length !== 6) return;

    if (SAMPLE_PIN_CODES[clean]) {
      const match = SAMPLE_PIN_CODES[clean];
      setPinStatus({
        checked: true,
        valid: true,
        city: `${match.city}, ${match.state}`,
        eta: match.estimatedDays,
      });
    } else {
      setPinStatus({
        checked: true,
        valid: true,
        city: 'Verified PIN Sector',
        eta: '2-4 business days via Express Surface',
      });
    }
  };

  return (
    <section className="bg-white border-b border-stone-200 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Trust Ticker */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 mb-6 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="hover:text-stone-900 cursor-pointer">Store</span>
            <span>/</span>
            <span className="hover:text-stone-900 cursor-pointer">Protective Packaging</span>
            <span>/</span>
            <span className="text-stone-900 font-medium">Honeycomb Kraft Roll</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>In Stock · Ready to dispatch from Delhi Hub</span>
          </div>
        </div>

        {/* 2-Column E-Commerce Storefront Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Product Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Column */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-stone-50 ${
                    activeImageIndex === idx
                      ? 'border-stone-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
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

            {/* Main Stage Image */}
            <div className="flex-1">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 group">
                <img
                  src={product.images[activeImageIndex]?.url}
                  alt={product.images[activeImageIndex]?.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {product.images[activeImageIndex]?.title}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-stone-200 shadow-2xs">
                  SKU: {product.sku}
                </div>
              </div>

              {/* 4 Feature Badges Under Image */}
              <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="block text-xs font-bold text-stone-900">100% Paper</span>
                  <span className="text-[10px] text-stone-500">Plastic-Free</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="block text-xs font-bold text-stone-900">1.5x Expand</span>
                  <span className="text-[10px] text-stone-500">Up to 400m Cushion</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="block text-xs font-bold text-stone-900">Self-Lock</span>
                  <span className="text-[10px] text-stone-500">No Tape Needed</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="block text-xs font-bold text-stone-900">80 GSM</span>
                  <span className="text-[10px] text-stone-500">High-Tensile Kraft</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Converting Buy Box (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Product Title & Ratings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8794F]">
                  Brother&apos;s Packaging
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-stone-700">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-900 ml-1">4.9</span>
                  <span className="text-stone-400">· 84 Verified B2B Orders</span>
                </div>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Honeycomb Kraft Paper Wrap Roll
              </h1>

              <p className="text-xs text-stone-600 leading-relaxed">
                Expandable 3D protective packaging roll. Self-locking hexagonal cells cushion
                fragile ceramics, glass, cosmetics, and gifts without plastic bubble wrap.
              </p>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
                    ₹{unitPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-stone-500">/ roll</span>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {discountPercent}% Volume Savings
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-500 font-medium">
                  +18% GST (₹{Math.round(unitPrice * 0.18)} tax)
                </span>
              </div>

              <div className="text-xs flex items-center justify-between pt-1 border-t border-stone-200/80 text-stone-600">
                <span className="flex items-center gap-1 text-emerald-800 font-medium">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  {isFreeShipping ? 'FREE Domestic Shipping Applied' : 'Free shipping on 3+ rolls'}
                </span>
                <span className="text-[11px]">HSN: 480890</span>
              </div>
            </div>

            {/* Roll Dimensions & Sizing Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-900">
                <span>Select Roll Size:</span>
                <span className="text-stone-500 font-normal">Approx 400m expanded</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedSize('10x250')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedSize === '10x250'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                      : 'border-stone-200 bg-white text-stone-800'
                  }`}
                >
                  <div className="text-xs font-bold">10&quot; × 250m Roll</div>
                  <div
                    className={`text-[10px] ${
                      selectedSize === '10x250' ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    Standard E-Commerce Size
                  </div>
                </button>

                <div className="p-2.5 rounded-lg border border-dashed border-stone-300 bg-stone-50/50 text-stone-400 text-left cursor-not-allowed">
                  <div className="text-xs font-medium">15&quot; × 250m Roll</div>
                  <div className="text-[10px]">Coming in Next Batch</div>
                </div>
              </div>
            </div>

            {/* Quantity Volume Slabs Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900">Volume Discount Slabs:</span>
                <button
                  onClick={() => setIsBulkQuoteOpen(true)}
                  className="text-xs font-semibold text-[#A8794F] hover:underline"
                >
                  Need 20+ rolls? Bulk Quote &rarr;
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {pricingTiers.slice(0, 3).map((tier) => {
                  const isSelected =
                    selectedQuantity >= tier.minQty &&
                    (tier.maxQty === null || selectedQuantity <= tier.maxQty);
                  const slabPrice = Math.round(
                    product.basePrice * (1 - tier.discountPercentage / 100)
                  );
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedQuantity(tier.minQty)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      <div className="text-[11px] font-semibold opacity-90">
                        {tier.minQty}
                        {tier.maxQty ? `–${tier.maxQty}` : '+'} rolls
                      </div>
                      <div className="text-sm font-extrabold tabular-nums">
                        ₹{slabPrice.toLocaleString('en-IN')}
                      </div>
                      {tier.discountPercentage > 0 && (
                        <div
                          className={`text-[10px] font-bold mt-0.5 ${
                            isSelected ? 'text-amber-300' : 'text-emerald-700'
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

            {/* Quantity Stepper & Subtotal */}
            <div className="flex items-center gap-4 pt-1">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-stone-600 block">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm font-bold text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-2 text-sm font-bold text-stone-900 tabular-nums min-w-8 text-center">
                    {selectedQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm font-bold text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-1 text-right">
                <span className="text-[11px] font-semibold text-stone-600 block">Subtotal:</span>
                <div className="text-lg font-extrabold text-stone-900 tabular-nums">
                  ₹{rawTotal.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-stone-500">
                    (+ ₹{taxAmount.toLocaleString('en-IN')} GST)
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold rounded-lg text-xs transition-colors border border-stone-300 cursor-pointer shadow-2xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#A8794F]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleInstantBuy}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-black text-white font-bold rounded-lg text-xs transition-colors shadow-md cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsBulkQuoteOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-[#A8794F] bg-white border border-stone-200 hover:border-[#A8794F] rounded-lg transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Request B2B Wholesale Pricing</span>
              </button>
            </div>

            {/* PIN Code Delivery Estimator */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-800">
                <span className="font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A8794F]" />
                  Delivery Estimate
                </span>
                <span className="text-[11px] text-stone-500">India Postal Serviceability</span>
              </div>

              <form onSubmit={handleCheckPin} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 110020)"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-md text-xs font-mono tabular-nums focus:outline-hidden focus:border-stone-900"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white font-semibold rounded-md text-xs transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pinStatus?.checked && (
                <div className="pt-1 text-[11px] text-emerald-800 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Serviceable for {pinStatus.city} · {pinStatus.eta}
                  </span>
                </div>
              )}
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-stone-600 text-center">
              <div className="p-2 bg-stone-50 rounded border border-stone-200/80">
                <span className="block font-bold text-stone-900">GST Invoice</span>
                <span>Tax ITC Claimable</span>
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-200/80">
                <span className="block font-bold text-stone-900">Transit Inspected</span>
                <span>48h Replacement</span>
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-200/80">
                <span className="block font-bold text-stone-900">Same-Day Dispatch</span>
                <span>Orders before 2 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
