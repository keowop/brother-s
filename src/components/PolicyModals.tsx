/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';
import { AppView } from '../context/StoreContext';

interface PolicyModalsProps {
  currentView: AppView;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ currentView, onClose }) => {
  const isPolicy = [
    'shipping-policy',
    'returns-policy',
    'privacy-policy',
    'about',
    'contact',
  ].includes(currentView);

  if (!isPolicy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-xs">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0D5C3] flex items-center justify-between bg-[#EDE4D7]/40">
          <div className="flex items-center gap-2">
            {currentView === 'shipping-policy' && <Truck className="w-4 h-4 text-[#A8794F]" />}
            {currentView === 'returns-policy' && <RotateCcw className="w-4 h-4 text-[#A8794F]" />}
            {currentView === 'privacy-policy' && <ShieldCheck className="w-4 h-4 text-[#69765A]" />}
            {(currentView === 'about' || currentView === 'contact') && (
              <FileText className="w-4 h-4 text-[#A8794F]" />
            )}
            <h3 className="font-display text-base font-bold text-[#252522] capitalize">
              {currentView.replace('-', ' ')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#252522]/60 hover:text-[#252522]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-[#252522]/85 leading-relaxed text-xs">
          {currentView === 'shipping-policy' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#252522]">
                Domestic Shipping Across India
              </h4>
              <p>
                Brother&apos;s fulfills protective packaging rolls from our regional warehouse hubs.
                All orders placed prior to 2:00 PM IST on working business days are dispatched on the
                same day.
              </p>
              <div className="p-3 bg-white rounded-lg border border-[#E0D5C3] space-y-1">
                <span className="font-semibold text-[#252522] block">Estimated Transit Times:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Tier 1 Metros (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad): 1–3 business days.</li>
                  <li>Tier 2 & 3 Cities across India: 3–5 business days via Surface Cargo.</li>
                  <li>Orders of 3 or more rolls qualify for subsidized free shipping.</li>
                </ul>
              </div>
            </div>
          )}

          {currentView === 'returns-policy' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#252522]">
                Quality Guarantee & Transit Damage Policy
              </h4>
              <p>
                Every roll of Brother&apos;s Honeycomb Kraft Paper is visually checked for clean edge
                slitting and core integrity before packing into protective outer sleeves.
              </p>
              <div className="p-3 bg-white rounded-lg border border-[#E0D5C3] space-y-1">
                <span className="font-semibold text-[#252522] block">48-Hour Inspection Window:</span>
                <p>
                  If an outer carton arrives visibly crushed, water-damaged, or exhibits manufacturing
                  cut flaws, please record unboxing photos and notify our team within 48 hours of
                  delivery. We arrange immediate courier replacement at zero freight charge.
                </p>
              </div>
            </div>
          )}

          {currentView === 'privacy-policy' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#252522]">
                Customer Data & Business Confidentiality
              </h4>
              <p>
                We collect your name, shipping address, 10-digit mobile number, and business GSTIN
                strictly to generate statutory Indian tax invoices and arrange domestic courier
                delivery.
              </p>
              <p>
                We do not sell, rent, or distribute merchant buyer details to third-party marketing
                networks.
              </p>
            </div>
          )}

          {currentView === 'about' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#252522]">About Brother&apos;s Packaging</h4>
              <p>
                Brother&apos;s is a modern Indian protective packaging brand born from a practical
                conviction: shipping parcels should protect what matters without filling landfills with
                single-use plastic bubble film.
              </p>
              <p>
                We specialize in virgin unbleached kraft paper engineered with expandable 3D
                hexagonal cells. We serve direct-to-consumer lifestyle brands, ceramicists,
                apothecaries, and commercial e-commerce sellers with reliable supply and honest
                pricing.
              </p>
            </div>
          )}

          {currentView === 'contact' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#252522]">Contact Brother&apos;s</h4>
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-amber-900 space-y-1">
                <span className="font-semibold block">Business Stage Note:</span>
                <p className="text-[11px]">
                  Brother&apos;s is in active pilot rollout. Dedicated toll-free numbers and warehouse
                  visitation lines will be published upon commercial registration completion.
                </p>
              </div>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="font-semibold text-[#252522]">Central Dispatch Hub: </span>
                  Okhla Industrial Area, New Delhi, India 110020
                </div>
                <div>
                  <span className="font-semibold text-[#252522]">Direct Enquiries: </span>
                  Use our online Bulk Quote request or instant WhatsApp link for quote assistance.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#E0D5C3] bg-[#FAF8F3] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#A8794F] hover:bg-[#966842] text-white rounded-lg font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
