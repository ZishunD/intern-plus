import { ReactNode } from "react";
type TaskCardProps = {
  label: string;
  status: string;
  due: string;
  svg: ReactNode | null;
};

export default function TaskCard({ label, status, due, svg }: TaskCardProps) {
  return (
    <div className='flex justify-between p-6 m-4 border border-[#B1BBE7] rounded shadow-md bg-[#F3F5FC]'>
      <div className='flex items-center space-x-5'>
        <div className='icon'>{svg}</div>
        <div className='text-lg font-semibold uppercase'>{label}</div>
      </div>
      <div className='flex flex-col space-y-5 justify-between'>
        {status === "done" ? (
          <span className='bg-[#B1BBE7] font-semibold text-center px-10 py-2'>
            Done
          </span>
        ) : (
          <span className='bg-[#B1BBE7] font-semibold text-center px-10 py-2'>
            In Progress
          </span>
        )}

        <div className='text-sm text-[#697077] text-end'>Due: {due}</div>
      </div>
    </div>
  );
}
