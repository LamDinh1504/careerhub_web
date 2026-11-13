import type { CompaniesCopy } from "../copy";
import type { CompanySort } from "../types";
import styles from "../Companies.module.css";

interface CompaniesToolbarProps {
  count: number;
  sort: CompanySort;
  copy: CompaniesCopy;
  onSortChange: (sort: CompanySort) => void;
}

export function CompaniesToolbar({ count, sort, copy, onSortChange }: CompaniesToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <p role="status" aria-live="polite" aria-atomic="true"><strong>{count}</strong> {copy.results}</p>
      <div className={styles.sort}>
        <label htmlFor="company-sort">{copy.sort}</label>
        <select id="company-sort" value={sort} onChange={(event) => onSortChange(event.target.value as CompanySort)}>
          <option value="name">{copy.sortName}</option>
          <option value="jobs">{copy.sortJobs}</option>
        </select>
      </div>
    </div>
  );
}
