import React from 'react';
import { graphql, Link } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';

const EventRow = styled.article`
  border-top: 1px solid var(--color-red);
  /* padding: 0.5rem 0%; */
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #666;

  h3 {
    font-family: var(--font-family);
    font-weight: 700;
  }
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border: 5px rebeccapurple;
  background-color: rebeccapurple;
  background: ${(p) => `url(${p.bg})`};
  background-position: center;
  background-size: cover;
  border-radius: 50%;

  img {
    width: 100%;
  }
`;

const MoreInfoButton = styled(Link)`
  border: none;
  padding: 10px 20px;
  border-radius: 36px;
  background-color: var(--color-red);
  color: var(--color-white);
  cursor: pointer;
  font-size: 15px;
  justify-self: flex-end;
`;

export default function EventsPage({ data }) {
  const events = data.events.nodes;

  return (
    <>
      <ContainerStyles>
        <h1>Past Events</h1>
        {events.map((event) => (
          <EventRow>
            <ImageWrapper bg={`${event.cover.image.asset.url}?sat=-100`}>
              {/* <img src={event.cover.image.asset.url} /> */}
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
            <MoreInfoButton to={`/event/${event.slug.current}`}>
              More info
            </MoreInfoButton>
          </EventRow>
        ))}
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
            asset {
              url
            }
          }
        }
      }
    }
  }
`;
