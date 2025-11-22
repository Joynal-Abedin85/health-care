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

const getallfromdb = catchasync(async(req: Request, res: Response)=> {
    const {page, limit, searchterm, sortby, sortorder} =req.query
    const result = await userservice.getallfromdb({page: Number(page), limit: Number(limit) ,searchterm, sortby, sortorder })
    // console.log(req)
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "paitent create success",
        data: result,
    })
})

export const usercontroler = {
    createpataient,
    getallfromdb

}