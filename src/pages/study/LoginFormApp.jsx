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

  //「ログイン送信」ボタンのイベントハンドラー
  const handleSubmit = (e) => {
    e.preventDefault();

    // アラートチェック
    if (!formData || !formData.password) {
      alert('メールアドレスとパスワードを入力してください');
      return;
    }

    //アーリーリターン用に「ログイン完了状態のフラグをtrue」にする。
    setIsLoggedIn(true);
  };

  //「ログアウト(リセット)」イベントハンドラー
  const handleLogout = () => {
    setFormData({ email: '', password: '' });
    setIsLoggedIn(false);
    setShowPassword(false);
  };

  //ログイン成功時は完了画面を返す(アーリーリターン)

  //JSX「ログインフォーム」
  return (
    <div style={{ padding: '20px', margin: '0 auto' }}>
      <h2>ログインフォーム</h2>

      <form onSubmit={handleSubmit} style={{ display: 'block', padding: '20px' }}>
        {/* メールアドレス */}
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
          />
        </div>

        {/* パスワード入力欄 */}
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
          />

          {/* 「パスワードを目視」する用の表示・非表示の切り替え */}
          <button type='button' onClick={togglePasswordVisibility} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
            {showPassword ? 'pass非表示' : '👁️'}
          </button>
        </div>

        {/* ログイン送信ボタン */}
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
      </form>
    </div>
  );
};
