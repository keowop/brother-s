/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartGrandTotal,
    currentAppliedTier,
    setIsCheckoutOpen,
    product,
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] border-l border-[#E0D5C3] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E0D5C3] flex items-center justify-between bg-[#EDE4D7]/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#A8794F]" />
              <h2 className="font-display text-base font-bold text-[#252522]">
                Your Packaging Bag
              </h2>
              {cartCount > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#A8794F] text-white tabular-nums">
                  {cartCount} roll{cartCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#252522]/60 hover:text-[#252522] hover:bg-[#EDE4D7] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EDE4D7] flex items-center justify-center mx-auto text-[#A8794F]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-display text-base font-semibold text-[#252522]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#252522]/60 max-w-xs mx-auto">
                  Add Brother&apos;s Honeycomb Kraft Paper Wrap to protect your shipments.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#A8794F] rounded-lg hover:bg-[#966842] transition-colors cursor-pointer shadow-xs"
                >
                  Browse Storefront
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const rollPrice = product.basePrice;
                  return (
                    <div
                      key={item.product.id}
                      className="p-4 rounded-xl bg-white border border-[#E0D5C3] space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-lg object-cover border border-[#E0D5C3] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-xs font-bold text-[#252522] truncate">
                            {item.product.title}
                          </h4>
                          <p className="text-[11px] text-[#252522]/60 pt-0.5">
                            {item.product.width} × {item.product.length}
                          </p>
                          <div className="text-xs font-bold text-[#252522] tabular-nums pt-1">
                            ₹{rollPrice.toLocaleString('en-IN')}{' '}
                            <span className="text-[10px] font-normal text-[#252522]/60">
                              / roll
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-[#252522]/40 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E0D5C3]/60 text-xs">
                        <div className="flex items-center border border-[#E0D5C3] rounded-md overflow-hidden bg-[#FAF8F3]">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className="px-2.5 py-1 text-xs font-semibold hover:bg-[#EDE4D7] transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-bold text-[#252522] tabular-nums min-w-7 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-2.5 py-1 text-xs font-semibold hover:bg-[#EDE4D7] transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-[#252522] tabular-nums text-sm">
                            ₹{(rollPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Applied Tier Notice */}
                {currentAppliedTier && (
                  <div className="p-3 rounded-lg bg-[#EDE4D7]/50 border border-[#E0D5C3] text-xs space-y-1">
                    <div className="font-semibold text-[#252522] flex items-center justify-between">
                      <span>{currentAppliedTier.label}</span>
                      {currentAppliedTier.discountPercentage > 0 && (
                        <span className="text-[#69765A] font-bold">
                          {currentAppliedTier.discountPercentage}% Discount Active
                        </span>
                      )}
                    </div>
                    {cartCount < 3 && (
                      <p className="text-[11px] text-[#A8794F]">
                        Add {3 - cartCount} more roll{3 - cartCount > 1 ? 's' : ''} to unlock free
                        shipping and 5% volume savings!
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Order Total Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E0D5C3] bg-[#FAF8F3] space-y-4">
              <div className="space-y-1.5 text-xs text-[#252522]/80">
                <div className="flex justify-between">
                  <span>Gross Subtotal</span>
                  <span className="tabular-nums">
                    ₹{(cartSubtotal + cartDiscount).toLocaleString('en-IN')}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#69765A] font-semibold">
                    <span>Volume Tier Discount</span>
                    <span className="tabular-nums">- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (18% packaging tax)</span>
                  <span className="tabular-nums">₹{cartTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Surface Shipping (India)</span>
                  <span className="tabular-nums">
                    {cartShipping === 0 ? (
                      <span className="text-[#69765A] font-semibold">FREE (3+ rolls)</span>
                    ) : (
                      `₹${cartShipping}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E0D5C3] flex justify-between text-base font-bold text-[#252522]">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-lg">
                    ₹{cartGrandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold text-white bg-[#A8794F] hover:bg-[#966842] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-100" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#252522]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#69765A]" />
                <span>Secure payment simulation · GST Tax Invoice provided</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
