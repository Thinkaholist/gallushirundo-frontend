import { createGlobalStyle } from 'styled-components';
import FormaDJRTextRegular from '../assets/fonts/formadjrtext-regular-webfont.woff2';
import FormaDJRTextRegularItalic from '../assets/fonts/formadjrtext-regularitalic-webfont.woff2';
import FormaDJRTextMedium from '../assets/fonts/formadjrtext-medium-webfont.woff2';
import FormaDJRTextBold from '../assets/fonts/formadjrtext-bold-webfont.woff2';

const Typography = createGlobalStyle`
  @font-face {
    font-family: 'Forma DJR Text';
    src: url(${FormaDJRTextRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
  }
  @font-face {
    font-family: 'Forma DJR Text';
    src: url(${FormaDJRTextRegularItalic}) format('woff2');
    font-weight: 400;
    font-style: italic;
    font-display: fallback;
  }
  @font-face {
    font-family: 'Forma DJR Text';
    src: url(${FormaDJRTextMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
  }
  @font-face {
    font-family: 'Forma DJR Text';
    src: url(${FormaDJRTextBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
  }
`;

export default Typography;
