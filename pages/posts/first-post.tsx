import Link from 'next/link'

const FirstPost:React.FC = ()=> (
  <div>
    <h1>First Post</h1>
    <h2>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </h2>
  </div>
)


export default FirstPost
