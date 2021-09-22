import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FaFacebookF,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaGlobe,
} from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { QUERIES } from '../constants';

const SocialBoxWrapper = styled.div`
  border-top: 4px solid hsl(var(--color-red));
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: linear-gradient(to bottom, #fff, var(--color-background) 99%);

  @media ${QUERIES.mobileAndDown} {
    background: revert;
    gap: 3rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  svg {
    color: hsl(var(--color-red));
    width: 30px;
    height: 30px;
  }

  @media ${QUERIES.mobileAndDown} {
    align-self: center;
  }
`;

const bounceDown = keyframes`
	from {
		transform: translateY(0);
	}

	50% {
		transform: translateY(30%);

	}

	to {
		transform: translateY(0);
	}
`;

const PressKitWrapper = styled.a`
  /* border: 1px solid rebeccapurple; */
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: inherit;

  @media (hover: hover) and (pointer: fine) {
    &:hover svg {
      animation: ${bounceDown} 0.35s;
    }
  }

  @media ${QUERIES.mobileAndDown} {
    align-self: center;
  } ;
`;

const PressKitText = styled.p`
  text-transform: uppercase;
  font-weight: 700;
`;

const DownloadIcon = styled(FiDownload)`
  display: block;
  color: hsl(var(--color-red));
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AgenciesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AgenciesText = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  span {
    border-bottom: 2px solid;
  }
`;

const AgenciesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Agency = styled.li`
  text-transform: uppercase;
  font-weight: 500;

  a {
    color: inherit;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover a {
      color: hsl(var(--color-red));
      transition: all 0.2s linear;
    }

    &:hover a::after {
      color: hsl(var(--color-red));
      font-family: 'Font Awesome 5 Free';
      content: '\f14d';
      margin-left: 0.5rem;
      animation: ${fadeIn} 0.3s linear;
    }
  }

  @media ${QUERIES.mobileAndDown} {
    color: hsl(var(--color-red));

    & > a::after {
      color: hsl(var(--color-red));
      font-family: 'Font Awesome 5 Free';
      content: '\f14d';
      margin-left: 0.5rem;
    }
  }
`;

export default function SocialBox({ singleArtist, pressKitText }) {
  const { socialLinks } = singleArtist;
  const pressKitUrl = singleArtist?.pressKit?.asset?.url;
  const artistSlug = singleArtist.slug.current;

  return (
    <>
      <SocialBoxWrapper>
        <SocialIcons>
          {socialLinks?.spotify && (
            <SocialIconLink href={socialLinks.spotify} Icon={FaSpotify} />
          )}
          {socialLinks?.facebook && (
            <SocialIconLink href={socialLinks.facebook} Icon={FaFacebookF} />
          )}
          {socialLinks?.youtube && (
            <SocialIconLink href={socialLinks.youtube} Icon={FaYoutube} />
          )}
          {socialLinks?.instagram && (
            <SocialIconLink href={socialLinks.instagram} Icon={FaInstagram} />
          )}
          {socialLinks?.website && (
            <SocialIconLink href={socialLinks.website} Icon={FaGlobe} />
          )}
        </SocialIcons>
        {singleArtist?.pressKit && (
          <PressKitWrapper
            href={`${pressKitUrl}?dl=${artistSlug}-pressKit.zip`}
          >
            <PressKitText>{pressKitText}</PressKitText>
            <DownloadIcon />
          </PressKitWrapper>
        )}
        {singleArtist?.agencies.length > 0 && (
          <AgenciesWrapper>
            <AgenciesText>
              <span>Agencies:</span>
            </AgenciesText>
            <AgenciesList>
              {singleArtist.agencies.map((agency) => (
                <Agency key={agency._id}>
                  <a
                    href={agency.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {agency.name}
                  </a>
                </Agency>
              ))}
            </AgenciesList>
          </AgenciesWrapper>
        )}
      </SocialBoxWrapper>
    </>
  );
}

function SocialIconLink({ href, Icon }) {
  const LinkStyles = styled.a`
    svg {
      transition: transform 0.35s ease-in-out;
    }

    @media (hover: hover) and (pointer: fine) {
      &:nth-of-type(odd):hover svg {
        transform: scale(1.2) rotate(10deg);
      }

      &:nth-of-type(even):hover svg {
        transform: scale(1.2) rotate(-10deg);
      }
    }
  `;

  return (
    <>
      <LinkStyles
        href={href}
        title={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Icon />
      </LinkStyles>
    </>
  );
}
