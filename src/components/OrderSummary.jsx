import React from 'react';

export default function OrderSummary({ cartItems }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50/75 rounded-xl p-4 border border-gray-200/80 space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
        Order Summary
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Items count ({totalItems})</span>
          <span>₹{orderTotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between items-center text-xs text-emerald-700">
          <span>Shipping & Delivery</span>
          <span className="font-semibold uppercase tracking-wider bg-emerald-100/80 px-2 py-0.5 rounded">
            Free
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
        <span className="text-base font-bold text-gray-900">Order Total</span>
        <span
          data-testid="order-total"
          className="text-2xl font-extrabold text-gray-900 tracking-tight"
        >
          ₹{orderTotal.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
