//LoginFormApp.jsxから責務分離
//ログイン成功時の「完了画面」です。
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const LoginSuccess = ({ email, user, onReset }) => {
  //React手元で管理するメモ一覧のState(Supabaseの'memosテーブル'と区別するために memoList に命名)
  const [memoList, setMemoList] = useState([]);

  //入力中のメモテキストを保持するstate
  const [newMemo, setNewMemo] = useState('');

  //ローディング状態とエラーメッセージ
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ⬇︎画面表示時に「自分のメモ一覧」を【Supabaseから取得する】
  //役割: memoList(State)を「setMemoListで更新するためだけの関数」です。
  const fetchMemos = async () => {
    try {
      setLoading(true);

      // Supabaseの「memos」テーブルから、ログイン中のユーザーのメモを取得する
      const { data, error } = await supabase
        .from('memos') // ① supabaseの「memosテーブルを指定」
        .select('*') // ② 全ての列を取得
        .order('created_at', { ascending: false }); // ③ 作成日時が新しい順に並べ替え

      if (error) throw error;
      setMemoList(data || []); // ④ 取得したメモ一覧をStateに保存。「 data または [空の配列] 」をセット。
      //⬆︎ [空の配列]を入れる理由は、「dataがnullや、undefinedだったときに、画面(React)がクラッシュする(画面が真っ白になる)のを防ぐため。」
    } catch (err) {
      console.error('メモ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  // fetchMemosを画面が表示された時に1回だけ実行する
  useEffect(() => {
    fetchMemos();
  }, []);

  //⬇︎新しいメモを【Supabaseに保存し、手元のmemoList(State)に追加する関数】
  const handleAddMemo = async (e) => {
    e.preventDefault(); //ページリロードを防ぐ
    if (!newMemo.trim()) return;
    // ⬆︎メモの入力欄が空(またはスペースだけ)の場合、
    // ⬆︎JavaScriptでは、空文字""はfalse(偽)になるので【!(否定)をつけてtrue(真)にして、returnで処理を終了する】という意味。

    try {
      //Supabaseにデータを挿入(user_idにはログイン中ユーザーのIDを渡す)
      const { data, error } = await supabase
        .from('memos') //① supabaseの「memosテーブルを指定」
        .insert([{ content: newMemo, user_id: user.id }]) //② 新しいメモを挿入
        .select(); //③ 挿入後のデータを取得

      if (error) throw error; // エラーがあればthrowでcatchに飛ばす

      // 保存できたら手元のState(memoList)の先頭に「新メモを追加する。」
      setMemoList((prev) => [data[0], ...prev]);
      //⬆︎ prev ＝ 更新直前の memos(現在画面に保持されているメモ一覧の配列)。
      //⬆︎ ...prev ＝ 画面に今まで表示されていた 「過去のメモたち」(... で中身をサッと広げています)
      //⬆︎ [data[0], ...prev] ＝ 「新しいメモを一番先頭にして、その後に過去のメモを繋げた新しい配列」 を作成
      setNewMemo(''); //入力欄を空にする
    } catch (err) {
      console.error('メモ保存エラー:', err);
      setErrorMsg('メモの保存に失敗しました。');
    }
  };

  //⬇︎メモを削除する関数 (Delete)
  const handleDeleteMemo = async (id) => {
    try {
      const { error } = await supabase
        .from('memos') //① supabaseの「memosテーブルを指定」
        .delete() //② 削除する
        .eq('id', id); //③ idが一致するものを削除

      if (error) throw error; // エラーがあればthrowでcatchに飛ばす

      // 削除できたら手元のState(memoList)からも削除する
      setMemoList((prev) => prev.filter((memo) => memo.id !== id));
    } catch (err) {
      console.error('メモ削除エラー:', err);
      setErrorMsg('メモの削除に失敗しました。');
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      {/* ⬇︎ヘッダー */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '80px',
          gap: '10px',
        }}
      >
        <h2 style={{ margin: 0 }}>マイページ</h2>
        <button
          onClick={onReset}
          style={{
            padding: '4px 8px',
            fontSize: '14px',
            lineHeight: '1',
            height: '36px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ログアウト
        </button>
      </header>

      {/* メインコンテンツ*/}
      <main>
        {/* ⬇︎(ユーザー情報カード)  */}
        <h3
          style={{
            marginBottom: '70px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px', // ここで全体のすき間を調整！
          }}
        >
          <span>おかえりなさい！</span>
          <span>{user?.email}さん。</span>
        </h3>

        <div style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>✅ログイン中のメールアドレス</label>
            {/* user?.email で Supabase から届いたメールアドレスを表示 */}
            <p>{user?.email}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>✅ユーザー固有ID(UUID)</label>
            {/* user?.id で Supabase が発行した固有IDを表示 */}
            <p>{user?.id}</p>
          </div>
        </div>

        {/* ⬇︎エラー表示 */}
        {errorMsg && <p style={{ color: '#dc3545', fontSize: '13px', backgroundColor: '#f8d7da', padding: '8px', borderRadius: '4px' }}>{errorMsg}</p>}

        {/* ⬇︎メモ入力フォーム 「手元のmemoList(State)に追加する」 */}
        <form onSubmit={handleAddMemo}>
          <h2>⚡️今日のひとこと　メモ機能</h2>
          <p>(空文字は無効です)</p>
          <input type='text' value={newMemo} onChange={(e) => setNewMemo(e.target.value)} placeholder='新しいメモを入力' />
          <button type='submit'>追加</button>
        </form>

        {/* ⬇︎メモ一覧の結果表示 */}
        {loading ? (
          <p>読み込み中...</p>
        ) : memoList.length === 0 ? (
          <p>保存されたメモはまだありません。</p>
        ) : (
          <ul>
            {memoList.map((memo) => (
              <li key={memo.id}>
                <span>{memo.content}</span>
                <button onClick={() => handleDeleteMemo(memo.id)}>削除</button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};
