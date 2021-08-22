import React from 'react';
import { graphql, Link } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import { FaExternalLinkAlt } from 'react-icons/fa';

const EventRow = styled.article`
  border-top: 1px solid var(--color-red);
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #666;

  h3 {
    font-family: var(--font-family);
    font-weight: 700;
  }

  &:last-of-type {
    border-bottom: 1px solid var(--color-red);
  }
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
    filter: grayscale(100%);

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

const BackToEventsWrapper = styled.div`
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

  return (
    <>
      <ContainerStyles>
        {events.map((event) => (
          <EventRow>
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
        <BackToEventsWrapper>
          <Link to='/events'>Upcoming Events</Link>
        </BackToEventsWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query ($rightNow: Date!) {
    events: allSanityEvent(
      sort: { fields: date, order: DESC }
      filter: { date: { lte: $rightNow } }
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
      }
    }
  }
`;
