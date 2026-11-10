"use client";

import React from "react";
import {
  HeroSection,
  PartnersBanner,
  CategorySection,
  FeaturedJobsSection,
  HowItWorksSection,
  CareerGuidesSection,
  EmployerCtaBanner,
} from "./components";

interface HomeViewProps {
  lng?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({ lng = "vi" }) => {
  return (
    <div className="w-full flex flex-col bg-white" data-page-kind="service">
      <HeroSection lng={lng} />
      <PartnersBanner />
      <CategorySection lng={lng} />
      <FeaturedJobsSection lng={lng} />
      <HowItWorksSection lng={lng} />
      <CareerGuidesSection lng={lng} />
      <EmployerCtaBanner lng={lng} />
    </div>
  );
};

