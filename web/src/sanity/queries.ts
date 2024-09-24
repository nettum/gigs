import { ArtistType, EventType, GigType, VenueType } from '@/types';
import client from './client';

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
  "event": coalesce(
    event->{ "name": name, "slug": slug.current }, null
  ),
  "artists": artist[]->{
    "name": name,
    "slug": slug.current
  }
}
`;

const allArtistsQuery = `
*[_type == "artist"]|order(lower(name) asc) {
  name,
  "slug": slug.current
}
`;

const allVenuesQuery = `
*[_type == "venue" && festivalVenue != true]|order(lower(name) asc) {
  name,
  "slug": slug.current
}
`;

const allEventsQuery = `
*[_type == "event"]|order(startDate desc) {
  name,
  "slug": slug.current
}
`;

export async function getAllGigs() {
  const data = await client.fetch<GigType[]>(allGigsQuery);
  return data;
}

export async function getAllArtists() {
  const data = await client.fetch<ArtistType[]>(allArtistsQuery);
  return data;
}

export async function getAllVenues() {
  const data = await client.fetch<VenueType[]>(allVenuesQuery);
  return data;
}

export async function getAllEvents() {
  const data = await client.fetch<EventType[]>(allEventsQuery);
  return data;
}
