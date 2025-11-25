import { Request, Response } from "express";
import catchasync from "../../shared/catchasync";
import { authservice } from "./auth.service";
import sendResponse from "../../shared/sendresponse";

const login = catchasync(async (req: Request, res: Response) => {
  const result = await authservice.login(req.body);

  const { accesstoken, refreshtoken} = result;

  res.cookie("accesstoken", accesstoken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60,
  });

  res.cookie("refreshtoken", refreshtoken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });


  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${result.user.role} login successful`,
    data: result.user
  });
});



export const authcontroller = {
    login
}