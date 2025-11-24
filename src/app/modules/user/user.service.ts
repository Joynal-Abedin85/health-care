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
  page?: Number;
  limit?: Number;
  searchterm?: any;
  sortby?: any;
  sortorder?: any;
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
  const payload = req.body;
  if (req.file) {
    const upload = await uploadtocloudinary(req.file);
    req.body.profilephoto = upload?.secure_url;
    console.log({ upload });
  }

 const hashpass = await bcrypt.hash(req.body.password, 10);

const prisma = new PrismaClient();
const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: payload.admin.email,
        password: hashpass,
        role: "ADMIN",
      },
    });

    // 2b: Create Admin profile
    const admin = await tx.admin.create({
      data: {
        name: payload.admin.name,
        email: user.email, // must match user.email for relation
        contectnumber: payload.admin.contectnumber,
        profilephoto: payload.admin.profilephoto,
      },
    });

    return admin

  });

  return result;
};

const createdoctor = async (req: Request) => {
  const payload = req.body;
  if (req.file) {
    const upload = await uploadtocloudinary(req.file);
    req.body.profilephoto = upload?.secure_url;
    console.log({ upload });
  }

   const hashpass = await bcrypt.hash(req.body.password, 10);


  const prisma = new PrismaClient();
  const result = await prisma.$transaction(async (tx) => {
        // 2a: Create User first
    const user = await tx.user.create({
      data: {
        email: payload.doctor.email,
        password: hashpass,
        role: "DOCTOR",
      },
    });

    // 2b: Create Doctor profile
    const doctor = await tx.doctor.create({
      data: {
        name: payload.doctor.name,
        email: user.email, // foreign key
        contectnumber: payload.doctor.contectnumber,
        address: payload.doctor.address,
        registrationnumber: payload.doctor.registrationnumber,
        gender: payload.doctor.gender,
        apointmentfee: Number(payload.doctor.apointmentfee),
        qulification: payload.doctor.qulification,
        qurrentworkingplace: payload.doctor.qurrentworkingplace,
        designation: payload.doctor.designation,
        profilephoto: payload.doctor.profilephoto,
      },
    });

    return doctor;
  });

  return result;
};

export const userservice = {
  paitentcreate,
  getallfromdb,
  admincreate,
  createdoctor,
};
