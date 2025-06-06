"use client"

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrenctUser";

export default function HomePage() {
    const user = useCurrentUser();
    
    const onClick = () => {
        logout()
    }
    return (
        <div>
            <p>
                {JSON.stringify(user)}
            </p>
            <button onClick={onClick}>
                Sign out
            </button>
        </div>
    );
}