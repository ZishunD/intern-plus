"use client";

// components/Package.tsx
import Image from "next/image";

interface PriceInfo {
  type: string;
  description: string;
  price: string;
  unit: string;
  icon: string;
  ["device-number"]: number;
}

interface PackageProps {
  priceinfos: PriceInfo[];
}

export default function Package({ priceinfos }: PackageProps) {
  return (
    <>
      {/* 父容器 */}
      <div className='flex space-x-4 overflow-x-auto flex-row'>
        {priceinfos.map((priceinfo, idx) => (
          <div
            key={idx}
            className={`${
              priceinfo.type === "Standard" ? "bg-[#D1D1F0] relative" : ""
            } pt-15 pr-3 pl-3 pb-3 rounded-sm w-80 text-[#323438]`}>
            {/* Best Deal Label */}
            <div
              className={`${
                priceinfo.type === "Standard" ? "" : "hidden"
              } best-deal-label font-extrabold text-2xl rounded self-start absolute inset-x-0 inset-y-3`}>
              Best Deal
            </div>

            {/* Card */}
            <div className='package-card rounded flex flex-col justify-between p-4 h-full w-full space-y-5 border-2 border-[#8C97C9] bg-white origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
              {/* Icon */}
              <div className='icon bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mb-2'>
                <Image
                  src={priceinfo.icon}
                  alt='icon'
                  width={24}
                  height={24}
                  className='w-6 h-6'
                />
              </div>

              {/* Type */}
              <div className='type font-semibold text-lg sm:text-xl text-start pt-5'>
                {priceinfo.type}
              </div>

              {/* Description */}
              <div className='desc font-medium text-sm sm:text-base text-gray-600 text-start'>
                {priceinfo.description}
              </div>

              {/* Price & Unit */}
              <div className='price-unit flex flex-row items-center'>
                <div className='price text-2xl sm:text-4xl font-extrabold text-start'>
                  {priceinfo.price}
                </div>
                <div className='unit text-sm sm:text-base font-medium'>
                  &nbsp;{priceinfo.unit}
                </div>
              </div>

              {/* Devices */}
              <div className='devices flex items-center space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.75 17h4.5m-4.5 0v-1.5a1.5 1.5 0 013 0V17m0 0h1.5a2.25 2.25 0 002.25-2.25V7.5A2.25 2.25 0 0012 5.25H9.75A2.25 2.25 0 007.5 7.5v7.25A2.25 2.25 0 009.75 17z'
                  />
                </svg>
                <span className='text-xs sm:text-sm font-bold'>
                  {priceinfo["device-number"]} devices
                </span>
              </div>

              {/* Button */}
              <div>
                <button className='w-full sm:w-auto px-6 sm:px-12 lg:px-20 py-3 bg-[#474BC2] font-bold text-base text-white rounded-sm hover:bg-[#D1D1F0] shadow-md hover:text-[#323438] transition'>
                  Start Trial
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
