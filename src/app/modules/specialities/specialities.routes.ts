import express, { NextFunction, Request, Response } from 'express';
import { SpecialtiesController } from './specialities.controller';
import { SpecialtiesValidtaion } from './specialities.validation';
import { userrole } from '@prisma/client';
import auth from '../auth/auth';
import upload from '../../helper/fileuploader';


const router = express.Router();


router.get(
    '/',
    SpecialtiesController.getAllFromDB
);

router.post(
    '/',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data))
        return SpecialtiesController.inserIntoDB(req, res, next)
    }
);




router.delete(
    '/:id',
    auth(userrole.ADMIN, userrole.ADMIN),
    SpecialtiesController.deleteFromDB
);

export const SpecialtiesRoutes = router;