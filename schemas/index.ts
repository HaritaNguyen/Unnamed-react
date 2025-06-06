import * as z from "zod";

export const NewPasswordSchemas = z.object({
    password: z.string().min(7, {
        message: "The password must be above 7 characters"
    })
})

export const ResetSchemas = z.object({
    email: z.string().email({
        message: "Email is required"
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(7, {
        message: "The password must be above 7 characters"
    })
})
