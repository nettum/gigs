import { useState } from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  color: #202124;
  z-index: 2;
  padding: 4rem 2rem;
  & .list {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.5em;
  }
  & .heading {
    margin-bottom: 0.5rem;
  }
  @media (min-width: 900px) {
    width: 50%;
    padding: 4rem;
  }
`;

const Button = styled.button`
  font: inherit;
  color: inherit;
  outline: inherit;
  border: none;
  background: none;
  padding: 0.8rem;
  background-color: #ffc40c;
  margin: 0 1rem 1rem 0;
  cursor: pointer;
  border-radius: 10px;
  &.main {
    background-color: transparent;
    position: absolute;
    padding: 1rem;
    right: 0;
    top: 0;
    z-index: 3;
    &.open {
      color: #202124;
    }
  }
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
      <Button className={`main ${isOpen ? 'open' : ''}`} onClick={handleClick}>{isOpen ? '-' : '+'} Filter</Button>
      {isOpen && (
        <FilterWrapper>
          <div className="list">
            <Button onClick={() => handleSetFilter(null)}>Remove filter</Button>
          </div>
          <div>
            <div className="heading">Artist:</div>
            <div className="list">
              {artists.map(artist => <Button onClick={() => handleSetFilter('artist', artist.slug)}>{artist.name}</Button>)}
            </div>
          </div>
          <div>
            <div className="heading">Venue:</div>
            <div className="list">
              {venues.map(venue => <Button onClick={() => handleSetFilter('venue', venue.slug)}>{venue.name}</Button>)}
            </div>
          </div>
          <div>
            <div className="heading">Event:</div>
            <div className="list">
              {events.map(event => <Button onClick={() => handleSetFilter('event', event.slug)}>{event.name}</Button>)}
            </div>
          </div>
        </FilterWrapper>
      )}

    </>
  );
};
