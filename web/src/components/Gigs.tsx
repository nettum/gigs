'use client';

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { GigType } from '@/types';
import Gig from './Gig';
import GigImageOverlay from './GigImageOverlay';

type GigsProps = {
  gigs: GigType[];
};

type State = {
  hovered: GigType | null;
  focused: GigType | null;
  overlay: GigType | null;
  unfocusing: boolean;
};

type Action =
  | { type: 'hover'; gig: GigType }
  | { type: 'leave' }
  | { type: 'focus'; gig: GigType }
  | { type: 'unfocus' }
  | { type: 'doneUnfocusing' }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hover':           return { ...state, hovered: action.gig, overlay: action.gig, unfocusing: false };
    case 'leave':           return { ...state, hovered: null };
    case 'focus':           return { ...state, focused: action.gig, overlay: action.gig, unfocusing: false };
    case 'unfocus':         return { ...state, focused: null, unfocusing: true };
    case 'doneUnfocusing':  return { ...state, unfocusing: false };
    case 'reset':           return { hovered: state.hovered, focused: null, overlay: state.overlay, unfocusing: false };
  }
}

export default function Gigs({ gigs }: GigsProps) {
  const [{ hovered, focused, overlay, unfocusing }, dispatch] = useReducer(reducer, {
    hovered: null, focused: null, overlay: null, unfocusing: false,
  });
  const deactivateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { dispatch({ type: 'reset' }); }, [gigs]);

  useEffect(() => {
    if (!unfocusing) return;
    const timer = setTimeout(() => dispatch({ type: 'doneUnfocusing' }), 700);
    return () => clearTimeout(timer);
  }, [unfocusing]);

  const handleActivate = useCallback((gig: GigType) => {
    if (deactivateTimer.current) clearTimeout(deactivateTimer.current);
    dispatch({ type: 'hover', gig });
  }, []);

  const handleDeactivate = useCallback(() => {
    deactivateTimer.current = setTimeout(() => dispatch({ type: 'leave' }), 50);
  }, []);

  const handleClick = useCallback((gig: GigType) => {
    dispatch({ type: 'focus', gig });
  }, []);

  const handleUnfocus = useCallback(() => {
    dispatch({ type: 'unfocus' });
  }, []);

  const displayedGig = focused ?? hovered;
  const isDimmed = !!focused || unfocusing || !!displayedGig;

  return (
    <>
      <GigImageOverlay gig={overlay} onUnfocus={focused ? handleUnfocus : undefined} />
      <main className={`pt-16 transition-opacity duration-700 ease-out ${focused ? 'opacity-0 pointer-events-none' : ''} ${isDimmed ? '[&_.gig-item]:opacity-15' : ''}`}>
        {gigs.map((gig) => (
          <Gig
            key={gig.slug}
            gig={gig}
            isActive={hovered?.slug === gig.slug}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
            onClick={handleClick}
          />
        ))}
      </main>
    </>
  );
}
