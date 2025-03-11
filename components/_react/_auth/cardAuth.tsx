import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";

interface CardAuthProp {
    children: React.ReactNode;
    header: string;
    label?: string;
    href: string;
    backButton: string;
}

export function CardAuth({ children, header, label, href, backButton }: CardAuthProp) {
    return (
        <Card className="w-[400px] absolute top-1/2 left-1/2 -translate-1/2 shadow-xl">
            <CardHeader>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold text-2xl">
                        {header}
                    </h1>
                </div>
            </CardHeader>
            <CardDescription>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-muted-foreground">
                    {label}
                    </p>
                </div>
            </CardDescription>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <a href={href} className="mx-auto">
                    <Button variant="link" className="font-bold">
                        {backButton}
                    </Button>
                </a>
            </CardFooter>
        </Card>
    )
}