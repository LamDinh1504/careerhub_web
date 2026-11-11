export interface BenefitItem {
  iconType: "money" | "shield" | "laptop" | "education";
  title: string;
  subtitle?: string;
}

export interface CompanyInfo {
  name: string;
  logo: string;
  verified?: boolean;
  industry: string;
  size: string;
  description: string;
  address: string;
  website: string;
}

export interface SimilarJob {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  isBookmarked?: boolean;
}

export interface JobDetail {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  verified?: boolean;
  salary: string;
  location: string;
  jobType: string;
  level: string;
  experience: string;
  deadline: string;
  postedAt: string;
  viewsCount: number;
  isBookmarked?: boolean;
  description: string[];
  requirements: string[];
  benefits: BenefitItem[];
  companyInfo: CompanyInfo;
  similarJobs: SimilarJob[];
}

