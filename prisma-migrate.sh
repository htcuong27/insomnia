echo "Starting Prisma Migrate..."
(
    cd backend

    npx prisma db push
) &