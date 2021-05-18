import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import AllPost from '/posts/all-posts'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>元ものづくりエンジニア。</p>
        <p>プログラミングについての記事を投稿しています。</p>
        <Link href="/posts/first-post">
          <a>First Post</a>
        </Link>
      </section>
      <AllPost/>
    </Layout>
  )
}