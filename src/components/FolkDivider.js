import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  transform: translateY(calc(-100% + 1.3px));
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  /* border: 2px solid blue; */
  z-index: 1;
`;

const Svg = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
`;

const Path = styled.path``;

export default function FolkDivider() {
  return (
    <>
      <Divider>
        <Svg
          id='Layer_1'
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 707.92 143.21'
        >
          <Path
            fill='hsl(var(--color-red))'
            class='cls-1'
            d='M570.11,2.87a2,2,0,0,1,2.18,1.55,8.61,8.61,0,0,0,2.05,4.07c3.84,4.13,1.69-9.12,9.07-7.94s4.81,8.53-.21,10.3-6.5,4.43-5.61,8.56,6.2-4.43,10.92-1.77,4.13,7.25-1.77,10.12-10,18.57-1.48,24.12c13.12,8.51,26.15-1.46,38.43-9.21,38.8-24.46,84.23,1,84.23,1v99.53H0L0,43.68s37.52-19.32,80.17-7.49c14.82,4.11,22.7,9.18,25.41,2.5a8,8,0,0,1,12.31-3.75c2.71,2.3,5.21-6.23-1.26-6.56s-8.34-5.32-5.83-8.87,8.34,6,11,1.46-3.76-5.63-6.26-13.34,2.71-9,6.67-6.46.94,9.54,4.21,5.52a30.21,30.21,0,0,0,1.84-2.5,1.29,1.29,0,0,1,1.09-.6h0a1.29,1.29,0,0,1,1.1,2c-1.47,2.4-2.41,4.88-1,5.55,2.39,1.13,7.09-6.33,11.07-.76,5.4,7.55-5.15,7.3-7.8,5.79s-7.12,2.94-6.77,7.42,7.93-6,11,1.21-2.41,7.58-5.17,7.06-7.41-1-7.59,3.28,2.76-.86,8.28,2.07,4.41,6.67,3.28,8.37-10-3.11-10.72,2.11,2.68,2.54,8.47,4.52,6.89,4.93,5.41,9-13.29,8.31-2.58,21.61,13.85,1.66,20.13,0,9.23,3.5,12,1.47,3.51-13.29-2.22-16.06-7.2-7.21-7.2-7.21-8,.08-10.16-5.54c-3.16-8.06,2-11.63,2-11.63s-5.91-6.65-.19-13.48,12.19-3,12.19-3,.11-6.85,9.79-6c9.37.82,9.6,7.57,9.6,7.57s8.68,1.11,10.9,7.39a10,10,0,0,1-2.59,10.52s3.32,3.14,0,10.16-11.08,6.46-11.08,6.46-6.09.19-6.09,11.64,4.24,35.09,18.09,29.36-.19-8.34-2-16.8c-1.93-8.87,2.59-12,2.59-12s-3-8.66,2.58-14.22c4.75-4.71,9.24-3.14,9.24-3.14s1.66-4.61,7.94-5.35c5.16-.61,5.33-3.09,3.89-7.44A2.79,2.79,0,0,1,218,41.77h0A2.81,2.81,0,0,1,221.19,44a23.43,23.43,0,0,0,3.11,7.23c7.94,12.55,13.42,10.34,14.1,5.72s2.89-6.46,2.89-6.46-4.43-8.13,0-13.11,10.9-3.88,10.9-3.88,2.89-8.21,12.92-5.69c6,1.5,7.76,8.83,7.76,8.83s9.61-.25,11.46,7.14-4.26,12.43-4.26,12.43,5.64,5.94-1.05,12.27c-5.64,5.34-10.21,1.77-10.21,1.77s-.37,4.06-6.28,5.17-10.16,9.42-7.2,10.16,4.89-6.08,14.4-4.62c5.17.79,12.79,8.28,4.62,13.66-15.48,10.2-16.75,29.52.74,38.59,8.15,4.22,12-8.8,6.33-13.27-7.77-6.09-8.74-11.49-6.15-16.64,4.62-9.15,16.81-5.35,20.87-2.58s-4.23-35.51,22-36,7.95,33.92,12.46,34.72,3.95-8.73,20.8-9.08c12-.25,14.71,9.08,17.36,8s-9-26.77,5-32.6S395.26,72.05,399,84.51s-.8,16.16,4.5,16.69,10.6-6.89,19.35-.26,5.56,19.34,0,27c0,0-6.66,12.16,5.43,8.62s28.32-23.32,19.47-30.4-24.8-11.81-19.78-22.73,16.83,13.87,19.78,11.22S446,79.92,438.27,74.6s-11.51-.29-17.12-6.19-1.77-13.29-1.77-13.29-6.49-6.49-1.77-14.75S430,36.53,430,36.53s-.3-8.68,8-8.77,9.74,5.52,9.74,5.52,8-2.06,11.21,4.43,0,10.33,0,10.33,3.84,1.77,3,9.44-10.63,9.15-10.63,9.15-2.48,7.74,0,11.81c3.73,6.12,21.79,11.92,23.37-18,.18-3.43,1.71-7.15,3.49-10.64a2.2,2.2,0,0,1,2.44-1.16l.35.07a2.27,2.27,0,0,1,1.67,2.66c-.31,1.83,2.65,1.49,7.05,2.88A11.88,11.88,0,0,1,497,60.73s3.25-3.25,8.86,1.48S508.82,74,508.82,74s6.49,3,2.36,12.11c-2.74,6-9.47,5.56-12,5.64a5.87,5.87,0,0,0-4.14,2c-3.17,3.5-5.84,11.46-.42,9.5,7.38-2.65,12.4-.88,14.17,4.14s3.54,10.62,8.85-.59,6.2-15.65,7.68-24.21,2.95-13.28,0-16.23-8.89-.6-13-5.61c-5.68-6.94-.34-13.79-.34-13.79s-5.73-5.91-2-13c3.31-6.25,8.8-6.18,8.8-6.18s-.77-6.61,9.43-7.17c8.35-.47,10.35,5,10.35,5a9.41,9.41,0,0,1,10.92,5.31c3.54,7.38,0,12.1,0,12.1a9.82,9.82,0,0,1,1.57,12.69c-3.66,5.94-9.24,5-9.24,5s-.89,6.49-5.61,8.56-10,18.89-3.84,13.87,14.46-1.47,15.64,4.73,9.15,6.19,14.76-2.07,10.63-18,3.84-20.66-8.9-6.66-5.66-10.79,9.79,3.7,12.15-1.31S559.69,47.33,562.83,41c2.94-6,8.83,4.72,10.61-3.25s-8.84-2.49-11.79-9.95,6.79-8.35,8.86-6.58,2.65-6.49-6.79-5.31S555.56,7.12,561.65,7c3.34-.06,7.78,3.05,6.8-1.75a2,2,0,0,1,1.66-2.39Z'
          />
        </Svg>
      </Divider>
    </>
  );
}
