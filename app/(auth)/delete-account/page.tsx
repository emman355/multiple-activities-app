'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { useRouter } from 'next/navigation';
import { IoShieldCheckmark } from 'react-icons/io5';

export default function DeleteAccount() {
  const router = useRouter();
  return (
    <Card className="p-6 shadow-md rounded-xl bg-white dark:bg-zinc-900">
      {/* Center icon */}
      <CardHeader className="flex justify-center items-center">
        <IoShieldCheckmark className="w-24 h-24 text-green-600 dark:text-green-400" />
      </CardHeader>

      {/* Center text */}
      <CardContent className="flex flex-col items-center text-center gap-2">
        <Typography variant="h2">Account Deleted Successfully</Typography>
        <Typography variant="small" className="text-zinc-600 dark:text-zinc-400">
          Your account has been permanently removed from our platform. We’re sorry to see you go,
          and hope you’ll consider joining us again in the future.
        </Typography>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button
          className="w-full"
          onClick={() => {
            router.push('/');
            router.refresh();
          }}
        >
          Return To Home
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            router.push('/sign-up');
            router.refresh();
          }}
        >
          Create New Account
        </Button>
      </CardFooter>
    </Card>
  );
}
