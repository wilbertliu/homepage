import styled from 'styled-components'
import media from '../layouts/media'

const Container = styled.div`
  text-align: center;
`

const StyledHeader = styled.h1`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.semiBold};
  font-size: 88px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 4.4px;

  ${media.phoneExtraLarge`
    font-size: 76px;
    letter-spacing: 3.8px;
  `};
  ${media.phoneLarge`
    font-size: 64px;
    letter-spacing: 3.2px;
  `};
`

const StyledDescSection = styled.section`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.light};
  font-size: 20px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 1.4px;
  line-height: 1;

  ${media.phoneExtraLarge`
    font-size: 16px;
    letter-spacing: 1px;
  `};
  ${media.phoneLarge`
    font-size: 14px;
    letter-spacing: 0.7px;
  `};
`

const Apology = props => (
  <Container>
    <StyledHeader>SORRY</StyledHeader>
    <StyledDescSection>{props.children}</StyledDescSection>
  </Container>
)

export default Apology
