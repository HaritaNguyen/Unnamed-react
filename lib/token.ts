import { getVerificationByEmail } from "@/data/vertfication-token";
import { getPRTByEmail } from "@/data/reset-password-token";

import { v4 as uuidv4 } from "uuid"
import { prisma } from "@/lib/prisma";

export const generationPRT = async ( email : string ) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1800 * 1000)

    const existingToken = await getPRTByEmail(email); 

    if (existingToken) {
        await prisma.resetPasswordToken.delete({
            where : {
                id : existingToken.id
            }
        })
    }

    const resetPasswordToken = await prisma.resetPasswordToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    return resetPasswordToken
}

export const generationVerificationToken = async ( email : string ) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 7200 * 1000);

    const existingToken = await getVerificationByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}