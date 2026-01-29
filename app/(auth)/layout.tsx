'use client';

import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { ReactNode, Suspense, useCallback, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Authtabs from './_components/Authtabs';
import { createClient } from '@/lib/supabase/client';
import { LoadingOverlay } from '@/components/ui/loadingOverlay';
import { AnimatePresence, motion } from 'framer-motion';
export default function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // --- OAuth login ---
  const handleOAuthLogin = useCallback(
    async (provider: 'google') => {
      setErrorMsg(null);
      setLoading(true);
      try {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        toast.success('Signing in with google...');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unexpected error occurred';
        setErrorMsg(message);
        toast.error(message);
        setLoading(false); // only reset if there was an error
      }
    },
    [supabase]
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Card className="max-w-lg w-full p-6 shadow-md rounded-xl">
          <CardHeader>
            <Typography variant="h2" color="text-foreground" className="text-center font-bold">
              Welcome Back
            </Typography>
            <Typography variant="small" className="text-center text-muted-foreground mt-2">
              Sign in to access your activities and continue where you left off
            </Typography>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            {/* Google Sign In */}
            <Button
              type="button"
              variant="secondary"
              aria-busy={loading}
              disabled={loading}
              className="flex items-center justify-center gap-2 "
              onClick={() => handleOAuthLogin('google')}
            >
              <FcGoogle className="text-xl" />
              {loading ? 'Redirecting...' : 'Continue with Google'}
            </Button>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <Typography variant="small" className="px-2 bg-background text-muted-foreground">
                  Or sign in with email
                </Typography>
              </div>
            </div>

            <Authtabs />

            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-destructive text-sm text-center font-medium"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
            <Suspense>{children}</Suspense>
          </CardContent>
        </Card>
      </motion.div>

      {/* Overlay when loading */}
      <LoadingOverlay
        show={loading}
        label="Authenticating..."
        className="border-secondary"
        textColor="text-secondary"
      />
    </div>
  );
}
