import { Router } from "express";
import { AdminController } from "./admin.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
    '/',
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    AdminController.getAllAdmins
);

router.get(
    '/:id',
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    AdminController.getAdminById
)

router.patch(
    '/:id',
    checkAuth(UserRole.SUPER_ADMIN),
    AdminController.updateAdmin
)

router.delete(
    '/:id',
    checkAuth(UserRole.SUPER_ADMIN),
    AdminController.deleteAdmin
)

export const AdminRoutes = router;