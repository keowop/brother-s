/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderRecord } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, orders, lookupOrder } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(orders[0] || null);
  const [searched, setSearched] = useState(false);

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const result = lookupOrder(searchQuery);
    setSelectedOrder(result || null);
  };

  const getStepIndex = (status: OrderRecord['orderStatus']) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
        return 1;
      case 'packed':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = selectedOrder ? getStepIndex(selectedOrder.orderStatus) : 0;

  const milestoneSteps = [
    { label: 'Order Registered', desc: 'Received & verified' },
    { label: 'Confirmed', desc: 'Inventory reserved' },
    { label: 'Packed with Honeycomb', desc: 'Protected & sealed' },
    { label: 'In Transit', desc: 'Express Surface Cargo' },
    { label: 'Delivered', desc: 'Delivered to customer' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0D5C3] flex items-center justify-between bg-[#EDE4D7]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#A8794F] text-white flex items-center justify-center shadow-xs">
              <Package className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#252522]">
                Real-Time Order Tracking
              </h3>
              <p className="text-[11px] text-[#252522]/60">
                Track your Brother&apos;s shipment across India
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 rounded-lg text-[#252522]/60 hover:text-[#252522] hover:bg-[#EDE4D7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* Lookup Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. BR-2026-1042) or Phone Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-white border border-[#E0D5C3] rounded-lg text-xs font-mono uppercase focus:outline-hidden focus:border-[#A8794F]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#A8794F] hover:bg-[#966842] text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {searched && !selectedOrder ? (
            <div className="py-8 text-center text-xs text-[#252522]/60 space-y-2">
              <p>No active order found matching &quot;{searchQuery}&quot;.</p>
              <p className="text-[11px]">
                Please double check your 10-digit phone number or order reference code.
              </p>
            </div>
          ) : selectedOrder ? (
            <div className="space-y-6">
              {/* Order Meta Box */}
              <div className="p-4 rounded-xl bg-white border border-[#E0D5C3] space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#E0D5C3]">
                  <div>
                    <span className="font-mono font-bold text-sm text-[#252522]">
                      {selectedOrder.id}
                    </span>
                    <span className="text-[11px] text-[#252522]/60 ml-2">
                      Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#69765A] bg-[#69765A]/10 px-2 py-0.5 rounded capitalize">
                    {selectedOrder.orderStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#252522]/80 pt-1">
                  <div>
                    <span className="text-[#252522]/50 block">Recipient:</span>
                    <span className="font-semibold text-[#252522]">
                      {selectedOrder.customer.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#252522]/50 block">Destination:</span>
                    <span>
                      {selectedOrder.customer.city}, {selectedOrder.customer.state} ({selectedOrder.customer.pinCode})
                    </span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="col-span-2 pt-1 border-t border-[#E0D5C3]/60 flex items-center justify-between">
                      <span>Courier: {selectedOrder.courierPartner || 'Delhivery Express'}</span>
                      <span className="font-mono font-semibold text-[#A8794F]">
                        AWB: {selectedOrder.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Stepper */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-[#252522]">
                  Shipment Milestones
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E0D5C3]">
                  {milestoneSteps.map((s, idx) => {
                    const isDone = idx <= currentStep;
                    const isCurrent = idx === currentStep;
                    return (
                      <div key={idx} className="relative flex items-start gap-3">
                        <div
                          className={`absolute -left-6 mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-[#A8794F] border-[#A8794F] text-white shadow-xs'
                              : 'bg-white border-[#E0D5C3]'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-3 h-3 text-[#EDE4D7]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E0D5C3]" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`font-semibold ${
                              isCurrent
                                ? 'text-[#A8794F]'
                                : isDone
                                ? 'text-[#252522]'
                                : 'text-[#252522]/40'
                            }`}
                          >
                            {s.label}
                          </div>
                          <div className="text-[11px] text-[#252522]/60">{s.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items Summary in this Order */}
              <div className="p-3.5 rounded-xl bg-[#EDE4D7]/30 border border-[#E0D5C3] space-y-2">
                <span className="font-semibold text-[#252522] block">Package Contents:</span>
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px]">
                    <span>
                      {it.quantity} × {it.product.title} (10&quot; × 250m)
                    </span>
                    <span className="font-bold tabular-nums">
                      ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
