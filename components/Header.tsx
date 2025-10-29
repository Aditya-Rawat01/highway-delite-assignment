'use client'
import Image from 'next/image';
import React from 'react';
import logo from "../assets/logo.png"
import { useSetAtom } from 'jotai';
import { searchExperienceAtom } from '@/atoms/searchExperienceAtom';
export default function Header() {
  const setSearchExperience = useSetAtom(searchExperienceAtom)
  return (
    <header className="bg-white border-b-4 border-purple-500 px-6 md:px-20 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <Image
            src={logo}
            alt='image'
            />
          </div>
          <span className="font-semibold text-sm leading-tight">highway<br/>delite</span>
        </div>
      </div>

      {/* Center Navigation */}
      <div className="flex items-center gap-8">
        
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            
        
          </div>
        </div>
        
      </div>
      <div className='flex gap-2'>

      <input
      placeholder='Search Experiences'
      className='p-2 w-40 sm:w-80 bg-gray-100 rounded-md'
      onChange={(e)=>setSearchExperience(e.target.value)}
      />
      <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold text-sm transition-colors hidden sm:block">
        Search
      </button>
      </div>
    </header>
  );
}
