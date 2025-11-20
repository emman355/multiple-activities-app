import { ReactNode } from "react";
import { Navbar02 } from "./_components/navigation-menu";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar02 />
            {children}
        </div>
    )
}
