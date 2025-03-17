"use client"

import { logout } from "@/actions/logout";

interface LogoutBtnProps {
    children : React.ReactNode;
}

export function LogoutBtn({ children } : LogoutBtnProps) {
    const onClick = () => logout();

    return (
        <span onClick={onClick} className="cursor-pointer">{children}</span>
    )
}