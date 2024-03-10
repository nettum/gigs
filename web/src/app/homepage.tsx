'use client';

import { useState } from 'react';
import Gigs from '@/components/Gigs';
import Menu from '@/components/Menu';
import { ArtistType, EventType, GigType, VenueType } from '@/types';

type HomePageProps = {
  artists: ArtistType[];
  venues: VenueType[];
  events: EventType[];
  gigs: GigType[];
};

export default function Homepage(props: HomePageProps) {
  const [gigs, setGigs] = useState(props.gigs);
  const { artists, venues, events } = props;

  const handleFilter = (type?: string, value?: string) => {
    let filteredGigs: GigType[] = [];
    switch (type) {
      case 'artist':
        filteredGigs = props.gigs.filter((gig) =>
          gig.artists.some((artist) => artist.slug === value)
        );
        break;
      case 'venue':
        filteredGigs = props.gigs.filter((gig) => gig.venue.slug === value);
        break;
      case 'event':
        filteredGigs = props.gigs.filter((gig) => gig.event?.slug === value);
        break;
      case 'year':
        filteredGigs = props.gigs.filter((gig) => gig.concertDate.substring(0, 4) === value);
        break;
      default:
        filteredGigs = props.gigs;
    }
    setGigs(filteredGigs);
  };

  const maxYear = new Date().getFullYear();
  const minYear =
    props.gigs.length > 0
      ? Number(props.gigs[props.gigs.length - 1].concertDate.substring(0, 4))
      : maxYear;

  let yearList: number[] = [];
  for (var i = maxYear; i >= minYear; i--) {
    yearList.push(i);
  }

  return (
    <div className="relative w-full min-h-lvh text-amber-200 overflow-hidden">
      <Menu
        artists={artists}
        venues={venues}
        events={events}
        years={yearList}
        onSetFilter={handleFilter}
      />
      <Gigs gigs={gigs} />
    </div>
  );
}
