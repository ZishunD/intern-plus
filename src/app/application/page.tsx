"use client";

import { useState, useRef } from "react";
import ApplicationCard from "@/components/application/ApplicationCard";
import WrongMessage from "@/components/WrongMessage";
import getApplicationById from "../lib/graphql/application";

interface Application {
  status: string;
  title: string;
  location: string;
  start_date: Date;
  end_date: Date;
  application_id: string;
  internship_type: string;
}

export default function ApplicationPage() {
  const [values, setValues] = useState(Array(9).fill(""));
  const [wrongMessage, setWrongMessage] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [application, setApplication] = useState<Application | null>(null);

  const handleChange = (index: number, value: string) => {
    const digit = value.slice(-1); // 取最后一位

    if (/^\d$/.test(digit)) {
      const newValues = [...values];
      newValues[index] = digit;
      setValues(newValues);

      // 自动跳到下一个输入框
      if (index < 8) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // 允许清空
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    /* check if all digits filled
      yes: ask for the data
      no: return "Wrong Application ID"
    */
    if (!values.includes("")) {
      try {
        const res = await getApplicationById(values.join(""));
        setApplication(res);
      } catch {
        setWrongMessage("Wrong Application ID");
        setTimeout(() => setWrongMessage(""), 2000);
      }
    } else {
      setWrongMessage("Wrong Application ID");
      setTimeout(() => setWrongMessage(""), 2000);
    }
  };

  return (
    <>
      <div>
        <div className='mb-10 text-center title uppercase text-2xl font-bold text-[#323438]'>
          your application
        </div>
        <div className='input-area bg-[#F3F5FC] p-10'>
          <div className='title text-center uppercase font-medium text-xl text-[#323438]'>
            enter your applictaion id
          </div>
          <WrongMessage wrongMessage={wrongMessage} />
          <div className='form relative'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col items-center gap-4 p-6'>
              {/* 横排9个输入框 */}
              <div className='flex gap-5'>
                {values.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    type='text'
                    value={val}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className='w-12 py-5 text-center text-xl bg-white font-semibold border border-[1px] border-[#B5B6B6] rounded'
                    maxLength={1}
                  />
                ))}
              </div>

              {/* 换行放submit按钮 */}
              <button
                type='submit'
                className='mt-5 capitalize px-6 py-2 bg-[#474BC2] text-white rounded-xs cursor-pointer hover:bg-blue-700'>
                search
              </button>
            </form>
          </div>
        </div>
        <div className='application p-10'>
          <div className='title text-2xl font-bold uppercase'>
            application internship
          </div>
          {application ? (
            <ApplicationCard application={application} />
          ) : (
            <div className='mt-10 flex flex-col border-[#B1BBE7] shadow-xl lg:justify-center lg:items-center lg:flex-row border p-4 rounded bg-[#F3F5FC] space-y-4 md:space-y-0 md:space-x-4'>
              Search Your Application by typing in your application id
            </div>
          )}
        </div>
      </div>
    </>
  );
}
