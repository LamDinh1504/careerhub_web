import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { COMPANIES_PAGE_SIZE } from "../data";
import type { CompaniesCopy } from "../copy";
import styles from "../Companies.module.css";

interface CompaniesPaginationProps {
  page: number;
  total: number;
  copy: CompaniesCopy;
  onPageChange: (page: number) => void;
}

export function CompaniesPagination({ page, total, copy, onPageChange }: CompaniesPaginationProps) {
  const pages = Math.ceil(total / COMPANIES_PAGE_SIZE);
  if (!total) return null;
  return (
    <div className={styles.paginationRow}>
      <p>{copy.showing} {(page - 1) * COMPANIES_PAGE_SIZE + 1}–{Math.min(page * COMPANIES_PAGE_SIZE, total)} {copy.of} {total}</p>
      {pages > 1 && (
        <nav aria-label={copy.pagination} className={styles.pagination}>
          <button type="button" aria-label={copy.previous} disabled={page === 1} onClick={() => onPageChange(page - 1)}><LuChevronLeft aria-hidden="true" /></button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button key={number} type="button" aria-label={copy.page + " " + number} aria-current={page === number ? "page" : undefined} onClick={() => onPageChange(number)}>{number}</button>
          ))}
          <button type="button" aria-label={copy.next} disabled={page === pages} onClick={() => onPageChange(page + 1)}><LuChevronRight aria-hidden="true" /></button>
        </nav>
      )}
    </div>
  );
}
