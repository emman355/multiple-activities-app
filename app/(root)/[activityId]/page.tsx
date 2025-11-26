import { type ComponentType } from 'react';
import { notFound } from 'next/navigation';
import ActivityOne from './_activity-one';
import ActivityTwo from './_activity-two';
import ActivityThree from './_activity-three';
import ActivityFour from './_activity-four';
import ActivityFive from './_activity-five';
import { ACTIVITY } from '../_constants';

// Define the interface for the parameters object
interface HomeProps {
  params: Promise<{
    activityId: string;
  }>;
}

interface PageEntry {
  url: string;
  component: ComponentType<unknown> | React.LazyExoticComponent<ComponentType<object>> | unknown;
}

export const VALID_PAGES: PageEntry[] = [
  { url: ACTIVITY.ACTIVITY_1.id, component: ActivityOne },
  { url: ACTIVITY.ACTIVITY_2.id, component: ActivityTwo },
  { url: ACTIVITY.ACTIVITY_3.id, component: ActivityThree },
  { url: ACTIVITY.ACTIVITY_4.id, component: ActivityFour },
  { url: ACTIVITY.ACTIVITY_5.id, component: ActivityFive },
]

const Home = async ({ params }: HomeProps) => {
  // ✅ Await the params object
  const { activityId } = await params;

  if (!VALID_PAGES.some(page => page.url === activityId)) {
    return notFound();
  }

  const RenderedComponent = VALID_PAGES.find(page => page.url === activityId)!.component as ComponentType<unknown>;

  return (
    <div className="space-y-6 w-full">
          <RenderedComponent />
    </div>
  );
};

export default Home;