import { prisma } from "../../lib/prisma"
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctor = async() => {
    const doctors = await prisma.doctor.findMany({
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true
                }
            }
        }
    });

    return doctors
}

const getDoctorById = async(id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {id}
    });

    return doctor;
}

const updateDoctor = async(id: string, payload: IUpdateDoctorPayload) => {
    const doctor = await prisma.doctor.update({
        where: {
            id
        },
        data: payload
    });

    return doctor;
}

const deleteDoctor = async(id: string) => {
    const doctor = await prisma.doctor.delete({
        where: { id }
    });

    return doctor;
}

export const DoctorService = {
    getAllDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}