"use client";

import { useCallback, useState } from "react";
import { AuthForm } from "../_components/AuthForm";
import { loginSchema, LoginSchema } from "@/lib/schema/login";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = useCallback(
    async ({ email, password }: LoginSchema) => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
          setErrorMsg(error.message);
          toast.error(error.message || "Sign-up failed");
          return;
        }

        if (data.session) {
          toast.success("Sign-up successful!");
          router.push("/");
        } else {
          // Supabase may require email confirmation
          toast.success("Check your email to confirm your account!");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unexpected error occurred";
        setErrorMsg(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [supabase, router]
  );

  return (
    <>
      {/* Animated feedback (optional, can remove if using only toast) */}
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
      </AnimatePresence>

      <AuthForm<LoginSchema>
        schema={loginSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Please enter your password",
          },
        ]}
      />

      <LoadingOverlay
        show={loading}
        label="Signing Up..."
        className="border-blue-600"
        textColor="text-blue-600"
      />
    </>
  );
}
