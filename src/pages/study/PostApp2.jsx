//PostApp.jsxを「更に応用した」練習問題。
//(fetchテスト2)画面が開いた瞬間に「データ取得中...」と表示され、1〜2秒後にサーバーから届いたユーザー一覧（名前・メール）が画面に並びます。

import React, { useState, useEffect } from 'react';
import { PostList2 } from '../../components/study/PostList2';

export const PostApp2 = () => {
  //①stateの準備
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //②APIからデータを取ってくる関数
  const FetchUsers = async () => {
    console.log('🔄FetchUsersが呼ばれました（通信スタート）');

    //ローディング取得開始
    setLoading(true);
    //エラーを「nullでリセット(初期化)」
    setError(null);

    //try
    try {
      //外部のダミーを「APIにアクセスして、データを取得する」
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      //もし通信自体が失敗していたらエラーを投げる
      if (!response.ok) {
        throw new Error('データ取得に失敗しました');
      }

      const data = await response.json(); //JSON形式のデータに変換する。
      setUsers(data); //⬆︎useStateのsetUsersに取得したデータを保存。

      console.log('✅データ取得成功:', data);
    } catch (err) {
      setError(err.message); //エラーが起きたら、その内容をStateに保存する。(.messageは、throw new Error('データ取得に失敗しました')の部分が入る)
      console.log('❌エラー発生:', err.message);
    } finally {
      setLoading(false); //成功でも失敗でも、ローディング画面は終了する
    }
  };

  //③useEffectで「画面がブラウザに表示された瞬間に「最初の1回だけ」fetchを実行する。
  useEffect(() => {
    FetchUsers();
    console.log('🚀useEffectが実行されました');
  }, []);

  //画面表示の分岐
  if (loading) return <p>データを取得中...</p>;
  if (error) return <p style={{ color: 'red' }}>エラーが発生しました：{error}</p>;

  //return
  return (
    <div>
      <h2>ユーザーの一覧を表示します。（API連携とuseEffect）</h2>

      {/* ⬇︎PostList2.jsxとPostItem2.jsxに責務分離した */}
      {/* 取得したユーザー一覧を表示する */}
      {/* <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '30px' }}>
            <h3 style={{ margin: '8px' }}>名前(架空):{user.name}</h3>
            <p style={{ margin: '8px' }}>メールアドレス(架空)):{user.email}</p>
          </li>
        ))}
      </ul> */}
      <PostList2 users={users} />

      {/* 手動で「再取得するボタン」 */}
      <button onClick={FetchUsers}>データを再取得する</button>
    </div>
  );
};
