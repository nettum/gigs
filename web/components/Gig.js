import { useState, useEffect } from 'react';
import styled from 'styled-components';
import imageUrlBuilder from '@sanity/image-url'

import client from '../client';
const builder = imageUrlBuilder(client);

const GigWrapper = styled.div`
  padding: 1rem 0;
  text-align: center;
  transition: .2s;
  &:hover {
    background-color: #202020;
  }
`;

const ContentWrapper = styled.div`
  display: inline-block;
  &:hover {
    color: red;
    cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🤘</text></svg>") 16 0,auto;
  }
`;

const H1 = styled.h1`
  position: relative;
  font-family: 'Anton', sans-serif;
  font-size: 6em;
  line-height: 1.1em;
  font-weight: 400;
  border-top: 1px solid;
  border-bottom: 1px solid;
  display: inline-block;
  z-index: 1;
`;

const SubHeading = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;

const Small = styled.small`
  font-size: 0.8em;
  z-index: 1;
`;

const BackgroundImage = styled.div`
  pointer-events: none;
  display: none;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${ContentWrapper}:hover & {
    display: block;
  }
`;

export default function Gig(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { gig } = props;

  const imageSource = builder.image(gig.concertImage).width(1200);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      console.log('lol');
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <BackgroundImage style={{ background: `url("${imageSource}") no-repeat center center fixed`, backgroundSize: 'cover', top: `${scrollPosition}px` }}/>
      </ContentWrapper>
    </GigWrapper>
  );
};
