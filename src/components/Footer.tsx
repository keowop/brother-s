/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, ArrowUpRight, MapPin } from 'lucide-react';
import { useStore, AppView } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsBulkQuoteOpen, setIsTrackingOpen } = useStore();

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-50 text-stone-700 border-t border-stone-200 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 text-[#A8794F] flex items-center justify-center shadow-2xs group-hover:bg-[#A8794F] group-hover:text-white transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-stone-900">
                Brother&apos;s
              </span>
            </button>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm [text-wrap:pretty]">
              Reliable, professional, and practical protective paper packaging supplies engineered
              for growing Indian e-commerce businesses and sustainable brands.
            </p>

            <div className="pt-2 text-[11px] text-stone-500 space-y-1">
              <div>HSN Code: 480890 (Protective Kraft Paper)</div>
              <div>Standard GST Rate: 18% with Tax Input Credit (ITC)</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-stone-900 text-xs uppercase tracking-wider">
              Storefront
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Landing Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('product')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Product Page (Tabs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('home');
                    setTimeout(() => {
                      document.getElementById('b2b-wholesale')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-stone-900 transition-colors"
                >
                  Wholesale Slabs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="hover:text-stone-900 transition-colors"
                >
                  Track Existing Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsBulkQuoteOpen(true)}
                  className="hover:text-stone-900 transition-colors text-[#A8794F] font-bold flex items-center gap-1"
                >
                  <span>Request Bulk Quote</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Management & Pricing */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-stone-900 text-xs uppercase tracking-wider">
              Economics & Policies
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => handleNav('calculator')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Unit Economics Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Merchant Admin Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shipping-policy')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('returns-policy')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Quality & Damage Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Verification Note */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-stone-900 text-xs uppercase tracking-wider">
              Business Contact
            </h4>
            <div className="p-3 rounded-xl bg-white border border-stone-200 text-[11px] text-stone-600 space-y-2 shadow-2xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A8794F] shrink-0 mt-0.5" />
                <span>Okhla Industrial Area, Phase III, New Delhi 110020</span>
              </div>
              <div className="pt-1 text-[10px] text-stone-500">
                Direct merchant toll-free numbers and bank settlement accounts are currently in
                verification stage for official commercial launch.
              </div>
              <button
                onClick={() => setIsBulkQuoteOpen(true)}
                className="w-full py-1.5 text-center font-bold text-[11px] bg-amber-50 hover:bg-amber-100 text-[#A8794F] border border-amber-200 rounded transition-colors"
              >
                Reach Out via Bulk Form
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Brother&apos;s Packaging India. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('privacy-policy')}
              className="hover:text-stone-900 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('returns-policy')}
              className="hover:text-stone-900 transition-colors"
            >
              Returns Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('shipping-policy')}
              className="hover:text-stone-900 transition-colors"
            >
              Shipping Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
