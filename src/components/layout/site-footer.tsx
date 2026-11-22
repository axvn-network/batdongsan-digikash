import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Award } from "lucide-react";
import { FooterBoxLink } from "@/components/layout/footer-box-link";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-600 text-sm">
      {/* Box link directory footer */}
      <FooterBoxLink />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pt-4">
        {/* Col 1: About */}
        <div className="space-y-4">
          <div className="h-10 w-44 relative">
            <img src="/logo.svg" alt="Batdongsan.com.vn" className="h-9 object-contain" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Batdongsan.com.vn là kênh thông tin bất động sản số 1 tại Việt Nam, cung cấp giải pháp tìm kiếm, định giá, so sánh và giao dịch bất động sản an toàn, minh bạch.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#E03C31]" />
              <span>Tổng đài CSKH: <strong>1900 1881</strong> (8h00 - 18h00)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#E03C31]" />
              <span>hotro@batdongsan.com.vn</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#E03C31]" />
              <span>Tầng 31, Keangnam Hanoi Landmark Tower, Nam Từ Liêm, Hà Nội</span>
            </div>
          </div>
        </div>

        {/* Col 2: Hướng dẫn & Dịch vụ */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Thị trường trọng điểm</h4>
          <ul className="space-y-2 text-xs">
            <li><Link prefetch={false} href="/khu-vuc/ban-can-ho-tphcm" className="hover:text-[#E03C31]">Bán căn hộ TP.HCM (Sổ đỏ)</Link></li>
            <li><Link prefetch={false} href="/khu-vuc/nha-dat-ban-ha-noi" className="hover:text-[#E03C31]">Nhà đất bán Hà Nội</Link></li>
            <li><Link prefetch={false} href="/khu-vuc/cho-thue-can-ho-tphcm" className="hover:text-[#E03C31]">Cho thuê căn hộ TP.HCM</Link></li>
            <li><Link prefetch={false} href="/khu-vuc/ban-nha-dat-da-nang" className="hover:text-[#E03C31]">Bất động sản Đà Nẵng</Link></li>
            <li><Link prefetch={false} href="/khu-vuc/ban-can-ho-binh-duong" className="hover:text-[#E03C31]">Căn hộ Dĩ An Bình Dương</Link></li>
            <li><Link prefetch={false} href="/thi-truong" className="hover:text-[#E03C31]">Chỉ số giá thị trường 2026</Link></li>
          </ul>
        </div>

        {/* Col 3: Quy định & Pháp lý */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Quy định & Chính sách</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-[#E03C31]">Quy chế hoạt động sàn TMĐT</a></li>
            <li><a href="#" className="hover:text-[#E03C31]">Điều khoản thỏa thuận dịch vụ</a></li>
            <li><a href="#" className="hover:text-[#E03C31]">Chính sách bảo mật thông tin</a></li>
            <li><a href="#" className="hover:text-[#E03C31]">Giải quyết khiếu nại & tranh chấp</a></li>
            <li><a href="#" className="hover:text-[#E03C31]">Tuân thủ Nghị định 52/2024/NĐ-CP</a></li>
            <li><a href="#" className="hover:text-[#E03C31]">Quy định phòng chống rửa tiền (AML)</a></li>
          </ul>
        </div>

        {/* Col 4: Chứng nhận & Kết nối */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Chứng nhận sàn TMĐT</h4>
          <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <span>Đã đăng ký Bộ Công Thương & cấp phép hoạt động mạng xã hội BĐS</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100">
            <Award className="w-8 h-8 text-amber-500 flex-shrink-0" />
            <span>Top 1 Cổng thông tin công nghệ BĐS Việt Nam (2020 - 2026)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2026 Batdongsan.com.vn. Phiên bản DigiKash Vietnam Edition. Bảo lưu mọi quyền.</p>
        <p className="mt-2 sm:mt-0">Đơn vị tiền tệ chuẩn: VND (₫) | Thời gian: GMT+7 (Asia/Ho_Chi_Minh)</p>
      </div>
    </footer>
  );
}
