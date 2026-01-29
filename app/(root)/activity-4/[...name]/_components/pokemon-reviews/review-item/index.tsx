import { PokemonDetails, PokemonReview } from '@/app/(root)/activity-4/types';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import Typography from '@/components/ui/typography';
import { formatTimeAgo, getUsernameFromEmail, getUsernameInitialFromEmail } from '@/lib/utils';
import { Session } from '@supabase/supabase-js';
import ReviewActions from '../review-actions';

export default function ReviewItem({
  review,
  session,
  details,
}: {
  review: PokemonReview;
  session: Session;
  details: PokemonDetails;
}) {
  const isOwner = session?.user?.id === review.userId;

  return (
    <div className="flex flex-col gap-4 border border-border rounded-4xl p-6">
      <div className="flex gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Typography
            variant="h3"
            color="text-foreground"
            className="flex items-center justify-center rounded-full bg-primary w-15 h-15 text-md font-bold"
          >
            {getUsernameInitialFromEmail(review.userEmail)}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle">{getUsernameFromEmail(review.userEmail)}</Typography>
            <Typography variant="caption">{formatTimeAgo(review.uploadDate)}</Typography>
          </div>
        </div>

        {isOwner && <ReviewActions review={review} imgUrl={details?.image_url} />}
      </div>

      <Rating value={review.rating} readOnly>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton className="text-accent" size={12} key={index} />
        ))}
      </Rating>

      <Typography variant="body1">{review.content}</Typography>
    </div>
  );
}
