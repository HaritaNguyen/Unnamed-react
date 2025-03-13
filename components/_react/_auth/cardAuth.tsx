import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";

interface CardAuthProp {
    children: React.ReactNode;
    header: string;
    label?: string;
    href: string;
    backButton?: string;
}

export function CardAuth({ children, header, label, href, backButton }: CardAuthProp) {
    return (
        <Card className="w-[400px] shadow-xl">
            <CardHeader>
                    <h1 className="font-bold text-2xl text-center">
                        {header}
                    </h1>
            </CardHeader>
            <CardDescription>
                    <p className="text-muted-foreground text-center">
                    {label}
                    </p>
            </CardDescription>
            <CardContent>
                {children}
            </CardContent>
            {backButton && (<CardFooter>
                <a href={href} className="mx-auto">
                    <Button variant="link" className="font-bold">
                        {backButton}
                    </Button>
                </a>
            </CardFooter>)}
        </Card>
    )
}