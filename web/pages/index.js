import Head from 'next/head';
import Image from 'next/image';

import client from '../client';
import styles from '../styles/Home.module.css';

export default function Home(gigs) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marius - Gigs</title>
        <meta name="description" content="A list of all the gigs I've attended" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      </main>
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
      gigs,
    },
  };
}
