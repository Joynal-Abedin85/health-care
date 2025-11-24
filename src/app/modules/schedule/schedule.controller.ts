import { Request, Response } from "express";
import catchasync from "../../shared/catchasync";
import { scheduleservice } from "./schedule.service";
import sendResponse from "../../shared/sendresponse";

const createschedule = catchasync(async(req: Request, res: Response) => {
    const result = await scheduleservice.createschedule(req.body)
     
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "schedule create success",
        data: result
    })
})

export const schedulecontroller ={
    createschedule
}



