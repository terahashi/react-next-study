//ローディング中やエラー時の表示、そして記事が複数並ぶ「一覧の枠組み」

import React from 'react';
import { PostItem } from './PostItem'; //PostItem.jsxをimport

export const PostList = ({ posts, loading, error }) => {
  ////({ posts, loading, error })は「PostApp.jsxのuseStateで管理している記事一覧の配列」を受け取っている。
  ////「ローディング中」「エラーがある場合」「記事一覧を表示する場合」の3パターンの表示を切り替える。
  if (loading) return <p>データ読み込み中 ...Loading...</p>;
  if (error) return <p>エラーが発生しました:{error}</p>;

  return (
    <ul>
      {posts.map((post) => (
        //postsは「PostApp.jsxのuseStateで管理している記事一覧の配列」をmapで回してpostに1件ずつ入れ、それをPostItemコンポーネントに渡す
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
