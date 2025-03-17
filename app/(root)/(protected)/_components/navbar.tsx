"use client"

import { UserBtn } from "@/components/_react/_auth/userBtn"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MainNavBar() {
    const pathName = usePathname()



    return (
        <nav className="bg-white fixed flex justify-between items-center top-0 left-0 w-full border-b border-dashed rounded-b-lg p-4 transition">
            <div className="flex gap-x-3">
                <Button
                    asChild
                    variant={"secondary"}
                >
                    <Link href="/home">
                        Home
                    </Link>
                </Button>
            </div>
            <UserBtn />
        </nav>
    )
}