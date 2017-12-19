import Layout from '../layouts/layout'
import Head from 'next/head'
import styled from 'styled-components'
import media from '../layouts/media'
import fetch from 'isomorphic-unfetch'
import BlogPost from '../components/blog-post'
import Link from 'next/link'

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

const ReadMoreLink = styled.a`
  display: inline-block;
  margin-top: 32px;
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.semiBold};
  font-size: 16px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 4px;
  text-decoration: none;

  ${media.phoneExtraLarge`
    margin-top: 22px;
    font-size: 14px;
    letter-spacing: 3.5px;
    margin-top: 24px;
  `};
`

const Separator = styled.div`
  width: 75%;
  height: 1px;
  background-color: ${props => props.theme.color.secondaryHalfTransparent};
  margin: 72px 0;

  ${media.phoneExtraLarge`
    margin-top: 56px;
    margin-bottom: 56px;
  `};
  ${media.phoneLarge`
    margin-top: 40px;
    margin-bottom: 40px;
  `};
`

const BlogPage = props => (
  <Layout pathname={props.pathname} isServer={props.isServer}>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Lora:400,400i,700|Poppins:300,500,600"
        rel="stylesheet"
      />
    </Head>

    <Container>
      {props.posts.map((post, idx) => (
        <article key={idx}>
          <BlogPost post={post} excerpt />
          <Link
            href={{
              pathname: '/blog-detail',
              query: { slug: post.slug }
            }}
            as={{ pathname: `/blog/${post.slug}` }}
            passHref
            prefetch
          >
            <ReadMoreLink>READ MORE</ReadMoreLink>
          </Link>
          {idx < props.posts.length - 1 && <Separator />}
        </article>
      ))}
    </Container>
  </Layout>
)

BlogPage.getInitialProps = async ({ pathname, req }) => {
  const isServer = !!req

  const apiURL = isServer
    ? `${req.protocol}://${req.headers.host}/api/posts`
    : '/api/posts'
  const apiPostsRes = await fetch(apiURL)
  const apiPostsJSON = await apiPostsRes.json()

  return { pathname, isServer, posts: apiPostsJSON.posts }
}

export default BlogPage
