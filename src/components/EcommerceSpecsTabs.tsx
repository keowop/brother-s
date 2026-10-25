/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Ruler,
  Layers,
  Sparkles,
  PackageCheck,
  Check,
  X,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const EcommerceSpecsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'how' | 'why' | 'applications'>('specs');
  const { product, setIsBulkQuoteOpen } = useStore();

  return (
    <section className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Controls */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 border-b border-stone-200">
          {[
            { id: 'specs', label: 'Specifications & Blueprint', icon: Ruler },
            { id: 'how', label: '3-Step Wrapping Guide', icon: Layers },
            { id: 'why', label: 'Honeycomb vs Bubble Wrap', icon: Sparkles },
            { id: 'applications', label: 'Recommended Fragile Items', icon: PackageCheck },
          ].map((t) => {
            const Icon = t.icon;
            const isCurrent = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panes */}
        <div className="pt-8 max-w-4xl mx-auto">
          {/* TAB 1: SPECS */}
          {activeTab === 'specs' && (
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="p-4 bg-stone-100/70 border-b border-stone-200 flex justify-between items-center text-xs">
                <span className="font-bold text-stone-900">
                  Brother&apos;s Engineering Specifications
                </span>
                <span className="text-stone-500 font-mono">SKU: {product.sku}</span>
              </div>
              <div className="divide-y divide-stone-200 text-xs">
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Roll Width</span>
                  <span className="text-stone-900 font-medium">{product.width}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Unexpanded Roll Length</span>
                  <span className="text-stone-900 font-medium">{product.length}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Effective Expanded Yield</span>
                  <span className="text-emerald-800 font-bold">
                    Approx. 375m – 400m cushioning wrap (1.5x - 1.6x expansion)
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Paper Weight (GSM)</span>
                  <span className="text-stone-900 font-medium">{product.gsm}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Material Pulp</span>
                  <span className="text-stone-900 font-medium">
                    100% Virgin Natural Kraft (Biodegradable & Curbside Recyclable)
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Core Diameter</span>
                  <span className="text-stone-900 font-medium">Standard 2-inch heavy spiral paper tube</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Indian Tax & HSN Code</span>
                  <span className="text-stone-900 font-medium">18% GST (HSN: 480890)</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 hover:bg-stone-50">
                  <span className="font-semibold text-stone-700">Dispenser Compatibility</span>
                  <span className="text-stone-900 font-medium">
                    Manual bench pulling or standard bench-mounted honeycomb dispensers
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOW TO USE */}
          {activeTab === 'how' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Pull & Expand</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Gently pull the paper roll. The slit cuts stretch into raised 3D hexagonal
                  cells with 1.5x expansion length.
                </p>
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src="/src/assets/images/honeycomb_mesh_closeup_1792921916507.jpg"
                    alt="Expanded honeycomb mesh"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Interlock & Wrap</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Wrap the item snugly. The angled paper edges lock naturally into each other
                  without using plastic adhesive tape.
                </p>
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src="/src/assets/images/honeycomb_wrapped_item_1792921916889.jpg"
                    alt="Ceramic wrapped in honeycomb paper"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Pack in Box</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Tuck the cushioned parcel into your outer cardboard box or mailer. Seal outer box
                  with paper tape for 100% recyclable shipping.
                </p>
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src="/src/assets/images/honeycomb_roll_dimensions_1792921917854.jpg"
                    alt="Packed shipping box"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WHY HONEYCOMB */}
          {activeTab === 'why' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-200 text-stone-900 font-bold">
                      <th className="p-3.5">Feature</th>
                      <th className="p-3.5 text-[#A8794F]">Brother&apos;s Honeycomb Kraft</th>
                      <th className="p-3.5 text-stone-500">Plastic Bubble Wrap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    <tr>
                      <td className="p-3.5 font-semibold text-stone-900">Storage Volume</td>
                      <td className="p-3.5 text-emerald-800 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" /> Compact rolls (takes 80% less space)
                      </td>
                      <td className="p-3.5 text-stone-500">Massive bulky rolls occupy entire room</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-stone-900">Tape Requirement</td>
                      <td className="p-3.5 text-emerald-800 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" /> Interlocking mesh locks without tape
                      </td>
                      <td className="p-3.5 text-red-600 flex items-center gap-1.5">
                        <X className="w-4 h-4" /> Requires plastic tape for every wrap
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-stone-900">Recyclability</td>
                      <td className="p-3.5 text-emerald-800 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" /> 100% Curbside Paper Recycling
                      </td>
                      <td className="p-3.5 text-red-600 flex items-center gap-1.5">
                        <X className="w-4 h-4" /> Ends up in landfills for 500+ years
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-stone-900">Customer Unboxing</td>
                      <td className="p-3.5 text-stone-900 font-bold">
                        Artisanal, clean luxury presentation
                      </td>
                      <td className="p-3.5 text-stone-500">Cheap synthetic plastic unboxing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Practical Packaging Advice:</strong> Use 2 to 3 continuous layers of
                  honeycomb wrap for delicate glassware and heavy ceramics. Secure snugly inside the
                  outer carton to avoid transit shifting.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SUITABLE ITEMS */}
          {activeTab === 'applications' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {[
                { title: 'Glassware & Bottles', desc: 'Wine bottles, essential oil vials, tumblers' },
                { title: 'Ceramics & Pottery', desc: 'Handmade mugs, plates, vases, stoneware' },
                { title: 'Cosmetics & Skincare', desc: 'Dropper bottles, luxury cream jars' },
                { title: 'Gifts & Home Decor', desc: 'Artisanal candles, picture frames, crafts' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-xl border border-stone-200 text-center space-y-2 shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EDE4D7] text-[#A8794F] flex items-center justify-center mx-auto font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-stone-900">{item.title}</h4>
                  <p className="text-[11px] text-stone-500">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
