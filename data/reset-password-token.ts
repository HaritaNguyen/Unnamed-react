import { prisma } from "@/lib/prisma";

// Get the Password Reset Token by Token
export const getPRTByToken = async (token : string) => {
    try {
        const passwordResetToken = await prisma.resetPasswordToken.findUnique({
            where : { token }
        })

        return passwordResetToken;
    } catch {
        return null
    }
}

// Get the Password Reset Token by Email
export const getPRTByEmail = async (email : string) => {
    try {
        const passwordResetToken = await prisma.resetPasswordToken.findFirst({
            where : { email }
        })

        return passwordResetToken;
    } catch {
        return null
    }
}