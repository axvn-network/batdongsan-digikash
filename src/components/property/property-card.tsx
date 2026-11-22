"use client";

import Link from "next/link";
import { Property } from "@/types";
import { formatPrice, formatArea, formatPricePerM2, timeAgo } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import { useCompare } from "@/hooks/use-compare";
import { Heart, Scale, Bed, Bath, MapPin, Camera, ShieldCheck } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  viewMode?: "grid" | "list";
}

export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addItem, removeItem, hasItem } = useCompare();

  const isFav = isFavorite(property.id);
  const isCompared = hasItem(property.id);
  const primaryImg = property.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
  const imageCount = property.images?.length || 1;

  return (
    <div
      className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex ${
        viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      {/* Image Thumbnail */}
      <div className={`relative overflow-hidden bg-gray-100 ${viewMode === "list" ? "sm:w-72 h-52 sm:h-auto flex-shrink-0" : "h-52 w-full"}`}>
        <Link href={`/bat-dong-san/${property.slug}`}>
          <img
            src={primaryImg}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {property.verification?.isVerified && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center space-x-1">
              <span>✓ Tin xác thực</span>
            </span>
          )}
          {property.isVip && (
            <span className="bg-[#E03C31] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
              VIP Kim Cương
            </span>
          )}
          {property.isFeatured && !property.isVip && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              Nổi bật
            </span>
          )}
        </div>

        {/* Top Right: Favorite & Compare */}
        <div className="absolute top-2.5 right-2.5 flex space-x-1.5 z-10">
          <button
            onClick={() => {
              if (isCompared) removeItem(property.id);
              else addItem(property);
            }}
            title={isCompared ? "Bỏ so sánh" : "Thêm vào so sánh"}
            className={`w-7 h-7 rounded-full backdrop-blur-md transition-all flex items-center justify-center shadow ${
              isCompared ? "bg-blue-600 text-white" : "bg-black/35 hover:bg-black/55 text-white"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            title={isFav ? "Bỏ lưu tin" : "Lưu tin"}
            className={`w-7 h-7 rounded-full backdrop-blur-md transition-all flex items-center justify-center shadow ${
              isFav ? "bg-white text-[#E03C31]" : "bg-black/35 hover:bg-black/55 text-white"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-[#E03C31] text-[#E03C31]" : ""}`} />
          </button>
        </div>

        {/* Bottom Left: Photo Counter (Batdongsan style) */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center space-x-1">
          <Camera className="w-3 h-3" />
          <span>{imageCount}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link href={`/bat-dong-san/${property.slug}`}>
            <h3 className="font-semibold text-[14px] sm:text-[15px] text-[#2C2C2C] line-clamp-2 group-hover:text-[#E03C31] transition-colors leading-[1.4] mb-2.5">
              {property.title}
            </h3>
          </Link>

          {/* Price & Area (Single Row) */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-2.5">
            <span className="text-[#E03C31] font-bold text-base tracking-tight">
              {formatPrice(property.price, property.isForRent)}
            </span>
            <span className="text-gray-300 font-light">·</span>
            <span className="text-[#2C2C2C] font-semibold text-sm">
              {formatArea(property.area)}
            </span>
            {property.pricePerM2 && !property.isForRent && (
              <>
                <span className="text-gray-300 font-light">·</span>
                <span className="text-gray-500 text-xs font-normal">
                  {formatPricePerM2(property.price, property.area)}
                </span>
              </>
            )}
          </div>

          {/* Specs */}
          {(property.bedrooms > 0 || property.bathrooms > 0 || property.direction) && (
            <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2.5">
              {property.bedrooms > 0 && (
                <div className="flex items-center space-x-1">
                  <Bed className="w-3.5 h-3.5 text-gray-400" />
                  <span>{property.bedrooms} PN</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center space-x-1">
                  <Bath className="w-3.5 h-3.5 text-gray-400" />
                  <span>{property.bathrooms} WC</span>
                </div>
              )}
              {property.direction && (
                <span>Hướng {property.direction}</span>
              )}
            </div>
          )}

          {/* Location */}
          <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{property.district}, {property.city}</span>
          </div>
        </div>

        {/* Footer: Date & Agent */}
        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>{timeAgo(property.createdAt)}</span>
          <div className="flex items-center space-x-1 text-gray-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate max-w-[130px]">{property.user?.name || "Môi giới chuyên nghiệp"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
