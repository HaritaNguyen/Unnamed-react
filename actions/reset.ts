"use server"

import * as z from "zod"

import { ResetSchemas } from "@/schemas"
import { getUserByEmail } from "@/data/user"

import { sendResetPasswordEmail } from "@/lib/mail";
import { generationPRT } from "@/lib/token";

export const reset = async (values : z.infer<typeof ResetSchemas>) => {
    const validatedFields = ResetSchemas.safeParse(values);

    if (!validatedFields.success) {
        return { error : "Invaild email!" }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error : "Email doesn't exist!" }
    }

    const passwordResetToken = await generationPRT(email)
    await sendResetPasswordEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success : "Your email is vaild to reset the password! Please check the email to verify!" }

}
