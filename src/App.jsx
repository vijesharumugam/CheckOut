import React, { useState, useRef } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import { PRODUCTS } from './data/products';

export default function App() {
  const [products] = useState(PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Counter to produce unique order references: QC-YYYYMMDD-001, QC-YYYYMMDD-002, etc.
  const orderCounterRef = useRef(1);
  // Submission lock ref to guard against synchronous rapid double-clicks
  const isLockedRef = useRef(false);

  // Derived state
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // Clear cart-related error if present
    setValidationErrors((prev) => {
      if (prev.cart) {
        const next = { ...prev };
        delete next.cart;
        return next;
      }
      return prev;
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity going below 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleNameChange = (val) => {
    setCustomerName(val);
    if (validationErrors.name && val.trim()) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.name;
        return next;
      });
    }
  };

  const handleEmailChange = (val) => {
    setCustomerEmail(val);
  };

  // Order Placement with robust duplicate submission prevention
  const handlePlaceOrder = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // 1. Check duplicate submission guard
    if (isSubmitting || isLockedRef.current || orderConfirmation !== null) {
      return;
    }

    // 2. Validate Cart & Customer Name
    const errors = {};
    if (cartItems.length === 0) {
      errors.cart = 'Please add at least one product to your cart.';
    }

    if (!customerName || customerName.trim() === '') {
      errors.name = 'Customer name is required.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Cart items and customer input are strictly preserved
      return;
    }

    // 3. Acquire submission lock
    isLockedRef.current = true;
    setIsSubmitting(true);
    setValidationErrors({});

    try {
      // 4. Calculate total using strict integer arithmetic
      const orderTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // 5. Generate unique order reference (e.g., QC-20261121-001)
      const now = new Date();
      const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      const seqPart = String(orderCounterRef.current).padStart(3, '0');
      const orderRef = `QC-${datePart}-${seqPart}`;
      orderCounterRef.current += 1;

      // 6. Record order confirmation snapshot
      const confirmedOrder = {
        orderReference: orderRef,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        items: [...cartItems],
        totalAmount: orderTotal,
        timestamp: now.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setOrderConfirmation(confirmedOrder);
      // Do not clear customer info or cart until user starts a new order
    } finally {
      setIsSubmitting(false);
      isLockedRef.current = false;
    }
  };

  const handleResetOrder = () => {
    setOrderConfirmation(null);
    setCartItems([]);
    setCustomerName('');
    setCustomerEmail('');
    setValidationErrors({});
    isLockedRef.current = false;
    setIsSubmitting(false);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        cartCount={totalCartCount}
        onCartClick={() => {
          const el = document.getElementById('cart-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {orderConfirmation ? (
          <OrderConfirmation
            order={orderConfirmation}
            onResetOrder={handleResetOrder}
          />
        ) : (
          <div className="space-y-12">
            {/* Hero / Intro */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Online Store
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Mini Checkout
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Browse our premium products, manage your cart, and complete your order smoothly.
              </p>
            </div>

            {/* Product Section */}
            <ProductList
              products={products}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* Cart & Checkout Section */}
            <div
              id="cart-section"
              className="pt-8 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Cart & Summary */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <Cart
                    items={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveFromCart}
                  />
                </div>

                <OrderSummary cartItems={cartItems} />
              </div>

              {/* Right Column: Checkout Form */}
              <div className="lg:col-span-5">
                <CheckoutForm
                  customerName={customerName}
                  customerEmail={customerEmail}
                  onNameChange={handleNameChange}
                  onEmailChange={handleEmailChange}
                  onSubmit={handlePlaceOrder}
                  isSubmitting={isSubmitting}
                  errors={validationErrors}
                  cartEmpty={cartItems.length === 0}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} QuickCart Mini Checkout. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-xs">
            <span>Secure SSL 256-Bit Encryption</span>
            <span>•</span>
            <span>Instant Order Confirmation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
