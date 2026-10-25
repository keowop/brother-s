/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  Download,
  Search,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderRecord, BulkEnquiry, PricingTier } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    product,
    updateProduct,
    pricingTiers,
    updatePricingTiers,
    orders,
    updateOrderStatus,
    bulkEnquiries,
    updateBulkEnquiryStatus,
    setCurrentView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'kpis' | 'orders' | 'enquiries' | 'pricing' | 'catalog' | 'checklist'
  >('kpis');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');

  // Local state for editing tiers
  const [editableTiers, setEditableTiers] = useState<PricingTier[]>(pricingTiers);
  const [editableProduct, setEditableProduct] = useState(product);

  // KPI calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.grandTotal, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const newEnquiriesCount = bulkEnquiries.filter((e) => e.status === 'new').length;

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customer.phone.includes(orderSearch);
    const matchesStatus =
      orderStatusFilter === 'all' || ord.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Enquiries
  const filteredEnquiries = bulkEnquiries.filter((enq) => {
    const matchesSearch =
      enq.id.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.customerName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.companyName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.phone.includes(enquirySearch);
    const matchesStatus =
      enquiryStatusFilter === 'all' || enq.status === enquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // CSV Exporters
  const exportOrdersCSV = () => {
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Company',
      'Phone',
      'City',
      'State',
      'PIN',
      'Total Rolls',
      'Grand Total',
      'Status',
      'Payment Method',
    ];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString('en-IN'),
      `"${o.customer.fullName}"`,
      `"${o.customer.companyName || ''}"`,
      o.customer.phone,
      o.customer.city,
      o.customer.state,
      o.customer.pinCode,
      o.items.reduce((s, it) => s + it.quantity, 0),
      o.grandTotal,
      o.orderStatus,
      o.paymentMethod,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `brothers_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportEnquiriesCSV = () => {
    const headers = [
      'Enquiry ID',
      'Date',
      'Contact Name',
      'Company Name',
      'Phone',
      'Email',
      'Quantity (Rolls)',
      'City',
      'PIN',
      'Order Frequency',
      'Status',
      'Quoted Value (INR)',
    ];
    const rows = bulkEnquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleDateString('en-IN'),
      `"${e.customerName}"`,
      `"${e.companyName}"`,
      e.phone,
      e.email,
      e.requiredQuantity,
      e.deliveryCity,
      e.deliveryPin,
      e.orderFrequency,
      e.status,
      e.quoteValue || 0,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `brothers_bulk_enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveTiers = () => {
    updatePricingTiers(editableTiers);
  };

  const handleSaveProduct = () => {
    updateProduct(editableProduct);
  };

  return (
    <div className="py-10 lg:py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E0D5C3]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#69765A]">
              <span>Merchant Back-Office Operations</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#252522]">
              Brother&apos;s Store Administration
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-2 text-xs font-semibold text-[#252522] bg-[#EDE4D7] hover:bg-[#E3D8C8] rounded-lg transition-colors border border-[#DDD3C2]"
            >
              Back to Storefront
            </button>
            <button
              onClick={() => setCurrentView('calculator')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#A8794F] hover:bg-[#966842] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Profit Economics
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-6 text-xs font-semibold border-b border-[#E0D5C3]">
          {[
            { id: 'kpis', label: 'Operations Overview', icon: LayoutDashboard },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            {
              id: 'enquiries',
              label: `Bulk Quotes (${bulkEnquiries.length})`,
              icon: FileText,
              badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : null,
            },
            { id: 'pricing', label: 'Pricing & Slabs', icon: DollarSign },
            { id: 'catalog', label: 'Product & Stock', icon: Package },
            { id: 'checklist', label: 'Pre-Launch Checklist', icon: CheckCircle },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#A8794F] text-white shadow-xs'
                    : 'text-[#252522]/70 hover:bg-[#EDE4D7]/50 hover:text-[#252522]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className="text-[10px] font-bold bg-[#A8794F] text-white px-1.5 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: KPIS */}
        {activeTab === 'kpis' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 rounded-xl bg-white border border-[#E0D5C3] shadow-2xs space-y-2">
                <span className="text-xs font-medium text-[#252522]/60">Total Store Revenue</span>
                <div className="text-2xl font-extrabold text-[#252522] tabular-nums">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-[#69765A] block">Includes GST & shipping</span>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E0D5C3] shadow-2xs space-y-2">
                <span className="text-xs font-medium text-[#252522]/60">Total Orders Logged</span>
                <div className="text-2xl font-extrabold text-[#252522] tabular-nums">
                  {totalOrders}
                </div>
                <span className="text-[11px] text-[#252522]/50 block">All channels</span>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E0D5C3] shadow-2xs space-y-2">
                <span className="text-xs font-medium text-[#252522]/60">B2B Bulk Enquiries</span>
                <div className="text-2xl font-extrabold text-[#A8794F] tabular-nums">
                  {bulkEnquiries.length}
                </div>
                <span className="text-[11px] text-[#A8794F] font-semibold block">
                  {newEnquiriesCount} require quotation response
                </span>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E0D5C3] shadow-2xs space-y-2">
                <span className="text-xs font-medium text-[#252522]/60">Inventory Available</span>
                <div className="text-2xl font-extrabold text-[#69765A] tabular-nums">
                  {product.stockCount} rolls
                </div>
                <span className="text-[11px] text-[#69765A] block">
                  10&quot; × 250m ready rolls
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E0D5C3] rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-[#252522]">
                    Recent Order Dispatches
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#A8794F] hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>
                <div className="divide-y divide-[#E0D5C3]/70 text-xs">
                  {orders.slice(0, 3).map((ord) => (
                    <div key={ord.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="font-mono font-bold text-[#252522]">{ord.id}</span>
                        <div className="text-[11px] text-[#252522]/60">
                          {ord.customer.fullName} · {ord.customer.city}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold tabular-nums">
                          ₹{ord.grandTotal.toLocaleString('en-IN')}
                        </span>
                        <div className="text-[10px] text-[#69765A] capitalize">
                          {ord.orderStatus}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E0D5C3] rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-[#252522]">
                    Recent Bulk Lead Inbounds
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-semibold text-[#A8794F] hover:underline"
                  >
                    View Pipeline &rarr;
                  </button>
                </div>
                <div className="divide-y divide-[#E0D5C3]/70 text-xs">
                  {bulkEnquiries.slice(0, 3).map((enq) => (
                    <div key={enq.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="font-mono font-bold text-[#A8794F]">{enq.id}</span>
                        <div className="text-[11px] text-[#252522]/80">
                          {enq.companyName} ({enq.customerName})
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold tabular-nums">
                          {enq.requiredQuantity} rolls
                        </span>
                        <div className="text-[10px] text-[#69765A] capitalize">
                          Status: {enq.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3 bg-white p-4 rounded-xl border border-[#E0D5C3]">
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-[#252522]/40" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, Customer Name, or Phone..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F3] border border-[#E0D5C3] rounded-lg text-xs"
                  />
                </div>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FAF8F3] border border-[#E0D5C3] rounded-lg text-xs"
                >
                  <option value="all">All Statuses</option>
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <button
                onClick={exportOrdersCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EDE4D7] hover:bg-[#E3D8C8] text-[#252522] rounded-lg text-xs font-semibold transition-colors border border-[#DDD3C2]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-white border border-[#E0D5C3] rounded-xl overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EDE4D7]/30 border-b border-[#E0D5C3] text-[#252522]">
                    <th className="py-3 px-4 font-semibold">Order ID</th>
                    <th className="py-3 px-4 font-semibold">Customer Details</th>
                    <th className="py-3 px-4 font-semibold">Location</th>
                    <th className="py-3 px-4 font-semibold">Qty</th>
                    <th className="py-3 px-4 font-semibold">Total (INR)</th>
                    <th className="py-3 px-4 font-semibold">Status Lifecycle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0D5C3]/60">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF8F3]">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#252522]">
                        {ord.id}
                        <div className="text-[10px] text-[#252522]/50 font-sans">
                          {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#252522]">
                          {ord.customer.fullName}
                        </div>
                        <div className="text-[11px] text-[#252522]/60">
                          {ord.customer.phone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#252522]/80">
                        {ord.customer.city}, {ord.customer.state} ({ord.customer.pinCode})
                      </td>
                      <td className="py-3.5 px-4 font-bold tabular-nums">
                        {ord.items.reduce((s, i) => s + i.quantity, 0)} rolls
                      </td>
                      <td className="py-3.5 px-4 font-bold tabular-nums text-[#252522]">
                        ₹{ord.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as any)
                          }
                          className="px-2.5 py-1 bg-[#FAF8F3] border border-[#E0D5C3] rounded-md text-xs font-medium capitalize focus:outline-hidden"
                        >
                          <option value="placed">Placed</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed with Honeycomb</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        {ord.trackingNumber && (
                          <div className="text-[10px] text-[#A8794F] font-mono mt-0.5">
                            AWB: {ord.trackingNumber}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BULK ENQUIRIES PIPELINE */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3 bg-white p-4 rounded-xl border border-[#E0D5C3]">
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-[#252522]/40" />
                  <input
                    type="text"
                    placeholder="Search by Lead ID, Company, or Contact Name..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F3] border border-[#E0D5C3] rounded-lg text-xs"
                  />
                </div>
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FAF8F3] border border-[#E0D5C3] rounded-lg text-xs"
                >
                  <option value="all">All Lead States</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="closed">Closed / Won</option>
                </select>
              </div>

              <button
                onClick={exportEnquiriesCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EDE4D7] hover:bg-[#E3D8C8] text-[#252522] rounded-lg text-xs font-semibold transition-colors border border-[#DDD3C2]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Leads CSV</span>
              </button>
            </div>

            <div className="space-y-3">
              {filteredEnquiries.map((enq) => {
                const whatsappMsg = encodeURIComponent(
                  `Hi ${enq.customerName}, this is Brother's Packaging following up regarding your bulk quote request ${enq.id} for ${enq.requiredQuantity} rolls of honeycomb kraft paper wrap.`
                );
                return (
                  <div
                    key={enq.id}
                    className="p-5 rounded-xl bg-white border border-[#E0D5C3] shadow-2xs space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-[#E0D5C3]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#A8794F]">
                          {enq.id}
                        </span>
                        <span className="font-semibold text-sm text-[#252522]">
                          {enq.companyName}
                        </span>
                        <span className="text-[#252522]/60">({enq.customerName})</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            updateBulkEnquiryStatus(enq.id, e.target.value as any)
                          }
                          className="px-2.5 py-1 bg-[#FAF8F3] border border-[#E0D5C3] rounded-md font-semibold text-xs capitalize"
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="closed">Closed / Deal Won</option>
                        </select>

                        <a
                          href={`https://wa.me/?text=${whatsappMsg}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] transition-colors"
                          title="Contact via WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[#252522]/80">
                      <div>
                        <span className="text-[#252522]/50 block text-[11px]">Requested Quantity:</span>
                        <span className="font-bold tabular-nums text-[#252522]">
                          {enq.requiredQuantity} rolls
                        </span>
                      </div>
                      <div>
                        <span className="text-[#252522]/50 block text-[11px]">Delivery Location:</span>
                        <span className="font-medium">
                          {enq.deliveryCity} ({enq.deliveryPin})
                        </span>
                      </div>
                      <div>
                        <span className="text-[#252522]/50 block text-[11px]">Contact Info:</span>
                        <span>{enq.phone}</span>
                      </div>
                      <div>
                        <span className="text-[#252522]/50 block text-[11px]">Frequency:</span>
                        <span className="capitalize">{enq.orderFrequency}</span>
                      </div>
                    </div>

                    {enq.intendedApplication && (
                      <div className="p-2.5 bg-[#FAF8F3] rounded-lg border border-[#E0D5C3] text-[11px] text-[#252522]/80">
                        <span className="font-semibold text-[#252522]">Application: </span>
                        {enq.intendedApplication}
                        {enq.additionalNotes && ` · Notes: ${enq.additionalNotes}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: PRICING & TIERS */}
        {activeTab === 'pricing' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0D5C3] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E0D5C3]">
              <div>
                <h3 className="font-display font-bold text-base text-[#252522]">
                  Quantity Pricing Tiers Configurator
                </h3>
                <p className="text-xs text-[#252522]/60">
                  Update volume discount percentages and quantity thresholds for buyers.
                </p>
              </div>
              <button
                onClick={handleSaveTiers}
                className="px-4 py-2 bg-[#A8794F] hover:bg-[#966842] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Save Tiers to Storefront
              </button>
            </div>

            <div className="space-y-4">
              {editableTiers.map((tier, idx) => (
                <div
                  key={tier.id}
                  className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3] grid grid-cols-1 sm:grid-cols-4 gap-3 items-center text-xs"
                >
                  <div className="space-y-1 sm:col-span-1">
                    <label className="font-semibold text-[#252522] block">Label</label>
                    <input
                      type="text"
                      value={tier.label}
                      onChange={(e) => {
                        const copy = [...editableTiers];
                        copy[idx].label = e.target.value;
                        setEditableTiers(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E0D5C3] rounded-md text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#252522] block">Min Rolls</label>
                    <input
                      type="number"
                      value={tier.minQty}
                      onChange={(e) => {
                        const copy = [...editableTiers];
                        copy[idx].minQty = parseInt(e.target.value) || 1;
                        setEditableTiers(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E0D5C3] rounded-md text-xs font-bold tabular-nums"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#252522] block">
                      Max Rolls (Leave blank for 20+)
                    </label>
                    <input
                      type="number"
                      value={tier.maxQty ?? ''}
                      placeholder="Uncapped"
                      onChange={(e) => {
                        const copy = [...editableTiers];
                        copy[idx].maxQty = e.target.value ? parseInt(e.target.value) : null;
                        setEditableTiers(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E0D5C3] rounded-md text-xs font-bold tabular-nums"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#252522] block">Discount %</label>
                    <input
                      type="number"
                      value={tier.discountPercentage}
                      onChange={(e) => {
                        const copy = [...editableTiers];
                        copy[idx].discountPercentage = parseFloat(e.target.value) || 0;
                        setEditableTiers(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E0D5C3] rounded-md text-xs font-bold tabular-nums"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CATALOG & STOCK */}
        {activeTab === 'catalog' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0D5C3] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E0D5C3]">
              <div>
                <h3 className="font-display font-bold text-base text-[#252522]">
                  Product Catalog & Sizing Specifications
                </h3>
                <p className="text-xs text-[#252522]/60">
                  Update dimensions, inventory stock levels, and roll parameters.
                </p>
              </div>
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-[#A8794F] hover:bg-[#966842] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Save Product Changes
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">Base Selling Price (₹)</label>
                <input
                  type="number"
                  value={editableProduct.basePrice}
                  onChange={(e) =>
                    setEditableProduct({
                      ...editableProduct,
                      basePrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-bold tabular-nums"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">Active Stock Count (Rolls)</label>
                <input
                  type="number"
                  value={editableProduct.stockCount}
                  onChange={(e) =>
                    setEditableProduct({
                      ...editableProduct,
                      stockCount: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-bold tabular-nums"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">Roll Width</label>
                <input
                  type="text"
                  value={editableProduct.width}
                  onChange={(e) =>
                    setEditableProduct({ ...editableProduct, width: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">Roll Length</label>
                <input
                  type="text"
                  value={editableProduct.length}
                  onChange={(e) =>
                    setEditableProduct({ ...editableProduct, length: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">Paper GSM</label>
                <input
                  type="text"
                  value={editableProduct.gsm}
                  onChange={(e) =>
                    setEditableProduct({ ...editableProduct, gsm: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522] block">GST Rate (%)</label>
                <input
                  type="number"
                  value={editableProduct.taxRatePercent}
                  onChange={(e) =>
                    setEditableProduct({
                      ...editableProduct,
                      taxRatePercent: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-xs font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PRE-LAUNCH CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0D5C3] space-y-6 text-xs">
            <div className="space-y-1 pb-4 border-b border-[#E0D5C3]">
              <h3 className="font-display font-bold text-base text-[#252522]">
                Brother&apos;s Commercial Launch Readiness Audit
              </h3>
              <p className="text-xs text-[#252522]/60">
                Actionable checklist of items to verify before accepting live commercial customer payments.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  item: 'Confirm Exact Factory Roll Dimensions',
                  detail: 'Current dimensions are provisional: 10-inch width × 250m length. Confirm final slitting gauge with converter.',
                  status: 'action_required',
                },
                {
                  item: 'Register GSTIN & Packaging HSN Code',
                  detail: 'Ensure business GSTIN is configured for HSN 480890 (kraft corrugated/expandable paper) for B2B input tax credit.',
                  status: 'action_required',
                },
                {
                  item: 'Live Razorpay / Aggregator Merchant Keys',
                  detail: 'Storefront currently uses sandbox simulation. Add RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET to production .env.',
                  status: 'action_required',
                },
                {
                  item: 'Domestic Logistics Courier API Integration',
                  detail: 'Connect Delhivery, Shiprocket, or BlueDart Express API credentials for automated PIN code dispatch manifest generation.',
                  status: 'pending_setup',
                },
                {
                  item: 'Publish Official Business Support Phone & Email',
                  detail: 'Update placeholder contact details in the footer and bulk enquiry modals with official business SIM/WhatsApp.',
                  status: 'pending_setup',
                },
                {
                  item: 'Verified Return & Transit Damage Clause',
                  detail: 'Standard 48h unboxing inspection policy is configured in storefront and policies modal.',
                  status: 'complete',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-[#E0D5C3] bg-[#FAF8F3] flex items-start gap-3.5"
                >
                  {c.status === 'complete' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#69765A] shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#A8794F] shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#252522]">{c.item}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                          c.status === 'complete'
                            ? 'bg-[#69765A]/15 text-[#69765A]'
                            : 'bg-[#A8794F]/15 text-[#A8794F]'
                        }`}
                      >
                        {c.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#252522]/70 leading-relaxed">
                      {c.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
