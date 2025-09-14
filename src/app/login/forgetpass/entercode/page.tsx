"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import LanguageDropdown from "@/components/LanguageDropdown";

interface EnterCodeProps {
  email: string;
  onVerified?: () => void; // callback after successful verification
}

export default function EnterCode({ email, onVerified }: EnterCodeProps) {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [resendAvailable, setResendAvailable] = useState(true);
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 4) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join("");
    alert(`Verifying code for ${email}: ${enteredCode}`);
    // TODO: GraphQL mutation to verify code
    if (onVerified) onVerified(); // move to new password page
  };

  const handleResend = () => {
    setResendAvailable(false);
    setTimer(30); // 30s cooldown
    alert(`Resent code to ${email}`);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setResendAvailable(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
            <LanguageDropdown />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='w-full flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <div className='w-[90%] max-w-md flex flex-col items-center p-10 rounded-lg bg-[#F3F5FC] space-y-6'>
          <h2 className='text-2xl font-bold text-center uppercase'>
            Enter Code
          </h2>
          <p className='text-sm text-gray-600 text-center'>
            We sent a code to <span className='font-semibold'>{email}</span>
          </p>

          <form
            onSubmit={handleSubmit}
            className='w-full flex flex-col space-y-6'>
            {/* OTP Inputs */}
            <div className='flex justify-between space-x-2'>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type='text'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className='w-12 h-12 text-center text-lg border rounded-lg focus:ring focus:ring-blue-200'
                />
              ))}
            </div>

            {/* Resend Section */}
            <p className='text-sm text-gray-600 text-center'>
              Didn’t receive the code? <br />
              {resendAvailable ? (
                <button
                  onClick={handleResend}
                  type='button'
                  className='text-[#474BC2] font-semibold hover:underline'>
                  Resend
                </button>
              ) : (
                <span className='text-gray-400'>Resend in {timer}s</span>
              )}
            </p>

            <button
              type='submit'
              className='w-full py-2 rounded text-white bg-[#474BC2] hover:bg-[#F3F5FC] hover:text-[#474BC2] border transition'>
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
