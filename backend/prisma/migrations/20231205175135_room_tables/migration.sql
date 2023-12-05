/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "texts" TEXT[],

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnRoom" (
    "roomId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "UserOnRoom_pkey" PRIMARY KEY ("usersId","roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "UserOnRoom" ADD CONSTRAINT "UserOnRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnRoom" ADD CONSTRAINT "UserOnRoom_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
