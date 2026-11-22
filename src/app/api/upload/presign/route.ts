import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Demo upload handler: returns a high quality placeholder image URL
  const demoImages = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
  ];
  const url = demoImages[Math.floor(Math.random() * demoImages.length)];
  return NextResponse.json({
    success: true,
    url,
    presignedUrl: url,
  });
}
