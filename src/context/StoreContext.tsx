/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ProductSpec,
  PricingTier,
  UnitEconomicsConfig,
  CartItem,
  OrderRecord,
  BulkEnquiry,
} from '../types';
import {
  INITIAL_PRODUCT,
  CATALOG_PRODUCTS,
  INITIAL_PRICING_TIERS,
  INITIAL_UNIT_ECONOMICS,
  INITIAL_ORDERS,
  INITIAL_BULK_ENQUIRIES,
} from '../data/defaultData';

export type AppView =
  | 'home'
  | 'product'
  | 'calculator'
  | 'admin'
  | 'tracking'
  | 'about'
  | 'contact'
  | 'shipping-policy'
  | 'returns-policy'
  | 'privacy-policy';

interface StoreContextType {
  product: ProductSpec;
  catalog: ProductSpec[];
  selectedProduct: ProductSpec;
  setSelectedProduct: (p: ProductSpec) => void;
  updateProduct: (updated: Partial<ProductSpec>) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  pricingTiers: PricingTier[];
  updatePricingTiers: (tiers: PricingTier[]) => void;
  unitEconomics: UnitEconomicsConfig;
  updateUnitEconomics: (economics: Partial<UnitEconomicsConfig>) => void;
  calculatePriceFromEconomics: (econ: UnitEconomicsConfig) => number;
  applyEconomicsPrice: () => void;
  
  cart: CartItem[];
  addToCart: (product: ProductSpec, qty?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  cartGrandTotal: number;
  currentAppliedTier: PricingTier;
  
  orders: OrderRecord[];
  createOrder: (orderData: Omit<OrderRecord, 'id' | 'createdAt'>) => OrderRecord;
  updateOrderStatus: (orderId: string, status: OrderRecord['orderStatus'], notes?: string) => void;
  lookupOrder: (query: string) => OrderRecord | undefined;
  
  bulkEnquiries: BulkEnquiry[];
  submitBulkEnquiry: (data: Omit<BulkEnquiry, 'id' | 'createdAt' | 'status'>) => BulkEnquiry;
  updateBulkEnquiryStatus: (
    id: string,
    status: BulkEnquiry['status'],
    adminNotes?: string,
    quoteValue?: number
  ) => void;
  
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isBulkQuoteOpen: boolean;
  setIsBulkQuoteOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  notification: { message: string; type: 'success' | 'info' | 'error' } | null;
  showNotification: (msg: string, type?: 'success' | 'info' | 'error') => void;
  dismissNotification: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PRODUCT: 'brothers_product_v1',
  TIERS: 'brothers_tiers_v1',
  ECONOMICS: 'brothers_economics_v1',
  CART: 'brothers_cart_v1',
  ORDERS: 'brothers_orders_v1',
  ENQUIRIES: 'brothers_enquiries_v1',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Catalog & Product State
  const [catalog, setCatalog] = useState<ProductSpec[]>(CATALOG_PRODUCTS);
  const [product, setProduct] = useState<ProductSpec>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCT);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCT;
    } catch {
      return INITIAL_PRODUCT;
    }
  });
  const [selectedProduct, setSelectedProduct] = useState<ProductSpec>(product);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // 2. Pricing Tiers State
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TIERS);
      return saved ? JSON.parse(saved) : INITIAL_PRICING_TIERS;
    } catch {
      return INITIAL_PRICING_TIERS;
    }
  });

  // 3. Unit Economics & Pricing Formula State
  // Formula: Selling Price Before Tax = (Procurement + Packaging + ShippingSubsidy + OtherVariable) / (1 - (GatewayFee% + TargetMargin%))
  const calculatePriceFromEconomics = (econ: UnitEconomicsConfig): number => {
    const fixedUnitCost =
      Number(econ.procurementCost) +
      Number(econ.packagingCost) +
      Number(econ.shippingSubsidy) +
      Number(econ.otherVariableCost);
    const totalDeductionRatio = (Number(econ.targetGrossMarginPercent) + Number(econ.paymentGatewayFeePercent)) / 100;
    const denominator = Math.max(0.1, 1 - totalDeductionRatio);
    const suggested = Math.round(fixedUnitCost / denominator);
    return suggested;
  };

  const [unitEconomics, setUnitEconomics] = useState<UnitEconomicsConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ECONOMICS);
      if (saved) return JSON.parse(saved);
      const initial = INITIAL_UNIT_ECONOMICS;
      return {
        ...initial,
        suggestedPriceBeforeTax: calculatePriceFromEconomics(initial),
      };
    } catch {
      return INITIAL_UNIT_ECONOMICS;
    }
  });

  // 4. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Orders State
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // 6. Bulk Enquiries State
  const [bulkEnquiries, setBulkEnquiries] = useState<BulkEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_BULK_ENQUIRIES;
    } catch {
      return INITIAL_BULK_ENQUIRIES;
    }
  });

  // View & Modal states
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBulkQuoteOpen, setIsBulkQuoteOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCT, JSON.stringify(product));
  }, [product]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TIERS, JSON.stringify(pricingTiers));
  }, [pricingTiers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ECONOMICS, JSON.stringify(unitEconomics));
  }, [unitEconomics]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ENQUIRIES, JSON.stringify(bulkEnquiries));
  }, [bulkEnquiries]);

  // Notifications helper
  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  const dismissNotification = () => setNotification(null);

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Determine current active tier based on total quantity
  const getActiveTier = (totalQty: number): PricingTier => {
    const sorted = [...pricingTiers].sort((a, b) => a.minQty - b.minQty);
    let matched = sorted[0];
    for (const t of sorted) {
      if (totalQty >= t.minQty && (t.maxQty === null || totalQty <= t.maxQty)) {
        matched = t;
        break;
      }
      if (t.maxQty === null && totalQty >= t.minQty) {
        matched = t;
      }
    }
    return matched || sorted[0];
  };

  const currentAppliedTier = getActiveTier(cartCount || 1);

  // Compute pricing
  const baseRollPrice = product.basePrice;
  const rawSubtotal = cart.reduce((sum, item) => sum + item.quantity * baseRollPrice, 0);
  const discountRate = (currentAppliedTier.discountPercentage || 0) / 100;
  const cartDiscount = Math.round(rawSubtotal * discountRate);
  const cartSubtotal = rawSubtotal - cartDiscount;
  const cartTax = Math.round(cartSubtotal * (product.taxRatePercent / 100));
  // Free shipping for 3 or more rolls; otherwise standard subsidized rate ₹120
  const cartShipping = cartCount >= 3 ? 0 : cartCount > 0 ? 120 : 0;
  const cartGrandTotal = cartSubtotal + cartTax + cartShipping;

  const addToCart = (prod: ProductSpec, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === prod.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          product: prod,
          quantity: qty,
          unitPrice: prod.basePrice,
          discountAppliedPercent: 0,
        },
      ];
    });
    showNotification(`Added ${qty} roll${qty > 1 ? 's' : ''} to cart`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  const updateProduct = (updated: Partial<ProductSpec>) => {
    setProduct((prev) => ({ ...prev, ...updated }));
    showNotification('Product catalog updated successfully', 'success');
  };

  const updatePricingTiers = (tiers: PricingTier[]) => {
    setPricingTiers(tiers);
    showNotification('Pricing tiers updated', 'success');
  };

  const updateUnitEconomics = (economics: Partial<UnitEconomicsConfig>) => {
    setUnitEconomics((prev) => {
      const next = { ...prev, ...economics };
      next.suggestedPriceBeforeTax = calculatePriceFromEconomics(next);
      return next;
    });
  };

  const applyEconomicsPrice = () => {
    const suggested = calculatePriceFromEconomics(unitEconomics);
    setUnitEconomics((prev) => ({ ...prev, appliedSellingPrice: suggested }));
    setProduct((prev) => ({ ...prev, basePrice: suggested }));
    showNotification(`Applied profitable base price: ₹${suggested.toLocaleString('en-IN')}`, 'success');
  };

  const createOrder = (orderData: Omit<OrderRecord, 'id' | 'createdAt'>): OrderRecord => {
    const newId = `BR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    // Deduct stock count
    const totalRollsOrdered = orderData.items.reduce((s, it) => s + it.quantity, 0);
    setProduct((prev) => ({
      ...prev,
      stockCount: Math.max(0, prev.stockCount - totalRollsOrdered),
    }));
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderRecord['orderStatus'],
    notes?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              orderStatus: status,
              ...(notes ? { notes } : {}),
              ...(status === 'shipped' && !ord.trackingNumber
                ? {
                    trackingNumber: `EXP-${Math.floor(100000 + Math.random() * 900000)}`,
                    courierPartner: 'Delhivery Surface Logistics',
                  }
                : {}),
            }
          : ord
      )
    );
    showNotification(`Order ${orderId} updated to ${status}`, 'success');
  };

  const lookupOrder = (query: string): OrderRecord | undefined => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      (ord) =>
        ord.id.toUpperCase() === clean ||
        ord.trackingNumber?.toUpperCase() === clean ||
        ord.customer.phone.includes(query.trim())
    );
  };

  const submitBulkEnquiry = (
    data: Omit<BulkEnquiry, 'id' | 'createdAt' | 'status'>
  ): BulkEnquiry => {
    const newId = `BQ-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newEnquiry: BulkEnquiry = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setBulkEnquiries((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateBulkEnquiryStatus = (
    id: string,
    status: BulkEnquiry['status'],
    adminNotes?: string,
    quoteValue?: number
  ) => {
    setBulkEnquiries((prev) =>
      prev.map((enq) =>
        enq.id === id
          ? {
              ...enq,
              status,
              ...(adminNotes ? { adminNotes } : {}),
              ...(quoteValue !== undefined ? { quoteValue } : {}),
            }
          : enq
      )
    );
    showNotification(`Enquiry ${id} status updated to ${status}`, 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        product,
        catalog,
        selectedProduct,
        setSelectedProduct,
        updateProduct,
        activeCategory,
        setActiveCategory,
        pricingTiers,
        updatePricingTiers,
        unitEconomics,
        updateUnitEconomics,
        calculatePriceFromEconomics,
        applyEconomicsPrice,
        cart,
        addToCart,
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
        orders,
        createOrder,
        updateOrderStatus,
        lookupOrder,
        bulkEnquiries,
        submitBulkEnquiry,
        updateBulkEnquiryStatus,
        currentView,
        setCurrentView,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBulkQuoteOpen,
        setIsBulkQuoteOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isSearchOpen,
        setIsSearchOpen,
        notification,
        showNotification,
        dismissNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
