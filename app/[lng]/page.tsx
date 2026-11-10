import { HomeView } from "@/modules/home";

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return <HomeView lng={lng} />;
}
