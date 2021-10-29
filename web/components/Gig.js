import styled from 'styled-components';

const GigWrapper = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const H1 = styled.h1`
  font-family: 'Anton', sans-serif;
  font-size: 5em;
`;

export default function Gig(props) {
  const { gig } = props;

  return (
    <GigWrapper>
      <small>
        {new Intl.DateTimeFormat('nb-NO', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(gig.concertDate))}
      </small>
      <H1>{gig.title}</H1>
      <h2>{gig.event.name ? `${gig.event.name}, ${gig.venue.name}` : gig.venue.name}</h2>
    </GigWrapper>
  );
};
