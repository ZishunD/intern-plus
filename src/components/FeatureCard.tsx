// components/FeatureCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  background: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function ProductCard({ feature, index }: FeatureCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${feature.background})` }}
      className={`relative h-full w-full m-auto border border-[#8C97C9] rounded p-10 pt-70 bg-cover bg-no-repeat transition-all duration-300 overflow-x-auto 
      `}>
      {/* Description */}
      <div className='description bg-[#F3F5FC] border-[#B1BBE7] border p-10 rounded-lg flex-grow overflow-hidden origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
        {/* Title */}
        <div className='title mb-5 text-start font-bold text-xl origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          {feature.title}
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className='transition-[max-height, opacity]  font-[#323438] duration-700 ease-in-out overflow-hidden'>
          <p>{feature.description}</p>
        </motion.div>
      </div>

      {/* Upper Button */}
      <div
        className={`buttons flex justify-between absolute top-10 left-80 px-4 transition-all duration-300 left-5 right-5 w-auto origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]`}>
        <div className='learn-more rounded-sm px-8 py-2 text-center cursor-pointer bg-[#B1BBE7] text-white'>
          Learn More
        </div>
      </div>
    </div>
  );
}
