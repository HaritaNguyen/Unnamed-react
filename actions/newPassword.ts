"use server"
import * as z from "zod"

import { getPRTByToken } from "@/data/reset-password-token"
import { getUserByEmail } from "@/data/user"
import { prisma } from "@/lib/prisma"

import { NewPasswordSchemas } from "@/schemas"

import bcrypt from "bcryptjs"

export const newPassword = async (
    values : z.infer<typeof NewPasswordSchemas>,
    token? : string | null
) => {
    if (!token) return { error : "Token reset password it missing!" }

    const validatedFields = NewPasswordSchemas.safeParse(values);

    if (!validatedFields.success) return { error : "Invaild fields!" }

    const { password } = validatedFields.data;

    const existingToken = await getPRTByToken(token)

    if (!existingToken) return { error : "Token reset password it doesn't existing!" }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { error : "Token reset password has expired!"}

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) return { error : "Email doesn't exist!" }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where : { id : existingUser.id },
        data : { password : hashedPassword }
    })

    await prisma.resetPasswordToken.delete({
        where: { id : existingToken.id }
    })

    return { success : "Your password is now update! Let's relogin now" }
}