import { Phone, Mail, MapPin, Send } from "lucide-react";

export const metadata = {
  title: "Liên hệ Batdongsan.com.vn",
  description: "Kênh tiếp nhận hỗ trợ và giải đáp thắc mắc cho người dùng và đối tác môi giới",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-gray-900">Liên hệ với chúng tôi</h1>
        <p className="text-xs text-gray-500">
          Đội ngũ chăm sóc khách hàng Batdongsan.com.vn luôn sẵn sàng hỗ trợ bạn 24/7
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Info card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-bold text-gray-900 text-lg">Thông tin liên hệ trụ sở chính</h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#E03C31] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-gray-900 font-bold">Trụ sở Hà Nội:</strong>
                <span className="text-gray-600">Tầng 31, Tòa nhà Keangnam Hanoi Landmark Tower, Phạm Hùng, Nam Từ Liêm, Hà Nội</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#E03C31] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-gray-900 font-bold">Chi nhánh TP.HCM:</strong>
                <span className="text-gray-600">Tầng 8, Tòa nhà Pearl Plaza, 561A Điện Biên Phủ, Phường 25, Bình Thạnh, TP.HCM</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#E03C31] flex-shrink-0" />
              <div>
                <strong className="block text-gray-900 font-bold">Hotline CSKH:</strong>
                <span className="text-[#E03C31] font-bold text-sm">1900 1881</span> (8:00 - 18:00)
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#E03C31] flex-shrink-0" />
              <div>
                <strong className="block text-gray-900 font-bold">Email hỗ trợ:</strong>
                <span className="text-gray-600">hotro@batdongsan.com.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Gửi tin nhắn trực tiếp</h3>
          <form className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Họ và tên *</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Số điện thoại *</label>
              <input
                type="tel"
                required
                placeholder="0912345678"
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Nội dung liên hệ</label>
              <textarea
                rows={3}
                placeholder="Mô tả thắc mắc hoặc yêu cầu hợp tác của bạn..."
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
              />
            </div>
            <button
              type="button"
              className="w-full py-3 bg-[#E03C31] text-white font-bold rounded-xl hover:bg-[#B8281F] transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Gửi thông điệp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
