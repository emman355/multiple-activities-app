'use client';

import { AuthForm } from '../_components/AuthForm';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import Authtabs from '../_components/Authtabs';
import { useAuth } from '@/hooks/useAuth';
import { SignUpSchema, signUpSchema } from '@/lib/schema/sign-up';
import { LoadingOverlay } from '@/components/ui/loadingOverlay';

export default function SignUp() {
  const { loading, handleOAuthLogin, handleSignUp, errorMsg } = useAuth();

  return (
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
          aria-busy={loading.state}
          disabled={loading.state}
          className="flex items-center justify-center gap-2 "
          onClick={() => handleOAuthLogin('google')}
        >
          <FcGoogle className="text-xl" />
          {loading.state ? 'Redirecting...' : 'Continue with Google'}
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
              className="mt-4 text-red-600 text-sm"
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <AuthForm<SignUpSchema>
          schema={signUpSchema}
          defaultValues={{ email: '', password: '' }}
          onSubmit={handleSignUp}
          fields={[
            {
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              placeholder: 'Enter your first name',
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              placeholder: 'Enter your last name',
            },
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'you@example.com',
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: 'Please enter your password',
            },
          ]}
        />
      </CardContent>
      <LoadingOverlay
        show={loading.state}
        label={loading.text}
        className="border-secondary"
        textColor="text-secondary"
      />
    </Card>
  );
}
