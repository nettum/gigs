'use client';
import { GigType } from '@/types';
import Gig from './Gig';

type GigsProps = {
  gigs: GigType[];
};

export default function Gigs({ gigs }: GigsProps) {
  return (
    <>
      <div className="absolute left-0 top-0 p-4 md:px-8 text-base z-10"># gigs: {gigs.length}</div>
      <main className="pt-16">
        {gigs.map((gig) => (
          <Gig gig={gig} key={gig.slug} />
        ))}
      </main>
    </>
  );
}
