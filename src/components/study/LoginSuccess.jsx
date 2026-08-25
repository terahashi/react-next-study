//LoginFormApp.jsxから責務分離
//ログイン成功時の「完了画面」です。
import React, { useState, useEffect } from 'react';
// import { supabase } from '../../lib/supabaseClient';
import { memoServiceSupabase } from '../../lib/memoServiceSupabase';

import styled from 'styled-components';

//「プロフィールカード」全体のコンテナ
const Card = styled.div`
  max-width: 450px;
  margin: 40px auto 100px;
  padding: 30px 30px 60px;
  border-radius: 12px;
  box-shadow: 5px 20px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

//「プロフィールカード」のタイトル
const Title = styled.h2`
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 20px;
`;

//「プロフィールカード」の全体
const UserInfoBox = styled.div`
  background-color: #d5e9f9;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  text-align: left;
  padding: 20px;
`;

//「プロフィールカード」のログイン中のメールアドレスの文字装飾エリア
const LoginEmailArea = styled.div`
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  display: block;
  font-size: 16px;
`;
const Value = styled.span`
  font-size: 16px;
  font-weight: bold;
  word-break: break-all;
`;

//ログアウトボタンの装飾
const LogOutButton = styled.button`
  background-color: #0647a3;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px; /* 上下左右の余白を調整 */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap; /* 改行を防ぐ */
  transition: background-color 0.2s;

  &:hover {
    background-color: #1759b5;
  }
`;

export const LoginSuccess = ({ user, onReset }) => {
  //手元で表示するメモ一覧のStateです。(理由:Supabaseの"memosテーブル"と区別するために"memoList"に命名)
  const [memoList, setMemoList] = useState([]);

  //入力中のメモテキストを保持するstate
  const [newMemo, setNewMemo] = useState('');

  //ローディング状態とエラーメッセージ
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  //💡「メモを再編集するため」のState
  const [editingMemoId, setEditingMemoId] = useState(null); // タップしたときに編集モードを開始するためのstate。つまり編集中のメモのID（初期値: null）
  const [editText, setEditText] = useState(''); // 編集中のメモのテキスト（初期値: 空文字）

  // //モジュール化前のコード。
  // // ⬇︎1:画面表示時に「自分のメモ一覧」を【Supabaseから取得する】
  // //役割: memoList(State)を「setMemoListで更新するためだけの関数」です。
  // const fetchMemos = async () => {
  //   try {
  //     setLoading(true);

  //     // Supabaseの「memos」テーブルから、ログイン中のユーザーのメモを取得する
  //     const { data, error } = await supabase
  //       .from('memos') // ① supabaseの「memosテーブルを指定」
  //       .select('*') // ② 全ての列を取得
  //       .order('created_at', { ascending: false }); // ③ 作成日時が新しい順に並べ替え

  //     if (error) throw error;
  //     setMemoList(data || []); // ④ 取得したメモ一覧をStateに保存。「 data または [空の配列] 」をセット。
  //     //⬆︎ [空の配列]を入れる理由は、「dataがnullや、undefinedだったときに、画面(React)がクラッシュする(画面が真っ白になる)のを防ぐため。」
  //   } catch (err) {
  //     console.error('メモ取得エラー:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ⬇︎1:画面表示時に「自分のメモ一覧」を【Supabaseから取得する】
  //役割: memoList(State)を「setMemoListで更新するためだけの関数」です。
  const fetchMemos = async () => {
    try {
      setLoading(true);
      // Supabaseの「memos」テーブルから、ログイン中のユーザーのメモを取得する
      const data = await memoServiceSupabase.fetchMemos();
      setMemoList(data); // ④ 取得したメモ一覧をStateに保存。「 data 」をセット。
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

  // //モジュール化前のコード。
  // //⬇︎2:新しいメモを【Supabaseに保存し、手元のmemoList(State)に追加する関数】
  // const handleAddMemo = async (e) => {
  //   e.preventDefault(); //ページリロードを防ぐ
  //   if (!newMemo.trim()) return;
  //   // ⬆︎メモの入力欄が空(またはスペースだけ)の場合、
  //   // ⬆︎JavaScriptでは、空文字""はfalse(偽)になるので【!(否定)をつけてtrue(真)にして、returnで処理を終了する】という意味。

  //   try {
  //     //Supabaseにデータを挿入(user_idにはログイン中ユーザーのIDを渡す)
  //     const { data, error } = await supabase
  //       .from('memos') //① supabaseの「memosテーブルを指定」
  //       .insert([{ content: newMemo, user_id: user.id }]) //② 新しいメモを挿入
  //       .select(); //③ 挿入後のデータを取得

  //     if (error) throw error; // エラーがあればthrowでcatchに飛ばす

  //     // 保存できたら手元のState(memoList)の先頭に「新メモを追加する。」
  //     setMemoList((prev) => [data[0], ...prev]);
  //     //⬆︎ prev ＝ 更新直前の memos(現在画面に保持されているメモ一覧の配列)。
  //     //⬆︎ ...prev ＝ 画面に今まで表示されていた 「過去のメモたち」(... で中身をサッと広げています)
  //     //⬆︎ [data[0], ...prev] ＝ 「新しいメモを一番先頭にして、その後に過去のメモを繋げた新しい配列」 を作成
  //     setNewMemo(''); //入力欄を空にする
  //   } catch (err) {
  //     console.error('メモ保存エラー:', err);
  //     setErrorMsg('メモの保存に失敗しました。');
  //   }
  // };

  //⬇︎2:新しいメモを【Supabaseに保存し、手元のmemoList(State)に追加する関数】
  const handleAddMemo = async (e) => {
    e.preventDefault(); //ページリロードを防ぐ
    if (!newMemo.trim()) return;
    // ⬆︎メモの入力欄が空(またはスペースだけ)の場合、
    // ⬆︎JavaScriptでは、空文字""はfalse(偽)になるので【!(否定)をつけてtrue(真)にして、returnで処理を終了する】という意味。

    try {
      //Supabaseにデータを挿入(user_idにはログイン中ユーザーのIDを渡す)
      const newMemoData = await memoServiceSupabase.handleAddMemo(newMemo, user.id);
      // 保存できたら手元のState(memoList)の先頭に「新メモを追加する。」
      setMemoList((prev) => [newMemoData, ...prev]);
      //⬆︎ prev ＝ 更新直前の memos(現在画面に保持されているメモ一覧の配列)。
      //⬆︎ ...prev ＝ 画面に今まで表示されていた 「過去のメモたち」(... で中身をサッと広げています)
      //⬆︎ [newMemoData, ...prev] ＝ 「新しいメモを一番先頭にして、その後に過去のメモを繋げた新しい配列」 を作成
      setNewMemo(''); //入力欄を空にする
    } catch (err) {
      console.error('メモ保存エラー:', err);
      setErrorMsg('メモの保存に失敗しました。');
    }
  };

  //💡タップしたときに編集モードを開始する関数
  const handleStartEditing = (memo) => {
    setEditingMemoId(memo.id); //編集中のメモIDをセット
    setEditText(memo.content); //編集用のテキストをセット
  };

  // 💡(編集モードで)Enterキーを押すと送信/更新される(UXを使いやすくするために作成)
  const handleKeyDown = (e, id) => {
    // Enterキーが押された、かつ Shiftキーが押されていない場合（※単体Enterで送信）
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 改行されるデフォルトの動きを防止
      handleUpdateMemo(id); // 更新処理を実行！
    }
  };

  // //モジュール化前のコード。
  // // ⬇︎3:メモ更新(Update)する処理
  // const handleUpdateMemo = async (id) => {
  //   if (!editText.trim()) return; // 空文字は無効

  //   try {
  //     //supabaseのデータを更新する処理
  //     const { error } = await supabase
  //       .from('memos') // supabaseの「memosテーブルを指定」
  //       .update({ content: editText }) // 更新する内容を指定
  //       .eq('id', id); //idが一致するものを更新

  //     if (error) throw error; // エラーがあればthrowでcatchに飛ばす

  //     //画面(state)のデータも更新
  //     setMemoList((prev) => prev.map((item) => (item.id === id ? { ...item, content: editText } : item)));

  //     //編集モードを解除
  //     setEditingMemoId(null); //編集中のメモIDをリセット
  //     setEditText(''); //編集用のテキストをリセット
  //   } catch (err) {
  //     console.error('メモ更新エラー:', err);
  //     setErrorMsg('メモの更新に失敗しました。');
  //   }
  // };

  // ⬇︎3:メモ更新(Update)する処理
  const handleUpdateMemo = async (id) => {
    if (!editText.trim()) return; // 空文字は無効

    try {
      //supabaseのデータを更新する処理
      await memoServiceSupabase.handleUpdateMemo(id, editText);

      //画面(state)のデータも更新
      setMemoList((prev) => prev.map((item) => (item.id === id ? { ...item, content: editText } : item)));

      //編集モードを解除
      setEditingMemoId(null); //編集中のメモIDをリセット
      setEditText(''); //編集用のテキストをリセット
    } catch (err) {
      console.error('メモ更新エラー:', err);
      setErrorMsg('メモの更新に失敗しました。');
    }
  };

  // //モジュール化前のコード。
  // //⬇︎4:メモを削除する関数 (Delete)
  // const handleDeleteMemo = async (id) => {
  //   try {
  //     const { error } = await supabase
  //       .from('memos') //① supabaseの「memosテーブルを指定」
  //       .delete() //② 削除する
  //       .eq('id', id); //③ idが一致するものを削除

  //     if (error) throw error; // エラーがあればthrowでcatchに飛ばす

  //     // 削除できたら手元のState(memoList)からも削除する
  //     setMemoList((prev) => prev.filter((memo) => memo.id !== id));
  //   } catch (err) {
  //     console.error('メモ削除エラー:', err);
  //     setErrorMsg('メモの削除に失敗しました。');
  //   }
  // };

  //⬇︎4:メモを削除する関数 (Delete)
  const handleDeleteMemo = async (id) => {
    try {
      //supabaseのデータを削除する処理
      await memoServiceSupabase.handleDeleteMemo(id);

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
        <LogOutButton onClick={onReset}>ログアウト</LogOutButton>
      </header>

      {/* メインコンテンツ*/}
      <main>
        {/* ⬇︎(ユーザー情報カード)  */}
        <Card>
          <Title>
            <span>おかえりなさい！{user?.email}さん。</span>
          </Title>

          <UserInfoBox>
            <LoginEmailArea>
              <Label>✅ログイン中のメールアドレス</Label>
              {/* user?.email で Supabase から届いたメールアドレスを表示 */}
              <Value>{user?.email}</Value>
            </LoginEmailArea>

            <LoginEmailArea>
              <Label>✅ユーザー固有ID(UUID)</Label>
              {/* user?.id で Supabase が発行した固有IDを表示 */}
              <Value>{user?.id}</Value>
            </LoginEmailArea>
          </UserInfoBox>
        </Card>

        {/* ⬇︎エラー表示 */}
        {errorMsg && <p style={{ color: '#dc3545', fontSize: '13px', backgroundColor: '#f8d7da', padding: '8px', borderRadius: '4px' }}>{errorMsg}</p>}

        {/* ⬇︎メモ入力フォーム 「手元のmemoList(State)に追加する」 */}
        <div style={{ marginBottom: '50px' }}>
          <h2>⚡️今日のひとこと / メモ機能</h2>
          <p style={{ textAlign: 'left' }}>※空文字は無効です。</p>
          <p style={{ textAlign: 'left' }}>※メモをクリックすると「編集モード」になります</p>
        </div>

        {/* ⬇︎メモ一覧の結果表示 */}
        <div style={{ marginBottom: '50px' }}>
          {loading ? (
            <h3>読み込み中...</h3>
          ) : memoList.length === 0 ? (
            <p>保存されたメモはまだありません。</p>
          ) : (
            <ul>
              {memoList.map((memo) => (
                <li key={memo.id} style={{ listStyleType: 'none' }}>
                  {/* ②編集モード（editingMemoId === memo.id）なら input に化ける！ */}
                  {editingMemoId === memo.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0 20px', marginBottom: '10px' }}>
                      {/* contentEditable を使うと、<span> や <div> の見た目・サイズのまま、直接文字を入力・編集できる */}
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => setEditText(e.currentTarget.textContent)}
                        onKeyDown={(e) => handleKeyDown(e, memo.id)} //Enterキーでの自動更新を判定する関数
                        autoFocus
                        style={{
                          borderBottom: '2px solid #007bff',
                          padding: '8px',
                          outline: 'none',
                          minHeight: '1.5em', // 空になっても高さが潰れないようにする
                          whiteSpace: 'pre-wrap', // 改行などもそのまま綺麗に見せる
                        }}
                      >
                        {memo.content}
                      </div>
                      <button onClick={() => handleUpdateMemo(memo.id)}>更新 </button>
                      <button onClick={() => setEditingMemoId(null)}>取消</button>
                    </div>
                  ) : (
                    /* ①初期表示。クリックすると「handleStartEditingイベント」でメモ編集に切り替わる */
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0 20px', marginBottom: '10px' }}>
                      <span
                        onClick={() => handleStartEditing(memo)}
                        style={{
                          padding: '8px',
                          borderBottom: '2px solid #707070',
                          cursor: 'pointer',
                        }}
                      >
                        {memo.content}
                      </span>
                      <button onClick={() => handleDeleteMemo(memo.id)}>削除</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ⬇︎メモ入力フォーム 「手元のmemoList(State)に追加する」 */}
        <form onSubmit={handleAddMemo} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0 20px', marginBottom: '10px' }}>
          <input
            type='text'
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder='新しいメモを入力'
            style={{
              padding: '8px',
              outline: 'none',
              minHeight: '1.5em', // 空になっても高さが潰れないようにする
              whiteSpace: 'pre-wrap', // 改行などもそのまま綺麗に見せる
            }}
          />
          <button type='submit'>追加する</button>
        </form>
      </main>
    </div>
  );
};
