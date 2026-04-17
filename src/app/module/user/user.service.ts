import status from "http-status";
import { Speciality, UserRole } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { ICreateAdmin, ICreateDoctorPayload } from "./user.interface";
import { auth } from "../../lib/auth";
import AppError from "../../errorHelpers/AppError";

const createDoctor = async (payload: ICreateDoctorPayload) => {
    const specialities: Speciality[] = [];

    for (const specialityId of payload.specialities) {
        const speciality = await prisma.speciality.findUnique({
            where: {
                id: specialityId
            }
        })

        if(!speciality) {
            throw new AppError(status.NOT_FOUND, `Speciality with id ${specialityId} not found`);
        }

        specialities.push(speciality);
    }

    const userExists = await prisma.user.findUnique({
        where: {
            id: payload.doctor.email
        }
    });

    if(userExists) {
        throw new AppError(status.CONFLICT, "User with this email already exists.");
    }

    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.doctor.email,
            password: payload.password,
            role: UserRole.DOCTOR,
            name: payload.doctor.name,
            needPasswordChange: true,
        }
    });

    try {
        const result = await prisma.$transaction(async(tx) => {

            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor
                }
            })

            const doctorSpecialityData = specialities.map((speciality) => {
                return {
                    doctorId: doctorData.id,
                    specialityId: speciality.id
                }
            })

            await tx.doctorspeciality.createMany({
                data: doctorSpecialityData,
            })

            /**
  
             */
            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,       
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    isDeleted: true,
                    deletedAt: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    averageRating: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            emailVerified: true,
                            image: true,
                            role: true,
                            status: true,
                            needPasswordChange: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    specialities: {
                        select: {
                            speciality: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            });
            return doctor;
        })
        return result;

    } catch(error) {
        console.log("Transaction error : ", error);

        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        });
        throw error;
    }

}

const createAdmin = async (payload: ICreateAdmin) => {

    // Step 1: Check if user already exists or not
    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.admin.email
        }
    });

    if(userExists) {
        throw new AppError(status.CONFLICT, "User already exists.");
    }

    // Step 2: Create user account with Better-Auth

    const { admin, role, password } = payload;
    const userData = await auth.api.signUpEmail({
        body: {
            ...admin,
            password,
            role,
            needPasswordChange: true,
            rememberMe: false
        }
    })

    // Step 3: Create admin profile in transaction
    try {
        const result = await prisma.$transaction(async (tx) => {
            // Create Admin Record
            const adminData = await tx.admin.create({
                data: {
                    userId: userData.user.id,
                    ...admin
                }
            });

            const createdAdmin = await tx.admin.findUnique({
                where: { id: adminData.id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    isDeleted: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            status: true
                        }
                    }
                }
            })
            return createdAdmin;
        })

        return result;

    }catch(error) {
        // Cleanup: Delete user if admin creation fails
        await prisma.user.delete({
            where: {
                id: userData.user.id,
            }
        });
        throw error;
    }
}
export const UserService = {
    createDoctor,
    createAdmin
}