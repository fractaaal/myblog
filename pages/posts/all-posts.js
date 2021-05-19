import { getStaticProps } from 'next'

// posts はビルド時に getStaticProps() によって生成されます。
function AllPosts({ posts }) {
    return (
      <ul>
          <li>{posts}</li>

      </ul>
    );
}
  
  // この関数はサーバー側でのビルド時に呼び出されます。
  // クライアント側では呼び出されないため、データベースクエリを直接実行することも可能です。
  // 「技術詳細」のセクションをご覧ください。
export async function getServerSideProps() {
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

export default AllPosts;