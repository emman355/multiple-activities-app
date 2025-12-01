// Review.tsx
import { Textarea } from '@/components/ui/textarea'

type ReviewProps = {
  value?: string
  onChange?: (val: string) => void
}

export default function Review({ value = '', onChange }: ReviewProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="review">Your Review</label>
      <Textarea
        id="review"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Write your thoughts..."
      />
    </div>
  )
}
