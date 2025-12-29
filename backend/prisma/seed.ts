import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('admin', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {
            password: password,
            role: UserRole.ADMIN,
            username: 'admin'
        },
        create: {
            email: 'admin@example.com',
            username: 'admin',
            name: 'Admin User',
            password: password,
            role: UserRole.ADMIN,
            firebaseUid: 'admin-uid-placeholder', // Optional now, but good to have value if needed
        },
    });
    console.log({ admin });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
