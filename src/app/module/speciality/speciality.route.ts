import { Router } from "express";
import { SpecialityController } from "./speciality.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post('/',checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), SpecialityController.createSpeciality);
router.get('/', SpecialityController.getAllSpeciality);
router.delete('/:id',checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), SpecialityController.deleteSpeciality);

export const SpecialityRoutes = router;