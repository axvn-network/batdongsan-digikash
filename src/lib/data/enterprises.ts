export interface Enterprise {
  slug: string;
  name: string;
  brand: string;
  logo: string;
  headquarters: string;
  phone: string;
  website: string;
  establishedYear: number;
  activeProjectsCount: number;
  description: string;
  highlightProjects: string[];
}

export const ENTERPRISES: Enterprise[] = [
  {
    slug: "vinhomes",
    name: "Công ty Cổ phần Vinhomes",
    brand: "Vinhomes",
    logo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80",
    headquarters: "Tòa nhà Symphony, Chu Huy Mân, KĐT Vinhomes Riverside, Long Biên, Hà Nội",
    phone: "1900 2323 89",
    website: "https://vinhomes.vn",
    establishedYear: 2008,
    activeProjectsCount: 45,
    description: "Nhà phát triển bất động sản thương mại và nhà ở số 1 Việt Nam, tiên phong kiến tạo các đại đô thị thông minh chuẩn quốc tế.",
    highlightProjects: ["Vinhomes Central Park", "Vinhomes Ocean Park 1, 2, 3", "Vinhomes Smart City", "Vinhomes Grand Park"],
  },
  {
    slug: "masterise-homes",
    name: "Masterise Homes",
    brand: "Masterise Homes",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
    headquarters: "Tòa nhà Masterise Group, 179 Xa Lộ Hà Nội, Thảo Điền, TP. Thủ Đức, TP.HCM",
    phone: "028 3915 9159",
    website: "https://masterisehomes.com",
    establishedYear: 2014,
    activeProjectsCount: 18,
    description: "Thành viên tập đoàn Masterise Group, tiên phong đưa tiêu chuẩn bất động sản hàng hiệu (Branded Residences) về Việt Nam.",
    highlightProjects: ["Grand Marina Saigon", "The Global City", "Lumière Riverside", "Masteri Centre Point"],
  },
  {
    slug: "nam-long",
    name: "Công ty Cổ phần Đầu tư Nam Long",
    brand: "Nam Long Group",
    logo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80",
    headquarters: "Số 6 Nguyễn Khắc Viện, Phường Tân Phú, Quận 7, TP.HCM",
    phone: "028 5416 1718",
    website: "https://namlongvn.com",
    establishedYear: 1992,
    activeProjectsCount: 22,
    description: "Hơn 30 năm kiến tạo các dòng sản phẩm nhà ở vừa túi tiền EHome, Flora và các khu đô thị sinh thái tích hợp quy mô lớn.",
    highlightProjects: ["Waterpoint Long An", "Mizuki Park", "Akari City", "Izumi City"],
  },
  {
    slug: "khang-dien",
    name: "Công ty Cổ phần Đầu tư và Kinh doanh Nhà Khang Điền",
    brand: "Khang Điền",
    logo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80",
    headquarters: "Tầng 1-2, Tòa nhà Mappletree Business Centre, 1060 Nguyễn Văn Linh, Quận 7, TP.HCM",
    phone: "028 3770 0300",
    website: "https://khangdien.com.vn",
    establishedYear: 2001,
    activeProjectsCount: 20,
    description: "Thương hiệu bất động sản nổi bật với nền tảng pháp lý minh bạch, bàn giao sổ hồng đúng hạn và quản lý vận hành chuyên nghiệp.",
    highlightProjects: ["The Privia", "Verosa Park", "Lovera Vista", "Safira Khang Điền"],
  },
  {
    slug: "ecopark",
    name: "Tập đoàn Ecopark",
    brand: "Ecopark",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
    headquarters: "Khu đô thị Ecopark, Xã Xuân Quan, Huyện Văn Giang, Hưng Yên",
    phone: "024 6262 9292",
    website: "https://ecopark.com.vn",
    establishedYear: 2003,
    activeProjectsCount: 12,
    description: "Nhà phát triển đại đô thị sinh thái xanh biểu tượng lớn nhất miền Bắc, tiên phong kiến trúc xanh gắn liền thiên nhiên.",
    highlightProjects: ["Ecopark Hưng Yên", "Eco Central Park Vinh", "Eco Village Saigon River"],
  },
  {
    slug: "novaland",
    name: "Công ty Cổ phần Tập đoàn Đầu tư Địa ốc No Va",
    brand: "Novaland Group",
    logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80",
    headquarters: "Tòa nhà Novaland, 65 Nguyễn Du, Phường Bến Nghé, Quận 1, TP.HCM",
    phone: "1900 636666",
    website: "https://novaland.com.vn",
    establishedYear: 1992,
    activeProjectsCount: 30,
    description: "Một trong những thương hiệu bất động sản lớn tại phía Nam với danh mục sản phẩm nhà ở trung tâm và đại đô thị du lịch nghỉ dưỡng.",
    highlightProjects: ["Aqua City", "NovaWorld Phan Thiết", "Sunrise City", "The Sun Avenue"],
  },
];
