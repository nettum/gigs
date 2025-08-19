'use client';
import { GigType } from '@/types';
import Gig from './Gig';

type GigsProps = {
  gigs: GigType[];
};

export default function Gigs({ gigs }: GigsProps) {
  return (
    <>
      <main className="pt-16 [&:has(.gig-item:hover)_.gig-item:not(:hover)]:opacity-15 [&_.gig-item]:transition-opacity [&_.gig-item]:duration-700 [&_.gig-item]:ease-out">
        {gigs.map((gig) => (
          <Gig gig={gig} key={gig.slug} />
        ))}
      </main>
    </>
  );
}
