import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Home: React.FC = () => 
    <>
        <Head>
            <title>ふらくたるのブログ</title>
        </Head>
        <img src="/favi_cafe.png" alt="Your Name" className="logo"/>
        <Link href="/posts/first-post">
            <a>this page!</a>
        </Link>
    </>

export default Home