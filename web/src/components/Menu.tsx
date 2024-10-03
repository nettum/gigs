'use client';

import { useState } from 'react';
import { ArtistType, EventType, FilterType, VenueType } from '@/types';
import HamburgerIcon from '@/components/icons/HamburgerIcon';
import XIcon from '@/components/icons/XIcon';

type Props = {
  artists: ArtistType[];
  events: EventType[];
  venues: VenueType[];
  years: number[];
  onSetFilter: (filter: FilterType, value: string) => void;
};

export default function Menu({ artists, events, venues, years, onSetFilter }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetFilter = (type: FilterType, value: string) => {
    onSetFilter(type, value);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`
          cursor-pointer z-30
          ${isOpen ? 'text-zinc-900' : ''}
          `}
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <XIcon /> : <HamburgerIcon />}
      </button>

      <nav
        className={`
        absolute h-full w-lvw overflow-hidden overflow-y-scroll
        bg-white text-zinc-900 z-20 py-16 lg:px-40 px-8 text-2xl opacity-0 menu-transition
        ${isOpen ? 'top-0 left-0 opacity-100 ' : 'left-full'}`}>
        <div
          className={`opacity-0 my-4 ${
            isOpen ? 'opacity-100 transition-opacity duration-300 ease-in delay-150' : ''
          }`}>
          <div className="flex flex-wrap text-sm gap-4">
            <button className="menu-button" onClick={() => handleSetFilter('none', '')}>
              Remove filter
            </button>
          </div>
        </div>
        <div
          className={`opacity-0 my-4 ${
            isOpen ? 'opacity-100 transition-opacity duration-300 ease-in delay-200' : ''
          }`}>
          <div className="mb-2 text-base">Year:</div>
          <div className="flex flex-wrap text-sm gap-4">
            {years.map((year) => (
              <button
                key={`year-${year}`}
                className="menu-button"
                onClick={() => handleSetFilter('year', year.toString())}>
                {year}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`opacity-0 my-4 ${
            isOpen ? 'opacity-100 transition-opacity duration-300 ease-in delay-[250ms]' : ''
          }`}>
          <div className="mb-2 text-base">Event:</div>
          <div className="flex flex-wrap text-sm gap-4">
            {events.map((event) => (
              <button
                key={`event-${event.slug}`}
                className="menu-button"
                onClick={() => handleSetFilter('event', event.slug)}>
                {event.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`opacity-0 my-4 ${
            isOpen ? 'opacity-100 transition-opacity duration-300 ease-in delay-300' : ''
          }`}>
          <div className="mb-2 text-base">Venue:</div>
          <div className="flex flex-wrap text-sm gap-4">
            {venues.map((venue) => (
              <button
                key={`venue-${venue.slug}`}
                className="menu-button"
                onClick={() => handleSetFilter('venue', venue.slug)}>
                {venue.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`opacity-0 my-4 ${
            isOpen ? 'opacity-100 transition-opacity duration-300 ease-in delay-[350ms]' : ''
          }`}>
          <div className="mb-2 text-base">Artist:</div>
          <div className="flex flex-wrap text-sm gap-4">
            {artists.map((artist) => (
              <button
                key={`artist-${artist.slug}`}
                className="menu-button"
                onClick={() => handleSetFilter('artist', artist.slug)}>
                {artist.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
