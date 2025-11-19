// app/login/page.tsx
"use client";

import { loginSchema, LoginSchema } from "@/lib/schema/login";
import { AuthForm } from "../_components/AuthForm";

export default function SignIn() {
    function onSubmit(values: LoginSchema) {
        console.log("Form submitted:", values);
    }

    return (
        <AuthForm<LoginSchema>
            schema={loginSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            fields={[
                { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                { name: "password", label: "Password", type: "password", placeholder: "••••••" },
            ]}
        />
    );
}
