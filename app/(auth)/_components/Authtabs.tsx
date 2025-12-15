import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, } from "next/navigation";
	

export default function Authtabs() {
    const pathname = usePathname();

	const activeTab = pathname.includes("sign-up") ? "signup" : "signin";
    return (
        <Tabs value={activeTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-300">
                <TabsTrigger value="signin" aria-controls="signin-content" asChild>
                    <Link id="sign-in-link" href="/sign-in" >
                        Sign In
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="signup" aria-controls="signup-content" asChild>
                    <Link id="sign-up-link" href="/sign-up">
                        Sign Up
                    </Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
