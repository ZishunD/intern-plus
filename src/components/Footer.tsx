"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  if (pathname === "/register") return null;

  return (
    <div className='footer px-6 py-10 text-gray-800 text-sm font-[Fustat]'>
      {/* Top Nav */}
      <div className='footer_nav flex flex-col md:flex-row justify-between items-start md:items-center'>
        {/* Logo */}
        <div className='logo text-3xl font-semibold text-black opacity-50 mb-5 md:mb-0'>
          INTERNPLUS
        </div>

        {/* Email & Button */}
        <div className='email-button flex items-center rounded-sm gap-2 md:w-auto'>
          <div className='bg-[#F3F5FC]'>
            <div className='flex items-center shadow rounded-md px-2 pl-5 py-3 w-full md:w-auto'>
              <Image
                src='/landing/email.png'
                alt='email'
                width={20}
                height={20}
                className='mr-2'
              />
              <input
                type='email'
                placeholder='Enter your email to get the latest news...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='outline-none bg-transparent w-70'
              />
            </div>
          </div>
          <button
            onClick={() => alert(`Subscribed with ${email}`)}
            className='bg-[#474BC2] hover:scale-105 transition text-white font-medium px-4 py-2 rounded text-base'>
            Subscribe
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className='my-6 border-t-2 border-gray-300'></div>

      {/* Contact Us Section */}
      <div className='contact-us flex flex-col pt-8 md:flex-row justify-between gap-6'>
        {/* Left Contact Info */}
        <div className='left flex-1 space-y-4'>
          <div className='title text-xl font-bold'>Contact Us</div>
          <div className='information space-y-3 text-[#697077] font-bold text-lg'>
            <div className='location flex items-start gap-3'>
              <Image
                src='/landing/location.png'
                alt='location'
                width={20}
                height={20}
                className='mt-1'
              />
              <p>287 Si Lom Rd, Silom, Bang Rak, Bangkok 10500</p>
            </div>
            <div className='phone flex items-start gap-3'>
              <Image
                src='/landing/phone.png'
                alt='phone'
                width={20}
                height={20}
                className='mt-1'
              />
              <p>02-0777581 (Head Quarter Contact)</p>
            </div>
            <div className='email flex items-start gap-3'>
              <Image
                src='/landing/email.png'
                alt='email'
                width={20}
                height={20}
                className='mt-1'
              />
              <p>cs@internplus.com</p>
            </div>
          </div>
        </div>

        {/* Right Map */}
        <div className='right flex justify-center md:justify-end'>
          <Image
            src='/landing/map-icon.png'
            alt='map'
            width={256}
            height={256}
            className='w-64 max-w-full'
          />
        </div>
      </div>

      {/* Divider */}
      <div className='my-6 border-t-2 border-gray-300'></div>

      {/* Bottom Copyright & Socials */}
      <div className='copyright-and-social pt-10 flex flex-col md:flex-row justify-between items-center gap-4'>
        <div className='copyright text-center text-[#697077] font-medium text-lg md:text-left'>
          Internplus © 2024. All rights reserved.
        </div>
        <div className='socials flex gap-4'>
          <Image
            src='/landing/Social-Icons.png'
            alt='x'
            width={24}
            height={24}
          />
          <Image
            src='/landing/facebook.png'
            alt='facebook'
            width={24}
            height={24}
          />
          <Image
            src='/landing/twitter.png'
            alt='twitter'
            width={24}
            height={24}
          />
          <Image
            src='/landing/instagram.png'
            alt='instagram'
            width={24}
            height={24}
          />
          <Image
            src='/landing/linkedin.png'
            alt='linkedin'
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
