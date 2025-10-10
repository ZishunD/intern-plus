import TaskCard from "@/components/status/TaskCard";

export default function AcceptanceTerms() {
  return (
    <>
      <div className='pending uppercase text-2xl p-10 font-bold'>
        Acceptance Terms
      </div>
      <TaskCard
        label='acceptance terms'
        status='in-progress'
        due='2 days'
        svg={null}
      />
      <div className='button bg-[#474BC2] text-white mx-5 my-10 px-5 py-3 rounded text-center w-30 cursor-pointer'>
        Submit
      </div>
    </>
  );
}
