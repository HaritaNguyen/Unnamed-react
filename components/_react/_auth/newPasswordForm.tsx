"use client"

import * as z from "zod"

import { useState, useTransition } from "react"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { CardAuth } from "./cardAuth";
import { NewPasswordSchemas } from "@/schemas";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { FormSuccess } from "@/components/_react/_auth/formSuccess";
import { FormError } from "@/components/_react/_auth/formError";

import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/newPassword";
import Link from "next/link";

export function NewPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchemas>>({
        resolver: zodResolver(NewPasswordSchemas),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchemas>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardAuth
            header="Update the password"
            label="Let's update and must remembers"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Update password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            className="max-w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!error && !success && (
                            <Button
                                disabled={isPending}
                                type="submit"
                                className='w-full bg-gradient-to-br from-emerald-600 to-purple-400 bg-blend-multiply hover:bg-gray-400 transition'
                            >
                                Update the password
                            </Button>
                        )}
                        {success && (
                            <Link href="/login">
                                <Button
                                    disabled={isPending}
                                    className={`w-full bg-gradient-to-br from-cyan-600 to-yellow-400 bg-blend-multiply hover:bg-gray-400 transition ${!success ? "invisible" : "visible"}`}
                                >
                                    Return to login
                            </Button>
                        </Link>
                        )}
                    </div>
                </form>
            </Form>
        </CardAuth>
    )
}