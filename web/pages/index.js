import { useState } from 'react';
import Head from 'next/head';

import styled from 'styled-components';

import client from '../client';
import Filter from './../components/Filter';
import Gig from './../components/Gig';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
  @media (min-width: 900px) {
    padding: 0 0;
  }
`;
const Header = styled.header`
  font-size: 2em;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 2rem);
`;
const Main = styled.main``;

export default function Home(props) {
  const { gigs: allGigs, artists, venues, events } = props;
  const [ gigs, setGigs ] = useState(allGigs);

  const handleFilter = (type, value) => {
    let filter = null;
    switch (type) {
      case 'artist':
        filter = allGigs.filter(gig => gig.artists.some(artist => artist.slug === value));
        break;
      case 'venue':
        filter = allGigs.filter(gig => gig.venue.slug === value);
        break;
      case 'event':
        filter = allGigs.filter(gig => gig.event.slug === value);
        break;
      default:
        filter = allGigs;
    }
    setGigs(filter);
  };

  return (
    <>
      <Head>
        <title>Marius - Gigs</title>
        <meta name="description" content="A list of all the gigs I've attended" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      </Head>

      <Wrapper>
        <Header>
          <div># gigs: {gigs.length}</div>
          <Filter artists={artists} venues={venues} events={events} onSetFilter={handleFilter} />
        </Header>
        <Main>
          {gigs.map(gig => <Gig gig={gig} key={gig.slug} />)}
        </Main>
      </Wrapper>
    </>
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
        "name": venue->name,
        "slug": venue->slug.current
      },
      "event": {
        "name": event->name,
        "slug": event->slug.current
      },
      "artists": artist[]->{
        "name": name,
        "slug": slug.current
      }
    }
  `;
  const allArtistsQuery = `
    *[_type == "artist"]|order(name asc) {
      name,
      "slug": slug.current
    }
  `;
  const allVenuesQuery = `
    *[_type == "venue"]|order(name asc) {
      name,
      "slug": slug.current
    }
  `;
  const allEventsQuery = `
    *[_type == "event"]|order(name asc) {
      name,
      "slug": slug.current
    }
  `;

  const [gigs, artists, venues, events] = await Promise.all([
    client.fetch(allGigsQuery),
    client.fetch(allArtistsQuery),
    client.fetch(allVenuesQuery),
    client.fetch(allEventsQuery)
  ]);

  return {
    props: {
      gigs,
      artists,
      venues,
      events,
    },
  };
}
