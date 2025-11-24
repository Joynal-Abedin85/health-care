import { Request, Response } from "express";
import catchasync from "../../shared/catchasync";
import { userservice } from "./user.service";
import sendResponse from "../../shared/sendresponse";


const createpataient = catchasync(async(req: Request, res: Response)=> {

    const result = await userservice.paitentcreate(req)
    // console.log(req)
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "paitent create success",
        data: result,
    })
})

const admincreate = catchasync(async(req: Request, res: Response) => {
    const result = await userservice.admincreate(req)

       sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "admin create success",
        data: result,
    })

})

const getallfromdb = catchasync(async(req: Request, res: Response)=> {
    const {page, limit, searchterm, sortby, sortorder} =req.query
    const result = await userservice.getallfromdb({page: Number(page), limit: Number(limit) ,searchterm, sortby, sortorder })
    // console.log(req)
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "all get create success",
        data: result,
    })
})


const createdoctor = catchasync(async(req: Request, res: Response) => {
    const result = await userservice.createdoctor(req)

        sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "doctor create success",
        data: result,
    })
})

export const usercontroler = {
    createpataient,
    getallfromdb,
    admincreate,
    createdoctor

}