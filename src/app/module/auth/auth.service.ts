import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
// import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
 name: string;
 email: string;
 password: string;   
}
const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })

    if (!data.user) {
        throw new Error("Failed to register patient");
    }


    // TODO : Create Patient Profile In Transaction After Sign Up of Patient In User Modl
    const patient = await prisma.$transaction(async (tx) => {
        const patientTx = await tx.patient.create({
            data: {
                userId: data.user.id,
                name: data.user.name,
                email: data.user.email
            }
        })
        
        return patientTx;
    })
    return {
        ...data,
        patient
    }
}

interface ILoginUserPayload {
    email: string;
    password: string;
}
const loginUser = async(payload: ILoginUserPayload) => {

    const { email, password } = payload;
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked.")
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted.")
    }

    return data.user; // extra kore password bad dawa lagbe na better-auth eta internally kore dai.
}

export const AuthService = {
    registerPatient,
    loginUser
}