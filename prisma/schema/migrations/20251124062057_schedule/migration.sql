-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "starttime" TIMESTAMP(3) NOT NULL,
    "endtime" TIMESTAMP(3) NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctorschedule" (
    "doctorid" TEXT NOT NULL,
    "scheduleid" TEXT NOT NULL,
    "booking" BOOLEAN NOT NULL DEFAULT false,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctorschedule_pkey" PRIMARY KEY ("doctorid","scheduleid")
);

-- AddForeignKey
ALTER TABLE "Doctorschedule" ADD CONSTRAINT "Doctorschedule_doctorid_fkey" FOREIGN KEY ("doctorid") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctorschedule" ADD CONSTRAINT "Doctorschedule_scheduleid_fkey" FOREIGN KEY ("scheduleid") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
