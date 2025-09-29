"use client";

import ApplyProgramForm from "@/components/apply/ApplyProgramForm";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProgramById } from "@/app/lib/graphql/programs";

export const dynamic = "force-dynamic";

type JobInfo = {
  id: number;
  title: string;
  description: string;
  category: string;
  total_positions: number;
  location?: string | null;
};

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const [programId, setProgramId] = useState<string | null>(null);
  const [program, setProgram] = useState<JobInfo | null>(null);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  console.log(programId);

  useEffect(() => {
    const id = searchParams.get("id");
    setProgramId(id);
  }, [searchParams]);

  useEffect(() => {
    if (!programId) return;

    const fetchProgram = async () => {
      try {
        const result = await searchProgramById(programId);
        setProgram(result.program);
        console.log(result.program);
      } catch (error) {
        console.error("Failed to fetch program:", error);
        setProgram(null);
      }
    };

    fetchProgram();
  }, [programId]);

  if (!program) return <Loading />;

  const handleShare = async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return;

    const shareData = {
      title: "Internship Program",
      text: "Check out this internship program!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err, copied);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  return (
    <>
      <div className='header mx-10 mt-10'>
        <div className='categoryAndBack flex justify-between items-center'>
          <div className='category flex space-x-4'>
            <div className='it px-5 text-xs py-2 uppercase bg-[#D1D1F0] rounded'>
              {program.category}
            </div>
            <div className='position text-xs px-5 py-2 bg-[#B1BBE7] rounded'>
              {program.total_positions} position
            </div>
          </div>
          <div className='back flex space-x-4'>
            <div
              className='backButton bg-[#B1BBE7] rounded px-5 py-2 cursor-pointer'
              onClick={() => router.back()}>
              {`<`}&nbsp;&nbsp;&nbsp;Back
            </div>
            <div
              className='share bg-[#474BC2] rounded px-3 py-2 flex items-center justify-center cursor-pointer'
              onClick={() => handleShare()}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#FFFFFF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-5 h-5'>
                <path d='M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8' />
                <polyline points='16 6 12 2 8 6' />
                <line
                  x1='12'
                  y1='2'
                  x2='12'
                  y2='15'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className='titleAndLocation'>
          <div className='title pt-3 font-extrabold text-4xl'>
            {program.title}
          </div>
          <div className='location pb-3 flex'>
            <div className='icon p-2'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'>
                <path
                  d='M12 2c-4.4 0-8 3.6-8 8 0 5.4 7 11.5 7.3 11.8.2.1.5.2.7.2.2 0 .5-.1.7-.2.3-.3 7.3-6.4 7.3-11.8 0-4.4-3.6-8-8-8zm0 17.7c-2.1-2-6-6.3-6-9.7 0-3.3 2.7-6 6-6s6 2.7 6 6-3.9 7.7-6 9.7zM12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'
                  fill='#323438'
                />
              </svg>
            </div>
            <div className='adrres text-[#323438] p-2'>
              {program.location ? program.location : "Somewhere in the world"}
            </div>
          </div>
        </div>
        <div className='description mb-10 pt-10 w-full md:w-1/2 text-[#323438]'>
          {program.description}
        </div>
        <div className='divider border w-full mt-10 border-[#C1C7CD]'></div>
      </div>
      <div className='form mx-10 mt-10'>
        <ApplyProgramForm />
      </div>
    </>
  );
}
