import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PropertyService } from "@/lib/services/property.service";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertySpecs } from "@/components/property/property-specs";
import { PropertyMap } from "@/components/property/property-map";
import { PriceHistoryChart } from "@/components/property/price-history-chart";
import { AgentContactCard } from "@/components/property/agent-contact-card";
import { InquiryForm } from "@/components/property/inquiry-form";
import { PropertyCard } from "@/components/property/property-card";
import { VerificationBadge } from "@/components/property/verification-badge";
import { formatPrice, formatArea, formatPricePerM2, formatDateVi } from "@/lib/utils";
import { MapPin, Eye, Clock, Share2, Heart, Scale, ShieldCheck } from "lucide-react";

interface DetailProps {
  params: { slug: string };
}

export const revalidate = 60; // ISR 60s

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const property = await PropertyService.getPropertyDetail(params.slug);
  if (!property) return { title: "Không tìm thấy bất động sản" };

  const priceText = formatPrice(property.price, property.isForRent);
  const areaText = formatArea(property.area);
  const title = `${property.title} - Giá ${priceText}, diện tích ${areaText}`;

  return {
    title,
    description: property.description.slice(0, 160),
    openGraph: {
      title,
      description: property.description.slice(0, 160),
      images: property.images?.[0]?.url ? [{ url: property.images[0].url }] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: DetailProps) {
  const property = await PropertyService.getPropertyDetail(params.slug);
  if (!property) notFound();

  // Similar properties query
  const similar = await PropertyRepository.search({
    city: property.city,
    isForRent: property.isForRent,
    limit: 3,
  });
  const similarFiltered = similar.items.filter((p) => p.id !== property.id).slice(0, 3);

  // Schema Markup (RealEstateListing / SingleFamilyResidence)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://batdongsan.com.vn/bat-dong-san/${property.slug}`,
    image: property.images?.map((img) => img.url) || [],
    datePosted: property.createdAt,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "VND",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.district,
      addressRegion: property.city,
      addressCountry: "VN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
          <span>/</span>
          <Link
            href={`/bat-dong-san?isForRent=${property.isForRent}`}
            className="hover:text-gray-900"
          >
            {property.isForRent ? "Cho thuê nhà đất" : "Mua bán nhà đất"}
          </Link>
          <span>/</span>
          <Link
            href={`/bat-dong-san?city=${encodeURIComponent(property.city)}`}
            className="hover:text-gray-900"
          >
            {property.city}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">{property.district}</span>
        </nav>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Info Column (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Price Header Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <VerificationBadge verification={property.verification} />
                {property.isVip && (
                  <span className="bg-[#E03C31] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                    VIP Kim Cương
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                {property.title}
              </h1>

              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{property.address}</span>
              </div>

              {/* Price & Area Highlight Bar */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-baseline gap-6 bg-red-50/40 p-4 rounded-xl">
                <div>
                  <span className="text-xs text-gray-500 block">Mức giá niêm yết</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#E03C31]">
                    {formatPrice(property.price, property.isForRent)}
                  </span>
                  {property.pricePerM2 && !property.isForRent && (
                    <span className="text-xs text-gray-500 block mt-0.5 font-medium">
                      {formatPricePerM2(property.price, property.area)}
                    </span>
                  )}
                </div>

                <div className="border-l border-gray-200 pl-6">
                  <span className="text-xs text-gray-500 block">Diện tích sử dụng</span>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {formatArea(property.area)}
                  </span>
                </div>

                <div className="border-l border-gray-200 pl-6 hidden sm:block">
                  <span className="text-xs text-gray-500 block">Phòng ngủ / WC</span>
                  <span className="text-xl font-bold text-gray-800">
                    {property.bedrooms} PN • {property.bathrooms} WC
                  </span>
                </div>
              </div>

              {/* Metadata strip */}
              <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Đăng ngày: {formatDateVi(property.createdAt)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{property.viewsCount} lượt xem</span>
                  </span>
                </div>

                <span className="text-gray-400">Mã tin: {property.id}</span>
              </div>
            </div>

            {/* Property Specs */}
            <PropertySpecs property={property} />

            {/* Description Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
                Thông tin mô tả chi tiết
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-3">
                {property.description}
              </div>
            </div>

            {/* Price History Chart */}
            <PriceHistoryChart items={property.priceHistory} />

            {/* Map Card */}
            <PropertyMap
              latitude={property.latitude}
              longitude={property.longitude}
              address={property.address}
              title={property.title}
            />
          </div>

          {/* Right Sidebar Column (Sticky Contact & Inquiries) */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-20">
            {/* Agent Contact Card */}
            <AgentContactCard user={property.user} />

            {/* Inquiry Form */}
            <InquiryForm propertyId={property.id} propertyTitle={property.title} />
          </aside>
        </div>

        {/* Similar Listings */}
        {similarFiltered.length > 0 && (
          <section className="pt-8 border-t border-gray-200 space-y-6">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Bất động sản tương tự trong khu vực
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarFiltered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
