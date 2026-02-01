'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Menu, X, LogOut, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ACTIVITY } from '@/app/(root)/_constants';
import { createClient } from '@/lib/supabase/client';
import { createAdminClient } from '@/lib/supabase/admin';
import { useAuth } from '@/hooks/useAuth';
import ConfirmDialog from '@/components/ui/confirm-dialog';
import Typography from '@/components/ui/typography';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoadingOverlay } from './ui/loadingOverlay';
import UserAvatar from './ui/user-avatar';

// Client-only theme toggle
const ModeToggle = dynamic(
  () => import('@/components/mode-toggle').then((m) => ({ default: m.ModeToggle })),
  { ssr: false }
);

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type HeroHeaderProps = {
  user: User | null;
};

interface NavItem {
  name: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*                               Static config                                */
/* -------------------------------------------------------------------------- */

const guestLinks: NavItem[] = [
  { name: 'Features', href: '#features' },
  { name: 'Latest Blog', href: '#latest-blog' },
  { name: 'Creator', href: '#creator' },
];

const authLinks: NavItem[] = Object.values(ACTIVITY).map((a) => ({
  name: a.label,
  href: `/${a.id}`,
}));

/* -------------------------------------------------------------------------- */
/*                                Subcomponents                                */
/* -------------------------------------------------------------------------- */
function ProfileMenu({
  user,
  onLogout,
  onDelete,
}: {
  user: User;
  onLogout: () => void;
  onDelete: () => void;
}) {
  const name = user.user_metadata?.full_name || user.email || 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full">
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <Typography variant="small" className="font-medium">
              {name}
            </Typography>
            <Typography variant="small" className="text-xs text-muted-foreground">
              {user.email}
            </Typography>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Main header                                 */
/* -------------------------------------------------------------------------- */

export function HeroHeader({ user }: HeroHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const supabase = createClient();
  const { handleSignOut, loading, setLoading } = useAuth();

  const links = useMemo(() => (user ? authLinks : guestLinks), [user]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDeleteAccount = async () => {
    if (!user?.id) return toast.error('User not found');
    setLoading({ state: true, text: 'Deleting Account...' });
    setIsDeleting(true);
    try {
      const admin = createAdminClient();
      const { error } = await admin.auth.admin.deleteUser(user.id);
      if (error) throw error;

      const { error: signOutError } = await supabase.auth.signOut();
      if (error) {
        toast.error(signOutError?.message || 'Error signing out');
        return;
      }
      toast.success('Account deleted');
      router.push('/delete-account');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message ?? 'Failed to delete account');
      } else {
        throw new Error('Unknown error occurred while fetching note');
      }
    } finally {
      setIsDeleting(false);
      setShowDelete(false);
      setLoading({ state: false, text: '' });
    }
  };

  return (
    <>
      <header className="fixed z-20 w-full px-2">
        <nav
          data-state={menuOpen && 'active'}
          className={cn(
            'relative mx-auto mt-2 rounded-2xl px-6 transition-all lg:max-w-10/12 lg:px-12',
            scrolled && 'bg-background/60 border backdrop-blur-lg'
          )}
        >
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile menu panel */}
            {menuOpen && (
              <div className="lg:hidden mt-16 absolute inset-0 size-full">
                <ul
                  className={cn(
                    'bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent'
                  )}
                >
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                  {!user ? (
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="outline">
                        <Link href="/sign-in">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </div>
                  ) : null}
                </ul>
              </div>
            )}

            {/* Desktop nav */}
            <ul className="hidden gap-8 text-sm lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6">
              <ModeToggle />

              {user ? (
                <ProfileMenu
                  user={user}
                  onLogout={handleSignOut}
                  onDelete={() => setShowDelete(true)}
                />
              ) : (
                <div className="hidden lg:block space-x-2">
                  <Button asChild variant="outline">
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <ConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        title="Delete Account?"
        description="This action cannot be undone. Deleting your account will permanently remove all your data and any content you’ve created. You will lose access to all associated features, and recovery will not be possible."
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDeleteAccount}
      />

      {/* Overlay when loading */}
      <LoadingOverlay
        show={loading.state}
        label={loading.text}
        className="border-red-600"
        textColor="text-red-600"
      />
    </>
  );
}
