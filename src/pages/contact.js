import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import Img from "gatsby-plugin-sanity-image";
import { ContainerStyles } from "../styles/ContainerStyles";
import Seo from "../components/Seo";
import { Pulse } from "react-swift-reveal";
import { QUERIES } from "../constants";
import ButtonLinkWithIcon from "../components/ButtonLinkWithIcon";
// import { HiOutlineMail } from 'react-icons/hi';
import { BiMailSend } from "react-icons/bi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Flower2 from "../images/virag_patternhez-02.svg";
import Flower3 from "../images/virag_patternhez-03.svg";
import Flower4 from "../images/virag_patternhez-04.svg";
import Flower5 from "../images/virag_patternhez-05.svg";
import Flower6 from "../images/virag_patternhez-06.svg";
import { windblow, rotate, bimbam } from "../styles/animations";

const GridWrapper = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr)); */
  grid-template-areas:
    "title photo"
    "text photo"
    "references references"
    "flowers flowers"
    "cta cta";
  gap: 1.5rem;
  grid-template-columns: 5fr 4fr;

  @media ${QUERIES.tabletAndDown} {
    grid-template-columns: 5fr 4fr;
    grid-template-areas:
      "title title"
      "text photo"
      "references references"
      "flowers flowers"
      "cta cta";
  }

  @media ${QUERIES.mobileAndDown} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "photo"
      "text"
      "references"
      "flowers"
      "cta";
  }
`;

const Title = styled.h1`
  grid-area: title;
  font-size: ${30 / 16}rem;
  text-transform: uppercase;
  font-weight: 700;

  @media ${QUERIES.mobileAndDown} {
    font-size: ${24 / 16}rem;
    text-transform: revert;
  }
`;

const Image = styled(Img)`
  width: 100%;
  aspect-ratio: 6/7;
  object-fit: cover;
  border-radius: 28px;
  grid-area: photo;

  @media ${QUERIES.mobileAndDown} {
    aspect-ratio: 5/4;
  }
`;

const TextWrapper = styled.div`
  grid-area: text;

  p:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const ReferencesWrapper = styled.div`
  grid-area: references;
  margin: 2rem 0;

  @media ${QUERIES.mobileAndDown} {
    margin: 1rem 0;
  }
`;

const ReferencesHeadline = styled.h2`
  font-size: ${24 / 16}rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  span {
    border-bottom: 2px solid;
  }

  @media ${QUERIES.mobileAndDown} {
    text-align: revert;
    font-size: ${20 / 16}rem;
  } ;
`;

const ReferenceList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  li:not(:last-of-type)::after {
    color: hsl(var(--color-red));
    font-family: "Font Awesome 5 Free";
    content: "\f274";
    margin-left: 1rem;
  }

  @media ${QUERIES.mobileAndDown} {
    flex-direction: column;
    font-size: ${18 / 16}rem;
    gap: 0.5rem;

    li:not(:last-of-type)::after {
      content: "";
    }

    li::before {
      content: "\f274";
      color: hsl(var(--color-red));
      font-family: "Font Awesome 5 Free";
      margin-right: 0.5rem;
    }
  } ;
`;

const FlowersContainer = styled.div`
  grid-area: flowers;
  display: flex;
  justify-content: space-evenly;

  img {
    width: 80px;

    &:nth-of-type(even) {
      width: 50px;
    }
  }

  @media ${QUERIES.mobileAndDown} {
    img {
      width: 50px;

      &:nth-of-type(even) {
        width: 20px;
      }
    }
  }
`;

const CtaWrapper = styled.div`
  grid-area: cta;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CtaText = styled.h2`
  font-size: ${28 / 16}rem;
  font-weight: 700;
  margin-bottom: 2rem;

  @media ${QUERIES.mobileAndDown} {
    font-size: ${24 / 16}rem;
  }
`;

const CtaButton = styled(ButtonLinkWithIcon)`
  width: 340px;
  font-size: 22px;

  @media ${QUERIES.mobileAndDown} {
    width: 280px;
    font-size: 18px;
  }
`;

const CopyButton = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
`;

const FlowerTwo = styled.img`
  animation: ${bimbam} 2500ms infinite alternate linear;
`;

const FlowerFour = styled.img`
  animation: ${rotate} 10s infinite linear;
`;

const FlowerThree = styled.img`
  animation: ${windblow} 3s infinite alternate;
  transform-origin: 50% 100%;
`;

const FlowerSix = styled.img`
  animation: ${windblow} 2s infinite alternate;
  transform-origin: 50% 100%;
  animation-delay: 350ms;
`;

const FlowerFive = styled.img`
  animation: ${bimbam} 2500ms infinite alternate linear;
  animation-delay: 1000ms;
`;

export default function ContactPage({ data }) {
  const { pageDetails } = data;

  const text = pageDetails.contactText?.split("\n").map((p, i) => {
    if (p === "") {
      return <br key={i} />;
    }
    return <p key={i}>{p}</p>;
  });

  function copyEmailToClipboard() {
    navigator.clipboard
      .writeText(pageDetails.contactEmail)
      .then(() => console.log(`copied: ${pageDetails.contactEmail}!`))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Seo title={"Contact"} />
      <ContainerStyles>
        <GridWrapper>
          <Title>{pageDetails.title}</Title>
          <Image
            {...pageDetails.contactImage.image}
            alt={pageDetails.contactImage.altText}
          />
          <TextWrapper>{text}</TextWrapper>
          <ReferencesWrapper>
            <ReferencesHeadline>
              <span>{pageDetails.referencesHeadline}</span>
            </ReferencesHeadline>
            <ReferenceList>
              {pageDetails.references.map((reference) => (
                <li key={reference}>{reference}</li>
              ))}
            </ReferenceList>
          </ReferencesWrapper>
          <FlowersContainer>
            <FlowerTwo src={Flower2} alt="colorful flower drawing" />
            <FlowerFour src={Flower4} alt="colorful flower drawing" />
            <FlowerThree src={Flower3} alt="colorful flower drawing" />
            <FlowerSix src={Flower6} alt="colorful flower drawing" />
            <FlowerFive src={Flower5} alt="colorful flower drawing" />
          </FlowersContainer>
          <CtaWrapper id="contact-cta">
            <CtaText>{pageDetails.ctaText}</CtaText>
            <Pulse delay={500}>
              <CtaButton
                href={`mailto:${pageDetails.contactEmail}`}
                target="_blank"
                rel="noopener noreferrer"
                text={pageDetails.contactEmail}
                icon={BiMailSend}
              />
            </Pulse>
            <Tippy
              content={`Copied: ${pageDetails.contactEmail}`}
              placement="bottom"
              trigger="click"
            >
              <CopyButton onClick={copyEmailToClipboard}>
                Copy to clipboard
              </CopyButton>
            </Tippy>
          </CtaWrapper>
        </GridWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query {
    pageDetails: sanityContactPage(_id: { eq: "contactPage" }) {
      title
      contactImage {
        altText

        image {
          ...ImageWithPreview
        }
      }
      contactText
      referencesHeadline
      references
      ctaText
      contactEmail
    }
  }
`;
