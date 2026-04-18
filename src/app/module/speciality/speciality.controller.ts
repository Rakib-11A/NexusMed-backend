/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SpecialityService } from "./speciality.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";


const createSpeciality = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
        
    const result = await SpecialityService.createSpeciality(payload);

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Speciality created successfully",
        data: result
    })

})

const getAllSpeciality = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialityService.getAllSpecialities();

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Fetched all specialities",
        data: result
    })
})

const deleteSpeciality = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await SpecialityService.deleteSpeciality(id as string);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Speciality deleted successfully.",
        data: result
    })
})
export const SpecialityController = {
    createSpeciality,
    getAllSpeciality,
    deleteSpeciality
}