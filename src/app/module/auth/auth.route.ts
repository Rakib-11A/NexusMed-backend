import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/register", AuthController.registerPatient);
router.post("/login", AuthController.loginUser);
router.get('/me', checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), AuthController.getMe);
router.post('/refresh-token', AuthController.getNewToken);

export const AuthRoutes = router;