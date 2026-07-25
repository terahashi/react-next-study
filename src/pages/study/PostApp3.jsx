//「PostApp.jsxとPostApp2.jsx」を「更に応用した」練習問題。
//(fetchテスト3)画面が開いたらユーザーの一覧をAPIから取得し、上の検索窓に文字を入力すると、リアルタイムで該当するユーザーだけが絞り込まれる。

import React, { useState, useEffect } from 'react';
import { SearchInput2 } from '../../components/study/SearchInput2';
import { PostList3 } from '../../components/study/PostList3';

//UserSearchAppコンポーネント
export const PostApp3 = () => {
  //①stateの作成
  const [users, setUsers] = useState([]); //APIから届く元データ
  const [search, setSearch] = useState(''); //検索窓の入力テキスト
  const [loading, setLoading] = useState(true); //ローディング中かどうか
  const [error, setError] = useState(null); //エラーがあるかどうか

  //②APIからデータを取得。
  //setUsers(data);で⬆useStateのsetUsersにAPIから取得したデータを保存。
  const fetchUsers = async () => {
    setLoading(true); //ローディング開始
    setError(null); //エラーを「nullでリセット(初期化)」

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('データ取得に失敗しました');
      }

      const data = await response.json(); // JSON形式のデータに変換する。
      setUsers(data); //⬆useStateのsetUsersにAPIから取得したデータを保存。
      console.log('✅データ取得成功:', data);
    } catch (err) {
      setError(err.message); //エラーが起きたら、その内容をStateに保存する。(.messageは、throw new Error('データ取得に失敗しました')の部分が入る)
      console.log('❌エラー発生:', err.message);
    } finally {
      setLoading(false); //成功でも失敗でも、ローディング画面は終了する
    }
  };

  //③useEffectで「初回表示時にfetchUsersを実行する」1回だけAPI通信を行う。
  useEffect(() => {
    fetchUsers();
  }, []); //[]は「初回表示時に実行する」を意味する。

  //④「表示目的」の絞り込み結果の計算（元データから計算された絞り込み結果をStateにはしない）
  //「setUsers や setSearch」で更新されると、自動的に再計算される派生データ。
  //1：ユーザーが検索窓に文字を入力したとき(setSearch)
  //2：画面が開いて API からデータが届いたとき(setUsers)
  const filter = users.filter((user) => {
    //searchを小文字にする
    const searchLower = search.toLowerCase();
    const nameMatchs = user.name.toLowerCase().includes(searchLower); //nameを小文字にして、検索窓に入力された文字を含むかどうか
    const emailMatchs = user.email.toLowerCase().includes(searchLower); //emailを小文字にして、検索窓に入力された文字を含むかどうか

    //「名前"もしくは"メールアドレス」が部分一致したものをtrueとして返却する。
    return nameMatchs || emailMatchs; //nameMatchs か emailMatchs に入力された文字を含むユーザーを絞り込む
  });

  //ローディング表示と、エラーの表示の「設定」
  if (loading) return <p>データ取得中...</p>;
  if (error) return <p>エラーが発生しました：{error}</p>;

  //return JSX
  return (
    <div>
      {/* ⬇︎h2タイトル */}
      <h2>ユーザー検索・絞り込みアプリ</h2>

      {/* ⬇︎検索入力欄 */}
      {/* SearchInput2.jsxに責務分離 */}
      {/* <div>
        <label htmlFor='searchInput'>ユーザー検索: </label>
        <input type='text' id='searchInput' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div> */}
      <SearchInput2 value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* ⬇︎「表示目的」の絞り込み結果の計算 */}
      {/* PostList3.jsxに責務分離 */}
      <p>該当件数: {filter.length}件</p>

      {/* {filter.length === 0 ? (
        //⬇︎該当するユーザーがいない場合
        <p>該当するユーザーはいません</p>
      ) : (
        //⬇︎該当するユーザーがいる場合
        <ul>
          {filter.map((user) => (
            <li key={user.id}>
              <h3 style={{ display: 'inline-block', margin: '8px' }}>{user.name}</h3>
              <p style={{ display: 'inline-block', margin: '8px' }}>　({user.email})</p>
            </li>
          ))}
        </ul>
      )} */}
      <PostList3 filter={filter} />
    </div>
  );
};
