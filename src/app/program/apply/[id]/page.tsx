"use client"; // Only needed if you use client hooks

import ApplyProgramForm from "@/components/apply/ApplyProgramForm";
import Loading from "@/components/Loading";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { searchProgramById } from "@/app/lib/graphql/programs";

type JobInfo = {
  id: string;
  title: string;
  description: string;
  category: string;
  total_positions: number;
  location?: string | null;
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ApplyPage({ params }: PageProps) {
  const { id } = use(params);
  const [program, setProgram] = useState<JobInfo | null>(null);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const result = await searchProgramById(id);
        setProgram(result.program);
      } catch (error) {
        console.error("Failed to fetch program:", error);
        setProgram(null);
      }
    };

    fetchProgram();
  }, [id]);

  if (!program) return <Loading />;

  const handleShare = async () => {
    const shareData = {
      title: "Internship Program",
      text: "Check out this internship program!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
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
    <div className='mx-10 mt-10'>
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
            {"<"}&nbsp;&nbsp;&nbsp;Back
          </div>
          <div
            className='share bg-[#474BC2] rounded px-3 py-2 flex items-center justify-center cursor-pointer'
            onClick={() => handleShare()}>
            Share
          </div>
        </div>
      </div>

      <div className='titleAndLocation pt-3 font-extrabold text-4xl'>
        {program.title}
      </div>
      <div className='location pb-3 flex'>
        {program.location ? program.location : "Somewhere in the world"}
      </div>

      <div className='description mb-10 pt-10 w-full md:w-1/2'>
        {program.description}
      </div>

      <div className='divider border w-full mt-10 border-[#C1C7CD]'></div>

      <div className='form mx-10 mt-10'>
        <ApplyProgramForm />
      </div>
    </div>
  );
}
