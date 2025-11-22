import { Prisma, PrismaClient, userstatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (payload: { email: string; password: string }) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: userstatus.ACTIVE,
    },
  });

  const correctpass = await bcrypt.compare(payload.password, user.password);

  if (!correctpass) {
    throw new Error("somethin pass wrong");
  }

  const accesstoken = jwt.sign({ email: user.email, role: user.role }, "abcd", {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  const refreshtoken = jwt.sign(
    { email: user.email, role: user.role },
    "abcde",
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );

  return {
    accesstoken,
    refreshtoken,
    needpasschange: user.needpasswordchng
  };
};

export const authservice = {
  login,
};
