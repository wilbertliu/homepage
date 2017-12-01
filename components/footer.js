import styled from 'styled-components'
import media from '../layouts/media'

const StyledFooter = styled.footer`
  text-align: center;
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.light};
  font-size: 12px;
  color: ${props => props.theme.color.secondary};
  letter-spacing: 0.6px;

  ${media.phoneExtraLarge`
    font-size: 10px;
    letter-spacing: 0.5px;
  `};
  ${media.phoneLarge`
    font-size: 8px;
    letter-spacing: 0.4px;
  `};
`

const Footer = props => <StyledFooter>{props.children}</StyledFooter>

export default Footer
