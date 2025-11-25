import { PrismaClient } from "@prisma/client";

const getdoctor = async ({
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
}


export const doctorservice = {
    getdoctor
}