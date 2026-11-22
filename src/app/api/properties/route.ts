import { NextRequest, NextResponse } from "next/server";
import { PropertyService } from "@/lib/services/property.service";
import { getSession } from "@/lib/auth/session";
import { propertyCreateSchema } from "@/lib/validators/property";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const keyword = searchParams.get("keyword") || undefined;
    const city = searchParams.get("city") || undefined;
    const district = searchParams.get("district") || undefined;
    const propertyTypeId = searchParams.get("propertyTypeId") || undefined;
    const isForRentParam = searchParams.get("isForRent");
    const isForRent = isForRentParam !== null && isForRentParam !== undefined ? isForRentParam === "true" : undefined;
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const minArea = searchParams.get("minArea") ? Number(searchParams.get("minArea")) : undefined;
    const maxArea = searchParams.get("maxArea") ? Number(searchParams.get("maxArea")) : undefined;
    const bedrooms = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined;
    const direction = searchParams.get("direction") || undefined;
    const legalStatus = searchParams.get("legalStatus") || undefined;
    const sort = (searchParams.get("sort") as any) || "newest";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;

    const result = await PropertyService.listProperties({
      keyword,
      city,
      district,
      propertyTypeId,
      isForRent,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      bedrooms,
      direction,
      legalStatus,
      sort,
      page,
      limit,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Vui lòng đăng nhập để đăng tin" }, { status: 401 });
    }

    const body = await req.json();
    const validated = propertyCreateSchema.parse(body);

    const images = validated.images.map((url, idx) => ({
      id: `img-${Date.now()}-${idx}`,
      propertyId: "",
      url,
      isPrimary: idx === 0,
      order: idx,
    }));

    const created = await PropertyService.createProperty(
      {
        ...validated,
        images,
      },
      session.userId
    );

    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Không thể tạo tin đăng" },
      { status: 400 }
    );
  }
}
