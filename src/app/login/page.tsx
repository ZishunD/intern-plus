/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";

interface NewPasswordProps {
  email: string; // pass email as prop
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
    console.log("New password for", email, "is", password);
    alert("Password reset successful!");
    // TODO: Call GraphQL mutation to update password
  };

  return (
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
          {/* Password */}
          <InputWithShow
            label='Password'
            name='password'
            show={showPassword}
            setShow={setShowPassword}
            iconSrc='/register/lock.png'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <InputWithShow
            label='Confirm Password'
            name='confirmPassword'
            show={showConfirm}
            setShow={setShowConfirm}
            iconSrc='/register/lock.png'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full py-2 rounded text-white bg-[#474BC2] hover:bg-[#F3F5FC] hover:text-[#474BC2] border transition'>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

function InputWithIcon({ label, name, type = "text", iconSrc, required }: any) {
  return (
    <div className='relative space-y-3'>
      <label htmlFor={name}>{label}</label>
      <span className='absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400'>
        <Image
          src={iconSrc}
          alt={label}
          width={20}
          height={20}
        />
      </span>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className='w-full pl-10 pr-3 py-2 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
    </div>
  );
}

function InputWithShow({ label, name, show, setShow, iconSrc }: any) {
  return (
    <div className='relative space-y-3'>
      <label htmlFor={name}>{label}</label>
      <span className='absolute left-3 top-[55%] transform -translate-y-1/2 text-gray-400'>
        <Image
          src={iconSrc}
          alt={label}
          width={20}
          height={20}
        />
      </span>
      <input
        type={show ? "text" : "password"}
        id={name}
        name={name}
        className='w-full pl-10 pr-10 py-2 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
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
