import { ListingWizard } from "@/components/listing-form/listing-wizard";

export const metadata = {
  title: "Đăng tin bất động sản miễn phí",
  description: "Đăng tin bán hoặc cho thuê nhà đất, tiếp cận hơn 5 triệu người mua nhà mỗi tháng trên Batdongsan.com.vn",
};

export default function DangTinPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Đăng tin bất động sản
        </h1>
        <p className="text-xs text-gray-500">
          Quy trình 5 bước đơn giản, nhanh chóng tiếp cận khách hàng tiềm năng trên toàn quốc
        </p>
      </div>

      <ListingWizard />
    </div>
  );
}
