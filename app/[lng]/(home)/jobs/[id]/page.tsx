import type { Metadata } from "next";
import { JobDetailView, getJobDetailById } from "@/modules/job-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = getJobDetailById(id);

  return {
    title: `${job.title} | ${job.company} - CareerHub`,
    description: `Tuyển dụng vị trí ${job.title} tại ${job.company}. Mức lương: ${job.salary}, địa điểm: ${job.location}.`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ lng: string; id: string }>;
}) {
  const { lng, id } = await params;
  const job = getJobDetailById(id);

  return <JobDetailView job={job} lng={lng} />;
}

