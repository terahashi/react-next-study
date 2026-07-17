//(例題)・fetchで取得した記事一覧を表示するコンポーネント
import React, { useState, useEffect } from 'react';

import { PostList } from '../../components/study/PostList'; //PostList.jsxをimportして「PostListコンポーネント」として使えるようにする。

const PostApp = () => {
  //useStateで「記事一覧」「ローディング中かどうか」「エラーがあるかどうか」を管理。
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //useEffectで「画面がブラウザに表示された瞬間に実行する処理」にfetchを実行する。
  useEffect(() => {
    // 非同期処理(APIからデータを取ってくるような、少し時間がかかる処理)を行う関数。
    const fetchPosts = async () => {
      try {
        //①try
        //APIを叩く(テスト用のデータ取得API)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

        //もし通信自体が失敗していたらエラーを投げる
        if (!response.ok) {
          throw new Error('データ取得に失敗');
        }

        //もし通信自体が成功したら、JSON形式のデータを取得
        const data = await response.json();
        setPosts(data);
        //⬆︎useStateのsetPostsに取得したデータを保存。
      } catch (err) {
        //②catch
        //catch(err)の「errはただの変数名」で、エラーが発生した場合にその内容が入る。
        // エラーが発生した場合は、その内容をStateに保存
        if (err instanceof Error) {
          //「err instanceof Error」は「errがErrorクラスのインスタンスかどうか」を判定する。もしそうなら、err.messageでエラーメッセージを取得できる。
          //.messageは「 throw new Error('データ取得に失敗');」の'データ取得に失敗'の部分が入る。
          setError(err.message);
        } else {
          setError('予期せぬエラーが発生しました');
        }
      } finally {
        //③finally
        setLoading(false); // setLoading(false)は「成功しても失敗しても、ローディング画面は終了する」
      }
    };

    //④fetchPostsを実行する
    fetchPosts();
  }, []); //[]は「画面がブラウザに表示された瞬間に1回だけ実行する」という意味。

  // {/* ⬇︎PostList.jsxに責務分離 */}
  // ////「ローディング中」「エラーがある場合」「記事一覧を表示する場合」の3パターンの表示を切り替える。
  // if (loading) return <p>データ読み込み中 ...Loading...</p>;
  // if (error) return <p>エラーが発生しました:{error}</p>;

  return (
    <div>
      <h2>(fetchテスト)APIデータ取得リストの練習</h2>

      {/* ⬇︎PostList.jsxに責務分離 */}
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}

      {/* //⬇︎PostListコンポーネントに「記事一覧」「ローディング中かどうか」「エラーがあるかどうか」を渡す。 */}
      <PostList posts={posts} loading={loading} error={error} />
    </div>
  );
};

export default PostApp;
