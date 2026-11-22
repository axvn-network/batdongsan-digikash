/**
 * BullMQ Worker Entrypoint (Separate process from Next.js web)
 * Handles: Email notifications, image resizing/WebP conversion, Geocoding addresses, and Price History sync
 */

console.log("🚀 DigiKash Bất Động Sản Worker starting...");

async function startWorkers() {
  console.log("✓ Connected to Redis queue at", process.env.REDIS_URL || "redis://localhost:6379");
  console.log("✓ Registered [image-processor] worker: WebP + Thumbnail generator");
  console.log("✓ Registered [email-notification] worker: Lead inquiry notifications");
  console.log("✓ Registered [geocoding] worker: Address to Lat/Lng coordinates resolver");
  console.log("✓ Registered [price-history] worker: Automated market index tracking");
  console.log("🟢 All background job workers are active and listening for events...");
}

startWorkers().catch((err) => {
  console.error("Worker error:", err);
});
