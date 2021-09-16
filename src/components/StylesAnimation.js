import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import {
  HiOutlineArrowNarrowLeft as LeftIcon,
  HiOutlineArrowNarrowRight as RightIcon,
} from 'react-icons/hi';
import Img from 'gatsby-plugin-image';
import { ContainerStyles } from '../styles/ContainerStyles';
import { QUERIES } from '../constants';
import Pulse from 'react-reveal/Pulse';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

const arrowBounceLeft = keyframes`
	from {
		transform: translateX(0);
	}

	50% {
		transform: translateX(-30%);

	}

	to {
		transform: translateX(0);
	}
`;

const arrowBounceRight = keyframes`
	from {
		transform: translateX(0);
	}

	50% {
		transform: translateX(30%);

	}

	to {
		transform: translateX(0);
	}
`;

const InnerContainer = styled(ContainerStyles)`
  /* border: 2px solid rebeccapurple; */
  --color-folk: #cf180b;
  --color-rock: #7eaac2;
  --color-punk: #f1a8dd;
  --color-roots: #54cc92;
  --color-gipsy: #d098fd;
  --color-blues: #6698fa;
  --color-pop: #f4df89;
  --color-disco: #ff6634;
  --transition: all 0.5s cubic-bezier(0.31, -0.105, 0.43, 1.4);
  margin-top: -3rem;
`;

const SetsWrapper = styled.div`
  /* border: 2px solid rebeccapurple; */
  display: grid;
  grid-template-columns: 150px auto 150px;
  /* if style circle is too big just don't show the whole thing */
  overflow: hidden;

  @media ${QUERIES.mobileAndDown} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ArrowWrapper = styled.button`
  border: none;
  background-color: transparent;
  display: grid;
  place-content: center;
  cursor: pointer;

  &:active {
    background-color: transparent;
  }

  svg {
    color: var(--color-white);
    width: 70px;
    height: 70px;
  }

  @media ${QUERIES.mobileAndDown} {
    svg {
      width: 50px;
      height: 50px;
    }
  }
`;

const LeftArrowWrapper = styled(ArrowWrapper)`
  @media (hover: hover) and (pointer: fine) {
    &:hover svg {
      animation: ${arrowBounceLeft} 0.35s;
    }
  }

  @media ${QUERIES.mobileAndDown} {
    grid-row-start: 2;
  }
`;

const RightArrowWrapper = styled(ArrowWrapper)`
  @media (hover: hover) and (pointer: fine) {
    &:hover svg {
      animation: ${arrowBounceRight} 0.35s;
    }
  }

  @media ${QUERIES.mobileAndDown} {
    grid-row-start: 2;
  }
`;

const CenterBox = styled.div`
  /* border: 2px solid blue; */
  padding: 2rem 0;

  @media ${QUERIES.mobileAndDown} {
    grid-row-start: 1;
    grid-column-start: span 2;
  }
`;

const ArtistImageWrapper = styled.div`
  /* border: 2px solid green; */
  position: relative;
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
  width: min(400px, 100%);
`;

const ArtistImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;

  @supports not (aspect-ratio: 1 / 1) {
    height: 400px;

    @media ${QUERIES.mobileAndDown} {
      width: 288px
      height: 288px;
    }
  }
`;

const StyleCircle = styled.div`
  border-radius: 50%;
  color: #fff;
  width: 70px;
  height: 70px;
  position: absolute;
  display: grid;
  place-content: center;
  font-weight: 500;
  will-change: transform;
  transition: var(--transition);
  transform: ${(p) =>
    p.scale === 0 ? 'scale(0)' : `scale(${p.scale / 100 + 0.9})`};

  @media ${QUERIES.mobileAndDown} {
    transform: ${(p) =>
      p.scale === 0 ? 'scale(0)' : `scale(${p.scale / 100 + 0.6})`};
  }
`;

const FolkCircle = styled(StyleCircle)`
  background-color: var(--color-folk);
  top: 0;
  left: 20%;
`;
const RockCircle = styled(StyleCircle)`
  background-color: var(--color-rock);
  top: 20%;
  right: 6%;
`;
const PunkCircle = styled(StyleCircle)`
  background-color: var(--color-punk);
  color: #2e2e2e;
  bottom: 5%;
  right: 5%;
`;
const RootsCircle = styled(StyleCircle)`
  background-color: var(--color-roots);
  top: 40%;
  left: 6%;
`;
const GipsyCircle = styled(StyleCircle)`
  background-color: var(--color-gipsy);
  top: 0;
  right: 20%;
`;
const BluesCircle = styled(StyleCircle)`
  background-color: var(--color-blues);
  bottom: 10%;
  left: 0%;
`;
const PopCircle = styled(StyleCircle)`
  background-color: var(--color-pop);
  color: #2e2e2e;
  bottom: 0;
  left: 50%;
`;
const DiscoCircle = styled(StyleCircle)`
  background-color: var(--color-disco);
  bottom: 35%;
  right: -2%;
`;

const InfoBox = styled.div`
  text-align: center;
`;

const Tagline = styled.h2`
  font-size: ${24 / 16}rem;
  max-width: 600px;
  min-height: 100px;
  margin: 1rem auto;

  @media ${QUERIES.mobileAndDown} {
    font-size: ${20 / 16}rem;
  }
`;

const CtaButton = styled(Link)`
  color: inherit;
  display: inline-block;
  border: 1px solid;
  border-radius: 28px;
  padding: 6px 18px;
  letter-spacing: 1px;
  background-color: var(--color-white);
  color: hsl(var(--color-red));
  transition: background-color 0.2s linear, color 0.2s linear;
  min-width: min(100%, 450px);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: hsl(var(--color-red));
      color: var(--color-white);
    }
  }

  @media ${QUERIES.mobileAndDown} {
    font-size: ${16 / 16}rem;
  }
`;

export default function StylesAnimation({ artists }) {
  const [selectedArtist, setSelectedArtist] = useState(artists[0]);
  const indexOfSelected = artists.indexOf(selectedArtist);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowRight') {
        goRight();
      }
      if (e.key === 'ArrowLeft') {
        goLeft();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goLeft, goRight]);

  function goRight() {
    if (indexOfSelected === artists.length - 1) {
      setSelectedArtist(artists[0]);
    } else {
      setSelectedArtist(artists[indexOfSelected + 1]);
    }
  }

  function goLeft() {
    if (indexOfSelected === 0) {
      setSelectedArtist(artists[artists.length - 1]);
    } else {
      setSelectedArtist(artists[indexOfSelected - 1]);
    }
  }

  console.log(selectedArtist);

  return (
    <>
      <InnerContainer>
        <SetsWrapper>
          <LeftArrowWrapper onClick={goLeft}>
            <LeftIcon />
          </LeftArrowWrapper>
          <CenterBox>
            <Zoom delay={350}>
              <ArtistImageWrapper>
                <ArtistImage
                  src={selectedArtist.featuredImage.image.asset.url}
                  alt={selectedArtist.featuredImage.altText}
                />
                <FolkCircle scale={selectedArtist.styles.folk}>Folk</FolkCircle>
                <RockCircle scale={selectedArtist.styles.rock}>Rock</RockCircle>
                <PunkCircle scale={selectedArtist.styles.punk}>Punk</PunkCircle>
                <RootsCircle scale={selectedArtist.styles.roots}>
                  Roots
                </RootsCircle>
                <GipsyCircle scale={selectedArtist.styles.gipsy}>
                  Gipsy
                </GipsyCircle>
                <BluesCircle scale={selectedArtist.styles.blues}>
                  Blues
                </BluesCircle>
                <PopCircle scale={selectedArtist.styles.pop}>Pop</PopCircle>
                <DiscoCircle scale={selectedArtist.styles.disco}>
                  Disco
                </DiscoCircle>
              </ArtistImageWrapper>
            </Zoom>
          </CenterBox>
          <RightArrowWrapper onClick={goRight}>
            <RightIcon />
          </RightArrowWrapper>
        </SetsWrapper>
        <InfoBox>
          <Fade bottom distance='40px' delay={250}>
            <Tagline>{selectedArtist.tagline}</Tagline>
          </Fade>
          <Pulse delay={350}>
            <CtaButton to={`/artist/${selectedArtist.slug.current}`}>
              Listen{' '}
              <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>
                {selectedArtist.name}
              </span>
            </CtaButton>
          </Pulse>
        </InfoBox>
      </InnerContainer>
    </>
  );
}
