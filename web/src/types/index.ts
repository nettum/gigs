export type ArtistType = {
  name: string;
  slug: string;
};

export type VenueType = {
  name: string;
  slug: string;
};

export type EventType = {
  name: string;
  slug: string;
};

type ImageType = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

export type GigType = {
  artists: ArtistType[];
  title: string;
  slug: string;
  concertImage: ImageType;
  concertDate: string;
  venue: VenueType;
  event: EventType | null;
};
