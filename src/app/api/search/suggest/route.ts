import { NextRequest, NextResponse } from "next/server";
import { CITIES, PROPERTY_TYPES } from "@/lib/constants";
import { MOCK_PROJECTS } from "@/lib/repositories/mock-data";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").toLowerCase().trim();
  if (!q) {
    return NextResponse.json({ success: true, data: [] });
  }

  const suggestions: Array<{ type: string; label: string; url: string }> = [];

  // Match Cities
  CITIES.forEach((c) => {
    if (c.name.toLowerCase().includes(q)) {
      suggestions.push({
        type: "Tỉnh / Thành phố",
        label: c.name,
        url: `/bat-dong-san?city=${encodeURIComponent(c.name)}`,
      });
    }
  });

  // Match Types
  PROPERTY_TYPES.forEach((pt) => {
    if (pt.name.toLowerCase().includes(q)) {
      suggestions.push({
        type: "Loại BĐS",
        label: pt.name,
        url: `/bat-dong-san?propertyTypeId=${pt.id}`,
      });
    }
  });

  // Match Projects
  MOCK_PROJECTS.forEach((p) => {
    if (p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)) {
      suggestions.push({
        type: "Dự án",
        label: `${p.name} (${p.location})`,
        url: `/du-an/${p.slug}`,
      });
    }
  });

  return NextResponse.json({ success: true, data: suggestions.slice(0, 8) });
}
