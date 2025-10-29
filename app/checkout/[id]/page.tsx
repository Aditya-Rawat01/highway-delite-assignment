'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { checkoutAtom } from '@/atoms/checkoutState';
import Image from 'next/image';
import logo from '../../../assets/logo.png'
export default function Checkout({ params }: { params: Promise<{ id: string }> }) {
    const para  = React.use(params)
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const checkoutState = useAtomValue(checkoutAtom)
  // Booking details (these would come from context/state in a real app)
  const bookingDetails = {
    experience: checkoutState.experience,
    date:  checkoutState.date,
    time: checkoutState.time,
    quantity: checkoutState.qty,
    subtotal: checkoutState.total,
    taxes: checkoutState.taxes,
    total: checkoutState.qty + checkoutState.taxes
  };

  const handleApplyPromo = () => {
    // Promo code logic would go here
    console.log('Applying promo code:', promoCode);
  };

  const handlePayAndConfirm = () => {
    if (agreedToTerms && fullName && email) {
      // req to backend then push to frontend to show.  
      router.push('/confirmation');
    }

  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 md:px-20 py-4 flex items-center justify-between">
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <Image
            src={logo}
            alt='image'
            />
          </div>
          <span className="font-semibold text-sm leading-tight">highway<br/>delite</span>
        </div>
        <div className='flex gap-2'>

      <input
      placeholder='Search Experiences'
      className='p-2 w-80 bg-gray-100 rounded-md'
      />
      <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold text-sm transition-colors">
        Search
      </button>
      </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Back Button */}
        <Link href={`/experience/${para.id}`} className="flex items-center gap-2 text-gray-700 mb-4 hover:text-gray-900">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Checkout</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              {/* Full Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-yellow-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              {/* Promo Code Row */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)} // a req to check the validity.
                  className="flex-1 px-4 py-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-yellow-400"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-yellow-400"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              {/* Experience Details */}
              <div className="mb-4 pb-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="font-semibold">{bookingDetails.experience}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Date</span>
                  <span className="font-semibold">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Time</span>
                  <span className="font-semibold">{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Qty</span>
                  <span className="font-semibold">{bookingDetails.quantity}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-4 pb-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{bookingDetails.subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">₹{bookingDetails.taxes}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">₹{bookingDetails.total}</span>
              </div>

              {/* Pay and Confirm Button */}
              <button 
                onClick={handlePayAndConfirm}
                disabled={!agreedToTerms || !fullName || !email}
                className={`w-full font-semibold py-3 rounded transition-colors ${
                  agreedToTerms && fullName && email
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Pay and Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
