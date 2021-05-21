import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import fetch from 'node-fetch'

const base64 = require('js-base64').Base64;
const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
    const res = await fetch('https://qiita.com/api/v2/users/Sota_Matsui/items?page=1&per_page=10')
    const file = await res.json()
    const filetitles = file.map((file)=>{
        const title = file.title
        const date = file.updated_at
        return {title,date}
    })

    return filetitles.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export async function getAllPostIds() {
    const repoUrl = "https://api.github.com/repos/fractaaal/myblog/contents/posts"
    const response = await fetch(repoUrl)
    const files = await response.json()
    const fileNames = files.map(file => file.name)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const repoUrl = `https://api.github.com/repos/fractaaal/myblog/contents/posts/${id}.md`
    const response = await fetch(repoUrl)
    const file = await response.json()
    const fileContents = base64.decode(file.content)

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}

