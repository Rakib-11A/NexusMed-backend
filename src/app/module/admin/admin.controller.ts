import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import AppError from "../../errorHelpers/AppError";

const getAllAdmins = catchAsync(async(req: Request, res: Response) => {
    const result = await AdminService.getAllAdmins();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Fetch all admins",
        data: result
    })
})

const getAdminById = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.getAdminById(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Fetch admin my Id",
        data: result
    })
})

const updateAdmin = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await AdminService.updateAdmin(id as string, payload);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Updated the admin successfully.",
        data: result
    })
})

const deleteAdmin = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if(!user){
        throw new AppError(status.UNAUTHORIZED, "You are not authorized, please log in to perform this action.")
    }

    const result = await AdminService.deleteAdmin(id as string, user);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin deleted successfully.",
        data: result
    })
})
export const AdminController = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}