import express, { NextFunction, Request, Response } from 'express'
import { usercontroler } from './user.controller'
import upload from '../../helper/fileuploader'
import { uservalidation } from './user.validation'
import auth from '../auth/auth'
import { userrole } from '@prisma/client'

const router = express.Router()


router.get("/",auth(userrole.ADMIN), usercontroler.getallfromdb)


router.post("/admin" , upload.single('file'),  (req: Request, res: Response, next: NextFunction) => {
        req.body = uservalidation.adminvalidation.parse(JSON.parse(req.body.data))
        return usercontroler.admincreate(req , res,next)
})

router.post("/doctor" , upload.single('file'),  (req: Request, res: Response, next: NextFunction) => {
        req.body = uservalidation.doctorvalidation.parse(JSON.parse(req.body.data))
        return usercontroler.createdoctor(req , res,next)
})

router.post("/createp" ,upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
        req.body = uservalidation.createpatientvalidation.parse(JSON.parse(req.body.data))
        return usercontroler.createpataient(req , res,next)
} )

export const userroutes = router