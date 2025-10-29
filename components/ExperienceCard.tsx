import React from 'react';
import Link from 'next/link';

interface ExperienceCardProps {
  title: string;
  location: string;
  price: number;
  description:string;
  image: string;
  highlighted?: boolean;
  id: string;
}

export default function ExperienceCard({ 
  title, 
  location, 
  description,
  price, 
  image,
  id
}: ExperienceCardProps) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow relative cursor-pointer`}>
      
      {/* Image */}
      <div className="relative h-48 bg-linear-to-br from-gray-300 to-gray-400 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Header with location badge */}
        <div className={`flex justify-between items-start mb-2`}>
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 whitespace-nowrap ml-2">
            {location}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-xs text-gray-600 mb-3">
          {description}
        </p>
        
        {/* Price and CTA */}
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">From</span>
            <span className="text-lg font-bold">₹{price}</span>
          </div>
          <Link href={`/experience/${id}`}>
            <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1.5 rounded text-sm font-semibold transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
