"use client"

import * as z from "zod"

import { useState, useTransition } from "react"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { CardAuth } from "./cardAuth";
import { ResetSchemas } from "@/schemas";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { FormSuccess } from "@/components/_react/_auth/formSuccess";
import { FormError } from "@/components/_react/_auth/formError";

import { reset } from "@/actions/reset";

export function ResetForm() {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchemas>>({
        resolver: zodResolver(ResetSchemas),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchemas>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardAuth
            header="Reset"
            label="You forgot password?"
            href="/login"
            backButton="Remember password?"
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
                        />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-gradient-to-br from-rose-600 to-fuchsia-400 bg-blend-multiply hover:bg-gray-400 transition"
                        >Send request</Button>
                    </div>
                </form>
            </Form>
        </CardAuth>
    )
}