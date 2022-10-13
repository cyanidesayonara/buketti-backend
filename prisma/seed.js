/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const load = async () => {
  try {
    const users = [
      {
        name: 'Antonio',
        email: 'antonio@email.com',
      },
      {
        name: 'Bianca',
        email: 'bianca@email.com',
      },
      {
        name: 'Cecilia',
        email: 'cecilia@email.com',
      },
    ];
    await prisma.user.createMany({ data: users });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
