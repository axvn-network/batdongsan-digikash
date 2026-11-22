import { NextRequest, NextResponse } from "next/server";
import { PropertyRepository } from "@/lib/repositories/property.repo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const minLat = searchParams.get("minLat") ? Number(searchParams.get("minLat")) : undefined;
    const maxLat = searchParams.get("maxLat") ? Number(searchParams.get("maxLat")) : undefined;
    const minLng = searchParams.get("minLng") ? Number(searchParams.get("minLng")) : undefined;
    const maxLng = searchParams.get("maxLng") ? Number(searchParams.get("maxLng")) : undefined;

    let bbox;
    if (minLat && maxLat && minLng && maxLng) {
      bbox = { minLat, maxLat, minLng, maxLng };
    }

    const markers = await PropertyRepository.getBBoxMarkers(bbox);
    return NextResponse.json({ success: true, data: markers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
