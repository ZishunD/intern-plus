"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Route = {
  name: string;
  path: string;
};

interface NavbarProps {
  routes: Route[];
}

const specialRoutes = [
  "/register",
  "/register/success",
  "/login",
  "/login/forgetpass",
  "/login/forgetpass/entercode",
  "/login/forgetpass/newpassword",
  "/login/forgetpass/resetsuccessful",
  "/program/apply/success",
];

export default function Navbar({ routes }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  if (specialRoutes.includes(pathname)) return null;

  return (
    <nav
      className={`text-[#323438] ${
        pathname === "/companyLanding" ? "bg-[#F3F5FC]" : ""
      }`}>
      <div className='mx-10 flex items-center justify-between py-10 md:px-0'>
        {/* 左侧 Logo + Language */}
        <div className='flex items-center space-x-6'>
          <Link
            href='/'
            className='text-4xl font-semibold'>
            INTERNPLUS
          </Link>

          {/* Language Dropdown */}
          <div className='relative'>
            <button
              onClick={() => setLangOpen(!langOpen)}
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
            {langOpen && (
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
        </div>

        {/* Hamburger icon for mobile */}
        {pathname !== "/companyLanding" && (
          <div className='lg:hidden'>
            <button
              onClick={() => setOpen(!open)}
              className='text-gray-600 hover:text-gray-800 focus:outline-none'>
              {!open ? (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Desktop Nav */}
        <div className='hidden lg:flex space-x-10 items-center text-xl'>
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className={`${pathname === r.path ? "font-bold" : "opacity-70"}`}>
              {r.name}
            </Link>
          ))}

          <span className='opacity-70 font-bold'>|</span>
          <Link
            href='/#company'
            className='opacity-70'>
            Company Services
          </Link>

          <Link
            href='/register'
            className={`${
              pathname === "/register" ? "font-bold underline" : "opacity-70"
            }`}>
            Register
          </Link>
          <Link
            href='/login'
            className={`bg-[#B1BBE7] rounded-sm px-4 py-2 text-[#323438] hover:bg-[#474BC2] hover:text-white ${
              pathname === "/login" ? "font-bold" : ""
            }`}>
            Log In
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className='lg:hidden px-4 mt-2 space-y-2 text-lg'>
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className={`block ${
                pathname === r.path ? "font-bold" : "opacity-70"
              }`}
              onClick={() => setOpen(false)}>
              {r.name}
            </Link>
          ))}

          <hr className='border-gray-300' />

          <Link
            href='/#company'
            className='opacity-70'>
            Company Services
          </Link>

          <Link
            href='/register'
            className={`block underline mb-5 ${
              pathname === "/register" ? "font-bold" : "opacity-70"
            }`}
            onClick={() => setOpen(false)}>
            Register
          </Link>

          <Link
            href='/login'
            className={`bg-[#B1BBE7] rounded-sm px-4 py-2 text-[#323438] hover:bg-[#474BC2] hover:text-white ${
              pathname === "/login" ? "font-bold" : ""
            }`}
            onClick={() => setOpen(false)}>
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
}
