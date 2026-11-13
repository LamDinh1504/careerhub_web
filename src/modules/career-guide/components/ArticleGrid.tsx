import type { CareerArticle } from "../types";
import { ArticleCard } from "./ArticleCard";

export function ArticleGrid({ articles, lng }: { articles: CareerArticle[]; lng: string }) {
  return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <ArticleCard key={article.slug} article={article} lng={lng} />)}</div>;
}
