/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  title: string;
}

export interface PricingTier {
  id: string;
  minQty: number;
  maxQty: number | null; // null means unbounded (e.g. 6+ or 20+)
  label: string;
  discountPercentage: number;
  calculatedPrice?: number;
  isBulkEnquiry?: boolean;
}

export interface ProductSpec {
  id: string;
  title: string;
  sku: string;
  subtitle: string;
  category: 'honeycomb_rolls' | 'dispensers' | 'sleeves' | 'mailers';
  isFeatured?: boolean;
  description: string;
  shortDescription: string;
  width: string; // e.g. "10 inches (254 mm)"
  length: string; // e.g. "250 metres"
  gsm: string; // e.g. "80 GSM"
  material: string; // e.g. "100% Virgin Kraft Paper (Biodegradable & Recyclable)"
  color: string; // e.g. "Natural Kraft Brown"
  expansionRatio: string; // e.g. "1.5x - 1.6x expanded length"
  stockStatus: 'in_stock' | 'low_stock' | 'coming_soon';
  stockCount: number;
  basePrice: number; // in INR
  taxRatePercent: number; // e.g. 18 for GST
  taxIncluded: boolean;
  images: ProductImage[];
  leadTime: string;
  moq: number;
}

export interface UnitEconomicsConfig {
  procurementCost: number; // Raw material roll procurement cost (INR)
  packagingCost: number; // Core, shrink-wrap, carton packaging (INR)
  shippingSubsidy: number; // Outward freight / logistics subsidy (INR)
  paymentGatewayFeePercent: number; // e.g. 2%
  otherVariableCost: number; // Handling & labels (INR)
  targetGrossMarginPercent: number; // e.g. 35%
  suggestedPriceBeforeTax: number;
  appliedSellingPrice: number;
}

export interface CartItem {
  product: ProductSpec;
  quantity: number;
  unitPrice: number;
  discountAppliedPercent: number;
}

export interface ShippingAddress {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  gstNumber?: string;
}

export interface OrderRecord {
  id: string; // e.g. BR-2026-1042
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  shippingFee: number;
  grandTotal: number;
  customer: ShippingAddress;
  paymentMethod: 'razorpay_simulated' | 'order_enquiry';
  paymentStatus: 'paid_simulated' | 'pending_verification';
  orderStatus: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered';
  trackingNumber?: string;
  courierPartner?: string;
  notes?: string;
}

export interface BulkEnquiry {
  id: string; // e.g. BQ-2026-081
  createdAt: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  requiredQuantity: number;
  unitType: 'rolls' | 'metres' | 'cartons';
  deliveryCity: string;
  deliveryPin: string;
  orderFrequency: 'one_time' | 'weekly' | 'monthly' | 'quarterly';
  intendedApplication: string;
  additionalNotes?: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  quoteValue?: number;
  adminNotes?: string;
}

export interface PinServiceability {
  pin: string;
  city: string;
  state: string;
  serviceable: boolean;
  estimatedDays: string;
  standardRate: number;
}
