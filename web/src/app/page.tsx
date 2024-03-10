import { getAllGigs, getAllArtists, getAllEvents, getAllVenues } from '@/sanity/queries';
import Homepage from './homepage';

export default async function Page() {
  const [gigs, artists, venues, events] = await Promise.all([
    await getAllGigs(),
    await getAllArtists(),
    await getAllVenues(),
    await getAllEvents(),
  ]);

  return <Homepage gigs={gigs} artists={artists} venues={venues} events={events} />;
}
