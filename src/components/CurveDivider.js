import React from 'react';
import styled from 'styled-components';
import { QUERIES } from '../constants';

const CurveDividerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 25px;
    transform: rotateY(180deg);
  }

  path {
    fill: var(--color-white);
  }

  @media ${QUERIES.mobileAndDown} {
    svg {
      width: calc(100% + 1.3px);
      height: 30px;
    }
  }
`;

export default function CurveDivider() {
  return (
    <>
      <CurveDividerWrapper>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path d='M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z'></path>
        </svg>
      </CurveDividerWrapper>
    </>
  );
}
