-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "scope" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerified" BOOLEAN,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
