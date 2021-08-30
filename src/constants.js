// MOBILE FIRST APPROACH:

// export const BREAKPOINTS = {
//   tabletMin: 550,
//   laptopMin: 1100,
//   desktopMin: 1500,
// };

// export const QUERIES = {
//   tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
//   laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
//   desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
//   tabletOnly: `
//     (min-width: ${BREAKPOINTS.tabletMin / 16}rem) and
//     (max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`,
// };

export const BREAKPOINTS = {
  mobileMax: 550,
  tabletMax: 1100,
};

export const QUERIES = {
  mobileAndDown: `(max-width: ${BREAKPOINTS.mobileMax / 16}rem)`,
  tabletAndDown: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  tabletOnly: `
    (min-width: ${BREAKPOINTS.mobileMax / 16}rem) and
    (max-width: ${(BREAKPOINTS.tabletMax - 1) / 16}rem)`,
};
