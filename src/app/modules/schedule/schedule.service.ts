import { PrismaClient } from "@prisma/client";
import { addHours, addMinutes, compareAsc, format } from "date-fns";

const createschedule = async (payload: any) => {
  const { startdate, enddate, starttime, endtime } = payload;
  const intervetime = 30;
  const prisma = new PrismaClient()

  const schedules = []

  const currentdate = new Date(startdate);
  const lastdate = new Date(enddate);

  while (currentdate <= lastdate) {
    let startdatetime = new Date(
      addMinutes(
        addHours(
          `${format(currentdate, "yyyy-MM-dd")}`,
          Number(starttime.split(":")[0])
        ),
        Number(starttime.split(":")[1])
      )
    );

    const enddatetime = new Date(
      addMinutes(
        addHours(
          `${format(currentdate, "yyyy-MM-dd")}`,
          Number(endtime.split(":")[0])
        ),
        Number(endtime.split(":")[1])
      )
    );



    while(startdatetime < enddatetime) {
        const slotstartdatetime = startdatetime
        const slotenddatetime = addMinutes(startdatetime, intervetime)

        console.log({slotstartdatetime, slotenddatetime})

        const scheduledata = {
            starttime : slotstartdatetime,
            endtime : slotenddatetime
        }
        

        const existschedule = await prisma.schedule.findFirst({
            where: scheduledata
        })

        if (!existschedule) {
            const result = await prisma.schedule.create({
                data: scheduledata
            })
            schedules.push(result)
        }


        startdatetime = addMinutes(startdatetime, intervetime);

    }

     currentdate.setDate(currentdate.getDate() + 1)
  }
    await prisma.$disconnect();


  return schedules;
};

export const scheduleservice = {
  createschedule,
};
