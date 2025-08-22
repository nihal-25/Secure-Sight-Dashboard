import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resolved = searchParams.get('resolved');

  const whereClause = resolved === 'false'
    ? { resolved: false }
    : {}; 

  const incidents = await prisma.incident.findMany({
    where: whereClause,
    orderBy: { tsStart: 'desc' },
    include: { camera: true },
  });

  return NextResponse.json(incidents);
}
