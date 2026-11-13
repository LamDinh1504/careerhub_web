import Link from "next/link";
import { LuChevronRight, LuHouse } from "react-icons/lu";

export function CompanyBreadcrumbs({ lng, companyName }: { lng: string; companyName: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6B8679]">
      <Link href={`/${lng}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg hover:text-[#0D3B2E]">
        <LuHouse aria-hidden="true" className="h-4 w-4" />
        <span>Trang chủ</span>
      </Link>
      <LuChevronRight aria-hidden="true" className="h-4 w-4 text-[#A5B8AC]" />
      <Link href={`/${lng}/companies`} className="inline-flex min-h-11 items-center rounded-lg hover:text-[#0D3B2E]">Công ty</Link>
      <LuChevronRight aria-hidden="true" className="h-4 w-4 text-[#A5B8AC]" />
      <span className="max-w-[180px] truncate font-medium text-[#0D3B2E]" aria-current="page">{companyName}</span>
    </nav>
  );
}
