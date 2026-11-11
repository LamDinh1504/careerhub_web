import { JobsView } from "@/modules/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm kiếm việc làm | CareerHub",
  description:
    "Khám phá hàng ngàn cơ hội việc làm hấp dẫn từ các doanh nghiệp hàng đầu tại CareerHub.",
};

export default async function JobsPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return <JobsView lng={lng} />;
}

