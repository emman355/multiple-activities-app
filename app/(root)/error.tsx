'use client';

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	
	return (
		<div className="flex flex-1 items-center justify-center px-6 mt-20">
			<div className="max-w-2xl w-full rounded-lg border border-border shadow-md p-6 text-center">
				<div className="mb-4">
					<Typography variant="h2" className="text-destructive">
						Oops, something went wrong!
					</Typography>
					<Typography variant="subtitle">
						We encountered an unexpected error while loading this page.
					</Typography>
				</div>

        <div className="mb-6 w-full bg-accent rounded-md p-3">
				<Typography variant="body1" className="text-xs text-accent-foreground ">
						{error.message}
					</Typography>
				</div>

				<Button
					onClick={() => reset()}
					variant="destructive"
					size="lg"
				>
					Try again
				</Button>
			</div>
		</div>
	);
}
