-- AlterTable
ALTER TABLE "form_data" ADD CONSTRAINT "form_data_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "query_data" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "formDataID" UUID NOT NULL,

    CONSTRAINT "query_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "query_data_formDataID_key" ON "query_data"("formDataID");

-- AddForeignKey
ALTER TABLE "query_data" ADD CONSTRAINT "query_data_formDataID_fkey" FOREIGN KEY ("formDataID") REFERENCES "form_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
