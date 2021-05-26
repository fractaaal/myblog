import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
//マークダウンから数式を解析
import math from 'remark-math'
//解析された数式をkatexが読み込めるようにHTML変換する。
import katex from 'rehype-katex'
import highlight from 'remark-highlight.js'
import gfm from 'remark-gfm'
import fetch from 'node-fetch'

const base64 = require('js-base64').Base64;

export async function getSortedPostsData() {
    const repoUrl = 'https://qiita.com/api/v2/users/Sota_Matsui/items?page=1&per_page=100'
    const response = await fetch(repoUrl,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_API}`
        }
    })
    const file = await response.json()
    const filetitles = file.map((file)=>{
        const id = file.id
        const title = file.title
        const date = file.updated_at
        return {id,title,date}
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
    const repoUrl = 'https://qiita.com/api/v2/users/Sota_Matsui/items?page=1&per_page=100'
    const response = await fetch(repoUrl,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_API}`
            }
    })
    const file = await response.json()
    const fileIds = file.map((file)=> file.id.toString())

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
    return fileIds.map(fileId => {
        return {
            params: {
                id: fileId
            }
        }
    })

}

export async function getPostData(id) {
    const repoUrl = `https://qiita.com/api/v2/items/${id}`
    const response = await fetch(repoUrl,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_API}`
            }
    })
    const file = await response.json()
    const title = file.title
    const date = file.updated_at

    const fileContents = file.rendered_body.toString("utf-8")
    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(math)
        .use(katex)
        .use(gfm)
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        title,
        date,
        contentHtml,
        ...matterResult.data
    }
}