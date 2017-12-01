import { css } from 'styled-components'

const sizes = {
  phoneExtraLarge: 802,
  phoneLarge: 519,
  phoneMedium: 399,
  phoneSmall: 367,
  phoneExtraSmall: 343,
}

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `
  return acc
}, {})

export default media
