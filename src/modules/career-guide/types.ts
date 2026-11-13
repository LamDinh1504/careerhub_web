export type CareerCategory = "Tất cả" | "Viết CV" | "Phỏng vấn" | "Kỹ thuật IT" | "Định hướng lương thưởng";

export interface CareerAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface CareerSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
}

export interface CareerArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<CareerCategory, "Tất cả">;
  image: string;
  author: CareerAuthor;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  sections: CareerSection[];
  relatedJobIds: string[];
}

export interface CareerFilters {
  keyword: string;
  category: CareerCategory;
}
