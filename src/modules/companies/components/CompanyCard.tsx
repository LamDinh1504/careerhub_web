import Link from "next/link";
import { LuArrowUpRight, LuMapPin, LuBriefcaseBusiness } from "react-icons/lu";
import { categoryLabel, type CompaniesCopy } from "../copy";
import type { Company, CompanyLocale } from "../types";
import { CompanyLogo } from "./CompanyLogo";
import styles from "../Companies.module.css";

interface CompanyCardProps {
  company: Company;
  locale: CompanyLocale;
  copy: CompaniesCopy;
}

export function CompanyCard({ company, locale, copy }: CompanyCardProps) {
  return (
    <article className={styles.companyCard}>
      <div className={styles.cardTop}>
        <CompanyLogo name={company.name} src={company.logo} />
        <span className={styles.jobCount}><LuBriefcaseBusiness aria-hidden="true" />{company.jobs.length} {copy.jobs}</span>
      </div>
      <h3>{company.name}</h3>
      <p className={styles.location}><LuMapPin aria-hidden="true" />{company.locations.join(" · ")}</p>
      <p className={styles.discipline}>{company.categories.map((category) => categoryLabel(category, locale)).join(" · ")}</p>
      <div className={styles.cardFoot}>
        <p>{copy.hiringIn}<strong>{company.jobs[0].title}</strong></p>
        <Link href={`/${locale}/companies/${company.id}`} className={styles.cardLink} aria-label={copy.viewJobs + " · " + company.name}><LuArrowUpRight aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
