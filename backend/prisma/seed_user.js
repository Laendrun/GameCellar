const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashed,
      isAdmin: true,
    },
  });

  console.log('Admin user created.');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
