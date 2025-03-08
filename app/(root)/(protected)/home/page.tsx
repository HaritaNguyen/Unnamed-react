import { auth } from "@/auth";
import { SignOutBtn } from "@/components/_react/_auth/signOutBtn";

export default async function HomePage() {
    const session = await auth();
    
    return (
        <div>
            <p>
                {JSON.stringify(session)}
            </p>
            <SignOutBtn />
        </div>
    );
}