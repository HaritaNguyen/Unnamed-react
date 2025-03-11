"use server"

import { prisma } from "@/lib/prisma"
import { getUserByEmail } from "@/data/user"
import { getVerificationByToken } from "@/data/vertfication-token"

export async function newVerification( token : string ) {
    const existingToken = await getVerificationByToken(token)

    if (!existingToken) return { error : "Token verification it doesn't existing!" }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) return { error : "Token verification has expired!" }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) return { error : "User doesnt't exist!" }

    await prisma.user.update({
        where : { id : existingUser.id },
        data : {
            emailVerified: new Date(),
            email : existingToken.email
        }
    })

    await prisma.verificationToken.delete({
        where : { id : existingToken.id }
    })

    return { success : "Your email is now verified!" }
}