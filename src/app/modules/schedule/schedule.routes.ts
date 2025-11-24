import express, { NextFunction, Request, Response } from 'express'
import { schedulecontroller } from "./schedule.controller";

const router = express.Router()

router.post("/", schedulecontroller.createschedule )


export const schedulerouter = router