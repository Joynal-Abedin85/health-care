import  express  from "express"
import { userrole } from "@prisma/client"
import auth from "../auth/auth"
import { doctorschedulecontroller } from "./doctorschedule.controller"


const router = express.Router()


router.post("/",auth(userrole.DOCTOR), doctorschedulecontroller.createdoctorschedule)


export const doctorschedulerouter = router