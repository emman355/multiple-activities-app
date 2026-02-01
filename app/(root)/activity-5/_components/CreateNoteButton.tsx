'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CreateNoteButton() {
  const router = useRouter();
  return (
    <Button className="w-fit" onClick={() => router.push('/activity-5/create')}>
      Create Note
    </Button>
  );
}
