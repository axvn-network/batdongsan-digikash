"use client";

import { useState } from "react";
import { PropertyImage } from "@/types";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({ images = [], title }: PropertyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        Không có hình ảnh
      </div>
    );
  }

  const prev = () => setActiveIdx((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () => setActiveIdx((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  return (
    <div className="space-y-3">
      {/* Main Large Image */}
      <div className="relative w-full h-[360px] sm:h-[480px] bg-black rounded-2xl overflow-hidden group">
        <img
          src={images[activeIdx]?.url}
          alt={`${title} - hình ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Prev / Next controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image count pill */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-semibold">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                activeIdx === idx ? "border-[#E03C31] shadow-md scale-95" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
