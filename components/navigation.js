import styled from 'styled-components'
import media from '../layouts/media'

const NavContainer = styled.nav`
  align-self: auto;

  ${media.phoneExtraSmall`
    align-self: flex-start;
  `};
`

const Navigation = props => (
  <NavContainer>
    <ul>{props.children}</ul>
  </NavContainer>
)

export default Navigation
