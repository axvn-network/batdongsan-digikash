"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Layers } from "lucide-react";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  address: string;
  title: string;
}

export function PropertyMap({ latitude, longitude, address, title }: PropertyMapProps) {
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");
  const zoom = 15;

  // Render high quality interactive OpenStreetMap iframe / embed with custom marker pin
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.008}%2C${latitude - 0.005}%2C${longitude + 0.008}%2C${latitude + 0.005}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-[#E03C31]" />
            <span>Vị trí trên bản đồ</span>
          </h3>
          <p className="text-xs text-gray-500 truncate max-w-md mt-0.5">{address}</p>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded-lg font-medium"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Chỉ đường</span>
          </a>
        </div>
      </div>

      <div className="relative w-full h-80 bg-slate-100">
        <iframe
          title="Bản đồ vị trí"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={osmUrl}
          className="w-full h-full border-0"
        />

        {/* Floating location card */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto max-w-sm bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200 text-xs">
          <p className="font-bold text-gray-900 line-clamp-1">{title}</p>
          <p className="text-gray-500 text-[11px] mt-0.5">{address}</p>
          <p className="text-gray-400 text-[10px] mt-1">Tọa độ GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
}
