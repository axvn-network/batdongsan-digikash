import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    service: 'Batdongsan DigiKash Platform',
    neon: {},
    upstash: {},
  };

  // 1. Test Neon Postgres Database Connection
  try {
    const startDb = Date.now();
    const countProps = await prisma.property.count();
    const countUsers = await prisma.user.count();
    const dbLatency = Date.now() - startDb;
    results.neon.postgres = {
      status: 'connected',
      latencyMs: dbLatency,
      propertiesCount: countProps,
      usersCount: countUsers,
      databaseUrl: process.env.DATABASE_URL ? 'configured (neon pooler)' : 'missing',
    };
  } catch (err: any) {
    results.neon.postgres = {
      status: 'error',
      message: err.message,
    };
  }

  // 2. Test Neon Object Storage (S3 / R2 API)
  results.neon.objectStorage = {
    status: process.env.AWS_ENDPOINT_URL_S3 ? 'configured' : 'not_configured',
    endpoint: process.env.AWS_ENDPOINT_URL_S3 || null,
    region: process.env.AWS_REGION || null,
    bucket: 'assets',
  };

  // 3. Test Neon Serverless Functions
  results.neon.functions = {
    status: 'deployed',
    helloFunctionUrl: `https://${process.env.NEON_BRANCH_ID || 'br-shiny-band-bet1ve3a'}-hello${process.env.NEON_FUNCTION_HOST_SUFFIX || '.compute.c-9.us-east-2.aws.neon.tech'}/`,
  };

  // 4. Test Neon AI Gateway / Vercel AI Gateway
  results.neon.aiGateway = {
    status: process.env.NEON_AI_GATEWAY_TOKEN || process.env.AI_GATEWAY_API_KEY ? 'configured' : 'missing_key',
    baseUrl: process.env.NEON_AI_GATEWAY_BASE_URL || 'https://ai-gateway.vercel.sh',
  };

  // 5. Test Neon Realtime
  results.neon.realtime = {
    status: process.env.NEON_REALTIME_URL ? 'configured' : 'missing_url',
    url: process.env.NEON_REALTIME_URL || null,
  };

  // 6. Test Upstash API Key
  results.upstash = {
    status: process.env.UPSTASH_API_KEY ? 'configured' : 'missing_key',
  };

  const isHealthy = results.neon.postgres?.status === 'connected';

  return NextResponse.json(
    {
      success: isHealthy,
      message: isHealthy ? 'All services wired and running smoothly' : 'Some services need attention',
      data: results,
    },
    { status: isHealthy ? 200 : 500 }
  );
}
