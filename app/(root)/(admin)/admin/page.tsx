import sessionRole from "@/lib/sessionRole";

import { redirect } from "next/navigation";

export default async function AdminPage() {

    const session = await sessionRole();
    const user = session?.user;

    if (!user) {
        redirect("/api/auth/signin?callbackUrl=/admin");
    }

    if (user.role !== "ADMIN") {
        return (
            <main className="absolute top-1/2 left-1/2 -translate-1/2">
                <div className="flex flex-col justify-center items-center space-y-4 border border-indigo-800/30 p-[2rem] rounded-lg shadow-xl shadow-muted-foreground/35">
                    <div className="flex flex-row justify-center items-center space-x-5">
                        <h1 className="font-bold text-4xl">406</h1>
                        <p className="text-muted-foreground">(Not acceptable)</p>
                    </div>
                    <p className="text-center">Sorry but you don't have permission to go this page</p>
                </div>
            </main>
        );
    }

    return (
        <div>
            <h1>Admin page</h1>
        </div>
    )
}