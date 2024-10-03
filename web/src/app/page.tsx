import { Suspense } from 'react';
import { getAllGigs, getAllArtists, getAllEvents, getAllVenues } from '@/sanity/queries';
import Homepage from './homepage';

export default async function Page() {
  const [gigs, artists, venues, events] = await Promise.all([
    await getAllGigs(),
    await getAllArtists(),
    await getAllVenues(),
    await getAllEvents(),
  ]);

  const Loader = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  return (
    <Suspense fallback={<Loader />}>
      <Homepage gigs={gigs} artists={artists} venues={venues} events={events} />
    </Suspense>
  );
}
