import { PrismaClient } from "@prisma/client";
import { createpataientinput } from "./interface";
import bcrypt from "bcryptjs";
import { Request } from "express";
import { uploadtocloudinary } from "../../helper/fileuploader";

const paitentcreate = async (req: Request) => {
  if (req.file) {
    const upload = await uploadtocloudinary(req.file);
    req.body.pataint.profilephoto = upload?.secure_url;
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
  sortorder,
}: {
  page: Number;
  limit: Number;
  searchterm: any;
  sortby: any;
  sortorder: any;
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
        mode: "insensitive",
      },
    },
    orderBy:
      sortby && sortorder
        ? {
            [sortby]: sortorder,
          }
        : {
            createdat: "desc",
          },
  });
  return user;
};

const admincreate = async (req: Request) => {

    const payload = req.body
    console.log(payload)
  if (req.file) {
    const upload = await uploadtocloudinary(req.file);
    req.body.profilephoto = upload?.secure_url;
    console.log({ upload });
  }

  const prisma = new PrismaClient();
  const result = await prisma.$transaction(async (tx) => {
    const isUserExist = await tx.user.findUnique({
      where: { email: payload.email },
    });

    if (!isUserExist) {
      throw new Error("User does not exist for this email");
    }

    const admin = await tx.admin.create({
      data: {
        name: payload.name,
        email: payload.email,
        contectnumber: payload.contectnumber,
        profilephoto: payload.profilephoto,
      },
    });

    return admin;
  });

  return result;
};

export const userservice = {
  paitentcreate,
  getallfromdb,
  admincreate,
};
