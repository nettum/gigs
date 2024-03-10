import { GigType } from '@/types';
import { Anton } from 'next/font/google';
import imageUrlBuilder from '@sanity/image-url';
import client from '../sanity/client';

const inter = Anton({ weight: '400', subsets: ['latin'] });
const builder = imageUrlBuilder(client);

type Props = { gig: GigType };

export default function Gig(props: Props) {
  const gig = props.gig;
  const imageSource = gig.concertImage ? builder.image(gig.concertImage).width(1200) : null;

  return (
    <div className="py-4 text-center transition duration-200 select-none overflow-hidden hover:bg-zinc-800 px-4">
      <div className="md:inline-block hover:text-amber-400 hover:cursor-horns">
        <h2 className="flex justify-between z-10">
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
          relative peer z-10 py-1 text-5xl lg:text-8xl
          border-t border-b border-amber-200 hover:border-amber-400
          transition-colors duration-200 ${inter.className}`}>
          {gig.title}
        </h1>
        {imageSource && (
          <div
            style={{ backgroundImage: `url(${imageSource})` }}
            className="
              pointer-events-none fixed w-full h-full top-0 right-0 bottom-0 left-0
              hidden opacity-0 animate-fadeIn
              bg-center bg-cover peer-hover:block peer-hover:opacity-100"></div>
        )}
      </div>
    </div>
  );
}
