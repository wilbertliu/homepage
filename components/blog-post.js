import Layout from '../layouts/layout'
import styled from 'styled-components'
import media from '../layouts/media'
import Link from 'next/link'
import Markdown from 'react-markdown'

const StyledLink = styled.a`
  color: ${props => props.theme.color.primary};
  text-decoration: none;
`

const StyledH5 = styled.h5`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.semiBold};
  font-size: 40px;
  color: ${props => props.theme.color.primary};
  letter-spacing: 0.8px;
  line-height: 1.25;

  ${media.phoneExtraLarge`
    font-size: 28px;
    letter-spacing: 0.56px;
  `};
  ${media.phoneMedium`
    font-size: 24px;
    letter-spacing: 0.48px;
  `};
`

const DateAndReadingTime = styled.p`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.font.weight.light};
  font-size: 16px;
  color: ${props => props.theme.color.secondary};
  margin-top: 8px;
  margin-bottom: 24px;
  letter-spacing: 0.32px;

  ${media.phoneExtraLarge`
    font-size: 14px;
    letter-spacing: 0.28px;
    margin-bottom: 16px;
  `};
`

const StyledSpan = styled.span`
  display: inline-block;
  margin: auto 8px;

  ${media.phoneExtraLarge`
    margin: auto 6px;
  `};
`

const Content = styled.p`
  font-family: ${props => props.theme.font.secondary};
  font-weight: ${props => props.theme.font.weight.regular};
  font-size: 20px;
  color: ${props => props.theme.color.primary};
  line-height: 1.75;

  ${media.phoneExtraLarge`
    font-size: 16px;
  `};
`

const BlogPost = props => {
  const post = props.post
  const title = props.excerpt ? (
    <Link href="" passHref prefetch>
      <StyledLink>
        <StyledH5>{post.title}</StyledH5>
      </StyledLink>
    </Link>
  ) : (
    <StyledH5>{post.title}</StyledH5>
  )
  const content = props.excerpt ? (
    <Content>{post.excerpt}</Content>
  ) : (
    <Markdown source={post.body} />
  )

  return (
    <div>
      <header>
        {title}
        <DateAndReadingTime>
          {post.date}
          <StyledSpan>·</StyledSpan>
          {post.timeToRead}
        </DateAndReadingTime>
      </header>
      {content}
    </div>
  )
}

export default BlogPost
