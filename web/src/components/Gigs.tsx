'use client';
import { GigType } from '@/types';
import Gig from './Gig';

type GigsProps = {
  gigs: GigType[];
};

export default function Gigs({ gigs }: GigsProps) {
  return (
    <>
      <main className="pt-16">
        {gigs.map((gig) => (
          <Gig gig={gig} key={gig.slug} />
        ))}
      </main>
    </>
  );
}
