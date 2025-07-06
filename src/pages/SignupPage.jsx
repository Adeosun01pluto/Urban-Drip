// src/pages/SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { checkEmailAvailability } from '../api/authApi';
import { MdOutlineEmail, MdLockOutline, MdOutlinePersonOutline, MdOutlineImage } from 'react-icons/md';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(''); // Optional avatar URL
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [emailChecking, setEmailChecking] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home or dashboard
    }
  }, [isAuthenticated, navigate]);

  // Debounce function for email availability check
  useEffect(() => {
    if (email.trim() === '') {
      setEmailAvailable(true); // Treat empty email as available
      return;
    }

    setEmailChecking(true);
    const handler = setTimeout(async () => {
      try {
        const available = await checkEmailAvailability(email);
        setEmailAvailable(true);
        // setEmailAvailable(available);
      } catch (err) {
        console.error("Error during email availability check:", err);
        setEmailAvailable(false); // Assume not available on error
      } finally {
        setEmailChecking(false);
      }
    }, 500); // Debounce for 500ms

    return () => {
      clearTimeout(handler); // Cleanup on unmount or email change
    };
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!emailAvailable) {
      setError("This email is already in use or unavailable.");
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password, avatar: avatar || 'https://i.imgur.com/LDOO4Qs.jpg' }); // Default avatar if none provided
      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900">log in to an existing account</Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Name */}
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MdOutlinePersonOutline className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* Email */}
              <div className="mt-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MdOutlineEmail className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-none relative block w-full px-10 py-3 border ${
                      emailChecking ? 'border-yellow-500' : emailAvailable ? 'border-gray-300' : 'border-red-500'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {emailChecking && <p className="text-xs text-yellow-600 mt-1 ml-2">Checking availability...</p>}
                {email.trim() !== '' && !emailChecking && !emailAvailable && (
                  <p className="text-xs text-red-600 mt-1 ml-2">This email is already registered.</p>
                )}
                {email.trim() !== '' && !emailChecking && emailAvailable && (
                  <p className="text-xs text-green-600 mt-1 ml-2">Email available!</p>
                )}
              </div>
              {/* Password */}
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MdLockOutline className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Confirm Password */}
              <div className="mt-4">
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MdLockOutline className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {password !== confirmPassword && confirmPassword !== '' && (
                  <p className="text-xs text-red-600 mt-1 ml-2">Passwords do not match.</p>
                )}
              </div>
              {/* Avatar URL (Optional) */}
              <div className="mt-4">
                <label htmlFor="avatar" className="sr-only">Avatar URL</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MdOutlineImage className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    autoComplete="photo"
                    className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    placeholder="Avatar URL (Optional)"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-2">e.g., https://picsum.photos/200</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
                disabled={loading || !emailAvailable || password !== confirmPassword}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Registering...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;