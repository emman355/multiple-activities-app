import { PokemonDetails, PokemonReview } from '@/app/(root)/activity-4/types';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import Typography from '@/components/ui/typography';
import { Session, User } from '@supabase/supabase-js';
import ReviewActions from '../review-actions';
import UserAvatar from '@/components/ui/user-avatar';
import { formatDistanceToNow } from 'date-fns';

export default function ReviewItem({
  review,
  session,
  details,
}: {
  review: PokemonReview;
  session: Session | null;
  details: PokemonDetails;
}) {
  const user = session?.user ?? null;
  const isOwner = user?.id === review.userId;
  const fullName = user?.user_metadata?.full_name || user?.email || 'User';

  return (
    <div className="flex flex-col gap-4 border border-border rounded-4xl p-6">
      <div className="flex gap-4 justify-between">
        <div className="flex items-center gap-4">
          <UserAvatar className="h-12 w-12" user={user as User} />
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle">{fullName}</Typography>
            <Typography variant="caption">
              {formatDistanceToNow(new Date(review.uploadDate), { addSuffix: true })}
            </Typography>
          </div>
        </div>

        {isOwner && <ReviewActions review={review} imgUrl={details?.image_url} />}
      </div>

      <Rating value={review.rating} readOnly>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton className="text-amber-500" size={12} key={index} />
        ))}
      </Rating>

      <Typography variant="body1">{review.content}</Typography>
    </div>
  );
}
