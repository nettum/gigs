'use client';

import { useState, useCallback, useMemo } from 'react';
import Gigs from '@/components/Gigs';
import Menu from '@/components/Menu';
import Search from '@/components/Search';
import { ArtistType, EventType, GigType, VenueType } from '@/types';

type HomePageProps = {
  artists: ArtistType[];
  venues: VenueType[];
  events: EventType[];
  gigs: GigType[];
};

export default function Homepage(props: HomePageProps) {
  const [filter, setFilter] = useState<{
    type: string;
    value: string;
  }>({
    type: '',
    value: '',
  });
  const { artists, venues, events, gigs: allGigs } = props;

  const filterGigs = useCallback((gigs: GigType[], type: string, value: string) => {
    let filteredGigs: GigType[] = [];
    switch (type) {
      case 'artist':
        filteredGigs = gigs.filter((gig) => gig.artists.some((artist) => artist.slug === value));
        break;
      case 'venue':
        filteredGigs = gigs.filter((gig) => gig.venue.slug === value);
        break;
      case 'event':
        filteredGigs = gigs.filter((gig) => gig.event?.slug === value);
        break;
      case 'year':
        filteredGigs = gigs.filter((gig) => gig.concertDate.substring(0, 4) === value);
        break;
      case 'search':
        filteredGigs = gigs.filter((gig) => {
          const lowercaseTerm = value.toLowerCase();
          return (
            gig.artists.some((artist) => artist.name.toLowerCase().includes(lowercaseTerm)) ||
            (gig.event?.name.toLowerCase().includes(lowercaseTerm) ?? false) ||
            gig.venue.name.toLowerCase().includes(lowercaseTerm) ||
            (gig.title.toLowerCase().includes(lowercaseTerm) ?? false)
          );
        });
        break;
      case 'reset':
        filteredGigs = gigs;
        break;
    }

    return filteredGigs;
  }, []);

  const filteredGigs = useMemo(
    () => filterGigs(allGigs, filter.type, filter.value),
    [allGigs, filter, filterGigs]
  );

  const handleFilter = useCallback((type: string, value: string) => {
    setFilter({ type, value });
  }, []);

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
      <div className="absolute left-0 top-0 p-4 md:px-8 text-base z-10">
        # gigs: {filteredGigs.length}
      </div>
      <div className="flex justify-end items-center gap-2 p-4">
        <div className="cursor-pointer scale-90 z-10">
          <Search onSearch={handleFilter} />
        </div>
        <Menu
          artists={artists}
          venues={venues}
          events={events}
          years={yearList}
          onSetFilter={handleFilter}
        />
      </div>
      <Gigs gigs={filteredGigs} />
    </div>
  );
}
