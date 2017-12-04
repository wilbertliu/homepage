import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { injectGlobal } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import normalTheme from '../themes/normal-theme'
import darkTheme from '../themes/dark-theme'
import Navigation from '../components/navigation'
import NavigationLink from '../components/navigation-link'
import Footer from '../components/footer'
import media from './media'
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { themeTypes, toggleTheme, resetTheme } from '../store'

injectGlobal`
  * { margin: 0; padding: 0; }

  // The following is for article.
  main article p p {
    margin-bottom: 24px;
  }
  main article p {
    margin-bottom: 24px;
  }
`

const Root = styled.div`
  background-color: ${props => props.theme.color.background};
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

const ThemeMoon = styled(FontAwesome.FaMoonO)`
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
    this.handleThemeButtonClick = this.handleThemeButtonClick.bind(this)
  }

  handleThemeButtonClick() {
    this.props.toggleTheme()
  }

  componentWillMount() {
    // Reset theme if this component is rendered on server
    // because we need to get the client's time.
    if (this.props.isServer) {
      this.props.resetTheme()
    }
  }

  render() {
    const pathname = this.props.pathname
    const navigationIndex = navigationPaths.indexOf(pathname)
    const pageName =
      navigationIndex >= 0 && navigationIndex < navigationPaths.length
        ? navigations[navigationIndex]
        : ''
    const title = 'Wilbert Liu'
    const siteUrl = `https://wilbertliu.com${pathname}`
    const theme =
      this.props.theme === themeTypes.LIGHT ? normalTheme : darkTheme
    const themeWording =
      this.props.theme === themeTypes.LIGHT ? themeTypes.DARK : themeTypes.LIGHT

    return (
      <ThemeProvider theme={theme}>
        <Root>
          <Container noScroll={!pathname.startsWith('/blog')}>
            <Helmet>
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
              <link rel="canonical" href={siteUrl} />
            </Helmet>

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
              Copyright © 2017 Wilbert Liu
            </Footer>
          </Container>
        </Root>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = ({ theme }) => ({ theme })

const mapDispatchToProps = dispatch => {
  return {
    toggleTheme: bindActionCreators(toggleTheme, dispatch),
    resetTheme: bindActionCreators(resetTheme, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
