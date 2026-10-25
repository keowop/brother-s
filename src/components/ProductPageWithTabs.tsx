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
  Star,
  Ruler,
  Layers,
  Sparkles,
  MapPin,
  ArrowRight,
  FileText,
  ChevronDown,
  Box,
  X,
  HelpCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_PIN_CODES, FAQ_DATA } from '../data/defaultData';

export const ProductPageWithTabs: React.FC = () => {
  const {
    selectedProduct,
    product,
    pricingTiers,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsBulkQuoteOpen,
    setCurrentView,
  } = useStore();

  const currentProd = selectedProduct || product;
  const isInStock = currentProd.stockStatus === 'in_stock';

  // Tabs state
  const [activeTab, setActiveTab] = useState<'buy' | 'specs' | 'how' | 'compare' | 'wholesale' | 'reviews'>('buy');
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

  // Active tier calculation
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
  const unitPrice = Math.round(currentProd.basePrice * (1 - discountPercent / 100));
  const rawTotal = unitPrice * selectedQuantity;
  const taxAmount = Math.round(rawTotal * 0.18);
  const isFreeShipping = selectedQuantity >= 3;

  const handleAddToCart = () => {
    addToCart(currentProd, selectedQuantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(currentProd, selectedQuantity);
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
    <div className="bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-stone-900 transition-colors"
            >
              &larr; Back to Catalog
            </button>
            <span>/</span>
            <span className="font-semibold text-stone-900">{currentProd.title}</span>
          </div>

          <div className="text-xs font-semibold text-stone-600">
            SKU: <span className="font-mono text-stone-900">{currentProd.sku}</span>
          </div>
        </div>

        {/* Top Product Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#A8794F] mb-1">
              {currentProd.subtitle}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900">
              {currentProd.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-stone-900 tabular-nums">
                ₹{unitPrice.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-stone-500 ml-1">/ roll</span>
              </div>
              <div className="text-[11px] text-stone-500">+18% GST (₹{Math.round(unitPrice * 0.18)})</div>
            </div>

            {isInStock ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="px-5 py-2.5 bg-[#A8794F] hover:bg-[#966842] text-white font-bold rounded-lg text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                <span>Add to Bag</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsBulkQuoteOpen(true)}
                className="px-5 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Pre-Order
              </button>
            )}
          </div>
        </div>

        {/* Product Internal Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b-2 border-stone-200 text-xs font-bold">
          {[
            { id: 'buy', label: '1. Overview & Buy Box', icon: ShoppingBag },
            { id: 'specs', label: '2. Specifications & Dimensions', icon: Ruler },
            { id: 'how', label: '3. How to Wrap Guide', icon: Layers },
            { id: 'compare', label: '4. Honeycomb vs Bubble Film', icon: Sparkles },
            { id: 'wholesale', label: '5. Wholesale Slabs', icon: FileText },
            { id: 'reviews', label: '6. Reviews & FAQs', icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#A8794F] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & BUY BOX */}
        {activeTab === 'buy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Gallery Left (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
                <img
                  src={currentProd.images[activeImageIndex]?.url}
                  alt={currentProd.images[activeImageIndex]?.alt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#A8794F] text-white text-[11px] font-medium px-3 py-1 rounded-md shadow-xs">
                  {currentProd.images[activeImageIndex]?.title}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {currentProd.images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-stone-50 ${
                      activeImageIndex === idx
                        ? 'border-[#A8794F] shadow-xs'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
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

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block">10&quot; × 250m Roll</span>
                  <span className="text-[11px] text-stone-500">Yields up to 400m expanded</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block">80 GSM Kraft</span>
                  <span className="text-[11px] text-stone-500">Puncture-resistant paper</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block">Tape-Free Packing</span>
                  <span className="text-[11px] text-stone-500">Angled cells self-lock</span>
                </div>
              </div>
            </div>

            {/* Buy Box Right (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    In Stock · Ready to Dispatch
                  </span>
                  <span className="text-stone-500">{currentProd.stockCount} rolls in warehouse</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                  {currentProd.title}
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {currentProd.shortDescription}
                </p>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-stone-900 tabular-nums">
                      ₹{unitPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500">/ roll</span>
                  </div>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                      {discountPercent}% Tier Discount
                    </span>
                  )}
                </div>
                <div className="text-xs text-stone-500 flex justify-between">
                  <span>+18% GST (₹{Math.round(unitPrice * 0.18)} per roll)</span>
                  <span className="font-semibold text-emerald-800">
                    {isFreeShipping ? 'Free Domestic Delivery' : 'Free delivery on 3+ rolls'}
                  </span>
                </div>
              </div>

              {/* Volume Discount Slabs */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-stone-900 block">Volume Discount Slabs:</span>
                <div className="grid grid-cols-3 gap-2">
                  {pricingTiers.slice(0, 3).map((tier) => {
                    const isSelected =
                      selectedQuantity >= tier.minQty &&
                      (tier.maxQty === null || selectedQuantity <= tier.maxQty);
                    const tierPrice = Math.round(
                      currentProd.basePrice * (1 - tier.discountPercentage / 100)
                    );
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedQuantity(tier.minQty)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#A8794F] bg-amber-50 text-stone-900 shadow-xs'
                            : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="text-[11px] font-semibold opacity-90">
                          {tier.minQty}
                          {tier.maxQty ? `–${tier.maxQty}` : '+'} rolls
                        </div>
                        <div className="text-sm font-extrabold tabular-nums">
                          ₹{tierPrice.toLocaleString('en-IN')}
                        </div>
                        {tier.discountPercentage > 0 && (
                          <div
                            className={`text-[10px] font-bold mt-0.5 ${
                              isSelected ? 'text-[#A8794F]' : 'text-emerald-700'
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

              {/* Quantity Stepper */}
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
                  <span className="text-[11px] font-semibold text-stone-600 block">Total Payable:</span>
                  <div className="text-lg font-black text-stone-900 tabular-nums">
                    ₹{rawTotal.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-stone-500">
                      (+ ₹{taxAmount.toLocaleString('en-IN')} GST)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#A8794F] hover:bg-[#966842] text-white font-bold rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-white" />
                    <span>Buy Now</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBulkQuoteOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#A8794F] hover:underline cursor-pointer"
                >
                  Need pallet delivery or 20+ rolls? Request Custom Quote &rarr;
                </button>
              </div>

              {/* PIN Code Checker */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-800">
                  <span className="font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#A8794F]" />
                    Check Delivery Pincode
                  </span>
                  <span className="text-[11px] text-stone-500">All India Courier</span>
                </div>

                <form onSubmit={handleCheckPin} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN (e.g. 110020)"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-md text-xs font-mono tabular-nums focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-bold rounded-md text-xs transition-colors cursor-pointer"
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
            </div>
          </div>
        )}

        {/* TAB 2: SPECIFICATIONS */}
        {activeTab === 'specs' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="p-4 bg-stone-100 border-b border-stone-200 flex justify-between items-center text-xs">
                <span className="font-bold text-stone-900">
                  Technical Specifications & Material Parameters
                </span>
                <span className="font-mono text-stone-600">SKU: {currentProd.sku}</span>
              </div>
              <div className="divide-y divide-stone-200 text-xs">
                <div className="grid grid-cols-2 p-3.5">
                  <span className="font-semibold text-stone-700">Roll Width</span>
                  <span className="text-stone-900">{currentProd.width}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-stone-50/50">
                  <span className="font-semibold text-stone-700">Unexpanded Roll Length</span>
                  <span className="text-stone-900">{currentProd.length}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="font-semibold text-stone-700">Expanded Yield</span>
                  <span className="text-emerald-800 font-bold">
                    Approx 375m - 400m active wrapping cushion (1.5x - 1.6x expansion)
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-stone-50/50">
                  <span className="font-semibold text-stone-700">Paper GSM & Strength</span>
                  <span className="text-stone-900">{currentProd.gsm} Virgin Kraft</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="font-semibold text-stone-700">Raw Material</span>
                  <span className="text-stone-900">{currentProd.material}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-stone-50/50">
                  <span className="font-semibold text-stone-700">Core Diameter</span>
                  <span className="text-stone-900">Standard 2-inch heavy-duty spiral cardboard core</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="font-semibold text-stone-700">GST Rate & HSN Code</span>
                  <span className="text-stone-900">18% GST (HSN: 480890) · Eligible for Input Tax Credit</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-stone-50/50">
                  <span className="font-semibold text-stone-700">Recycling Stream</span>
                  <span className="text-stone-900">100% Curbside Paper Bin Recyclable</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HOW TO WRAP */}
        {activeTab === 'how' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 text-[#A8794F] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Pull & Expand</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Gently pull from the 10&quot; roll. The pre-cut hexagonal mesh expands into 3D
                  cushioning cells with 1.5x expansion length.
                </p>
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-white border border-stone-200">
                  <img
                    src="/src/assets/images/honeycomb_mesh_closeup_1792921916507.jpg"
                    alt="Expanded honeycomb mesh"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 text-[#A8794F] flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Interlock & Wrap</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Wrap the item snugly. The angled paper edges naturally catch and lock onto each
                  other without sticky plastic tape.
                </p>
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-white border border-stone-200">
                  <img
                    src="/src/assets/images/honeycomb_wrapped_item_1792921916889.jpg"
                    alt="Ceramic wrapped in honeycomb paper"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 text-[#A8794F] flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Seat in Box</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Place the cushioned parcel in your outer shipping box. Close with water-activated
                  kraft tape for a 100% recyclable parcel.
                </p>
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-white border border-stone-200">
                  <img
                    src="/src/assets/images/honeycomb_roll_dimensions_1792921917854.jpg"
                    alt="Packed shipping box"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPARE */}
        {activeTab === 'compare' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-200 text-stone-900 font-bold">
                    <th className="p-3.5">Parameter</th>
                    <th className="p-3.5 text-[#A8794F]">Brother&apos;s Honeycomb Paper</th>
                    <th className="p-3.5 text-stone-500">Plastic Bubble Wrap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-900">Storage Footprint</td>
                    <td className="p-3.5 text-emerald-800 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Compact roll (80% less space)
                    </td>
                    <td className="p-3.5 text-stone-500">Huge pre-inflated rolls occupy warehouse</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-900">Tape Expense</td>
                    <td className="p-3.5 text-emerald-800 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Self-locking cells (zero tape needed)
                    </td>
                    <td className="p-3.5 text-red-600 flex items-center gap-1.5">
                      <X className="w-4 h-4" /> Requires adhesive tape for every single parcel
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-900">Environmental Impact</td>
                    <td className="p-3.5 text-emerald-800 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> 100% Curbside Paper Recyclable
                    </td>
                    <td className="p-3.5 text-red-600 flex items-center gap-1.5">
                      <X className="w-4 h-4" /> Hard to recycle LDPE film
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-900">Unboxing Aesthetics</td>
                    <td className="p-3.5 font-bold text-stone-900">
                      Artisanal, premium unboxing experience
                    </td>
                    <td className="p-3.5 text-stone-500">Cheap synthetic plastic appearance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: WHOLESALE */}
        {activeTab === 'wholesale' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {pricingTiers.map((tier) => {
                const slabPrice = Math.round(
                  currentProd.basePrice * (1 - tier.discountPercentage / 100)
                );
                return (
                  <div
                    key={tier.id}
                    className="p-5 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <span className="font-bold text-stone-900 block">{tier.label}</span>
                      <div className="text-xl font-black text-stone-900 pt-2 tabular-nums">
                        {tier.isBulkEnquiry ? (
                          'Custom Quote'
                        ) : (
                          <>
                            ₹{slabPrice.toLocaleString('en-IN')}{' '}
                            <span className="text-xs font-normal text-stone-500">/ roll</span>
                          </>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 pt-1">
                        {tier.discountPercentage > 0 && `Save ${tier.discountPercentage}% · `}
                        +18% GST
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (tier.isBulkEnquiry) {
                          setIsBulkQuoteOpen(true);
                        } else {
                          setSelectedQuantity(tier.minQty);
                          setActiveTab('buy');
                        }
                      }}
                      className="w-full py-2 px-3 bg-[#A8794F] hover:bg-[#966842] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer text-center shadow-xs"
                    >
                      {tier.isBulkEnquiry ? 'Request Pallet Slab' : `Select ${tier.minQty} Rolls`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: REVIEWS & FAQS */}
        {activeTab === 'reviews' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Reviews list */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-stone-900">
                Verified Customer Reviews
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <h5 className="font-bold text-stone-900">&ldquo;Replaced plastic bubble wrap completely&rdquo;</h5>
                  <p className="text-stone-600">
                    We ship ceramics all over India. Zero breakages in 120+ orders. Fast packing and no tape needed.
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold pt-1">
                    Vikramaditya S. · Clay & Kiln Studio, Delhi
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <h5 className="font-bold text-stone-900">&ldquo;Customers love the unboxing aesthetic&rdquo;</h5>
                  <p className="text-stone-600">
                    Organic glass serum bottles look so good wrapped in this honeycomb paper. 100% curbside recyclable.
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold pt-1">
                    Ananya D. · Botanica Organics, Bengaluru
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="font-display font-bold text-lg text-stone-900">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2 text-xs">
                {FAQ_DATA.slice(0, 4).map((f, i) => (
                  <div key={i} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <div className="font-bold text-stone-900">{f.q}</div>
                    <div className="text-stone-600 leading-relaxed">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
