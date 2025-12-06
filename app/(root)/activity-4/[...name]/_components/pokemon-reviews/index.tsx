import Typography from '@/components/ui/typography'
import { PokemonDetails, PokemonReview } from '../../../types'
import { getPokemonReviews } from '../../../_action/getPokemonReviews'
import AddReview from './add-review'
import { FaRegCommentDots } from 'react-icons/fa'
import { getAuthSession } from '@/lib/auth/session'
import ReviewItem from './review-item'


export default async function PokemonReviews({ name, details }: { name: string, details: PokemonDetails }) {
  const pokemonReviews = await getPokemonReviews()
  const session = await getAuthSession();

  const filteredReviews: PokemonReview[] = pokemonReviews.filter(
    (review: { pokemonName: string }) =>
      review?.pokemonName?.toLowerCase() === name
  );

  return (
    <div className='flex flex-col justify-start gap-5'>
      <div className='flex justify-between'>
        <Typography variant='h3'>User Reviews</Typography>
        {filteredReviews.length !== 0 && (
          <AddReview pokemonName={name} details={details} />
        )}
      </div>
      {filteredReviews.length ? (
        filteredReviews?.map((review) => (
          <ReviewItem key={review.id} review={review} session={session} details={details} />
        )))
        : (
          <div className="flex flex-col items-center justify-center py-16 border border-gray-800 rounded-2xl bg-gray-900/30">
            <FaRegCommentDots className="text-amber-500 mb-4" size={40} />
            <Typography variant="subtitle" className="mb-2 font-semibold">
              No Reviews Yet
            </Typography>
            <Typography variant="body2" className="text-muted-foreground mb-6 text-center max-w-sm">
              Be the first to share your thoughts and rate {name.charAt(0).toUpperCase() + name.slice(1)}!
            </Typography>
            <AddReview pokemonName={name} details={details} />
          </div>
        )
      }
    </div>
  )
}
