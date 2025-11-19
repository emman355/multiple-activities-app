"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { ReactNode, useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Authtabs from "./_components/Authtabs";
import { createClient } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { AnimatePresence, motion } from "framer-motion";
export default function AuthLayout({ children }: { children: ReactNode }) {
	const supabase = createClient();
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// --- OAuth login ---
	const handleOAuthLogin = useCallback(
		async (provider: 'google') => {
			setLoading(true);
			try {
				await supabase.auth.signInWithOAuth({
					provider,
					options: {
						redirectTo: `${window.location.origin}/auth/callback`,
					},
				});
			} catch (error) {
				const message = error instanceof Error ? error.message : "Unexpected error occurred";
				setErrorMsg(message);
			}
		},
		[supabase]
	);

	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Card className="max-w-lg w-full p-6">
				<CardHeader>
					<Typography variant="h2" color="text-gray-950" className="text-center">Welcome to Multiple Activities App</Typography>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<Button
						type="button"
						variant="outline"
						className="items-center gap-2"
						onClick={() => handleOAuthLogin('google')}
					>
						<FcGoogle />
						<Typography variant="small" className="text-center">Sign In with Google</Typography>
					</Button>

					{/* Separator */}
					<div className="relative">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<Typography variant="small" className="px-2 bg-card text-gray-400">
								Or continue with
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

					{children}
				</CardContent>
			</Card>
			{/* Overlay when loading */}
			<LoadingOverlay show={loading} label="Signing In..." className="border-green-600" textColor="text-green-600" />
		</div>
	);
}
