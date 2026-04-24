import { Router } from "express";
import { SpecialityRoutes } from "../module/speciality/speciality.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";
<<<<<<< HEAD
=======
import { AdminRoutes } from "../module/admin/admin.route";
>>>>>>> 67e08d22f28a750296c6e3bc6c9471b87992dce2

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/specialities', SpecialityRoutes);
router.use('/users', UserRoutes);
router.use('/doctors', DoctorRoutes);
<<<<<<< HEAD
=======
router.use('/admins', AdminRoutes);
>>>>>>> 67e08d22f28a750296c6e3bc6c9471b87992dce2

export const IndexRouter = router;