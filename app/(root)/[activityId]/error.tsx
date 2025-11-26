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
			<div className="max-w-2xl w-full rounded-lg border border-gray-800 shadow-md p-6 text-center">
				<div className="mb-4">
					<Typography variant="h2" className="text-red-600">
						Oops, something went wrong!
					</Typography>
					<Typography variant="subtitle">
						We encountered an unexpected error while loading this page.
					</Typography>
				</div>

				<div className="mb-6 w-full bg-gray-300 rounded-md p-3">
					<Typography variant="body1" className="text-xs text-gray-950 ">
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
