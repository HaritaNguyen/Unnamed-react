"use server"

import * as z from "zod"

import bcrypt from "bcrypt"

import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { prisma } from "@/lib/prisma"
import { generationVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields =  RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invaild fields!" };
    };

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error : "Email is already in use"}

    await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword,
        }
    })

    const verificationToken = await generationVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email, verificationToken.token
    )

    return { success : "Complete create an account! Please check the email to verify"}
}