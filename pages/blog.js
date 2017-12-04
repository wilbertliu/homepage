import Layout from '../layouts/layout'
import styled from 'styled-components'
import media from '../layouts/media'
import Helmet from 'react-helmet'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const StyledH1 = styled.h1`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.semiBold};
  font-size: 88px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 4.4px;
`

const BlogPage = props => (
  <Layout pathname={props.pathname} isServer={props.isServer}>
    <StyledH1>Hello World!</StyledH1>
  </Layout>
)

BlogPage.getInitialProps = async ({ pathname, req }) => {
  const isServer = !!req
  if (isServer) {
    Helmet.renderStatic()
  }
  return { pathname: pathname, isServer: isServer }
}

export default withRedux(initStore)(BlogPage)
