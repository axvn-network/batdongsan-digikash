import { FileCheck, FileText, Map, BookOpen, ShieldAlert } from "lucide-react";

export interface WikiArticle {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  icon: any;
  date: string;
}

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    slug: "quy-trinh-mua-ban-nha-dat",
    title: "Quy trình 5 bước mua bán nhà đất từ đặt cọc đến sang tên sổ đỏ chuẩn 2026",
    summary: "Hướng dẫn chi tiết từng bước thẩm định pháp lý, lập hợp đồng đặt cọc, công chứng chuyển nhượng và nộp hồ sơ tại Văn phòng Đăng ký đất đai.",
    category: "Quy trình giao dịch",
    readTime: "7 phút đọc",
    icon: FileCheck,
    date: "15/11/2026",
  },
  {
    slug: "thu-tuc-sang-ten-so-do",
    title: "Thủ tục, hồ sơ và biểu phí thuế sang tên sổ đỏ / sổ hồng mới nhất",
    summary: "Cách tính thuế thu nhập cá nhân 2%, lệ phí trước bạ 0.5%, phí thẩm định và mẫu đơn đề nghị đăng ký biến động đất đai.",
    category: "Pháp lý - Sổ đỏ",
    readTime: "6 phút đọc",
    icon: FileText,
    date: "12/11/2026",
  },
  {
    slug: "kiem-tra-quy-hoach-nha-dat",
    title: "4 cách tra cứu bản đồ quy hoạch đất đai tránh mất trắng khi mua nhà",
    summary: "Hướng dẫn tra cứu trên cổng thông tin địa chính, nộp phiếu yêu cầu cung cấp dữ liệu đất đai và đối chiếu quy hoạch phân khu 1/2000.",
    category: "Quy hoạch đất đai",
    readTime: "8 phút đọc",
    icon: Map,
    date: "10/11/2026",
  },
  {
    slug: "mau-hop-dong-dat-coc",
    title: "Mẫu hợp đồng đặt cọc mua bán nhà đất chặt chẽ, chống phạt cọc vô lý",
    summary: "Tải mẫu hợp đồng đặt cọc mới nhất, các điều khoản bắt buộc về thời hạn công chứng, hiện trạng tài sản và phạt cọc gấp đôi.",
    category: "Biểu mẫu pháp lý",
    readTime: "5 phút đọc",
    icon: BookOpen,
    date: "08/11/2026",
  },
  {
    slug: "kinh-nghiem-thue-phong-tro",
    title: "Cẩm nang thuê phòng trọ & căn hộ dịch vụ: 6 bẫy lừa đảo cần cảnh giác",
    summary: "Kinh nghiệm xem phòng thực tế, đối soát đồng hồ điện nước, các khoản phụ phí phát sinh và điều khoản hoàn tiền cọc khi trả phòng.",
    category: "Thuê bất động sản",
    readTime: "5 phút đọc",
    icon: ShieldAlert,
    date: "05/11/2026",
  },
];
