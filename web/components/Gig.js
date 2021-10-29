import styled from 'styled-components';

const GigWrapper = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const H1 = styled.h1`
  font-family: 'Anton', sans-serif;
  font-size: 5em;
`;

const H2 = styled.h2`
  font-size: 1.5em;
`;

const Small = styled.small`
  font-size: 0.8em;
`;

export default function Gig(props) {
  const { gig } = props;

  return (
    <GigWrapper>
      <H1>{gig.title}</H1>
      <H2>{gig.event.name ? `${gig.event.name}, ${gig.venue.name}` : gig.venue.name}</H2>
      <Small>
        {new Intl.DateTimeFormat('nb-NO', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(gig.concertDate))}
      </Small>
    </GigWrapper>
  );
};
