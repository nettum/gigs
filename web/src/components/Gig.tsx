'use client';

import { GigType } from '@/types';
import { Anton } from 'next/font/google';
const inter = Anton({ weight: '400', subsets: ['latin'] });
type Props = {
  gig: GigType;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
};

export default function Gig(props: Props) {
  const { gig, isActive, onActivate, onDeactivate } = props;

  const handleToggle = () => {
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  };

  return (
    <div className="py-4 text-center transition duration-200 select-none overflow-hidden hover:bg-zinc-800 px-4">
      <div className={`gig-item md:inline-block hover:text-amber-400 hover:cursor-horns -my-4 py-4 transition-opacity duration-700 ease-out ${isActive ? '!opacity-100' : ''}`}>
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
          onClick={handleToggle}
          onMouseEnter={onActivate}
          onMouseLeave={onDeactivate}
          className={`
          relative peer z-10 py-1 text-5xl lg:text-8xl
          border-t border-b border-amber-200 hover:border-amber-400
          transition-colors duration-200 ${inter.className}`}>
          {gig.title}
        </h1>
      </div>
    </div>
  );
}
