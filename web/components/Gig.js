import { useState, useEffect } from 'react';
import styled from 'styled-components';
import imageUrlBuilder from '@sanity/image-url'

import client from '../client';
const builder = imageUrlBuilder(client);

const GigWrapper = styled.div`
  padding: 1rem 0;
  text-align: center;
  transition: .2s;
  user-select: none;
  overflow: hidden;
  &:hover {
    background-color: #202020;
  }
`;

const ContentWrapper = styled.div`
  @media (min-width: 900px) {
    display: inline-block;
  }

  &:hover {
    color: #ffc40c;
    cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🤘</text></svg>") 16 0,auto;
  }
`;

const H1 = styled.h1`
  position: relative;
  font-family: 'Anton', sans-serif;
  font-size: 3em;
  line-height: 1.1em;
  font-weight: 400;
  border-top: 1px solid;
  border-bottom: 1px solid;
  z-index: 1;
  @media (min-width: 900px) {
    font-size: 6em;
  }
`;

const SubHeading = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;

const Small = styled.small`
  font-size: 0.8em;
  z-index: 1;
  &:first-child {
    margin-right: 1rem;
  }
`;

const BackgroundImage = styled.div`
  pointer-events: none;
  display: none;
  opacity: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-position: center center;
  background-size: cover;
  animation: fadeIn .3s ease-in-out;
  ${ContentWrapper}:hover & {
    display: block;
    opacity: 1;
  }
  @keyframes fadeIn {
    0% {
      display: none;
      opacity: 0;
    }
    1% {
      display: block;
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default function Gig(props) {
  const { gig } = props;
  const imageSource = gig.concertImage ? builder.image(gig.concertImage).width(1200) : null;

  return (
    <GigWrapper>
      <ContentWrapper>
        <SubHeading>
          <Small>
            {new Intl.DateTimeFormat('nb-NO', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(gig.concertDate))}
          </Small>
          <Small>
            {gig.event.name ? `${gig.event.name} - ${gig.venue.name}` : gig.venue.name}
          </Small>
        </SubHeading>
        <H1>
          {gig.title}
        </H1>
        {imageSource ? <BackgroundImage style={{ backgroundImage: `url("${imageSource}")` }}/> : null}
      </ContentWrapper>
    </GigWrapper>
  );
};
