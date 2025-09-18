"use client";

import { useState } from "react";
import ProgramCard from "./ProgramCard";

type JobInfo = {
  title: string;
  description: string;
  category: string;
  total_positions: number;
};

interface ProgramListProps {
  jobs: JobInfo[];
}

export default function ProgramList({ jobs }: ProgramListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  if (!jobs || jobs.length === 0) {
    return (
      <div className='m-10 p-6 border rounded shadow bg-[#F3F5FC] text-center text-gray-700'>
        No programs available for this category.
      </div>
    );
  }

  return (
    <div className='m-10'>
      {/* Cards */}
      {currentJobs.map((job, index) => (
        <ProgramCard
          key={index}
          info={job}
        />
      ))}

      {/* Numbered pagination */}
      <div className='flex justify-center space-x-2 mt-6'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-[#474BC2] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
