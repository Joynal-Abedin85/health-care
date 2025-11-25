import express, { NextFunction, Request, Response } from 'express'
import { schedulecontroller } from "./schedule.controller";
import auth from '../auth/auth';
import { userrole } from '@prisma/client';

const router = express.Router()

router.post("/", schedulecontroller.createschedule )
router.get("/get",auth(userrole.DOCTOR),  schedulecontroller.getschedule)
router.delete("/:id", schedulecontroller.deleteschedule)


export const schedulerouter = router