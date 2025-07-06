import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { MdCheckCircleOutline } from 'react-icons/md';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Simulate form submission
      console.log('Form Submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      setTimeout(() => setIsSubmitted(false), 5000); // Hide message after 5 seconds
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Contact <span className="text-gray-600">Us</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed">
              We'd love to hear from you! Whether you have a question about our products,
              an inquiry about an order, or just want to give feedback, feel free to reach out.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <IoMailOutline className="h-7 w-7 text-gray-700" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <a href="mailto:support@urbandrip.com" className="text-blue-600 hover:underline">support@urbandrip.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <IoCallOutline className="h-7 w-7 text-gray-700" />
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <a href="tel:+2348012345678" className="text-blue-600 hover:underline">+234 801 234 5678</a>
                  <p className="text-sm text-gray-500">(Mon-Fri, 9am-5pm WAT)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <IoLocationOutline className="h-7 w-7 text-gray-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Our Office</h3>
                  <p className="text-gray-700">
                    UrbanDrip HQ,
                    <br />123 Streetwear Avenue,
                    <br />Lagos, Nigeria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Order Inquiry, Feedback, etc."
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Type your message here..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                {isSubmitted ? (
                  <>
                    <MdCheckCircleOutline className="h-6 w-6 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;