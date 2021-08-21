import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import { FaExternalLinkAlt } from 'react-icons/fa';

const EventRow = styled.article`
  border-top: 1px solid var(--color-red);
  /* padding: 0.5rem 0%; */
  display: flex;
  gap: 1rem;
  align-items: center;

  // TODO: Miért nem működik ez?
  &:last-child {
    border-bottom: 2px solid var(--color-red);
  }

  h3 {
    font-family: var(--font-family);
    font-weight: 700;
  }
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;

    @supports not (aspect-ratio: 1 / 1) {
      height: 100px;
    }
  }
`;

const MoreInfoButton = styled.a`
  border: none;
  padding: 10px 20px;
  border-radius: 36px;
  background-color: var(--color-red);
  color: var(--color-white);
  cursor: pointer;
  font-size: 15px;
  justify-self: flex-end;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-red-hover);
    text-decoration: none;
  }
`;

const PastEventsWrapper = styled.div`
  margin: 3rem 0;
  padding: 1rem;
  display: grid;
  place-content: center;

  a {
    display: block;
    background-color: var(--color-red);
    color: var(--color-white);
    padding: 8px 16px;
    border-radius: 36px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-red-hover);
      text-decoration: none;
    }
  }
`;

export default function EventsPage({ data }) {
  const events = data.events.nodes;
  const artists = data.artists.nodes;
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedArtist, setSelectedArtist] = useState('');

  function filterEvents(artistId) {
    const updatedEvents = events.filter((event) => {
      const artistsIds = event.artists.map((artist) => artist._id);
      return artistsIds.includes(artistId);
    });
    setFilteredEvents(updatedEvents);
  }

  function filterEventsSelect(e) {
    const artistId = e.target.value;

    if (artistId === 'ALL') {
      setFilteredEvents(events);
      setSelectedArtist('');
    }

    const updatedEvents = events.filter((event) => {
      const artistsIds = event.artists.map((artist) => artist._id);
      return artistsIds.includes(artistId);
    });
    setFilteredEvents(updatedEvents);
  }

  return (
    <>
      <ContainerStyles>
        <nav>
          <button
            onClick={() => {
              setFilteredEvents(events);
              setSelectedArtist('');
            }}
          >
            ALL
          </button>
          {artists.map((artist) => (
            <button key={artist._id} onClick={() => filterEvents(artist._id)}>
              {artist.name}
            </button>
          ))}
        </nav>
        <select onChange={filterEventsSelect}>
          <option value='ALL'>ALL</option>
          {artists.map((artist) => (
            <option value={artist._id}>{artist.name}</option>
          ))}
        </select>
        {!filterEvents.length ||
          (filterEvents.length === 0 && <p>No events</p>)}
        {filteredEvents.length > 0 &&
          filteredEvents.map((event) => (
            <EventRow key={event._id}>
              <ImageWrapper>
                <Img {...event.cover.image} alt={event.title} />
              </ImageWrapper>
              <div style={{ width: 450 }}>
                <p>{event.date}</p>
                <h3>{event.title}</h3>
              </div>
              <div style={{ width: 300 }}>
                <p>{event.location}</p>
                <p>
                  <a
                    href={event.mainEvent.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {event.mainEvent.name}
                  </a>
                </p>
              </div>
              <MoreInfoButton
                href={event.eventInfo}
                target='_blank'
                rel='noopener noreferrer'
              >
                Event
                <FaExternalLinkAlt size={12} />
              </MoreInfoButton>
            </EventRow>
          ))}
        <PastEventsWrapper>
          <Link to='/past-events'>Past Events</Link>
        </PastEventsWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query ($rightNow: Date!) {
    events: allSanityEvent(
      sort: { fields: date, order: ASC }
      filter: { date: { gte: $rightNow } }
    ) {
      nodes {
        _id
        title
        date
        eventInfo
        slug {
          current
        }
        location
        mainEvent {
          name
          website
        }
        cover {
          altText
          image {
            ...ImageWithPreview
          }
        }
        artists {
          _id
          name
          slug {
            current
          }
        }
      }
    }
    artists: allSanityArtist {
      nodes {
        _id
        name
        slug {
          current
        }
      }
    }
  }
`;
