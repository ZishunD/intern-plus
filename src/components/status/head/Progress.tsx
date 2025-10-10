import { useState } from "react";

export default function ProgressBar() {
  // ✅ Steps defined here inside the component
  const steps = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Request Internship Application", status: "pending" },
    { id: 3, label: "Request Internship Document", status: "" },
    { id: 4, label: "Acceptance Terms" },
    { id: 5, label: "Success" },
  ];

  // ✅ Manage current step in this component (can also be prop if needed)
  const [currentStep, setCurrentStep] = useState(1); // Zero-based index

  return (
    <div className='bg-[#F3F5FC] p-10 lg:p-10 pb-20 relative shadow-xl flex justify-between items-center'>
      {steps.map((step, index) => {
        const isActive = step.id <= currentStep + 1;
        const isCompleted = step.id < currentStep + 2;

        return (
          <div
            key={step.id}
            className='flex items-center flex-1 last:flex-none'>
            <div className='flex flex-col items-center space-y-2'>
              {/* Step circle */}
              <div
                className={`flex items-center justify-center h-8 w-8 text-sm lg:text-base md:h-10 md:w-10 rounded border transition-colors duration-300 ${
                  isActive
                    ? "bg-[#474BC2] text-white"
                    : "border-[#323438] text-[#323438]"
                }`}>
                {step.id}
              </div>
              {/* Step label */}
              <div
                className={`absolute top-20 text-[10px] text-center w-10 lg:w-100 md:text-sm font-medium ${
                  isActive ? "text-[#474BC2]" : "text-gray-500"
                }`}>
                {step.label}
              </div>
            </div>
            {/* Line */}
            {index < steps.length - 1 && isCompleted && (
              <div className='flex-1 relative h-6'>
                {/* line */}
                <div className='w-full h-[1px] bg-[#323438]'></div>

                {/* duration label above line */}
                {steps[index + 1].label !== steps[index + 2].label && (
                  <span className='absolute bg-[#474BC2] text-white p-1 rounded -top-3 left-1/2 transform -translate-x-1/2 text-[10px] lg:text-sm text-gray-600 whitespace-nowrap'>
                    in 3 days
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
