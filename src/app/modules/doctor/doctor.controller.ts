import { Request, Response } from "express"
import catchasync from "../../shared/catchasync"
import sendResponse from "../../shared/sendresponse"
import { doctorservice } from "./doctor.service"

const getdoctor = catchasync(async(req: Request& {user?: any}, res: Response) => {
        const {page, limit, searchterm, sortby, sortorder, email, contectnumber, gender, apointmentfee,specialities} =req.query

        const result = await doctorservice.getdoctor({page: Number(page), limit: Number(limit) ,searchterm, sortby, sortorder, email, contectnumber, gender, apointmentfee })
     console.log({result})
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "schedule get success",
        data: result
    })
})


const updatedoctor = catchasync(async(req: Request, res: Response) => {
    const {id} = req.params

    const result = await doctorservice.updatedoctor(id, req.body)


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: " update is success",
        data: result
    })
})


export const doctorcontroller = {
    getdoctor,
    updatedoctor
}