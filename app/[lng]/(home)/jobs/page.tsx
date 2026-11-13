import { JobsView } from "@/modules/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm kiếm việc làm | CareerHub",
  description:
    "Khám phá hàng ngàn cơ hội việc làm hấp dẫn từ các doanh nghiệp hàng đầu tại CareerHub.",
};

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ company?: string | string[] }>;
}) {
  const [{ lng }, query] = await Promise.all([params, searchParams]);
  const company = typeof query.company === "string" ? query.company : "";
  return <JobsView key={company} lng={lng} initialCompany={company} />;
}