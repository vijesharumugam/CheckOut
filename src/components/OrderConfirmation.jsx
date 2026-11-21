import React from 'react';
import { CheckCircle2, PackageCheck, ArrowRight, RotateCcw, Calendar, ShieldCheck } from 'lucide-react';

export default function OrderConfirmation({ order, onResetOrder }) {
  if (!order) return null;

  return (
    <div
      data-testid="order-confirmation"
      className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10 max-w-2xl mx-auto space-y-8 animate-fadeIn"
    >
      {/* Success Badge & Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Order Verified</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Order Successfully Placed!
          </h2>
          <p className="text-base font-medium text-gray-700">
            Thank you, <span className="font-bold text-sky-700" data-testid="confirmed-customer-name">{order.customerName}</span>!
          </p>
          <p className="text-sm text-gray-500">
            Your order has been confirmed.
          </p>
        </div>
      </div>

      {/* Order Reference & Date Card */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
        <div>
          <span className="text-xs text-gray-500 block uppercase font-medium">Order Reference</span>
          <span
            data-testid="order-reference"
            className="font-mono font-bold text-gray-900 text-base sm:text-lg select-all"
          >
            {order.orderReference}
          </span>
        </div>
        <div className="sm:text-right">
          <span className="text-xs text-gray-500 block uppercase font-medium flex items-center sm:justify-end gap-1">
            <Calendar className="w-3 h-3 text-gray-400" /> Date
          </span>
          <span className="text-gray-700 font-medium">
            {order.timestamp}
          </span>
        </div>
      </div>

      {/* Ordered Products Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 pb-2 border-b border-gray-100">
          <span>Items Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})</span>
          <span>Line Total</span>
        </div>
        <div className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <div
              key={item.id}
              data-testid={`confirmed-item-${item.id}`}
              className="py-3 flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 p-1 flex items-center justify-center flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Qty: <span className="font-medium text-gray-700" data-testid={`confirmed-qty-${item.id}`}>{item.quantity}</span> × ₹{item.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <span className="font-bold text-gray-900">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Order Total */}
      <div className="pt-4 border-t-2 border-gray-200 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-gray-600 block">Total Amount</span>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <PackageCheck className="w-3.5 h-3.5" /> All taxes & shipping included
          </span>
        </div>
        <span
          data-testid="confirmed-total"
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
        >
          ₹{order.totalAmount.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Customer Notification notice */}
      <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl text-xs text-sky-800 space-y-1">
        <p className="font-semibold">Your order has been successfully placed.</p>
        {order.customerEmail ? (
          <p>
            A confirmation receipt has been sent to <span className="font-medium underline">{order.customerEmail}</span>.
          </p>
        ) : (
          <p>You can save the order reference above for reference.</p>
        )}
      </div>

      {/* Action to Start New Order */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onResetOrder}
          data-testid="start-new-order-button"
          className="flex-1 py-3 px-6 rounded-xl font-semibold text-sm text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 transition-colors shadow-sm flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start New Order</span>
        </button>
      </div>
    </div>
  );
}
