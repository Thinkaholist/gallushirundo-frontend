import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }


  /* END of CSS reset */
  
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  *,*::before,*::after {
    box-sizing: border-box;
  }

  html {
    overflow-y: scroll;
    --color-red: #ff101e;
    --color-white: #fff;
    --color-black: #2E2E2E;
    --color-light-black: #616161;
    --font-family: 'Forma DJR Text', -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    --breakpoint-tablet: 916px;
    --fixed-header-padding: 7rem;
    /* --fixed-header-padding-mobile: 4rem; */
  }

  body {
    font-family: var(--font-family);
    color: var(--color-black);
    line-height: 1.625;
    font-size: ${20 / 16}rem;
    -webkit-font-smoothing: antialiased;
  }

  button, input {
    font-family: var(--font-family)
  }

  h1 {
    font-size: ${40 / 16}rem;
    font-weight: 400;
  }
  
  h2 {
    font-size: ${30 / 16}rem;
    font-weight: 400;

  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: revert;
    }
    color: #A31C18;
  }

  /* @media(max-width: 756){
    html {
      font-size: 10px;
    }
  } */
`;

export default GlobalStyles;
