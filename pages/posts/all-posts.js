import fetch from 'node-fetch'

// posts はビルド時に getStaticProps() によって生成されます。
function AllPosts({fileContents}) {
  console.log(fileContents)
  return (
    <ul>
        <li>{fileContents}</li>
    </ul>
  );
}
  
  // この関数はサーバー側でのビルド時に呼び出されます。
  // クライアント側では呼び出されないため、データベースクエリを直接実行することも可能です。
  // 「技術詳細」のセクションをご覧ください。
export async function getStaticProps() {
    // 外部のAPIエンドポイントを呼び出してpostsを取得します。
    // 任意のデータ取得ライブラリを使用できます。
    const res = await fetch('https://qiita.com/api/v2/items/fc1d8930b7478601b66c')
    const file = await res.json()
    const fileContents = 2

    return {
      props:{
        fileContents
      }
    }
}

export default AllPosts;