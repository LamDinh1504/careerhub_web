import type { Job } from "@/modules/jobs/types";

export interface Company {
  id: string;
  name: string;
  logo: string;
  locations: string[];
  categories: string[];
  jobs: Job[];
}

export interface CompanyFilters {
  keyword: string;
  location: string;
  category: string;
}

export type CompanySort = "name" | "jobs";
export type CompanyLocale = "vi" | "en";
