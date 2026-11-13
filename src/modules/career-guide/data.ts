import type { CareerArticle, CareerCategory } from "./types";

export const CAREER_CATEGORIES: CareerCategory[] = ["Tất cả", "Viết CV", "Phỏng vấn", "Kỹ thuật IT", "Định hướng lương thưởng"];

const author = {
  name: "Ngọc Mai",
  role: "Career Editor tại CareerHub",
  avatar: "/home/hero-illustration.png",
};

export const CAREER_ARTICLES: CareerArticle[] = [
  {
    slug: "cv-frontend-developer-2026",
    title: "CV Frontend Developer: Cách kể đúng câu chuyện kỹ thuật",
    excerpt: "Một CV tốt giúp nhà tuyển dụng hiểu bạn đã giải quyết bài toán gì, bằng công cụ nào và tạo ra kết quả ra sao.",
    category: "Viết CV", image: "/jobs/1.png", author, publishedAt: "12/11/2026", updatedAt: "12/11/2026", readTime: "5 phút đọc", relatedJobIds: ["job-1", "job-7"],
    sections: [
      { id: "bat-dau-tu-ket-qua", heading: "Bắt đầu từ kết quả", paragraphs: ["Đừng mở đầu bằng danh sách công nghệ. Hãy viết một câu mô tả sản phẩm, người dùng và phần việc bạn chịu trách nhiệm.", "Ví dụ, thay vì ghi “làm giao diện với React”, hãy cho thấy bạn đã xây một luồng nào, cải thiện điều gì và phối hợp với ai."], quote: "Một dòng CV đáng nhớ thường trả lời được: bạn đã làm gì khác đi?" },
      { id: "chon-du-an", heading: "Chọn dự án có bằng chứng", paragraphs: ["Hai hoặc ba dự án có vai trò rõ ràng mạnh hơn một danh sách dài. Mỗi dự án nên có liên kết demo hoặc repository khi có thể."], bullets: ["Nêu bối cảnh và vai trò của bạn trong đội ngũ.", "Ghi công nghệ gắn với một quyết định kỹ thuật cụ thể.", "Đưa vào con số thật: thời gian tải, số màn hình, số người dùng hoặc quy mô dữ liệu."] },
      { id: "kiem-tra-cuoi", heading: "Kiểm tra lần cuối", paragraphs: ["Đọc CV như một người chưa biết bạn. Nếu câu nào không nói rõ bạn đã đóng góp gì, hãy viết lại câu đó."] },
    ],
  },
  {
    slug: "cau-truc-tra-loi-phong-van",
    title: "Cấu trúc câu trả lời phỏng vấn để nói rõ, không nói dài",
    excerpt: "Dùng một khung đơn giản để biến trải nghiệm làm việc thành câu trả lời có bối cảnh, hành động và kết quả.",
    category: "Phỏng vấn", image: "/jobs/2.png", author, publishedAt: "08/11/2026", updatedAt: "10/11/2026", readTime: "6 phút đọc", relatedJobIds: ["job-2", "job-5"],
    sections: [
      { id: "khung-star", heading: "Khung STAR là điểm bắt đầu", paragraphs: ["Situation, Task, Action và Result giúp bạn giữ câu trả lời trong một mạch dễ theo dõi. Hãy dùng khung này như bản đồ, không phải một bài học thuộc lòng."], bullets: ["Bối cảnh: vấn đề xuất hiện ở đâu?", "Nhiệm vụ: bạn được kỳ vọng điều gì?", "Hành động: bạn đã tự mình quyết định và làm gì?", "Kết quả: điều gì thay đổi sau đó?"] },
      { id: "chon-chi-tiet", heading: "Chọn một chi tiết có sức nặng", paragraphs: ["Nhà tuyển dụng không cần toàn bộ lịch sử dự án. Một quyết định khó, một lần sửa sai hoặc một cách phối hợp tốt thường cho thấy năng lực rõ hơn."], quote: "Câu trả lời tốt không cố chứng minh mọi thứ. Nó chọn đúng một việc để chứng minh." },
      { id: "ket-thuc-mo", heading: "Kết thúc bằng điều bạn học được", paragraphs: ["Một câu ngắn về bài học giúp câu trả lời có chiều sâu và mở ra câu hỏi tiếp theo một cách tự nhiên."] },
    ],
  },
  {
    slug: "portfolio-ui-ux-thuyet-phuc",
    title: "Portfolio UI/UX: Sắp xếp case study để người đọc hiểu nhanh",
    excerpt: "Từ vấn đề đến quyết định thiết kế: một case study tốt cho thấy cách bạn suy nghĩ, không chỉ cho thấy màn hình cuối.",
    category: "Viết CV", image: "/jobs/3.png", author, publishedAt: "03/11/2026", updatedAt: "03/11/2026", readTime: "7 phút đọc", relatedJobIds: ["job-3", "job-5"],
    sections: [
      { id: "mo-bang-bai-toan", heading: "Mở bằng bài toán người dùng", paragraphs: ["Hãy nói rõ ai gặp vấn đề gì, trong bối cảnh nào và tại sao bài toán đó đáng giải quyết. Một câu mở rõ ràng giúp phần còn lại có điểm tựa."] },
      { id: "ke-quyet-dinh", heading: "Kể quyết định, không chỉ kể màn hình", paragraphs: ["Thêm những phương án đã cân nhắc, lý do bạn loại bỏ chúng và cách bạn kiểm tra giả định. Đây là phần nhà tuyển dụng muốn nghe trong buổi trao đổi."], bullets: ["Giữ lại các bản phác thảo quan trọng.", "Nêu phản hồi từ người dùng hoặc đội ngũ.", "Kết thúc bằng tác động sau khi triển khai."] },
    ],
  },
  {
    slug: "luong-it-thuong-luong-the-nao",
    title: "Mức lương ngành IT: Chuẩn bị gì trước khi thương lượng",
    excerpt: "Một cuộc trao đổi lương tốt bắt đầu từ phạm vi công việc, dữ liệu thị trường và mức đóng góp bạn có thể chứng minh.",
    category: "Định hướng lương thưởng", image: "/home/cta-illustration.png", author, publishedAt: "28/10/2026", updatedAt: "01/11/2026", readTime: "5 phút đọc", relatedJobIds: ["job-6", "job-8"],
    sections: [
      { id: "xet-ca-goi", heading: "Xem cả gói đãi ngộ", paragraphs: ["Lương tháng chỉ là một phần. Hãy hỏi về thưởng, bảo hiểm, thời gian thử việc, ngân sách học tập và cách đánh giá sau sáu tháng."] },
      { id: "dua-ra-khoang", heading: "Đưa ra một khoảng có cơ sở", paragraphs: ["Khoảng lương nên dựa trên vai trò, kinh nghiệm và phạm vi trách nhiệm. Chuẩn bị hai hoặc ba ví dụ cho thấy bạn tạo giá trị ở đâu."], quote: "Thương lượng không phải đoán đúng một con số. Đó là làm rõ giá trị và kỳ vọng của hai phía." },
    ],
  },
  {
    slug: "roadmap-backend-developer",
    title: "Roadmap Backend Developer: Học gì sau những API đầu tiên",
    excerpt: "Từ HTTP và database đến quan sát hệ thống, đây là cách sắp xếp lộ trình học theo bài toán thực tế.",
    category: "Kỹ thuật IT", image: "/home/hero-illustration.png", author, publishedAt: "24/10/2026", updatedAt: "24/10/2026", readTime: "8 phút đọc", relatedJobIds: ["job-4", "job-6"],
    sections: [
      { id: "nen-tang", heading: "Củng cố nền tảng", paragraphs: ["HTTP, cấu trúc dữ liệu, database và cách một request đi qua hệ thống là những phần cần hiểu bằng thực hành."] },
      { id: "xay-he-thong-nho", heading: "Xây một hệ thống nhỏ", paragraphs: ["Một ứng dụng có xác thực, phân quyền, queue và logging sẽ cho bạn nhiều câu hỏi thực tế hơn việc đọc thêm một tutorial."], bullets: ["Viết API có kiểm thử và tài liệu.", "Đo thời gian phản hồi ở các tình huống khác nhau.", "Ghi lại quyết định và giới hạn của hệ thống."] },
    ],
  },
  {
    slug: "onboarding-30-ngay-dau",
    title: "30 ngày đầu ở công việc mới: Một kế hoạch đủ nhẹ để làm được",
    excerpt: "Bạn không cần hiểu mọi thứ trong tuần đầu. Một nhịp làm quen có chủ đích sẽ giúp bạn tạo giá trị mà không kiệt sức.",
    category: "Định hướng lương thưởng", image: "/home/newsletter-illustration.png", author, publishedAt: "18/10/2026", updatedAt: "18/10/2026", readTime: "4 phút đọc", relatedJobIds: ["job-1", "job-10"],
    sections: [
      { id: "tuan-dau", heading: "Tuần đầu: nghe và ghi lại", paragraphs: ["Tập trung vào người, sản phẩm và cách đội ngũ ra quyết định. Ghi lại thuật ngữ, câu hỏi và những điều chưa rõ."] },
      { id: "tuan-thu-ba", heading: "Tuần thứ ba: nhận một phần việc", paragraphs: ["Chọn một việc nhỏ nhưng hoàn chỉnh từ đầu đến cuối. Một lần ship sẽ cho bạn góc nhìn tốt hơn nhiều cuộc họp."] },
    ],
  },
  {
    slug: "remote-work-hieu-qua",
    title: "Làm việc remote hiệu quả bắt đầu từ cách giao tiếp",
    excerpt: "Rõ ràng trong cập nhật, tài liệu và thời gian phản hồi giúp đội ngũ remote làm việc nhẹ hơn.",
    category: "Định hướng lương thưởng", image: "/home/company-placeholder.png", author, publishedAt: "12/10/2026", updatedAt: "12/10/2026", readTime: "5 phút đọc", relatedJobIds: ["job-7", "job-9"],
    sections: [
      { id: "viet-de-nguoi-khac-doc", heading: "Viết để người khác đọc", paragraphs: ["Một cập nhật tốt có bối cảnh, trạng thái hiện tại và việc cần hỗ trợ. Viết ngắn nhưng đủ để người đọc không phải đoán."] },
      { id: "giu-nhip", heading: "Giữ nhịp làm việc", paragraphs: ["Thỏa thuận thời gian phản hồi, giờ tập trung và cách báo sớm khi có rủi ro. Những quy ước nhỏ giúp giảm rất nhiều tin nhắn gấp."] },
    ],
  },
  {
    slug: "typescript-cho-frontend",
    title: "TypeScript cho Frontend: Bốn thói quen giúp code dễ mở rộng",
    excerpt: "Kiểu dữ liệu tốt không làm code nặng hơn; nó giúp cả đội hiểu rõ hợp đồng giữa các phần của sản phẩm.",
    category: "Kỹ thuật IT", image: "/home/empty-jobs.png", author, publishedAt: "05/10/2026", updatedAt: "06/10/2026", readTime: "6 phút đọc", relatedJobIds: ["job-1", "job-10"],
    sections: [
      { id: "dat-ten-kieu", heading: "Đặt tên cho dữ liệu", paragraphs: ["Một type có tên đúng giúp người đọc hiểu dữ liệu ngay tại nơi sử dụng. Tránh để các object vô danh trôi qua nhiều component."] },
      { id: "giu-contract", heading: "Giữ contract giữa các lớp", paragraphs: ["API response, form state và component props nên có ranh giới rõ ràng. Khi contract thay đổi, lỗi nên xuất hiện gần nơi thay đổi."], bullets: ["Ưu tiên type nhỏ, có thể tái sử dụng.", "Không dùng assertion để che lỗi thiết kế.", "Kiểm tra dữ liệu bên ngoài trước khi đưa vào UI."] },
    ],
  },
];

export const CAREER_PAGE_SIZE = 6;
export const FEATURED_ARTICLE = CAREER_ARTICLES[0];

export function getCareerArticleBySlug(slug: string) {
  return CAREER_ARTICLES.find((article) => article.slug === slug) ?? null;
}

export function getCareerArticleSlugs() {
  return CAREER_ARTICLES.map((article) => article.slug);
}
