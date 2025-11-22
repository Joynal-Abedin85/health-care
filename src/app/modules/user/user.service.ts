import { PrismaClient } from "@prisma/client";
import { createpataientinput } from "./interface";
import bcrypt from "bcryptjs";
import { Request } from "express";
import { uploadtocloudinary } from "../../helper/fileuploader";

const paitentcreate = async (req: Request) => {
  if (req.file) {
    const upload = await uploadtocloudinary(req.file);
    req.body.pataint.profilephoto = upload?.secure_url;
    console.log({ upload });
  }

  const hashpass = await bcrypt.hash(req.body.password, 10);
  const prisma = new PrismaClient();

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.pataint.email,
        password: hashpass,
      },
    });

    return await tnx.pataint.create({
      data: req.body.pataint,
    });
  });

  return result;
};

const getallfromdb = async ({
  page,
  limit,
  searchterm,
  sortby,
  sortorder
}: {
  page: Number;
  limit: Number;
  searchterm: any;
  sortby: any
  sortorder: any
}) => {
  // console.log(page, limit)
  const userpage = page || 1;
  const userlimit = limit || 10;
  const prisma = new PrismaClient();
  const skip = (userpage - 1) * userlimit;
  const user = await prisma.user.findMany({
    skip,
    take: userlimit,

    where: {
        email: {
            contains: searchterm,
            mode: "insensitive"
        }
    },
    orderBy: sortby &&  sortorder ? {
        [sortby] : sortorder
    } : {
        createdat: "desc"
    }

  });
  return user;
};

export const userservice = {
  paitentcreate,
  getallfromdb,
};
