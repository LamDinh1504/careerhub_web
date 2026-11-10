export interface Job {
  id: string;
  title: string;
  company: string;
  companyIcon?: string;
  salary: string;
  location: string;
  tags: string[];
  badge?: string;
  badgeVariant?: "featured" | "urgent" | "new";
  postedAt: string;
  isBookmarked?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: string;
  iconType: "code" | "marketing" | "finance" | "design";
  href: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  width?: number;
  height?: number;
  tagline?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface GuideArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

export type JobFilterTab = "all" | "latest" | "salary" | "remote";

