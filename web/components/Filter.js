import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font: inherit;
  color: inherit;
  outline: inherit;
  border: none;
  background: none;
  padding: 0;
  curson: pointer;
`;

export default function Filter(props) {
  const { artists, venues, events, onSetFilter } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(o => !o);
  };

  const handleSetFilter = (type, value) => {
    onSetFilter(type, value);
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Button onClick={handleClick}>{isOpen ? '-' : '+'} filter!</Button>
      </div>
      {isOpen && (
        <>
          <div>Artist: {artists.map(artist => <button onClick={() => handleSetFilter('artist', artist.slug)}>{artist.name}</button>)}</div>
          <div>Venue: {venues.map(venue => <button onClick={() => handleSetFilter('venue', venue.slug)}>{venue.name}</button>)}</div>
          <div>Event: {events.map(event => <button onClick={() => handleSetFilter('event', event.slug)}>{event.name}</button>)}</div>
        </>
      )}
    </>
  );
};
