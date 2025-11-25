import { Request, Response } from "express"
import catchasync from "../../shared/catchasync"
import sendResponse from "../../shared/sendresponse"
import { doctorservice } from "./doctor.service"

const getdoctor = catchasync(async(req: Request& {user?: any}, res: Response) => {
        const {page, limit, searchterm, sortby, sortorder,startdate,enddate} =req.query

        const user = req.user
        console.log(user,"get")
        const result = await doctorservice.getdoctor({page: Number(page), limit: Number(limit) ,searchterm, sortby, sortorder,startdate,enddate,user })
     
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "schedule get success",
        data: result
    })
})


export const doctorcontroller = {
    getdoctor
}