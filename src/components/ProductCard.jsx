import React from 'react';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product, cartItem, onAddToCart, onUpdateQuantity }) {
  const quantity = cartItem ? cartItem.quantity : 0;
  const isAdded = quantity > 0;

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
          loading="eager"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-slate-700 border border-slate-200">
          {product.category}
        </span>
        {isAdded && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center space-x-1 border border-emerald-200">
            <Check className="w-3 h-3" />
            <span>In Cart ({quantity})</span>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-xs text-gray-500 block">Price</span>
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {isAdded ? (
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label={`Decrease quantity of ${product.name}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  data-testid={`card-quantity-${product.id}`}
                  className="w-8 text-center text-sm font-semibold text-gray-800"
                  aria-label={`Current quantity ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                  aria-label={`Increase quantity of ${product.name}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              aria-label={`Add ${product.name} to Cart`}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
                isAdded
                  ? 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                  : 'bg-sky-600 text-white hover:bg-sky-700 active:scale-[0.98]'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isAdded ? 'Add More' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
