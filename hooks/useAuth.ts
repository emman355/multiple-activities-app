'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LoginSchema } from '@/lib/schema/login';
import toast from 'react-hot-toast';
import { SignUpSchema } from '@/lib/schema/sign-up';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState({ state: false, text: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supabase = createClient();

  // --- OAuth login ---
  const handleOAuthLogin = useCallback(
    async (provider: 'google') => {
      setErrorMsg(null);
      setLoading({ state: true, text: `Redirecting to ${provider}...` });
      try {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        toast.success('Signing in with Google...');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unexpected error occurred';
        setErrorMsg(message);
        toast.error(message);
        setLoading({ state: false, text: '' }); // only reset if there was an error
      }
    },
    [supabase.auth]
  );

  // --- Email/password login ---
  const handleLogin = useCallback(
    async ({ email, password }: LoginSchema) => {
      setErrorMsg(null);
      setLoading({ state: true, text: 'Logging in...' });
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          toast.error(error.message || 'Login failed. No session returned.');
          return;
        }

        if (data.session) {
          toast.success('Sign-in successful!');
          router.push('/');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unexpected error occurred';
        setErrorMsg(message);
        toast.error(message);
      } finally {
        setLoading({ state: false, text: '' });
      }
    },
    [router, supabase.auth]
  );

  // --- Email/password sign-up ---
  const handleSignUp = useCallback(
    async ({ email, password, firstName, lastName }: SignUpSchema) => {
      setLoading({ state: true, text: 'Signing up...' });
      setErrorMsg(null);

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { first_name: firstName, last_name: lastName } },
        });

        if (error) {
          setErrorMsg(error.message);
          toast.error(error.message || 'Sign-up failed');
          return;
        }

        if (data.session) {
          toast.success('Sign-up successful!');
          router.push('/');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unexpected error occurred';
        setErrorMsg(message);
        toast.error(message);
      } finally {
        setLoading({ state: false, text: '' });
      }
    },
    [router, supabase.auth]
  );

  // --- Sign out ---
  const handleSignOut = useCallback(async () => {
    setLoading({ state: true, text: 'Signing out...' });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setErrorMsg(`Error signing out: ${error.message}`);
        toast.error(error.message || 'Error signing out');
        return;
      }
      toast.success('Signed out successfully!');
      router.push('/logout');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error occurred';
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading({ state: false, text: '' });
    }
  }, [supabase.auth, router]);

  return {
    loading,
    errorMsg,
    handleOAuthLogin,
    handleLogin,
    handleSignUp,
    handleSignOut,
    setLoading,
  };
}
