import { LuSearchX } from "react-icons/lu";
import type { CompaniesCopy } from "../copy";
import styles from "../Companies.module.css";

export function CompaniesEmptyState({ copy, onReset }: { copy: CompaniesCopy; onReset: () => void }) {
  return (
    <div className={styles.emptyState}>
      <LuSearchX aria-hidden="true" />
      <h3>{copy.emptyTitle}</h3>
      <p>{copy.emptyDescription}</p>
      <button type="button" className={styles.primaryButton} onClick={onReset}>{copy.reset}</button>
    </div>
  );
}
