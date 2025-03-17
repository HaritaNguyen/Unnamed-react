import React from "react";
import { MainNavBar } from "../_components/navbar";
import { MenuSetting } from "../_components/menuSettings";

export default function SettingsLayout({ children } : { children : React.ReactNode}) {
    return (
        <main>
            <MainNavBar />
            <div className="grid grid-cols-5 grid-rows-5 gap-4">
                <div className="col-span-5 lg:row-span-5 lg:col-span-1 lg:min-h-screen">
                    <div className="container mx-auto mt-[5rem] lg:mt-[8rem] lg:px-5">
                        <MenuSetting/>
                    </div>
                    <hr className="visible mt-2 w-[97%] mx-auto lg:invisible"/>
                </div>
                <div className="col-span-2 row-span-3 px-2 lg:px-7 lg:col-span-4 lg:row-span-5 lg:mt-[8rem]">{children}</div>
            </div>
        </main>
    )
}