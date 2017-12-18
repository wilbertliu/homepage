import Layout from '../layouts/layout'
import Apology from '../components/apology'

const ErrorPage = props => (
  <Layout pathname={props.pathname} isServer={props.isServer}>
    <Apology>The page you're looking doesn't exist.</Apology>
  </Layout>
)

ErrorPage.getInitialProps = async ({ pathname, req }) => {
  const isServer = !!req
  return { pathname: pathname, isServer: isServer }
}

export default ErrorPage
