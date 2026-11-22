import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Ping truy vấn đơn giản để giữ ấm DB connection pool
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - startTime;

    return NextResponse.json({
      status: 'ok',
      service: 'batdongsan-marketplace',
      timestamp: new Date().toISOString(),
      database: 'connected',
      latencyMs: latency,
      environment: process.env.NODE_ENV,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'warning',
        service: 'batdongsan-marketplace',
        timestamp: new Date().toISOString(),
        database: 'unreachable',
        error: error.message || 'Database ping timeout',
      },
      { status: 200 } // Luôn trả 200 cho healthcheck probe
    );
  }
}
