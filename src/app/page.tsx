/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// src/app/page.tsx
import Image from "next/image";
import { useState } from "react";
import PriceCard from "@/components/PriceCard";
import ProductCard from "@/components/ProductCard";
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
  ];

  const [category, setCategory] = useState<"month" | "year">("month");
  const priceData = category === "month" ? monthly : yearly;
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <>
      {/* Hello content */}
      <div className='hello-content mx-10 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between'>
        {/* Left Section */}
        <div className='left-hello text-center md:text-left flex-1 space-y-6'>
          <div className='title space-y-2'>
            <h1 className='text-4xl md:text-6xl font-semibold'>
              Hi. Welcome to
            </h1>
            <h1 className='text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#323438] via-[#474BC2] to-[#888BEA] bg-clip-text text-transparent animate-gradient-x'>
              INTERNPLUS
            </h1>
          </div>
          <h3 className='text-base md:text-2xl font-medium'>
            Internship application system by Vanness Plus Consulting Co., Ltd.
          </h3>
          <div className='apply-button'>
            <Link
              href='/program'
              className='inline-block px-6 py-3 bg-[#474BC2] text-white rounded-sm hover:bg-gradient-to-r from-[#323438] via-[#474BC2] to-[#888BEA] transition duration-300'>
              Apply Now
            </Link>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className='img flex-1 flex justify-center mt-10 md:mt-0'>
          <Image
            width={400}
            height={300}
            priority
            quality={100}
            src='/laptop-icon-1.png'
            alt='Laptop Icon'
            className='w-full max-w-xs md:max-w-md lg:max-w-lg'
          />
        </div>
      </div>

      {/* About Us */}
      <div className='about-us py-16 px-4 bg-[#F3F5FC]'>
        <div className='mx-10'>
          <div className='title text-center text-4xl md:text-5xl font-extrabold mb-10'>
            About Us
          </div>
          <div className='services grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {services.map((service, idx) => (
              <div
                key={idx}
                className='bg-white rounded-lg shadow p-8 flex flex-col items-center text-center'>
                <div className='img mb-4'>
                  <Image
                    width={100}
                    height={100}
                    src={service.url}
                    alt={`${service.name}-img`}
                    className='h-32 object-contain'
                  />
                </div>
                <div className='title text-2xl font-bold mb-2'>
                  {service.name}
                </div>
                <div className='description text-base md:text-lg text-gray-600'>
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
        className='hello-content flex flex-col bg-[#F3F5FC] py-20 md:flex-row items-center justify-between gap-8 px-6'>
        {/* Left Side */}
        <div className='hello-content-left flex flex-col gap-4 md:w-1/2'>
          <div className='normal-text text-4xl font-extrabold'>
            Hi. Welcome To
          </div>
          <div className='color-text text-4xl font-extrabold bg-gradient-to-r from-[#323438] via-[#474BC2] to-[#888BEA] bg-clip-text text-transparent animate-gradient-x'>
            InternPlus
          </div>

          <div className='line-text flex items-center gap-3 space-x-10'>
            <div className='line w-35 h-1 bg-[#323438]'></div>
            <div className='text text-[#323438] text-xl font-extrabold uppercase tracking-[6px]'>
              All About HR Ease
            </div>
          </div>

          <div className='buttons flex gap-4 mt-6'>
            <Link
              href='#'
              className='free-trial px-20 py-5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition'>
              Free Trial
            </Link>
            <Link
              href='#'
              className='demo px-20 py-5  bg-[#B1BBE7] rounded-sm hover:bg-[#9dabeb] '>
              Request Demo
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className='hello-content-right flex flex-col items-center md:items-start gap-6 md:w-1/2'>
          <div className='img-icon'>
            <Image
              width={135}
              height={135}
              priority
              quality={100}
              src='/landing/briefcase-icon.png'
              alt='Briefcase Icon'
              className='w-60 h-60 md:w-135 md:h-135'
            />
          </div>
          <div className='texts text-center font-medium text-md md:text-xl text-[#323438] md:text-lef space-y-2'>
            <p className='md:text-end'>
              We are all about HR ease to support all HR functions
            </p>
            <p className='md:text-end'>
              that could ease your business&apos;s HR operation and management.
            </p>
            <p className='md:text-end'>
              Looking for HR Manager? Check out pricing or appoint for Demo
              here.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed About Us */}
      <div className='about-us bg-white px-6 md:px-20 py-16 flex flex-col md:flex-row gap-12 my-10'>
        {/* Left About */}
        <div className='left-about sm:w-full md:w-1/2 flex flex-col gap-6'>
          {/*  Title  */}
          <div className='title text-4xl font-extrabold text-[#323438]'>
            About Us
          </div>

          {/*  Divider */}
          <div className='divider w-full h-1 bg-[#474BC2]'></div>

          {/*  Paragraph */}
          <div className='paragraph text-lg font-medium text-[#323438] leading-relaxed space-y-4 sm:pt-10 md:pt-40'>
            <p className='w-3/4 sm:w-full'>
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
        <div className='right-about md:w-1/2 flex flex-col gap-6 md:pt-15'>
          {/* Top paragraph */}
          <div className='paragraph text-lg font-medium text-[#323438] leading-relaxed'>
            <p className='w-3/4 sm:w-full '>
              All in one HRM application to support your business on HR
              operation cloud based, available ANY TIME & ANY WHERE now.
              InternPlus is flexible and easy to use regardless of your desire.
            </p>
          </div>

          {/*  Function List  */}
          <div className='functions space-y-4 pt-15 md:pt-0'>
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
      <div className='package-price w-full px-4 py-8 text-center my-10 pt-20'>
        {/* Title */}
        <div className='title text-6xl font-extrabold mb-10 text-[#474BC2]'>
          Package and Pricing
        </div>

        {/* Divider + content */}
        <div className='divider-content flex items-center justify-center gap-10 mb-6'>
          <div className='line w-30 h-1 bg-[#323438]' />
          <div className='content font-extrabold text-[#323438] text-xl uppercase'>
            Choose what best suited
          </div>
        </div>

        {/* Category Switcher */}
        <div className='price-category flex justify-center items-center gap-4 mb-8 bg-[#F3F5FC] w-fit p-2 m-auto font-bold text-lg'>
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
        <div className='mt-12'>
          <table className='text-start border-collapse m-auto w-full'>
            <thead className='hidden sm:table-header-group'>
              <tr>
                <td className='text-[#474BC2] font-extrabold text-2xl sm:text-4xl pr-6'>
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
                          className='w-6 h-6'
                        />
                      </div>
                      <div className='type font-semibold text-xl'>
                        {pkg.type}
                      </div>
                      <div className='flex justify-start items-center'>
                        <div className='price font-extrabold text-4xl'>
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

            <tbody className='block sm:table-row-group'>
              {features.map((feature, idx) => (
                <tr
                  key={idx}
                  className='block sm:table-row border-b sm:border-none mb-6 sm:mb-0'>
                  {feature.map((detail, dIdx) => {
                    if (typeof detail === "string") {
                      const isHighlight =
                        detail.includes("users") ||
                        detail.includes("devices") ||
                        detail === "Unlimited";
                      return (
                        <td
                          key={dIdx}
                          className='block sm:table-cell p-3 sm:p-5 text-center sm:text-left'>
                          <div
                            className={`rounded-sm font-medium text-lg sm:text-2xl ${
                              isHighlight
                                ? "bg-[#B1BBE7] text-center p-3 sm:p-5"
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
                          className='block sm:table-cell p-3 sm:p-5 text-center'>
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
                          className='hidden sm:table-cell'></td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product & Services Elements */}
      <div className='product-services p-10 m-20 h-full'>
        <div className='title text-3xl font-bold mb-8'>
          Product & Services Elements
        </div>
        <div className='xl:grid xl:grid-cols-8 gap-10 p-10 h-full flex flex-col'>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              expandedIndex={expandedIndex}
              onToggle={setExpandedIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
}
