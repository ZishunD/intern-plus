"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

interface ProgramCardProps {
  info: JobInfo;
}

type JobInfo = {
  id: string;
  title: string;
  description: string;
  category: string;
  total_positions: number;
};

// 预定义背景图列表
const bgImages = [
  "/program/2.png",
  "/program/3.png",
  "/program/4.png",
  "/program/5.png",
  "/program/6.png",
];

export default function ProgramCard({ info }: ProgramCardProps) {
  const router = useRouter();

  const handleApply = () => {
    router.push(`/program/apply/${info.id}`);
  };

  const randomBg = useMemo(() => {
    return bgImages[Math.floor(Math.random() * bgImages.length)];
  }, []);

  return (
    <>
      <div className='card flex justify-between m-10 shadow-lg rounded'>
        <div className='left flex bg-[#F3F5FC] flex-col space-y-4 p-10 rounded rounded-r-none w-2/3'>
          <div className='title uppercase font-bold text-2xl'>{info.title}</div>
          <div className='description font-medium text-sm text-[#323438]'>
            {info.description}
          </div>
          <div className='tags flex space-x-6 text-xs mt-10'>
            <div className='category bg-[#D1D1F0] px-5 py-2 rounded'>
              {info.category}
            </div>
            <div className='number bg-[#B1BBE7] rounded px-5 py-2'>
              {info.total_positions} positions
            </div>
          </div>
        </div>
        <div
          className='right relative bg-contain bg-no-repeat bg-center w-1/3 rounded rounded-l-none'
          style={{ backgroundImage: `url(${randomBg})` }}>
          <div
            className='apply-button bg-[#474BC2] absolute bottom-[10%] right-[10%] px-5 py-2 text-sm font-light rounded text-white cursor-pointer'
            onClick={() => {
              handleApply();
            }}>
            Apply
          </div>
        </div>
      </div>
    </>
  );
}
