import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Seo from '../components/Seo';
import { QUERIES } from '../constants';

const EventRow = styled.article`
  border-bottom: 1px solid hsl(var(--color-red));
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;

  &:first-of-type {
    border-top: 1px solid hsl(var(--color-red));
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

const MainEventLink = styled.a`
  display: block;
  color: hsl(var(--color-red));
  span {
    border-bottom: 1px solid;
  }

  &:hover span {
    border-bottom: none;
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
    gap: 0.5rem;
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
    cursor: not-allowed;
    background-color: var(--color-white);
  }

  @media ${QUERIES.mobileAndDown} {
    padding: 8px 16px;
  }
`;

const PastEventsText = styled.h2`
  text-align: center;
  margin: 3rem 0 1rem 0;
  font-weight: 700;
  font-size: ${24 / 16}rem;
  text-transform: uppercase;
`;

const NoEventText = styled.h3`
  text-align: center;
  color: darkgray;
`;

export default function EventsPage({ data }) {
  const now = new window.Date();
  const events = data.events.nodes;
  const pastEvents = events.filter(
    (event) => new window.Date(event.date) < now
  );
  const upcomingEvents = events.filter(
    (event) => new window.Date(event.date) >= now
  );
  const artists = data.artists.nodes;
  const [selectedArtist, setSelectedArtist] = useState('');
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] =
    useState(upcomingEvents);
  const [filteredPastEvents, setFilteredPastEvents] = useState(pastEvents);

  let allArtists = [];
  events.forEach((event) => {
    const artists = event.artists;
    allArtists = [...allArtists, ...artists];
  });

  function hasEvents(artistId) {
    return allArtists.map((artist) => artist._id).includes(artistId);
  }

  function filterEvents(artistId) {
    const updatedUpcomingEvents = upcomingEvents.filter((event) => {
      const artistsIds = event.artists.map((artist) => artist._id);
      return artistsIds.includes(artistId);
    });

    const updatedPastEvents = pastEvents.filter((event) => {
      const artistsIds = event.artists.map((artist) => artist._id);
      return artistsIds.includes(artistId);
    });
    setFilteredUpcomingEvents(updatedUpcomingEvents);
    setFilteredPastEvents(updatedPastEvents);
    setSelectedArtist(artistId);
  }

  return (
    <>
      <Seo title={'Events'} />
      <ContainerStyles>
        <EventFilterWrapper>
          <FilterButton
            onClick={() => {
              setFilteredUpcomingEvents(upcomingEvents);
              setFilteredPastEvents(pastEvents);
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
        {filteredUpcomingEvents.length < 1 && (
          <NoEventText>No upcoming events was found.</NoEventText>
        )}
        {filteredUpcomingEvents.length > 0 &&
          filteredUpcomingEvents.map((event) => (
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

                <MainEventLink
                  href={event.mainEvent.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  title={`Go to ${event.mainEvent.name}'s webpage`}
                >
                  <span>{event.mainEvent.name}</span>
                </MainEventLink>
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
        {filteredPastEvents.length > 0 && (
          <PastEventsText>{data.sanityEventsPage.pastEvents}</PastEventsText>
        )}
        {filteredPastEvents.length > 0 &&
          filteredPastEvents.map((event) => (
            <EventRow
              key={event._id}
              style={{ color: 'var(--color-light-black)' }}
            >
              <ImageWrapper>
                <Img
                  {...event.cover.image}
                  alt={event.title}
                  style={{ filter: 'grayscale(100%)' }}
                />
              </ImageWrapper>
              <TitleWrapper>
                <Date>{event.date}</Date>
                <Title>{event.title}</Title>
              </TitleWrapper>
              <LocationWrapper>
                <p>{event.location}</p>

                <MainEventLink
                  href={event.mainEvent.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  title={`Go to ${event.mainEvent.name}'s webpage`}
                  style={{ color: 'var(--color-light-black)' }}
                >
                  <span>{event.mainEvent.name}</span>
                </MainEventLink>
              </LocationWrapper>
              <DesktopEventInfoButton
                href={event.eventInfo}
                target='_blank'
                rel='noopener noreferrer'
                style={{ backgroundColor: 'var(--color-light-black)' }}
              >
                {data.sanityEventsPage.eventInfo}
                <FaExternalLinkAlt size={12} />
              </DesktopEventInfoButton>
              <MobileEventInfoButton
                href={event.eventInfo}
                target='_blank'
                rel='noopener noreferrer'
                style={{ backgroundColor: 'var(--color-light-black)' }}
              >
                <FaExternalLinkAlt size={14} />
              </MobileEventInfoButton>
            </EventRow>
          ))}
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query {
    events: allSanityEvent(sort: { fields: date, order: ASC }) {
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
