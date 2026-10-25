/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductSpec, PricingTier, UnitEconomicsConfig, OrderRecord, BulkEnquiry, PinServiceability } from '../types';

export const INITIAL_PRODUCT: ProductSpec = {
  id: 'honeycomb-kraft-roll-10x250',
  title: "Brother's Honeycomb Kraft Paper Wrap Roll",
  sku: 'BR-HCW-10250',
  subtitle: 'Expandable 3D Protective Paper Packaging Roll (10" × 250m)',
  category: 'honeycomb_rolls',
  isFeatured: true,
  description:
    "Pack with confidence using Brother's Honeycomb Kraft Paper Wrap. Its expandable mesh structure is designed to wrap a variety of products and add a protective paper layer during packing and handling. The convenient roll format makes it suitable for e-commerce sellers, retail brands and businesses that regularly prepare shipments.",
  shortDescription:
    'Expandable natural brown kraft paper roll. Expands into interlocking hexagonal cells to cushion and wrap fragile items without plastic tape.',
  width: '10 inches (254 mm)',
  length: '250 metres (approx. 400m when expanded)',
  gsm: '80 GSM Virgin Brown Kraft',
  material: '100% Recyclable Virgin Kraft Pulp, Unbleached',
  color: 'Natural Kraft Brown',
  expansionRatio: '1.5x - 1.6x expanded length',
  stockStatus: 'in_stock',
  stockCount: 180,
  basePrice: 1299,
  taxRatePercent: 18,
  taxIncluded: false,
  leadTime: 'Same-day dispatch for orders before 2 PM IST',
  moq: 1,
  images: [
    {
      id: 'img-1',
      url: '/src/assets/images/honeycomb_kraft_roll_1792921915850.jpg',
      alt: "Brother's Honeycomb Kraft Paper Packaging Roll 10-inch width",
      title: 'Packaging Roll with Hexagonal Expansion',
    },
    {
      id: 'img-2',
      url: '/src/assets/images/honeycomb_mesh_closeup_1792921916507.jpg',
      alt: 'Close up macro view of expanded hexagonal kraft paper cells',
      title: 'High-Tensile Honeycomb Cell Architecture',
    },
    {
      id: 'img-3',
      url: '/src/assets/images/honeycomb_wrapped_item_1792921916889.jpg',
      alt: 'Ceramic glassware and cosmetic bottles packed with Brother honeycomb wrap in shipping box',
      title: 'E-Commerce Parcel Protection in Action',
    },
    {
      id: 'img-4',
      url: '/src/assets/images/honeycomb_roll_dimensions_1792921917854.jpg',
      alt: 'Clean product roll dimensions and expanded sheet proportion',
      title: '10" x 250m Roll Blueprint',
    },
  ],
};

export const CATALOG_PRODUCTS: ProductSpec[] = [
  INITIAL_PRODUCT,
  {
    id: 'honeycomb-bench-dispenser',
    title: "Brother's Precision Manual Roll Dispenser Stand",
    sku: 'BR-DSP-01',
    subtitle: 'Heavy-Duty Steel Packing Workstation Dispenser',
    category: 'dispensers',
    isFeatured: true,
    description:
      'Engineered metal packaging workstation roll holder with adjustable brake tension for rapid, effortless honeycomb expansion.',
    shortDescription:
      'Adjustable steel tension dispenser for 10" and 15" rolls. Speeds up parcel packing by 40% on fulfillment lines.',
    width: 'Fits up to 15" width rolls',
    length: 'Heavy steel frame',
    gsm: 'N/A',
    material: 'Powder-Coated Industrial Steel',
    color: 'Matte Obsidian Black',
    expansionRatio: 'Adjustable tension brake',
    stockStatus: 'coming_soon',
    stockCount: 0,
    basePrice: 2499,
    taxRatePercent: 18,
    taxIncluded: false,
    leadTime: 'Next batch dropping in Nov 2026',
    moq: 1,
    images: [
      {
        id: 'img-disp-1',
        url: '/src/assets/images/packaging_bench_dispenser_1792923021580.jpg',
        alt: "Brother's Manual Bench Packaging Roll Dispenser",
        title: 'Workstation Roll Dispenser Stand',
      },
    ],
  },
  {
    id: 'honeycomb-bottle-sleeves',
    title: "Brother's Protective Honeycomb Bottle Sleeves (Pack of 50)",
    sku: 'BR-SLV-50',
    subtitle: 'Pre-Formed Expandable Hexagonal Paper Sleeves',
    category: 'sleeves',
    isFeatured: true,
    description:
      'Slip-on expandable kraft paper sleeves tailored specifically for wine bottles, artisanal olive oils, and apothecary glassware.',
    shortDescription:
      'Instant slip-on protective honeycomb sleeves. Eliminates bubble wrap and cardboard dividers for bottle shipping.',
    width: 'Fits 750ml & 500ml bottles',
    length: '320 mm height',
    gsm: '90 GSM Reinforced Kraft',
    material: '100% Biodegradable Natural Kraft',
    color: 'Natural Kraft Brown',
    expansionRatio: 'Radial flexible expansion',
    stockStatus: 'coming_soon',
    stockCount: 0,
    basePrice: 899,
    taxRatePercent: 18,
    taxIncluded: false,
    leadTime: 'Pre-order list open',
    moq: 50,
    images: [
      {
        id: 'img-slv-1',
        url: '/src/assets/images/kraft_honeycomb_sleeves_1792923020302.jpg',
        alt: "Brother's Honeycomb Paper Bottle Sleeves",
        title: 'Pre-Formed Glassware Protective Sleeves',
      },
    ],
  },
  {
    id: 'honeycomb-kraft-roll-15x250',
    title: "Brother's Honeycomb Kraft Paper Wrap (Wide 15\" × 250m)",
    sku: 'BR-HCW-15250',
    subtitle: 'Extra-Wide 15-Inch Expandable Roll for Large Parcels',
    category: 'honeycomb_rolls',
    isFeatured: false,
    description:
      'Extra-wide 15-inch brown honeycomb kraft roll for larger home decor, large paintings, framed artwork, and bulk electronics.',
    shortDescription:
      '15-inch width wide format roll. Ideal for wrapping larger ceramic platters, lighting fixtures, and decor items.',
    width: '15 inches (380 mm)',
    length: '250 metres',
    gsm: '80 GSM Virgin Brown Kraft',
    material: '100% Recyclable Virgin Kraft Pulp',
    color: 'Natural Kraft Brown',
    expansionRatio: '1.5x - 1.6x expanded length',
    stockStatus: 'coming_soon',
    stockCount: 0,
    basePrice: 1799,
    taxRatePercent: 18,
    taxIncluded: false,
    leadTime: 'Launching next quarter',
    moq: 1,
    images: [
      {
        id: 'img-wide-1',
        url: '/src/assets/images/honeycomb_roll_dimensions_1792921917854.jpg',
        alt: "Brother's 15-Inch Wide Honeycomb Packaging Roll",
        title: '15" Wide Format Packaging Roll',
      },
    ],
  },
];

export const INITIAL_PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-1',
    minQty: 1,
    maxQty: 2,
    label: 'Standard Pack (1–2 Rolls)',
    discountPercentage: 0,
  },
  {
    id: 'tier-2',
    minQty: 3,
    maxQty: 5,
    label: 'Studio Pack (3–5 Rolls)',
    discountPercentage: 5,
  },
  {
    id: 'tier-3',
    minQty: 6,
    maxQty: 19,
    label: 'Commercial Volume (6–19 Rolls)',
    discountPercentage: 10,
  },
  {
    id: 'tier-4',
    minQty: 20,
    maxQty: null,
    label: 'Enterprise Bulk (20+ Rolls)',
    discountPercentage: 15,
    isBulkEnquiry: true,
  },
];

export const INITIAL_UNIT_ECONOMICS: UnitEconomicsConfig = {
  procurementCost: 650, // Base raw kraft roll manufacturing / procurement cost
  packagingCost: 45, // Heavy core tube + dust shrink wrap + labeling
  shippingSubsidy: 110, // Average domestic surface shipping absorption per unit
  paymentGatewayFeePercent: 2.0, // Standard UPI/Card payment aggregator fee
  otherVariableCost: 25, // Handling & warehouse dispatch
  targetGrossMarginPercent: 35, // Desired gross margin percentage
  suggestedPriceBeforeTax: 1277,
  appliedSellingPrice: 1299,
};

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'BR-2026-1042',
    createdAt: '2026-10-24T14:32:00Z',
    items: [
      {
        product: INITIAL_PRODUCT,
        quantity: 4,
        unitPrice: 1234,
        discountAppliedPercent: 5,
      },
    ],
    subtotal: 4936,
    discountTotal: 260,
    taxTotal: 888,
    shippingFee: 0,
    grandTotal: 5824,
    customer: {
      fullName: 'Vikramaditya Sharma',
      companyName: 'Clay & Kiln Studio',
      phone: '+91 98201 44821',
      email: 'vikram@clayandkiln.in',
      addressLine1: 'Plot 42, Okhla Industrial Area Phase III',
      addressLine2: 'Near Crown Plaza',
      city: 'New Delhi',
      state: 'Delhi',
      pinCode: '110020',
      gstNumber: '07AAAAA0000A1Z5',
    },
    paymentMethod: 'razorpay_simulated',
    paymentStatus: 'paid_simulated',
    orderStatus: 'shipped',
    trackingNumber: 'DEL-EXP-8921004',
    courierPartner: 'Delhivery Surface Cargo',
    notes: 'Ceramic fragile studio. Regular order expected.',
  },
  {
    id: 'BR-2026-1041',
    createdAt: '2026-10-23T09:15:00Z',
    items: [
      {
        product: INITIAL_PRODUCT,
        quantity: 2,
        unitPrice: 1299,
        discountAppliedPercent: 0,
      },
    ],
    subtotal: 2598,
    discountTotal: 0,
    taxTotal: 468,
    shippingFee: 120,
    grandTotal: 3186,
    customer: {
      fullName: 'Ananya Deshmukh',
      companyName: 'Botanica Organics',
      phone: '+91 97654 32190',
      email: 'ananya@botanicaorganics.com',
      addressLine1: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560103',
    },
    paymentMethod: 'razorpay_simulated',
    paymentStatus: 'paid_simulated',
    orderStatus: 'delivered',
    trackingNumber: 'BLR-EXP-391284',
    courierPartner: 'BlueDart Express',
    notes: 'Customer replaced bubble wrap for organic skincare packaging.',
  },
];

export const INITIAL_BULK_ENQUIRIES: BulkEnquiry[] = [
  {
    id: 'BQ-2026-081',
    createdAt: '2026-10-24T18:10:00Z',
    customerName: 'Rajesh Mehra',
    companyName: 'Artisan Glassworks Pvt Ltd',
    phone: '+91 98112 77410',
    email: 'procurement@artisanglass.co.in',
    requiredQuantity: 150,
    unitType: 'rolls',
    deliveryCity: 'Firozabad',
    deliveryPin: '283203',
    orderFrequency: 'monthly',
    intendedApplication: 'Handblown glassware export parcels and retail gift sets',
    additionalNotes: 'Need GST invoice and pallet delivery terms. Interested in annual rate contract.',
    status: 'new',
    quoteValue: 165000,
    adminNotes: 'High-value prospect. Sample dispatched on 24th Oct.',
  },
  {
    id: 'BQ-2026-080',
    createdAt: '2026-10-22T11:45:00Z',
    customerName: 'Pooja Sundaram',
    companyName: 'PureEarth Apothecary',
    phone: '+91 94451 88203',
    email: 'pooja@pureearth.store',
    requiredQuantity: 40,
    unitType: 'rolls',
    deliveryCity: 'Chennai',
    deliveryPin: '600028',
    orderFrequency: 'weekly',
    intendedApplication: 'Amber glass serum and essential oil bottles shipping across India',
    additionalNotes: 'Seeking plastic-free certification details for eco-marketing.',
    status: 'quoted',
    quoteValue: 45600,
    adminNotes: 'Formal quote PDF emailed. Awaiting purchase order confirmation.',
  },
];

export const SAMPLE_PIN_CODES: Record<string, PinServiceability> = {
  '110001': { pin: '110001', city: 'New Delhi', state: 'Delhi', serviceable: true, estimatedDays: '1-2 business days', standardRate: 0 },
  '110020': { pin: '110020', city: 'New Delhi', state: 'Delhi', serviceable: true, estimatedDays: '1-2 business days', standardRate: 0 },
  '400001': { pin: '400001', city: 'Mumbai', state: 'Maharashtra', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
  '400050': { pin: '400050', city: 'Bandra, Mumbai', state: 'Maharashtra', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
  '560001': { pin: '560001', city: 'Bengaluru', state: 'Karnataka', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
  '560103': { pin: '560103', city: 'Bellandur, Bengaluru', state: 'Karnataka', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
  '600001': { pin: '600001', city: 'Chennai', state: 'Tamil Nadu', serviceable: true, estimatedDays: '3-4 business days', standardRate: 0 },
  '700001': { pin: '700001', city: 'Kolkata', state: 'West Bengal', serviceable: true, estimatedDays: '3-4 business days', standardRate: 0 },
  '500001': { pin: '500001', city: 'Hyderabad', state: 'Telangana', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
  '411001': { pin: '411001', city: 'Pune', state: 'Maharashtra', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
  '380001': { pin: '380001', city: 'Ahmedabad', state: 'Gujarat', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
  '302001': { pin: '302001', city: 'Jaipur', state: 'Rajasthan', serviceable: true, estimatedDays: '2-3 business days', standardRate: 0 },
};

export const FAQ_DATA = [
  {
    q: 'What is honeycomb kraft paper wrap?',
    a: "Brother's Honeycomb Kraft Paper Wrap is an unbleached paper roll precision-slit with an offset hexagonal mesh pattern. When gently pulled during wrapping, it expands into a 3-dimensional honeycomb matrix that cushions items, absorbs transit vibration, and naturally interlocks with itself without requiring plastic packaging tape.",
  },
  {
    q: 'How does it replace conventional plastic bubble wrap?',
    a: 'Unlike single-use LDPE plastic bubble film that tears, pops, and persists in landfills for centuries, honeycomb paper provides equivalent or superior surface cushioning through paper tension. It is 100% biodegradable, recyclable with regular paper waste, and delivers an artisanal, unboxing experience for your customers.',
  },
  {
    q: 'What are the exact roll dimensions?',
    a: 'Each roll is approximately 10 inches (254 mm) in width and 250 metres in unexpanded length. Upon gentle manual expansion during packaging, the 250m length extends by approximately 1.5x to 1.6x, producing up to 400 metres of active protective cushioning material.',
  },
  {
    q: 'What is the paper GSM and strength?',
    a: 'Brother’s Honeycomb Wrap is crafted from high-tensile 80 GSM natural virgin kraft paper. This grade provides the optimal balance of flexible conformability around delicate curves and structural crush-resistance under transit compression.',
  },
  {
    q: 'How much does one roll cost?',
    a: 'The standard roll price is currently ₹1,299 + 18% GST. We offer automatic volume tiers starting from 3 rolls (5% discount) and 6+ rolls (10% discount). For larger volumes of 20+ rolls or regular monthly requirements, customized wholesale quotes are available.',
  },
  {
    q: 'Do you offer bulk pricing and credit terms?',
    a: 'Yes. Small and medium e-commerce sellers, manufacturers, and corporate fulfillment hubs can submit a Bulk Quote Request through our website. Our procurement team provides slab-based pricing with GST invoicing within 4 business hours.',
  },
  {
    q: 'What are the shipping charges across India?',
    a: 'Standard surface courier shipping is calculated at checkout based on your delivery PIN code. Orders of 3 or more rolls qualify for subsidized or free surface delivery to major metropolitan hubs across India.',
  },
  {
    q: 'What is the return and transit damage policy?',
    a: 'We inspect every roll before dispatch to ensure clean cuts and unblemished core tubes. If your shipment arrives damaged during courier handling or exhibits manufacturing defects, notify us with unboxing photos within 48 hours for immediate replacement.',
  },
];
