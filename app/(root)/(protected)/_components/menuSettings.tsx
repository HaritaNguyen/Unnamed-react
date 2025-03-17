import Link from "next/link";

export function MenuSetting() {
    const SettingsList : { id: number, name: string; href: string }[] = [
        {
            id: 1,
            name : "General",
            href : "/settings/general"
        },
        {
            id: 2,
            name : "Account",
            href : "/settings/account"
        },
        {
            id: 3,
            name : "Appearance",
            href : "/settings/appearance"
        },
        {
            id: 4,
            name : "Server",
            href : "/settings/server"
        }
    ];

    const listItems = SettingsList.map(settings =>
            <li key={settings.id} className="flex flex-col py-2 px-3 rounded-md hover:bg-muted-foreground/20">
                <Link href={settings.href}>
                    <span className="text-left">{settings.name}</span>
                </Link>
            </li>
    )

    return (
        <ul>{listItems}</ul>
    )
}