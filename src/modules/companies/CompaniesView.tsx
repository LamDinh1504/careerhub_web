"use client";

import { useMemo, useState } from "react";
import { COMPANIES_PAGE_SIZE, EMPTY_FILTERS, filterCompanies } from "./data";
import { companiesCopy } from "./copy";
import type { CompanyFilters, CompanySort } from "./types";
import { CompaniesHero, CompaniesFilters, CompaniesToolbar, CompanyCard, CompaniesEmptyState, CompaniesPagination } from "./components";
import styles from "./Companies.module.css";

export function CompaniesView({ lng = "vi" }: { lng?: string }) {
  const locale = lng === "en" ? "en" : "vi";
  const copy = companiesCopy[locale];
  const [filters, setFilters] = useState<CompanyFilters>(EMPTY_FILTERS);
  const [draftKeyword, setDraftKeyword] = useState("");
  const [draftLocation, setDraftLocation] = useState("");
  const [sort, setSort] = useState<CompanySort>("name");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => filterCompanies(filters, sort), [filters, sort]);
  const visible = filtered.slice((page - 1) * COMPANIES_PAGE_SIZE, page * COMPANIES_PAGE_SIZE);

  function scrollToResults() {
    document.getElementById("companies-list")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
    document.getElementById("companies-heading")?.focus({ preventScroll: true });
  }

  function reset() {
    setFilters(EMPTY_FILTERS);
    setDraftKeyword("");
    setDraftLocation("");
    setPage(1);
  }

  function removeFilter(key: keyof CompanyFilters) {
    setFilters((current) => ({ ...current, [key]: "" }));
    if (key === "keyword") setDraftKeyword("");
    if (key === "location") setDraftLocation("");
    setPage(1);
  }

  return (
    <div className={styles.page} lang={locale}>
      <CompaniesHero
        copy={copy}
        keyword={draftKeyword}
        location={draftLocation}
        onKeywordChange={setDraftKeyword}
        onLocationChange={setDraftLocation}
        onSearch={() => {
          setFilters((current) => ({ ...current, keyword: draftKeyword.trim(), location: draftLocation }));
          setPage(1);
          scrollToResults();
        }}
        onCompanySelect={(name) => {
          setDraftKeyword(name);
          setDraftLocation("");
          setFilters({ ...EMPTY_FILTERS, keyword: name });
          setPage(1);
          scrollToResults();
        }}
      />
      <section id="companies-list" className={styles.directory} aria-labelledby="companies-heading">
        <div className={styles.container}>
          <div className={styles.directoryHeading}>
            <h2 id="companies-heading" tabIndex={-1}>{copy.directory}</h2>
            <p>{copy.directoryIntro}</p>
          </div>
          <CompaniesFilters filters={filters} locale={locale} copy={copy} onCategoryChange={(category) => { setFilters((current) => ({ ...current, category })); setPage(1); }} onRemove={removeFilter} onReset={reset} />
          <CompaniesToolbar count={filtered.length} sort={sort} copy={copy} onSortChange={(value) => { setSort(value); setPage(1); }} />
          {visible.length ? (
            <div className={styles.companyGrid}>
              {visible.map((company) => <CompanyCard key={company.id} company={company} locale={locale} copy={copy} />)}
            </div>
          ) : <CompaniesEmptyState copy={copy} onReset={reset} />}
          <CompaniesPagination page={page} total={filtered.length} copy={copy} onPageChange={(value) => { setPage(value); scrollToResults(); }} />
          <p className={styles.trademarks}>{copy.trademarks}</p>
        </div>
      </section>
    </div>
  );
}
