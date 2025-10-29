'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../../../assets/logo.png"
import { useAtom, useSetAtom } from 'jotai';
import { searchExperienceAtom } from '@/atoms/searchExperienceAtom';
import { checkoutAtom } from '@/atoms/checkoutState';

export default function ExperienceDetail({ params }: { params: Promise<{ id: string }> }) {
  useEffect(()=>{
    // get the page data from here.
    // set the experience name and the price to the checkout State
  },[])
  const [selectedDate, setSelectedDate] = useState('Oct 22');
  const [selectedTime, setSelectedTime] = useState('07:00 am');
  const [quantity, setQuantity] = useState(1);
  const setSearchExperience = useSetAtom(searchExperienceAtom)
  const dates = ['Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26'];
  const [checkoutState,setCheckoutState] = useAtom(checkoutAtom)
  const times = [
    { time: '07:00 am', status: 'left' },
    { time: '9:00 am', status: 'left' },
    { time: '11:00 am', status: 'left' },
    { time: '1:00 pm', status: 'sold out' }
  ];

  const basePrice = 999;
  const subtotal = basePrice * quantity;
  const taxes = 59;
  const total = subtotal + taxes;
  const para  = React.use(params)
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
      onChange={(e)=>setSearchExperience(e.target.value)}
      />
      <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold text-sm transition-colors">
        Search
      </button>
      </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-gray-700 mb-4 hover:text-gray-900">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Details</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="rounded-lg overflow-hidden mb-6 bg-green-400">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop"
                alt="Kayaking"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Title and Description */}
            <h1 className="text-3xl font-bold mb-3">Kayaking</h1>
            <p className="text-gray-600 mb-6">
              Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.
            </p>

            {/* Choose Date */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Choose date</h2>
              <div className="flex gap-3">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setCheckoutState((prev:typeof checkoutState)=>{
                        return {
                          ...prev,
                          date
                        }
                      })
                    }}
                    className={`px-4 py-2 rounded border transition-colors ${
                      selectedDate === date
                        ? 'bg-yellow-400 border-yellow-400 font-semibold'
                        : 'bg-white border-gray-300 hover:border-yellow-400'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Time */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Choose time</h2>
              <div className="flex gap-3">
                {times.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => {
                      if (slot.status !== 'sold out') {
                        setSelectedTime(slot.time);
                        setCheckoutState((prev:typeof checkoutState)=>{
                        return {
                          ...prev,
                          time:slot.time
                        }
                      })
                      
                      }}}
                    disabled={slot.status === 'sold out'}
                    className={`px-4 py-2 rounded border transition-colors ${
                      selectedTime === slot.time && slot.status !== 'sold out'
                        ? 'bg-yellow-400 border-yellow-400 font-semibold'
                        : slot.status === 'sold out'
                        ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white border-gray-300 hover:border-yellow-400'
                    }`}
                  >
                    <div className="text-sm">{slot.time}</div>
                    <div className="text-xs text-gray-500">{slot.status}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
            </div>

            {/* About */}
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-sm text-gray-600">
                Scenic routes, trained guides, and safety briefing. Minimum age 10
              </p>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-green-500 rounded-lg p-6 sticky top-6">
              {/* Price */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <span className="text-gray-600">Starts at</span>
                <span className="text-2xl font-bold">₹{basePrice}</span>
              </div>

              {/* Quantity */}
              <div className="mb-4 pb-4 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setQuantity(Math.max(1, quantity - 1))
                        setCheckoutState((prev:typeof checkoutState)=>{
                        return {
                          ...prev,
                          qty:quantity-1
                        }
                      })
                      }}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      onClick={() => {
                        // if the qty is lesser than equal to available seats.
                        setQuantity(quantity + 1)
                        setCheckoutState((prev:typeof checkoutState)=>{
                        return {
                          ...prev,
                          qty:quantity+1
                        }
                      })
                      }}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>

              {/* Taxes */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <span className="text-gray-600">Taxes</span>
                <span className="font-semibold">₹{taxes}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-green-600">₹{total}</span>
              </div>

              {/* Confirm Button */}
              <Link href={`/checkout/${para.id}`}>
                <button onClick={()=>{
                        setCheckoutState((prev:typeof checkoutState)=>{
                        return {
                          ...prev,
                          total,
                          taxes
                        }
                      })
                      }}
                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors cursor-pointer">
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
