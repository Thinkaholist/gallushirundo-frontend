import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Seo from '../components/Seo';
import { QUERIES } from '../constants';

const EventRow = styled.article`
  border-top: 1px solid hsl(var(--color-red));
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;

  &:last-of-type {
    border-bottom: 1px solid hsl(var(--color-red));
  }

  h3 {
    font-family: var(--font-family);
    font-weight: 700;
  }

  @media ${QUERIES.mobileAndDown} {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 1rem;
    grid-template-areas:
      'title title'
      'cover location'
      'cover button';
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

  @media ${QUERIES.mobileAndDown} {
    grid-area: cover;

    img {
      border-radius: 10px;
    }
  }
`;

const TitleWrapper = styled.div`
  width: 450px;

  @media ${QUERIES.mobileAndDown} {
    width: revert;
    grid-area: title;
    h3 {
      font-size: ${24 / 16}rem;
    }
  }
`;

const Title = styled.h3``;

const Date = styled.p``;

const LocationWrapper = styled.div`
  width: 300px;

  @media ${QUERIES.mobileAndDown} {
    width: revert;
    grid-area: location;
  }
`;

const EventInfoButton = styled.a`
  border: none;
  padding: 10px 20px;
  border-radius: 36px;
  background-color: hsl(var(--color-red));
  color: var(--color-white);
  cursor: pointer;
  font-size: 15px;
  justify-self: flex-end;
  transition: background-color 0.2s;

  svg {
    display: block;
  }
`;

const DesktopEventInfoButton = styled(EventInfoButton)`
  display: flex;
  gap: 8px;
  align-items: center;

  &:hover {
    background-color: var(--color-red-hover);
    text-decoration: none;
  }

  @media ${QUERIES.mobileAndDown} {
    display: none;
  }
`;

const MobileEventInfoButton = styled(EventInfoButton)`
  display: none;

  @media ${QUERIES.mobileAndDown} {
    display: block;
    grid-area: button;
    justify-self: start;
    padding: 8px 14px;
  }
`;

const PastEventsWrapper = styled.div`
  margin: 3rem 0;
  padding: 1rem;
  display: grid;
  place-content: center;

  a {
    display: block;
    background-color: hsl(var(--color-red));
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
  background-color: var(--color-background);
  margin: 1rem auto 2rem;
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  position: sticky;
  top: ${76 / 16}rem;

  .selected {
    background-color: hsl(var(--color-red));
    color: var(--color-white);
  }

  @media ${QUERIES.mobileAndDown} {
    position: revert;
  }
`;

const FilterButton = styled.button`
  font-size: 1rem;
  border: 1px solid hsl(var(--color-red));
  background-color: var(--color-white);
  color: hsl(var(--color-red));
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
        {events.length < 1 && <h1>No upcoming events was found.</h1>}
        {filteredEvents.length > 0 &&
          filteredEvents.map((event) => (
            <EventRow key={event._id}>
              <ImageWrapper>
                <Img {...event.cover.image} alt={event.title} />
              </ImageWrapper>
              <TitleWrapper>
                <Date>{event.date}</Date>
                <Title>{event.title}</Title>
              </TitleWrapper>
              <LocationWrapper>
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
              </LocationWrapper>
              <DesktopEventInfoButton
                href={event.eventInfo}
                target='_blank'
                rel='noopener noreferrer'
              >
                {data.sanityEventsPage.eventInfo}
                <FaExternalLinkAlt size={12} />
              </DesktopEventInfoButton>
              <MobileEventInfoButton
                href={event.eventInfo}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaExternalLinkAlt size={14} />
              </MobileEventInfoButton>
            </EventRow>
          ))}
        <PastEventsWrapper>
          <Link to='/past-events'>{data.sanityEventsPage.pastEvents}</Link>
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
    sanityEventsPage(_id: { eq: "eventsPage" }) {
      pastEvents
      eventInfo
    }
  }
`;
