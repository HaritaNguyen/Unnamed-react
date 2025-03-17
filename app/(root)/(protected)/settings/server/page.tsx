"use client"

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrenctUser";
import { UserInfo } from "@/app/(root)/(protected)/_components/user-info";

export default function SettingsPage() {
    const user = useCurrentUser();
    
    const onClick = () => {
        logout()
    }
    return (
        <UserInfo header="Server Setting" label="Server Configuration" user={user}/>
    );
}