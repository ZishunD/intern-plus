"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageDropdown from "@/components/LanguageDropdown";

export default function ForgetPassPage() {
  const [email, setEmail] = useState("");

  return (
    <div className='bg-[#FFFFFF] font-[Fustat]'>
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
      <div className='w-full flex flex-col items-center justify-center mt-20'>
        <div className='w-[90%] flex flex-col items-center p-10 rounded-lg bg-[#F3F5FC] space-y-4'>
          {/* Title */}
          <h2 className='text-2xl font-bold text-center uppercase'>
            Forgot Password?
          </h2>
          <p className='text-sm text-gray-600 text-center'>
            Enter your email to receive a 5-digit reset code.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle sending the 5-digit code here
            }}
            className='w-full flex flex-col justify-center items-center space-y-4'>
            {/* Email Input */}
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-2 border rounded-lg mb-40 focus:ring focus:ring-blue-200'
            />

            {/* Submit Button */}
            <button
              type='submit'
              className='px-5 py-2 rounded text-white bg-[#474BC2] hover:bg-[#F3F5FC] hover:text-[#474BC2] border transition'>
              Send 5-digit code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
