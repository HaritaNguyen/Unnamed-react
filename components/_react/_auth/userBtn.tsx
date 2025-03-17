"use client"

import { FaUser } from "react-icons/fa"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/useCurrenctUser"
import { LogoutBtn } from "./logoutBtn"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ExitIcon, GearIcon } from "@radix-ui/react-icons"

export function UserBtn() {
    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <Link href="/settings/general">
                    <DropdownMenuItem>
                        <GearIcon/>
                        Settings
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator/>
                <LogoutBtn>
                    <DropdownMenuItem>
                        <ExitIcon/>
                        Logout
                    </DropdownMenuItem>
                </LogoutBtn>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}