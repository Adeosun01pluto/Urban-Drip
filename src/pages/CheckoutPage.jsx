import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShippingForm from '../components/checkout/ShippingForm'; // Will create this
import PaymentForm from '../components/checkout/PaymentForm';   // Will create this
import OrderSummary from '../components/checkout/OrderSummary'; // Will create this
import { useCart } from '../contexts/CartContext'; // To clear cart after checkout
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {},
    payment: {},
  });
  const { getCartTotal, cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = getCartTotal() + 7.50; // Total including dummy shipping

  const handleNextStep = (data) => {
    setFormData((prev) => ({
      ...prev,
      [Object.keys(data)[0]]: { ...prev[Object.keys(data)[0]], ...data[Object.keys(data)[0]] },
    }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitOrder = () => {
    // In a real application, you would send formData and cartItems to your backend here
    // for processing payment and creating the order.
    console.log('Submitting Order:', { formData, cartItems, totalAmount });

    // Simulate API call success
    setTimeout(() => {
      clearCart(); // Clear cart after successful order
      navigate('/order-confirmation'); // Redirect to confirmation page
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm
            initialData={formData.shipping}
            onNext={(data) => handleNextStep({ shipping: data })}
            cartTotal={totalAmount} // Pass total for display in summary
          />
        );
      case 2:
        return (
          <PaymentForm
            initialData={formData.payment}
            onNext={(data) => handleNextStep({ payment: data })}
            onPrev={handlePrevStep}
            cartTotal={totalAmount} // Pass total for display
          />
        );
      case 3:
        return (
          <OrderSummary
            shippingData={formData.shipping}
            paymentData={formData.payment}
            cartItems={cartItems}
            totalAmount={totalAmount}
            onPrev={handlePrevStep}
            onSubmit={handleSubmitOrder}
          />
        );
      default:
        return <p>Something went wrong with the checkout steps.</p>;
    }
  };

  const stepTitles = [
    'Shipping Information',
    'Payment Details',
    'Review & Place Order',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Checkout <span className="text-gray-600">Securely</span>
        </h1>

        {/* Step Indicator */}
        <div className="flex justify-center mb-10">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold
                  ${currentStep >= index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'}
                `}
              >
                {index + 1}
              </div>
              <span
                className={`
                  ml-3 mr-6 text-lg hidden sm:block
                  ${currentStep >= index + 1 ? 'font-semibold text-gray-900' : 'text-gray-600'}
                `}
              >
                {title}
              </span>
              {index < stepTitles.length - 1 && (
                <div
                  className={`
                    w-20 h-1 bg-gray-200 mx-3 hidden sm:block
                    ${currentStep > index + 1 ? 'bg-gray-900' : ''}
                  `}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {renderStep()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;