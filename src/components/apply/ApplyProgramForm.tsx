/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useRouter } from "next/navigation";

interface ApplyForm {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  internshipType: string;
  resumeFile: File | null;
  portfolioFile: File | null;
  program_id?: string;
}

export default function ApplyProgramForm() {
  const today = new Date();
  const route = useRouter();

  const [type, setType] = useState("");
  const [cvfile, setCvfile] = useState<string>("Select a file to upload");
  const [portfolio, setPortfolio] = useState<string>("Select a file to upload");
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<ApplyForm>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    startDate: today.toISOString().slice(0, 10),
    endDate: "",
    internshipType: "",
    resumeFile: null,
    portfolioFile: null,
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedProgram");
    if (stored) {
      const program = JSON.parse(stored);
      setForm((prev) => ({ ...prev, program_id: program.id }));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // 获取 File 对象
      console.log(file.name, form);
      setCvfile(file.name); // 显示文件名
      setForm((prev) => ({ ...prev, resumeFile: file })); // 保存 File 对象
    }
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPortfolio(file.name);
      setForm((prev) => ({ ...prev, portfolioFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 检查必填字段
    const requiredFields: (keyof ApplyForm)[] = [
      "fname",
      "lname",
      "email",
      "phone",
      "startDate",
      "endDate",
      "internshipType",
      "resumeFile",
    ];

    for (const field of requiredFields) {
      const value = form[field];
      // 文件用 null 检查，字符串用空字符串检查
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
      ) {
        setErrorMessage(`Please fill out all required fields!`);
        setIsSubmitting(false);
        setTimeout(() => setErrorMessage(""), 2000);
        return;
      }
    }

    // ✅ 文件大小检查
    if (form.resumeFile && form.resumeFile.size > 10 * 1024 * 1024) {
      setErrorMessage("Resume file must be smaller than 10MB!");
      setIsSubmitting(false);
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (form.portfolioFile && form.portfolioFile.size > 20 * 1024 * 1024) {
      setErrorMessage("Portfolio file must be smaller than 20MB!");
      setIsSubmitting(false);
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    // 如果所有必填字段都有值，继续提交
    try {
      console.log(form.program_id);
      const formData = new FormData();
      // GraphQL mutation
      formData.append(
        "operations",
        JSON.stringify({
          query: `
        mutation ApplyInternship(
          $fname: String!,
          $lname: String!,
          $email: String!,
          $phone: String!,
          $startDate: String!,
          $endDate: String!,
          $internshipType: String!,
          $program_id: ID!,
          $resumeFile: Upload!,
          $portfolioFile: Upload
        ) {
          applyInternship(input: {
            fname: $fname,
            lname: $lname,
            email: $email,
            phone: $phone,
            startDate: $startDate,
            endDate: $endDate,
            internshipType: $internshipType,
            program_id: $program_id,
            resumeFile: $resumeFile,
            portfolioFile: $portfolioFile
          }) {
            application_id
          }
        }
      `,
          variables: {
            fname: form.fname,
            lname: form.lname,
            email: form.email,
            phone: form.phone,
            startDate: form.startDate,
            endDate: form.endDate || "",
            internshipType: form.internshipType,
            program_id: form.program_id,
            resumeFile: null,
            portfolioFile: null,
          },
        })
      );

      // map 对应文件变量
      const map: any = { "0": ["variables.resumeFile"] };
      if (form.portfolioFile) map["1"] = ["variables.portfolioFile"];
      formData.append("map", JSON.stringify(map));

      // 文件
      formData.append("0", form.resumeFile as File);
      if (form.portfolioFile) formData.append("1", form.portfolioFile as File);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_LINK}/graphql`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      console.log("Application success:", data.data.applyInternship);
      sessionStorage.setItem(
        "applicationData",
        JSON.stringify(data.data.applyInternship)
      );
      route.push("/program/apply/success");
    } catch (err: any) {
      console.error("Apply failed:", err);
      if (err === "No account found. Please register first.") {
        setErrorMessage("No account found. Please register first.");
        setTimeout(() => setErrorMessage(""), 2000);
      } else {
        setErrorMessage("Application failed");
        setTimeout(() => setErrorMessage(""), 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col md:flex-row md:space-x-20'>
        <div className='left w-full flex-col md:w-1/2 space-y-5'>
          <div className='fname'>
            <label
              htmlFor='fname'
              className='uppercase font-bold text-lg'>
              first name
            </label>
            <div className='input flex py-5'>
              <input
                type='text'
                id='fname'
                className='w-full px-5 py-2 border border-[2px] rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                value={form.fname}
                onChange={(e) => setForm({ ...form, fname: e.target.value })}
                required
              />
              <span className='flex justify-center items-center text-xl pl-5'>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12 6V18'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M17.1967 9L6.80469 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6.80469 9L17.1967 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className='lname'>
            <label
              htmlFor='lname'
              className='uppercase font-bold text-lg'>
              last name
            </label>
            <div className='input flex py-5'>
              <input
                type='text'
                id='lname'
                className='w-full px-5 py-2 border border-[2px] rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                value={form.lname}
                onChange={(e) => setForm({ ...form, lname: e.target.value })}
                required
              />
              <span className='flex justify-center items-center text-xl pl-5'>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12 6V18'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M17.1967 9L6.80469 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6.80469 9L17.1967 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className='email'>
            <label
              htmlFor='email'
              className='uppercase text-lg font-bold'>
              email address
            </label>
            <div className='input flex py-5'>
              <input
                type='email'
                id='email'
                className='w-full px-5 py-2 border border-[2px] rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <span className='flex justify-center items-center text-xl pl-5'>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12 6V18'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M17.1967 9L6.80469 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6.80469 9L17.1967 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className='phone'>
            <label
              htmlFor='phone'
              className='uppercase text-lg font-bold'>
              phone number
            </label>
            <div className='input flex py-5'>
              <input
                type='phone'
                id='phone'
                className='w-full px-5 py-2 border border-[2px] rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <span className='flex justify-center items-center text-xl pl-5'>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12 6V18'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M17.1967 9L6.80469 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6.80469 9L17.1967 15'
                    stroke='#323438'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className='cv'>
            <div className='uppercase text-lg font-bold mt-3'>
              your cv/resume
            </div>
            <label
              htmlFor='cv'
              className=''>
              <div className='input flex pt-5'>
                <div className='icon bg-[#474BC2] p-3 rounded rounded-r-none cursor-pointer'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 31 31'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M5.16797 28.4166H23.2513C23.9364 28.4166 24.5935 28.1444 25.078 27.6599C25.5625 27.1755 25.8346 26.5184 25.8346 25.8333V9.68742L18.7305 2.58325H7.7513C7.06616 2.58325 6.40908 2.85542 5.92461 3.33989C5.44014 3.82436 5.16797 4.48144 5.16797 5.16659V10.3333'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M18.082 2.58325V10.3333H25.832'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M2.58203 19.375H15.4987'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M11.625 23.25L15.5 19.375L11.625 15.5'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <span className='border-[#323438] border-[2px] flex items-center text-[#697077] flex-1 border px-5 py-1 cursor-pointer rounded rounded-l-none'>
                  {cvfile ? cvfile : "Select a file to upload"}
                </span>
                <input
                  type='file'
                  id='cv'
                  className='hidden'
                  onChange={handleFileChange}
                />
                <span className='flex justify-center items-center text-xl pl-5'>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M12 6V18'
                      stroke='#323438'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M17.1967 9L6.80469 15'
                      stroke='#323438'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M6.80469 9L17.1967 15'
                      stroke='#323438'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              </div>
            </label>
            <div className='limit text-[#697077] mt-2'>
              *Supports size up to 10 MB
            </div>
          </div>
          <div className='portfolio pt-3'>
            <div className='uppercase font-bold text-lg'>your portfolio</div>
            <label
              htmlFor='portfolio'
              className=''>
              <div className='input flex pt-5'>
                <div className='icon bg-[#474BC2] p-3 rounded rounded-r-none cursor-pointer'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 31 31'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M5.16797 28.4166H23.2513C23.9364 28.4166 24.5935 28.1444 25.078 27.6599C25.5625 27.1755 25.8346 26.5184 25.8346 25.8333V9.68742L18.7305 2.58325H7.7513C7.06616 2.58325 6.40908 2.85542 5.92461 3.33989C5.44014 3.82436 5.16797 4.48144 5.16797 5.16659V10.3333'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M18.082 2.58325V10.3333H25.832'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M2.58203 19.375H15.4987'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M11.625 23.25L15.5 19.375L11.625 15.5'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <span className='flex items-center text-[#697077] flex-1 border border-[#323438] border-[2px] px-5 py-1 cursor-pointer rounded rounded-l-none'>
                  {portfolio ? portfolio : "Select a file to upload"}
                </span>
                <input
                  type='file'
                  id='portfolio'
                  className='hidden'
                  onChange={handlePortfolioChange}
                />
                <span className='text-red-500 flex justify-center items-center text-xl pl-7'></span>
              </div>
            </label>
            <div className='limit text-[#697077] mt-2'>
              *Supports size up to 20 MB
            </div>
          </div>
        </div>
        <div className='right w-full md:w-1/2 space-y-6'>
          {/* Period Section */}
          <div className='max-w-md md:mx-auto mt-10 md:mt-0 py-4 space-y-4'>
            <div className='title uppercase font-bold text-2xl'>
              internship period
            </div>
            <Calendar
              startDate={startDate}
              endDate={endDate}
              setStartDate={(date) => {
                setStartDate(date);
                setForm((prev) => ({
                  ...prev,
                  startDate: date
                    ? date.toISOString()
                    : new Date().toISOString(),
                }));
              }}
              setEndDate={(date) => {
                setEndDate(date);
                setForm((prev) => ({
                  ...prev,
                  endDate: date ? date.toISOString().slice(0, 10) : "",
                }));
              }}
            />
          </div>
          {/* Type Section */}
          <div className='type'>
            <div className='title text-2xl uppercase font-semibold mb-5'>
              internship type
            </div>
            <div className='typeButtons w-3/4 md:w-full flex gap-10'>
              <button
                type='button'
                className={`onsite relative w-full rounded cursor-pointer transition ${
                  type === "onsite" ? "bg-[#D1D1F0]" : "border border-[2px]"
                }`}
                onClick={() => {
                  setType("onsite");
                  setForm((prev) => ({ ...prev, internshipType: "onsite" }));
                }}>
                <div className='text-start pl-5 pt-20'>On-site</div>
                <svg
                  width='40'
                  height='40'
                  viewBox='0 0 51 51'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute top-5 end-5'>
                  <path
                    d='M12.75 46.75V8.5C12.75 7.92625 12.75 7.33125 12.8988 6.7575C13.0475 6.18375 13.3237 5.6525 13.7487 5.2275C14.1525 4.8025 14.6838 4.5475 15.2363 4.39875C15.8525 4.25 18.5512 4.25 19.125 4.25H34C34.5738 4.25 35.1687 4.25 35.7425 4.39875C36.3162 4.5475 36.8475 4.82375 37.2725 5.24875C37.6975 5.6525 37.9525 6.18375 38.1013 6.73625C38.25 7.33125 38.25 7.92625 38.25 8.5V46.75H12.75Z'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4.25082 29.75V42.5C4.25082 44.8375 6.16332 46.75 8.50082 46.75H12.7508V25.5H8.50082C7.92707 25.5 7.33207 25.5 6.75832 25.6487C6.18457 25.7975 5.65332 26.0738 5.22832 26.4988C4.82457 26.9025 4.54832 27.4338 4.39957 28.0075C4.27961 28.5802 4.22966 29.1653 4.25082 29.75Z'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M44.2425 19.2737C43.6698 19.1538 43.0847 19.1038 42.5 19.125H38.25V46.75H42.5C43.6272 46.75 44.7082 46.3022 45.5052 45.5052C46.3022 44.7081 46.75 43.6271 46.75 42.5V23.375C46.75 22.78 46.75 22.2062 46.6013 21.6325C46.4525 21.0587 46.1763 20.5275 45.7513 20.1025C45.3475 19.6987 44.8162 19.4225 44.2425 19.2737V19.2737Z'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M21.25 12.75H29.75'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M21.25 21.25H29.75'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M21.25 29.75H29.75'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M21.25 38.25H29.75'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={() => {
                  setType("wfh");
                  setForm((prev) => ({ ...prev, internshipType: "remote" }));
                }}
                className={`wfh relative w-full rounded cursor-pointer transition ${
                  type === "wfh" ? "bg-[#D1D1F0]" : "border border-[2px]"
                }`}>
                <div className='text-start capitalize pt-20 pl-5 pb-5'>
                  work from home
                </div>
                <svg
                  width='40'
                  height='40'
                  viewBox='0 0 52 52'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute top-4 end-5'>
                  <path
                    d='M6.5 19.4999L26 4.33325L45.5 19.4999V43.3333C45.5 44.4825 45.0435 45.5847 44.2308 46.3974C43.4181 47.21 42.3159 47.6666 41.1667 47.6666H10.8333C9.68406 47.6666 8.58186 47.21 7.7692 46.3974C6.95655 45.5847 6.5 44.4825 6.5 43.3333V19.4999Z'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M19.5 47.6667V26H32.5V47.6667'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                type='button'
                className={`hybrid relative w-full rounded cursor-pointer transition ${
                  type === "hybrid" ? "bg-[#D1D1F0]" : "border border-[2px]"
                }`}
                onClick={() => {
                  setType("hybrid");
                  setForm((prev) => ({ ...prev, internshipType: "hybrid" }));
                }}>
                <div className='capitalize pt-20 text-start pl-5'>hybrid</div>

                <svg
                  width='45'
                  height='45'
                  viewBox='0 0 53 53'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute top-4 end-5'>
                  <path
                    d='M38.6457 41.9584C41.2813 41.9584 43.809 40.9114 45.6726 39.0478C47.5362 37.1841 48.5832 34.6565 48.5832 32.0209C48.5832 29.3853 47.5362 26.8577 45.6726 24.994C43.809 23.1304 41.2813 22.0834 38.6457 22.0834H34.6707C33.8514 19.3353 32.2838 16.8693 30.1432 14.961C28.0026 13.0528 25.3734 11.7776 22.5496 11.2781C19.7258 10.7786 16.8187 11.0743 14.1534 12.1324C11.488 13.1904 9.16953 14.969 7.45712 17.2692C5.74472 19.5695 4.70591 22.3007 4.45686 25.1575C4.2078 28.0143 4.75831 30.8841 6.04684 33.446C7.33536 36.0079 9.3111 38.1608 11.7531 39.6641C14.1952 41.1674 17.0072 41.9618 19.8749 41.9584H38.6457Z'
                    stroke='#323438'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className='button flex md:justify-end'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='submit my-5 mb-10 px-10 py-3 bg-[#474BC2] text-white rounded-[2px] cursor-pointer flex items-center justify-center gap-2'>
              {isSubmitting ? (
                <>
                  <svg
                    className='animate-spin h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                "Apply"
              )}
            </button>
          </div>
        </div>
      </form>
      {/* 错误提示框 */}
      {errorMessage && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'>
          <div className='bg-white px-6 py-4 rounded-lg shadow-lg max-w-sm text-center animate-bounce'>
            <p className='text-red-600 font-semibold'>{errorMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}
