'use client';

import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import Typography from '@/components/ui/typography';

type RatingsProps = {
  value?: number;
  onChange?: (val: number) => void;
};

export default function Ratings({ value = 0, onChange }: RatingsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle">Your Rating</Typography>
      <Rating value={value} onValueChange={(val) => onChange?.(val)}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton className="text-amber-600" key={index} />
        ))}
      </Rating>
    </div>
  );
}
