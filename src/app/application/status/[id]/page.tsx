"use client";
import Head from "@/components/status/head/Head";
import { use } from "react";
import SubmitPending from "@/components/status/SubmitPending";
import RIA from "@/components/status/RIA/RIA";
import RID from "@/components/status/RID/RID";
import AcceptanceTerms from "@/components/status/ACT/AcceptanceTerms";
import ApplySuccess from "@/components/status/ApplySuccess";

type HeadProps = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  applicationId: string;
  position: string;
  type: string;
};

type Status =
  | "pending"
  | "request_application"
  | "request_document"
  | "acceptance_terms"
  | "success"
  | "reject";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StatusPage({ params }: PageProps) {
  const status: Status = "success"; // Replace with actual status logic
  const testApplication: HeadProps = {
    fname: "John",
    lname: "Doe",
    email: "zishun.d.gao@gmail.com",
    phone: "+1234567890",
    applicationId: "123456789",
    position: "Software Engineer Intern",
    type: "Full-time",
  };

  const statusComponents: Record<string, React.ReactNode> = {
    pending: <SubmitPending />,
    request_application: <RIA />,
    request_document: <RID />,
    acceptance_terms: <AcceptanceTerms />,
    success: (
      <ApplySuccess
        title='UX/UI Designer Trainee'
        startDate='Nov 25th, 2024'
      />
    ), // replace with real component if needed
    reject: <></>, // replace with real component if needed
  };
  return (
    <>
      <Head {...testApplication} />
      {statusComponents[status] ?? null}
    </>
  );
}
