import { Doctor, Prisma, PrismaClient } from "@prisma/client";

const getdoctor = async ({
  page,
  limit,
  searchterm,
  sortby,
  sortorder,
  email,
  contectnumber,
  gender,
  apointmentfee,
}: {
  page?: Number;
  limit?: Number;
  searchterm?: any;
  sortby?: any;
  sortorder?: any;
  email?: any;
  contectnumber?: any;
  gender?: any;
  apointmentfee?: any;
}) => {
  const userpage = page || 1;
  const userlimit = limit || 10;
  const prisma = new PrismaClient();
  const skip = (userpage - 1) * userlimit;

  const andconditions: Prisma.DoctorWhereInput[] = []

    if (searchterm) {
    andconditions.push({
      OR: [
        { name: { contains: searchterm, mode: "insensitive" } },
        { email: { contains: searchterm, mode: "insensitive" } },
        { contectnumber: { contains: searchterm, mode: "insensitive" } },
      ],
    });
  }

  // 📧 Email
  if (email) {
    andconditions.push({
      email: {
        contains: email,
        mode: "insensitive",
      },
    });
  }

  // 📱 Contact Number
  if (contectnumber) {
    andconditions.push({
      contectnumber: {
        contains: contectnumber,
        mode: "insensitive",
      },
    });
  }

  // 🚻 Gender filter
  if (gender) {
    andconditions.push({
      gender: gender.toUpperCase(),
    });
  }

  // 💰 Appointment fee filter (<= fee)
  if (apointmentfee) {
    andconditions.push({
      apointmentfee: {
        lte: apointmentfee,
      },
    });
  }

  // 🔎 Final where condition
  const whereConditions: Prisma.DoctorWhereInput =
    andconditions.length > 0 ? { AND: andconditions } : {};

  // ↕ Sorting  
  const sortCondition =
    sortby && sortorder
      ? { [sortby]: sortorder }
      : { createdat: "desc" };

  // 🗄 Fetch doctors
  const result = await prisma.doctor.findMany({
    skip,
    take: userlimit,
    where: whereConditions,
    orderBy: sortCondition,
  });

  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  console.log(result)

  await prisma.$disconnect();

  return {
    // page: userPage,
    // limit: userLimit,
    // total,
    data: result,
  };

};


const updatedoctor = async(id: string, payload: Partial<Doctor>) => {
    const prisma = new PrismaClient()

     const docinfo = await prisma.doctor.findUniqueOrThrow({
      where: {
        id
      }
     })

     const doctordata = await prisma.doctor.update({
        where: {
          id: docinfo.id
        },
        data: payload
     })
     
     return doctordata
}

export const doctorservice = {
  getdoctor,
  updatedoctor
};
