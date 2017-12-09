const path = require('path')
const { promisify } = require('util')
const frontMatter = require('front-matter')
const fs = require('fs')
const dateFormat = require('dateformat')
const ellipsize = require('ellipsize')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

const maxExcerptChar = 280
const postsDir = path.join(__dirname, 'posts')

const timeToRead = text => {
  const words = text.split(' ').length
  const standardWordsPerMinute = 200
  const minutesNeeded = Math.floor(words / standardWordsPerMinute)

  if (minutesNeeded < 1) return '< 1 min'
  if (minutesNeeded == 1) return '1 min'
  return `${minutesNeeded} mins`
}

exports.fetchAllPost = async () => {
  const fileNames = await readdir(postsDir)

  const posts = await Promise.all(
    fileNames.map(async fileName => {
      const markdown = await readFile(path.join(postsDir, fileName), 'utf-8')
      const parsedMarkdown = frontMatter(markdown)

      return {
        slug: fileName.split('.')[0],
        title: parsedMarkdown.attributes.title,
        date: dateFormat(parsedMarkdown.attributes.date, 'mmm d, yyyy'),
        timeToRead: timeToRead(parsedMarkdown.body),
        excerpt: ellipsize(parsedMarkdown.body, maxExcerptChar)
      }
    })
  )

  return posts.sort((post1, post2) => {
    return new Date(post2.date).getTime() - new Date(post1.date).getTime()
  })
}

exports.fetchPost = async slug => {
  const markdown = await readFile(path.join(postsDir, `${slug}.md`), 'utf-8')
  const parsedMarkdown = frontMatter(markdown)
  return {
    title: parsedMarkdown.attributes.title,
    date: dateFormat(parsedMarkdown.attributes.date, 'mmm d, yyyy'),
    timeToRead: timeToRead(parsedMarkdown.body),
    body: parsedMarkdown.body,
    excerpt: ellipsize(parsedMarkdown.body, maxExcerptChar)
  }
}
