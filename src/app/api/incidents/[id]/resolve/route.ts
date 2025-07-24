import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming your prisma instance is here

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const updated = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: { camera: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
  }
}
