import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
    "/create-doctor",
    validateRequest(UserValidation.createDoctorZodSchema),
    UserController.createDoctor
);

router.post(
    "/create-admin",
    checkAuth(UserRole.SUPER_ADMIN),
    validateRequest(UserValidation.createAdminValidationSchema),
    UserController.createAdmin
)

export const UserRoutes = router;