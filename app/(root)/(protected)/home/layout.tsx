import { MainNavBar } from "../_components/navbar"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <MainNavBar />
            <div className="mt-[8rem]">
                {children}
            </div>
        </main>
    )
}