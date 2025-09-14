import Link from "next/link";
import { useState } from "react";

export default function LanguageDropdown() {
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
