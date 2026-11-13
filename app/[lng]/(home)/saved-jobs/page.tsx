import type { Metadata } from "next";
import { SavedJobsView } from "@/modules/saved-jobs";

interface SavedJobsPageProps { params: Promise<{ lng: string }>; }

export const metadata: Metadata = {
  title: "Việc làm đã lưu | CareerHub",
  description: "Quản lý việc làm đã lưu và theo dõi tiến độ ứng tuyển trên CareerHub.",
};

export default async function SavedJobsPage({ params }: SavedJobsPageProps) {
  const { lng } = await params;
  return <SavedJobsView lng={lng} />;
}
