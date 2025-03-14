'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';

import { signIn } from '@/auth';

import { prisma } from "@/lib/prisma"

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

import { getUserByEmail } from '@/data/user';
import { get2FTByEmail } from '@/data/2f-token';
import { get2FCByUserID } from '@/data/2f-confirmation';

import { generationVerificationToken, generation2FT } from '@/lib/token';
import { sendVerificationEmail, send2FTEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invaild fields!' };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email doesn't exist!" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generationVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );
        return {
            success:
                'We sent to your email! Make sure you check the mail spam if they not there!',
        };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await get2FTByEmail(
                existingUser.email
            );

            if (!twoFactorToken) return { error : "Invalid 2FA code!" }

            if (twoFactorToken.token !== code) return { error : "Invalid 2FA code!" }

            const hasExpired = new Date(twoFactorToken.expires) < new Date()

            if (hasExpired) return { error : "The 2FA code has expired! Please try the new 2FA code" }

            await prisma.twoFactorToken.delete({
                where : { id : twoFactorToken.id }
            })

            const existingConfirmation = await get2FCByUserID(existingUser.id)

            if (existingConfirmation) {
                await prisma.twoFactorAuthentiationConfirmation.delete({
                    where : { id : existingConfirmation.id },
                })
            }

            await prisma.twoFactorAuthentiationConfirmation.create({
                data: {
                    userID : existingUser.id
                }
            })
        } else {
            const twoFactorToken = await generation2FT(existingUser.email);
            await send2FTEmail(twoFactorToken.email, twoFactorToken.token);

            return { twoFactor: true };
        }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invaild user! Please try again.' };
                default:
                    return { error: 'Something unexpected from credentials!' };
            }
        }

        throw error;
    }
};
