import Link from 'next/link'
import styled from 'styled-components'
import media from '../layouts/media'

const StyledLi = styled.li`
  display: inline-block;
  margin-right: ${props => (props.needsMarginRight ? '48px' : '0')};

  ${media.phoneExtraLarge`
    margin-right: ${props => (props.needsMarginRight ? '40px' : '0')};
  `};
  ${media.phoneLarge`
    margin-right: ${props => (props.needsMarginRight ? '32px' : '0')};
  `};
  ${media.phoneExtraSmall`
    margin-right: ${props => (props.needsMarginRight ? '24px' : '0')};
  `};
`

const StyledLink = styled.a`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.medium};
  font-size: 12px;
  color: ${props => props.theme.color.primary};
  text-decoration: none;
  letter-spacing: 3px;

  ${media.phoneExtraLarge`
    font-size: 10px;
    letter-spacing: 2.5px;
  `};
`

const StyledSpan = styled.span`
  letter-spacing: normal;
`

const BottomLine = styled.div`
  margin-top: 8px;
  height: 1px;
  background-color: ${props =>
    props.isActive ? props.theme.color.primary : 'transparent'};

  ${media.phoneExtraLarge`
    margin-top: 4px;
  `};
`

const NavigationLink = props => {
  // Separating front letters and last letter because letter-spacing
  // will create additional unwanted spaces.
  const text = props.children
  const frontLetters = text.substring(0, text.length - 1)
  const lastLetter = text[text.length - 1]

  return (
    <StyledLi needsMarginRight={props.needsMarginRight}>
      <Link href={props.to} passHref prefetch>
        <StyledLink>
          <span>{frontLetters}</span>
          <StyledSpan>{lastLetter}</StyledSpan>
        </StyledLink>
      </Link>
      <BottomLine isActive={props.isActive} />
    </StyledLi>
  )
}

export default NavigationLink
