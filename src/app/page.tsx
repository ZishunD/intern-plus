"use client";

// src/app/page.tsx
import Image from "next/image";
import { useState } from "react";
import PriceCard from "@/components/PriceCard";
import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import Link from "next/link";

export default function HomePage() {
  // services
  const services = [
    {
      name: "INTERNSHIP",
      description:
        "This website is the company&apos;s operating system for students throughout their internship until the end.",
      url: "/landing/briefcase-icon.png",
    },
    {
      name: "TASK MANAGEMENT",
      description:
        "There is a system for managing assigned tasks, work entry and exit times, daily reporting, document submission, etc.",
      url: "/landing/notebook-icon.png",
    },
    {
      name: "FASTER PROCESS",
      description:
        "Shorten the time spent on each step of the internship process, such as waiting for a response email, contacting HR, etc.",
      url: "/landing/alarm-icon.png",
    },
  ];

  // functions
  const functions = [
    "Internship Data Management",
    "StorageManagement",
    "Application Management",
    "Time Attendance",
    "Leave Request",
    "Assignment Management",
    "Reporting",
    "Offboarding",
    "Payroll Management",
    "Approval",
  ];

  // monthly pricing
  const monthly = [
    {
      icon: "/companyLanding/starter.png",
      type: "Starter",
      description:
        "Suitable for students and beginners who need basic features.",
      price: "Free",
      deviceNumber: "1",
      unit: "",
    },
    {
      icon: "/companyLanding/standard.png",
      type: "Standard",
      description:
        "Suitable for small organizations or educational institutions that need more features.",
      price: "฿199",
      deviceNumber: "5",
      unit: "/ month",
    },
    {
      icon: "/companyLanding/premium.png",
      type: "Premium",
      description:
        "Suitable for large organizations or educational institutions that require a complete system.",
      price: "฿399",
      deviceNumber: "10",
      unit: "/ month",
    },
  ];

  // yearly pricing
  const yearly = [
    {
      icon: "/companyLanding/starter.png",
      type: "Starter",
      description:
        "Suitable for students and beginners who need basic features.",
      price: "Free",
      deviceNumber: "1",
      unit: "",
    },
    {
      icon: "/companyLanding/standard.png",
      type: "Standard",
      description:
        "Suitable for small organizations or educational institutions that need more features.",
      price: "฿2,388",
      deviceNumber: "5",
      unit: "/ year",
    },
    {
      icon: "/companyLanding/premium.png",
      type: "Premium",
      description:
        "Suitable for large organizations or educational institutions that require a complete system.",
      price: "฿4,788",
      deviceNumber: "10",
      unit: "/ year",
    },
  ];

  // features
  const features = [
    ["Register for interns", true, true, true],
    ["Track internship status", true, true, true],
    ["Storage spaces", true, true, true],
    ["Pemilinary results report", true, true, true],
    ["Detailed report", false, true, true],
    ["Notification system", false, true, true],
    ["Data Analytics", false, false, true],
    ["Oranization-specific customization", false, false, true],
    ["24/7 support team", false, false, true],
    ["Maximum intern", "10 users", "60 users", "Unlimited"],
    ["Maximum administrator", "1 devices", "5 devices", "10 devices"],
  ];

  // products
  const products = [
    [
      {
        title: "Internship Data Management",
        description:
          "Internship Data Management provides real-time data updates for both interns and corporate users. It also stores apprentice documents online which can be downloaded by apprentices or organizations for further use.",
        background: "companyLanding/intern-data-management.png",
      },
      {
        title: "Time Attendance",
        description:
          "Realtime time attendance key in and out rely on setup location which user can choose work from home, work from office or flexible mode, manage shift. Time attendance could help in time tracking and overtime payment and payroll automatically upon organizational setting which could reduce working time and workload of administrative tasks.",
        background: "companyLanding/intern-data-management.png",
      },
      {
        title: "Leave Request",
        description:
          "Interns can fill in their leave information to submit a leave request for that day. HR can approve or disapprove the leave through the website or application. You can also view the leave history of each intern.",
        background: "companyLanding/intern-data-management.png",
      },
    ],
    [
      {
        title: "Internship",
        description:
          "Internship Data Management provides real-time data updates for both interns and corporate users. It also stores apprentice documents online which can be downloaded by apprentices or organizations for further use.",
        background: "companyLanding/intern-data-management.png",
      },
      {
        title: "Time ",
        description:
          "Realtime time attendance key in and out rely on setup location which user can choose work from home, work from office or flexible mode, manage shift. Time attendance could help in time tracking and overtime payment and payroll automatically upon organizational setting which could reduce working time and workload of administrative tasks.",
        background: "companyLanding/intern-data-management.png",
      },
      {
        title: "Leave",
        description:
          "Interns can fill in their leave information to submit a leave request for that day. HR can approve or disapprove the leave through the website or application. You can also view the leave history of each intern.",
        background: "companyLanding/intern-data-management.png",
      },
    ],
  ];

  const newFeatures = [
    [
      {
        title: "Recruitment",
        description:
          "Streamline data handling with robust solutions for storing, organizing, and accessing critical internship information efficiently and securely.",
        background: "companyLanding/upcoming/rec.png",
      },
      {
        title: "Application Tracking System",
        description:
          "Keep track of all applications in one place, making it easier to manage candidates, track their progress, and communicate effectively with them throughout the hiring process.",
        background: "companyLanding/upcoming/track.png",
      },
      {
        title: "Approval System",
        description:
          "HR has the right to approve the actions of interns. Whether it is the process of applying for an internship or requesting leave from work and paying allowances.",
        background: "companyLanding/upcoming/approve.png",
      },
    ],
    [
      {
        title: "Ability testing system",
        description:
          "There is a system to create a test for applicants for each position. To test the applicant's specific potential in that field.",
        background: "companyLanding/upcoming/20.png",
      },
      {
        title: "Deep Data Analytics",
        description:
          "Deep Data Analytics is used to summarize data to provide a more holistic view of the data, such as dashboards, etc., to help with decision-making and monthly or yearly reports.",
        background: "companyLanding/upcoming/19.png",
      },
      {
        title: "Internship",
        description:
          "Internship Data Management provides real-time data updates for both interns and corporate users. It also stores apprentice documents online which can be downloaded by apprentices or organizations for further use.",
        background: "companyLanding/intern-data-management.png",
      },
    ],
  ];

  const [category, setCategory] = useState<"month" | "year">("month");
  const priceData = category === "month" ? monthly : yearly;
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentFeatureGroup, setCurrentFeatureGroup] = useState(0);
  const prevSlide = () => {
    setCurrentGroup((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentGroup((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevFeatureSlide = () => {
    setCurrentGroup((prev) => (prev === 0 ? newFeatures.length - 1 : prev - 1));
  };

  const nextFeatureSlide = () => {
    setCurrentGroup((prev) => (prev === newFeatures.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Hello content */}
      <div className='hello-content px-10 pb-20 flex items-center justify-between flex-wrap w-full overflow-x-auto'>
        {/* Left Section */}
        <div className='left-hello flex-1 space-y-6 origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          <div className='title space-y-2'>
            <h1 className='text-4xl font-semibold'>Hi. Welcome to</h1>
            <h1 className='text-4xl font-extrabold bg-gradient-to-r from-[#323438] via-[#474BC2] to-[#888BEA] bg-clip-text text-transparent animate-gradient-x'>
              INTERNPLUS
            </h1>
          </div>
          <h3 className='text-xl'>
            Internship application system by Vanness Plus Consulting Co., Ltd.
          </h3>
          <div className='apply-button'>
            <Link
              href='/program'
              className='text-md inline-block px-10 py-3 bg-[#474BC2] text-white rounded-sm hover:bg-gradient-to-r from-[#323438] via-[#474BC2] to-[#888BEA] transition duration-300'>
              Apply Now
            </Link>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className='img flex-1 flex justify-center mt-10 md:mt-0'>
          <Image
            width={500}
            height={400}
            priority
            quality={100}
            src='/laptop-icon-1.png'
            alt='Laptop Icon'
            className='w-full max-w-[500px] h-auto'
          />
        </div>
      </div>

      {/* About Us */}
      <div className='about-us py-16 px-10 bg-[#F3F5FC] w-full overflow-x-auto'>
        <div className='mx-10 origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          <div className='title text-center text-4xl font-extrabold mb-10'>
            About Us
          </div>
          <div className='services flex justify-center gap-5'>
            {services.map((service, idx) => (
              <div
                key={idx}
                className='rounded-lg p-8 flex flex-col items-center text-center'>
                <div className='img mb-4'>
                  <Image
                    width={100}
                    height={100}
                    src={service.url}
                    alt={`${service.name}-img`}
                    className='w-full max-w-[200px] h-auto'
                  />
                </div>
                <div className='title text-xl font-bold mb-2'>
                  {service.name}
                </div>
                <div className='description text-base text-gray-600'>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company */}
      {/* Hello Content */}
      <div
        id='company'
        className='px-10 hello-content flex-col py-20 items-center justify-between flex-wrap gap-8 px-6 w-full overflow-x-auto'>
        {/* Left Side */}
        <div className='hello-content-left flex justify-between flex-wrap origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          <div className='flex flex-col space-y-3 lg:pt-20 '>
            <div className='normal-text text-4xl font-extrabold'>
              Hi. Welcome To
            </div>
            <div className='color-text text-4xl font-extrabold bg-gradient-to-r from-[#323438] via-[#474BC2] to-[#888BEA] bg-clip-text text-transparent animate-gradient-x'>
              InternPlus
            </div>

            <div className='line-text flex items-center gap-3 space-x-10'>
              <div className='line w-35 h-1 bg-[#323438]'></div>
              <div className='text text-[#323438] text-lg font-extrabold uppercase tracking-[6px]'>
                All About HR Ease
              </div>
            </div>

            <div className='buttons flex gap-4 mt-6'>
              <Link
                href='#'
                className='free-trial text-center py-5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition flex-1'>
                Free Trial
              </Link>
              <Link
                href='#'
                className='demo text-center py-5  bg-[#B1BBE7] rounded-sm hover:bg-[#9dabeb] flex-1'>
                Request Demo
              </Link>
            </div>
          </div>
          <div
            className='img-icon hidden md:flex justify-end lg:w-1/2
          '>
            <Image
              width={400}
              height={100}
              priority
              quality={100}
              src='/landing/briefcase-icon.png'
              alt='Briefcase Icon'
              className='w-full max-w-[500px] h-auto'
            />
          </div>
        </div>
        {/* Right Side */}
        <div className='hello-content-right flex flex-col mt-10 origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          <div className='texts text-center font-medium text-base text-[#323438] space-y-2'>
            <p className='text-end'>
              We are all about HR ease to support all HR functions
            </p>
            <p className='text-end'>
              that could ease your business&apos;s HR operation and management.
            </p>
            <p className='text-end'>
              Looking for HR Manager? Check out pricing or appoint for Demo
              here.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed About Us */}
      <div className='about-us bg-[#F3F5FC] px-10 py-10 md:py-16 flex flex-col md:flex-row gap-12 w-full oveflow-x-auto'>
        {/* Left About */}
        <div className='left-about sm:w-full md:w-1/2 flex flex-col gap-6 origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          {/*  Title  */}
          <div className='title text-4xl font-extrabold text-[#323438]'>
            About Us
          </div>

          {/*  Divider */}
          <div className='divider w-full h-1 bg-[#474BC2]'></div>

          {/*  Paragraph */}
          <div className='paragraph text-lg font-medium text-[#323438] leading-relaxed space-y-4 sm:pt-10 md:pt-55'>
            <p className='w-3/4 w-full md:w-[80%] text-base'>
              Recruiting interns is hard or even harder this time. You just need
              a reliable HR who could do these jobs along with our tool. Your
              Human Resource Management would become easy tasks for your team
              and company. With a reasonably low price and reliable tools, “NO
              MORE” multiple Excel are needed. Human Error now would be
              eliminated from your workflow — less complaint and more compliment
              could be engaged.
            </p>
          </div>
        </div>

        {/* Right About */}
        <div className='right-about md:w-1/2 flex flex-col gap-6 md:pt-15 origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          {/* Top paragraph */}
          <div className='paragraph font-medium text-[#323438] leading-relaxed'>
            <p className='w-3/4 sm:w-full text-lg'>
              All in one HRM application to support your business on HR
              operation cloud based, available ANY TIME & ANY WHERE now.
              InternPlus is flexible and easy to use regardless of your desire.
            </p>
          </div>

          {/*  Function List  */}
          <div className='functions space-y-4 md:mt-10 md:pt-0'>
            <div className='function-title text-2xl font-bold text-[#474BC2]'>
              Our Functions Include:
            </div>

            {/* Grid of function blocks */}
            <div className='flex flex-wrap justify-start sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {functions.map((func, index) => (
                <div
                  key={index}
                  className='function-block text-[#323438] border border-[#323438] px-4 py-3 rounded-sm text-center font-medium whitespace-nowrap'>
                  {func}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Package & Pricing */}
      <div className='package-price w-full py-8 text-center pt-20 overflow-x-auto'>
        {/* Title */}
        <div className='title text-4xl font-extrabold mb-10 text-[#474BC2] origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          Package and Pricing
        </div>

        {/* Divider + content */}
        <div className='divider-content flex items-center justify-center gap-10 mb-6 origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          <div className='line w-30 h-1 bg-[#323438]' />
          <div className='content font-extrabold text-[#323438] text-xl uppercase'>
            Choose what best suited
          </div>
        </div>

        {/* Category Switcher */}
        <div className='price-category flex justify-center items-center gap-4 mb-8 bg-[#F3F5FC] w-fit p-2 m-auto font-bold text-lg origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          <button
            className={`px-4 py-2 rounded-sm ${
              category === "month" ? "bg-white" : "bg-[#F3F5FC]"
            }`}
            onClick={() => setCategory("month")}>
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-sm ${
              category === "year" ? "bg-white" : "bg-[#F3F5FC]"
            }`}
            onClick={() => setCategory("year")}>
            Yearly
          </button>
        </div>

        {/* Price Cards */}
        <PriceCard
          category={category}
          monthly={monthly}
          yearly={yearly}
        />

        {/* Compare Table */}
        <div className='my-10 pt-10 px-10 bg-[#F3F5FC] w-full overflow-x-auto'>
          {/* 内部容器做缩放 */}
          <div className='inline-block min-w-full transform scale-100 sm:scale-90 xs:scale-80 origin-top-left'>
            <table className='text-start border-collapse m-auto'>
              {/* 表头 */}
              <thead className='table-header-group'>
                <tr>
                  <td className='text-[#474BC2] font-extrabold text-4xl pr-6'>
                    Compare Features
                  </td>
                  {priceData.map((pkg, idx) => (
                    <td
                      key={idx}
                      className='p-5 w-80'>
                      <div className='package border-2 border-[#8C97C9] rounded-sm px-6 py-4 gap-3 flex flex-col'>
                        <div className='icon bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mb-2'>
                          <Image
                            width={24}
                            height={24}
                            src={pkg.icon}
                            alt={pkg.type + "-icon"}
                            className=''
                          />
                        </div>
                        <div className='type font-semibold text-xl'>
                          {pkg.type}
                        </div>
                        <div className='flex justify-start items-center'>
                          <div className='price font-extrabold text-2xl'>
                            {pkg.price}
                          </div>
                          <div className='unit font-medium text-lg'>
                            &nbsp;{pkg.unit}
                          </div>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>

              {/* 表体 */}
              <tbody className='block table-row-group'>
                {features.map((feature, idx) => (
                  <tr
                    key={idx}
                    className='block table-row border-none mb-0'>
                    {feature.map((detail, dIdx) => {
                      if (typeof detail === "string") {
                        const isHighlight =
                          detail.includes("users") ||
                          detail.includes("devices") ||
                          detail === "Unlimited";
                        return (
                          <td
                            key={dIdx}
                            className='block table-cell p-5 text-left'>
                            <div
                              className={`rounded-sm font-medium text-lg ${
                                isHighlight
                                  ? "bg-[#B1BBE7] text-center p-5"
                                  : ""
                              }`}>
                              {detail}
                            </div>
                          </td>
                        );
                      } else if (detail === true) {
                        return (
                          <td
                            key={dIdx}
                            className='block table-cell p-5 text-center'>
                            <div className='bg-[#B1BBE7] rounded-sm p-3 sm:p-5 flex items-center justify-center'>
                              <Image
                                width={24}
                                height={24}
                                src='/companyLanding/checkbox-checked.png'
                                alt='checked'
                              />
                            </div>
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={dIdx}
                            className='table-cell'></td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product & Services Elements */}
      <div className='product-services mt-10 px-10 h-full w-full overflow-x-auto'>
        <div className='title text-4xl font-bold mb-8 origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          Product & Services Elements
        </div>
        <div className='xl:grid xl:grid-cols-8 gap-10 p-10 h-full flex flex-col origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px]'>
          {products[currentGroup].map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              expandedIndex={expandedIndex}
              onToggle={setExpandedIndex}
            />
          ))}
          <div className='buttons col-start-8 row-start-2 flex justify-end items-center space-x-3'>
            <button
              onClick={prevSlide}
              disabled={currentGroup === 0}
              className='p-3 bg-white rounded-full cursor-pointer'>
              <svg
                width='35'
                height='35'
                viewBox='0 0 35 35'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                {currentGroup === 0 ? (
                  <>
                    <g opacity='0.6'>
                      <path
                        d='M24.5 16.6992H10.4547'
                        stroke='#898989'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M17.4766 23.269L10.4539 16.6995L17.4766 10.1299'
                        stroke='#898989'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <circle
                        cx='17.0884'
                        cy='17.0874'
                        r='15.8374'
                        transform='rotate(180 17.0884 17.0874)'
                        stroke='#898989'
                        strokeWidth='2.5'
                      />
                    </g>
                  </>
                ) : (
                  <>
                    <path
                      d='M24.5 16.6992H10.4547'
                      stroke='#323438'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M17.4766 23.269L10.4539 16.6995L17.4766 10.1299'
                      stroke='#323438'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <circle
                      cx='17.9116'
                      cy='17.0874'
                      r='15.8374'
                      stroke='#323438'
                      strokeWidth='2.5'
                    />
                  </>
                )}
              </svg>
            </button>

            {/* 右箭头 */}
            <button
              onClick={nextSlide}
              disabled={currentGroup === 1}
              className='p-3 bg-white rounded-full cursor-pointer'>
              <svg
                width='35'
                height='35'
                viewBox='0 0 35 35'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                {currentGroup === 1 ? (
                  <>
                    <g opacity='0.6'>
                      <path
                        d='M10.5 17.4756H24.5453'
                        stroke='#898989'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M17.5234 10.9058L24.5461 17.4753L17.5234 24.0449'
                        stroke='#898989'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <circle
                        cx='17.0884'
                        cy='17.0874'
                        r='15.8374'
                        transform='rotate(180 17.0884 17.0874)'
                        stroke='#898989'
                        strokeWidth='2.5'
                      />
                    </g>
                  </>
                ) : (
                  <>
                    <path
                      d='M10.5 17.4756H24.5453'
                      stroke='#323438'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M17.5234 10.9058L24.5461 17.4753L17.5234 24.0449'
                      stroke='#323438'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <circle
                      cx='17.9116'
                      cy='17.0874'
                      r='15.8374'
                      stroke='#323438'
                      strokeWidth='2.5'
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Services */}
      <div className='p-10 upcoming bg-[#F3F5FC] w-full overflow-x-auto'>
        <div>
          {/*  Title  */}
          <div className='font-[#323438] mb-5 title text-4xl font-extrabold text-[#323438]'>
            What's Upcoming Features
          </div>

          {/*  Divider */}
          <div className='flex space-x-5'>
            <div className='divider w-full h-1 bg-[#323438]'></div>
            <div className='uppercase font-bold text-2xl'>
              Upcoming features you should know
            </div>
          </div>
        </div>
        <div className='featureCard gap-10 p-10 h-full flex flex-col  xl:flex-row origin-top-left transform scale-100 sm:scale-90 xs:scale-80 mx-auto max-w-[1440px'>
          {newFeatures[currentFeatureGroup].map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
