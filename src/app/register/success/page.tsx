"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {
  return (
    <div className='bg-[#FFFFFF] font-[Fustat] min-h-screen'>
      {/* Navbar */}
      <div className='nav bg-white'>
        <div className='mx-10 flex items-center justify-between py-10 md:px-0'>
          <div className='flex items-center space-x-6'>
            <Link
              href='/'
              className='text-4xl font-semibold'>
              INTERNPLUS
            </Link>

            {/* Language dropdown */}
            <div className='relative'>
              {/* We'll use a small React state for the dropdown */}
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full flex flex-col items-center justify-center mt-20 space-y-6'>
        <div className='w-[90%] success-card flex flex-col items-center p-10 rounded-lg bg-[#F3F5FC]'>
          <div className='img'>
            <Image
              src='/register/handshake-icon.png'
              alt='Success'
              width={150}
              height={150}
            />
          </div>
          <div className='font-bold'>REGISTRATION SUCCESSFUL</div>
          <div className='text mt-5'>Welcome to InternPlus</div>
          <div className='text mb-5'>
            We have successfully received your registration.
          </div>
          <div className='login-button border rounded py-2 px-5 text-white bg-[#474BC2] hover:bg-[#F3F5FC] hover:text-[#474BC2] transition'>
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

function LanguageDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center space-x-1 text-xl font-medium'>
        <span className='opacity-70'>EN</span>
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>
      {open && (
        <ul className='absolute z-10 mt-1 bg-white border border-gray-200 rounded shadow w-28 text-xl text-gray-700'>
          <li>
            <Link
              href='#'
              className='block px-3 py-2 hover:bg-gray-100'>
              English
            </Link>
          </li>
          <li>
            <Link
              href='#'
              className='block px-3 py-2 hover:bg-gray-100'>
              ภาษาไทย
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
