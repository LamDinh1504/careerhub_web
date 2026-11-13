import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareerArticleView, getCareerArticleBySlug, getCareerArticleSlugs } from "@/modules/career-guide";

export function generateStaticParams() {
  return ["vi", "en"].flatMap((lng) => getCareerArticleSlugs().map((slug) => ({ lng, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getCareerArticleBySlug(slug);
  if (!article) return { title: "Bài viết không tồn tại | CareerHub" };
  return { title: `${article.title} | CareerHub`, description: article.excerpt, openGraph: { title: article.title, description: article.excerpt, type: "article" } };
}

export default async function CareerArticlePage({ params }: { params: Promise<{ lng: string; slug: string }> }) {
  const { lng, slug } = await params;
  const article = getCareerArticleBySlug(slug);
  if (!article) notFound();
  return <CareerArticleView article={article} lng={lng} />;
}
