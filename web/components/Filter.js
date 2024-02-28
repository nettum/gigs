import { useState } from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  position: absolute;
  height: 100%;
  overflow: auto;
  right: 0;
  background-color: #fff;
  color: #202124;
  z-index: 2;
  padding: 4rem 2rem;
  font-size: 1.8em;
  & .filter-wrapper-item {
    margin: 1rem 0;
  }
  & .list {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.5em;
  }
  & .heading {
    font-size: 0.6em;
    margin-bottom: 0.5rem;
  }
  @media (min-width: 900px) {
    padding: 4rem 10rem;
  }
`;

const Button = styled.button`
  font: inherit;
  color: inherit;
  outline: inherit;
  border: none;
  background: none;
  padding: 0.8rem;
  margin: 0 1rem 1rem 0;
  cursor: pointer;
  &.main-btn {
    position: absolute;
    padding: 1rem;
    right: 0;
    top: 0;
    z-index: 3;
    font-size: 1.25em;
    &.open {
      color: #202124;
    }
  }
  &.filter-btn {
    padding: 0.4rem;
    background-color: #ffc40c;
    border: 1px solid #202124;
    border-radius: 5px;
    &:hover {
      background-color: #202124;
      color: #fdfd96;
    }
  }
`;

export default function Filter(props) {
  const {
    artists,
    venues,
    events,
    onSetFilter,
    years
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSetFilter = (type, value) => {
    onSetFilter(type, value);
    setIsOpen(false);
  };


  return (
    <>
      <Button className={`main-btn ${isOpen ? 'open' : ''}`} onClick={handleClick}>{isOpen ? '-' : '+'} filter</Button>
      {isOpen && (
        <FilterWrapper>
          <div className="list">
            <Button className="filter-btn delete" onClick={() => handleSetFilter(null)}>Remove filter</Button>
          </div>
          <div className="filter-wrapper-item">
            <div className="heading">Year:</div>
            <div className="list">
              {years.map(year => <Button key={`year-${year}`} className="filter-btn" onClick={() => handleSetFilter('year', year)}>{year}</Button>)}
            </div>
          </div>
          <div className="filter-wrapper-item">
            <div className="heading">Event:</div>
            <div className="list">
              {events.map(event => <Button key={`event-${event.slug}`} className="filter-btn" onClick={() => handleSetFilter('event', event.slug)}>{event.name}</Button>)}
            </div>
          </div>
          <div className="filter-wrapper-item">
            <div className="heading">Venue:</div>
            <div className="list">
              {venues.map(venue => <Button key={`venue-${venue.slug}`} className="filter-btn" onClick={() => handleSetFilter('venue', venue.slug)}>{venue.name}</Button>)}
            </div>
          </div>
          <div className="filter-wrapper-item">
            <div className="heading">Artist:</div>
            <div className="list">
              {artists.map(artist => <Button key={`artist-${artist.slug}`} className="filter-btn" onClick={() => handleSetFilter('artist', artist.slug)}>{artist.name}</Button>)}
            </div>
          </div>
        </FilterWrapper>
      )}

    </>
  );
};
