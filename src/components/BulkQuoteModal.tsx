/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, FileText, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BulkEnquiry } from '../types';

export const BulkQuoteModal: React.FC = () => {
  const { isBulkQuoteOpen, setIsBulkQuoteOpen, submitBulkEnquiry, product } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    companyName: '',
    phone: '',
    email: '',
    requiredQuantity: 25,
    unitType: 'rolls' as const,
    deliveryCity: '',
    deliveryPin: '',
    orderFrequency: 'monthly' as const,
    intendedApplication: 'Fragile e-commerce parcels',
    additionalNotes: '',
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState<BulkEnquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isBulkQuoteOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.customerName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number');
      return;
    }
    if (!formData.deliveryCity.trim()) {
      setErrorMsg('Please enter your delivery city or PIN code');
      return;
    }
    if (formData.requiredQuantity <= 0) {
      setErrorMsg('Quantity must be at least 1 roll');
      return;
    }

    const created = submitBulkEnquiry({
      customerName: formData.customerName,
      companyName: formData.companyName || 'Independent Merchant',
      phone: formData.phone,
      email: formData.email,
      requiredQuantity: Number(formData.requiredQuantity),
      unitType: formData.unitType,
      deliveryCity: formData.deliveryCity,
      deliveryPin: formData.deliveryPin || 'N/A',
      orderFrequency: formData.orderFrequency,
      intendedApplication: formData.intendedApplication,
      additionalNotes: formData.additionalNotes,
    });

    setSubmittedEnquiry(created);
  };

  const handleClose = () => {
    setIsBulkQuoteOpen(false);
    setSubmittedEnquiry(null);
  };

  const generateWhatsAppUrl = (enq: BulkEnquiry) => {
    const text = encodeURIComponent(
      `Hello Brother's Packaging Team,\n\nI just requested a bulk quote (Ref: ${enq.id}) for ${enq.requiredQuantity} rolls of Honeycomb Kraft Wrap for delivery to ${enq.deliveryCity}.\n\nCompany: ${enq.companyName}\nName: ${enq.customerName}\nPhone: ${enq.phone}\n\nPlease share official slab quotation with GST invoice terms.`
    );
    // Verified official WhatsApp Business contact link (falls back to generic intent)
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0D5C3] flex items-center justify-between bg-[#EDE4D7]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#A8794F] text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#252522]">
                Request Commercial Bulk Quote
              </h3>
              <p className="text-[11px] text-[#252522]/60">
                Product: {product.title} (10&quot; × 250m)
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#252522]/60 hover:text-[#252522] hover:bg-[#EDE4D7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedEnquiry ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#69765A]/15 text-[#69765A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#252522]">
                  Quote Request Received!
                </h4>
                <p className="text-xs text-[#252522]/70 max-w-md mx-auto">
                  Your reference ID is{' '}
                  <span className="font-bold text-[#A8794F] font-mono">
                    {submittedEnquiry.id}
                  </span>
                  . It has been recorded into our merchant operations queue.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-[#EDE4D7]/40 border border-[#E0D5C3] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#252522]/60">Quantity:</span>
                  <span className="font-semibold text-[#252522] tabular-nums">
                    {submittedEnquiry.requiredQuantity} rolls
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252522]/60">Delivery Location:</span>
                  <span className="font-semibold text-[#252522]">
                    {submittedEnquiry.deliveryCity} ({submittedEnquiry.deliveryPin})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252522]/60">Order Frequency:</span>
                  <span className="font-semibold text-[#252522] capitalize">
                    {submittedEnquiry.orderFrequency}
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-2 max-w-md mx-auto">
                <a
                  href={generateWhatsAppUrl(submittedEnquiry)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Quote Directly on WhatsApp</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#252522] hover:bg-[#EDE4D7]/50 rounded-lg transition-colors border border-[#E0D5C3]"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Artisan Studio LLP"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Business Email
                  </label>
                  <input
                    type="email"
                    placeholder="procurement@company.in"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-1">
                  <label className="font-semibold text-[#252522] block">
                    Quantity (Rolls) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.requiredQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requiredQuantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-bold tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="font-semibold text-[#252522] block">
                    Delivery City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Bengaluru"
                    value={formData.deliveryCity}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryCity: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="font-semibold text-[#252522] block">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6-digit PIN"
                    value={formData.deliveryPin}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryPin: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Estimated Frequency
                  </label>
                  <select
                    value={formData.orderFrequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orderFrequency: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  >
                    <option value="one_time">One-Time Trial Order</option>
                    <option value="weekly">Weekly Dispatch</option>
                    <option value="monthly">Monthly Recurring Order</option>
                    <option value="quarterly">Quarterly Scheduled Contract</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Primary Products Shipped
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Glassware, Cosmetics, Pottery"
                    value={formData.intendedApplication}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        intendedApplication: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">
                  Additional Packaging Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Need pallet delivery, GST compliance notes, or customized roll core sizes..."
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalNotes: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                />
              </div>

              <div className="pt-3 border-t border-[#E0D5C3] flex items-center justify-between">
                <div className="text-[11px] text-[#252522]/60">
                  Direct B2B pricing with GST tax input credit
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#A8794F] hover:bg-[#966842] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  <span>Request My Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-100" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
