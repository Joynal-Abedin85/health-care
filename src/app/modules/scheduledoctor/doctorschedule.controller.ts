import { Request, Response } from "express";
import catchasync from "../../shared/catchasync";
import sendResponse from "../../shared/sendresponse";
import { doctorscheduleservice } from "./doctorschedule.service";

const createdoctorschedule = catchasync(async(req: Request & {user?: any}, res: Response) => {
    console.log('USERC' ,req.user)
    const user = req.user
    const result = await doctorscheduleservice.createdoctorschedule(user, req.body)

    

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "create schedule success",
        data: result
    })
})

export const doctorschedulecontroller = {
    createdoctorschedule
}