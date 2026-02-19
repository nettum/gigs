'use client';

import { GigType } from '@/types';
import imageUrlBuilder from '@sanity/image-url';
import client from '../sanity/client';
import { useState } from 'react';

const builder = imageUrlBuilder(client);

type Props = {
  gig: GigType | null;
  onUnfocus?: () => void;
};

type LayerState = {
  bottom: GigType | null;
  top: GigType | null;
  topKey: number;
};

function buildUrls(gig: GigType | null) {
  if (!gig?.concertImage) return { desktop: null, mobile: null, bgPosition: 'center' };
  const { hotspot } = gig.concertImage;
  return {
    desktop: builder.image(gig.concertImage).width(1920).auto('format').url(),
    mobile: builder.image(gig.concertImage).width(1080).height(1920).fit('crop').auto('format').url(),
    bgPosition: hotspot ? `${hotspot.x * 100}% ${hotspot.y * 100}%` : 'center',
  };
}

export default function GigImageOverlay({ gig, onUnfocus }: Props) {
  const [layer, setLayer] = useState<LayerState>({ bottom: null, top: null, topKey: 0 });
  const [prevGig, setPrevGig] = useState<GigType | null>(null);

  if (gig !== prevGig) {
    setPrevGig(gig);
    if (gig) {
      setLayer(prev => ({ bottom: prev.top, top: gig, topKey: prev.topKey + 1 }));
    }
  }

  const b = buildUrls(layer.bottom);
  const t = buildUrls(layer.top);

  return (
    <div
      onClick={onUnfocus}
      className={`${onUnfocus ? 'cursor-pointer' : 'pointer-events-none'} fixed inset-0 z-0 transition-opacity duration-500 ease-in-out ${gig ? 'opacity-100' : 'opacity-0'} overflow-hidden`}
    >
      {/* Bottom layer: previous image, always visible during crossfade */}
      {b.mobile && (
        <div style={{ backgroundImage: `url(${b.mobile})` }} className="absolute inset-0 bg-cover bg-center md:hidden" />
      )}
      {b.desktop && (
        <div className="hidden md:block absolute inset-0">
          <div style={{ backgroundImage: `url(${b.desktop})`, backgroundPosition: b.bgPosition }} className="absolute inset-0 bg-cover blur-3xl scale-110 brightness-[0.6]" />
          <div style={{ backgroundImage: `url(${b.desktop})` }} className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-2xl" />
        </div>
      )}

      {/* Top layer: incoming image — key change triggers remount + fadeIn animation */}
      {t.mobile && (
        <div key={`m-${layer.topKey}`} style={{ backgroundImage: `url(${t.mobile})` }} className="absolute inset-0 bg-cover bg-center md:hidden animate-fadeIn" />
      )}
      {t.desktop && (
        <div key={`d-${layer.topKey}`} className="hidden md:block absolute inset-0 animate-fadeIn">
          <div style={{ backgroundImage: `url(${t.desktop})`, backgroundPosition: t.bgPosition }} className="absolute inset-0 bg-cover blur-3xl scale-110 brightness-[0.6]" />
          <div style={{ backgroundImage: `url(${t.desktop})` }} className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-2xl" />
        </div>
      )}
    </div>
  );
}
