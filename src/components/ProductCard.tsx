/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProductCard.tsx
"use client";

import Image from "next/image";

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
      className={`relative h-full w-full m-auto border p-10 pr-30 pb-30 bg-cover bg-right bg-no-repeat space-y-10 transition-all duration-300 
        ${isExpanded ? "col-span-4" : "col-span-2"}`}>
      {/* Title */}
      <div className='title text-start font-bold text-xl'>{product.title}</div>

      {/* Description (only when expanded) */}
      {isExpanded && (
        <div className='description pb-20 flex-grow transition-all duration-300 overflow-hidden'>
          <p>{product.description}</p>
        </div>
      )}

      {/* Bottom Buttons */}
      <div
        className={`buttons flex justify-between absolute bottom-4 px-4 transition-all duration-300 left-5 right-5 w-auto`}>
        <div className='learn-more border rounded-sm px-3 py-1 cursor-pointer'>
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
            className='w-6 h-6'
          />
        </div>
      </div>
    </div>
  );
}
