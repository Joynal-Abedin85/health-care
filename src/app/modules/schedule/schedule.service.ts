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


const getschedule = async  ({
  page,
  limit,
  searchterm,
  sortby,
  sortorder,
  startdate,
  enddate,
  user
}: {
  page?: Number;
  limit?: Number;
  searchterm?: any;
  sortby?: any;
  sortorder?: any;
  startdate?: any;
  enddate?:any
  user?: any
}) => {

  const userpage = page || 1;
  const userlimit = limit || 10;
  const prisma = new PrismaClient();
  const skip = (userpage - 1) * userlimit;

   const whereCondition: any = {};

  if (startdate && enddate) {
    whereCondition.starttime = {
      gte: new Date(startdate),
      lte: new Date(enddate),
    };
  } else if (startdate) {
    whereCondition.starttime = {
      gte: new Date(startdate),
    };
  } else if (enddate) {
    whereCondition.starttime = {
      lte: new Date(enddate),
    };
  }


  console.log("su",user)


  const doctorschedules =await prisma.doctorschedule.findMany({
    where: {
        doctor: {
            email: user.email
        }
    },
    select: {
        scheduleid: true
    }
  })
  const doctorscheduleids = doctorschedules.map(schedule => schedule.scheduleid)
  console.log("sdoc",doctorschedules)

  const doctorschedule = await prisma.schedule.findMany({
    skip,
    take: userlimit,
    where: {
        ...whereCondition,
        id: {
            notIn: doctorscheduleids
        }
    },
    orderBy: {
      starttime: "asc"
    }
  });

  return doctorschedule;

}


const deleteschedule = async (id: string) => {

      const prisma = new PrismaClient()

    return await  prisma.schedule.delete({
        where: {
            id
        }
    })
}

export const scheduleservice = {
  createschedule,
  getschedule,
  deleteschedule
};
