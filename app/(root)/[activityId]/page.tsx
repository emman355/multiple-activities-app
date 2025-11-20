import type { ComponentType } from 'react';
import { notFound } from 'next/navigation';
import ActivityOne from './_modules/ActivityOne';
import ActivityTwo from './_modules/ActivityTwo';
import ActivityThree from './_modules/ActivityThree';
import ActivityFour from './_modules/ActivityFour';
import ActivityFive from './_modules/ActivityFive';
import { ACTIVITY } from '../_constants';
// Define the interface for the parameters object
interface SecretPageProps {
  params: {
    // The key must match your dynamic folder name: [pageSlug]
    activityId: string;
  };
}

interface PageEntry {
  url: string;
  component: ComponentType;
}

export const VALID_PAGES: PageEntry[] = [
  { url: ACTIVITY.ACTIVITY_1.id, component: ActivityOne },
  { url: ACTIVITY.ACTIVITY_2.id, component: ActivityTwo },
  { url: ACTIVITY.ACTIVITY_3.id, component: ActivityThree },
  { url: ACTIVITY.ACTIVITY_4.id, component: ActivityFour },
  { url: ACTIVITY.ACTIVITY_5.id, component: ActivityFive },

]

const SecretPage = async ({ params }: SecretPageProps) => {
  // 1. Get the dynamic segment from the URL
  const { activityId } = await params;

  // 2. Validate the slug to ensure it's one of the expected pages
  if (!VALID_PAGES.some(page => page.url === activityId)) {
    // Return a 404 page if the URL segment is invalid
    return notFound();
  }

  const RenderedComponent = VALID_PAGES.find(page => page.url === activityId)!.component;
  // Conditional Rendering based on the slug
  return (
    <div className='space-y-6 w-full'>
      <RenderedComponent />
    </div>
  );
}

export default SecretPage;