import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png'

export default function Confirmation() {
  // Generate a random reference ID (in a real app, this would come from the backend)
  const refId = 'HUF56&SO';

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
      className='p-2 w-40 sm:w-80 bg-gray-100 rounded-md'
      />
      <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold text-sm transition-colors hidden sm:block">
        Search
      </button>
      </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Booking Confirmed */}
          <h1 className="text-3xl font-bold mb-3">Booking Confirmed</h1>
          
          {/* Reference ID */}
          <p className="text-gray-600 mb-8">Ref ID: {refId}</p>

          {/* Back to Home Button */}
          <Link href="/">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-8 py-3 rounded transition-colors">
              Back to Home
            </button>
          </Link>

         
        </div>
      </div>
    </div>
  );
}
