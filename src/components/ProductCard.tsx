// components/ProductCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  title: string;
  description: string;
  background: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  expandedIndex: number | null;
  onToggle: (index: number) => void;
}

export default function ProductCard({
  product,
  index,
  expandedIndex,
  onToggle,
}: ProductCardProps) {
  const isExpanded = expandedIndex === index;

  return (
    <div
      style={{ backgroundImage: `url(${product.background})` }}
      className={`relative h-full w-full m-auto border border-[#8C97C9] rounded p-10 pr-30 pb-30 bg-right bg-no-repeat transition-all duration-300 overflow-x-auto 
        ${isExpanded ? "col-span-4" : "col-span-2"}`}>
      {/* Title */}
      <div className='title text-start font-bold text-xl origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
        {product.title}
      </div>

      {/* Description (only when expanded) */}
      {isExpanded && (
        <div className='description pb-30 flex-grow overflow-hidden origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className='transition-[max-height, opacity]  font-[#323438] duration-700 ease-in-out overflow-hidden'
            style={{
              maxHeight: isExpanded ? "500px" : "0px", // 只控制内容高度，不影响外层 padding
              opacity: isExpanded ? 1 : 0,
            }}>
            <p>{product.description}</p>
          </motion.div>
        </div>
      )}

      {/* Bottom Buttons */}
      <div
        className={`buttons flex justify-between absolute bottom-4 px-4 transition-all duration-300 left-5 right-5 w-auto origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]`}>
        <div className='learn-more rounded-sm px-8 py-2 text-center cursor-pointer bg-[#B1BBE7] text-white'>
          Learn More
        </div>

        <div
          className='arrow cursor-pointer'
          onClick={() => onToggle(index)}>
          <Image
            src={
              isExpanded
                ? "/companyLanding/arrow-square-left-1.png"
                : "/companyLanding/arrow-square-right-1.png"
            }
            alt='arrow'
            width={24}
            height={24}
            className='w-10 h-10'
          />
        </div>
      </div>
    </div>
  );
}
