import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import AllPosts from './posts/all-posts'
import { getSortedPostsData } from '../lib/posts'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export async function getStsticProps() {
  // 外部のAPIエンドポイントを呼び出してpostsを取得します。
  // 任意のデータ取得ライブラリを使用できます。
  const res = await fetch('https://qiita.com//api/v2/users/Sota_Matsui/items?page=1&per_page=100');
  const posts = await res.json();

  // { props: posts } を返すことで、Blog コンポーネントは
  // ビルド時に`posts`を prop として受け取ります。
  return {
    props: {
      posts
    }
  };
}

export default function Home({ allPostsData }) {
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <AllPosts/>
    </Layout>
  )
}