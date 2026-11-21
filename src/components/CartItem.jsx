import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const lineTotal = item.price * item.quantity;

  return (
    <div
      data-testid={`cart-item-${item.id}`}
      className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-300 transition-colors"
    >
      {/* Product Info */}
      <div className="flex items-center space-x-3">
        <div className="w-14 h-14 bg-slate-100 rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center border border-slate-200">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
            {item.name}
          </h4>
          <p className="text-xs text-gray-500">
            ₹{item.price.toLocaleString('en-IN')} each
          </p>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end space-x-4">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
            className="w-7 h-7 flex items-center justify-center rounded text-gray-600 hover:text-gray-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span
            data-testid={`quantity-${item.id}`}
            className="w-8 text-center text-sm font-semibold text-gray-800"
            aria-label={`Quantity: ${item.quantity}`}
          >
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            aria-label={`Increase quantity of ${item.name}`}
            className="w-7 h-7 flex items-center justify-center rounded text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[80px]">
          <span className="text-xs text-gray-400 block">Total</span>
          <span
            data-testid={`line-total-${item.id}`}
            className="font-bold text-gray-900 text-sm sm:text-base"
          >
            ₹{lineTotal.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
