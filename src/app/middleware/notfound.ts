import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


const notfound = (req: Request, res: Response, next: NextFunction) =>{
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "somthing somossah",
        error: {
            path : req.originalUrl,
            message: "your path not"
        }
    })
}

export default notfound