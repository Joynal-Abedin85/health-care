import { Prisma, PrismaClient, userstatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (payload: { email: string; password: string }) => {
  const prisma = new PrismaClient();

  // common user find
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user || user.status !== "ACTIVE") {
    throw new Error("User not found or inactive");
  }

  // password check
  const correct = await bcrypt.compare(payload.password, user.password);
  if (!correct) {
    throw new Error("Wrong password");
  }

  // JWT payload
  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user.id,
  };

  // Tokens
  const accesstoken = jwt.sign(jwtPayload, "abcd", {
    expiresIn: "1d",
  });

  const refreshtoken = jwt.sign(jwtPayload, "abcde", {
    expiresIn: "7d",
  });

  return {
    accesstoken,
    refreshtoken,
    role: user.role,
    needpasschange: user.needpasswordchng,
  };
};


export const authservice = {
  login,
};
