import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllDoctor = catchAsync(async(req: Request, res: Response) => {
    const result = await DoctorService.getAllDoctor();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctors fatched successfully",
        data: result,
    })
});

const getDoctorById = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.getDoctorById(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Fetch doctor by id",
        data: result,
    })
});

const updateDoctor = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await DoctorService.updateDoctor(id as string, payload);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor updated successfully.",
        data: result
    })
});

const deleteDoctor = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.deleteDoctor(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor deleted successfully.",
        data: result
    })
})
export const DoctorController = {
    getAllDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}