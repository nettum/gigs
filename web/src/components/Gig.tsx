'use client';

import { memo } from 'react';
import { GigType } from '@/types';
import { Anton } from 'next/font/google';
const inter = Anton({ weight: '400', subsets: ['latin'] });

type Props = {
  gig: GigType;
  isActive: boolean;
  onActivate: (gig: GigType) => void;
  onDeactivate: () => void;
  onClick: (gig: GigType) => void;
};

export default memo(function Gig({ gig, isActive, onActivate, onDeactivate, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(gig)}
      onMouseEnter={() => onActivate(gig)}
      onMouseLeave={onDeactivate}
      className="group py-4 text-center transition duration-200 select-none overflow-hidden px-4 hover:cursor-horns">
      <div className={`gig-item md:inline-block group-hover:text-amber-400 -my-4 py-4 transition-opacity duration-300 ease-out ${isActive ? '!opacity-100' : ''}`}>
        <h2 className="flex justify-between gap-2 z-10">
          <small className="text-xs z-10">
            {new Intl.DateTimeFormat('nb-NO', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(gig.concertDate))}
          </small>
          <small className="text-xs z-10">
            {gig.event ? `${gig.event.name} - ${gig.venue.name}` : gig.venue.name}
          </small>
        </h2>
        <h1
          className={`
          relative z-10 py-1 text-5xl lg:text-8xl
          border-t border-b border-amber-200 hover:border-amber-400
          transition-colors duration-200 ${inter.className}`}>
          {gig.title}
        </h1>
      </div>
    </div>
  );
});
