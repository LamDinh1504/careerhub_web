import type { Metadata } from "next";
import { CompaniesView } from "@/modules/companies";

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const title = lng === "en" ? "Company directory | CareerHub" : "Danh sách công ty | CareerHub";
  const description = lng === "en"
    ? "Find companies by open roles and location on CareerHub."
    : "Tìm công ty theo vị trí tuyển dụng và địa điểm trên CareerHub.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    other: { "page-type": "software", "site-kind": "software" },
  };
}

export default async function CompaniesPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return <CompaniesView lng={lng} />;
}
