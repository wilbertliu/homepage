import Layout from '../layouts/layout'
import styled from 'styled-components'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaMedium from 'react-icons/lib/fa/medium'
import FaGithub from 'react-icons/lib/fa/github'
import FaInstagram from 'react-icons/lib/fa/instagram'
import media from '../layouts/media'
import Head from 'next/head'

const StyledMain = styled.main`
  align-self: flex-start;
  margin: 0 48px;
  border-left: 2px solid ${props => props.theme.color.secondaryHalfTransparent};
  padding: 80px 48px;

  ${media.phoneExtraLarge`
    margin: 0 40px;
    padding: 64px 32px;
    border-width: 1.5px;
  `};
  ${media.phoneLarge`
    margin: 0 32px;
    padding: 48px 16px;
    border-width: 1px;
  `};
  ${media.phoneMedium`
    margin: 0 24px;
    padding: 32px 16px;
  `};
  ${media.phoneSmall`
    margin: 0 8px;
    padding: 24px 16px;
  `};
`

const StyledName = styled.h1`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.semiBold};
  font-size: 88px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 4.4px;

  ${media.phoneExtraLarge`
    font-size: 52px;
    letter-spacing: 2.6px;
  `};
  ${media.phoneLarge`
    font-size: 40px;
    letter-spacing: 2px;
  `};
  ${media.phoneExtraSmall`
    font-size: 28px;
    letter-spacing: 1.4px;
  `};
`

const StyledDesc = styled.p`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.light};
  font-size: 28px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 1.4px;

  ${media.phoneExtraLarge`
    font-size: 20px;
    letter-spacing: 1px;
  `};
  ${media.phoneLarge`
    font-size: 16px;
    letter-spacing: 0.8px;
  `};
  ${media.phoneExtraSmall`
    font-size: 14px;
    letter-spacing: 0.7px;
  `};
`

const StyledLinkSection = styled.section`
  margin-top: 40px;

  ${media.phoneExtraLarge`
    margin-top: 32px;
  `};
  ${media.phoneLarge`
    margin-top: 24px;
  `};
  ${media.phoneExtraSmall`
    margin-top: 16px;
  `};
`

const StyledLink = styled.a`
  display: inline-block;
  margin-right: 24px;
  font-size: 28px;
  color: ${props => props.theme.color.primary};

  ${media.phoneExtraLarge`
    margin-right: 16px;
    font-size: 20px;
  `};
  ${media.phoneLarge`
    margin-right: 12px;
    font-size: 16px;
  `};
  ${media.phoneExtraSmall`
    margin-right: 10px;
    font-size: 14px;
  `};
`

const IndexPage = props => (
  <Layout pathname={props.pathname} isServer={props.isServer}>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:300,500,600"
        rel="stylesheet"
      />
    </Head>

    <StyledMain>
      <StyledName>Wilbert Liu</StyledName>

      <StyledDesc>
        A maker that cares deeply about people, creating experiences, and the
        details.
      </StyledDesc>

      <StyledLinkSection>
        <StyledLink href="https://twitter.com/wilbertliu" target="__blank">
          <FaTwitter />
        </StyledLink>

        <StyledLink href="https://medium.com/@wilbertliu" target="__blank">
          <FaMedium />
        </StyledLink>

        <StyledLink href="https://github.com/wilbertliu" target="__blank">
          <FaGithub />
        </StyledLink>

        <StyledLink href="https://instagram.com/wilbertliu/" target="__blank">
          <FaInstagram />
        </StyledLink>
      </StyledLinkSection>
    </StyledMain>
  </Layout>
)

IndexPage.getInitialProps = async ({ pathname, req }) => {
  const isServer = typeof req !== 'undefined'
  return { pathname: pathname, isServer }
}

export default IndexPage
