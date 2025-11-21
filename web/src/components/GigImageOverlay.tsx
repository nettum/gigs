'use client';

import { GigType } from '@/types';
import imageUrlBuilder from '@sanity/image-url';
import client from '../sanity/client';
import { useState, useEffect } from 'react';

const builder = imageUrlBuilder(client);

type Props = {
  gig: GigType | null;
};

export default function GigImageOverlay({ gig }: Props) {
  const [visibleGig, setVisibleGig] = useState<GigType | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (gig) {
      setVisibleGig(gig);
      setIsFadingOut(false);
    } else {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setVisibleGig(null);
        setIsFadingOut(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gig]);

  const [imageSourceDesktop, imageSourceMobile] = visibleGig?.concertImage
    ? [
        builder.image(visibleGig.concertImage).width(1920).auto('format').url(),
        builder
          .image(visibleGig.concertImage)
          .width(1080)
          .height(1920)
          .fit('crop')
          .auto('format')
          .url(),
      ]
    : [null, null];

  const hotspot = visibleGig?.concertImage?.hotspot;
  const desktopBgPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : 'center';

  const opacityClass = gig && visibleGig && !isFadingOut ? 'opacity-100' : 'opacity-0';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ease-in-out ${opacityClass} overflow-hidden`}
    >
      {imageSourceMobile && (
        <div
          style={{ backgroundImage: `url(${imageSourceMobile})` }}
          className="absolute inset-0 bg-cover bg-center md:hidden"
        />
      )}

      {imageSourceDesktop && (
        <div className="hidden md:block absolute inset-0">
          <div
            style={{
              backgroundImage: `url(${imageSourceDesktop})`,
              backgroundPosition: desktopBgPosition,
            }}
            className="absolute inset-0 bg-cover blur-3xl scale-110 brightness-[0.6]"
          />
          <div
            style={{ backgroundImage: `url(${imageSourceDesktop})` }}
            className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
