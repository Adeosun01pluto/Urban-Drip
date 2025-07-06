import React, { useState, useEffect } from 'react';

const ShippingForm = ({ onNext, initialData, cartTotal }) => {
  const [address, setAddress] = useState(initialData.address || '');
  const [city, setCity] = useState(initialData.city || '');
  const [state, setState] = useState(initialData.state || '');
  const [zipCode, setZipCode] = useState(initialData.zipCode || '');
  const [country, setCountry] = useState(initialData.country || 'USA');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Optionally pre-fill if user is logged in and has a saved address
    // This is just a placeholder to show initialData usage
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!address) newErrors.address = 'Street Address is required.';
    if (!city) newErrors.city = 'City is required.';
    if (!state) newErrors.state = 'State/Province is required.';
    if (!zipCode) newErrors.zipCode = 'Zip Code is required.';
    if (!country) newErrors.country = 'Country is required.';
    if (!phone) newErrors.phone = 'Phone number is required.';
    else if (!/^\+?[0-9]{7,15}$/.test(phone)) newErrors.phone = 'Invalid phone number format.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({}); // Clear errors on successful validation
      onNext({ address, city, state, zipCode, country, phone });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Information</h2>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
          placeholder="123 Main St"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="New York"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="NY"
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="10001"
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="USA">United States</option>
            <option value="CAN">Canada</option>
            <option value="UK">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;