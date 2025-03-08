import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export function SignOutBtn() {
    return (
        <form action={async () => {
            "use server"

            await signOut()
        }}>
            <Button
                type="submit"
            >
                Sign out
            </Button>
        </form>
    )
}