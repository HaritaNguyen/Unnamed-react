import { prisma } from "@/lib/prisma"

export const get2FTByToken = async (token : string) =>{
    try {
        const tFToken = await prisma.twoFactorToken.findUnique({
            where: { token }
        })

        return tFToken
    } catch {
        return null
    }
}

export const get2FTByEmail = async (email : string) =>{
    try {
        const tFToken = await prisma.twoFactorToken.findFirst({
            where: { email }
        })

        return tFToken
    } catch {
        return null
    }
}