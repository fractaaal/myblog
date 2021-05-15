import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Home: React.FC = () => 
<div>
    <div>Hello Next.js!</div>
    <h1 className="title">
        Read{' '}
        <Link href="/posts/first-post">
            <a>this page!</a>
        </Link>
    </h1>
</div>

export default Home