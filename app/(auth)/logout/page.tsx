'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { useRouter } from 'next/navigation';
import { IoShieldCheckmark } from 'react-icons/io5';

export default function Logout() {
  const router = useRouter();
  return (
    <Card className="p-6 shadow-md rounded-xl bg-white dark:bg-zinc-900">
      {/* Center icon */}
      <CardHeader className="flex justify-center items-center">
        <IoShieldCheckmark className="w-24 h-24" />
      </CardHeader>

      {/* Center text */}
      <CardContent className="flex flex-col items-center text-center gap-2">
        <Typography variant="h2">Logged Out Successfully</Typography>
        <Typography variant="small" className="text-zinc-600 dark:text-zinc-400">
          Thank you for using our platform. Your session has ended securely. We hope to see you
          soon!
        </Typography>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button className="w-full" onClick={() => router.push('/')}>
          Return To Home
        </Button>
        <Button variant="outline" className="w-full" onClick={() => router.push('/sign-in')}>
          Login Again
        </Button>
      </CardFooter>
    </Card>
  );
}
