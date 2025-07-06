import React, { useState, useEffect } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'; // For card icons

const PaymentForm = ({ onNext, onPrev, initialData, cartTotal }) => {
  const [cardNumber, setCardNumber] = useState(initialData.cardNumber || '');
  const [cardName, setCardName] = useState(initialData.cardName || '');
  const [expiryDate, setExpiryDate] = useState(initialData.expiryDate || '');
  const [cvv, setCvv] = useState(initialData.cvv || '');
  const [paymentMethod, setPaymentMethod] = useState(initialData.paymentMethod || 'credit_card');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Optionally pre-fill if user has saved payment methods
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (paymentMethod === 'credit_card') {
      if (!cardNumber) newErrors.cardNumber = 'Card number is required.';
      else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits.';
      if (!cardName) newErrors.cardName = 'Name on card is required.';
      if (!expiryDate) newErrors.expiryDate = 'Expiry date is required.';
      else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) newErrors.expiryDate = 'Invalid expiry date format (MM/YY).';
      else {
          const [month, year] = expiryDate.split('/').map(Number);
          const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
          const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed

          if (year < currentYear || (year === currentYear && month < currentMonth)) {
              newErrors.expiryDate = 'Card has expired.';
          }
      }
      if (!cvv) newErrors.cvv = 'CVV is required.';
      else if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits.';
    }
    // Add validation for other payment methods if needed
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onNext({ paymentMethod, cardNumber, cardName, expiryDate, cvv });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Details</h2>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose Payment Method:</h3>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio h-5 w-5 text-gray-900"
            />
            <span className="text-gray-700 font-medium">Credit Card</span>
            <span className="flex space-x-2 ml-2">
              <FaCcVisa className="text-blue-700 text-3xl" />
              <FaCcMastercard className="text-red-700 text-3xl" />
              <FaCcAmex className="text-blue-500 text-3xl" />
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio h-5 w-5 text-gray-900"
            />
            <span className="text-gray-700 font-medium">PayPal (Simplified)</span>
          </label>
          {/* Add more payment options */}
        </div>
      </div>

      {paymentMethod === 'credit_card' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} // Allow only digits, max 16
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength="16"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              placeholder="John Doe"
            />
            {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                    if (value.length > 2) {
                      value = value.substring(0, 2) + '/' + value.substring(2, 4);
                    }
                    setExpiryDate(value.slice(0, 5)); // Limit to MM/YY format
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} // Allow only digits, max 4
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                placeholder="123"
                maxLength="4"
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md">
          <p className="font-semibold mb-2">Proceeding with PayPal (Simplified)</p>
          <p className="text-sm">
            In a real application, you would be redirected to PayPal's website to complete the payment.
            For this template, we'll simulate the "payment" on the next step.
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Review Order (${cartTotal.toFixed(2)})
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;