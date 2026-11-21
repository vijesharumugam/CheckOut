import React from 'react';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm shadow-sky-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-gray-900 block leading-tight">
              Quick<span className="text-sky-600">Cart</span>
            </span>
            <span className="text-[11px] font-medium text-gray-500 tracking-tight block">
              Shop Fast, Pay Easy
            </span>
          </div>
        </div>

        {/* Home Navigation */}
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-4">
            <a
              href="#products"
              className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors"
            >
              Home
            </a>
          </nav>

          {/* Cart Icon & Count */}
          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Shopping Cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <ShoppingCart className="w-6 h-6" />
            <span
              data-testid="cart-badge"
              className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white rounded-full transition-transform ${
                cartCount > 0 ? 'bg-sky-600 scale-100' : 'bg-gray-400 scale-90'
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
