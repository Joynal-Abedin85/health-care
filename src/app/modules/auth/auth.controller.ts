import { Request, Response } from "express";
import catchasync from "../../shared/catchasync";
import { authservice } from "./auth.service";
import sendResponse from "../../shared/sendresponse";

const login = catchasync(async(req: Request, res: Response) => {
    const result = await authservice.login(req.body)
    const {accesstoken, refreshtoken, needpasschange} = result

    res.cookie("accesstoken", accesstoken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60*60
    })

    res.cookie("refreshtoken", refreshtoken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60*60 *24 *7
    })

       sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "paitent create success",
        data: {
            needpasschange
        },
    })
})


export const authcontroller = {
    login
}