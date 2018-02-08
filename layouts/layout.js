import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { injectGlobal, ThemeProvider, keyframes } from 'styled-components'
import normalTheme from '../themes/normal-theme'
import darkTheme from '../themes/dark-theme'
import Navigation from '../components/navigation'
import NavigationLink from '../components/navigation-link'
import Footer from '../components/footer'
import media from './media'
import FaMoonO from 'react-icons/lib/fa/moon-o'
import Loader from '../components/loader'
import { determineInitialTheme, themeTypes } from '../store'
import { initGA, logPageView, logEvent } from '../utilities/analytics'

injectGlobal`
  * { margin: 0; padding: 0; }

  // The following is for article.
  main article div div p {
    margin-bottom: 24px;
  }
  main article div div p:last-child {
    margin-bottom: 0;
  }
`

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Root = styled.div`
  background-color: ${props => props.theme.color.background};
  animation: ${props =>
    props.isServer && props.isThemeReseted
      ? `0.5s ${fadeInAnimation}`
      : '0s none'};
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
`

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1056px; // From 960 + 48 * 2 (horizontal padding).
  padding: 24px 48px;
  height: ${props => (props.noScroll ? '100vh' : 'auto')};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  ${media.phoneExtraLarge`
    padding-left: 40px;
    padding-right: 40px;
  `};
  ${media.phoneLarge`
    padding-left: 32px;
    padding-right: 32px;
  `};
  ${media.phoneMedium`
    padding-left: 24px;
    padding-right: 24px;
  `};
`

const StyledLi = styled.li`
  display: inline-block;
  position: absolute;
  right: 0;
  padding-right: 48px;

  ${media.phoneExtraLarge`
    padding-right: 40px;
  `};
  ${media.phoneLarge`
    padding-right: 32px;
  `};
  ${media.phoneMedium`
    padding-right: 24px;
  `};
`

const ThemeMoon = styled(FaMoonO)`
  display: inline-block;
  position: absolute;
  top: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
`

const ThemeButton = styled.button`
  position: relative;
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.medium};
  font-size: 12px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 3px;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;

  ${media.phoneExtraLarge`
    font-size: 10px;
    letter-spacing: 2.5px;
  `};
`

const ThemeSpan = styled.span`
  display: inline-block;
  margin-left: 12px;

  ${media.phoneExtraLarge`
    margin-left: 10px;
  `};
`

const navigations = ['Home', 'Blog']
const navigationPaths = ['/', '/blog']

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isThemeReseted: false,
      theme:
        typeof window !== 'undefined' && window.LAYOUT_THEME
          ? window.LAYOUT_THEME
          : themeTypes.LIGHT
    }
    this.handleThemeButtonClick = this.handleThemeButtonClick.bind(this)
  }

  handleThemeButtonClick() {
    const { theme } = this.state

    if (theme === themeTypes.LIGHT) {
      window.LAYOUT_THEME = themeTypes.DARK
      this.setState({ theme: themeTypes.DARK })
      logEvent('Theme', 'Switched to Dark Theme')
    }

    if (theme === themeTypes.DARK) {
      window.LAYOUT_THEME = themeTypes.LIGHT
      this.setState({ theme: themeTypes.LIGHT })
      logEvent('Theme', 'Switched to Light Theme')
    }
  }

  componentDidMount() {
    if (this.props.isServer) {
      const theme = determineInitialTheme()
      window.LAYOUT_THEME = theme
      this.setState({ theme, isThemeReseted: true })
      return
    }

    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {
    const isServer = this.props.isServer
    const isThemeReseted = this.state.isThemeReseted

    if (isServer && !isThemeReseted) {
      return <Loader />
    }

    const pathname = this.props.pathname
    const navigationIndex = navigationPaths.indexOf(pathname)
    const pageName =
      navigationIndex >= 0 && navigationIndex < navigationPaths.length
        ? navigations[navigationIndex]
        : ''
    const title = 'Wilbert Liu'
    const siteUrl = `https://wilbertliu.com${pathname}`
    const theme =
      this.state.theme === themeTypes.LIGHT ? normalTheme : darkTheme
    const themeWording =
      this.state.theme === themeTypes.LIGHT ? themeTypes.DARK : themeTypes.LIGHT

    return (
      <ThemeProvider theme={theme}>
        <Root isServer={isServer} isThemeReseted={isThemeReseted}>
          <Container noScroll={!pathname.startsWith('/blog')}>
            <Head>
              <title>
                {title}
                {pageName !== '' ? ` · ${pageName}` : ''}
              </title>
              <meta
                name="description"
                content="A maker that cares deeply about people, creating experiences, and the details."
              />
              <link
                rel="shortcut icon"
                type="image/png"
                href="/static/favicon.png"
              />
              <link rel="canonical" href={siteUrl} key="canonical" />
            </Head>

            <Navigation>
              {navigations.map((str, idx) => (
                <NavigationLink
                  key={str + idx}
                  needsMarginRight={idx < navigations.length - 1}
                  to={navigationPaths[idx]}
                  isActive={
                    pathname === navigationPaths[idx] ||
                    (idx == 1 && pathname.startsWith(navigationPaths[idx]))
                  }
                >
                  {str.toUpperCase()}
                </NavigationLink>
              ))}

              <StyledLi>
                <ThemeButton onClick={this.handleThemeButtonClick}>
                  <ThemeMoon />
                  <ThemeSpan>{themeWording}</ThemeSpan>
                </ThemeButton>
              </StyledLi>
            </Navigation>

            {this.props.children}

            <Footer>
              Thoughtfully designed with care and love <br />
              Copyright © 2017-2018 Wilbert Liu
            </Footer>
          </Container>
        </Root>
      </ThemeProvider>
    )
  }
}

export default Layout
