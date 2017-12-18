import Layout from '../layouts/layout'
import styled from 'styled-components'
import media from '../layouts/media'
import Head from 'next/head'
import BlogPost from '../components/blog-post'

const Container = styled.main`
  margin: 72px auto;
  max-width: 720px;

  ${media.phoneExtraLarge`
    margin: 64px auto;
  `};
  ${media.phoneLarge`
    margin: 56px auto;
  `};
  ${media.phoneMedium`
    margin: 48px auto;
  `};
`

const BlogDetailPage = props => (
  <Layout pathname={props.pathname} isServer={props.isServer}>
    <Head>
      <title>{props.post.title}</title>
      <meta name="description" content={props.post.excerpt} />
      <link
        href="https://fonts.googleapis.com/css?family=Lora:400,400i,700|Poppins:300,500,600"
        rel="stylesheet"
      />
      <link
        rel="canonical"
        href={`https://wilbertliu.com/blog/${props.post.title}`}
      />
    </Head>

    <Container>
      <article>
        <BlogPost post={props.post} />
      </article>
    </Container>
  </Layout>
)

BlogDetailPage.getInitialProps = async ({ pathname, req, query }) => {
  const isServer = !!req

  const apiPostRes = await fetch(`/api/post/${query.slug}`)
  const apiPostJSON = await apiPostRes.json()

  return { pathname: pathname, isServer: isServer, post: apiPostJSON.post }
}

export default BlogDetailPage
