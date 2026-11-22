import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WIKI_ARTICLES } from "@/lib/data/wiki";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, CheckCircle2, AlertTriangle } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

const WIKI_DETAILS: Record<
  string,
  {
    title: string;
    category: string;
    updatedAt: string;
    readTime: string;
    sections: { heading: string; content: string[] }[];
  }
> = {
  "quy-trinh-mua-ban-nha-dat": {
    title: "Quy trình 5 bước mua bán nhà đất từ đặt cọc đến sang tên sổ đỏ chuẩn 2026",
    category: "Quy trình giao dịch",
    updatedAt: "15/11/2026",
    readTime: "7 phút đọc",
    sections: [
      {
        heading: "Bước 1: Thẩm định pháp lý và kiểm tra hiện trạng tài sản",
        content: [
          "Yêu cầu bên bán cung cấp bản gốc Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở (Sổ đỏ / Sổ hồng).",
          "Kiểm tra số tờ, số thửa và đối chiếu hiện trạng thực tế kích thước, ranh giới với các hộ liền kề.",
          "Tra cứu tình trạng thế chấp ngân hàng tại Văn phòng Đăng ký đất đai hoặc tra cứu mã vạch Sổ đỏ.",
        ],
      },
      {
        heading: "Bước 2: Lập và ký hợp đồng đặt cọc",
        content: [
          "Xác định rõ số tiền cọc (thường từ 5% - 10% giá trị giao dịch).",
          "Ghi rõ thời gian, địa điểm văn phòng công chứng ký hợp đồng chuyển nhượng chính thức.",
          "Quy định rõ điều khoản phạt cọc: bên mua bỏ cọc mất tiền, bên bán không bán phải bồi thường gấp đôi.",
        ],
      },
      {
        heading: "Bước 3: Công chứng hợp đồng mua bán chuyển nhượng",
        content: [
          "Hai bên có mặt tại tổ chức hành nghề công chứng, mang theo CCCD, đăng ký kết hôn hoặc giấy xác nhận độc thân.",
          "Công chứng viên đọc, giải thích quyền nghĩa vụ và các bên ký, điểm chỉ vào hợp đồng công chứng.",
          "Thanh toán số tiền còn lại qua tài khoản ngân hàng để đảm bảo có chứng từ đối soát hợp lệ.",
        ],
      },
      {
        heading: "Bước 4: Kê khai và nộp thuế, lệ phí nhà nước",
        content: [
          "Bên bán nộp Thuế thu nhập cá nhân 2% tính trên giá trị hợp đồng chuyển nhượng.",
          "Bên mua nộp Lệ phí trước bạ 0.5% tính trên khung giá đất theo bảng giá đất quy định.",
          "Phí thẩm định hồ sơ và lệ phí cấp đổi/cấp phôi bìa mới từ 1 - 3 triệu đồng.",
        ],
      },
      {
        heading: "Bước 5: Nhận Giấy chứng nhận mang tên bên mua",
        content: [
          "Sau khoảng 10 - 15 ngày làm việc kể từ khi nộp đủ hồ sơ hợp lệ tại Bộ phận một cửa / Văn phòng Đăng ký đất đai, bên mua nhận lại Sổ đỏ đã cập nhật tên chủ sở hữu mới.",
        ],
      },
    ],
  },
  "thu-tuc-sang-ten-so-do": {
    title: "Thủ tục, hồ sơ và biểu phí thuế sang tên sổ đỏ / sổ hồng mới nhất",
    category: "Pháp lý - Sổ đỏ",
    updatedAt: "12/11/2026",
    readTime: "6 phút đọc",
    sections: [
      {
        heading: "Hồ sơ sang tên sổ đỏ bắt buộc",
        content: [
          "Bản chính Giấy chứng nhận quyền sử dụng đất (Sổ đỏ/Sổ hồng).",
          "Hợp đồng chuyển nhượng quyền sử dụng đất đã được công chứng (02 bản chính).",
          "Tờ khai lệ phí trước bạ và tờ khai thuế thu nhập cá nhân theo mẫu quy định.",
          "Bản sao CCCD và Giấy xác nhận tình trạng hôn nhân của bên chuyển nhượng và bên nhận chuyển nhượng.",
        ],
      },
      {
        heading: "Biểu phí và các khoản nghĩa vụ tài chính",
        content: [
          "Thuế thu nhập cá nhân: 2% giá trị chuyển nhượng (do người bán nộp, trừ trường hợp được miễn theo diện tặng cho ruột thịt).",
          "Lệ phí trước bạ: 0.5% giá trị nhà đất (do người mua nộp).",
          "Phí thẩm định hồ sơ địa chính: từ 500.000 ₫ đến 2.000.000 ₫ tùy quy định của HĐND từng tỉnh thành.",
        ],
      },
    ],
  },
  "kiem-tra-quy-hoach-nha-dat": {
    title: "4 cách tra cứu bản đồ quy hoạch đất đai tránh mất trắng khi mua nhà",
    category: "Quy hoạch đất đai",
    updatedAt: "10/11/2026",
    readTime: "8 phút đọc",
    sections: [
      {
        heading: "Cách 1: Kiểm tra thông tin quy hoạch trên Sổ đỏ",
        content: [
          "Xem phần 'Ghi chú' tại trang 2 hoặc sơ đồ thửa đất trang 3 của Sổ đỏ. Đất dính quy hoạch lộ giới hoặc hành lang lưới điện thường được cơ quan nhà nước thể hiện bằng nét đứt.",
        ],
      },
      {
        heading: "Cách 2: Nộp phiếu yêu cầu tại Văn phòng Đăng ký đất đai",
        content: [
          "Đây là cách có giá trị pháp lý cao nhất. Nộp phiếu yêu cầu trích lục thông tin quy hoạch tại UBND quận/huyện sở tại để nhận văn bản trả lời chính thức.",
        ],
      },
      {
        heading: "Cách 3: Tra cứu trên Cổng thông tin quy hoạch trực tuyến",
        content: [
          "Tại TP.HCM: Tra cứu trên ứng dụng Thông tin quy hoạch TP.HCM.",
          "Tại Hà Nội: Tra cứu trên Cổng thông tin quy hoạch phân khu Sở Quy hoạch - Kiến trúc.",
        ],
      },
    ],
  },
  "mau-hop-dong-dat-coc": {
    title: "Mẫu hợp đồng đặt cọc mua bán nhà đất chặt chẽ, chống phạt cọc vô lý",
    category: "Biểu mẫu pháp lý",
    updatedAt: "08/11/2026",
    readTime: "5 phút đọc",
    sections: [
      {
        heading: "Các điều khoản cốt lõi trong hợp đồng đặt cọc",
        content: [
          "Thông tin định danh đầy đủ của bên đặt cọc (Bên A) và bên nhận đặt cọc (Bên B).",
          "Mô tả chi tiết thửa đất: số tờ, số thửa, diện tích, địa chỉ, tình trạng pháp lý không tranh chấp.",
          "Giá bán thỏa thuận và phương thức thanh toán tiền cọc.",
          "Thời hạn và địa điểm công chứng hợp đồng mua bán.",
          "Trách nhiệm nộp thuế thu nhập cá nhân, lệ phí trước bạ và phí công chứng.",
        ],
      },
    ],
  },
  "kinh-nghiem-thue-phong-tro": {
    title: "Cẩm nang thuê phòng trọ & căn hộ dịch vụ: 6 bẫy lừa đảo cần cảnh giác",
    category: "Thuê bất động sản",
    updatedAt: "05/11/2026",
    readTime: "5 phút đọc",
    sections: [
      {
        heading: "Bẫy lừa tiền cọc giữ chỗ qua mạng",
        content: [
          "Tuyệt đối không chuyển khoản đặt cọc giữ chỗ khi chưa trực tiếp vào xem phòng và chưa gặp chính chủ hoặc đơn vị quản lý có hợp đồng ủy quyền.",
        ],
      },
      {
        heading: "Kiểm tra kỹ đồng hồ điện nước trước khi nhận phòng",
        content: [
          "Chụp ảnh chỉ số công tơ điện và đồng hồ nước tại thời điểm ký hợp đồng bàn giao để đối chiếu cuối tháng.",
          "Làm rõ đơn giá điện (giá nhà nước hay giá kinh doanh) và các phụ phí: wifi, thang máy, vệ sinh, phí quản lý.",
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return WIKI_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = WIKI_DETAILS[params.slug];
  if (!article) return { title: "Wiki BĐS | Batdongsan.com.vn" };
  return {
    title: `${article.title} | Wiki BĐS Batdongsan.com.vn`,
    description: article.sections[0]?.content[0] || article.title,
  };
}

export default function WikiDetailPage({ params }: PageProps) {
  const article = WIKI_DETAILS[params.slug];
  if (!article) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-[#E03C31]">Trang chủ</Link>
        <span>/</span>
        <Link href="/wiki" className="hover:text-[#E03C31]">Wiki BĐS</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold line-clamp-1">{article.title}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4 border-b border-gray-200 pb-6">
        <span className="text-xs font-bold text-[#E03C31] bg-red-50 px-3 py-1 rounded-full uppercase">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Cập nhật: {article.updatedAt}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        {article.sections.map((sec, idx) => (
          <div key={idx} className="space-y-3 bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-red-100 text-[#E03C31] flex items-center justify-center font-bold text-xs flex-shrink-0">
                {idx + 1}
              </span>
              <span>{sec.heading}</span>
            </h3>
            <ul className="space-y-2 pl-8 list-disc text-gray-600 text-xs sm:text-sm">
              {sec.content.map((c, i) => (
                <li key={i} className="leading-relaxed">{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Support CTA */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-gray-900 text-sm">Cần tư vấn hỗ trợ thẩm định hồ sơ pháp lý?</h4>
          <p className="text-xs text-gray-600">Đội ngũ luật sư & chuyên viên DigiKash hỗ trợ kiểm tra quy hoạch miễn phí.</p>
        </div>
        <Link
          href="/lien-he"
          className="px-5 py-2.5 bg-[#E03C31] hover:bg-[#B8281F] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex-shrink-0"
        >
          Yêu cầu hỗ trợ pháp lý
        </Link>
      </div>
    </div>
  );
}
