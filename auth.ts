import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import { UserRole } from '@prisma/client';

import authConfig from "@/auth.config"

import { getUserById } from "@/data/user"
import { get2FCByUserID } from "@/data/2f-confirmation";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async signIn({ user, /*account*/ }) {
            /*
            ? OAuth:
            * if (account?.provider !== "credentials") return true
            */ 

            if (!user.id) return false;
            const existingUser = await getUserById(user.id);
            
            if (!existingUser?.emailVerified) return false

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await get2FCByUserID(existingUser.id)

                if (!twoFactorConfirmation) return false

                await prisma.twoFactorAuthentiationConfirmation.delete({
                    where : { id : twoFactorConfirmation.id }
                })
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }

            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            return token;
        },
    },
    adapter : PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig
})