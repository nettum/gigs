import Head from 'next/head';
import Image from 'next/image';

import styled from 'styled-components';

import client from '../client';

const Main = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  background-color: red;
`;

export default function Home(props) {
  const { gigs } = props;
  return (
    <div>
      <Head>
        <title>Marius - Gigs</title>
        <meta name="description" content="A list of all the gigs I've attended" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        {gigs.map(gig => {
          return (
            <div key={gig.slug}>
              <small>
              {new Intl.DateTimeFormat('nb-NO', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              }).format(new Date(gig.concertDate))}
              </small>
              <h1>{gig.title}</h1>
              <h2>{gig.event.name ? `${gig.event.name}, ${gig.venue.name}` : gig.venue.name}</h2>
            </div>
          );
        })}
      </Main>
    </div>
  )
}

export async function getStaticProps(context) {
  const allGigsQuery = `
    *[_type == "gig" && concertDate <= now()]|order(concertDate desc) {
      title,
      "slug": slug.current,
      concertImage,
      concertDate,
      "venue": {
        'name': venue->name,
        'slug': venue->slug.current
      },
      "event": {
        'name': event->name,
        'slug': event->slug.current
      }
    }
  `;

  const gigs = await client.fetch(allGigsQuery);

  return {
    props: {
      gigs: gigs,
    },
  };
}
