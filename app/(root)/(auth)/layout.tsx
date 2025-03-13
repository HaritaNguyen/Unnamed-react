export default function AuthLayout ({ children } : { children : React.ReactNode}) {
    return (
        <main className="mt-[4.5rem]">
            <div className="flex justify-center items-center">
                {children}
            </div>
        </main>
    )
}