//FormApp.jsxの「バリデーション(入力値の検証)付きフォームを更に応用した」練習問題。

//名前とメールアドレスを入力するフォームです。
//文字数が足りない・メールの形式がおかしい場合は「リアルタイムで下にエラーメッセージが出ます。」
//エラーが1つでもあると、送信ボタンが押せない（disable） ようになります。

import React, { useState } from 'react';
import { FormField } from '../../components/study/FormField';

export const FormApp2 = () => {
  //①入力した値を管理するuseStateを準備する。
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  //②エラーメッセージの計算。(SearchFilterApp.jsxの復習。「元のデータから計算して作るものは、Stateにしてはいけない」（2重管理の罠）)
  //「エラーメッセージはstateにせず、入力値からその場で計算する。」
  //nameError
  const nameError = userName.length > 0 && userName.length < 3 ? '名前は3文字以上で入力してください' : '';
  //emailError
  const emailError = email.length > 0 && !email.includes('@') ? '有効なメールアドレスを入力してください' : '';

  //③送信ボタンが押せるかどうかを判断する。
  //isValid(有効かどうか)だった場合、「名前が3文字以上入力されている」かつ「メールが入力されている」かつ「エラーがどちらも無い」なら、送信ボタンが押せる。
  //{!isValid}の場合は、disableで送信ボタンが押せなくなる。
  const isValid = userName.length >= 3 && email.includes('@') && !nameError && !emailError;

  //④送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // 画面のリロード(再読み込み)を防ぐ。
    alert(`送信成功！\n名前: ${userName}\nメール: ${email}`);
  };

  //⑤return
  return (
    <div>
      <h2>フォーム入力とバリデーション(応用編)</h2>

      {/* form欄 */}
      <form onSubmit={handleSubmit}>
        {/* 名前入力欄input */}
        <FormField id='userNameInput' label='お名前:' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='ここに名前を入力してください' error={nameError} />
        {/*
        <div>
          <label htmlFor='userNameInput' style={{ display: 'block' }}>
            お名前:
            <input type='text' id='userNameInput' name='userNameInput' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='ここに名前を入力してください' />
          </label>
          {nameError && <p>{nameError}</p>}
        </div>
        */}

        {/* メール入力欄 input */}
        <FormField id='emailInput' label='メールアドレス:' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' error={emailError} />

        {/*
        <div>
          <label htmlFor='emailInput' style={{ display: 'block' }}>
            メールアドレス:
            <input type='text' id='emailInput' name='emailInput' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' />
          </label>

          {emailError && <p>{emailError}</p>}
        </div>
        */}

        {/* 送信ボタン */}
        <button type='submit' disabled={!isValid}>
          送信ボタン
        </button>
      </form>
    </div>
  );
};
