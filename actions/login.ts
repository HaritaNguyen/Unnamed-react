'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generationVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invaild fields!' };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error : "Email doesn't exist!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generationVerificationToken(
            existingUser.email
        )

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        return { success : "We sent to your email! Make sure you check the mail spam if they not there!" }
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