const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Cameras
  const cam1 = await prisma.camera.create({
    data: { name: 'Entrance A', location: 'Main Gate' },
  });

  const cam2 = await prisma.camera.create({
    data: { name: 'Vault Cam', location: 'Vault Room' },
  });

  const cam3 = await prisma.camera.create({
    data: { name: 'Shop Floor', location: 'Retail Area' },
  });

  const types = ['Unauthorised Access', 'Gun Threat', 'Face Recognised'];

  const baseTime = new Date('2025-07-21T00:00:00Z');

  
  const incidents = Array.from({ length: 10 }, (_, i) => {
    const camera = [cam1, cam2, cam3][i % 3];
    const type = types[i % 3];

    const minute = (i + 1) * 2; // 2, 4, ..., 20 mins
    const tsStart = new Date(baseTime.getTime() + minute * 60 * 1000);
    const tsEnd = new Date(tsStart.getTime() + 60 * 1000);
    const getThumbnailByType = (type: string) => {
  switch (type) {
    case "Unauthorised Access":
      return "/thumbnails/thumb1.jpg";
    case "Gun Threat":
      return "/thumbnails/thumb2.jpg";
    case "Face Recognised":
      return "/thumbnails/thumb3.jpg";
    default:
      return "/thumbnails/thumb1.jpg"; 
  }
};

    return {
      type,
      tsStart,
      tsEnd,
      thumbnailUrl: getThumbnailByType(type),
      resolved: false,
      cameraId: camera.id,
    };
  });

  await prisma.incident.createMany({ data: incidents });

  console.log(' Seeded 3 cameras and 10 incidents!');
}

main().finally(() => prisma.$disconnect());
