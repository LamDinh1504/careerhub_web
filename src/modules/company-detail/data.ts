import { COMPANIES } from "@/modules/companies/data";
import type { CompanyDetail, CompanyBenefit } from "./types";

const defaultBenefits: CompanyBenefit[] = [
  { icon: "heart", title: "Bảo hiểm đầy đủ", description: "Chăm sóc sức khỏe cho bạn và gia đình." },
  { icon: "book", title: "Học tập mỗi ngày", description: "Ngân sách học tập và chương trình mentoring." },
  { icon: "home", title: "Làm việc linh hoạt", description: "Không gian làm việc hỗ trợ hybrid và remote." },
  { icon: "users", title: "Đội ngũ cởi mở", description: "Trao đổi thẳng, cùng nhau giải quyết vấn đề." },
];

const socialLinks: Record<string, Array<{ label: string; url: string }>> = {
  "fpt-software": [{ label: "LinkedIn", url: "https://www.linkedin.com/company/fpt-software/" }, { label: "Facebook", url: "https://www.facebook.com/FPTSoftware" }],
  "vng-corporation": [{ label: "LinkedIn", url: "https://www.linkedin.com/company/vng-corporation/" }, { label: "Facebook", url: "https://www.facebook.com/VNGCorporation" }],
  "viettel-digital": [{ label: "LinkedIn", url: "https://www.linkedin.com/company/viettel-group/" }],
  vnpay: [{ label: "Facebook", url: "https://www.facebook.com/VNPay" }],
  techcombank: [{ label: "LinkedIn", url: "https://www.linkedin.com/company/techcombank/" }],
  shopee: [{ label: "LinkedIn", url: "https://www.linkedin.com/company/shopee/" }],
};

const details: Record<string, Omit<CompanyDetail, "openJobs">> = {
  "fpt-software": {
    id: "fpt-software", name: "FPT Software", logo: "/companies/330px-FPT_Software_logo.svg.webp", banner: "/home/hero-illustration.png", verified: true,
    industry: "Công nghệ thông tin", size: "10.000+ nhân viên", foundedYear: 1999, address: "Tân Bình, Hồ Chí Minh", website: "https://fptsoftware.com",
    description: "FPT Software phát triển sản phẩm và dịch vụ công nghệ cho khách hàng trên nhiều thị trường. Các đội ngũ làm việc cùng nhau từ Việt Nam và nhiều quốc gia.",
    culture: "Chúng tôi coi trọng việc học từ đồng đội, phản hồi rõ ràng và tạo ra sản phẩm có ích cho người dùng. Mỗi dự án là một cơ hội để thử cách làm tốt hơn.", benefits: defaultBenefits,
    photos: ["/jobs/1.png", "/jobs/2.png", "/jobs/3.png"],
  },
  "vng-corporation": {
    id: "vng-corporation", name: "VNG Corporation", logo: "/companies/vng-corporation.png", banner: "/home/hero-illustration.png", verified: true,
    industry: "Sản phẩm công nghệ", size: "4.000+ nhân viên", foundedYear: 2004, address: "Tân Thuận, Hồ Chí Minh", website: "https://www.vng.com.vn",
    description: "VNG xây dựng các sản phẩm internet phục vụ hàng triệu người dùng, từ giải trí, thanh toán đến nền tảng số.", culture: "VNG khuyến khích tinh thần sở hữu, tốc độ thử nghiệm và sự tôn trọng trong từng cuộc trao đổi.", benefits: defaultBenefits,
    photos: ["/jobs/2.png", "/jobs/3.png", "/jobs/1.png"],
  },
  "viettel-digital": {
    id: "viettel-digital", name: "Viettel Digital", logo: "/companies/viettel.svg", banner: "/home/hero-illustration.png", verified: true,
    industry: "Viễn thông & Dịch vụ số", size: "50.000+ nhân viên", foundedYear: 1989, address: "Cầu Giấy, Hà Nội", website: "https://viettel.vn",
    description: "Viettel Digital phát triển hạ tầng và dịch vụ số giúp cá nhân, doanh nghiệp tiếp cận công nghệ thuận tiện hơn.", culture: "Những bài toán lớn cần các đội ngũ đa ngành. Chúng tôi làm việc thực tế, đo bằng kết quả và chia sẻ trách nhiệm đến cùng.", benefits: defaultBenefits,
    photos: ["/jobs/3.png", "/jobs/1.png", "/jobs/2.png"],
  },
  "vnpay": {
    id: "vnpay", name: "VNPay", logo: "/companies/vnpay.svg", banner: "/home/hero-illustration.png", verified: true,
    industry: "Tài chính & Thanh toán", size: "1.500+ nhân viên", foundedYear: 2007, address: "Cầu Giấy, Hà Nội", website: "https://vnpay.vn",
    description: "VNPay phát triển hạ tầng thanh toán số cho ngân hàng, doanh nghiệp và người tiêu dùng tại Việt Nam.", culture: "An toàn, rõ ràng và dễ dùng là tiêu chuẩn chung của các đội ngũ tại VNPay.", benefits: defaultBenefits,
    photos: ["/jobs/1.png", "/jobs/3.png", "/jobs/2.png"],
  },
  techcombank: {
    id: "techcombank", name: "Techcombank", logo: "/companies/techcombank.svg", banner: "/home/hero-illustration.png", verified: true,
    industry: "Ngân hàng & Tài chính", size: "12.000+ nhân viên", foundedYear: 1993, address: "Hoàn Kiếm, Hà Nội", website: "https://techcombank.com",
    description: "Techcombank xây dựng các dịch vụ tài chính hiện đại, minh bạch và an toàn cho khách hàng cá nhân và doanh nghiệp.", culture: "Đội ngũ được trao quyền để giải quyết vấn đề của khách hàng bằng dữ liệu, công nghệ và sự thấu hiểu.", benefits: defaultBenefits,
    photos: ["/jobs/2.png", "/jobs/1.png", "/jobs/3.png"],
  },
  shopee: {
    id: "shopee", name: "Shopee", logo: "/companies/shopee.svg", banner: "/home/hero-illustration.png", verified: true,
    industry: "Thương mại điện tử", size: "8.000+ nhân viên", foundedYear: 2015, address: "Quận 1, Hồ Chí Minh", website: "https://careers.shopee.vn",
    description: "Shopee kết nối người mua, người bán và thương hiệu trong một nền tảng thương mại điện tử thuận tiện.", culture: "Tư duy lấy người dùng làm trung tâm, học nhanh và làm việc cùng nhau là cách các đội ngũ Shopee vận hành.", benefits: defaultBenefits,
    photos: ["/jobs/3.png", "/jobs/2.png", "/jobs/1.png"],
  },
};

const fallback = (company: (typeof COMPANIES)[number]): Omit<CompanyDetail, "openJobs"> => ({
  id: company.id, name: company.name, logo: company.logo, banner: "/home/hero-illustration.png", verified: true,
  industry: company.categories[0] ?? "Công nghệ thông tin", size: "100+ nhân viên", foundedYear: 2010,
  address: company.locations[0] ?? "Việt Nam", website: "https://careerhub.example", description: `${company.name} đang tìm kiếm những đồng đội mới cho các đội ngũ đang phát triển.`,
  culture: "Một môi trường khuyến khích chia sẻ, học hỏi và làm việc có trách nhiệm.", benefits: defaultBenefits,
  photos: ["/jobs/1.png", "/jobs/2.png", "/jobs/3.png"],
});

export function getCompanyDetailById(id: string): CompanyDetail | null {
  const company = COMPANIES.find((item) => item.id === id);
  if (!company) return null;
  const base = details[id] ?? fallback(company);
  return { ...base, socialLinks: socialLinks[id] ?? [], openJobs: company.jobs };
}

export function getCompanyDetailIds() {
  return COMPANIES.map((company) => company.id);
}
