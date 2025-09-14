/* eslint-disable @typescript-eslint/no-explicit-any */
// app/register/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { loginIntern } from "../lib/graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageDropdown from "../../components/LanguageDropdown";
import SocialButton from "../../components/SocialButton";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = (formData.get("remember") as string) === "on";
    try {
      const res = await loginIntern(email, password);
      const token = res.loginIntern;
      if (remember) {
        localStorage.setItem("token", token); // 长期存储
      } else {
        sessionStorage.setItem("token", token); // 会话存储
      }
      router.push("/dashboard"); // 登录成功跳转
    } catch (err: any) {
      setError("Login failed");
    }
  };

  return (
    <div className='bg-[#D1D1F0] font-[Fustat] min-h-screen'>
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

      {/* Left image, right form */}
      <div className='bg-[#F3F5FC] flex flex-col md:flex-row rounded-sm'>
        {/* Left image */}
        <div className='md:w-1/2 flex items-center justify-center p-4'>
          <Image
            src='/login/passports-icon.png'
            alt='passprots'
            width={400}
            height={600}
            className='max-w-xl hidden md:block'
          />
        </div>

        {/* Right form */}
        <div className='md:w-1/2 flex items-center justify-center p-6'>
          <div className='w-full max-w-md p-6'>
            <h2 className='text-4xl font-extrabold uppercase mb-6'>Register</h2>
            {error && <p className='text-red-500 mt-2'>{error}</p>}
            <form
              onSubmit={handleLogin}
              className='space-y-4'>
              {/* Email */}
              <InputWithIcon
                label='Email Address'
                name='email'
                type='email'
                iconSrc='/register/envelope.png'
                required
              />

              {/* Password */}
              <InputWithShow
                label='Password'
                name='password'
                show={showPassword}
                setShow={setShowPassword}
                iconSrc='/register/lock.png'
              />

              {/* remember me and forget password */}
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    name='remember'
                    id='remember'
                  />
                  <label htmlFor='remember'>Remember me</label>
                </div>
                <Link
                  href='/login/forgetpass'
                  className='text-blue-500 hover:underline'>
                  Forgot password?
                </Link>
              </div>

              <button
                type='submit'
                className='w-full bg-[#474BC2] text-white py-2 rounded-sm hover:bg-blue-600'>
                Log In
              </button>
            </form>

            {/* Social Buttons */}
            <div className='grid grid-flow-col gap-4 mt-4 w-full'>
              <SocialButton
                href='/login/facebook'
                text='Facebook'
                svg={
                  <svg
                    className='h-7 w-7'
                    viewBox='0 0 16 16'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'>
                    <path
                      fill='#000000'
                      d='M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z'
                    />
                  </svg>
                }
              />
              <SocialButton
                href='/auth/google'
                text='Google'
                svg={
                  <svg
                    fill='#000000'
                    className='h-7 w-7'
                    viewBox='-2 -2 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    preserveAspectRatio='xMinYMin'>
                    <path d='M4.376 8.068A5.944 5.944 0 0 0 4.056 10c0 .734.132 1.437.376 2.086a5.946 5.946 0 0 0 8.57 3.045h.001a5.96 5.96 0 0 0 2.564-3.043H10.22V8.132h9.605a10.019 10.019 0 0 1-.044 3.956 9.998 9.998 0 0 1-3.52 5.71A9.958 9.958 0 0 1 10 20 9.998 9.998 0 0 1 1.118 5.401 9.998 9.998 0 0 1 10 0c2.426 0 4.651.864 6.383 2.302l-3.24 2.652a5.948 5.948 0 0 0-8.767 3.114z' />
                  </svg>
                }
              />
            </div>
            {/* register */}
            <div className='flex items-center space-x-2 mt-5'>
              <span>Do not have an account?</span>
              <Link
                href='/register'
                className='text-blue-500 hover:underline'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Helper Components ---------- //
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
