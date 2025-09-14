"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageDropdown from "@/components/LanguageDropdown";

export default function ResetSuccessfulPage() {
  return (
    <>
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

      <div className='w-full flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <div className='w-[90%] max-w-md flex flex-col items-center p-10 rounded-lg bg-[#F3F5FC] space-y-6'>
          {/* Title */}
          <div className='text-2xl font-bold text-center'>
            Password Reset Successful
          </div>

          {/* Message */}
          <div className='text-center text-gray-700'>
            Your password has been reset. <br />
            You can sign in to use InternPlus now.
          </div>

          {/* Image */}
          <div className='img'>
            <Image
              src='/login/passports-icon.png' // replace with your success image
              alt='Success'
              width={150}
              height={150}
            />
          </div>

          {/* Login Button */}
          <Link
            href='/login' // adjust your login route
            className='login-button border rounded py-2 px-5 text-white bg-[#474BC2] hover:bg-[#F3F5FC] hover:text-[#474BC2] transition'>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
