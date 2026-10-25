/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calculator,
  Save,
  RotateCcw,
  TrendingUp,
  Percent,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { UnitEconomicsConfig } from '../types';

export const ProfitCalculator: React.FC = () => {
  const {
    unitEconomics,
    updateUnitEconomics,
    calculatePriceFromEconomics,
    applyEconomicsPrice,
    product,
  } = useStore();

  const [localEcon, setLocalEcon] = useState<UnitEconomicsConfig>(unitEconomics);
  const [projectedMonthlyRolls, setProjectedMonthlyRolls] = useState(250);

  const handleChange = (field: keyof UnitEconomicsConfig, val: number) => {
    const updated = { ...localEcon, [field]: val };
    const newSuggested = calculatePriceFromEconomics(updated);
    updated.suggestedPriceBeforeTax = newSuggested;
    setLocalEcon(updated);
    updateUnitEconomics(updated);
  };

  // Calculations
  const directUnitCost =
    Number(localEcon.procurementCost) +
    Number(localEcon.packagingCost) +
    Number(localEcon.shippingSubsidy) +
    Number(localEcon.otherVariableCost);

  const suggestedPrice = calculatePriceFromEconomics(localEcon);
  const currentSellingPrice = product.basePrice;
  const gatewayFeeAmount = Math.round(
    currentSellingPrice * (Number(localEcon.paymentGatewayFeePercent) / 100)
  );
  const totalCostWithGateway = directUnitCost + gatewayFeeAmount;
  const netProfitPerRoll = currentSellingPrice - totalCostWithGateway;
  const effectiveGrossMarginPercent = Math.round(
    (netProfitPerRoll / Math.max(1, currentSellingPrice)) * 100
  );

  // Projections
  const monthlyRevenue = projectedMonthlyRolls * currentSellingPrice;
  const monthlyGrossProfit = projectedMonthlyRolls * netProfitPerRoll;

  return (
    <div className="py-10 lg:py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8794F]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Unit Economics & Margin Architecture</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#252522] tracking-tight">
            Packaging Pricing & Profit Calculator
          </h1>
          <p className="text-sm sm:text-base text-[#252522]/75 leading-relaxed [text-wrap:pretty]">
            Configure Brother&apos;s raw material, logistics, and packaging costs. Use the standard
            formula to identify healthy gross margins and update live storefront prices safely.
          </p>
        </div>

        {/* Formula Explainer Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#EDE4D7]/50 border border-[#E0D5C3] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A8794F] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Percent className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <span className="font-bold text-[#252522] block">
                Standard E-Commerce Cost-Plus Formula:
              </span>
              <code className="text-[#A8794F] font-mono text-xs block pt-0.5">
                Selling Price Before Tax = Direct Unit Costs / (1 - (Target Gross Margin + Gateway Fee))
              </code>
            </div>
          </div>

          <button
            onClick={applyEconomicsPrice}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#A8794F] hover:bg-[#966842] text-white rounded-lg font-semibold text-xs transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-amber-100" />
            <span>Apply ₹{suggestedPrice.toLocaleString('en-IN')} to Store</span>
          </button>
        </div>

        {/* Main Grid: Inputs Left (7 cols), Metrics & Simulator Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white border border-[#E0D5C3] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <h2 className="font-display text-lg font-bold text-[#252522] pb-3 border-b border-[#E0D5C3]">
              Cost Breakdown (Per 10&quot; × 250m Roll)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Procurement */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3]">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[#252522]">Raw Roll Procurement (₹)</label>
                  <span className="text-[11px] text-[#252522]/50">Virgin Kraft</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={localEcon.procurementCost}
                  onChange={(e) =>
                    handleChange('procurementCost', parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-sm font-bold tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                />
                <span className="text-[10px] text-[#252522]/60 block">
                  Mill purchase cost per converted paper roll.
                </span>
              </div>

              {/* Packaging */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3]">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[#252522]">Core & Shrink Wrap (₹)</label>
                  <span className="text-[11px] text-[#252522]/50">Packaging</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={localEcon.packagingCost}
                  onChange={(e) =>
                    handleChange('packagingCost', parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-sm font-bold tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                />
                <span className="text-[10px] text-[#252522]/60 block">
                  Cardboard core tube, dust shrink film & outer box.
                </span>
              </div>

              {/* Shipping Subsidy */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3]">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[#252522]">Logistics / Shipping Absorption (₹)</label>
                  <span className="text-[11px] text-[#252522]/50">Surface</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={localEcon.shippingSubsidy}
                  onChange={(e) =>
                    handleChange('shippingSubsidy', parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-sm font-bold tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                />
                <span className="text-[10px] text-[#252522]/60 block">
                  Average courier subsidy absorbed by brand.
                </span>
              </div>

              {/* Other Variable Costs */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3]">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[#252522]">Warehouse & Handling (₹)</label>
                  <span className="text-[11px] text-[#252522]/50">Labor & Label</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={localEcon.otherVariableCost}
                  onChange={(e) =>
                    handleChange('otherVariableCost', parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-sm font-bold tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                />
                <span className="text-[10px] text-[#252522]/60 block">
                  Thermal shipping labels & picker handling.
                </span>
              </div>

              {/* Gateway Fee % */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3]">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[#252522]">Payment Gateway Fee (%)</label>
                  <span className="text-[11px] text-[#252522]/50">Razorpay / PG</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={localEcon.paymentGatewayFeePercent}
                  onChange={(e) =>
                    handleChange(
                      'paymentGatewayFeePercent',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-sm font-bold tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                />
                <span className="text-[10px] text-[#252522]/60 block">
                  Typically 2.0% for Indian UPI and cards.
                </span>
              </div>

              {/* Target Gross Margin % */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#E0D5C3]">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[#252522]">Target Gross Margin (%)</label>
                  <span className="text-[11px] text-[#69765A] font-bold">Goal</span>
                </div>
                <input
                  type="number"
                  min="5"
                  max="80"
                  value={localEcon.targetGrossMarginPercent}
                  onChange={(e) =>
                    handleChange(
                      'targetGrossMarginPercent',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-lg text-sm font-bold tabular-nums focus:outline-hidden focus:border-[#A8794F]"
                />
                <span className="text-[10px] text-[#252522]/60 block">
                  Healthy packaging margin range is 30% to 45%.
                </span>
              </div>
            </div>

            {/* Total Direct Unit Cost Callout */}
            <div className="p-4 rounded-xl bg-[#EDE4D7]/30 border border-[#E0D5C3] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#252522]">
                Total Direct Unit Cost (excl. gateway):
              </span>
              <span className="font-bold text-base text-[#252522] tabular-nums">
                ₹{directUnitCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Economics Summary & Volume Projection (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Pricing Health Card */}
            <div className="bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-display text-base font-bold text-[#252522] flex items-center justify-between">
                <span>Unit Profitability Matrix</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#69765A]/15 text-[#69765A]">
                  Active Store
                </span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[#E0D5C3]/70">
                  <span className="text-[#252522]/70">Current Selling Price:</span>
                  <span className="font-bold text-[#252522] tabular-nums">
                    ₹{currentSellingPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#E0D5C3]/70">
                  <span className="text-[#252522]/70">Suggested Formula Price:</span>
                  <span className="font-bold text-[#A8794F] tabular-nums">
                    ₹{suggestedPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#E0D5C3]/70">
                  <span className="text-[#252522]/70">Direct Unit Cost:</span>
                  <span className="text-red-700/80 font-mono tabular-nums">
                    - ₹{directUnitCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#E0D5C3]/70">
                  <span className="text-[#252522]/70">Gateway Processing Fee (2%):</span>
                  <span className="text-red-700/80 font-mono tabular-nums">
                    - ₹{gatewayFeeAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-t-2 border-[#E0D5C3] text-sm font-bold text-[#252522]">
                  <span>Net Gross Margin / Roll:</span>
                  <div className="text-right">
                    <span className="text-[#69765A] tabular-nums">
                      ₹{netProfitPerRoll.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-medium text-[#252522]/60 ml-1">
                      ({effectiveGrossMarginPercent}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Volume Simulator */}
            <div className="bg-[#FAF8F3] border border-[#E0D5C3] rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-[#252522] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#A8794F]" />
                  <span>Monthly Volume Projection</span>
                </h3>
                <span className="text-xs font-bold text-[#252522] font-mono tabular-nums">
                  {projectedMonthlyRolls} rolls/mo
                </span>
              </div>

              <div className="space-y-1">
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={projectedMonthlyRolls}
                  onChange={(e) => setProjectedMonthlyRolls(parseInt(e.target.value) || 50)}
                  className="w-full accent-[#A8794F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#252522]/50">
                  <span>50 rolls</span>
                  <span>500 rolls</span>
                  <span>1,500 rolls</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white border border-[#E0D5C3] rounded-xl">
                  <span className="text-[11px] text-[#252522]/60 block">Monthly Revenue:</span>
                  <span className="text-sm font-bold text-[#252522] tabular-nums">
                    ₹{monthlyRevenue.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#E0D5C3] rounded-xl">
                  <span className="text-[11px] text-[#252522]/60 block">Gross Profit:</span>
                  <span className="text-sm font-bold text-[#69765A] tabular-nums">
                    ₹{monthlyGrossProfit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
