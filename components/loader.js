import styled, { keyframes } from 'styled-components'
import media from '../layouts/media'
import darkTheme from '../themes/dark-theme'

const loadingAnimation = keyframes`
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${darkTheme.color.background};
`

const Spinner = styled.div`
  color: ${darkTheme.color.primary};
`

const SpinnerChild3 = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${darkTheme.color.primary};
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: ${loadingAnimation} 1.4s ease-in-out 0s infinite both;
  animation: ${loadingAnimation} 1.4s ease-in-out 0s infinite both;

  ${media.phoneLarge`
    width: 32px;
    height: 32px;
  `};

  ${media.phoneMedium`
    width: 24px;
    height: 24px;
  `};
`

const SpinnerChild1 = SpinnerChild3.extend`
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
`

const SpinnerChild2 = SpinnerChild3.extend`
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  margin: 0 4px;
`

const Loader = () => (
  <Root>
    <Spinner>
      <SpinnerChild1 />
      <SpinnerChild2 />
      <SpinnerChild3 />
    </Spinner>
  </Root>
)

export default Loader
