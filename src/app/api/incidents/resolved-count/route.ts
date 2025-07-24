// src/app/api/incidents/resolved-count/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.incident.count({
      where: { resolved: true },
    });

    return NextResponse.json({ resolvedCount: count });
  } catch (error) {
    console.error("Error fetching resolved count:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
