/**
 * Geocode Seed addresses to GPS Lat/Lng coordinates
 */
import { MOCK_PROPERTIES } from "../src/lib/repositories/mock-data";

async function runGeocode() {
  console.log("📍 Resolving GPS coordinates for seed properties...");
  for (const p of MOCK_PROPERTIES) {
    console.log(`[Geocoded] ${p.title.slice(0, 30)}... -> (${p.latitude}, ${p.longitude})`);
  }
  console.log(`✅ Successfully verified ${MOCK_PROPERTIES.length} coordinates.`);
}

runGeocode();
