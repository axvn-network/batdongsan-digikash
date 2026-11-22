import { PropertyRepository } from "@/lib/repositories/property.repo";
import { PropertyCard } from "@/components/property/property-card";
import { SearchFilters } from "@/components/search/search-filters";
import { SortSelect } from "@/components/search/sort-select";
import { Pagination } from "@/components/search/pagination";
import { PropertyMapView } from "@/components/property/property-map-view";
import Link from "next/link";
import { LayoutGrid, List, Map, Filter, SlidersHorizontal } from "lucide-react";

interface SearchPageProps {
  searchParams: {
    keyword?: string;
    city?: string;
    district?: string;
    propertyTypeId?: string;
    isForRent?: string;
    isVerifiedOnly?: string;
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
    bedrooms?: string;
    direction?: string;
    legalStatus?: string;
    sort?: string;
    page?: string;
    view?: "grid" | "list" | "map";
  };
}

export const revalidate = 30; // ISR

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const isForRent = searchParams.isForRent === "true";
  const viewMode = searchParams.view || "grid";
  const currentPage = Number(searchParams.page) || 1;

  const results = await PropertyRepository.search({
    keyword: searchParams.keyword,
    city: searchParams.city,
    district: searchParams.district,
    propertyTypeId: searchParams.propertyTypeId,
    isForRent: searchParams.isForRent !== undefined ? isForRent : undefined,
    isVerifiedOnly: searchParams.isVerifiedOnly === "true",
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    minArea: searchParams.minArea ? Number(searchParams.minArea) : undefined,
    maxArea: searchParams.maxArea ? Number(searchParams.maxArea) : undefined,
    bedrooms: searchParams.bedrooms ? Number(searchParams.bedrooms) : undefined,
    direction: searchParams.direction,
    legalStatus: searchParams.legalStatus,
    sort: (searchParams.sort as any) || "newest",
    page: currentPage,
    limit: 12,
  });

  const buildUrlWithView = (v: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("view", v);
    return `/bat-dong-san?${params.toString()}`;
  };

  const titlePrefix = isForRent ? "Cho thuê nhà đất" : "Mua bán nhà đất";
  const pageTitle = searchParams.city
    ? `${titlePrefix} tại ${searchParams.city}`
    : searchParams.keyword
    ? `Kết quả tìm kiếm cho "${searchParams.keyword}"`
    : `${titlePrefix} trên toàn quốc`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb & Heading */}
      <div>
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{titlePrefix}</span>
          {searchParams.city && (
            <>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{searchParams.city}</span>
            </>
          )}
        </nav>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Tìm thấy <strong>{results.total}</strong> bất động sản phù hợp với tiêu chí tìm kiếm
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left: Filters Sidebar */}
        <aside className="lg:col-span-1">
          <SearchFilters />
        </aside>

        {/* Right: Results + Map view toggle */}
        <section className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg text-xs font-semibold">
              <Link
                href={buildUrlWithView("grid")}
                className={`p-1.5 rounded-md flex items-center space-x-1.5 transition-all ${
                  viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
                title="Dạng lưới"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Lưới</span>
              </Link>
              <Link
                href={buildUrlWithView("list")}
                className={`p-1.5 rounded-md flex items-center space-x-1.5 transition-all ${
                  viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
                title="Dạng danh sách"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Danh sách</span>
              </Link>
              <Link
                href={buildUrlWithView("map")}
                className={`p-1.5 rounded-md flex items-center space-x-1.5 transition-all ${
                  viewMode === "map" ? "bg-white text-[#E03C31] shadow-sm font-bold" : "text-gray-500 hover:text-gray-900"
                }`}
                title="Xem trên bản đồ"
              >
                <Map className="w-4 h-4 text-[#E03C31]" />
                <span>Bản đồ (Map View)</span>
              </Link>
            </div>

            {/* Sort Select */}
            <SortSelect />
          </div>

          {/* Conditional View Rendering */}
          {viewMode === "map" ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-[#E03C31] flex items-center space-x-2">
                <Map className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>Chế độ xem Bản đồ (Map View):</strong> Bấm vào từng ghim giá để xem nhanh thông tin chi tiết và liên hệ môi giới.
                </span>
              </div>
              <PropertyMapView properties={results.items} />
            </div>
          ) : results.items.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3">
              <p className="text-4xl">🔍</p>
              <h3 className="text-base font-bold text-gray-900">Không tìm thấy bất động sản phù hợp</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Hãy thử điều chỉnh bộ lọc giá, khoảng diện tích hoặc mở rộng khu vực tìm kiếm của bạn.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "list"
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {results.items.map((prop) => (
                <PropertyCard key={prop.id} property={prop} viewMode={viewMode as any} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {viewMode !== "map" && (
            <Pagination currentPage={results.page} totalPages={results.totalPages} />
          )}
        </section>
      </div>
    </div>
  );
}
