// app/login/page.tsx
"use client";

import { loginSchema, LoginSchema } from "@/lib/schema/login";
import { AuthForm } from "../_components/AuthForm";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { AnimatePresence, motion } from "framer-motion";

export default function SignIn() {
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const onSubmit = useCallback(
        async ({ email, password }: LoginSchema) => {
            setLoading(true);
            setErrorMsg(null);
            setSuccessMsg(null);

            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                if (error) {
                    setErrorMsg(error?.message || 'Login failed. No session returned.');
                    return;
                }

                if (data.session) {
                    setSuccessMsg("Sign-up successful!");
                    router.push("/");
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : "Unexpected error occurred";
                setErrorMsg(message);
            } finally {
                setLoading(false);
            }
        },
        [supabase, router]
    );

    return (
        <>
            {/* Animated feedback */}
            <AnimatePresence>
                {errorMsg && (
                    <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-red-600 text-sm"
                    >
                        {errorMsg}
                    </motion.p>
                )}
                {successMsg && (
                    <motion.p
                        key="success"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-green-600 text-sm"
                    >
                        {successMsg}
                    </motion.p>
                )}
            </AnimatePresence>
            <AuthForm<LoginSchema>
                schema={loginSchema}
                defaultValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                fields={[
                    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                    { name: "password", label: "Password", type: "password", placeholder: "••••••" },
                ]}
            />
            {/* Overlay when loading */}
            <LoadingOverlay show={loading} label="Signing In..." className="border-green-600" textColor="text-green-600" />
        </>

    );
}
