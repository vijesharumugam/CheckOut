import React from 'react';
import { User, Mail, Phone, MapPin, AlertCircle, Lock, Loader2 } from 'lucide-react';

export default function CheckoutForm({
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onAddressChange,
  onSubmit,
  isSubmitting,
  errors,
  cartEmpty
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5"
    >
      <div className="pb-3 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Customer Details</h2>
        <p className="text-xs text-gray-500">
          Please enter your information to complete your order
        </p>
      </div>

      {/* Cart Validation Alert if user tries to checkout with empty cart */}
      {errors?.cart && (
        <div
          role="alert"
          data-testid="cart-error"
          className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start space-x-2.5"
        >
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900">Empty Cart</p>
            <p className="text-xs text-amber-700">{errors.cart}</p>
          </div>
        </div>
      )}

      {/* Customer Name (Mandatory *) */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-name"
          className="block text-sm font-semibold text-gray-700"
        >
          Customer Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <User className="w-4 h-4" />
          </div>
          <input
            id="customer-name"
            name="customerName"
            type="text"
            placeholder="e.g. Vijesh"
            value={customerName}
            onChange={(e) => onNameChange(e.target.value)}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors?.name ? 'true' : 'false'}
            aria-describedby={errors?.name ? 'customer-name-error' : undefined}
            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-colors outline-none focus:ring-2 ${
              errors?.name
                ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-rose-200'
                : 'border-gray-300 text-gray-900 focus:border-sky-500 focus:ring-sky-100'
            }`}
          />
        </div>
        {errors?.name && (
          <p
            id="customer-name-error"
            role="alert"
            data-testid="customer-name-error"
            className="text-xs font-medium text-rose-600 flex items-center space-x-1 mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Phone Number (Mandatory *) */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-phone"
          className="block text-sm font-semibold text-gray-700"
        >
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Phone className="w-4 h-4" />
          </div>
          <input
            id="customer-phone"
            name="customerPhone"
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={customerPhone}
            onChange={(e) => onPhoneChange(e.target.value)}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors?.phone ? 'true' : 'false'}
            aria-describedby={errors?.phone ? 'customer-phone-error' : undefined}
            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-colors outline-none focus:ring-2 ${
              errors?.phone
                ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-rose-200'
                : 'border-gray-300 text-gray-900 focus:border-sky-500 focus:ring-sky-100'
            }`}
          />
        </div>
        {errors?.phone && (
          <p
            id="customer-phone-error"
            role="alert"
            data-testid="customer-phone-error"
            className="text-xs font-medium text-rose-600 flex items-center space-x-1 mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.phone}</span>
          </p>
        )}
      </div>

      {/* Address (Mandatory *) */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-address"
          className="block text-sm font-semibold text-gray-700"
        >
          Address <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
            <MapPin className="w-4 h-4" />
          </div>
          <textarea
            id="customer-address"
            name="customerAddress"
            rows={2}
            placeholder="e.g. Flat 302, Green Valley Apartments, MG Road, Bengaluru, 560001"
            value={customerAddress}
            onChange={(e) => onAddressChange(e.target.value)}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors?.address ? 'true' : 'false'}
            aria-describedby={errors?.address ? 'customer-address-error' : undefined}
            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-colors outline-none focus:ring-2 resize-none ${
              errors?.address
                ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-rose-200'
                : 'border-gray-300 text-gray-900 focus:border-sky-500 focus:ring-sky-100'
            }`}
          />
        </div>
        {errors?.address && (
          <p
            id="customer-address-error"
            role="alert"
            data-testid="customer-address-error"
            className="text-xs font-medium text-rose-600 flex items-center space-x-1 mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.address}</span>
          </p>
        )}
      </div>

      {/* Email Address (Optional) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="customer-email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email Address
          </label>
          <span className="text-xs text-gray-400">Optional</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="customer-email"
            name="customerEmail"
            type="email"
            placeholder="e.g. vijesh@example.com"
            value={customerEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={isSubmitting}
            aria-required="false"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 text-gray-900 transition-colors outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
        <p className="text-xs text-gray-400">
          We'll send your receipt and tracking info here if provided.
        </p>
      </div>

      {/* Place Order Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Place Order"
          data-testid="place-order-button"
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-150 shadow-sm shadow-sky-200 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Order...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
