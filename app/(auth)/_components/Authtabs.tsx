import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, } from "next/navigation";
import Typography from '@/components/ui/typography';
	

export default function Authtabs() {
    const pathname = usePathname();

	const activeTab = pathname.includes("sign-up") ? "signup" : "signin";
    return (
        <Tabs value={activeTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-200">
                <TabsTrigger value="signin" aria-controls="signin-content" asChild>
                    <Link id="sign-in-link" href="/sign-in" >
                        <Typography variant="small" className="text-center w-full">Sign In</Typography>
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="signup" aria-controls="signup-content" asChild>
                    <Link id="sign-up-link" href="/sign-up">
                        <Typography variant="small" className="text-center w-full">Sign Up</Typography>
                    </Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
