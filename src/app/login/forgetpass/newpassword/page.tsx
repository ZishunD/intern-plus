/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageDropdown from "@/components/LanguageDropdown";

interface NewPasswordProps {
  email: string;
}

export default function NewPasswordPage({ email }: NewPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Password reset successful for ${email}`);
    // TODO: Call GraphQL mutation to update password
  };

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
          <h2 className='text-2xl font-bold text-center uppercase'>
            New Password
          </h2>
          <p className='text-sm text-gray-600 text-center'>
            Enter your new password{email && ` for ${email}`}
          </p>

          <form
            onSubmit={handleSubmit}
            className='w-full flex flex-col space-y-4'>
            <InputWithShow
              label='Password'
              name='password'
              show={showPassword}
              setShow={setShowPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputWithShow
              label='Confirm Password'
              name='confirmPassword'
              show={showConfirm}
              setShow={setShowConfirm}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type='submit'
              className='w-full py-2 rounded text-white bg-[#474BC2] hover:bg-[#F3F5FC] hover:text-[#474BC2] border transition'>
              Set new Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function InputWithShow({ label, name, show, setShow }: any) {
  return (
    <div className='relative space-y-3'>
      <label htmlFor={name}>{label}</label>
      <input
        type={show ? "text" : "password"}
        id={name}
        name={name}
        className='bg-white w-full pl-3 pr-10 py-2 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      <button
        type='button'
        onClick={() => setShow(!show)}
        className='absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-500'>
        {/* Keep your original SVGs */}
        {show ? (
          <>
            <svg
              x-show='show'
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
              <line
                x1='3'
                y1='3'
                x2='21'
                y2='21'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </>
        ) : (
          <>
            <svg
              x-show='!show'
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
