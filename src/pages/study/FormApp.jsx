//バリデーション(入力値の検証)付きフォームを作成しよう
//バリデーションとは「入力値の検証」のことです。3文字以下だったり、空欄だったりした場合にエラーを表示するようにします。
import React, { useState } from 'react';

import { SimpleForm } from '../../components/study/SimpleForm'; //SimpleForm.jsxをimportして「SimpleFormコンポーネント」として使えるようにする。

export const FormApp = () => {
  //useStateの準備
  const [userName, setUserName] = useState(''); //初期値は空欄
  const [error, setError] = useState(null); //初期値はnull(エラーがない状態)

  //①文字が入力されるたびに「文字をチェック」するイベント処理を作成する。
  const handleChanege = (e) => {
    const value = e.target.value; //キーボードで打たれた文字を取得する。
    setUserName(value); //「入力された文字をuserNameに保存する。」

    //条件チェック(バリデーション)を行う。
    if (value.trim() === '') {
      //trimとは「前後の空白を削除する」という意味です。空欄の場合はエラーを表示する。
      setError('ユーザー名は必須入力です。');
    } else if (value.length < 3) {
      setError('ユーザー名は3文字以上で入力してください。');
    } else {
      setError(null); //エラーがない場合はnullにする。
    }
  };

  //②送信ボタンが押された時の処理を作成する。
  const handleSubmit = (e) => {
    e.preventDefault(); //⬅︎<form>タグのデフォルト機能の「ページ遷移機能停止」
    alert(`送信に成功しました: ${userName}`); //` `（バッククォーテーション）で囲む。(テンプレートリテラル)　⬅︎送信ボタンが押されたら画面にアラートを表示する。
  };

  //③JSXのreturn内で「入力欄」「エラー表示」「送信ボタン」を表示する。
  return (
    <div>
      {/* //h2 */}
      <h2>バリデーション付きフォーム</h2>

      {/* ⬇︎下記<Form>は「SimpleForm」.jsxに責務分離したので、コメントアウトしている。 */}
      {/*
      <form onSubmit={handleSubmit}>
        <label htmlFor='userName'>ユーザー名:</label>

        <input type='text' id='userName' value={userName} onChange={handleChanege} />

        {!!error && <p>{error}</p>}

        <button type='submit' disabled={!!error || userName.trim() === ''}>
          送信ボタン
        </button>
      </form>
      */}

      {/* ⬇︎SimpleFormコンポーネント */}
      <SimpleForm userName={userName} error={error} onChange={handleChanege} onSubmit={handleSubmit} />
    </div>
  );
};
