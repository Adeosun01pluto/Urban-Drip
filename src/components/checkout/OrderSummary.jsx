import React from 'react';
import { useCart } from '../../contexts/CartContext'; // To get live cart data
import { IoCheckmarkCircleOutline } from 'react-icons/io5'; // For success icon

const OrderSummary = ({ shippingData, paymentData, cartItems, totalAmount, onPrev, onSubmit }) => {
  const { getTotalItems } = useCart(); // Use this to get total items for display

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Review Your Order</h2>

      {/* Shipping Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Shipping Information</h3>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Address:</span> {shippingData.address}, {shippingData.city}, {shippingData.state} {shippingData.zipCode}, {shippingData.country}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Phone:</span> {shippingData.phone}
        </p>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Payment Details</h3>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Method:</span> {paymentData.paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal'}
        </p>
        {paymentData.paymentMethod === 'credit_card' && (
          <>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Card Number:</span> **** **** **** {paymentData.cardNumber?.slice(-4)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Expires:</span> {paymentData.expiryDate}
            </p>
          </>
        )}
      </div>

      {/* Cart Items Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Items in Your Order ({getTotalItems()})</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div key={item.id + item.size + item.color} className="flex items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity} | ${item.price.toFixed(2)} each</p>
                {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
              </div>
              <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Total */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner text-right">
        <div className="text-lg text-gray-700 mb-2">
          <span>Subtotal:</span> <span className="font-semibold">${(totalAmount - 7.50).toFixed(2)}</span>
        </div>
        <div className="text-lg text-gray-700 mb-2">
          <span>Shipping:</span> <span className="font-semibold">$7.50</span>
        </div>
        <div className="text-3xl font-bold text-gray-900 border-t pt-4 mt-4">
          <span>Total:</span> <span className="ml-4">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-300"
        >
          Back to Payment
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg flex items-center"
        >
          <IoCheckmarkCircleOutline className="h-6 w-6 mr-2" />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;