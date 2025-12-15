"use client";

import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { createClient } from "@/lib/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setErrorMsg(`Error signing out: ${error.message}`);
        toast.error(error.message || "Error signing out");
        return;
      }
      toast.success("Signed out successfully!");
      router.refresh(); // ✅ ensures form state is reset
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error occurred";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [supabase, router]);

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
      </AnimatePresence>

      <div className="flex flex-col gap-3 min-h-screen items-center justify-center font-sans">
        <h1 className="text-xl">You are Signed In</h1>
        <Button variant="destructive" size="lg" onClick={signOut}>
          Logout
        </Button>
      </div>

      {/* Overlay when loading */}
      <LoadingOverlay
        show={loading}
        label="Logging out..."
        className="border-red-600"
        textColor="text-red-600"
      />
    </>
  );
}
