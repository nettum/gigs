'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Gigs from '@/components/Gigs';
import GigImageOverlay from '@/components/GigImageOverlay';
import Menu from '@/components/Menu';
import Search from '@/components/Search';

import { ArtistType, EventType, FilterType, GigType, VenueType } from '@/types';

type HomePageProps = {
  artists: ArtistType[];
  venues: VenueType[];
  events: EventType[];
  gigs: GigType[];
};

export default function Homepage(props: HomePageProps) {
  const { artists, venues, events, gigs: allGigs } = props;

  const searchParams = useSearchParams();
  const router = useRouter();

  const artist = searchParams.get('artist');
  const venue = searchParams.get('venue');
  const event = searchParams.get('event');
  const year = searchParams.get('year');
  const search = searchParams.get('search');

  const [filter, setFilter] = useState<{
    type: FilterType;
    value: string;
  }>(() => {
    if (artist) return { type: 'artist', value: artist };
    if (venue) return { type: 'venue', value: venue };
    if (event) return { type: 'event', value: event };
    if (year) return { type: 'year', value: year };
    if (search) return { type: 'search', value: search };

    return { type: 'none', value: '' };
  });

  const filterGigs = useCallback((gigs: GigType[], type: FilterType, value: string) => {
    let filteredGigs: GigType[] = [];
    switch (type as FilterType) {
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
            gig.title.toLowerCase().includes(lowercaseTerm)
          );
        });
        break;
      case 'none':
        filteredGigs = gigs;
        break;
    }

    return filteredGigs;
  }, []);

  const filteredGigs = useMemo(
    () => filterGigs(allGigs, filter.type, filter.value),
    [allGigs, filter, filterGigs]
  );

  const handleFilter = useCallback(
    (type: FilterType, value: string) => {
      if (type === 'none') {
        router.push('/');
      } else {
        router.push(`/?${type}=${encodeURIComponent(value)}`);
      }
      setFilter({ type, value });
    },
    [router]
  );

  const maxYear = new Date().getFullYear();
  const minYear =
    allGigs.length > 0 ? Number(allGigs[allGigs.length - 1].concertDate.substring(0, 4)) : maxYear;

  let yearList: number[] = [];
  for (var i = maxYear; i >= minYear; i--) {
    yearList.push(i);
  }

  const [activeGig, setActiveGig] = useState<GigType | null>(null);

  return (
    <div className="relative w-full min-h-lvh text-amber-200 overflow-hidden">
      <GigImageOverlay gig={activeGig} />
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
      <Gigs gigs={filteredGigs} onSetActiveGig={setActiveGig} activeGig={activeGig} />
    </div>
  );
}
