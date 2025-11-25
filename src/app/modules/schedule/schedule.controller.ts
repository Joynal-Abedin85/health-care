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


const getschedule = catchasync(async(req: Request& {user?: any}, res: Response) => {
        const {page, limit, searchterm, sortby, sortorder,startdate,enddate} =req.query

        const user = req.user
        console.log(user,"get")
        const result = await scheduleservice.getschedule({page: Number(page), limit: Number(limit) ,searchterm, sortby, sortorder,startdate,enddate,user })
     
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "schedule get success",
        data: result
    })
})

const deleteschedule = catchasync(async(req: Request, res: Response) => {
        const result = await scheduleservice.deleteschedule(req.params.id)
     
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "schedule delete success",
        data: result
    })
})

export const schedulecontroller ={
    createschedule,
    getschedule,
    deleteschedule

}



