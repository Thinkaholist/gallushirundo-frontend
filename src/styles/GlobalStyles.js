import { createGlobalStyle } from 'styled-components';
import formaDJRTextRegular from '../assets/fonts/FormaDJRText-Regular.otf';
import formaDJRTextBold from '../assets/fonts/FormaDJRText-Bold.otf';

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

  @font-face {
    font-family: FormaDJRTextRegular;
    src: url(${formaDJRTextRegular});
  }

  @font-face {
    font-family: FormaDJRTextBold;
    src: url(${formaDJRTextBold});
  }
  
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  html {
    overflow-y: scroll;
  }

  body {
    font-family: 'FormaDJRTextRegular','IBM Plex Sans',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    color: #2E2E2E;
    line-height: 1.625;
    font-size: ${20 / 16}rem;
  }

  button, input {
    font-family: 'FormaDJRTextRegular','IBM Plex Sans',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;;
  }
  h1 {
    font-size: ${40 / 16}rem;
    font-weight: 400;
  }
  
  h2 {
    font-size: ${30 / 16}rem;
    font-weight: 400;

  }
`;

export default GlobalStyles;
