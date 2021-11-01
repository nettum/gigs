import Head from 'next/head';

import styled from 'styled-components';

import client from '../client';
import Gig from './../components/Gig';

const Main = styled.main`
  margin: 0 auto;
  width: 100%;
`;

export default function Home(props) {
  const { gigs } = props;
  return (
    <div>
      <Head>
        <title>Marius - Gigs</title>
        <meta name="description" content="A list of all the gigs I've attended" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      </Head>

      <Main>
        {gigs.map(gig => <Gig gig={gig} key={gig.slug} />)}
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
