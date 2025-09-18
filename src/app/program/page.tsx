"use client";

import ProgramList from "@/components/program/ProgramList";
import { useState, useEffect } from "react";
import {
  getProgramByCategory,
  getProgramSum,
  getPositionSum,
  getCategorySum,
} from "../lib/graphql/programs";

export default function ProgramPage() {
  interface Program {
    id: number;
    title: string;
    description: string;
    category: string;
    total_positions: number;
  }
  interface CategorySum {
    sum: number;
    category: string[];
  }

  const [choice, setChoice] = useState("human resources");
  const [programSum, setProgramSum] = useState(0);
  const [positionSum, setPositionSum] = useState(0);
  const [categorySum, setCategorySum] = useState<CategorySum[]>([]);
  const buttons = [
    { key: "it", label: "it" },
    { key: "marketing", label: "marketing" },
    { key: "human resources", label: "human resources" },
    { key: "translate", label: "translate" },
  ];
  const [programs, setPrograms] = useState<Program[]>([]);

  // Fetch programs whenever the category changes
  useEffect(() => {
    getProgramByCategory(choice)
      .then((data) => setPrograms(data.internPrograms || []))
      .catch((err) => console.error(err));
  }, [choice]);

  // Fetch summary stats only once when component mounts
  useEffect(() => {
    getProgramSum()
      .then((data) => setProgramSum(data.programSum || 0))
      .catch((err) => console.error(err));

    getPositionSum()
      .then((data) => setPositionSum(data.positionSum || 0))
      .catch((err) => console.error(err));

    getCategorySum()
      .then((data) => setCategorySum(data.categorySum || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className='header'>
        <div className='title text-center font-bold text-2xl my-5'>
          INTERNSHIP PROGRAM
          <div>
            <p className='text-center text-sm font-medium text-[#323438] mt-2'>
              Shape the Future with a Paid Internship at Vanness Plus Consulting
              Co. Ltd in Thailand!
            </p>
          </div>
        </div>
        <div className='overview flex justify-around space-x-10'>
          <div className='program flex flex-col justify-center items-center'>
            <div className='number font-bold text-2xl mb-2 mt-5'>
              {programSum ?? 0}
            </div>
            <div className='text-medium text-[#323438]'>internship program</div>
          </div>
          <div className='position flex flex-col justify-center items-center'>
            <div className='number font-bold text-2xl mb-2 mt-5'>
              {positionSum ?? 0}
            </div>
            <div className='position text-medium text-[#323438]'>
              position available
            </div>
          </div>
          <div className='category flex flex-col justify-center items-center'>
            <div className='number font-bold text-2xl mb-2 mt-5'>
              {categorySum[0]?.sum ?? 0}
            </div>
            <div className='category text-medium text-[#323438]'>
              job category
            </div>
          </div>
        </div>
        <div className='searchBar flex items-center justify-between p-2 rounded-md mt-10 mx-auto w-[90%]'>
          <input
            type='text'
            placeholder='Enter the program you are interested in...'
            className='px-4 py-2 bg-[#F3F5FC] rounded-sm rounded-r-none shadow w-full focus:outline-none'
          />
          <div className='search-icon bg-[#474BC2] p-2 rounded-sm rounded-l-none cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>
        <div className='types flex justify-center space-x-6 m-5'>
          {buttons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setChoice(btn.key)}
              className={`capitalize py-2 px-7 rounded transition 
            ${choice === btn.key ? "bg-[#B1BBE7]" : "bg-transparent border"}`}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      <div className='programs'>
        <ProgramList jobs={programs} />
      </div>
    </>
  );
}
