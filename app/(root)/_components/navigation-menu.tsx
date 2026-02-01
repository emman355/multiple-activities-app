import { HeroHeader } from '@/components/header';
import { getAuthSession } from '@/lib/auth/session';
import React from 'react';

export default async function NavigationMenu() {
  const session = await getAuthSession();
  const user = session?.user ?? null;
  return <HeroHeader user={user} />;
}
