-- CreateTable
CREATE TABLE "Experiences" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" BYTEA NOT NULL,
    "slot" JSONB NOT NULL,

    CONSTRAINT "Experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Promos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "experienceId" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promos_name_key" ON "Promos"("name");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
