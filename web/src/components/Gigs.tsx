'use client';
import { GigType } from '@/types';
import Gig from './Gig';

type GigsProps = {
  gigs: GigType[];
  onSetActiveGig: (gig: GigType | null) => void;
  activeGig: GigType | null;
};

export default function Gigs({ gigs, onSetActiveGig, activeGig }: GigsProps) {
  return (
    <>
      <main className={`pt-16 transition-opacity duration-700 ease-out ${activeGig ? '[&_.gig-item]:opacity-15' : ''}`}>
        {gigs.map((gig) => (
          <Gig
            gig={gig}
            key={gig.slug}
            isActive={activeGig?.slug === gig.slug}
            onActivate={() => onSetActiveGig(gig)}
            onDeactivate={() => onSetActiveGig(null)}
          />
        ))}
      </main>
    </>
  );
}
