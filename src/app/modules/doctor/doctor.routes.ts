import express, { NextFunction, Request, Response } from 'express'
import auth from '../auth/auth';
import { userrole } from '@prisma/client';
import { doctorcontroller } from './doctor.controller';

const router = express.Router()

router.get("/",  doctorcontroller.getdoctor)


export const doctorrouter = router