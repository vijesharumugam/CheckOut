import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, cartItems, onAddToCart, onUpdateQuantity }) {
  const cartMap = new Map(cartItems.map((item) => [item.id, item]));

  return (
    <section id="products" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Available Products
          </h2>
          <p className="text-sm text-gray-500">
            Select items to add to your order
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
          {products.length} Products Available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={cartMap.get(product.id)}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </section>
  );
}
