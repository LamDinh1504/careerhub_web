import { JobDetail } from "./types";

export const DEFAULT_JOB_DETAIL: JobDetail = {
  id: "job-1",
  title: "Lập trình viên Frontend (React/Next.js)",
  company: "FPT Software",
  companyLogo: "/companies/330px-FPT_Software_logo.svg.webp",
  verified: true,
  salary: "15 – 25 triệu/tháng",
  location: "Hồ Chí Minh",
  jobType: "Toàn thời gian",
  level: "Mid (2 – 4 năm)",
  experience: "Từ 2 năm kinh nghiệm",
  deadline: "30/11/2026",
  postedAt: "Đăng 3 ngày trước",
  viewsCount: 1420,
  isBookmarked: false,
  description: [
    "Tham gia phát triển và duy trì các sản phẩm web của công ty bằng React/Next.js.",
    "Phối hợp với nhóm Backend, UI/UX để triển khai tính năng và cải thiện trải nghiệm người dùng.",
    "Tối ưu hiệu suất, đảm bảo chất lượng và khả năng mở rộng của hệ thống.",
    "Tham gia review code, đóng góp ý tưởng cải tiến kỹ thuật.",
  ],
  requirements: [
    "Có từ 2 năm kinh nghiệm phát triển Frontend với React hoặc Next.js.",
    "Nắm vững HTML, CSS (Tailwind CSS), JavaScript/TypeScript.",
    "Hiểu về RESTful API, xử lý bất đồng bộ và quản lý state (Redux/Zustand).",
    "Có kinh nghiệm làm việc nhóm, sử dụng Git, GitHub.",
    "Ưu tiên ứng viên có kinh nghiệm với CI/CD, Docker hoặc thiết kế hệ thống frontend.",
  ],
  benefits: [
    {
      iconType: "money",
      title: "Thu nhập cạnh tranh,",
      subtitle: "thưởng theo hiệu suất",
    },
    {
      iconType: "shield",
      title: "Bảo hiểm đầy đủ",
      subtitle: "(BHYT, BHXH, BHTN)",
    },
    {
      iconType: "laptop",
      title: "Làm việc linh hoạt",
      subtitle: "(Hybrid/Remote)",
    },
    {
      iconType: "education",
      title: "Cơ hội đào tạo,",
      subtitle: "phát triển kỹ năng",
    },
  ],
  companyInfo: {
    name: "FPT Software",
    logo: "/companies/330px-FPT_Software_logo.svg.webp",
    verified: true,
    industry: "Công nghệ thông tin",
    size: "10.000+ nhân viên",
    description:
      "FPT Software là công ty công nghệ hàng đầu Việt Nam, cung cấp dịch vụ và giải pháp chuyển đổi số cho khách hàng toàn cầu.",
    address: "Hồ Chí Minh",
    website: "https://www.fpt-software.com",
  },
  similarJobs: [
    {
      id: "job-2",
      title: "Frontend Developer (Next.js)",
      company: "VNG Corporation",
      companyLogo: "/companies/vng.png",
      location: "Hồ Chí Minh",
      salary: "15 – 28 triệu/tháng",
      isBookmarked: false,
    },
    {
      id: "job-3",
      title: "UI/UX Designer",
      company: "Viettel Digital",
      companyLogo: "/companies/viettel.svg",
      location: "Đà Nẵng",
      salary: "12 – 20 triệu/tháng",
      isBookmarked: false,
    },
  ],
};

export const MOCK_JOBS_DETAILS_MAP: Record<string, Partial<JobDetail>> = {
  "job-1": DEFAULT_JOB_DETAIL,
  "job-2": {
    id: "job-2",
    title: "ReactJS Developer",
    company: "VNG Corporation",
    companyLogo: "/companies/vng.png",
    verified: true,
    salary: "20 – 35 triệu/tháng",
    location: "Hà Nội",
    jobType: "Toàn thời gian",
    level: "Mid - Senior (2 – 5 năm)",
    experience: "Từ 2 năm kinh nghiệm",
    deadline: "25/11/2026",
    postedAt: "Đăng 2 ngày trước",
    viewsCount: 2150,
    companyInfo: {
      name: "VNG Corporation",
      logo: "/companies/vng.png",
      verified: true,
      industry: "Công nghệ thông tin & Giải trí",
      size: "4.000+ nhân viên",
      description:
        "VNG là kỳ lân công nghệ đầu tiên tại Việt Nam, sở hữu hệ sinh thái Zalo, Zing MP3, ZaloPay phục vụ hàng chục triệu người dùng.",
      address: "Hà Nội & TP. Hồ Chí Minh",
      website: "https://vng.com.vn",
    },
  },
  "job-3": {
    id: "job-3",
    title: "UI/UX Designer",
    company: "Viettel Digital",
    companyLogo: "/companies/viettel.svg",
    verified: true,
    salary: "12 – 20 triệu/tháng",
    location: "Đà Nẵng",
    jobType: "Toàn thời gian",
    level: "Junior - Mid (1 – 3 năm)",
    experience: "1 năm kinh nghiệm",
    deadline: "15/12/2026",
    postedAt: "Đăng 5 ngày trước",
    viewsCount: 980,
    companyInfo: {
      name: "Viettel Digital",
      logo: "/companies/viettel.svg",
      verified: true,
      industry: "Viễn thông & Dịch vụ số",
      size: "50.000+ nhân viên",
      description:
        "Tập đoàn Công nghiệp - Viễn thông Quân đội Viettel, tiên phong kiến tạo xã hội số tại Việt Nam và 10 thị trường quốc tế.",
      address: "Đà Nẵng",
      website: "https://viettel.vn",
    },
  },
};

export function getJobDetailById(id: string): JobDetail {
  const custom = MOCK_JOBS_DETAILS_MAP[id];
  if (!custom) {
    return {
      ...DEFAULT_JOB_DETAIL,
      id,
    };
  }
  return {
    ...DEFAULT_JOB_DETAIL,
    ...custom,
    companyInfo: {
      ...DEFAULT_JOB_DETAIL.companyInfo,
      ...(custom.companyInfo || {}),
    },
  };
}

