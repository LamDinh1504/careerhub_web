import { LuX } from "react-icons/lu";
import { COMPANY_CATEGORIES } from "../data";
import { categoryLabel, type CompaniesCopy } from "../copy";
import type { CompanyFilters, CompanyLocale } from "../types";
import styles from "../Companies.module.css";

interface CompaniesFiltersProps {
  filters: CompanyFilters;
  locale: CompanyLocale;
  copy: CompaniesCopy;
  onCategoryChange: (category: string) => void;
  onRemove: (key: keyof CompanyFilters) => void;
  onReset: () => void;
}

export function CompaniesFilters({ filters, locale, copy, onCategoryChange, onRemove, onReset }: CompaniesFiltersProps) {
  const activeFilters = (Object.entries(filters) as [keyof CompanyFilters, string][]).filter(([, value]) => value);
  return (
    <div className={styles.filters}>
      <fieldset>
        <legend>{copy.category}</legend>
        <div className={styles.categoryList}>
          {["", ...COMPANY_CATEGORIES].map((category) => (
            <button key={category} type="button" aria-pressed={filters.category === category} className={styles.categoryButton} onClick={() => onCategoryChange(category)}>
              {category ? categoryLabel(category, locale) : copy.allCategories}
            </button>
          ))}
        </div>
      </fieldset>
      {activeFilters.length > 0 && (
        <div className={styles.activeFilters}>
          {activeFilters.map(([key, value]) => (
            <button key={key} type="button" onClick={() => onRemove(key)} aria-label={copy.reset + ": " + value}>
              {key === "category" ? categoryLabel(value, locale) : value}<LuX aria-hidden="true" />
            </button>
          ))}
          <button type="button" className={styles.resetLink} onClick={onReset}>{copy.reset}</button>
        </div>
      )}
    </div>
  );
}
