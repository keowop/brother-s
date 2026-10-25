/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Building,
  FileCheck,
  Printer,
  PackageCheck,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderRecord } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartGrandTotal,
    createOrder,
    setIsTrackingOpen,
  } = useStore();

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');

  // Customer & Shipping Form
  const [customer, setCustomer] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Delhi',
    pinCode: '',
    gstNumber: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay_simulated' | 'order_enquiry'>(
    'razorpay_simulated'
  );
  const [razorpaySubMethod, setRazorpaySubMethod] = useState<'upi_qr' | 'upi_id' | 'card' | 'netbanking'>('upi_qr');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleValidateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customer.fullName.trim()) {
      setErrorMsg('Please enter customer full name');
      return;
    }
    if (!customer.phone.trim() || customer.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number');
      return;
    }
    if (!customer.addressLine1.trim()) {
      setErrorMsg('Please enter delivery street address');
      return;
    }
    if (!customer.city.trim()) {
      setErrorMsg('Please enter delivery city');
      return;
    }
    if (!customer.pinCode.trim() || customer.pinCode.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    setStep('payment');
  };

  const handleProcessOrder = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const newOrder = createOrder({
        items: [...cart],
        subtotal: cartSubtotal,
        discountTotal: cartDiscount,
        taxTotal: cartTax,
        shippingFee: cartShipping,
        grandTotal: cartGrandTotal,
        customer: { ...customer },
        paymentMethod: paymentMethod,
        paymentStatus:
          paymentMethod === 'razorpay_simulated'
            ? 'paid_simulated'
            : 'pending_verification',
        orderStatus: 'confirmed',
        notes:
          paymentMethod === 'razorpay_simulated'
            ? `Paid via Razorpay Simulation (${razorpaySubMethod.toUpperCase()})`
            : 'Direct Order Enquiry. Awaiting NEFT/RTGS bank transfer or commercial invoice.',
      });

      setConfirmedOrder(newOrder);
      setStep('success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('address');
    setConfirmedOrder(null);
  };

  const indianStates = [
    'Delhi',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Gujarat',
    'Uttar Pradesh',
    'West Bengal',
    'Telangana',
    'Rajasthan',
    'Haryana',
    'Punjab',
    'Kerala',
    'Madhya Pradesh',
    'Bihar',
    'Odisha',
    'Andhra Pradesh',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0D5C3] flex items-center justify-between bg-[#EDE4D7]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#A8794F] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#252522]">
                Brother&apos;s Indian Checkout
              </h3>
              <p className="text-[11px] text-[#252522]/60">
                {step === 'address' && 'Step 1 of 2: Shipping Destination & Address'}
                {step === 'payment' && 'Step 2 of 2: Indian Payment & Settlement'}
                {step === 'success' && 'Order Confirmed & Logged'}
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
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Address Form */}
          {step === 'address' && (
            <form onSubmit={handleValidateAddress} className="space-y-4">
              <div className="p-3 rounded-lg bg-[#EDE4D7]/40 border border-[#E0D5C3] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#252522]">
                    Packaging Summary ({cartCount} roll{cartCount > 1 ? 's' : ''})
                  </span>
                  <div className="text-[11px] text-[#252522]/70">
                    Grand Total: ₹{cartGrandTotal.toLocaleString('en-IN')} (incl. 18% GST)
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#69765A]">
                  {cartShipping === 0 ? 'Free Shipping' : `Shipping ₹${cartShipping}`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Full Name / Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Sharma"
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({ ...customer, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Mobile Phone (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98201 44821"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Email Address (for Tax Invoice)
                  </label>
                  <input
                    type="email"
                    placeholder="vikram@studio.in"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    Company / Studio Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Clay & Kiln Studio"
                    value={customer.companyName}
                    onChange={(e) =>
                      setCustomer({ ...customer, companyName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">
                  Delivery Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Plot 42, Okhla Industrial Area Phase III, Building 4"
                  value={customer.addressLine1}
                  onChange={(e) =>
                    setCustomer({ ...customer, addressLine1: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="New Delhi"
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer({ ...customer, city: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">State *</label>
                  <select
                    value={customer.state}
                    onChange={(e) =>
                      setCustomer({ ...customer, state: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs focus:outline-hidden focus:border-[#A8794F]"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522] block">
                    6-Digit PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="110020"
                    value={customer.pinCode}
                    onChange={(e) =>
                      setCustomer({ ...customer, pinCode: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-mono tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">
                  GSTIN (Optional for Business ITC Claim)
                </label>
                <input
                  type="text"
                  maxLength={15}
                  placeholder="07AAAAA0000A1Z5"
                  value={customer.gstNumber}
                  onChange={(e) =>
                    setCustomer({ ...customer, gstNumber: e.target.value.toUpperCase() })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-mono uppercase focus:outline-hidden focus:border-[#A8794F]"
                />
              </div>

              <div className="pt-4 border-t border-[#E0D5C3] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-[#252522]/70 hover:text-[#252522]"
                >
                  Return to Bag
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#A8794F] hover:bg-[#966842] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-100" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Simulator & Order Confirmation */}
          {step === 'payment' && (
            <div className="space-y-5">
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay_simulated')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'razorpay_simulated'
                      ? 'border-[#A8794F] bg-amber-50/40 shadow-xs ring-1 ring-[#A8794F]/30'
                      : 'border-[#E0D5C3] bg-white opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-[#252522] text-xs">
                    <CreditCard className="w-4 h-4 text-[#A8794F]" />
                    <span>Razorpay Gateway (Simulated)</span>
                  </div>
                  <p className="text-[11px] text-[#252522]/70 mt-1">
                    Instant UPI (GPay, PhonePe), Cards & Net Banking
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('order_enquiry')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'order_enquiry'
                      ? 'border-[#A8794F] bg-amber-50/40 shadow-xs ring-1 ring-[#A8794F]/30'
                      : 'border-[#E0D5C3] bg-white opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-[#252522] text-xs">
                    <FileCheck className="w-4 h-4 text-[#69765A]" />
                    <span>Official Order Enquiry</span>
                  </div>
                  <p className="text-[11px] text-[#252522]/70 mt-1">
                    Pro-forma invoice & manual NEFT / RTGS transfer
                  </p>
                </button>
              </div>

              {/* Razorpay Simulation Details */}
              {paymentMethod === 'razorpay_simulated' ? (
                <div className="p-4 rounded-xl bg-white border border-[#E0D5C3] space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E0D5C3]">
                    <span className="font-semibold text-[#252522]">
                       Select Payment Mode (Indian Gateway Simulation)
                    </span>
                    <span className="text-[10px] bg-[#69765A]/15 text-[#69765A] font-bold px-2 py-0.5 rounded">
                      Sandbox Safe
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'upi_qr', label: 'UPI QR' },
                      { id: 'upi_id', label: 'UPI VPA' },
                      { id: 'card', label: 'Card / RuPay' },
                      { id: 'netbanking', label: 'NetBanking' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setRazorpaySubMethod(m.id as any)}
                        className={`p-2 rounded-lg border text-center transition-colors text-[11px] font-semibold cursor-pointer ${
                          razorpaySubMethod === m.id
                            ? 'border-[#A8794F] bg-[#A8794F] text-white shadow-xs'
                            : 'border-[#E0D5C3] bg-[#FAF8F3] text-[#252522] hover:bg-[#EDE4D7]/50'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {razorpaySubMethod === 'upi_qr' && (
                    <div className="py-4 text-center space-y-3 bg-[#FAF8F3] rounded-lg border border-[#E0D5C3]">
                      <div className="w-28 h-28 bg-white border border-[#E0D5C3] rounded-xl flex items-center justify-center mx-auto shadow-2xs">
                        <QrCode className="w-20 h-20 text-[#252522]" />
                      </div>
                      <div className="text-[11px] text-[#252522]/70">
                        Scan with GPay, PhonePe, Paytm, or BHIM UPI app
                      </div>
                    </div>
                  )}

                  {razorpaySubMethod === 'upi_id' && (
                    <div className="space-y-2 bg-[#FAF8F3] p-3 rounded-lg border border-[#E0D5C3]">
                      <label className="font-semibold text-[#252522] block">
                        Enter UPI VPA / Handle:
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@okhdfcbank"
                        value={upiIdInput}
                        onChange={(e) => setUpiIdInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs"
                      />
                      <div className="text-[10px] text-[#252522]/60">
                        A simulated payment notification request will be approved automatically.
                      </div>
                    </div>
                  )}

                  {razorpaySubMethod === 'card' && (
                    <div className="space-y-2 bg-[#FAF8F3] p-3 rounded-lg border border-[#E0D5C3]">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Card Number (4111 2222 ...)"
                          defaultValue="4111 2222 3333 4444"
                          className="col-span-2 px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-mono"
                        />
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          className="px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-mono"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          defaultValue="789"
                          maxLength={3}
                          className="px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {razorpaySubMethod === 'netbanking' && (
                    <div className="space-y-2 bg-[#FAF8F3] p-3 rounded-lg border border-[#E0D5C3]">
                      <select className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs">
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-[#E0D5C3] space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-[#A8794F] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#252522]/80 leading-relaxed">
                      Your order will be registered in Brother&apos;s system. A pro-forma tax invoice
                      with bank account details (IFSC, Account Number) will be dispatched to your
                      email/phone for business NEFT/RTGS settlement.
                    </p>
                  </div>
                </div>
              )}

              {/* Total & Action */}
              <div className="p-4 rounded-xl bg-[#EDE4D7]/40 border border-[#E0D5C3] flex items-center justify-between">
                <div>
                  <span className="text-[#252522]/60 block">Amount Payable:</span>
                  <span className="text-xl font-extrabold text-[#252522] tabular-nums">
                    ₹{cartGrandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#252522]/70">
                  <div>Delivery to: {customer.city}, {customer.pinCode}</div>
                  <div>Recipient: {customer.fullName}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="px-4 py-2 text-xs font-semibold text-[#252522]/70 hover:text-[#252522]"
                >
                  &larr; Back to Address
                </button>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleProcessOrder}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#A8794F] hover:bg-[#966842] rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <span>Securing Authorization...</span>
                  ) : (
                    <>
                      <span>
                        {paymentMethod === 'razorpay_simulated'
                          ? `Pay ₹${cartGrandTotal.toLocaleString('en-IN')}`
                          : 'Confirm Order Enquiry'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-100" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Success Screen */}
          {step === 'success' && confirmedOrder && (
            <div className="py-4 space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-[#69765A]/15 text-[#69765A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#252522]">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-[#252522]/70">
                  Order Reference:{' '}
                  <span className="font-bold font-mono text-[#A8794F] text-sm">
                    {confirmedOrder.id}
                  </span>
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="p-4 rounded-xl bg-white border border-[#E0D5C3] text-left text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-[#E0D5C3]">
                  <span className="font-semibold text-[#252522]">Shipping Destination</span>
                  <span className="font-semibold text-[#69765A] capitalize">
                    Status: {confirmedOrder.orderStatus}
                  </span>
                </div>

                <div className="space-y-0.5 text-[#252522]/80">
                  <div className="font-semibold text-[#252522]">
                    {confirmedOrder.customer.fullName}{' '}
                    {confirmedOrder.customer.companyName && (
                      <span className="font-normal text-[#252522]/60">
                        ({confirmedOrder.customer.companyName})
                      </span>
                    )}
                  </div>
                  <div>{confirmedOrder.customer.phone} · {confirmedOrder.customer.email}</div>
                  <div>
                    {confirmedOrder.customer.addressLine1}, {confirmedOrder.customer.city},{' '}
                    {confirmedOrder.customer.state} - {confirmedOrder.customer.pinCode}
                  </div>
                  {confirmedOrder.customer.gstNumber && (
                    <div className="font-mono text-[11px] text-[#A8794F]">
                      GSTIN: {confirmedOrder.customer.gstNumber}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#E0D5C3] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#252522]/60">Items Total:</span>
                    <span className="tabular-nums">₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#252522]/60">GST (18%):</span>
                    <span className="tabular-nums">₹{confirmedOrder.taxTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#252522]/60">Shipping Fee:</span>
                    <span className="tabular-nums">
                      {confirmedOrder.shippingFee === 0 ? 'FREE' : `₹${confirmedOrder.shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#252522] pt-1 border-t border-[#E0D5C3]/70">
                    <span>Grand Total:</span>
                    <span className="tabular-nums">₹{confirmedOrder.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    setIsTrackingOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#A8794F] hover:bg-[#966842] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <PackageCheck className="w-4 h-4 text-amber-100" />
                  <span>Track This Order</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#EDE4D7] hover:bg-[#E3D8C8] text-[#252522] font-semibold rounded-lg text-xs transition-colors border border-[#DDD3C2]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pro-Forma Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="py-2.5 px-4 text-xs font-semibold text-[#252522]/70 hover:text-[#252522] rounded-lg transition-colors"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
