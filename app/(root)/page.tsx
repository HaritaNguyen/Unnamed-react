import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainPage() {
    return (
        <main className="mt-[8rem]">
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center space-y-5 border border-indigo-800/30 p-[5rem] rounded-lg shadow-xl shadow-muted-foreground/35">
                    <h1>Welcome to <strong className="text-lg">The Thing ???</strong></h1>
                    <div className="flex flex-row space-x-2">
                        <Link href="/login">
                            <Button className="cursor-pointer">Sign in</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant={"outline"} className="cursor-pointer">Sign up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}