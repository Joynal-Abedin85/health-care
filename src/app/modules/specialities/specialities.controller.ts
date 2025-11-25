import { Request, Response } from "express";
import httpStatus from "http-status";
import catchasync from "../../shared/catchasync";
import { SpecialtiesService } from "./specialities.service";
import sendResponse from "../../shared/sendresponse";

const inserIntoDB = catchasync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.inserIntoDB(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

const getAllFromDB = catchasync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchasync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtiesService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});

export const SpecialtiesController = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
};