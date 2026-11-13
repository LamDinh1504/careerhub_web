import type { FormEvent } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { COMPANY_LOCATIONS } from "../data";
import type { CompaniesCopy } from "../copy";
import styles from "../Companies.module.css";

interface CompaniesSearchBarProps {
  keyword: string;
  location: string;
  copy: CompaniesCopy;
  onKeywordChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
}

export function CompaniesSearchBar({ keyword, location, copy, onKeywordChange, onLocationChange, onSearch }: CompaniesSearchBarProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className={styles.searchForm} onSubmit={submit} role="search">
      <div className={styles.field}>
        <label htmlFor="company-keyword">{copy.searchLabel}</label>
        <div className={styles.inputWrap}>
          <LuSearch aria-hidden="true" />
          <input id="company-keyword" type="search" value={keyword} placeholder={copy.searchPlaceholder} onChange={(event) => onKeywordChange(event.target.value)} />
          {keyword && <button type="button" className={styles.clearButton} aria-label={copy.clearKeyword} onClick={() => onKeywordChange("")}><LuX aria-hidden="true" /></button>}
        </div>
      </div>
      <div className={styles.searchRow}>
        <div className={styles.field}>
          <label htmlFor="company-location">{copy.locationLabel}</label>
          <select id="company-location" value={location} onChange={(event) => onLocationChange(event.target.value)}>
            <option value="">{copy.allLocations}</option>
            {COMPANY_LOCATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <button type="submit" className={styles.primaryButton}><LuSearch aria-hidden="true" />{copy.search}</button>
      </div>
    </form>
  );
}
