"use client"

import { UserProvider } from "@/contexts/userContext";
import { ReactNode } from "react";


export const Providers = ({children}: {children: ReactNode}) => {
    return (
        <>
        <UserProvider>
            {children}
        </UserProvider>
        </>
     )
}