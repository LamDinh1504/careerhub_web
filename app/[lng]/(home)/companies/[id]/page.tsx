import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyDetailView, getCompanyDetailById, getCompanyDetailIds } from "@/modules/company-detail";

export function generateStaticParams() {
  return ["vi", "en"].flatMap((lng) => getCompanyDetailIds().map((id) => ({ lng, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string; id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const company = getCompanyDetailById(id);
  if (!company) return { title: "Công ty không tồn tại | CareerHub" };
  return {
    title: `${company.name} | CareerHub`,
    description: `${company.name}: thông tin công ty, văn hóa và các vị trí đang tuyển trên CareerHub.`,
    openGraph: { title: `${company.name} | CareerHub`, description: company.description, type: "profile" },
  };
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ lng: string; id: string }> }) {
  const { lng, id } = await params;
  const company = getCompanyDetailById(id);
  if (!company) notFound();
  return <CompanyDetailView company={company} lng={lng} />;
}
