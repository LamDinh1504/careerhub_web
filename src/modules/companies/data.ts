import { JOBS_LIST_DATA } from "@/modules/jobs/data";
import { removeVietnameseTones } from "@/utils/slug.utils";
import type { Company, CompanyFilters, CompanySort } from "./types";

// Correct visually checked assets: the original VNG, MoMo and Be filenames contain other brands.
const COMPANY_LOGOS: Record<string, string> = {
  "VNG Corporation": "/companies/vng-corporation.png",
  "MoMo": "/companies/momo-official.png",
  "Be Group": "/companies/be-official.png",
};

// Derived from the existing local job catalog. Replace this adapter when the companies API is available.
export const COMPANIES: Company[] = Array.from(
  JOBS_LIST_DATA.reduce((companies, job) => {
    const existing = companies.get(job.company);
    if (existing) {
      existing.jobs.push(job);
      if (!existing.locations.includes(job.location)) existing.locations.push(job.location);
      if (!existing.categories.includes(job.category)) existing.categories.push(job.category);
    } else {
      companies.set(job.company, {
        id: removeVietnameseTones(job.company),
        name: job.company,
        logo: COMPANY_LOGOS[job.company] ?? job.companyLogo,
        locations: [job.location],
        categories: [job.category],
        jobs: [job],
      });
    }
    return companies;
  }, new Map<string, Company>()).values(),
);

export const COMPANY_LOCATIONS = [...new Set(COMPANIES.flatMap((company) => company.locations))];
export const COMPANY_CATEGORIES = [...new Set(COMPANIES.flatMap((company) => company.categories))];
export const COMPANIES_PAGE_SIZE = 6;
export const EMPTY_FILTERS: CompanyFilters = { keyword: "", location: "", category: "" };

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().trim();

export function filterCompanies(filters: CompanyFilters, sort: CompanySort): Company[] {
  const keyword = normalize(filters.keyword);
  return COMPANIES.filter((company) =>
    (!keyword || normalize([company.name, ...company.jobs.map((job) => job.title)].join(" ")).includes(keyword)) &&
    (!filters.location || company.locations.includes(filters.location)) &&
    (!filters.category || company.categories.includes(filters.category)),
  ).sort((a, b) => {
    if (sort === "jobs" && a.jobs.length !== b.jobs.length) return b.jobs.length - a.jobs.length;
    return a.name.localeCompare(b.name, "vi");
  });
}
