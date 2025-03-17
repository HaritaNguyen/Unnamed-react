"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string
    header: string
}

export function UserInfo({ user, label, header }: UserInfoProps) {
    return (
        <main className="space-y-3">
            <h1 className="font-bold text-2xl">{header}</h1>
            <Card className="w-[650px] mx-auto lg:w-full">
                <CardHeader>
                    <h1 className="font-semibold text-lg">{label}</h1>
                </CardHeader>
                <hr/>
                <CardContent className="space-y-4">
                    <div className="flex flex-row items-center justify-between">
                        <p className="font-medium">ID User: </p>
                        <p className="truncate text-lg bg-gray-200 font-mono p-1 rounded-2xl">{user?.id}</p>
                    </div>
                    <hr/>
                    <div className="flex flex-row items-center justify-between">
                        <p className="font-medium">Username: </p>
                        <p className="truncate text-lg">{user?.name}</p>
                    </div>
                    <hr/>
                    <div className="flex flex-row items-center justify-between">
                        <p className="font-medium">Email: </p>
                        <p className="truncate text-lg">{user?.email}</p>
                    </div>
                    <hr/>
                    <div className="flex flex-row items-center justify-between">
                        <p className="font-medium">Role: </p>
                        <p className="truncate text-lg">{user?.role}</p>
                    </div>
                    <hr/>
                    <div className="flex flex-row items-center justify-between">
                        <p className="font-medium">2FA Status: </p>
                        <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>{user?.isTwoFactorEnabled ? "ON" : "OFF"}</Badge>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}