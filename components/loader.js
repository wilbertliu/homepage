import styled, { keyframes } from 'styled-components'
import media from '../layouts/media'
import normalTheme from '../themes/normal-theme'

const loadingAnimation = keyframes`
  0%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  50% {
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
`

const Spinner = styled.div`
  color: ${normalTheme.color.primary};
  width: 264px;
  height: 264px;
  position: relative;
`

const SpinnerChild1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${normalTheme.color.secondary};
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: ${loadingAnimation} 2s infinite ease-in-out;
  animation: ${loadingAnimation} 2s infinite ease-in-out;
`

const SpinnerChild2 = SpinnerChild1.extend`
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`

const StyledSpan = styled.span`
  display: inline-block;
  width: 100%;
  margin-top: 32px;
  text-align: center;
  font-family: ${normalTheme.font.primary};
  font-weight: ${normalTheme.font.weight.medium};
  font-size: 12px;
  color: ${props => normalTheme.color.primary};
  letter-spacing: 3px;
`

const Loader = () => (
  <Root>
    <div>
      <Spinner>
        <SpinnerChild1 />
        <SpinnerChild2 />
      </Spinner>
      <StyledSpan>PLEASE WAIT...</StyledSpan>
    </div>
  </Root>
)

export default Loader
