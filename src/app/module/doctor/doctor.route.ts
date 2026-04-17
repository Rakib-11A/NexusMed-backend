import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
    '/',
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    DoctorController.getAllDoctor
);
router.get(
    '/:id',
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    DoctorController.getDoctorById
);
router.patch(
    '/:id',
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    DoctorController.updateDoctor
);
router.delete(
    '/:id',
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    DoctorController.deleteDoctor
);

export const DoctorRoutes = router;