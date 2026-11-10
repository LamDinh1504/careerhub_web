import { Category, GuideArticle, Job, Partner, ProcessStep } from "./types";

export const PARTNERS_DATA: Partner[] = [
  { id: "fpt", name: "FPT Software", logo: "/companies/330px-FPT_Software_logo.svg.webp" },
  { id: "viettel", name: "Viettel", logo: "/companies/viettel.svg" },
  { id: "vnpay", name: "VNPay", logo: "/companies/vnpay.svg" },
  { id: "vng", name: "VNG", logo: "/companies/vng.png" },
  { id: "momo", name: "MoMo", logo: "/companies/momo.png" },
  { id: "vinfast", name: "VinFast", logo: "/companies/vinfast.svg" },
  { id: "techcombank", name: "Techcombank", logo: "/companies/techcombank.svg" },
  { id: "shopee", name: "Shopee", logo: "/companies/shopee.svg" },
  { id: "zalo", name: "Zalo", logo: "/companies/zalo.svg" },
  { id: "be", name: "Be Group", logo: "/companies/be_logo_lockups_simplified.png" },
  { id: "google", name: "Google", logo: "/companies/google.svg" },
  { id: "microsoft", name: "Microsoft", logo: "/companies/microsoft.svg" },
  { id: "samsung", name: "Samsung", logo: "/companies/samsung.svg" },
  { id: "amazon", name: "Amazon", logo: "/companies/amazon.svg" },
  { id: "adobe", name: "Adobe", logo: "/companies/adobe.svg" },
];

export const CATEGORIES_DATA: Category[] = [
  {
    id: "it",
    name: "Công nghệ thông tin",
    count: "2.480 việc làm",
    iconType: "code",
    href: "/jobs?category=it",
  },
  {
    id: "marketing",
    name: "Marketing & Truyền thông",
    count: "1.256 việc làm",
    iconType: "marketing",
    href: "/jobs?category=marketing",
  },
  {
    id: "finance",
    name: "Tài chính & Kế toán",
    count: "986 việc làm",
    iconType: "finance",
    href: "/jobs?category=finance",
  },
  {
    id: "design",
    name: "Thiết kế & Sáng tạo",
    count: "748 việc làm",
    iconType: "design",
    href: "/jobs?category=design",
  },
];

export const FEATURED_JOBS_DATA: Job[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "Lumi Studio",
    salary: "25 – 35 triệu / tháng",
    location: "Hồ Chí Minh",
    tags: ["Design", "Hybrid"],
    badge: "NỔI BẬT",
    badgeVariant: "featured",
    postedAt: "2 giờ trước",
    isBookmarked: false,
  },
  {
    id: "job-2",
    title: "Frontend Developer (React)",
    company: "Nexa Technology",
    salary: "30 – 45 triệu / tháng",
    location: "Hà Nội",
    tags: ["IT phần mềm", "Full-time"],
    badge: "TUYỂN GẤP",
    badgeVariant: "urgent",
    postedAt: "3 giờ trước",
    isBookmarked: false,
  },
  {
    id: "job-3",
    title: "Digital Marketing Executive",
    company: "Bloom Commerce",
    salary: "15 – 22 triệu / tháng",
    location: "Hồ Chí Minh",
    tags: ["Marketing", "Full-time"],
    badge: "MỚI",
    badgeVariant: "new",
    postedAt: "5 giờ trước",
    isBookmarked: false,
  },
  {
    id: "job-4",
    title: "Chuyên viên phân tích dữ liệu",
    company: "Orbit Finance",
    salary: "20 – 30 triệu / tháng",
    location: "Hà Nội",
    tags: ["Data", "Hybrid"],
    badge: "MỚI",
    badgeVariant: "new",
    postedAt: "6 giờ trước",
    isBookmarked: false,
  },
  {
    id: "job-5",
    title: "Brand & Content Strategist",
    company: "Mộc Creative",
    salary: "18 – 25 triệu / tháng",
    location: "Đà Nẵng",
    tags: ["Marketing", "Full-time"],
    badge: "NỔI BẬT",
    badgeVariant: "featured",
    postedAt: "1 ngày trước",
    isBookmarked: false,
  },
  {
    id: "job-6",
    title: "Customer Success Specialist",
    company: "Cloudway",
    salary: "12 – 18 triệu / tháng",
    location: "Toàn quốc",
    tags: ["Dịch vụ", "Remote"],
    badge: "MỚI",
    badgeVariant: "new",
    postedAt: "1 ngày trước",
    isBookmarked: false,
  },
];

export const PROCESS_STEPS_DATA: ProcessStep[] = [
  {
    number: "01",
    title: "Tạo hồ sơ của bạn",
    description:
      "Làm nổi bật kinh nghiệm, kỹ năng và điều bạn đang tìm kiếm.",
  },
  {
    number: "02",
    title: "Khám phá việc phù hợp",
    description:
      "Tìm cơ hội đúng chuyên môn, đúng địa điểm và đúng kỳ vọng.",
  },
  {
    number: "03",
    title: "Ứng tuyển & kết nối",
    description:
      "Gửi hồ sơ nhanh chóng và kết nối trực tiếp với nhà tuyển dụng.",
  },
];

export const CAREER_GUIDES_DATA: GuideArticle[] = [
  {
    id: "guide-1",
    category: "HỒ SƠ & CV",
    title: "Một chiếc CV tốt bắt đầu từ câu chuyện của bạn",
    excerpt:
      "Cách thể hiện giá trị của bản thân, không chỉ là liệt kê kinh nghiệm.",
    readTime: "6 phút đọc",
    imageUrl:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    slug: "mot-chiec-cv-tot-bat-dau-tu-cau-chuyen-cua-ban",
  },
  {
    id: "guide-2",
    category: "PHỎNG VẤN",
    title: "Tự tin trả lời: “Hãy giới thiệu về bản thân”",
    excerpt:
      "Chuẩn bị câu trả lời ngắn gọn, chân thật và khiến bạn được ghi nhớ.",
    readTime: "5 phút đọc",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    slug: "tu-tin-tra-loi-hay-gioi-thieu-ve-ban-than",
  },
  {
    id: "guide-3",
    category: "PHÁT TRIỂN BẢN THÂN",
    title: "Chọn công việc phù hợp, không chỉ mức lương tốt",
    excerpt:
      "Những điều đáng cân nhắc trước khi gật đầu với lời mời tiếp theo.",
    readTime: "7 phút đọc",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    slug: "chon-cong-viec-phu-hop-khong-chi-muc-luong-tot",
  },
];

export const POPULAR_SEARCH_KEYWORDS = [
  "Marketing",
  "IT phần mềm",
  "Kế toán",
  "Remote",
];

