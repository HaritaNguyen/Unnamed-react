import { prisma } from "@/lib/prisma"

export const get2FCByUserID = async (userID : string)  => {
    try {
        const tFConfirmation = await prisma.twoFactorAuthentiationConfirmation.findUnique({
            where : { userID }
        })

        return tFConfirmation
    } catch {
        return null
    }
}