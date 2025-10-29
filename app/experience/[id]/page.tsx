"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import { useAtom, useSetAtom } from "jotai";
import { searchExperienceAtom } from "@/atoms/searchExperienceAtom";
import { checkoutAtom } from "@/atoms/checkoutState";
import axios from "axios";
import { backendURI } from "@/URI";
import { toast } from "sonner";
import { experienceType } from "@/app/page";

export default function ExperienceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const para = React.use(params);
  const [ExperienceDetail, setExperienceDetail] = useState<experienceType>({
    id: "",
    destination: "",
    location: "",
    description: "",
    price: 899,
    image: "",
    slot: [],
  });
  const [selectedDate, setSelectedDate] = useState("Wed Oct 22 2025");
  const [selectedTime, setSelectedTime] = useState("07:00");
  useEffect(() => {
    // get the page data from here.
    // set the experience name and the price to the checkout State

    async function getExpById() {
      const id = (await params).id;
      try {
        const res = await axios.get(`${backendURI}/experiences/${id}`, {});
        setExperienceDetail(res.data.exp);

        toast("Experience fetched successfully");
      } catch (error) {
        toast("Error while fetching experience.");
      }
      setCheckoutState((prev: typeof checkoutState) => {
        return {
          ...prev,
          time: "07:00:00",
          date: "Wed Oct 22 2025",
        };
      });
    }
    getExpById();
  }, []);
  const [quantity, setQuantity] = useState(1);
  const setSearchExperience = useSetAtom(searchExperienceAtom);
  const groupedByDate = ExperienceDetail.slot.reduce(
    (acc: any, currentItem: any) => {
      const timestamp = Object.keys(currentItem)[0];
      const [datePart, timePartWithZ] = timestamp.split("T");
      const timePart = timePartWithZ.split(".")[0];

      // Calculate booked slots (assuming capacity - available_slots)
      const available_slots = currentItem[timestamp].available_slots;
      const capacity = currentItem[timestamp].capacity;
      const booked_slots = capacity - available_slots;

      // Initialize the accumulator for a new date if necessary
      if (!acc[datePart]) {
        acc[datePart] = {
          times: [],
          slots: [],
        };
      }

      // Add the time and slot details to the correct date group
      acc[datePart].times.push(timePart);
      acc[datePart].slots.push({
        capacity: capacity,
        available_slots: available_slots,
        booked_slots: booked_slots, // Added booked_slots for clarity
      });

      return acc;
    },
    {}
  );
  const dates = Object.keys(groupedByDate);
  const timesByDate = dates.map((date) => groupedByDate[date].times);
  const slotsByDate = dates.map((date) => groupedByDate[date].slots);
  const [selectedIncrement, setSelectedIncrement] = useState(0);
  const [checkoutState, setCheckoutState] = useAtom(checkoutAtom);

  const basePrice = 999;
  const subtotal = basePrice * quantity;
  const taxes = 59;
  const total = subtotal + taxes;

  if (ExperienceDetail.destination == "") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-2xl">
        Fetching Experience, Please wait...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 md:px-20 py-4 flex items-center justify-between">
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <Image src={logo} alt="image" />
          </div>
          <span className="font-semibold text-sm leading-tight">
            highway
            <br />
            delite
          </span>
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Search Experiences"
            className="p-2 w-80 bg-gray-100 rounded-md"
            onChange={(e) => setSearchExperience(e.target.value)}
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold text-sm transition-colors">
            Search
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 mb-4 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Details</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={ExperienceDetail.image}
                alt="Kayaking"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Title and Description */}
            <h1 className="text-3xl font-bold mb-3">
              {ExperienceDetail.destination}
            </h1>
            <p className="text-gray-600 mb-6">{ExperienceDetail.description}</p>

            {/* Choose Date */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Choose date</h2>
              <div className="flex gap-3">
                {dates.map((date: any, index: any) => {
                  const dateVal = new Date(date);
                  return (
                    <button
                      key={dateVal.toISOString()}
                      onClick={() => {
                        setSelectedDate(dateVal.toDateString());
                        setSelectedIncrement(index);
                        setCheckoutState((prev: typeof checkoutState) => {
                          return {
                            ...prev,
                            date: dateVal.toDateString(),
                          };
                        });
                      }}
                      className={`px-4 py-2 rounded border transition-colors ${
                        selectedDate === dateVal.toDateString()
                          ? "bg-yellow-400 border-yellow-400 font-semibold"
                          : "bg-white border-gray-300 hover:border-yellow-400"
                      }`}
                    >
                      {dateVal.toDateString()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choose Time */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Choose time</h2>
              <div className="flex gap-3">
                {timesByDate[selectedIncrement].map(
                  (time: string, index: number) => {
                    const slots = slotsByDate[selectedIncrement]; // this is still an array of objects.
                    const slot = slots[index];
                    return (
                      <button
                        key={time}
                        onClick={() => {
                          if (slot.capacity != slot.booked_slots) {
                            setSelectedTime(time.slice(0, 5));
                            setCheckoutState((prev: typeof checkoutState) => {
                              return {
                                ...prev,
                                time: time,
                              };
                            });
                          }
                        }}
                        disabled={slot.capacity == slot.booked_slots}
                        className={`px-4 py-2 rounded border transition-colors ${
                          selectedTime === time.slice(0, 5) &&
                          slot.status !== "sold out"
                            ? "bg-yellow-400 border-yellow-400 font-semibold"
                            : slot.capacity == slot.booked_slots
                            ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-white border-gray-300 hover:border-yellow-400"
                        }`}
                      >
                        <div className="text-sm">{time.slice(0, 5)}</div>
                        <div className={`text-xs ${slot.available_slots>4?"text-gray-500":"text-red-500"} `}>{`${slot.available_slots} left`}</div>
                      </button>
                    );
                  }
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {/* About */}
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-sm text-gray-600">
                Scenic routes, trained guides, and safety briefing. Minimum age
                10
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
                        setQuantity(Math.max(1, quantity - 1));
                        setCheckoutState((prev: typeof checkoutState) => {
                          return {
                            ...prev,
                            qty: quantity - 1,
                          };
                        });
                      }}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      onClick={() => {
                        // if the qty is lesser than equal to available seats.
                        setQuantity(quantity + 1);
                        setCheckoutState((prev: typeof checkoutState) => {
                          return {
                            ...prev,
                            qty: quantity + 1,
                          };
                        });
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
                <span className="text-2xl font-bold text-green-600">
                  ₹{total}
                </span>
              </div>

              {/* Confirm Button */}
              <Link href={`/checkout/${para.id}`}>
                <button
                  onClick={() => {
                    setCheckoutState((prev: typeof checkoutState) => {
                      return {
                        ...prev,
                        total,
                        taxes: taxes,
                        experience:ExperienceDetail.destination
                      };
                    });
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors cursor-pointer"
                >
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
