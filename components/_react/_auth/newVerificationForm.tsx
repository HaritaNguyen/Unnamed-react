"use client"

import { useSearchParams } from "next/navigation"
import { CardAuth } from "./cardAuth"

import { HashLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/newVerification";
import { FormSuccess } from "@/components/_react/_auth/formSuccess";
import { FormError } from "@/components/_react/_auth/formError";

export function NewVerification() {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams();

    const token = searchParams.get("token")

    const onSubmmit = useCallback(() => {
        if (success || error) return

        if (!token) return { error: "Token is missing or unexist!" }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something unexpected!")
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmmit()
    }, [onSubmmit])
    return (
        <CardAuth
            header="Verification"
            backButton="Go to login"
            href="/login"
        >
            <div className="flex items-center justify-center w-full">
                {!success && !error && (
                    <HashLoader
                        size="25"
                    />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardAuth>
    )
}