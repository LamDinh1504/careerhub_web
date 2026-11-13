import type { Metadata } from "next";
import { CareerGuideView } from "@/modules/career-guide";

export const metadata: Metadata = {
  title: "Cẩm nang nghề nghiệp | CareerHub",
  description: "Hướng dẫn thực tế về CV, phỏng vấn, kỹ thuật IT và phát triển nghề nghiệp.",
};

export default async function CareerGuidePage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return <CareerGuideView lng={lng} />;
}
