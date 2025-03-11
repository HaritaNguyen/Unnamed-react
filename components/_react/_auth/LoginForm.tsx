"use client"

import * as z from "zod"

import { useState, useTransition } from "react"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { CardAuth } from "./cardAuth";
import { LoginSchema } from "@/schemas";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { FormSuccess } from "@/components/_react/_auth/formSuccess";
import { FormError } from "@/components/_react/_auth/formError"

import { login } from "@/actions/login"

export function LoginForm() {    
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardAuth
            header="Sign in"
            label="Welcome back"
            href="/register"
            backButton="Didn't have an accounts?"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <div className="space-y-4">
                        <FormError
                            message={error}
                        />
                        <FormSuccess
                            message={success}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="name@example.com"
                                            type="email"
                                            className="max-w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /><FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-gradient-to-br from-blue-600 to-fuchsia-400 bg-blend-multiply hover:bg-gray-400 transition"
                        >Login</Button>
                    </div>
                </form>
            </Form>
        </CardAuth>
    )
}