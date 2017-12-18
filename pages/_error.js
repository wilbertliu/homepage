import Layout from '../layouts/layout'
import Apology from '../components/apology'
import Helmet from 'react-helmet'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const ErrorPage = props => (
  <Layout pathname={props.pathname} isServer={props.isServer}>
    <Apology>The page you're looking doesn't exist.</Apology>
  </Layout>
)

ErrorPage.getInitialProps = async ({ pathname, req }) => {
  const isServer = !!req
  if (isServer) {
    Helmet.renderStatic()
  }
  return { pathname: pathname, isServer: isServer }
}

export default withRedux(initStore)(ErrorPage)
