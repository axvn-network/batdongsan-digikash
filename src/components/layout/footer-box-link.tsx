"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Layers, Building, Home, MapPin, KeyRound, Sparkles } from "lucide-react";

export function FooterBoxLink() {
  const [activeTab, setActiveTab] = useState<string>("BAN");
  const [expandedCols, setExpandedCols] = useState<Record<string, boolean>>({});
  const [openSubCategories, setOpenSubCategories] = useState<Record<string, boolean>>({
    "ban-can-ho": true,
    "thue-can-ho": true,
    "ha-noi-ban": true,
    "hcm-ban": true,
    "vinhomes": true,
  });

  const toggleSubCategory = (key: string) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCol = (colId: string) => {
    setExpandedCols((prev) => ({
      ...prev,
      [colId]: !prev[colId],
    }));
  };

  return (
    <div className="js__box-link-footer js__footer-link-v2 bg-[#F8F9FA] border-t border-b border-gray-200 py-10 my-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Tabs for Footer Directory */}
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-3 overflow-x-auto text-xs font-bold scrollbar-none">
          {[
            { id: "BAN", label: "Bất động sản bán", icon: Home },
            { id: "THUE", label: "Bất động sản thuê", icon: KeyRound },
            { id: "TOANQUOC", label: "BĐS Toàn quốc (Hà Nội & TP.HCM)", icon: MapPin },
            { id: "DUAN", label: "Dự án nổi bật", icon: Building },
            { id: "CHUDUUTU", label: "Chủ đầu tư hàng đầu", icon: Layers },
            { id: "QUANHUYEN", label: "Bất động sản Quận/Huyện", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#E03C31] text-white shadow-xs"
                    : "bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Bất động sản bán */}
        {activeTab === "BAN" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 text-xs text-gray-600">
            {/* Cột 1 */}
            <div className="space-y-3">
              <div 
                onClick={() => toggleSubCategory("ban-can-ho")}
                className="font-bold text-gray-900 flex items-center justify-between cursor-pointer py-1 border-b border-gray-200"
              >
                <span className="text-sm text-[#E03C31]">Bán căn hộ chung cư</span>
                {openSubCategories["ban-can-ho"] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {openSubCategories["ban-can-ho"] && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                  <li><Link prefetch={false} href="/khu-vuc/ban-can-ho-tphcm" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư TP.HCM (Sổ đỏ)</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Hà%20Nội&propertyTypeId=can-ho-chung-cu" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Hà Nội</Link></li>
                  <li><Link prefetch={false} href="/khu-vuc/ban-can-ho-binh-duong" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Bình Dương</Link></li>
                  <li><Link prefetch={false} href="/khu-vuc/ban-nha-dat-da-nang" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Đà Nẵng</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Đồng%20Nai&propertyTypeId=can-ho-chung-cu" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Đồng Nai</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Hải%20Phòng" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Hải Phòng</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Khánh%20Hòa" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Nha Trang Khánh Hòa</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Bà%20Rịa%20-%20Vũng%20Tàu" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Vũng Tàu</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Quảng%20Ninh" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Quảng Ninh</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Cần%20Thơ" className="hover:text-[#E03C31] transition-colors">Bán Căn Hộ Chung Cư Cần Thơ</Link></li>
                </ul>
              )}

              <div 
                onClick={() => toggleSubCategory("ban-mini")}
                className="font-bold text-gray-900 flex items-center justify-between cursor-pointer py-1 border-b border-gray-200 mt-4"
              >
                <span>Bán chung cư mini, căn hộ dịch vụ</span>
                {openSubCategories["ban-mini"] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {openSubCategories["ban-mini"] && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                  <li><Link prefetch={false} href="/bat-dong-san?keyword=chung%20cư%20mini" className="hover:text-[#E03C31]">Chung Cư Mini Hà Nội Dòng Tiền Tốt</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Hồ%20Chí%20Minh&keyword=căn%20hộ%20dịch%20vụ" className="hover:text-[#E03C31]">Căn Hộ Dịch Vụ TP.HCM Đang Khai Thác</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Đà%20Nẵng&keyword=mini" className="hover:text-[#E03C31]">Căn Hộ Dịch Vụ Đà Nẵng</Link></li>
                </ul>
              )}
            </div>

            {/* Cột 2 */}
            <div className="space-y-3">
              <div 
                onClick={() => toggleSubCategory("ban-nha-rieng")}
                className="font-bold text-gray-900 flex items-center justify-between cursor-pointer py-1 border-b border-gray-200"
              >
                <span className="text-sm text-[#E03C31]">Bán nhà riêng, nhà phố</span>
                {openSubCategories["ban-nha-rieng"] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {openSubCategories["ban-nha-rieng"] && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                  <li><Link prefetch={false} href="/khu-vuc/nha-dat-ban-ha-noi" className="hover:text-[#E03C31]">Bán Nhà Riêng Hà Nội Chính Chủ</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Hồ%20Chí%20Minh&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng TP.HCM Hẻm Xe Hơi</Link></li>
                  <li><Link prefetch={false} href="/khu-vuc/ban-nha-dat-da-nang" className="hover:text-[#E03C31]">Bán Nhà Riêng Đà Nẵng Hải Châu, Sơn Trà</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Bình%20Dương&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng Bình Dương Dĩ An, Thuận An</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Hải%20Phòng&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng Hải Phòng</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Đồng%20Nai&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng Biên Hòa Đồng Nai</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Khánh%20Hòa&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng Nha Trang Khánh Hòa</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?city=Cần%20Thơ&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng Cần Thơ</Link></li>
                </ul>
              )}

              <div 
                onClick={() => toggleSubCategory("ban-biet-thu")}
                className="font-bold text-gray-900 flex items-center justify-between cursor-pointer py-1 border-b border-gray-200 mt-4"
              >
                <span>Bán biệt thự, liền kề</span>
                {openSubCategories["ban-biet-thu"] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {openSubCategories["ban-biet-thu"] && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=biet-thu-lien-ke&city=Hà%20Nội" className="hover:text-[#E03C31]">Biệt Thự Liền Kề Hà Nội Starlake, Ciputra</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=biet-thu-lien-ke&city=Hồ%20Chí%20Minh" className="hover:text-[#E03C31]">Biệt Thự Liền Kề TP.HCM Thảo Điền, Q7</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=biet-thu-lien-ke" className="hover:text-[#E03C31]">Biệt Thự Đơn Lập, Song Lập Toàn Quốc</Link></li>
                </ul>
              )}
            </div>

            {/* Cột 3 */}
            <div className="space-y-3">
              <div 
                onClick={() => toggleSubCategory("ban-mat-pho")}
                className="font-bold text-gray-900 flex items-center justify-between cursor-pointer py-1 border-b border-gray-200"
              >
                <span className="text-sm text-[#E03C31]">Bán nhà mặt phố & shophouse</span>
                {openSubCategories["ban-mat-pho"] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {openSubCategories["ban-mat-pho"] && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=nha-mat-pho&city=Hà%20Nội" className="hover:text-[#E03C31]">Bán Nhà Mặt Phố Hà Nội Đống Đa, Hoàn Kiếm</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=nha-mat-pho&city=Hồ%20Chí%20Minh" className="hover:text-[#E03C31]">Bán Nhà Mặt Tiền TP.HCM Kinh Doanh Sầm Uất</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?keyword=shophouse" className="hover:text-[#E03C31]">Bán Shophouse Vinhomes, Masteri, Ecopark</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=nha-mat-pho&city=Đà%20Nẵng" className="hover:text-[#E03C31]">Bán Nhà Mặt Tiền Đà Nẵng Ven Biển</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?keyword=shophouse&city=Bình%20Dương" className="hover:text-[#E03C31]">Bán Shophouse Nhà Phố Thương Mại Bình Dương</Link></li>
                </ul>
              )}

              <div 
                onClick={() => toggleSubCategory("ban-dat-nen")}
                className="font-bold text-gray-900 flex items-center justify-between cursor-pointer py-1 border-b border-gray-200 mt-4"
              >
                <span>Bán đất nền, đất thổ cư</span>
                {openSubCategories["ban-dat-nen"] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {openSubCategories["ban-dat-nen"] && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=dat-nen" className="hover:text-[#E03C31]">Đất Nền Dự Án Quy Hoạch 1/500 Chuẩn</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=dat-nen&city=Đà%20Nẵng" className="hover:text-[#E03C31]">Bán Đất Nền Đà Nẵng Nam Hòa Xuân</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=dat-nen&city=Đồng%20Nai" className="hover:text-[#E03C31]">Bán Đất Nền Đồng Nai Sân Bay Long Thành</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=dat-nen&city=Bình%20Dương" className="hover:text-[#E03C31]">Bán Đất Nền Bình Dương Giá Đầu Tư</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?propertyTypeId=dat-nen&city=Long%20An" className="hover:text-[#E03C31]">Bán Đất Long An Bến Lức, Cần Giuộc</Link></li>
                </ul>
              )}
            </div>

            {/* Cột 4 */}
            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                BĐS Nghỉ dưỡng & Sản xuất
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?keyword=condotel" className="hover:text-[#E03C31]">Bán Condotel Căn Hộ Du Lịch Vũng Tàu</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=condotel&city=Khánh%20Hòa" className="hover:text-[#E03C31]">Bán Condotel Panorama, The Arena Cam Ranh</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=kho%20xưởng" className="hover:text-[#E03C31]">Bán Kho, Nhà Xưởng Bình Dương KCN</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=kho%20xưởng&city=Đồng%20Nai" className="hover:text-[#E03C31]">Bán Kho Xưởng Đồng Nai Gần Cảng Biển</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=trang%20trại" className="hover:text-[#E03C31]">Bán Trang Trại, Khu Nghỉ Dưỡng Ba Vì, Hòa Bình</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=nghỉ%20dưỡng" className="hover:text-[#E03C31]">Bán Biệt Thự Nghỉ Dưỡng Ven Biển Phú Quốc</Link></li>
              </ul>

              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 mt-4 text-[11px] text-gray-600">
                <p className="font-bold text-[#E03C31] mb-1">Chợ BĐS Sạch DigiKash</p>
                <p>100% tin đăng trên sàn đều được kiểm duyệt giấy chứng nhận và cam kết không tin ảo.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bất động sản thuê */}
        {activeTab === "THUE" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 text-xs text-gray-600">
            <div className="space-y-3">
              <div 
                onClick={() => toggleSubCategory("thue-can-ho")}
                className="font-bold text-gray-900 flex items-center justify-between cursor-pointer py-1 border-b border-gray-200"
              >
                <span className="text-sm text-[#E03C31]">Thuê căn hộ chung cư</span>
                {openSubCategories["thue-can-ho"] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {openSubCategories["thue-can-ho"] && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                  <li><Link prefetch={false} href="/khu-vuc/cho-thue-can-ho-tphcm" className="hover:text-[#E03C31]">Cho Thuê Căn Hộ TP.HCM Vinhomes, Masteri</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&propertyTypeId=can-ho-chung-cu" className="hover:text-[#E03C31]">Cho Thuê Căn Hộ Chung Cư Hà Nội</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Đà%20Nẵng" className="hover:text-[#E03C31]">Thuê Căn Hộ Chung Cư Đà Nẵng Đầy Đủ Nội Thất</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Bình%20Dương" className="hover:text-[#E03C31]">Thuê Căn Hộ Chung Cư Bình Dương Chuyên Gia</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hải%20Phòng" className="hover:text-[#E03C31]">Thuê Căn Hộ Chung Cư Hải Phòng</Link></li>
                  <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=chung%20cư%20mini" className="hover:text-[#E03C31]">Thuê Chung Cư Mini, Căn Hộ Dịch Vụ</Link></li>
                </ul>
              )}
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Thuê nhà nguyên căn & biệt thự
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Cho Thuê Nhà Nguyên Căn TP.HCM Giá Tốt</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Cho Thuê Nhà Riêng Hà Nội Ở & Kinh Doanh</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&propertyTypeId=biet-thu-lien-ke" className="hover:text-[#E03C31]">Thuê Biệt Thự Liền Kề Vinhomes, Starlake</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&propertyTypeId=nha-mat-pho" className="hover:text-[#E03C31]">Thuê Nhà Mặt Tiền Kinh Doanh, Mở Showroom</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=shophouse" className="hover:text-[#E03C31]">Thuê Shophouse Nhà Phố Thương Mại</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Thuê phòng trọ & văn phòng
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=phòng%20trọ" className="hover:text-[#E03C31]">Thuê Phòng Trọ Giá Rẻ Sinh Viên, Người Đi Làm</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&keyword=phòng%20trọ" className="hover:text-[#E03C31]">Thuê Nhà Trọ Phòng Trọ Cầu Giấy, Đống Đa</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hồ%20Chí%20Minh&keyword=phòng%20trọ" className="hover:text-[#E03C31]">Thuê Phòng Trọ TP.HCM Quận 10, Bình Thạnh, Thủ Đức</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&propertyTypeId=van-phong" className="hover:text-[#E03C31]">Thuê Văn Phòng Hạng A, B, C Trung Tâm</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=sang%20nhượng" className="hover:text-[#E03C31]">Thuê Sang Nhượng Cửa Hàng, Kiot Trực Tiếp</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Thuê kho bãi & đất sản xuất
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=kho%20xưởng" className="hover:text-[#E03C31]">Cho Thuê Kho, Nhà Xưởng KCN Bình Dương</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=kho%20xưởng&city=Đồng%20Nai" className="hover:text-[#E03C31]">Thuê Kho Bãi Xưởng Sản Xuất Đồng Nai</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=kho%20xưởng&city=Long%20An" className="hover:text-[#E03C31]">Thuê Kho Nhà Xưởng Long An Xe Container Vào Tận Cửa</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&keyword=kho%20xưởng&city=Hà%20Nội" className="hover:text-[#E03C31]">Thuê Kho Xưởng Đất Hà Nội Gia Lâm, Đông Anh</Link></li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: BĐS Toàn quốc (Hà Nội & TP.HCM) */}
        {activeTab === "TOANQUOC" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs text-gray-600">
            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Mua bán BĐS Hà Nội
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?city=Hà%20Nội&propertyTypeId=can-ho-chung-cu" className="hover:text-[#E03C31]">Bán Căn Hộ Chung Cư Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hà%20Nội&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng Hà Nội Thổ Cư</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hà%20Nội&propertyTypeId=nha-mat-pho" className="hover:text-[#E03C31]">Bán Nhà Mặt Phố Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hà%20Nội&propertyTypeId=biet-thu-lien-ke" className="hover:text-[#E03C31]">Bán Biệt Thự Liền Kề Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hà%20Nội&propertyTypeId=dat-nen" className="hover:text-[#E03C31]">Bán Đất Nền Dự Án Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hà%20Nội&keyword=shophouse" className="hover:text-[#E03C31]">Bán Shophouse Nhà Phố Thương Mại Hà Nội</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Cho thuê BĐS Hà Nội
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&propertyTypeId=can-ho-chung-cu" className="hover:text-[#E03C31]">Cho Thuê Căn Hộ Chung Cư Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Thuê Nhà Nguyên Căn Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&keyword=phòng%20trọ" className="hover:text-[#E03C31]">Cho Thuê Nhà Trọ Phòng Trọ Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&propertyTypeId=nha-mat-pho" className="hover:text-[#E03C31]">Thuê Nhà Mặt Phố Hà Nội</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hà%20Nội&propertyTypeId=van-phong" className="hover:text-[#E03C31]">Thuê Văn Phòng Hà Nội Keangnam, Lotte</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Mua bán BĐS TP. Hồ Chí Minh
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/khu-vuc/ban-can-ho-tphcm" className="hover:text-[#E03C31]">Bán Căn Hộ Chung Cư TP.HCM Sổ Hồng</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hồ%20Chí%20Minh&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Bán Nhà Riêng TP.HCM Quận 1, 3, 7, Bình Thạnh</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hồ%20Chí%20Minh&propertyTypeId=nha-mat-pho" className="hover:text-[#E03C31]">Bán Nhà Mặt Tiền TP.HCM</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hồ%20Chí%20Minh&propertyTypeId=biet-thu-lien-ke" className="hover:text-[#E03C31]">Bán Biệt Thự Liền Kề TP.HCM</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hồ%20Chí%20Minh&propertyTypeId=dat-nen" className="hover:text-[#E03C31]">Bán Đất Nền TP.HCM</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?city=Hồ%20Chí%20Minh&keyword=shophouse" className="hover:text-[#E03C31]">Bán Shophouse TP.HCM</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Cho thuê BĐS TP. Hồ Chí Minh
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/khu-vuc/cho-thue-can-ho-tphcm" className="hover:text-[#E03C31]">Cho Thuê Căn Hộ Chung Cư TP.HCM</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hồ%20Chí%20Minh&propertyTypeId=nha-rieng" className="hover:text-[#E03C31]">Thuê Nhà Nguyên Căn TP.HCM</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hồ%20Chí%20Minh&keyword=phòng%20trọ" className="hover:text-[#E03C31]">Cho Thuê Nhà Trọ Phòng Trọ TP.HCM</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hồ%20Chí%20Minh&propertyTypeId=nha-mat-pho" className="hover:text-[#E03C31]">Thuê Nhà Mặt Tiền TP.HCM</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?isForRent=true&city=Hồ%20Chí%20Minh&propertyTypeId=van-phong" className="hover:text-[#E03C31]">Thuê Văn Phòng TP.HCM Landmark 81, Bitexco</Link></li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Dự án nổi bật */}
        {activeTab === "DUAN" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs text-gray-600">
            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Căn hộ chung cư tiêu biểu
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/du-an/vinhomes-central-park" className="hover:text-[#E03C31]">Vinhomes Central Park (Bình Thạnh)</Link></li>
                <li><Link prefetch={false} href="/du-an/masteri-thao-dien" className="hover:text-[#E03C31]">Masteri Thảo Điền (TP. Thủ Đức)</Link></li>
                <li><Link prefetch={false} href="/du-an/the-matrix-one" className="hover:text-[#E03C31]">The Matrix One (Mỹ Đình, Hà Nội)</Link></li>
                <li><Link prefetch={false} href="/du-an/lumiere-riverside" className="hover:text-[#E03C31]">Lumière Riverside (Quận 2)</Link></li>
                <li><Link prefetch={false} href="/du-an/imperia-smart-city" className="hover:text-[#E03C31]">Imperia Smart City (Tây Mỗ)</Link></li>
                <li><Link prefetch={false} href="/du-an/sunwah-pearl" className="hover:text-[#E03C31]">Sunwah Pearl (Bình Thạnh)</Link></li>
                <li><Link prefetch={false} href="/du-an/bcons-city" className="hover:text-[#E03C31]">Bcons City (Dĩ An, Bình Dương)</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Khu đô thị sinh thái & Biệt thự
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/du-an/ecopark" className="hover:text-[#E03C31]">Khu Đô Thị Ecopark (Văn Giang)</Link></li>
                <li><Link prefetch={false} href="/du-an/ciputra-hanoi" className="hover:text-[#E03C31]">Khu Đô Thị Nam Thăng Long - Ciputra</Link></li>
                <li><Link prefetch={false} href="/du-an/starlake-tay-ho-tay" className="hover:text-[#E03C31]">Khu Đô Thị Starlake Tây Hồ Tây</Link></li>
                <li><Link prefetch={false} href="/du-an/van-phuc-city" className="hover:text-[#E03C31]">Khu Đô Thị Vạn Phúc City (Thủ Đức)</Link></li>
                <li><Link prefetch={false} href="/du-an/the-global-city" className="hover:text-[#E03C31]">The Global City (Masterise Homes)</Link></li>
                <li><Link prefetch={false} href="/du-an/aqua-city" className="hover:text-[#E03C31]">Aqua City (Novaland Đồng Nai)</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Đại đô thị Vinhomes
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/du-an/vinhomes-ocean-park" className="hover:text-[#E03C31]">Vinhomes Ocean Park 1, 2, 3</Link></li>
                <li><Link prefetch={false} href="/du-an/vinhomes-smart-city" className="hover:text-[#E03C31]">Vinhomes Smart City (Nam Từ Liêm)</Link></li>
                <li><Link prefetch={false} href="/du-an/vinhomes-grand-park" className="hover:text-[#E03C31]">Vinhomes Grand Park (Quận 9)</Link></li>
                <li><Link prefetch={false} href="/du-an/vinhomes-global-gate" className="hover:text-[#E03C31]">Vinhomes Global Gate (Cổ Loa Đông Anh)</Link></li>
                <li><Link prefetch={false} href="/du-an/vinhomes-royal-island" className="hover:text-[#E03C31]">Vinhomes Royal Island (Vũ Yên Hải Phòng)</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">
                Khu nghỉ dưỡng & Căn hộ du lịch
              </div>
              <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/du-an/the-song-vung-tau" className="hover:text-[#E03C31]">The Sóng Vũng Tàu (Bà Rịa - Vũng Tàu)</Link></li>
                <li><Link prefetch={false} href="/du-an/panorama-nha-trang" className="hover:text-[#E03C31]">Panorama Nha Trang (Khánh Hòa)</Link></li>
                <li><Link prefetch={false} href="/du-an/the-arena-cam-ranh" className="hover:text-[#E03C31]">The Arena Cam Ranh</Link></li>
                <li><Link prefetch={false} href="/du-an/novaworld-phan-thiet" className="hover:text-[#E03C31]">NovaWorld Phan Thiết (Bình Thuận)</Link></li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 5: Chủ đầu tư nổi bật */}
        {activeTab === "CHUDUUTU" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs text-gray-600">
            <div className="space-y-2">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">Vinhomes</div>
              <p className="text-[11px] text-gray-500">Tập đoàn Vingroup, số 1 phát triển đô thị thông minh tại Việt Nam.</p>
              <ul className="space-y-1 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Vinhomes" className="hover:text-[#E03C31]">Vinhomes Central Park, Ba Son, Grand Park</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Ocean%20Park" className="hover:text-[#E03C31]">Vinhomes Ocean Park 1, 2, 3</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Smart%20City" className="hover:text-[#E03C31]">Vinhomes Smart City Tây Mỗ</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">Masterise Homes</div>
              <p className="text-[11px] text-gray-500">Nhà phát triển bất động sản hàng hiệu quốc tế hàng đầu.</p>
              <ul className="space-y-1 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Masteri" className="hover:text-[#E03C31]">Masteri Thảo Điền, Masteri Centre Point</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Lumiere" className="hover:text-[#E03C31]">Lumière Riverside, Lumière SpringBay</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Global%20City" className="hover:text-[#E03C31]">The Global City Downtown TP.HCM</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">Khang Điền & Nam Long</div>
              <p className="text-[11px] text-gray-500">Pháp lý chuẩn chỉ, tiến độ xây dựng bảo chứng niềm tin.</p>
              <ul className="space-y-1 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?keyword=The%20Privia" className="hover:text-[#E03C31]">The Privia, Safira Khang Điền, Verosa Park</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Mizuki" className="hover:text-[#E03C31]">Mizuki Park, Akari City Nam Long</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Waterpoint" className="hover:text-[#E03C31]">Waterpoint Bến Lức Long An</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-gray-900 py-1 border-b border-gray-200 text-sm text-[#E03C31]">Phú Mỹ Hưng & Sunshine</div>
              <p className="text-[11px] text-gray-500">Biểu tượng quy hoạch đô thị kiểu mẫu Nam Sài Gòn & Hà Nội.</p>
              <ul className="space-y-1 pl-2 border-l border-gray-200">
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Phú%20Mỹ%20Hưng" className="hover:text-[#E03C31]">Midtown, Scenic Valley, Happy Valley</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Sunshine" className="hover:text-[#E03C31]">Sunshine City, Sunshine Riverside Tây Hồ</Link></li>
                <li><Link prefetch={false} href="/bat-dong-san?keyword=Ecopark" className="hover:text-[#E03C31]">Tập đoàn Ecopark Hưng Yên, Hải Dương</Link></li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 6: Bất động sản Quận/Huyện */}
        {activeTab === "QUANHUYEN" && (
          <div className="pt-6 space-y-4 text-xs text-gray-600">
            <div className="flex flex-wrap gap-2 text-[11px]">
              {[
                "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 7", "Quận 10", "Bình Thạnh", 
                "Phú Nhuận", "Gò Vấp", "Tân Bình", "Tân Phú", "TP. Thủ Đức", "Thảo Điền", 
                "An Phú", "Ba Đình", "Cầu Giấy", "Đống Đa", "Tây Hồ", "Nam Từ Liêm", "Long Biên"
              ].map((district) => (
                <Link
                  key={district}
                  href={`/bat-dong-san?keyword=${encodeURIComponent(district)}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-[#E03C31] hover:border-red-200 hover:bg-red-50/20 transition-all font-medium"
                >
                  BĐS {district}
                </Link>
              ))}
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs leading-relaxed text-gray-600">
              <span className="font-bold text-gray-900">Mạng lưới dữ liệu sâu 63 tỉnh thành: </span>
              Hệ thống cung cấp danh mục bất động sản đầy đủ từ từng phường xã, quận huyện đến các trục đường giao thông trọng điểm, tích hợp bản đồ quy hoạch và thẩm định pháp lý Sổ đỏ.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
