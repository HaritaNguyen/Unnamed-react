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
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function LoginForm() {
    const [show2FT, setShow2FT] = useState(false)

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
                    if (data?.error) {
                        form.reset();
                        setError(data.error)
                    }
                    if (data?.success) {
                        form.reset();
                        setError(data.success)
                    }
                    if (data?.twoFactor) {
                        setShow2FT(true)
                    }
                })
                .catch(() => setError("Something unexpected from confirmation"))
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
                        {show2FT && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        {!error && (<div className="bg-yellow-200/30 p-3 rounded-lg flex flex-col items-center gap-x-2 text-[12px] text-yellow-500">
                                            <p>DISCLAIMER: Do not share your 2FA code to other. It will lose your 2FA code and the account is getting trouble!</p>
                                        </div>)}
                                        <FormLabel className="mx-auto">Two Factor Code</FormLabel>
                                        <FormControl>
                                            <div className="mx-auto my-3">
                                                <InputOTP
                                                    {...field}
                                                    disabled={isPending}
                                                    maxLength={8}
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                        <InputOTPSlot index={6} />
                                                        <InputOTPSlot index={7} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!show2FT && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
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
                                                    disabled={isPending}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <Button
                                                variant={"link"}
                                                className="px-0 justify-start"
                                            >
                                                <Link href="/reset">
                                                    Forgot password?
                                                </Link>
                                            </Button>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
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