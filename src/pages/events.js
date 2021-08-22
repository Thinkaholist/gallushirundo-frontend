import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Seo from '../components/Seo';

const EventRow = styled.article`
  border-top: 1px solid var(--color-red);
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;

  &:last-of-type {
    border-bottom: 1px solid var(--color-red);
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

const EventFilterWrapper = styled.nav`
  background-color: var(--color-white);
  margin: 1rem auto 2rem;
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  position: sticky;
  top: ${85 / 16}rem;

  .selected {
    background-color: var(--color-red);
    color: var(--color-white);
  }
`;

const FilterButton = styled.button`
  font-size: 1rem;
  border: 1px solid var(--color-red);
  background-color: var(--color-white);
  color: var(--color-red);
  border-radius: 12px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    color: #ffcbce;
    border-color: #ffcbce;
    cursor: auto;
    background-color: var(--color-white);
  }
`;

export default function EventsPage({ data }) {
  const events = data.events.nodes;
  const artists = data.artists.nodes;
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedArtist, setSelectedArtist] = useState('');

  let allArtists = [];
  events.forEach((event) => {
    const artists = event.artists;
    allArtists = [...allArtists, ...artists];
  });

  function hasEvents(artistId) {
    return allArtists.map((artist) => artist._id).includes(artistId);
  }

  function filterEvents(artistId) {
    const updatedEvents = events.filter((event) => {
      const artistsIds = event.artists.map((artist) => artist._id);
      return artistsIds.includes(artistId);
    });
    setFilteredEvents(updatedEvents);
    setSelectedArtist(artistId);
  }

  return (
    <>
      <Seo title={'Events'} />
      <ContainerStyles>
        <EventFilterWrapper>
          <FilterButton
            onClick={() => {
              setFilteredEvents(events);
              setSelectedArtist('');
            }}
            className={selectedArtist === '' ? 'selected' : ''}
          >
            All Artists
          </FilterButton>
          {artists.map((artist) => (
            <FilterButton
              key={artist._id}
              onClick={() => filterEvents(artist._id)}
              className={selectedArtist === artist._id ? 'selected' : ''}
              disabled={!hasEvents(artist._id)}
            >
              {artist.name}
            </FilterButton>
          ))}
        </EventFilterWrapper>
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
                {/* <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  {event.artists.map((artist) => (
                    <Link
                      key={artist._id}
                      to={`/artist/${artist.slug.current}`}
                      title={artist.name}
                    >
                      <Img
                        style={{
                          display: 'block',
                          width: 25,
                          height: 25,
                          border: '1px solid lightgray',
                          borderRadius: '50%',
                          aspectRatio: '1/1',
                          objectFit: 'contain',
                        }}
                        alt={artist.name}
                        {...artist.logo}
                      />
                    </Link>
                  ))}
                </div> */}
              </div>
              {/* <div
                style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  width: 100,
                  marginTop: 8,
                }}
              >
                {event.artists.map((artist) => (
                  <Link
                    key={artist._id}
                    to={`/artist/${artist.slug.current}`}
                    title={artist.name}
                  >
                    <Img
                      style={{
                        display: 'block',
                        width: 30,
                        height: 30,
                        padding: 1,
                        border: '1px solid lightgray',
                        borderRadius: '50%',
                        aspectRatio: '1/1',
                        objectFit: 'contain',
                      }}
                      alt={artist.name}
                      {...artist.logo}
                    />
                  </Link>
                ))}
              </div> */}
              <div style={{ width: 300 }}>
                <p>{event.location}</p>
                <p>
                  <a
                    href={event.mainEvent.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    title={`Go to ${event.mainEvent.name}'s webpage`}
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
          logo {
            ...ImageWithPreview
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
