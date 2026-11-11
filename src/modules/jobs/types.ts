export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  verified?: boolean;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Freelance";
  workplaceType: "On-site" | "Hybrid" | "Remote";
  category: string;
  experience?: string;
  isBookmarked?: boolean;
  postedAt?: string;
  description?: string;
}

export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export interface HeroCardItem {
  id: number;
  image: string;
  iconType: "search" | "handshake" | "users";
  title: string;
  subtitle: string;
}

export interface JobFilters {
  keyword: string;
  category: string;
  location: string;
  jobType: string;
  experience: string;
  salaryMax: number;
}

