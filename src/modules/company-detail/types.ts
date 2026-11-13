import type { Job } from "@/modules/jobs/types";

export interface CompanyBenefit {
  icon: "heart" | "sparkles" | "book" | "home" | "users" | "shield";
  title: string;
  description: string;
}

export interface CompanyDetail {
  id: string;
  name: string;
  logo: string;
  banner: string;
  verified: boolean;
  industry: string;
  size: string;
  foundedYear: number;
  address: string;
  website: string;
  description: string;
  culture: string;
  benefits: CompanyBenefit[];
  photos: string[];
  openJobs: Job[];
  socialLinks?: Array<{ label: string; url: string }>;
}

export type CompanyDetailTab = "overview" | "jobs" | "culture" | "photos";
