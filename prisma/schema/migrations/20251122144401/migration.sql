/*
  Warnings:

  - You are about to drop the `Paitant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paitant" DROP CONSTRAINT "Paitant_email_fkey";

-- DropTable
DROP TABLE "Paitant";

-- CreateTable
CREATE TABLE "Pataint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilephoto" TEXT,
    "address" TEXT,
    "isdeleted" BOOLEAN NOT NULL DEFAULT true,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pataint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pataint_email_key" ON "Pataint"("email");

-- AddForeignKey
ALTER TABLE "Pataint" ADD CONSTRAINT "Pataint_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
