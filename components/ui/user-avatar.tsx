import { User } from '@supabase/auth-js';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { cn } from '@/lib/utils';

export default function UserAvatar({ user, className }: { user: User; className?: string }) {
  const initials = user.email?.[0]?.toUpperCase() ?? 'U';
  const name =
    user.user_metadata?.full_name ||
    `${user.user_metadata?.first_name ?? ''} ${user.user_metadata?.last_name ?? ''}`.trim() ||
    user.email ||
    'User';

  return (
    <Avatar className={cn('h-10 w-10', className)}>
      <AvatarImage src={user.user_metadata?.avatar_url} alt={name} />
      <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
    </Avatar>
  );
}
