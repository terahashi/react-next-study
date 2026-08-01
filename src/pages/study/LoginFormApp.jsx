//実際の「パスワード付きのログインフォーム」を作成しよう。

//詳しくは「tech.txtファイル」を参照。
// 🍎用意するもの
// 💡1: フロントエンド（画面側）
// ・使うもの: React, HTML/CSS など
// 💡2: バックエンド（APIサーバー）
// 今回使う➡️Supabase Auth
// 💡3: データベース（DB）
// 今回使う➡️Supabase (PostgreSQL)
// 💡4: 認証の仕組み（鍵のやり取り）
// ・使う技術:
// JWT（JSON Web Token）: ログイン成功時にサーバーから送られる「デジタル通行証」。React側はこれを受け取って保持しておく。

// 🍎どこでサーバーを動かすの？
// ・API・DB（バックエンド）を置く場所:
// 今回使う➡️Supabase。
// Supabase 自身が「APIプログラムを動かすサーバー」を最初から用意してくれている！

import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Supabaseの公式ライブラリ

import { Login } from '../../components/study/Login';
import { LoginSuccess } from '../../components/study/LoginSuccess';

// エラーの日本語化：ログインや新規登録で表示される「Supabaseの英語エラー」を日本語に変換する関数を作成
const translateError = (errorMessage) => {
  if (!errorMessage) return ''; // 「エラーメッセージが無い場合」は空文字を返す

  // エラーの日本語訳を定義する
  const errorTranslations = {
    'email rate limit exceeded': 'メールの送信制限を超えました。しばらく待ってから再試行してください。',
    email_not_confirmed: 'メールアドレスが確認されていません。確認メールをチェックしてください。',
    'Email not confirmed': 'メールアドレスが確認されていません。確認メールをチェックしてください。',
    over_email_send_rate_limit: 'メールの送信制限を超えました。しばらく待ってから再試行してください。',
    email_already_in_use: 'このメールアドレスはすでに使用されています。',
    invalid_email: 'メールアドレスが無効です。正しい形式を使用してください。',
    'missing email or phone': 'ログインに必要な項目が入力されていません。',
    'Anonymous sign-ins are disabled': 'ログインに失敗しました。',
    'User already registered': 'このユーザーは既に登録されています。',
    'Invalid login credentials': 'ログイン情報が誤っています。',
    'Password should be at least 6 characters': 'パスワードは6文字以上である必要があります。',
    validation_failed: '入力内容の検証に失敗しました。',
  };

  // errorTranslations の中から該当するキーワードが含まれているか探す
  for (const [key, value] of Object.entries(errorTranslations)) {
    if (errorMessage.includes(key)) {
      return value; // 見つかったら日本語を返す
    }
  }

  // errorTranslations になかった想定外のエラーはそのまま表示
  return `エラー: ${errorMessage}`;
};

export const LoginFormApp = () => {
  //1: Formの入力値のstate(メール、パスワード)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //2: パスワードの表示/非表示フラグ(デフォルト：非表示)
  const [showPassword, setShowPassword] = useState(false);

  //3: ログイン完了状態のフラグ
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // エラーメッセージのstate
  const [errorMessage, setErrorMessage] = useState('');

  //フォームの入力値変更のイベントハンドラー
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //「パスワードを目視」する用の表示・非表示の切り替えハンドラー
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //「ログイン処理」のイベントハンドラー
  //【Supabase】に「ログインして！」と通信する。
  //API通信は非同期処理なので、async awaitを使い通信を待ってから次の行〜 if (error){...} 〜を実行する。
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // 直前のエラーメッセージをリセット

    // アラートチェック
    // if (!formData.email || !formData.password) {
    //   alert('メールアドレスとパスワードを入力してください');
    //   return;
    // }

    try {
      //🚀【Supabase】に「ログインして！」と通信する
      //APIを呼び出す。
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      //エラー（メアド間違い、パスワード間違いなど）
      if (error) {
        setErrorMessage(`ログイン失敗: ${translateError(error.message)}`);
        return;
      }

      //ログイン成功したら画面を切り替える！
      //アーリーリターン用に「ログイン完了状態のフラグをtrue」にする。
      console.log('ログイン成功データ:', data);
      setIsLoggedIn(true);
    } catch (err) {
      setErrorMessage('予期せぬエラーが発生しました');
    }
  };

  //「新規会員登録」サインアップ処理のイベントハンドラー
  const handleSignup = async (e) => {
    //APIを呼び出す。
    e.preventDefault();
    setErrorMessage(''); // 直前のエラーメッセージをリセット

    try {
      //🚀【Supabase】の「新規会員登録」サインアップのAPIを呼び出す
      //APIを呼び出す。
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      //エラー（メアド間違い、パスワード間違いなど）
      if (error) {
        setErrorMessage(`新規登録失敗: ${translateError(error.message)}`);
        return;
      }

      //⬇︎メール確認設定（Confirm email）がオフの場合はそのままユーザー作成完了！
      alert('新規登録が完了しました！');
      //必要に応じてそのままログイン状態に切り替える処理などを追加する。
    } catch (err) {
      setErrorMessage('予期せぬエラーが発生しました');
    }
  };

  //「ログアウト(リセット)」イベントハンドラー
  const handleLogout = () => {
    setFormData({ email: '', password: '' });
    setIsLoggedIn(false);
    setShowPassword(false);
  };

  //ログイン成功時は完了画面を返す(アーリーリターン)
  if (isLoggedIn) {
    return <LoginSuccess email={formData.email} onReset={handleLogout} />;
  }

  //JSX「ログインフォーム」
  return (
    <div style={{ padding: '20px', margin: '0 auto' }}>
      <h2>ログインフォーム</h2>

      {/* ⬇︎ログインフォーム初期画面 */}
      <Login
        formData={formData}
        showPassword={showPassword}
        errorMessage={errorMessage}
        onChange={handleChange}
        onTogglePassword={togglePasswordVisibility}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
      {/* <form onSubmit={handleSubmit} style={{ display: 'block', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <label htmlFor='email' style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'block', marginRight: '10px' }}>
            メールアドレス:
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='yourMail@email.com'
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            autoComplete='email'
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <label htmlFor='password' style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'block', marginRight: '10px' }}>
            パスワード:
          </label>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='パスワードを入力'
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            autoComplete='current-password'
          />

          <button type='button' onClick={togglePasswordVisibility} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
            {showPassword ? 'pass非表示' : '👁️'}
          </button>
        </div>

        <button
          type='submit'
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ログイン
        </button>
      </form> */}
    </div>
  );
};
