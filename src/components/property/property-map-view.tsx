"use client";

import { useState } from "react";
import { Property } from "@/types";
import { formatPrice, formatArea } from "@/lib/utils";
import { MapPin, X, ExternalLink, Bed, Bath } from "lucide-react";
import Link from "next/link";

interface PropertyMapViewProps {
  properties: Property[];
}

export function PropertyMapView({ properties = [] }: PropertyMapViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(properties[0] || null);

  // Compute map center
  const centerLat = properties.length > 0 ? properties[0].latitude : 10.7769;
  const centerLng = properties.length > 0 ? properties[0].longitude : 106.7009;

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${centerLng - 0.08}%2C${centerLat - 0.05}%2C${centerLng + 0.08}%2C${centerLat + 0.05}&layer=mapnik`;

  return (
    <div className="relative w-full h-[650px] bg-slate-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner flex">
      {/* Map iframe base */}
      <iframe
        title="Bản đồ tìm kiếm bất động sản"
        width="100%"
        height="100%"
        frameBorder="0"
        src={osmUrl}
        className="w-full h-full border-0"
      />

      {/* Interactive Markers Overlay Simulation with Clusters */}
      <div className="absolute inset-0 pointer-events-none p-6">
        <div className="relative w-full h-full pointer-events-auto">
          {properties.slice(0, 15).map((p, idx) => {
            // Distribute markers visually across map view space
            const leftPct = 15 + ((idx * 27) % 65) + (idx % 3) * 4;
            const topPct = 20 + ((idx * 33) % 55) + (idx % 2) * 5;
            const isSelected = selectedProperty?.id === p.id;

            return (
              <div
                key={p.id}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-20 hover:z-30"
                onClick={() => setSelectedProperty(p)}
              >
                <div
                  className={`px-2.5 py-1 rounded-full font-bold text-xs shadow-lg transition-transform flex items-center space-x-1 ${
                    isSelected
                      ? "bg-slate-900 text-white ring-4 ring-red-400 scale-110"
                      : "bg-[#E03C31] text-white hover:scale-105"
                  }`}
                >
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>{formatPrice(p.price, p.isForRent)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Property Popup Card */}
      {selectedProperty && (
        <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-40 transition-all animate-in fade-in slide-in-from-bottom-4">
          <div className="relative h-40 bg-gray-100">
            <img
              src={selectedProperty.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"}
              alt={selectedProperty.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-2.5 right-2.5 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute top-2.5 left-2.5 bg-[#E03C31] text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
              {formatPrice(selectedProperty.price, selectedProperty.isForRent)}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <Link href={`/bat-dong-san/${selectedProperty.slug}`}>
              <h4 className="font-bold text-gray-900 text-sm line-clamp-1 hover:text-[#E03C31] transition-colors">
                {selectedProperty.title}
              </h4>
            </Link>

            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <span className="font-semibold text-gray-900">{formatArea(selectedProperty.area)}</span>
              {selectedProperty.bedrooms > 0 && (
                <>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Bed className="w-3.5 h-3.5 text-gray-400" />
                    <span>{selectedProperty.bedrooms} PN</span>
                  </span>
                </>
              )}
              {selectedProperty.bathrooms > 0 && (
                <>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Bath className="w-3.5 h-3.5 text-gray-400" />
                    <span>{selectedProperty.bathrooms} WC</span>
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-gray-500 truncate flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span>{selectedProperty.address}</span>
            </p>

            <div className="pt-2 flex justify-between items-center">
              <Link
                href={`/bat-dong-san/${selectedProperty.slug}`}
                className="w-full text-center py-2 bg-[#E03C31] hover:bg-[#B8281F] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1"
              >
                <span>Xem chi tiết tin đăng</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
