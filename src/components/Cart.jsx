import React from 'react';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import CartItem from './CartItem';

export default function Cart({ items, onUpdateQuantity, onRemove }) {
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
        </div>
        <span
          data-testid="cart-total-badge"
          className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-full"
        >
          {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <div
          data-testid="empty-cart-message"
          className="py-10 px-4 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-gray-200/60 flex items-center justify-center text-gray-400 mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">Your cart is empty</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            Please add at least one product to your cart from the product catalog to proceed with checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
