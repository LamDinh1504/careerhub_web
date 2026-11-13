import { LuArrowDown, LuArrowUpRight } from "react-icons/lu";
import { COMPANIES } from "../data";
import type { CompaniesCopy } from "../copy";
import { CompanyLogo } from "./CompanyLogo";
import { CompaniesSearchBar } from "./CompaniesSearchBar";
import styles from "../Companies.module.css";

interface CompaniesHeroProps {
  copy: CompaniesCopy;
  keyword: string;
  location: string;
  onKeywordChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
  onCompanySelect: (name: string) => void;
}

export function CompaniesHero({ copy, onCompanySelect, ...searchProps }: CompaniesHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="companies-title" data-enter>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{copy.eyebrow}</p>
            <h1 id="companies-title">{copy.title}</h1>
            <p className={styles.lead}>{copy.intro}</p>
            <CompaniesSearchBar copy={copy} {...searchProps} />
          </div>
          <div className={styles.spotlight} data-enter-media>
            <div className={styles.spotlightHeader}>
              <p>{copy.spotlight}</p>
              <LuArrowUpRight aria-hidden="true" />
            </div>
            <div className={styles.logoGrid}>
              {COMPANIES.slice(0, 6).map((company) => (
                <button key={company.id} type="button" className={styles.logoTile} onClick={() => onCompanySelect(company.name)} aria-label={company.name + " · " + copy.viewJobs}>
                  <CompanyLogo name={company.name} src={company.logo} large />
                  <span className={styles.tileName}>{company.name}</span>
                  <LuArrowUpRight className={styles.tileArrow} aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className={styles.spotlightNote}>{copy.spotlightNote}</p>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <p><strong>{COMPANIES.length}</strong> {copy.available}</p>
          <a href="#companies-list" className={styles.browseLink}>{copy.browse}<LuArrowDown aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
